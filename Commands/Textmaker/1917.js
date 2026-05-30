/**
 * 1917 Text Effect - Calligraphy of the Iron War
 * Styled with True Wukong Monkey King Personality 🐒⚡✒️
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: '1917',
  aliases: ['irontext', 'warstyle'],
  category: 'textmaker',
  description: 'Etch your words in the Iron War calligraphy',
  usage: '.1917 <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong holds his brush:* What words shall I etch into the Iron War style?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '✒️', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/1917-style-text-effect-523.html', text);
      
      if (!result?.image) {
        throw new Error('The ink has dried up in the celestial well!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *Wukong has finished the etching.*\n\n🔱 _Style: Iron War 1917_\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in 1917 command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The metal has shattered under my brush! The script cannot be forged.' 
      }, { quoted: msg });
    }
  }
};
