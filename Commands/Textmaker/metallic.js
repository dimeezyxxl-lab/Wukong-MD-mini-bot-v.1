/**
 * Metallic Text Effect - Forging the Iron Bones
 * Styled with True Wukong Monkey King Personality 🐒⚡🔨
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'metallic',
  aliases: ['metal', 'iron', 'steel', 'forge'],
  category: 'textmaker',
  description: 'Forge your words into solid celestial metal',
  usage: '.metallic <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong swings his hammer:* My forge is ready! What words shall I beat into solid iron?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🔨', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/impressive-decorative-3d-metal-text-effect-798.html', text);
      
      if (!result?.image) {
        throw new Error('The celestial furnace has cooled down!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The forging is complete!*\n\n🔱 _Your words are now as hard as my own iron bones._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in metallic command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The metal has cracked! The hammer was too heavy for this script.' 
      }, { quoted: msg });
    }
  }
};
