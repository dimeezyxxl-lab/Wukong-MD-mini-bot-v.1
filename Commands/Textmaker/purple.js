/**
 * Purple Text Effect - The Royal Violet Fog
 * Styled with True Wukong Monkey King Personality 🐒⚡🔮
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'purple',
  aliases: ['violet', 'royal', 'mystic', 'nebula'],
  category: 'textmaker',
  description: 'Cloak your words in the Royal Violet Fog',
  usage: '.purple <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong adjusts his crown:* What words shall I clothe in the royal purple of the Heavens?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🔮', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/purple-text-effect-online-100.html', text);
      
      if (!result?.image) {
        throw new Error('The violet fog has dissipated into nothingness!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The royal fog has descended!*\n\n🔱 _Your words are now draped in the mystery of the skies._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in purple command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* My mystic vision is clouded! I cannot weave the violet fog.' 
      }, { quoted: msg });
    }
  }
};
