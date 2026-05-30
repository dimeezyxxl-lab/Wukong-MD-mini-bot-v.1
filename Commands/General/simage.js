/**
 * Sticker to Image - Convert sticker to PNG image / Video
 * Styled with True Wukong Monkey King Personality 🐒💥
 */

const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = {
  name: 'simage',
  aliases: ['toimg', 'stickertoimg', 'sticker2img', 'svideo', 'unseal'],
  category: 'general',
  description: 'Shatter a sticker seal to reveal its true image/video form',
  usage: '.simage (reply to sticker)',
  
  async execute(sock, msg, args, extra) {
    try {
      const notStickerMessage = '🪵 *Wukong Snickers:* You want me to reverse a mutation, but you aren\'t pointing at a sticker! Reply to a sticker scroll with `.simage`.';
      
      // Check if message is a reply
      const ctxInfo = msg.message?.extendedTextMessage?.contextInfo;
      if (!ctxInfo?.quotedMessage) {
        return await extra.reply(notStickerMessage);
      }
      
      const targetMessage = {
        key: {
          remoteJid: extra.from,
          id: ctxInfo.stanzaId,
          participant: ctxInfo.participant,
        },
        message: ctxInfo.quotedMessage,
      };
      
      // Check if quoted message is a sticker
      const stickerMessage = targetMessage.message?.stickerMessage;
      if (!stickerMessage) {
        return await extra.reply(notStickerMessage);
      }
      
      // Download sticker
      const stickerBuffer = await downloadMediaMessage(
        targetMessage,
        'buffer',
        {},
        { logger: undefined, reuploadRequest: sock.updateMediaMessage },
      );
      
      if (!stickerBuffer) {
        return await extra.reply('❌ *Extraction Failed:* The sticker\'s spiritual aura vanished before I could unseal it.');
      }
      
      // Check if sticker is animated
      const isAnimated = stickerMessage.isAnimated || stickerMessage.mimetype?.includes('animated');
      
      // Inform the user of the reversal spell
      await extra.reply('🪐 *Stripping the metadata seals...* Reversing the transformation magic!');

      if (isAnimated) {
        // For animated stickers, convert directly to MP4 video
        const { webp2mp4 } = require('../../utils/webp2mp4');
        const mp4Buffer = await webp2mp4(stickerBuffer);
        
        if (!mp4Buffer || mp4Buffer.length === 0) {
          throw new Error('Altered video buffer is empty or null');
        }
        
        // Check file size (WhatsApp limits)
        const maxSize = 16 * 1024 * 1024; // 16MB for videos
        if (mp4Buffer.length > maxSize) {
          throw new Error(`The underlying scroll is too heavy: ${(mp4Buffer.length / 1024 / 1024).toFixed(2)}MB`);
        }
        
        // Send as MP4 video
        await sock.sendMessage(extra.from, {
          video: mp4Buffer,
          caption: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖦𝖱𝖤𝖠𝖳 𝖲𝖠𝖦𝖤 𝖴𝖭𝖲𝖤𝖠𝖫𝖤𝖱 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n🪐 *𝖶𝗎𝗄𝗈𝗇𝗀 Says:* Animated magic broken! The true video scroll is unleashed above.`,
          mimetype: 'video/mp4',
          gifPlayback: true
        }, { quoted: msg });
      } else {
        // Convert static WebP to PNG
        const { webp2png } = require('../../utils/webp2mp4');
        const imageBuffer = await webp2png(stickerBuffer);
        
        // Send as image with a beautiful custom Wukong caption
        await sock.sendMessage(extra.from, {
          image: imageBuffer,
          caption: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖦𝖱𝖤𝖠𝖳 𝖲𝖠𝖦𝖤 𝖴𝖭𝖲𝖤𝖠𝖫𝖤𝖱 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n🪐 *𝖶𝗎𝗄𝗈𝗇𝗀 Says:* I have shattered the sticker barrier. Behold the canvas in its original true form!`
        }, { quoted: msg });
      }
      
    } catch (error) {
      console.error('Error in simage command:', error);
      await extra.reply(`💥 *Chaos in Heaven:* My restoration spell collapsed! Could not convert asset:\n\n❌ *𝖤𝗋𝗋𝗈𝗋:* ${error.message}`);
    }
  }
};
