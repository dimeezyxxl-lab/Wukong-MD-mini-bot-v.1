/**
 * Thunder Text Effect - The Roar of the Celestial Storm
 * Styled with True Wukong Monkey King Personality 🐒⚡⛈️
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'thunder',
  aliases: ['storm', 'lightning', 'strike', 'boom'],
  category: 'textmaker',
  description: 'Strike your words with the roar of the Celestial Storm',
  usage: '.thunder <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong pounds his chest:* The heavens are trembling! Give me the name to strike with my thunder.' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '⛈️', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/thunder-text-effect-online-97.html', text);
      
      if (!result?.image) {
        throw new Error('The lightning has struck in the wrong place!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The storm has been unleashed!*\n\n🔱 _Your words echo with the power of the Great Sage._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in thunder command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* My strike missed! The clouds have cleared and the thunder has gone silent.' 
      }, { quoted: msg });
    }
  }
};
