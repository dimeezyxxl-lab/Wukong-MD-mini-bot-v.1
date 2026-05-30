/**
 * Arena Text Effect - The Call to Battle
 * Styled with True Wukong Monkey King Personality 🐒⚡⚔️
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'arena',
  aliases: ['gladiator', 'battlefield', 'warbanner'],
  category: 'textmaker',
  description: 'Forge your name upon the Banners of the Arena',
  usage: '.arena <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong thumps his staff:* Who dares enter the pit? Give me the name to place upon the banner!' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '⚔️', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/create-cover-arena-of-valor-by-mastering-360.html', text);
      
      if (!result?.image) {
        throw new Error('The arena gates are locked!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The banner has been raised!*\n\n🔱 _Prepare yourself for the pit, ${text}._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in arena command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The battlefield is crumbling! I cannot raise the banner.' 
      }, { quoted: msg });
    }
  }
};
