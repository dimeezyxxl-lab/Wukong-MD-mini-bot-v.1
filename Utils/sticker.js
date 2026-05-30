/**
 * Wukong-MD: The Celestial Artistry Engine
 * Architected by XyzTech 🐒⚡
 * Transmuting media into sacred stickers for the WhatsApp Heavens.
 */

const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const sharp = require('sharp');
const config = require('../config');

/**
 * Transmutes a media buffer into a full-sized sticker.
 */
const createStickerBuffer = async (media, options = {}) => {
  try {
    const sticker = new Sticker(media, {
      pack: options.pack || config.packname,
      author: options.author || config.author,
      type: options.type || StickerTypes.FULL,
      categories: options.categories || ['🐒', '⚡'],
      id: options.id || '',
      quality: options.quality || 50
    });
    
    return await sticker.toBuffer();
  } catch (error) {
    console.error(`💥 [Wukong-MD]: Artistry failure: ${error.message}`);
    throw new Error('The sticker could not be forged.');
  }
};

/**
 * Transmutes media into a cropped sticker.
 */
const createCroppedSticker = async (media, options = {}) => {
  try {
    const sticker = new Sticker(media, {
      pack: options.pack || config.packname,
      author: options.author || config.author,
      type: StickerTypes.CROPPED,
      categories: options.categories || ['🐒', '⚡'],
      quality: options.quality || 50
    });
    return await sticker.toBuffer();
  } catch (error) {
    console.error(`💥 [Wukong-MD]: Cropping failure: ${error.message}`);
    throw new Error('The sticker could not be cropped.');
  }
};

/**
 * Transmutes media into a circular sticker.
 */
const createCircleSticker = async (media, options = {}) => {
  try {
    const sticker = new Sticker(media, {
      pack: options.pack || config.packname,
      author: options.author || config.author,
      type: StickerTypes.CIRCLE,
      categories: options.categories || ['🐒', '⚡'],
      quality: options.quality || 50
    });
    return await sticker.toBuffer();
  } catch (error) {
    console.error(`💥 [Wukong-MD]: Circular forging failure: ${error.message}`);
    throw new Error('The sticker could not be shaped.');
  }
};

/**
 * Reverts a sticker back into a standard PNG image.
 */
const stickerToImage = async (stickerBuffer) => {
  try {
    return await sharp(stickerBuffer).png().toBuffer();
  } catch (error) {
    console.error(`💥 [Wukong-MD]: Image reversion failed: ${error.message}`);
    throw new Error('The sticker could not be reverted.');
  }
};

module.exports = {
  createStickerBuffer,
  createCroppedSticker,
  createCircleSticker,
  stickerToImage
};
