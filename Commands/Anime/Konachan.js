/**
 * Konachan Command - Get random konachan anime images
 * Styled with True Wukong Monkey King Personality 🐒🔮🎨
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const BASE = 'https://api.princetechn.com/api/anime/konachan';
const API_KEY = 'prince';

module.exports = {
  name: 'konachan',
  aliases: ['konachansfw', 'galleryscroll', 'konagallery'],
  category: 'anime',
  description: 'Unseal a beautiful illustration scroll from the Konachan gallery',
  usage: '.konachan',
  execute: async (sock, msg, args, extra) => {
    try {
      await extra.reply('⏳ *Wukong is unrolling a masterpiece from the Konachan archives...*');
      
      const url = `${BASE}?apikey=${API_KEY}`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000
      });
      
      if (!response.data || !response.data.result) {
        throw new Error('The masterpiece is missing!');
      }
      
      const imageUrl = response.data.result;
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      const imageBuffer = Buffer.from(imageResponse.data);
      
      if (imageBuffer.length > 5 * 1024 * 1024) {
        throw new Error(`The illustration is too vast for this mortal scroll!`);
      }
      
      const tempDir = getTempDir();
      const tempImagePath = path.join(tempDir, `konachan_${Date.now()}.jpg`);
      
      try {
        fs.writeFileSync(tempImagePath, imageBuffer);
        const finalBuffer = fs.readFileSync(tempImagePath);
        
        await sock.sendMessage(extra.from, {
          image: finalBuffer,
          caption: '🎨 *Wukong presents an illustration from the Konachan gallery!*'
        }, { quoted: msg });
        
      } finally {
        deleteTempFile(tempImagePath);
      }
      
    } catch (error) {
      console.error('Error in konachan command:', error);
      
      let reply = '💥 *Chaos in Heaven:* The gallery gates are currently sealed.';
      if (error.response?.status === 429) reply = '🪵 *Wukong Grumbles:* Stop rushing the artist! The gallery is taking a brief rest.';
      
      await extra.reply(reply);
    }
  }
};
