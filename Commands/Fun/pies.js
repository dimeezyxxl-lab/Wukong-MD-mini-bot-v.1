/**
 * Pies Command - Get random pie images by country
 * Styled with True Wukong Monkey King Personality 🐒⚡🥧
 */

const axios = require('axios');

const BASE = 'https://api.shizo.top/pies';
const VALID_COUNTRIES = ['india', 'malaysia', 'thailand', 'china', 'indonesia', 'japan', 'korea', 'vietnam'];

module.exports = {
  name: 'pies',
  aliases: ['pie', ...VALID_COUNTRIES],
  category: 'fun',
  description: 'Steal a Celestial Delicacy from a mortal kitchen',
  usage: '.pies <country>',
  execute: async (sock, msg, args, extra) => {
    try {
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
      const config = require('../../config');
      const prefix = config.prefix || '.';
      const parts = text.trim().split(/\s+/);
      const commandUsed = parts[0]?.replace(prefix, '').toLowerCase() || '';
      
      let country = VALID_COUNTRIES.includes(commandUsed) ? commandUsed : (args[0] || '').toLowerCase();
      
      if (!country) {
        return await extra.reply(
          `🪵 *Wukong is hungry!* Specify which land to raid for a delicacy:\n\n*Available Lands:* ${VALID_COUNTRIES.join(', ')}`
        );
      }
      
      if (!VALID_COUNTRIES.includes(country)) {
        return await extra.reply(
          `💥 *Chaos in Heaven:* I have not visited the kitchens of ${country}. Choose from: ${VALID_COUNTRIES.join(', ')}`
        );
      }
      
      await extra.reply(`⏳ *Wukong is infiltrating the kitchens of ${country} to snatch a treat...*`);
      
      const url = `${BASE}/${country}?apikey=shizo`;
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      
      const imageBuffer = Buffer.from(response.data);
      if (!response.headers['content-type']?.includes('image')) throw new Error('The kitchen was empty!');
      
      await sock.sendMessage(extra.from, {
        image: imageBuffer,
        caption: `🥧 *Wukong has successfully raided a ${country} pie!*`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in pies command:', error);
      await extra.reply(`💥 *Chaos in Heaven:* The pantry was locked! (${error.message})`);
    }
  }
};
