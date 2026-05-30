/**
 * Sticker Command
 * Uses ffmpeg + webpmux-style EXIF metadata to always embed packname
 * Styled with True Wukong Monkey King Personality 🐒🎨
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const crypto = require('crypto');
const webp = require('node-webpmux');
const ffmpegPath = require('ffmpeg-static');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const config = require('../../config');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

// Max file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

module.exports = {
  name: 'sticker',
  aliases: ['s', 'stiker', 'stc', 'clone'],
  description: 'Convert image or video into a custom clan sticker with auto compression',
  usage: '.sticker (reply to media)',
  category: 'general',
  
  async execute(sock, msg, args, extra) {
    const chatId = extra.from;
    const messageToQuote = msg;
    let targetMessage = msg;
    
    const ctxInfo = msg.message?.extendedTextMessage?.contextInfo;
    if (ctxInfo?.quotedMessage) {
      targetMessage = {
        key: {
          remoteJid: chatId,
          id: ctxInfo.stanzaId,
          participant: ctxInfo.participant,
        },
        message: ctxInfo.quotedMessage,
      };
    }
    
    const mediaMessage =
      targetMessage.message?.imageMessage ||
      targetMessage.message?.videoMessage ||
      targetMessage.message?.documentMessage;
    
    if (!mediaMessage) {
      return extra.reply('🪵 *Wukong Grins:* I need an object to shape-shift! Reply to an *image* or *video* with `.sticker` or send media with `.sticker` as the caption.');
    }
    
    const tempDir = getTempDir();
    const timestamp = Date.now();
    const tempInput = path.join(tempDir, `in_${timestamp}`);
    const tempOutput = path.join(tempDir, `out_${timestamp}.webp`);
    let tempFiles = [tempInput, tempOutput];
    
    try {
      const mediaBuffer = await downloadMediaMessage(
        targetMessage,
        'buffer',
        {},
        { logger: undefined, reuploadRequest: sock.updateMediaMessage },
      );
      
      if (!mediaBuffer) {
        await extra.reply('❌ *Extraction Failed:* The physical media slipped away before I could transmute it.');
        return;
      }
      
      // Check file size
      if (mediaBuffer.length > MAX_FILE_SIZE) {
        await extra.reply(`❌ *Massive Weight:* This file is too heavy for my cloud! ${(mediaBuffer.length / 1024 / 1024).toFixed(2)}MB (Max allowed: ${MAX_FILE_SIZE / 1024 / 1024}MB)`);
        return;
      }
      
      fs.writeFileSync(tempInput, mediaBuffer);
      
      const isAnimated =
        mediaMessage.mimetype?.includes('gif') ||
        mediaMessage.mimetype?.includes('video') ||
        (mediaMessage.seconds || 0) > 0;
      
      const baseFfmpegCmd = isAnimated
        ? `"${ffmpegPath}" -i "${tempInput}" -vf "scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 75 -compression_level 6 "${tempOutput}"`
        : `"${ffmpegPath}" -i "${tempInput}" -vf "scale=512:512:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 75 -compression_level 6 "${tempOutput}"`;
      
      const execPromise = (cmd) =>
        new Promise((resolve, reject) => exec(cmd, (err) => (err ? reject(err) : resolve())));
      
      // Notify user of the upcoming creation
      await extra.reply('🪐 *Plucking a golden hair...* Transmuting media into sticker magic!');
      
      await execPromise(baseFfmpegCmd);
      
      let webpBuffer = fs.readFileSync(tempOutput);
      
      if (isAnimated && webpBuffer.length > 1000 * 1024) {
        const tempOutput2 = path.join(tempDir, `out_fallback_${Date.now()}.webp`);
        tempFiles.push(tempOutput2);
        const fileSizeKB = mediaBuffer.length / 1024;
        const isLargeFile = fileSizeKB > 5000;
        
        const fallbackCmd = isLargeFile
          ? `"${ffmpegPath}" -y -i "${tempInput}" -t 2 -vf "scale=512:512:force_original_aspect_ratio=decrease,fps=8,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 30 -compression_level 6 -b:v 100k -max_muxing_queue_size 1024 "${tempOutput2}"`
          : `"${ffmpegPath}" -y -i "${tempInput}" -t 3 -vf "scale=512:512:force_original_aspect_ratio=decrease,fps=12,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 45 -compression_level 6 -b:v 150k -max_muxing_queue_size 1024 "${tempOutput2}"`;
        
        await execPromise(fallbackCmd);
        
        if (fs.existsSync(tempOutput2)) {
          webpBuffer = fs.readFileSync(tempOutput2);
        }
      }
      
      const img = new webp.Image();
      await img.load(webpBuffer);
      
      const json = {
        'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
        'sticker-pack-name': config.packname || 'Wukong Clan Pack',
        'sticker-pack-publisher': `${config.botName || 'Wukong Bot Mini'}`,
        emojis: ['🐒', '💥'],
      };
      
      const exifAttr = Buffer.from([
        0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
      ]);
      
      const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
      const exif = Buffer.concat([exifAttr, jsonBuffer]);
      exif.writeUIntLE(jsonBuffer.length, 14, 4);
      
      img.exif = exif;
      const finalBuffer = await img.save(null);
      
      await sock.sendMessage(extra.from, { sticker: finalBuffer }, { quoted: msg });
      
    } catch (error) {
      console.error('Sticker command error:', error);
      await extra.reply('💥 *Chaos in Heaven:* The transformation spell failed. Ensure your targeted media scroll is intact.');
    } finally {
      // Always cleanup temp files
      tempFiles.forEach(file => deleteTempFile(file));
    }
  },
};
