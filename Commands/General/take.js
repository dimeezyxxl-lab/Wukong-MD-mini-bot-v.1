/**
 * Take Command
 * Steal a sticker and re-pack with custom or user packname
 * Styled with True Wukong Monkey King Personality 🐒🏷️
 */

const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const webp = require('node-webpmux');
const crypto = require('crypto');
const config = require('../../config');

module.exports = {
  name: 'take',
  aliases: ['steal', 'rob', 'plunder'],
  description: 'Steal a sticker and stamp it with your own clan name',
  usage: '.take [packname] (reply to sticker)',
  category: 'general',
  
  async execute(sock, msg, args, extra) {
    let targetMessage = msg;
    const ctxInfo = msg.message?.extendedTextMessage?.contextInfo;
    
    if (ctxInfo?.quotedMessage) {
      targetMessage = {
        key: { 
          remoteJid: extra.from, 
          id: ctxInfo.stanzaId, 
          participant: ctxInfo.participant 
        },
        message: ctxInfo.quotedMessage,
      };
    }
    
    const stickerMsg = targetMessage.message?.stickerMessage;
    
    if (!stickerMsg) {
      return extra.reply('🪵 *Wukong Grins:* You want me to plunder a sticker, but you aren\'t pointing at one! Reply to a sticker with `.take`.');
    }
    
    try {
      const mediaBuffer = await downloadMediaMessage(
        targetMessage,
        'buffer',
        {},
        { logger: undefined, reuploadRequest: sock.updateMediaMessage },
      );
      
      if (!mediaBuffer) return extra.reply('❌ *Plunder Failed:* The sticker vanished into thin air before I could snatch it.');
      
      const userName = msg.pushName || extra.sender.split('@')[0];
      // If no pack name is provided, default to Wukong style branding alongside their name
      const packname = args.length ? args.join(' ') : `Wukong Mini • ${userName}`;
      
      const img = new webp.Image();
      await img.load(mediaBuffer);
      
      const json = {
        'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
        'sticker-pack-name': packname,
        'sticker-pack-publisher': `${config.botName || 'Wukong Bot Mini'}`,
        emojis: ['🐒', '⚡'],
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
      
      // Let the user know the heist was successful
      await extra.reply('🪐 *Snatched!* Erasing the old seals and stamping it for our clan...');
      
      await sock.sendMessage(extra.from, { sticker: finalBuffer }, { quoted: msg });
      
    } catch (error) {
      console.error('Take command error:', error);
      await extra.reply('💥 *Chaos in Heaven:* My cloning technique failed. I couldn\'t repackage this asset.');
    }
  },
};
