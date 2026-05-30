/**
 * Weather Command - Consulting the Celestial Winds
 * Styled with True Wukong Monkey King Personality 🐒⚡🌤️
 */

const axios = require('axios');

module.exports = {
  name: 'weather',
  aliases: ['w', 'clima', 'sky', 'forecast'],
  category: 'utility',
  description: 'Consult the Celestial Winds to get the weather',
  usage: '.weather <city>',
  
  async execute(sock, msg, args) {
    try {
      if (args.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '🪵 *Wukong sniffs the air:* You want to know the state of the clouds? Give me a city to look upon!' 
        }, { quoted: msg });
      }
      
      const city = args.join(' ');
      const apiKey = '4902c0f2550f58298ad4146a92b65e10';
      
      await sock.sendMessage(msg.key.remoteJid, { react: { text: '🌤️', key: msg.key } });
      
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const weather = response.data;
      
      const weatherText = `🐒 *The Celestial Winds have spoken for ${weather.name}!*\n\n` +
                          `🌬️ *Conditions:* ${weather.weather[0].description}\n` +
                          `🌡️ *Temperature:* ${weather.main.temp}°C\n` +
                          `💧 *Humidity:* ${weather.main.humidity}%\n\n` +
                          `_Whatever the weather, the Great Sage is always ready for a fight!_`;
      
      await sock.sendMessage(msg.key.remoteJid, { text: weatherText }, { quoted: msg });
      
    } catch (error) {
      console.error('Error fetching weather:', error);
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '💥 *Chaos in Heaven:* The clouds are swirling too fast! I cannot see the conditions in that city.' 
      }, { quoted: msg });
    }
  }
};
