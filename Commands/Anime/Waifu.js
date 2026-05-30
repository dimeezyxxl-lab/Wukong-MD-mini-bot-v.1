/**
 * Waifu Command - Get random waifu anime images
 * Styled with True Wukong Monkey King Personality 🐒🔮✨
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const BASE = 'https://api.princetechn.com/api/anime/waifu';
const API_KEY = 'prince';

module.exports = {
  name: 'waifu',
  aliases: ['waifusfw', 'sacredbeauty', 'celestialportrait'],
  category: 'anime',
  description: 'Retrieve a portrait of sacred beauty from the Celestial Gallery',
  usage: '.waifu',
  execute: async (sock, msg, args, extra) => {
    try {
      await extra.reply('⏳ *Wukong is strolling through the sacred galleries to find a portrait...*');
      
      const url = `${BASE}?apikey=${API_KEY}`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000
      });
      
      if (!response.data || !response.data.result) {
        throw new Error('The portrait was whisked away by the wind!');
      }
      
      const imageUrl = response.data.result;
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      const imageBuffer = Buffer.from(imageResponse.data);
      
      if (imageBuffer.length > 5 * 1024 * 1024) {
        throw new Error(`The portrait is too divine for this mortal message!`);
      }
      
      const tempDir = getTempDir();
      const tempImagePath = path.join(tempDir, `waifu_${Date.now()}.jpg`);
      
      try {
        fs.writeFileSync(tempImagePath, imageBuffer);
        const finalBuffer = fs.readFileSync(tempImagePath);
        
        await sock.sendMessage(extra.from, {
          image: finalBuffer,
          caption: '✨ *Wukong displays a portrait from the Sacred Gallery!*'
        }, { quoted: msg });
        
      } finally {
        deleteTempFile(tempImagePath);
      }
      
    } catch (error) {
      console.error('Error in waifu command:', error);
      
      let reply = '💥 *Chaos in Heaven:* The gallery curator is hiding the portrait.';
      if (error.response?.status === 429) reply = '🪵 *Wukong Grumbles:* Patience, mortal! The sacred galleries are not a marketplace for you to rush.';
      
      await extra.reply(reply);
    }
  }
};
