/**
 * Impressive Text Effect - The Celestial Art of the Great Sage
 * Styled with True Wukong Monkey King Personality 🐒⚡🎨
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'impressive',
  aliases: ['paint', '3d', 'colorful', 'art'],
  category: 'textmaker',
  description: 'Paint your words in vibrant 3D Celestial Art',
  usage: '.impressive <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong dips his brush in stardust:* What words shall I paint with the colors of the Heavens?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🎨', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html', text);
      
      if (!result?.image) {
        throw new Error('My celestial paints have been misplaced by the Heavenly guards!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *Behold, a masterpiece!* \n\n🔱 _Your words now shine with the brilliance of a thousand suns._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in impressive command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The colors have bled together! The art is ruined.' 
      }, { quoted: msg });
    }
  }
};
