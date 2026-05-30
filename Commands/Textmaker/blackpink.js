/**
 * Blackpink Text Effect - The Melody of the Dark Lotus
 * Styled with True Wukong Monkey King Personality 🐒⚡🌸
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'blackpink',
  aliases: ['bp', 'kpop', 'darklotus'],
  category: 'textmaker',
  description: 'Forge your name in the style of the Dark Lotus',
  usage: '.blackpink <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong is humming a tune:* What name shall I write in the style of the Dark Lotus?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🌸', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html', text);
      
      if (!result?.image) {
        throw new Error('The celestial stage is empty!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The stage is set!*\n\n🔱 _Your name shines under the Dark Lotus lights._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in blackpink command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The stage has collapsed! The music has stopped.' 
      }, { quoted: msg });
    }
  }
};
