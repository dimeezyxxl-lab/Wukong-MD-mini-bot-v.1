/**
 * Fire Text Effect - The Breath of the Mountain
 * Styled with True Wukong Monkey King Personality 🐒⚡🔥
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'fire',
  aliases: ['flame', 'inferno', 'burn'],
  category: 'textmaker',
  description: 'Ignite your words with the Mountain’s Breath',
  usage: '.fire <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong puffs his cheeks:* You must give me words to ignite! What shall I set ablaze?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🔥', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/flame-lettering-effect-372.html', text);
      
      if (!result?.image) {
        throw new Error('The furnace has gone cold!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The inferno is ignited!*\n\n🔱 _Your words now burn with the power of the Great Sage._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in fire command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The flames were too wild! Even my magic could not contain the heat.' 
      }, { quoted: msg });
    }
  }
};
