/**
 * Wukong-MD: The Celestial Transmuter
 * Architected by XyzTech 🐒⚡
 * Shaping media for the WhatsApp Heavens.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * The Great Sage’s FFMPEG engine.
 * Transmutes buffers through the fires of the encoder.
 */
function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      const tempDir = path.join(__dirname, '../temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      let tmp = path.join(tempDir, Date.now() + '.' + ext);
      let out = tmp + '.' + ext2;
      
      await fs.promises.writeFile(tmp, buffer);
      
      spawn('ffmpeg', ['-y', '-i', tmp, ...args, out])
        .on('error', (err) => {
          console.error(`💥 [Wukong-MD]: Transmutation failed: ${err.message}`);
          reject(err);
        })
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp);
            if (code !== 0) return reject(code);
            const outputBuffer = await fs.promises.readFile(out);
            resolve(outputBuffer);
            await fs.promises.unlink(out);
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Transmute Audio to MP3
 */
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn', '-ac', '2', '-b:a', '128k', '-ar', '44100', '-f', 'mp3'
  ], ext, 'mp3');
}

/**
 * Transmute Audio to PTT (Voice Note)
 */
function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn', '-c:a', 'libopus', '-b:a', '128k', '-vbr', 'on', '-compression_level', '10'
  ], ext, 'opus');
}

/**
 * Transmute to Video (MP4)
 */
function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264', '-c:a', 'aac', '-ab', '128k', '-ar', '44100', '-crf', '32', '-preset', 'slow'
  ], ext, 'mp4');
}

module.exports = {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
};
