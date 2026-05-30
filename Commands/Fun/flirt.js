/**
 * Flirt - Get a random flirty message from API
 * Styled with True Wukong Monkey King Personality 🐒⚡💖
 */

const axios = require('axios');

module.exports = {
  name: 'flirt',
  aliases: ['pickup', 'pickupline', 'charm', 'woo'],
  category: 'fun',
  description: 'Cast a Charm Incantation upon a fellow mortal',
  usage: '.flirt [@user]',
  execute: async (sock, msg, args, extra) => {
    try {
      // Fetch flirt message from API
      const response = await axios.get('https://api.shizo.top/quote/flirt?apikey=shizo');
      
      if (!response.data || !response.data.status || !response.data.result) {
        throw new Error('The romance scrolls are missing!');
      }
      
      const flirtText = response.data.result;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      
      let responseText = `🐒 *Wukong Smirks:* Even a mountain warrior needs to know how to use words. Try this charm: \n\n_"${flirtText}"_`;
      
      if (mentioned.length > 0) {
        await sock.sendMessage(extra.from, {
          text: `@${mentioned[0].split('@')[0]} ${responseText}`,
          mentions: mentioned
        }, { quoted: msg });
      } else {
        await extra.reply(responseText);
      }
      
    } catch (error) {
      console.error('Flirt Error:', error);
      await extra.reply(`💥 *Chaos in Heaven:* My charm incantations have failed. The spirits of romance are silent!`);
    }
  }
};
