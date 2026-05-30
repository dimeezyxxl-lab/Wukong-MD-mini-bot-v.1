/**
 * Menu Command - Display all available commands
 * Styled for Wukong Bot Mini ⚡
 */

const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');

module.exports = {
  name: 'menu',
  aliases: ['help', 'commands'],
  category: 'general',
  description: 'Show all available commands',
  usage: '.menu',
  
  async execute(sock, msg, args, extra) {
    try {
      const commands = loadCommands();
      const categories = {};
      
      // Group commands by category
      commands.forEach((cmd, name) => {
        if (cmd.name === name) { // Only count main command names, not aliases
          if (!categories[cmd.category]) {
            categories[cmd.category] = [];
          }
          categories[cmd.category].push(cmd);
        }
      });
      
      const ownerNames = Array.isArray(config.ownerName) ? config.ownerName : [config.ownerName];
      const displayOwner = ownerNames[0] || config.ownerName || 'Bot Owner';
      
      let menuText = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ ✨ 🪐 𝖶𝖴𝖪𝖮𝖭𝖦 𝖡𝖮𝖳 𝖬𝖨𝖭𝖨 🪐 ✨\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
      menuText += `👤 *𝖧𝖾𝗅𝗅𝗈:* @${extra.sender.split('@')[0]}\n`;
      menuText += `🔱 *𝖯𝗋𝖾𝖿𝗂𝗑:* ${config.prefix}\n`;
      menuText += `📊 *𝖳𝗈𝗍𝖺𝗅 𝖢𝗈𝗆𝗆𝖺𝗇𝖽𝗌:* ${commands.size}\n`;
      menuText += `👑 *𝖮𝗐𝗇𝖾𝗋:* ${displayOwner}\n\n`;
      
      // General Commands
      if (categories.general) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🧭 𝖶𝖴𝖪𝖮𝖭𝖦 𝖠𝖫𝖫 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.general.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // AI Commands
      if (categories.ai) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🤖 𝖶𝖴𝖪𝖮𝖭𝖦 𝖠𝖨 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.ai.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Group Commands
      if (categories.group) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🔵 𝖶𝖴𝖪𝖮𝖭𝖦 𝖦𝖱𝖮𝖴𝖯 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.group.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Admin Commands
      if (categories.admin) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🛡️ 𝖶𝖴𝖪𝖮𝖭𝖦 𝖠𝖣𝖬𝖨𝖭 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.admin.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Owner Commands
      if (categories.owner) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 👑 𝖶𝖴𝖪𝖮𝖭𝖦 𝖮𝖶𝖭𝖤𝖱 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.owner.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Media Commands
      if (categories.media) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🎞️ 𝖶𝖴𝖪𝖮𝖭𝖦 𝖬𝖤𝖣𝖨𝖳 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.media.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Fun Commands
      if (categories.fun) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🎭 𝖶𝖴𝖪𝖮𝖭𝖦 𝖥𝖴𝖭 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.fun.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      // Utility Commands
      if (categories.utility) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🔧 𝖶𝖴𝖪𝖮𝖭𝖦 𝖴𝖳𝖨𝖫𝖨𝖳𝖸 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.utility.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }

       // Anime Commands
       if (categories.anime) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 👾 𝖶𝖴𝖪𝖮𝖭𝖦 𝖠𝖭𝖨𝖬𝖤 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.anime.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }

       // Textmaker Commands (Fixed condition bug here)
       if (categories.textmaker) {
        menuText += `┏⚡━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🖋️ 𝖶𝖴𝖪𝖮𝖭𝖦 𝖳𝖤𝖷𝖳𝖬𝖠𝖪𝖤𝖱 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.textmaker.forEach(cmd => {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        });
        menuText += `\n`;
      }
      
      menuText += `┗━━━━━━━━━━━━━━━━━┛\n\n`;
      menuText += `🔮 𝖳𝖸𝖯𝖤 ${config.prefix}help <𝖼𝗈𝗆𝗆𝖺𝗇𝖽> 𝖿𝗈𝗋 𝖽𝖾𝗍𝖺𝗂𝗅𝗌.\n`;
      menuText += `✨ 𝖵𝖾𝗋𝗌𝗂𝗈𝗇: 1.0.0 | 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖡𝗒 𝖶𝗎𝗄𝗈𝗇𝗀\n`;
      
      // Send menu with image
      const fs = require('fs');
      const path = require('path');
      const imagePath = path.join(__dirname, '../../utils/bot_image.jpg');
      
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        await sock.sendMessage(extra.from, {
          image: imageBuffer,
          caption: menuText,
          mentions: [extra.sender],
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              // Dynamically falls back to a clean string if config.newsletterJid was emptied
              newsletterJid: config.newsletterJid || '120363406339575397@newsletter',
              newsletterName: config.botName,
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      } else {
        await sock.sendMessage(extra.from, {
          text: menuText,
          mentions: [extra.sender]
        }, { quoted: msg });
      }
      
    } catch (error) {
      await extra.reply(`💥 System alert: An error occurred! ${error.message}`);
    }
  }
};
