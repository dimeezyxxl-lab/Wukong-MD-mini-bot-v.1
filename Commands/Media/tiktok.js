/**
 * TikTok Downloader - Download TikTok videos
 * Styled with True Wukong Monkey King Personality 🐒⚡💃
 */

const { ttdl } = require('ruhend-scraper');
const axios = require('axios');
const APIs = require('../../utils/api');
const config = require('../../config');

const processedMessages = new Set();

module.exports = {
  name: 'tiktok',
  aliases: ['tt', 'ttdl', 'tiktokdl', 'shadow', 'flicker'],
  category: 'media',
  description: 'Snatch Dancing Shadows from the TikTok realm',
  usage: '.tiktok <TikTok URL>',
  
  async execute(sock, msg, args) {
    try {
      if (processedMessages.has(msg.key.id)) return;
      processedMessages.add(msg.key.id);
      setTimeout(() => processedMessages.delete(msg.key.id), 300000);
      
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || args.join(' ');
      const url = text.split(' ').slice(1).join(' ').trim();
      
      if (!url || !/tiktok\.com/.test(url)) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '🪵 *Wukong is baffled:* That is no TikTok scroll I know! Give me a proper link.' 
        }, { quoted: msg });
      }
      
      await sock.sendMessage(msg.key.remoteJid, { react: { text: '🐒', key: msg.key } });
      await extra.reply('⏳ *Wukong is chasing the dancing shadows...*');
      
      try {
        let videoUrl = null, title = null;
        
        // Strategy 1: API Scraper
        try {
          const result = await APIs.getTikTokDownload(url);
          videoUrl = result.videoUrl; title = result.title;
        } catch (e) { console.log('Strategy 1 failed...'); }
        
        // Strategy 2: TTDL Fallback
        if (!videoUrl) {
          try {
            const data = await ttdl(url);
            if (data?.data?.length > 0) {
              for (const m of data.data.slice(0, 5)) {
                await sock.sendMessage(msg.key.remoteJid, {
                  video: { url: m.url },
                  caption: `🐒 *Snatched from the Shadows by ${config.botName.toUpperCase()}*`
                }, { quoted: msg });
              }
              return;
            }
          } catch (e) { console.log('Strategy 2 failed...'); }
        }
        
        // Send via URL
        if (videoUrl) {
          const botName = config.botName.toUpperCase();
          const caption = `🐒 *Wukong has captured the shadow!*\n\n📝 *Title:* ${title || 'Untitled'}\n🔱 *Source:* ${botName}`;
          await sock.sendMessage(msg.key.remoteJid, { video: { url: videoUrl }, caption }, { quoted: msg });
        } else {
          throw new Error('The shadows are too fast to catch!');
        }
        
      } catch (error) {
        await sock.sendMessage(msg.key.remoteJid, { text: '💥 *Chaos in Heaven:* The digital shadows have slipped through my fingers!' }, { quoted: msg });
      }
    } catch (error) {
      console.error('TikTok Error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '💥 *Chaos in Heaven:* An unexpected calamity occurred!' }, { quoted: msg });
    }
  }
};
