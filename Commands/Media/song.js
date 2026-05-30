/**
 * Song Downloader - Download audio from YouTube
 * Styled with True Wukong Monkey King Personality 🐒⚡🎶
 */

const yts = require('yt-search');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const APIs = require('../../utils/api');
const { toAudio } = require('../../utils/converter');

module.exports = {
  name: 'song',
  aliases: ['play', 'music', 'yta', 'melody', 'tune'],
  category: 'media',
  description: 'Retrieve a Celestial Melody from the YouTube realms',
  usage: '.song <song name or URL>',
  
  async execute(sock, msg, args) {
    try {
      const text = args.join(' ');
      const chatId = msg.key.remoteJid;
      
      if (!text) {
        return await sock.sendMessage(chatId, { 
          text: '🪵 *Wukong is waiting:* Tell me which melody you desire! Use: .song <name/url>' 
        }, { quoted: msg });
      }
      
      let video;
      if (text.includes('youtube.com') || text.includes('youtu.be')) {
        video = { url: text };
      } else {
        const search = await yts(text);
        if (!search?.videos.length) return await sock.sendMessage(chatId, { text: '💥 *Chaos in Heaven:* I cannot find that melody in the scrolls.' }, { quoted: msg });
        video = search.videos[0];
      }
      
      await sock.sendMessage(chatId, {
        image: { url: video.thumbnail },
        caption: `🐒 *Wukong is plucking the melody:* \n\n🎵 *Title:* ${video.title}\n⏱ *Duration:* ${video.timestamp}`
      }, { quoted: msg });
      
      // Retrieval Chain
      let audioBuffer;
      const apiMethods = [
        { name: 'EliteProTech', method: () => APIs.getEliteProTechDownloadByUrl(video.url) },
        { name: 'Yupra', method: () => APIs.getYupraDownloadByUrl(video.url) },
        { name: 'Okatsu', method: () => APIs.getOkatsuDownloadByUrl(video.url) },
        { name: 'Izumi', method: () => APIs.getIzumiDownloadByUrl(video.url) }
      ];
      
      for (const api of apiMethods) {
        try {
          const data = await api.method();
          const url = data.download || data.dl || data.url;
          if (!url) continue;
          
          const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 90000 });
          if (res.data?.length > 0) { audioBuffer = Buffer.from(res.data); break; }
        } catch (e) { continue; }
      }
      
      if (!audioBuffer) throw new Error('All sources are sealed by the Heavens.');

      // Refinement (Conversion)
      let finalBuffer = audioBuffer;
      const ftyp = audioBuffer.slice(4, 8).toString('ascii');
      if (ftyp !== 'ftyp' && audioBuffer.toString('ascii', 0, 3) !== 'ID3') {
        finalBuffer = await toAudio(audioBuffer, 'mp4');
      }

      await sock.sendMessage(chatId, {
        audio: finalBuffer,
        mimetype: 'audio/mpeg',
        fileName: `${(video.title || 'melody').replace(/[^\w\s-]/g, '')}.mp3`,
        ptt: false
      }, { quoted: msg });
      
    } catch (err) {
      console.error('Song Error:', err);
      await sock.sendMessage(msg.key.remoteJid, { text: '💥 *Chaos in Heaven:* My staff failed to reach that melody. It may be restricted by mortal laws!' }, { quoted: msg });
    }
  }
};
