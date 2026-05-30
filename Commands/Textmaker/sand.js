/**
 * Sand Text Effect - Etching into the Mortal Shores
 * Styled with True Wukong Monkey King Personality 🐒⚡🏖️
 */

const mumaker = require('mumaker');
const config = require('../../config');

module.exports = {
  name: 'sand',
  aliases: ['beach', 'shore', 'desert', 'drift'],
  category: 'textmaker',
  description: 'Etch your words into the shifting sands',
  usage: '.sand <text>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong stands on the beach:* The tide is coming in! Give me a name to etch into the sand before it washes away.' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(chatId, { react: { text: '🏖️', key: msg.key } });
      
      const result = await mumaker.ephoto('https://en.ephoto360.com/write-names-and-messages-on-the-sand-online-582.html', text);
      
      if (!result?.image) {
        throw new Error('The waves have washed away my work!');
      }
      
      await sock.sendMessage(chatId, {
        image: { url: result.image },
        caption: `🐒 *The etching is complete!*\n\n🔱 _A fleeting message left upon the mortal shores._\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in sand command:', error);
      await sock.sendMessage(chatId, { 
        text: '💥 *Chaos in Heaven:* The wind is too strong! The sand won\'t hold your words.' 
      }, { quoted: msg });
    }
  }
};
