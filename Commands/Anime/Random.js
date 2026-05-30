/**
 * Random Command - Get random anime data
 * Styled with True Wukong Monkey King Personality 🐒⚡📜
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const BASE = 'https://api.princetechn.com/api/anime/random';
const API_KEY = 'prince';

module.exports = {
  name: 'random',
  aliases: ['animerandom', 'randomanime', 'drawscroll', 'fortunetale'],
  category: 'anime',
  description: 'Draw a random legend from the Celestial Archive',
  usage: '.random',
  execute: async (sock, msg, args, extra) => {
    try {
      await extra.reply('⏳ *Wukong is pulling a random legend from the archives...*');
      
      const url = `${BASE}?apikey=${API_KEY}`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000
      });
      
      if (!response.data || !response.data.result) {
        throw new Error('The legend scroll is empty!');
      }
      
      const animeData = response.data.result;
      
      // Download thumbnail
      let imageBuffer = null;
      if (animeData.thumbnail) {
        try {
          const imgRes = await axios.get(animeData.thumbnail, { responseType: 'arraybuffer', timeout: 30000 });
          if (imgRes.data.length < 5 * 1024 * 1024) imageBuffer = Buffer.from(imgRes.data);
        } catch (e) { imageBuffer = null; }
      }
      
      // Build Wukong-styled caption
      let caption = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖳𝖠𝖫𝖤  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
      caption += `📜 *Title:* *${animeData.title || 'Unknown Legend'}*\n`;
      caption += `📺 *Episodes:* ${animeData.episodes || 'Unknown'}\n`;
      caption += `📊 *Status:* ${animeData.status || 'Ongoing'}\n\n`;
      caption += `📝 *Tale:* ${animeData.synopsis || 'No description found in the scrolls.'}\n\n`;
      caption += `🔗 ${animeData.link || ''}`;
      
      if (imageBuffer) {
        const tempPath = path.join(getTempDir(), `random_${Date.now()}.jpg`);
        try {
          fs.writeFileSync(tempPath, imageBuffer);
          await sock.sendMessage(extra.from, { image: fs.readFileSync(tempPath), caption }, { quoted: msg });
        } finally { deleteTempFile(tempPath); }
      } else {
        await sock.sendMessage(extra.from, { text: caption }, { quoted: msg });
      }
      
    } catch (error) {
      console.error('Error in random command:', error);
      
      let reply = '💥 *Chaos in Heaven:* The archive ledger has been misplaced.';
      if (error.response?.status === 429) reply = '🪵 *Wukong Grumbles:* Stop drawing scrolls so quickly! My archives need a moment to settle.';
      
      await extra.reply(reply);
    }
  }
};
