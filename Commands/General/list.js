/**
 * List Command
 * Show all commands with descriptions styled for Wukong Bot Mini ⚡
 */

const fs = require('fs');
const path = require('path');
const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');
const { sendButtons } = require('gifted-btns');

module.exports = {
  name: 'list',
  aliases: ['allcmds', 'cmdlist'],
  description: 'List all commands with detailed descriptions',
  usage: '.list',
  category: 'general',
  
  async execute(sock, msg, args, extra) {
    try {
      const prefix = config.prefix;
      const commands = loadCommands();
      const categories = {};
      
      // Group commands by category
      commands.forEach((cmd, name) => {
        if (cmd.name === name) { // Only count main command names, not aliases
          const category = (cmd.category || 'other').toLowerCase();
          if (!categories[category]) {
            categories[category] = [];
          }
          categories[category].push({
            label: cmd.description || '',
            names: [cmd.name].concat(cmd.aliases || []),
          });
        }
      });
      
      let menu = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ ✨ 🪐 𝖶𝖴𝖪𝖮𝖭𝖦 𝖢𝖮𝖬𝖬𝖠𝖭𝖣 𝖬𝖠𝖳𝖱𝖨𝖷 🪐 ✨\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
      menu += `🔱 *𝖳𝗋𝗂𝗀𝖌𝖾𝗋 𝖯𝗋𝖾𝖿𝗂𝗑:* \`[ ${prefix} ]\`\n\n`;
      
      const orderedCats = Object.keys(categories).sort();
      
      for (const cat of orderedCats) {
        menu += `┏⚡ *𝖱𝖤𝖠𝖫𝖬: ${cat.toUpperCase()}*\n`;
        for (const entry of categories[cat]) {
          const cmdList = entry.names.map((n) => `${prefix}${n}`).join(', ');
          const label = entry.label || '';
          menu += label ? `│ ➜ \`${cmdList}\`\n│    ↳ _${label}_\n` : `│ ➜ \`${cmdList}\`\n`;
        }
        menu += `┗━━━━━━━━━━━━━━━━━\n\n`;
      }
      
      menu = menu.trimEnd();
      
      // Setup dynamic web button routing safely based on your config.js
      const buttonsArray = [];
      
      if (config.social?.youtube) {
        buttonsArray.push({
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '🪐 YouTube Channel',
            url: config.social.youtube
          })
        });
      }
      
      if (config.social?.instagram) {
        buttonsArray.push({
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '📸 Instagram',
            url: config.social.instagram
          })
        });
      }

      if (config.social?.github) {
        buttonsArray.push({
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '📂 Source Code',
            url: config.social.github
          })
        });
      }
      
      // Fallback placeholder button if no links are provided in config.js so buttons component doesn't crash
      if (buttonsArray.length === 0) {
        buttonsArray.push({
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '👑 Contact Owner',
            url: `https://wa.me/${config.ownerNumber[0]}`
          })
        });
      }
      
      // Send message with interactive URL buttons using gifted-btns
      await sendButtons(sock, extra.from, {
        title: '',
        text: menu,
        footer: `> 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖡𝗒 ${config.botName}`,
        buttons: buttonsArray
      }, { quoted: msg });
      
    } catch (err) {
      console.error('list.js error:', err);
      await extra.reply('💥 System alert: Failed to compilation-map the commands list.');
    }
  }
};
