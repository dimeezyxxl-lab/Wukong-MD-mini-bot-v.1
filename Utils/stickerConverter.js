/**
 * Wukong-MD: The Celestial Forge
 * Architected by XyzTech 🐒⚡
 * Forging raw media into professional stickers for the heavens.
 */

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { getTempDir, deleteTempFile } = require('./tempManager');

const MAX_FILE_SIZE = 50 * 1024 * 1024;

/**
 * Transmutes media into a WebP sticker through the fires of FFmpeg.
 */
const convertToSticker = async (mediaBuffer, options = {}) => {
  if (mediaBuffer.length > MAX_FILE_SIZE) {
    throw new Error(`💥 [Wukong-MD]: The artifact is too heavy for the mortal realm.`);
  }

  const tempDir = getTempDir();
  const inputPath = path.join(tempDir, `forge_in_${Date.now()}.${options.isVideo ? 'mp4' : 'jpg'}`);
  const outputPath = path.join(tempDir, `forge_out_${Date.now()}.webp`);
  
  try {
    fs.writeFileSync(inputPath, mediaBuffer);
    
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000',
          '-quality', '90',
          '-compression_level', '6',
          '-loop', '0'
        ])
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
    
    return fs.readFileSync(outputPath);
  } catch (error) {
    console.error(`💥 [Wukong-MD]: The Forge failed to transmute media: ${error.message}`);
    throw error;
  } finally {
    [inputPath, outputPath].forEach(file => deleteTempFile(file));
  }
};

/**
 * Imprints the Celestial Signature (Metadata) onto the forged sticker.
 */
const addStickerMetadata = async (stickerBuffer, packname, author) => {
  try {
    const webpmux = require('node-webpmux');
    const img = new webpmux.Image();
    await img.load(stickerBuffer);
    
    const metadata = {
      'sticker-pack-name': packname || 'Wukong-MD',
      'sticker-pack-publisher': author || 'XyzTech'
    };
    
    img.exif = Buffer.from(JSON.stringify(metadata), 'utf-8');
    return await img.save(null);
  } catch (error) {
    console.warn('🐒 [Wukong-MD]: Metadata could not be imprinted, but the sticker remains functional.');
    return stickerBuffer;
  }
};

/**
 * Executes the full forging process.
 */
const createSticker = async (mediaBuffer, isVideo = false, packname = 'Wukong-MD', author = 'XyzTech') => {
  let stickerBuffer = await convertToSticker(mediaBuffer, { isVideo });
  return await addStickerMetadata(stickerBuffer, packname, author);
};

module.exports = { convertToSticker, addStickerMetadata, createSticker };
