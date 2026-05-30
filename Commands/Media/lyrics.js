/**
 * Lyrics Finder - Consult the Sacred Song Scrolls
 * Styled with True Wukong Monkey King Personality 🐒⚡🎶
 */

const axios = require('axios');
const config = require('../../config');

module.exports = {
  name: 'lyrics',
  aliases: ['lyric', 'lirik', 'song', 'verse'],
  category: 'media',
  description: 'Consult the Sacred Song Scrolls for lyrics',
  usage: '.lyrics <song name>',
  
  async execute(sock, msg, args) {
    try {
      if (args.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: `🪵 *Wukong is confused:* Which melody do you seek? Provide a song title!\n\nExample: ${config.prefix}lyrics Despacito` 
        });
      }
      
      const query = args.join(' ');
      await sock.sendMessage(msg.key.remoteJid, { react: { text: '📜', key: msg.key } });
      
      let lyricsData = null;
      
      // Consult the first library
      try {
        const response = await axios.get(`https://api.vreden.my.id/api/lyrics?query=${encodeURIComponent(query)}`);
        if (response.data?.result) {
          lyricsData = {
            title: response.data.result.title,
            artist: response.data.result.artist,
            lyrics: response.data.result.lyrics,
            thumbnail: response.data.result.thumbnail
          };
        }
      } catch (err) { console.log('Library 1 silent...'); }
      
      // Consult the second library if the first is empty
      if (!lyricsData) {
        try {
          const response = await axios.get(`https://api.siputzx.my.id/api/s/lyrics?query=${encodeURIComponent(query)}`);
          if (response.data?.data) {
            lyricsData = {
              title: response.data.data.title,
              artist: response.data.data.artist,
              lyrics: response.data.data.lyrics,
              thumbnail: response.data.data.image
            };
          }
        } catch (err) { console.log('Library 2 silent...'); }
      }
      
      if (!lyricsData) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '💥 *Chaos in Heaven:* The scrolls contain no record of this song!' 
        });
      }
      
      let lyrics = lyricsData.lyrics;
      if (lyrics.length > 4000) lyrics = lyrics.substring(0, 4000) + '...\n\n_...The scroll is too vast to hold in one scroll._';
      
      const caption = `🐒 *Wukong’s Sacred Song Scroll*\n\n` +
                      `🎶 *Title:* ${lyricsData.title}\n` +
                      `🎤 *Artist:* ${lyricsData.artist}\n\n` +
                      `📝 *Verses:*\n${lyrics}\n\n` +
                      `✨ _Retrieved from the archives by ${config.botName}_`;
      
      if (lyricsData.thumbnail) {
        await sock.sendMessage(msg.key.remoteJid, { image: { url: lyricsData.thumbnail }, caption });
      } else {
        await sock.sendMessage(msg.key.remoteJid, { text: caption });
      }
      
    } catch (error) {
      console.error('Lyrics command error:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: '💥 *Chaos in Heaven:* A demon has disrupted the transmission!' });
    }
  }
};
