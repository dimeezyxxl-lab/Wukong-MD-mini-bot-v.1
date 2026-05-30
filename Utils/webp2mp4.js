/**
 * Wukong-MD: The Celestial Transmuter
 * Architected by XyzTech 🐒⚡
 * Reshaping WebP stickers into the forms of the mortal realm.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const { getTempDir, deleteTempFile } = require('./tempManager');

/**
 * Transmutes WebP to a static PNG image.
 */
async function webp2png(webpBuffer) {
  try {
    const sharp = require('sharp');
    return await sharp(webpBuffer).png().toBuffer();
  } catch (sharpError) {
    console.warn('🐒 [Wukong-MD]: Sharp failed, engaging FFmpeg transmutation...');
    
    const tempDir = getTempDir();
    const ts = Date.now();
    const inputPath = path.join(tempDir, `webp_${ts}.webp`);
    const outputPath = path.join(tempDir, `png_${ts}.png`);
    
    try {
      fs.writeFileSync(inputPath, webpBuffer);
      await new Promise((resolve, reject) => {
        exec(`"${ffmpegPath}" -i "${inputPath}" -vf "select=eq(n\\,0)" -frames:v 1 -y "${outputPath}"`, (err) => err ? reject(err) : resolve());
      });
      return fs.readFileSync(outputPath);
    } finally {
      [inputPath, outputPath].forEach(deleteTempFile);
    }
  }
}

/**
 * Transmutes animated WebP into a GIF.
 */
async function webp2gif(webpBuffer) {
  const ts = Date.now();
  const framesDir = path.join(getTempDir(), `frames_${ts}`);
  const out = path.join(getTempDir(), `gif_${ts}.gif`);
  const pal = path.join(getTempDir(), `pal_${ts}.png`);
  
  try {
    if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });
    
    // Extraction logic...
    console.log(`🐒 [Wukong-MD]: Transmuting animated frames into a GIF...`);
    // ... [Maintain your robust extraction/palette/conversion logic here] ...
    
    return fs.readFileSync(out);
  } catch (err) {
    console.error(`💥 [Wukong-MD]: The GIF transmutation collapsed: ${err.message}`);
    throw err;
  } finally {
    // Cleanup logic remains the same
  }
}

/**
 * Transmutes animated WebP into an MP4 video.
 */
async function webp2mp4(webpBuffer) {
  console.log(`🐒 [Wukong-MD]: Transmuting animated sticker into an MP4...`);
  // ... [Maintain your MP4 conversion logic here] ...
}

module.exports = { webp2png, webp2gif, webp2mp4 };
