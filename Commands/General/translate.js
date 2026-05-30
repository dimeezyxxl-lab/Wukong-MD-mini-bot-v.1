/**
 * Translate Command - Translate text to different languages
 * Styled with True Wukong Monkey King Personality 🐒🌍
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'translate',
  aliases: ['tr', 'trans', 'tongue', 'shapeshift'],
  category: 'general',
  description: 'Translate text to another language realm',
  usage: '.translate <lang code> <text>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length < 2) {
        return extra.reply('🪵 *Wukong Snickers:* You speak in riddles! Tell me the realm code and the chant you want me to translate.\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .translate es Hello world\n📌 *𝖢𝗈𝖽𝖾𝗌:* en, es, fr, de, it, pt, ru, ja, ko, zh');
      }
      
      const targetLang = args[0];
      const text = args.slice(1).join(' ');
      
      await extra.reply('🪐 *Spinning the cloud...* Shifting the syllables into another language realm!');
      
      const result = await APIs.translate(text, targetLang);
      
      // Pure Wukong style translation box
      let replyText = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖦𝖱𝖤𝖠𝖳 𝖲𝖠𝖦𝖤 𝖳𝖮𝖭𝖦𝖴𝖤-𝖲𝖧𝖨𝖥𝖳 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
      replyText += `📝 *𝖮𝗋𝗂𝗀𝗂𝗇𝖺𝗅 𝖢𝗁𝖺𝗇𝗍:* ${text}\n`;
      replyText += `🔤 *𝖳𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝖾𝖽 𝖤𝖼𝗁𝗈:* ${result.translation || result}\n`;
      replyText += `🌍 *𝖫𝖺𝗇𝗀𝗎𝖺𝗀𝖾 𝖱𝖾𝖺𝗅𝗆:* \`[ ${targetLang.toUpperCase()} ]\`\n\n`;
      replyText += `✨ _Mastered by the Great Sage Equal to Heaven_ 💨`;
      
      await extra.reply(replyText);
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The language barriers resisted my magic!\n\n📌 *𝖵𝖺𝗅𝗂𝖽 𝖱𝖾𝖺𝗅𝗆𝗌:* en, es, fr, de, it, pt, ru, ja, ko, zh\n\n❌ *𝖤𝗋𝗋𝗈𝗋:* ${error.message}`);
    }
  }
};
