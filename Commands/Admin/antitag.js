/**
 * AntiTag Command
 * Enable/disable anti-tag and set action (delete/kick)
 * Styled with Deep Wukong Monkey King Personality 🐒⚡🛡️
 */

const database = require('../../database');

module.exports = {
  name: 'antitag',
  aliases: ['antimention', 'at', 'silenceincantation', 'cancelsummon'],
  description: 'Suppress mass phantom summonings and sneaky hidetags in the realm',
  usage: '.antitag <on/off/set/get>',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antitag ? '🛡️ 𝖦𝖴𝖠𝖱𝖣𝖤𝖣' : '🔓 𝖤𝖷𝖯𝖮𝖲𝖤𝖣';
        const action = settings.antitagAction || 'delete';
        
        return extra.reply(
          `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖲𝖴𝖬𝖬𝖮𝖭  𝖲𝖤𝖠𝖫  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
          `📛 *𝖨𝗇𝖼𝖺𝗇𝗍𝖺𝗍𝗂𝗈𝗇 𝖡𝗅𝗈𝖼𝗄𝖾𝗋:* \`[ ${status} ]\`\n` +
          `⚔️ *𝖱𝖾𝖺𝗅𝗆 𝖯𝗎𝗇𝗂𝗌𝗁𝗆𝖾𝗇𝗍:* \`[ ${action.toUpperCase()} ]\`\n\n` +
          `📜 *𝖢𝗈𝗎𝗋𝗍 𝖣finish𝖼𝗍𝗂𝗏𝖾𝗌:* \n` +
          `  • \`.antitag on\`  — Bind the sneaky summon tags\n` +
          `  • \`.antitag off\` — Allow phantom screams to echo\n` +
          `  • \`.antitag set delete\` — Shred noisy mention scrolls\n` +
          `  • \`.antitag set kick\`   — Sweep the summoner out of the court\n` +
          `  • \`.antitag get\`  — Inspect active silence arrays`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).antitag) {
          return extra.reply('🪵 *Wukong Blinks:* The silence shield is already glowing! Phantom tags are being dissolved as we speak.');
        }
        database.updateGroupSettings(extra.from, { antitag: true });
        return extra.reply('🛡️ *Summon Seal Activated!* I\'ve cast a barrier across this chat court. Anyone using dirty incantations to drag everyone into a mention will answer to me.');
      }
      
      if (opt === 'off') {
        database.updateGroupSettings(extra.from, { antitag: false });
        return extra.reply('🪵 *Wukong Yawns:* Summon Seal deactivated. The court gates are wide open; prepare to be blindly dragged into every messy chat scroll.');
      }
      
      if (opt === 'set') {
        if (args.length < 2) {
          return extra.reply('🪵 *Wukong Snickers:* You must specify an enforcement option! Use: \`.antitag set delete\` or \`kick\`.');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply('❌ *Unknown Judgment:* Should I strike the message script down (\`delete\`) or banish the summoner from the kingdom (\`kick\`)?');
        }
        
        database.updateGroupSettings(extra.from, { 
          antitagAction: setAction,
          antitag: true // Auto-enable when setting action
        });
        
        const feedback = setAction === 'kick' 
          ? '🔱 *Judgment Sealed:* Any loud offender caught throwing phantom tags will be struck by my Golden Staff and kicked entirely out of the mountain!'
          : '🗑️ *Judgment Sealed:* Sneaky mass-tag scrolls will be intercepted and turned directly into harmless ash.';
          
        return extra.reply(feedback);
      }
      
      if (opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antitag ? '𝖠𝖢𝖳𝖨𝖵𝖤' : '𝖣𝖮𝖱𝖬𝖠𝖭𝖳';
        const action = settings.antitagAction || 'delete';
        
        return extra.reply(`┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖠𝖭𝖳𝖨-𝖳𝖠𝖦  𝖬𝖠𝖭𝖨𝖥𝖤𝖲𝖳  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n🛡️ *𝖲𝖾𝖺𝗅 𝖲𝗍𝖺𝗍𝗎𝗌:* ${status}\n⚔️ *𝖤𝗑𝖾𝖼𝗎𝗍𝗂𝗈𝗇:* ${action.toUpperCase()}`);
      }
      
      return extra.reply('🪵 *Wukong Grins:* Invalid chant format! Use \`.antitag\` to read the direct instructions.');
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The anti-tag array ruptured! Error: ${error.message}`);
    }
  }
};
