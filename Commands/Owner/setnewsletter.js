/**
 * Wukong-MD: The Celestial Archive Binding (Set Newsletter)
 * Architected by XyzTech 🐒⚡
 */

const fs = require('fs');
const path = require('path');
const config = require('../../config');

module.exports = {
  name: 'setnewsletter',
  aliases: ['setnl', 'setchannel'],
  category: 'owner',
  description: 'Invoke the Sage to bind his menus to a Celestial Newsletter.',
  usage: '.setnewsletter <newsletter JID>',
  ownerOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      let newsletterJid = '';
      
      // Check context for binding
      if (msg.key.remoteJid && msg.key.remoteJid.endsWith('@newsletter')) {
        newsletterJid = msg.key.remoteJid;
      } else if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const findNewsletterJid = (obj, depth = 0) => {
          if (depth > 5 || !obj || typeof obj !== 'object') return null;
          for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].endsWith('@newsletter')) return obj[key];
            if (typeof obj[key] === 'object') {
              const found = findNewsletterJid(obj[key], depth + 1);
              if (found) return found;
            }
          }
          return null;
        };
        newsletterJid = findNewsletterJid(msg.message.extendedTextMessage.contextInfo);
      } else if (args[0]) {
        newsletterJid = args[0].trim();
      } else {
        return extra.reply(
          `🐒 *Wukong-MD: Celestial Binding*\n\n` +
          `Current Binding: \`${config.newsletterJid || 'Unbound'}\`\n\n` +
          `Usage:\n` +
          `  • \`.setnewsletter <JID>\`\n` +
          `  • Reply to a newsletter message to bind it.`
        );
      }
      
      if (!newsletterJid.endsWith('@newsletter')) {
        return extra.reply('💥 [Wukong-MD]: The JID format is invalid. It must be a path to a Celestial Newsletter.');
      }
      
      // Binding the archive
      const configPath = path.join(__dirname, '../../config.js');
      let configContent = fs.readFileSync(configPath, 'utf8');
      
      configContent = configContent.includes('newsletterJid:')
        ? configContent.replace(/newsletterJid:\s*['"]([^'"]+)['"]/, `newsletterJid: '${newsletterJid}'`)
        : configContent.replace(/(sessionName:\s*['"][^'"]+['"],)/, `$1\n    newsletterJid: '${newsletterJid}',`);
      
      fs.writeFileSync(configPath, configContent, 'utf8');
      delete require.cache[require.resolve('../../config')];
      config.newsletterJid = newsletterJid;
      
      await extra.reply(
        `✅ [Wukong-MD]: Binding complete.\n\n` +
        `📰 Bound Newsletter: \`${newsletterJid}\`\n` +
        `The Sage’s menu now flows through this channel.`
      );
      
    } catch (error) {
      console.error(`💥 [Wukong-MD]: The Binding failed: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The Scribe could not bind the archives. Error: ${error.message}`);
    }
  }
};
