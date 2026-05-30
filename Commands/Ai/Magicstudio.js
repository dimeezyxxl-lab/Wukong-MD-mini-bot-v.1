/**
 * Magic Studio AI Art Generation Command
 * Styled with True Wukong Monkey King Personality 🐒⚡🎨
 */

const axios = require('axios');

const BASE = 'https://api.siputzx.my.id/api/ai/magicstudio';

module.exports = {
  name: 'imagine',
  aliases: ['magic', 'magicai', 'aiimage', 'generate', 'manifest'],
  category: 'ai',
  description: 'Use the Fiery Eyes to manifest visual art from the ether',
  usage: '.imagine <prompt>',
  execute: async (sock, msg, args, extra) => {
    try {
      const prompt = args.join(' ').trim();
      
      if (!prompt) {
        return await extra.reply(
          '🪵 *Wukong Scratches Head:* My Fiery Eyes are ready, but you haven\'t told me what to manifest! Give me a vision.\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .imagine a futuristic monkey king in a cyberpunk city'
        );
      }
      
      await extra.reply(`⏳ *Wukong is focusing his Fiery Eyes...* Manifesting your vision: "${prompt}"...`);
      
      // Fetch image from API
      const url = `${BASE}?prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': '*/*'
        },
        timeout: 120000 
      });
      
      const imageBuffer = Buffer.from(response.data);
      
      if (!imageBuffer || imageBuffer.length === 0) {
        throw new Error('The ether remained empty!');
      }
      
      const maxImageSize = 5 * 1024 * 1024; 
      if (imageBuffer.length > maxImageSize) {
        throw new Error(`The manifestation is too heavy for this realm: ${(imageBuffer.length / 1024 / 1024).toFixed(2)}MB (max 5MB)`);
      }
      
      // Send the generated masterpiece
      await sock.sendMessage(extra.from, {
        image: imageBuffer,
        caption: `✨ *Wukong's Manifestation:* "${prompt}"`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in magicstudio command:', error);
      
      let replyText = '💥 *Chaos in Heaven:* The ether was unstable and the manifestation failed.';
      
      if (error.response?.status === 429) {
        replyText = '🪵 *Wukong Sights:* I have expended too much energy. My Fiery Eyes need a brief rest from manifestation.';
      } else if (error.response?.status === 400) {
        replyText = '🪵 *Wukong Grumbles:* That vision is impossible to manifest from the ether. Try a clearer thought.';
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        replyText = '🪵 *Wukong Yawns:* The vision is too complex to summon instantly. Try a simpler request.';
      } else {
        replyText += ` (Details: ${error.message})`;
      }
      
      await extra.reply(replyText);
    }
  }
};
