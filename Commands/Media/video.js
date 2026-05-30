/**
 * Video Downloader - Download video from YouTube
 * Styled with True Wukong Monkey King Personality 🐒⚡📽️
 */

const yts = require('yt-search');
const APIs = require('../../utils/api');
const config = require('../../config');

module.exports = {
  name: 'ytvideo',
  aliases: ['ytv', 'ytmp4', 'ytvid', 'video', 'portrait'],
  category: 'media',
  description: 'Capture a Moving Portrait from the YouTube realms',
  usage: '.video <name or URL>',

  async execute(sock, msg, args) {
    try {
      const instanceConfig = config.getConfigFromSocket(sock);
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;

      if (!text.trim()) {
        return await sock.sendMessage(chatId, {
          text: '🪵 *Wukong is impatient:* Which moving portrait do you seek to capture? Provide a name or link!'
        }, { quoted: msg });
      }

      await sock.sendMessage(chatId, { react: { text: '🐒', key: msg.key } });

      let videoUrl = '', videoTitle = '', videoThumbnail = '';

      if (text.startsWith('http')) {
        videoUrl = text;
      } else {
        const { videos } = await yts(text);
        if (!videos?.length) return await sock.sendMessage(chatId, { text: '💥 *Chaos in Heaven:* My mirror shows nothing by that name!' }, { quoted: msg });
        videoUrl = videos[0].url;
        videoTitle = videos[0].title;
        videoThumbnail = videos[0].thumbnail;
      }

      // Capture the mirror image (Thumbnail)
      try {
        const ytId = (videoUrl.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/) || [])[1];
        const thumb = videoThumbnail || (ytId ? `https://i.ytimg.com/vi/${ytId}/sddefault.jpg` : undefined);
        if (thumb) {
          await sock.sendMessage(chatId, {
            image: { url: thumb },
            caption: `⏳ *Wukong is capturing the portrait:* *${videoTitle || text}*`
          }, { quoted: msg });
        }
      } catch (e) { console.error('[VIDEO] thumb error'); }

      // Retrieve the portrait
      let videoData;
      try {
        videoData = await APIs.getEliteProTechVideoByUrl(videoUrl) || 
                    await APIs.getYupraVideoByUrl(videoUrl) || 
                    await APIs.getOkatsuVideoByUrl(videoUrl);
      } catch (e) {
        throw new Error('The portrait is locked behind a celestial barrier!');
      }

      await sock.sendMessage(chatId, {
        video: { url: videoData.download },
        mimetype: 'video/mp4',
        fileName: `${(videoData.title || videoTitle || 'video').replace(/[^\w\s-]/g, '')}.mp4`,
        caption: `🐒 *Moving Portrait Captured!*\n\n*${videoData.title || videoTitle}*\n\n> _Retrieved by ${instanceConfig.botName}_`
      }, { quoted: msg });

    } catch (error) {
      console.error('[VIDEO] Command Error:', error?.message);
      await sock.sendMessage(msg.key.remoteJid, {
        text: '💥 *Chaos in Heaven:* My capture spell failed! The portrait has vanished.'
      }, { quoted: msg });
    }
  }
};
