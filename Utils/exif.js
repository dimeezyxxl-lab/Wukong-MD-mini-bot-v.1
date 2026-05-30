/**
 * Wukong-MD: The Celestial Signature
 * Architected by XyzTech 🐒⚡
 * Imprinting the Great Sage's mark onto digital stickers.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const webp = require('node-webpmux');
const { getTempDir, deleteTempFile } = require('./tempManager');

const MAX_FILE_SIZE = 50 * 1024 * 1024;

/**
 * Imprint metadata onto a sticker image
 */
async function writeExifImg(img, metadata) {
  const { packname = 'Wukong-MD', author = 'XyzTech' } = metadata;
  
  const imgWebp = new webp.Image();
  await imgWebp.load(img);
  
  const json = {
    'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
    'sticker-pack-name': packname,
    'sticker-pack-publisher': author,
    emojis: ['🐒', '⚡'],
  };
  
  const exifAttr = Buffer.from([
    0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
  ]);
  
  const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
  const exif = Buffer.concat([exifAttr, jsonBuffer]);
  exif.writeUIntLE(jsonBuffer.length, 14, 4);
  
  imgWebp.exif = exif;
  return await imgWebp.save(null);
}

/**
 * Imprint metadata onto a video sticker
 */
async function writeExifVid(videoBuffer, metadata) {
  const { packname = 'Wukong-MD', author = 'XyzTech' } = metadata;
  const ffmpegPath = require('ffmpeg-static');
  const { spawn } = require('child_process');
  
  if (videoBuffer.length > MAX_FILE_SIZE) {
    throw new Error(`💥 [Wukong-MD]: The file exceeds the mortal weight limit of 50MB.`);
  }
  
  const tempDir = getTempDir();
  const inputPath = path.join(tempDir, `input_${Date.now()}.mp4`);
  const outputPath = path.join(tempDir, `output_${Date.now()}.webp`);
  
  try {
    fs.writeFileSync(inputPath, videoBuffer);
    
    await new Promise((resolve, reject) => {
      const ff = spawn(ffmpegPath, [
        '-y', '-i', inputPath,
        '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000',
        '-c:v', 'libwebp', '-preset', 'default', '-loop', '0', '-vsync', '0', '-pix_fmt', 'yuva420p', '-quality', '75', '-compression_level', '6',
        outputPath
      ]);
      
      ff.on('close', (code) => code === 0 ? resolve() : reject(new Error('FFMPEG transmutation failed')));
    });
    
    return await writeExifImg(fs.readFileSync(outputPath), { packname, author });
  } catch (error) {
    console.error(`💥 [Wukong-MD]: Transmutation error: ${error.message}`);
    throw error;
  } finally {
    [inputPath, outputPath].forEach(file => deleteTempFile(file));
  }
}

module.exports = { writeExifImg, writeExifVid };
