/**
 * Wukong-MD: The Celestial Toolkit
 * Architected by XyzTech 🐒⚡
 * Foundational spells for manipulating the digital currents.
 */

const axios = require('axios');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');

/**
 * Downloads media from the mortal currents.
 */
const downloadMedia = async (message) => {
  try {
    const messageType = Object.keys(message)[0];
    const stream = await downloadContentFromMessage(message[messageType], messageType.replace('Message', ''));
    
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  } catch (error) {
    console.error(`💥 [Wukong-MD]: Failed to manifest media: ${error.message}`);
    throw new Error('Media manifest failed.');
  }
};

/**
 * Formats time into the language of the heavens.
 */
const formatDuration = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  return parts.join(' ') || '0s';
};

/**
 * Measures the physical weight of digital artifacts.
 */
const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * The Great Sage pauses to observe the world.
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Extracts the identities of those mentioned in the scroll.
 */
const parseMentions = (text) => {
  const mentions = [];
  const regex = /@(\d+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    mentions.push(match[1] + '@s.whatsapp.net');
  }
  return mentions;
};

/**
 * Recalls the history of a quoted scroll.
 */
const getQuoted = (msg) => {
  return msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage || null;
};

/**
 * Ascends a file to the temporary heavens.
 */
const uploadFile = async (buffer) => {
  try {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('file', buffer, { filename: 'wukong_artifact' });
    const response = await axios.post('https://file.io', form, { headers: form.getHeaders() });
    return response.data.link;
  } catch (error) {
    throw new Error('The artifact failed to ascend.');
  }
};

/**
 * Extracts a hidden path from the text.
 */
const extractUrl = (text) => {
  const match = text.match(/(https?:\/\/[^\s]+)/gi);
  return match ? match[0] : null;
};

const random = (array) => array[Math.floor(Math.random() * array.length)];

const isUrl = (text) => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(text);

/**
 * Tracks how long the Great Sage has been awake.
 */
const runtime = (seconds) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor(seconds % (3600 * 24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`.trim();
};

module.exports = {
  downloadMedia, formatDuration, formatSize, sleep,
  parseMentions, getQuoted, uploadFile, extractUrl,
  random, isUrl, runtime
};
