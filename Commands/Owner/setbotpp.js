/**
 * Wukong-MD: The Celestial Mirror (Set Profile Picture)
 * Architected by XyzTech 🐒⚡
 */

const fs = require('fs');
const path = require('path');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const MAX_FILE_SIZE = 10 * 1024 * 1024;

module.exports = {
  name: 'setbotpp',
  aliases: ['setppbot', 'setpp'],
  category: 'owner',
  description: 'Invoke the Great Sage to change his divine reflection.',
  usage: '.setbotpp (reply to image or sticker)',
  ownerOnly: true,

  async execute(sock, msg, args, extra) {
    try {
      const quotedMessage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quotedMessage || (!quotedMessage.imageMessage && !quotedMessage.stickerMessage)) {
        return extra.reply('🐒 [Wukong-MD]: Decree unclear. Please reply to an image or sticker to transmute my reflection.');
      }

      const mediaMessage = quotedMessage.imageMessage || quotedMessage.stickerMessage;
      const tmpDir = getTempDir();
      const imagePath = path.join(tmpDir, `reflection_${Date.now()}.jpg`);
      
      try {
        await extra.reply('🐒 [Wukong-MD]: Meditating on a new reflection...');
        
        const stream = await downloadContentFromMessage(mediaMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) { buffer = Buffer.concat([buffer, chunk]); }

        if (buffer.length > MAX_FILE_SIZE) {
          return extra.reply(`💥 [Wukong-MD]: The image is too large for the Celestial Mirror! Max limit: 10MB.`);
        }
        
        fs.writeFileSync(imagePath, buffer);
        await sock.updateProfilePicture(sock.user.id.split(':')[0] + '@s.whatsapp.net', { url: imagePath });

        await extra.reply('✅ [Wukong-MD]: My reflection has been transmuted. Behold the new countenance!');
      } catch (error) {
        console.error(`💥 [Wukong-MD]: Mirror failure: ${error.message}`);
        extra.reply('💥 [Wukong-MD]: The Celestial Mirror has cracked. Failed to update reflection.');
      } finally {
        deleteTempFile(imagePath);
      }
    } catch (error) {
      console.error('setbotpp error:', error);
      extra.reply('💥 [Wukong-MD]: A disturbance in the heavens prevented the transmutation.');
    }
  }
};
