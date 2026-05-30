/**
 * Snow Text Effect - The Silent Blizzard of the High Peaks
 * Styled with True Wukong Monkey King Personality 🐒⚡❄️
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'snow',
  aliases: ['winter', 'blizzard', 'whiteout', 'frozen'],
  category: 'textmaker',
  description: 'Blanket your words in the silent snow of the high peaks',
  usage: '.snow <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong brushes off his fur:* The summit is bitter cold! Give me the words to bury under the falling snow.' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🌨️', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/create-a-snow-3d-text-effect-free-online-621.html', text);
      
      if (!result?.image) {
        throw new Error('The blizzard is too thick; I cannot see the path!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The peaks have been dusted!*\n\n🔱 _Your words now rest in the eternal silence of the snow._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in snow command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The storm has swallowed the sky! I cannot cast the snow spell.' 
      }, { quoted: msg });
    }
  }
};
