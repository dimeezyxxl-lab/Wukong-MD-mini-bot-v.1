/**
 * TTS - Text to Speech Command
 * Styled with True Wukong Monkey King Personality 🐒🗣️
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'tts',
  aliases: ['speak', 'say', 'echo', 'spellcast'],
  category: 'general',
  description: 'Convert text into a celestial voice message using TTS-Nova',
  usage: '.tts <text>',
  
  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      const text = args.join(' ');

      if (!text) {
        return extra.reply('🪵 *Wukong Snickers:* You want me to speak, but you gave me no words! Supply a script for my magical echo-spell.\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .tts Fear the Great Sage!');
      }

      // Alert chat of the upcoming magic
      await extra.reply('🪐 *Gathering wind...* Channeling the echo-spell into your chat realm!');

      const audioUrl = await APIs.textToSpeech(text);

      // Download audio as buffer
      const axios = require('axios');
      const audioResponse = await axios.get(audioUrl, {
        responseType: 'arraybuffer',
        timeout: 30000
      });
      
      const audioBuffer = Buffer.from(audioResponse.data);

      // Send the audio track pretending it's a real voice note from the Sage
      await sock.sendMessage(chatId, {
        audio: audioBuffer,
        mimetype: 'audio/mp3',
        ptt: true // Play as voice message
      }, { quoted: msg });

    } catch (error) {
      console.error('TTS command error:', error);
      await extra.reply(`💥 *Chaos in Heaven:* My vocal magic split! I failed to broadcast the speech: ${error.message}`);
    }
  }
};
