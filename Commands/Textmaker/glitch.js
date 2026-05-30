/**
 * Glitch Text Effect - Disrupting the Celestial Fabric
 * Styled with True Wukong Monkey King Personality 🐒⚡📺
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'glitch',
  aliases: ['distort', 'flicker', 'broken'],
  category: 'textmaker',
  description: 'Distort your words within the Celestial Fabric',
  usage: '.glitch <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong tilts his head:* What reality shall I distort? Give me the words to glitch!' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '📺', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html', text);
      
      if (!result?.image) {
        throw new Error('The celestial mirror is shattered beyond repair!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *Reality has been bent!*\n\n🔱 _Your words flicker across the dimensions._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in glitch command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The connection is unstable! The glitch is too powerful to manifest.' 
      }, { quoted: msg });
    }
  }
};
