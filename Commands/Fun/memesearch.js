/**
 * Meme Search Command - Search and get memes
 * Styled with True Wukong Monkey King Personality 🐒⚡🔮
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const { getTempDir, deleteTempFile } = require('../../utils/tempManager');

const BASE = 'https://api.shizo.top/tools/meme-search';

module.exports = {
  name: 'memesearch',
  aliases: ['memes', 'sm', 'smeme', 'gifsearch', 'gif', 'scry'],
  category: 'fun',
  description: 'Scry the digital realms for a visual Mirth Scroll',
  usage: '.memesearch <query>',
  execute: async (sock, msg, args, extra) => {
    try {
      const query = args.join(' ').trim();
      
      if (!query) {
        return await extra.reply(
          '🪵 *Wukong Scratches Head:* What vision do you seek in the digital void? Provide a keyword!'
        );
      }
      
      await extra.reply(`⏳ *Wukong is scrying the digital realms for "${query}"...*`);
      
      const url = `${BASE}?apikey=shizo&query=${encodeURIComponent(query)}`;
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      
      const mediaBuffer = Buffer.from(response.data);
      if (!mediaBuffer || mediaBuffer.length === 0) throw new Error('The digital void returned nothing!');
      
      const contentType = response.headers['content-type'] || '';
      const fileHeader = mediaBuffer.slice(0, 6).toString('ascii');
      const isGIF = fileHeader === 'GIF89a' || fileHeader === 'GIF87a' || contentType.includes('gif');
      
      if (isGIF) {
        const tempDir = getTempDir();
        const gifPath = path.join(tempDir, `meme_${Date.now()}.gif`);
        const mp4Path = path.join(tempDir, `meme_${Date.now()}.mp4`);
        
        fs.writeFileSync(gifPath, mediaBuffer);
        const ffmpegCmd = `"${ffmpegPath}" -i "${gifPath}" -vf "fps=15,scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000" -c:v libx264 -pix_fmt yuv420p -movflags +faststart -fps_mode vfr -y "${mp4Path}"`;
        
        await new Promise((resolve, reject) => exec(ffmpegCmd, (err) => err ? reject(err) : resolve()));
        
        await sock.sendMessage(extra.from, {
          video: fs.readFileSync(mp4Path),
          mimetype: 'video/mp4',
          gifPlayback: true
        }, { quoted: msg });
        
        deleteTempFile(gifPath);
        deleteTempFile(mp4Path);
      } else if (contentType.includes('video') || contentType.includes('mp4')) {
        await sock.sendMessage(extra.from, { video: mediaBuffer, mimetype: 'video/mp4' }, { quoted: msg });
      } else {
        await sock.sendMessage(extra.from, { image: mediaBuffer }, { quoted: msg });
      }
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The scrying ritual failed! (Details: ${error.message})`);
    }
  }
};
