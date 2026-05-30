/**
 * Neon Text Effect - Capturing the Lightning of the Storm
 * Styled with True Wukong Monkey King Personality 🐒⚡🌈
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'neon',
  aliases: ['glow', 'plasma', 'electric', 'laser'],
  category: 'textmaker',
  description: 'Charge your words with electrical neon energy',
  usage: '.neon <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong crackles with energy:* What words shall I charge with the electricity of the storm?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '⚡', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html', text);
      
      if (!result?.image) {
        throw new Error('The lightning has escaped my grasp!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The neon storm is unleashed!*\n\n🔱 _Your words are now pulsing with raw energy._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in neon command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The electrical grid has overloaded! My neon spell has flickered out.' 
      }, { quoted: msg });
    }
  }
};
