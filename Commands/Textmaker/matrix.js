/**
 * Matrix Text Effect - Reading the Celestial Ledger
 * Styled with True Wukong Monkey King Personality 🐒⚡🟢
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'matrix',
  aliases: ['ledger', 'code', 'digital', 'fate'],
  category: 'textmaker',
  description: 'Inscribe your name into the Celestial Ledger of Fate',
  usage: '.matrix <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong eyes the falling glyphs:* Whose fate shall I reveal within the endless code?' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🟢', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/matrix-text-effect-154.html', text);
      
      if (!result?.image) {
        throw new Error('The ledger is currently encrypted by the Heavens!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *Your name is inscribed in the code!*\n\n🔱 _You are now part of the eternal scroll._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in matrix command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The code is shifting too fast! My eyes cannot pin down your destiny.' 
      }, { quoted: msg });
    }
  }
};
