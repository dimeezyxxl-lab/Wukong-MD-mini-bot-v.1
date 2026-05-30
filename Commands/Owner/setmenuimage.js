/**
 * Wukong-MD: The Celestial Canvas (Set Menu Image)
 * Architected by XyzTech 🐒⚡
 */

const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = {
  name: 'setmenuimage',
  aliases: ['setmenuimg', 'changemenuimage'],
  category: 'owner',
  description: 'Invoke the Scribe to mount a new tapestry on the Celestial Canvas.',
  usage: '.setmenuimage (reply to image/sticker)',
  ownerOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      if (!ctx?.quotedMessage || (!ctx.quotedMessage.imageMessage && !ctx.quotedMessage.stickerMessage)) {
        return extra.reply('🐒 [Wukong-MD]: Decree unclear. Please reply to an image or sticker to update the Celestial Canvas.');
      }
      
      const quotedMsg = ctx.quotedMessage;
      const imageMsg = quotedMsg.imageMessage || quotedMsg.stickerMessage;
      
      const targetMessage = {
        key: { remoteJid: extra.from, id: ctx.stanzaId, participant: ctx.participant },
        message: quotedMsg,
      };
      
      await extra.reply('🐒 [Wukong-MD]: The Scribe is preparing the Celestial Canvas...');
      
      const mediaBuffer = await downloadMediaMessage(targetMessage, 'buffer', {}, { logger: undefined, reuploadRequest: sock.updateMediaMessage });
      
      if (!mediaBuffer) return extra.reply('💥 [Wukong-MD]: The image failed to materialize in the archives.');
      
      let finalBuffer = mediaBuffer;
      if (quotedMsg.stickerMessage || !imageMsg.mimetype?.includes('jpeg')) {
        const sharp = require('sharp');
        finalBuffer = await sharp(mediaBuffer).jpeg({ quality: 90 }).toBuffer();
      }
      
      const imagePath = path.join(__dirname, '../../utils/bot_image.jpg');
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      
      fs.writeFileSync(imagePath, finalBuffer);
      
      await extra.reply('✅ [Wukong-MD]: The Celestial Canvas has been updated. Behold the new tapestry!');
      
    } catch (error) {
      console.error(`💥 [Wukong-MD]: Canvas failure: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The tapestry failed to mount. Essence error: ${error.message}`);
    }
  }
};
