/**
 * SSWeb - Screenshot Website Command
 * Styled with True Wukong Monkey King Personality 🐒☁️
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'ssweb',
  aliases: ['screenshot', 'ss', 'webss', 'scout', 'jindou'],
  category: 'general',
  description: 'Send the Sage on his cloud to take a screenshot of a website',
  usage: '.ssweb <url>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('🪵 *Wukong Snickers:* You want me to scout a digital landscape, but you gave me no map coordinates! Provide a website URL.\n\n👉 *𝖤𝗮𝖺𝗆𝗉𝗅𝖾:* .ssweb https://github.com');
      }
      
      const url = args.join(' ');
      
      // Validate URL pathing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return extra.reply('❌ *Invalid Scroll path:* The realm link must start with http:// or https:// so my cloud can navigate to it safely!');
      }
      
      // Fun thematic reaction before soaring
      await sock.sendMessage(extra.from, {
        react: { text: '☁️', key: msg.key }
      });
      
      await extra.reply('🪐 *Somersault Cloud, Go!* Vaulting into the upper atmosphere to spy on this domain...');
      
      const screenshotBuffer = await APIs.screenshotWebsite(url);
      
      // Return captured scout data image
      await sock.sendMessage(extra.from, {
        image: screenshotBuffer,
        caption: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖦𝖱𝖤𝖠𝖳 𝖲𝖠𝖦𝖤 𝖢𝖫𝖮𝖴𝖣 𝖲𝖢𝖮𝖴𝖳 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n🌐 *𝖱𝖾𝖺𝗅𝗆 𝖫𝗂𝗇𝗄:* ${url}\n⚡ _Captured flawlessly from the heavens by Wukong Bot Mini_`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('SSWeb command error:', error);
      await extra.reply(`💥 *Chaos in Heaven:* My cloud ran into a celestial barrier! Failed to spy on the website: ${error.message}`);
    }
  }
};
