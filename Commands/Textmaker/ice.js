/**
 * Ice Text Effect - The Breath of the Northern Frost
 * Styled with True Wukong Monkey King Personality 🐒⚡❄️
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'ice',
  aliases: ['frost', 'freeze', 'cold'],
  category: 'textmaker',
  description: 'Encase your words in the eternal Northern Frost',
  usage: '.ice <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong shivers:* My breath grows cold! What words shall I encase in the eternal ice?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '❄️', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/ice-text-effect-online-101.html', text);
      
      if (!result?.image) {
        throw new Error('The mountain winds have stopped; the ice cannot form!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The frost has settled!*\n\n🔱 _Your words are now frozen in time._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in ice command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The frost has shattered! My magical cooling has failed.' 
      }, { quoted: msg });
    }
  }
};
