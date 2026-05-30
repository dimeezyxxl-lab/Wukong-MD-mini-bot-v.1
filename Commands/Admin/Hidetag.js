/**
 * HideTag Command
 * Silently tag all group members without listing them
 * Supports text, images, videos, and stickers
 * Styled with True Wukong Monkey King Personality 🐒⚡📣
 */

const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = {
  name: 'hidetag',
  aliases: ['tag', 'echo', 'summontall', 'echosilent'],
  description: 'Cast a celestial echo chant that commands the attention of every soul in the realm',
  usage: '.tag <message> (or reply to media)',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const groupMetadata = await sock.groupMetadata(extra.from);
      const participants = groupMetadata.participants || [];
      const mentions = participants.map((p) => p.id || p.lid).filter(Boolean);
      
      // Check if message is a reply to media
      const ctxInfo = msg.message?.extendedTextMessage?.contextInfo;
      let targetMessage = msg;
      
      if (ctxInfo?.quotedMessage) {
        targetMessage = {
          key: {
            remoteJid: extra.from,
            id: ctxInfo.stanzaId,
            participant: ctxInfo.participant,
          },
          message: ctxInfo.quotedMessage,
        };
      }
      
      // Check what type of media we're dealing with
      const mediaMessage = 
        targetMessage.message?.imageMessage ||
        targetMessage.message?.videoMessage ||
        targetMessage.message?.stickerMessage;
      
      if (mediaMessage) {
        try {
          const mediaBuffer = await downloadMediaMessage(
            targetMessage,
            'buffer',
            {},
            { logger: undefined, reuploadRequest: sock.updateMediaMessage }
          );
          
          if (targetMessage.message?.imageMessage) {
            const text = args.join(' ') || targetMessage.message.imageMessage.caption || '';
            await sock.sendMessage(extra.from, {
              image: mediaBuffer,
              caption: text,
              mentions
            }, { quoted: msg });
          } else if (targetMessage.message?.videoMessage) {
            const text = args.join(' ') || targetMessage.message.videoMessage.caption || '';
            await sock.sendMessage(extra.from, {
              video: mediaBuffer,
              caption: text,
              mentions
            }, { quoted: msg });
          } else if (targetMessage.message?.stickerMessage) {
            await sock.sendMessage(extra.from, {
              sticker: mediaBuffer,
              mentions
            }, { quoted: msg });
            
            // If there's text, send it separately
            const text = args.join(' ');
            if (text) {
              await sock.sendMessage(extra.from, { text, mentions }, { quoted: msg });
            }
          }
        } catch (mediaError) {
          console.error('Error downloading media for hidetag:', mediaError);
          // Fallback to text with mentions
          const text = args.join(' ') || '📢 *Celestial Echo Chanted!*';
          await sock.sendMessage(extra.from, { text, mentions }, { quoted: msg });
        }
      } else {
        // Check if replying to a message - send exact message content
        if (ctxInfo?.quotedMessage) {
          const quotedText = ctxInfo.quotedMessage.conversation || 
                           ctxInfo.quotedMessage.extendedTextMessage?.text || 
                           args.join(' ') || '📢 *Listen to the Decree!*';
          
          await sock.sendMessage(extra.from, { text: quotedText, mentions }, { quoted: msg });
        } else {
          // Plain text message
          const text = args.join(' ');
          if (!text) {
            return extra.reply('🪵 *Wukong Snickers:* You cannot cast an empty echo! Provide some text or reply to a scroll artifact.');
          }
          await sock.sendMessage(extra.from, { text, mentions }, { quoted: msg });
        }
      }
    } catch (error) {
      console.error('HideTag command error:', error);
      await extra.reply('💥 *Chaos in Heaven:* My sonic echo chant backfired! Failed to reach all souls in the realm.');
    }
  },
};
