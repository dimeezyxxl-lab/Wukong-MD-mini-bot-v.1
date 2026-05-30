/**
 * Anti-Group Mention Command - Toggle antigroupmention protection with delete/kick options
 * Styled with True Wukong Monkey King Personality 🐒⚡🛡️
 */

const database = require('../../database');

module.exports = {
  name: 'antigroupmention',
  aliases: ['agm', 'antiscream', 'courtquiet'],
  category: 'admin',
  description: 'Silence or banish troublemakers who abuse mass group tags (@everyone / @participants)',
  usage: '.antigroupmention <on/off/set/get>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? '𝖮𝖭' : '𝖮𝖥𝖥';
        const action = settings.antigroupmentionAction || 'delete';
        
        return extra.reply(
          `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫 𝖢𝖮𝖴𝖱𝖳 𝖲𝖨𝖫𝖤𝖭𝖢𝖤𝖱 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
          `📢 *𝖠𝗇𝗍𝗂-𝖦𝗋𝗈𝗎𝗉 𝖬𝖾𝗇𝗍𝗂𝗈𝗇:* \`[ ${status} ]\`\n` +
          `⚔️ *𝖱𝖾𝖺𝗅𝗆 𝖯𝗎𝗇𝗂𝗌𝗁𝗆𝖾𝗇𝗍:* \`[ ${action.toUpperCase()} ]\`\n\n` +
          `📌 *𝖢𝗈𝗎𝗋𝗍 𝖢𝗁𝖺𝗇finish𝗌:* \n` +
          `  • \`.antigroupmention on\`  — Protect the realm\n` +
          `  • \`.antigroupmention off\` — Allow mass screaming\n` +
          `  • \`.antigroupmention set delete\` — Snatch bad tags\n` +
          `  • \`.antigroupmention set kick\`   — Ban style with Staff\n` +
          `  • \`.antigroupmention get\`  — View active seals`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).antigroupmention) {
          return extra.reply('🪵 *Wukong Blinks:* The silence seal is already active! My ears are perfectly safe from mass tags.');
        }
        database.updateGroupSettings(extra.from, { antigroupmention: true });
        return extra.reply('🛡️ *Seal Activated!* I have deployed the Court Silencer. Anyone attempting to scream at the entire kingdom will face my fury.');
      }
      
      if (opt === 'off') {
        database.updateGroupSettings(extra.from, { antigroupmention: false });
        return extra.reply('🪵 *Wukong Yawns:* Court Silencer dismantled. Prepare your ears for pure chaos and endless notifications.');
      }
      
      if (opt === 'set') {
        if (args.length < 2) {
          return extra.reply('🪵 *Wukong Snickers:* You must specify a execution method! Use: \`.antigroupmention set delete\` or \`kick\`.');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply('❌ *Invalid Punishment:* Choose \`delete\` to burn the scroll or \`kick\` to banish them via Golden Staff.');
        }
        
        database.updateGroupSettings(extra.from, { 
          antigroupmentionAction: setAction,
          antigroupmention: true // Auto-enable when setting action
        });
        
        const feedback = setAction === 'kick' 
          ? '🔱 *Punishment Upgraded:* Rule breakers will now be struck down and kicked directly out of the realm!'
          : '🗑️ *Punishment Configured:* Mass tag scrolls will be instantly disintegrated from existence.';
          
        return extra.reply(feedback);
      }
      
      if (opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? '𝖠𝖢𝖳𝖨𝖵𝖤' : '𝖣𝖮𝖱𝖬𝖠𝖭𝖳';
        const action = settings.antigroupmentionAction || 'delete';
        
        return extra.reply(`┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖠𝖦𝖬 𝖢𝖮𝖭𝖥𝖨𝖦𝖴𝖱𝖠𝖳𝖨𝖮𝖭 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n🛡️ *𝖲𝖾𝖺𝗅 𝖲𝗍𝖺𝗍𝗎𝗌:* ${status}\n⚔️ *𝖯𝗎𝗇finish𝗆𝖾𝗇𝗍:* ${action.toUpperCase()}`);
      }
      
      return extra.reply('🪵 *Wukong Grins:* Unknown chant! Type \`.antigroupmention\` to read the setup scroll properly.');
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The protection array shattered! Error: ${error.message}`);
    }
  }
};
