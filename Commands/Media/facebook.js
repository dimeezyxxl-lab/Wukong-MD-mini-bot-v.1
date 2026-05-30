/**
 * Facebook Downloader - Download Facebook videos
 * Styled with True Wukong Monkey King Personality 🐒⚡📽️
 */

const { facebookdl } = require('@bochilteam/scraper-facebook');
const axios = require('axios');
const config = require('../../config');

const processedMessages = new Set();

module.exports = {
  name: 'facebook',
  aliases: ['fb', 'fbdl', 'facebookdl', 'archive'],
  category: 'media',
  description: 'Retrieve a video from the far-flung Facebook Kingdom',
  usage: '.facebook <Facebook URL>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (processedMessages.has(msg.key.id)) return;
      processedMessages.add(msg.key.id);
      setTimeout(() => processedMessages.delete(msg.key.id), 300000);
      
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || args.join(' ');
      const url = text.split(' ').slice(1).join(' ').trim();
      
      if (!url || !/https?:\/\/(?:www\.|m\.|fb\.watch|facebook\.com)/.test(url)) {
        return await extra.reply('🪵 *Wukong Grumbles:* That is no scroll I recognize! Give me a valid Facebook link.');
      }
      
      await sock.sendMessage(extra.from, { react: { text: '🌀', key: msg.key } });
      await extra.reply('⏳ *Wukong is channeling his spirit to pluck the video from the digital currents...*');
      
      try {
        const data = await facebookdl(url);
        if (!data || !data.video?.[0]) throw new Error('The video has vanished into the void!');
        
        const videoOption = data.video[0];
        const videoData = await videoOption.download();
        
        let videoUrl = (typeof videoData === 'string') ? videoData : (videoData?.url || null);
        let videoBuffer = Buffer.isBuffer(videoData) ? videoData : (videoData?.data ? Buffer.from(videoData.data) : null);
        
        const botName = config.botName.toUpperCase();
        let caption = `🐒 *Wukong’s Archive Retrieval*\n\n` +
                      `🔱 *Source:* ${botName}\n` +
                      `⏱️ *Duration:* ${data.duration || 'Unknown'}\n` +
                      `📽️ *Quality:* ${videoOption.quality || 'Standard'}`;
        
        if (videoBuffer) {
          await sock.sendMessage(extra.from, { video: videoBuffer, mimetype: 'video/mp4', caption }, { quoted: msg });
        } else {
          await sock.sendMessage(extra.from, { video: { url: videoUrl }, mimetype: 'video/mp4', caption }, { quoted: msg });
        }
        
      } catch (error) {
        console.error('Error in Facebook download:', error);
        await extra.reply(`💥 *Chaos in Heaven:* My retrieval spell failed! The video is protected by a spirit seal. (${error.message})`);
      }
    } catch (error) {
      console.error('Error in Facebook command:', error);
      await extra.reply('💥 *Chaos in Heaven:* An unknown calamity occurred!');
    }
  }
};
