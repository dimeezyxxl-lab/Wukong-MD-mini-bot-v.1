/**
 * Devil Text Effect - Summoning the Fiery Wings
 * Styled with True Wukong Monkey King Personality 🐒⚡🔥
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'devil',
  aliases: ['demon', 'hellfire', 'darkwings'],
  category: 'textmaker',
  description: 'Summon the neon wings of the underworld',
  usage: '.devil <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong narrows his eyes:* What dark name shall sprout these neon wings?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🔥', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html', text);
      
      if (!result?.image) {
        throw new Error('The underworld has slammed its gates shut!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The wings have unfurled!*\n\n🔱 _Be careful, these flames are treacherous._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in devil command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The demon lord refuses my command! The flames have died out.' 
      }, { quoted: msg });
    }
  }
};
