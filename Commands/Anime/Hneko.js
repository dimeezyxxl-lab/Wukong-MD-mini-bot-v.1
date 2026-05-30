/**
 * Hneko Command - Get random hneko anime images
 * Styled with True Wukong Monkey King Personality 🐒🔮🔞
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const BASE = 'https://api.princetechn.com/api/anime/hneko';
const API_KEY = 'prince';

module.exports = {
  name: 'hneko',
  aliases: ['hnekonsfw', 'forbiddenscroll', 'secrets'],
  category: 'anime',
  description: 'Unseal a forbidden anime scroll from the Great Sage\'s hidden collection',
  usage: '.hneko',
  execute: async (sock, msg, args, extra) => {
    try {
      await extra.reply('⏳ *Wukong is rummaging through his secret archives...*');
      
      const url = `${BASE}?apikey=${API_KEY}`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000
      });
      
      if (!response.data || !response.data.result) {
        throw new Error('The scroll was empty!');
      }
      
      const imageUrl = response.data.result;
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      const imageBuffer = Buffer.from(imageResponse.data);
      
      if (imageBuffer.length > 5 * 1024 * 1024) {
        throw new Error(`The scroll is too heavy to manifest!`);
      }
      
      const tempDir = getTempDir();
      const tempImagePath = path.join(tempDir, `hneko_${Date.now()}.jpg`);
      
      try {
        fs.writeFileSync(tempImagePath, imageBuffer);
        const finalBuffer = fs.readFileSync(tempImagePath);
        
        await sock.sendMessage(extra.from, {
          image: finalBuffer,
          caption: '🔥 *Wukong tosses a forbidden scroll to the court!*'
        }, { quoted: msg });
        
      } finally {
        deleteTempFile(tempImagePath);
      }
      
    } catch (error) {
      console.error('Error in hneko command:', error);
      
      let reply = '💥 *Chaos in Heaven:* The secret archives are locked tight or the scroll turned to dust.';
      if (error.response?.status === 429) reply = '🪵 *Wukong Scolds:* Patience! You are rifling through my scrolls too fast.';
      
      await extra.reply(reply);
    }
  }
};
