/**
 * Wukong-MD: The Celestial API Gateway
 * Architected by XyzTech 🐒⚡
 * Directing requests to the far reaches of the digital heavens.
 */

const axios = require('axios');

// Wukong's refined client
const api = axios.create({
  timeout: 30000,
  headers: {
    'User-Agent': 'Wukong-MD/1.0 (XyzTech Architected; Node.js)'
  }
});

// Internal helper for thematic error logging
const celestialError = (action, err) => {
  console.error(`💥 [Wukong-MD API]: The Celestial Gateway failed to ${action}: ${err.message}`);
  throw new Error(`The heavens could not ${action} at this moment.`);
};

const APIs = {
  // ... [Keep your existing generateImage, chatAI, and Download methods here] ...
  
  // Example of updated error handling for one of your methods:
  translate: async (text, to = 'en') => {
    try {
      const response = await api.get(`https://api.siputzx.my.id/api/tools/translate`, {
        params: { text, to }
      });
      return response.data;
    } catch (error) {
      celestialError('translate the ancient scripts', error);
    }
  },

  // Screenshot with Celestial flair
  screenshotWebsite: async (url) => {
    try {
      const apiUrl = `https://eliteprotech-apis.zone.id/ssweb?url=${encodeURIComponent(url)}`;
      const response = await axios.get(apiUrl, {
        timeout: 30000,
        responseType: 'arraybuffer',
        headers: { 'User-Agent': 'Wukong-MD/1.0' }
      });
      return Buffer.from(response.data);
    } catch (error) {
      celestialError('capture the image of the mortal realm', error);
    }
  },

  // TTS with Celestial flair
  textToSpeech: async (text) => {
    try {
      const apiUrl = `https://www.laurine.site/api/tts/tts-nova?text=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl, { timeout: 30000 });
      
      // ... [Keep your robust response parsing logic here] ...
      
      return response.data; // Ensure this follows your existing logic
    } catch (error) {
      celestialError('give voice to your words', error);
    }
  },

  // Add the rest of your methods here...
};

module.exports = APIs;
