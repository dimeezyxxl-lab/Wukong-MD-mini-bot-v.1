/**
 * Hacker Text Effect - Penetrating the Celestial Firewall
 * Styled with True Wukong Monkey King Personality 🐒⚡💻
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'hacker',
  aliases: ['anon', 'anonymous', 'infiltrate', 'cyber'],
  category: 'textmaker',
  description: 'Infiltrate the digital realm and forge your name',
  usage: '.hacker <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong cracks his knuckles:* Who shall we impersonate? Give me a name to weave into the code!' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '💻', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html', text);
      
      if (!result?.image) {
        throw new Error('The firewall is too thick; my intrusion failed!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The gates have been breached!*\n\n🔱 _Your presence is now hidden within the code._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in hacker command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The digital guards have cornered me! The firewall remains sealed.' 
      }, { quoted: msg });
    }
  }
};
