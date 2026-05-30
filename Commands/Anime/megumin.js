/**
 * Megumin Command - Get random megumin anime images
 * Styled with True Wukong Monkey King Personality 🐒💥🔥
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const BASE = 'https://api.princetechn.com/api/anime/megumin';
const API_KEY = 'prince';

module.exports = {
  name: 'megumin',
  aliases: ['meguminnsfw', 'explosion', 'pyromage'],
  category: 'anime',
  description: 'Summon an explosive Pyro-Mage scroll from the Great Sage\'s collection',
  usage: '.megumin',
  execute: async (sock, msg, args, extra) => {
    try {
      await extra.reply('⏳ *Wukong is channeling explosive energy to find a Megumin scroll...*');
      
      const url = `${BASE}?apikey=${API_KEY}`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 30000
      });
      
      if (!response.data || !response.data.result) {
        throw new Error('The explosive scroll failed to materialize!');
      }
      
      const imageUrl = response.data.result;
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      const imageBuffer = Buffer.from(imageResponse.data);
      
      if (imageBuffer.length > 5 * 1024 * 1024) {
        throw new Error(`The explosion was too massive for this scroll!`);
      }
      
      const tempDir = getTempDir();
      const tempImagePath = path.join(tempDir, `megumin_${Date.now()}.jpg`);
      
      try {
        fs.writeFileSync(tempImagePath, imageBuffer);
        const finalBuffer = fs.readFileSync(tempImagePath);
        
        await sock.sendMessage(extra.from, {
          image: finalBuffer,
          caption: '💥 *Wukong unveils a volatile Pyro-Mage scroll!*'
        }, { quoted: msg });
        
      } finally {
        deleteTempFile(tempImagePath);
      }
      
    } catch (error) {
      console.error('Error in megumin command:', error);
      
      let reply = '💥 *Chaos in Heaven:* The explosive seal misfired and the scroll vanished.';
      if (error.response?.status === 429) reply = '🪵 *Wukong Grumbles:* Stop casting Explosion spells! The archive needs time to cool down.';
      
      await extra.reply(reply);
    }
  }
};
