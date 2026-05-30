/**
 * Neko Command - Get random neko anime images
 * Styled with True Wukong Monkey King Personality 🐒🐱🌀
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const BASE = 'https://api.princetechn.com/api/anime/neko';
const API_KEY = 'prince';

module.exports = {
  name: 'neko',
  aliases: ['nekosfw', 'catspirit', 'feline'],
  category: 'anime',
  description: 'Summon a playful cat spirit from the mountain shadows',
  usage: '.neko',
  execute: async (sock, msg, args, extra) => {
    try {
      await extra.reply('⏳ *Wukong is chasing down a stray cat spirit for you...*');
      
      const url = `${BASE}?apikey=${API_KEY}`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000
      });
      
      if (!response.data || !response.data.result) {
        throw new Error('The cat spirit escaped!');
      }
      
      const imageUrl = response.data.result;
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      const imageBuffer = Buffer.from(imageResponse.data);
      
      if (imageBuffer.length > 5 * 1024 * 1024) {
        throw new Error(`This feline is too wild to contain in a scroll!`);
      }
      
      const tempDir = getTempDir();
      const tempImagePath = path.join(tempDir, `neko_${Date.now()}.jpg`);
      
      try {
        fs.writeFileSync(tempImagePath, imageBuffer);
        const finalBuffer = fs.readFileSync(tempImagePath);
        
        await sock.sendMessage(extra.from, {
          image: finalBuffer,
          caption: '🐱 *Wukong caught a mischievous cat spirit!*'
        }, { quoted: msg });
        
      } finally {
        deleteTempFile(tempImagePath);
      }
      
    } catch (error) {
      console.error('Error in neko command:', error);
      
      let reply = '💥 *Chaos in Heaven:* The cat spirit slipped through my fingers.';
      if (error.response?.status === 429) reply = '🪵 *Wukong Grumbles:* The spirits are hiding! You are scaring them away with too many calls.';
      
      await extra.reply(reply);
    }
  }
};
