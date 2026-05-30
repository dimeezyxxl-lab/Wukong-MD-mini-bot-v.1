/**
 * Meme Command - Send random memes
 * Styled with True Wukong Monkey King Personality 🐒⚡😂
 */

const APIs = require('../../utils/api');
const axios = require('axios');

module.exports = {
  name: 'meme',
  aliases: ['memes', 'mirth', 'giggles'],
  category: 'fun',
  description: 'Unseal a Scroll of Mirth from the digital realms',
  usage: '.meme',
  
  async execute(sock, msg, args, extra) {
    try {
      await extra.reply('⏳ *Wukong is scavenging the digital realms for a Scroll of Mirth...*');
      
      const meme = await APIs.getMeme();
      
      const imageResponse = await axios.get(meme.url, { 
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      await sock.sendMessage(extra.from, {
        image: Buffer.from(imageResponse.data),
        caption: `🐒 *Wukong’s Scroll of Mirth:*\n\n` +
                 `✨ _"${meme.title}"_\n\n` +
                 `📌 *Source:* r/${meme.subreddit}\n` +
                 `👤 *Scribe:* ${meme.author}\n` +
                 `🔥 *Influence:* ${meme.ups} upvotes`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('[Meme Error]:', error);
      await extra.reply('💥 *Chaos in Heaven:* The digital spirits have hidden all the funny scrolls! I cannot find a single one to show you.');
    }
  }
};
