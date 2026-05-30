/**
 * Crop Command
 * Crop any sticker/image/video into a perfect square sticker (animated for videos)
 * Styled with True Wukong Monkey King Personality 🐒⚔️
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const webp = require('node-webpmux');
const config = require('../../config');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

// Max file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const getQuotedMessage = (message) =>
  message.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
  message.message?.buttonsResponseMessage?.contextInfo?.quotedMessage ||
  message.message?.listResponseMessage?.contextInfo?.quotedMessage ||
  null;

const resolveMedia = (message) => {
  const messageType = Object.keys(message.message || {})[0];
  if (messageType === 'imageMessage' || messageType === 'stickerMessage' || messageType === 'videoMessage' || messageType === 'documentMessage') {
    return { type: messageType, media: message.message[messageType] };
  }
  const quoted = getQuotedMessage(message);
  if (!quoted) return null;
  const quotedType = Object.keys(quoted || {})[0];
  if (quotedType === 'imageMessage' || quotedType === 'stickerMessage' || quotedType === 'videoMessage' || quotedType === 'documentMessage') {
    return { type: quotedType, media: quoted[quotedType] };
  }
  return null;
};

module.exports = {
  name: 'crop',
  aliases: ['square', 'cropper', 'slice', 'staffcut'],
  description: 'Chop an asset into a perfect square sticker using the Golden Staff',
  usage: '.crop (reply to sticker/image/video)',
  category: 'general',
  
  async execute(sock, msg, args, extra) {
    const tmpDir = getTempDir();
    const tempInput = path.join(tmpDir, `temp_${Date.now()}`);
    const tempOutput = path.join(tmpDir, `crop_${Date.now()}.webp`);
    const tempFiles = [tempInput, tempOutput];
    
    try {
      const messageToQuote = msg;
      let targetMessage = msg;

      if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const quotedInfo = msg.message.extendedTextMessage.contextInfo;
        targetMessage = {
          key: {
            remoteJid: extra.from,
            id: quotedInfo.stanzaId,
            participant: quotedInfo.participant
          },
          message: quotedInfo.quotedMessage
        };
      }

      const mediaInfo = resolveMedia(targetMessage);
      
      if (!mediaInfo) {
        return extra.reply('🪵 *Wukong Snickers:* My staff cannot swing at nothing! Reply to a *sticker*, *image*, or *video* scroll that you want me to slice down.');
      }

      const { type, media } = mediaInfo;
      const mediaMessage = media;

      if (!mediaMessage) {
        return extra.reply('🪵 *Wukong Snickers:* Point clearly at the target! Reply to an image/video/sticker with `.crop`, or send media with `.crop` as the caption.');
      }

      // Download media
      const mediaBuffer = await downloadMediaMessage(
        targetMessage,
        'buffer',
        {},
        { logger: undefined, reuploadRequest: sock.updateMediaMessage }
      );

      if (!mediaBuffer) {
        return extra.reply('❌ *Plunder Failed:* The media data broke apart before my staff could reshape it.');
      }

      // Check file size
      if (mediaBuffer.length > MAX_FILE_SIZE) {
        return extra.reply(`❌ *Massive Weight:* This asset is too heavy for my cloud network! ${(mediaBuffer.length / 1024 / 1024).toFixed(2)}MB (Max: ${MAX_FILE_SIZE / 1024 / 1024}MB)`);
      }

      // Write media to temp file
      fs.writeFileSync(tempInput, mediaBuffer);

      // Check if media is animated (GIF or video)
      const isAnimated = mediaMessage.mimetype?.includes('gif') || 
                        mediaMessage.mimetype?.includes('video') || 
                        mediaMessage.seconds > 0 ||
                        type === 'videoMessage';

      const fileSizeKB = mediaBuffer.length / 1024;
      const isLargeFile = fileSizeKB > 5000;

      let ffmpegCommand;
      
      if (isAnimated) {
        if (isLargeFile) {
          ffmpegCommand = `ffmpeg -i "${tempInput}" -t 2 -vf "crop=min(iw\\,ih):min(iw\\,ih),scale=512:512,fps=8" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 30 -compression_level 6 -b:v 100k -max_muxing_queue_size 1024 "${tempOutput}"`;
        } else {
          ffmpegCommand = `ffmpeg -i "${tempInput}" -t 3 -vf "crop=min(iw\\,ih):min(iw\\,ih),scale=512:512,fps=12" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 50 -compression_level 6 -b:v 150k -max_muxing_queue_size 1024 "${tempOutput}"`;
        }
      } else {
        ffmpegCommand = `ffmpeg -i "${tempInput}" -vf "crop=min(iw\\,ih):min(iw\\,ih),scale=512:512,format=rgba" -c:v libwebp -preset default -loop 0 -vsync 0 -pix_fmt yuva420p -quality 75 -compression_level 6 "${tempOutput}"`;
      }

      // Action notification alert
      await extra.reply('🪐 *Extending the Golden Staff...* Slicing your media scroll into a perfect square array!');

      await new Promise((resolve, reject) => {
        exec(ffmpegCommand, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      if (!fs.existsSync(tempOutput)) {
        throw new Error('Transformation output file was not generated');
      }

      const outputStats = fs.statSync(tempOutput);
      if (outputStats.size === 0) {
        throw new Error('Transformation resulted in empty asset bytes');
      }

      let webpBuffer = fs.readFileSync(tempOutput);
      const finalSizeKB = webpBuffer.length / 1024;
      
      if (finalSizeKB > 1000) {
        console.log(`⚠️ Warning: Sticker size (${Math.round(finalSizeKB)} KB) exceeds limit`);
      }

      // Add metadata using webpmux
      const img = new webp.Image();
      await img.load(webpBuffer);

      // Pack metadata matching your profile configurations
      const json = {
        'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
        'sticker-pack-name': config.packname || 'Wukong Square Pack',
        'sticker-pack-publisher': `${config.botName || 'Wukong Bot Mini'}`,
        'emojis': ['🐒', '✂️']
      };

      const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
      const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
      const exif = Buffer.concat([exifAttr, jsonBuffer]);
      exif.writeUIntLE(jsonBuffer.length, 14, 4);

      img.exif = exif;
      const finalBuffer = await img.save(null);

      // Send the beautifully cropped sticker asset
      await sock.sendMessage(extra.from, { 
        sticker: finalBuffer
      }, { quoted: messageToQuote });

    } catch (error) {
      console.error('Crop command error:', error);
      await extra.reply(`💥 *Chaos in Heaven:* My staff cut went wide! Failed to dimension the sticker:\n\n❌ *𝖤𝗋𝗋𝗈𝗋:* ${error.message}`);
    } finally {
      tempFiles.forEach(file => deleteTempFile(file));
    }
  }
};
