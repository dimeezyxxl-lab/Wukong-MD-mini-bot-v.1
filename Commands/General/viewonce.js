/**
 * ViewOnce Command - Reveal view-once messages
 * Styled with True Wukong Monkey King Personality 🐒💨
 */

const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
  name: 'viewonce',
  aliases: ['readvo', 'read', 'vv', 'readviewonce', 'illusions'],
  category: 'general',
  description: 'Shatter disappearing illusions (images/videos/audio)',
  usage: '.viewonce (reply to view-once message)',
  
  async execute(sock, msg, args) {
    try {
      const chatId = msg.key.remoteJid;

      // Check the context of the magic spell
      const ctx = msg.message?.extendedTextMessage?.contextInfo
        || msg.message?.imageMessage?.contextInfo
        || msg.message?.videoMessage?.contextInfo
        || msg.message?.buttonsResponseMessage?.contextInfo
        || msg.message?.listResponseMessage?.contextInfo;

      if (!ctx?.quotedMessage || !ctx?.stanzaId) {
        return await sock.sendMessage(
          chatId,
          { text: '🐒 *Wukong Snickers:* You must point my Golden Staff directly at a disappearing illusion to shatter it! Reply to a view-once message.' },
          { quoted: msg }
        );
      }

      const quotedMsg = ctx.quotedMessage;

      // Spotting the trickster magic
      const hasViewOnce =
        !!quotedMsg.viewOnceMessageV2 ||
        !!quotedMsg.viewOnceMessageV2Extension ||
        !!quotedMsg.viewOnceMessage ||
        !!quotedMsg.viewOnce ||
        !!quotedMsg?.imageMessage?.viewOnce ||
        !!quotedMsg?.videoMessage?.viewOnce ||
        !!quotedMsg?.audioMessage?.viewOnce;

      if (!hasViewOnce) {
        return await sock.sendMessage(
          chatId,
          { text: '💨 *Foolish Mortal:* That scroll isn\'t even trying to disappear! There is no trickery or illusion on this message.' },
          { quoted: msg }
        );
      }

      let actualMsg = null;
      let mtype = null;

      if (quotedMsg.viewOnceMessageV2Extension?.message) {
        actualMsg = quotedMsg.viewOnceMessageV2Extension.message;
        mtype = Object.keys(actualMsg)[0];
      } else if (quotedMsg.viewOnceMessageV2?.message) {
        actualMsg = quotedMsg.viewOnceMessageV2.message;
        mtype = Object.keys(actualMsg)[0];
      } else if (quotedMsg.viewOnceMessage?.message) {
        actualMsg = quotedMsg.viewOnceMessage.message;
        mtype = Object.keys(actualMsg)[0];
      } else if (quotedMsg.imageMessage?.viewOnce) {
        actualMsg = { imageMessage: quotedMsg.imageMessage };
        mtype = 'imageMessage';
      } else if (quotedMsg.videoMessage?.viewOnce) {
        actualMsg = { videoMessage: quotedMsg.videoMessage };
        mtype = 'videoMessage';
      } else if (quotedMsg.audioMessage?.viewOnce) {
        actualMsg = { audioMessage: quotedMsg.audioMessage };
        mtype = 'audioMessage';
      }

      if (!actualMsg || !mtype) {
        return await sock.sendMessage(
          chatId,
          { text: '🪵 *Poof!* This magic format is too strange even for the Great Sage. I cannot grab it.' },
          { quoted: msg }
        );
      }

      const downloadType =
        mtype === 'imageMessage'
          ? 'image'
          : mtype === 'videoMessage'
          ? 'video'
          : 'audio';

      const mediaStream = await downloadContentFromMessage(
        actualMsg[mtype],
        downloadType
      );

      let buffer = Buffer.from([]);
      for await (const chunk of mediaStream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      const originalCaption = actualMsg[mtype]?.caption || '';
      
      // Pure Wukong Monkey King Reveal Banner
      const customCaption = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖥𝖨𝖤𝖱𝖸 𝖤𝖸𝖤𝖲 𝖮𝖥 𝖳𝖧𝖤 𝖲𝖠𝖦𝖤 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n🐒 *💥 𝖨𝖫𝖫𝖴𝖲𝖨𝖮𝖭 𝖲𝖧𝖠𝖳𝖳𝖤𝖱𝖤𝖣!* 💥\n\n🪐 *𝖶𝗎𝗄𝗈𝗇𝗀 Says:* Did you really think you could hide this scroll from my true vision? Behold what was meant to vanish!\n${originalCaption ? `📝 *𝖮𝗋𝗂𝗀𝗂𝗇𝖺𝗅 𝖢𝖺𝗉𝗍𝗂𝗈𝗇:* ${originalCaption}\n` : ''}\n✨ _Captured for eternity by Wukong Bot Mini_`;

      if (/video/.test(mtype)) {
        await sock.sendMessage(
          chatId,
          {
            video: buffer,
            caption: customCaption,
            mimetype: 'video/mp4'
          },
          { quoted: msg }
        );
      } else if (/image/.test(mtype)) {
        await sock.sendMessage(
          chatId,
          {
            image: buffer,
            caption: customCaption,
            mimetype: 'image/jpeg'
          },
          { quoted: msg }
        );
      } else if (/audio/.test(mtype)) {
        await sock.sendMessage(
          chatId,
          {
            audio: buffer,
            ptt: true,
            mimetype: 'audio/ogg; codecs=opus'
          },
          { quoted: msg }
        );
        // Follow up for voice logs
        await sock.sendMessage(
          chatId,
          { text: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖥𝖨𝖤𝖱𝖸 𝖤𝖸𝖤𝖲 𝖮𝖥 𝖳𝖧𝖤 𝖲𝖠𝖦𝖤 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n🐒 *𝖲𝗍𝖺𝗍𝗎𝗌:* Disappearing echo-spell captured! The secret audio is unleashed above. 💨` },
          { quoted: msg }
        );
      }
    } catch (error) {
      console.error('Error in viewonce command:', error);
      await sock.sendMessage(
        msg.key.remoteJid,
        {
          text: `💥 *Chaos in heaven!* Even my magic failed to rip open this illusion: ${error.message || 'Unknown celestial shield'}`
        },
        { quoted: msg }
      );
    }
  }
};
