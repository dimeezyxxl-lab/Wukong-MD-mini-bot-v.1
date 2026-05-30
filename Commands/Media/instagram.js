/**
 * Instagram Downloader - Using ruhend-scraper
 * Styled with True Wukong Monkey King Personality 🐒⚡🍎
 */

const { igdl } = require('ruhend-scraper');
const config = require('../../config');

const processedMessages = new Set();

module.exports = {
  name: 'instagram',
  aliases: ['ig', 'insta', 'igdl', 'reels', 'pluck'],
  category: 'media',
  description: 'Pluck visual fruits from the Instagram Orchard',
  usage: '.instagram <link>',
  
  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      if (processedMessages.has(msg.key.id)) return;
      
      processedMessages.add(msg.key.id);
      setTimeout(() => processedMessages.delete(msg.key.id), 300000);
      
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || args.join(' ');
      
      if (!text || !/https?:\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\//.test(text)) {
        return extra.reply('🪵 *Wukong Scratches Ear:* That is not a tree I recognize! Send me a valid Instagram link.');
      }
      
      await sock.sendMessage(chatId, { react: { text: '🐒', key: msg.key } });
      await extra.reply('⏳ *Wukong is leaping into the Instagram Orchard to gather the fruits for you...*');
      
      const downloadData = await igdl(text);
      if (!downloadData?.data?.length) {
        return extra.reply('💥 *Chaos in Heaven:* The orchard is empty! Perhaps the post is guarded by a private barrier.');
      }
      
      const mediaToDownload = Array.from(new Set(downloadData.data.map(m => m.url)))
        .map(url => downloadData.data.find(m => m.url === url))
        .slice(0, 10);
      
      for (let i = 0; i < mediaToDownload.length; i++) {
        try {
          const media = mediaToDownload[i];
          const isVideo = media.type === 'video' || /\.(mp4|mov)$/i.test(media.url);
          
          await sock.sendMessage(chatId, {
            [isVideo ? 'video' : 'image']: { url: media.url },
            mimetype: isVideo ? 'video/mp4' : 'image/jpeg',
            caption: `🐒 *Plucked by ${config.botName.toUpperCase()}*`
          }, { quoted: msg });
          
          await new Promise(r => setTimeout(r, 1000));
        } catch (e) {
          console.error('Download error:', e);
        }
      }
      
    } catch (error) {
      console.error('Error in Instagram command:', error);
      await extra.reply('💥 *Chaos in Heaven:* The spirits of the orchard have blocked my path!');
    }
  }
};
