/**
 * Translate Command - Consulting the Polyglot Tablets
 * Styled with True Wukong Monkey King Personality 🐒⚡🌐
 */

const fetch = require('node-fetch');

module.exports = {
  name: 'translate',
  aliases: ['trt', 'tr', 'speak'],
  category: 'utility',
  description: 'Consult the Polyglot Tablets to translate your words',
  usage: '.translate <text> <lang> or .translate <lang> (reply to message)',
  
  async execute(sock, msg, args) {
    try {
      const chatId = msg.key.remoteJid;
      await sock.sendPresenceUpdate('composing', chatId);
      
      let textToTranslate = '';
      let lang = '';
      const quotedMessage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      
      if (quotedMessage) {
        textToTranslate = quotedMessage.conversation || 
                         quotedMessage.extendedTextMessage?.text || 
                         quotedMessage.imageMessage?.caption || '';
        lang = args.join(' ').trim();
      } else {
        if (args.length < 2) {
          return await sock.sendMessage(chatId, {
            text: `🐒 *Wukong bows in greeting:* To translate, you must speak clearly!\n\n` +
            `Usage:\n` +
            `1. Reply with: \`.translate <lang>\`\n` +
            `2. Or: \`.translate <text> <lang>\`\n\n` +
            `Common tongues:\n` +
            `fr (French), es (Spanish), de (German), ja (Japanese), zh (Chinese), hi (Hindi)`
          }, { quoted: msg });
        }
        lang = args.pop();
        textToTranslate = args.join(' ');
      }
      
      if (!textToTranslate) return await sock.sendMessage(chatId, { text: '🪵 *Wukong shrugs:* There is no speech here for me to interpret!' }, { quoted: msg });
      if (!lang) return await sock.sendMessage(chatId, { text: '❌ *The tongue is unknown:* Please provide a valid language code.' }, { quoted: msg });
      
      await sock.sendMessage(chatId, { react: { text: '🌐', key: msg.key } });
      
      let translatedText = null;
      
      // API Chains
      const apis = [
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(textToTranslate)}`,
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=auto|${lang}`
      ];
      
      for (const url of apis) {
        try {
          const res = await fetch(url);
          const data = await res.json();
          if (url.includes('googleapis')) translatedText = data[0][0][0];
          else if (data.responseData) translatedText = data.responseData.translatedText;
          if (translatedText) break;
        } catch (e) { continue; }
      }
      
      if (!translatedText) throw new Error('API Failure');
      
      await sock.sendMessage(chatId, {
        text: `🔱 *Translation successful!*\n\n"${translatedText}"\n\n✨ _Forged by ${config.botName}_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Error in translate command:', error);
      await sock.sendMessage(chatId, { text: '💥 *Chaos in the Heavens:* The translation tablets have shattered! My magic failed to reach that language.' }, { quoted: msg });
    }
  }
};
