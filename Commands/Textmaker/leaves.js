/**
 * Leaves Text Effect - Whispers of the Forest Spirit
 * Styled with True Wukong Monkey King Personality 🐒⚡🌿
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'leaves',
  aliases: ['nature', 'forest', 'green', 'foliage'],
  category: 'textmaker',
  description: 'Weave your words into the vibrant Forest foliage',
  usage: '.leaves <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong gathers the vines:* Which words shall I weave into the living greenery of the mountain?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🌿', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html', text);
      
      if (!result?.image) {
        throw new Error('The forest spirits are hiding in the shadows!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The foliage has bloomed!*\n\n🔱 _Your words are now one with the mountain essence._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in leaves command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The vines have withered! The forest spirits refuse to answer my call.' 
      }, { quoted: msg });
    }
  }
};
