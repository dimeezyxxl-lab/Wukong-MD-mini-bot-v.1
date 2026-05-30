/**
 * Light Text Effect - Summoning the Radiance of the Heavens
 * Styled with True Wukong Monkey King Personality 🐒⚡✨
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'light',
  aliases: ['glow', 'shine', 'beam', 'bright'],
  category: 'textmaker',
  description: 'Illuminate your words with celestial radiance',
  usage: '.light <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong squints against the glare:* What words do you want me to bathe in divine light?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '✨', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html', text);
      
      if (!result?.image) {
        throw new Error('The celestial lamps have dimmed!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The light has descended!* \n\n🔱 _Your words shine with the intensity of my Golden Eyes._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in light command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The brilliance was too much! Even the spirits are blinded by the failure.' 
      }, { quoted: msg });
    }
  }
};
