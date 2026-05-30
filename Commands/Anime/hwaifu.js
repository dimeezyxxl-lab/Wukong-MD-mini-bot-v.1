/**
 * Hwaifu Command - Get random hwaifu anime images
 * Styled with True Wukong Monkey King Personality 🐒🔮🔞
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const BASE = 'https://api.princetechn.com/api/anime/hwaifu';
const API_KEY = 'prince';

module.exports = {
  name: 'hwaifu',
  aliases: ['hwaifunsfw', 'waifuscroll', 'celestialbeauty'],
  category: 'anime',
  description: 'Unseal a forbidden waifu scroll from the Great Sage\'s collection',
  usage: '.hwaifu',
  execute: async (sock, msg, args, extra) => {
    try {
      await extra.reply('⏳ *Wukong is diving into the ethereal archives to find a beauty...*');
      
      const url = `${BASE}?apikey=${API_KEY}`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000
      });
      
      if (!response.data || !response.data.result) {
        throw new Error('The celestial scroll is blank!');
      }
      
      const imageUrl = response.data.result;
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      const imageBuffer = Buffer.from(imageResponse.data);
      
      if (imageBuffer.length > 5 * 1024 * 1024) {
        throw new Error(`This beauty is too powerful for this mortal realm!`);
      }
      
      const tempDir = getTempDir();
      const tempImagePath = path.join(tempDir, `hwaifu_${Date.now()}.jpg`);
      
      try {
        fs.writeFileSync(tempImagePath, imageBuffer);
        const finalBuffer = fs.readFileSync(tempImagePath);
        
        await sock.sendMessage(extra.from, {
          image: finalBuffer,
          caption: '✨ *Wukong reveals a hidden beauty from the dream realms!*'
        }, { quoted: msg });
        
      } finally {
        deleteTempFile(tempImagePath);
      }
      
    } catch (error) {
      console.error('Error in hwaifu command:', error);
      
      let reply = '💥 *Chaos in Heaven:* The archive entrance is blocked by a spirit seal.';
      if (error.response?.status === 429) reply = '🪵 *Wukong Grumbles:* Slow down! You are trying to empty my collection faster than I can sort it.';
      
      await extra.reply(reply);
    }
  }
};
