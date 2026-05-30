/**
 * Antilink Command - Toggle antilink protection with delete/kick options
 * Styled with Deep Wukong Monkey King Personality 🐒⚡🛡️
 */

const database = require('../../database');

module.exports = {
  name: 'antilink',
  aliases: ['guard', 'antilink', 'blockrift', 'portalsield'],
  category: 'admin',
  description: 'Seal foreign portal rifts (external links) to protect the kingdom',
  usage: '.antilink <on/off/set/get>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? '𝖦𝖴𝖠𝖱𝖣𝖤𝖣' : '𝖤𝖷𝖯𝖮𝖲𝖤𝖣';
        const action = settings.antilinkAction || 'delete';
        
        return extra.reply(
          `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖱𝖨𝖥𝖳  𝖲𝖤𝖠𝖫𝖤𝖱  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
          `🌀 *𝖯𝗈𝗋𝗍𝖺𝗅 𝖦𝗎𝖺𝗋𝖽𝗂𝖺𝗇:* \`[ ${status} ]\`\n` +
          `⚔️ *𝖱𝖾𝖺𝗅标记 𝖤𝗑𝖾𝖼𝗎𝗍𝗂𝗈𝗇:* \`[ ${action.toUpperCase()} ]\`\n\n` +
          `📜 *𝖦𝗎𝖺𝗋𝖽𝗂𝖺𝗇 𝖢𝖧𝖠𝖭𝖳𝖲:* \n` +
          `  • \`.antilink on\`  — Erect the celestial boundary walls\n` +
          `  • \`.antilink off\` — Shatter walls (Allow foreign links)\n` +
          `  • \`.antilink set delete\` — Collapse and delete unauthorized rifts\n` +
          `  • \`.antilink set kick\`   — Smash rift-weavers out of the realm\n` +
          `  • \`.antilink get\`  — Inspect active boundary barriers`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).antilink) {
          return extra.reply('🪵 *Wukong Blinks:* The boundary walls are already solid as diamond! No mortal links are passing through.');
        }
        database.updateGroupSettings(extra.from, { antilink: true });
        return extra.reply('🛡️ *Celestial Barrier Erected!* I have planted my Golden Staff into the heart of this realm. Any unauthorized portal rifts will be intercepted immediately.');
      }
      
      if (opt === 'off') {
        database.updateGroupSettings(extra.from, { antilink: false });
        return extra.reply('🪵 *Wukong Sighs:* Boundary walls dropped. The realm is now open to external dimensions. Don\'t blame me if smugglers flood your court with links!');
      }
      
      if (opt === 'set') {
        if (args.length < 2) {
          return extra.reply('🪵 *Wukong Snickers:* You must choose how to treat intruders! Use: \`.antilink set delete\` or \`kick\`.');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply('❌ *Unknown Order:* Should I smash the scroll (\`delete\`) or banish the summoner from the kingdom (\`kick\`)?');
        }
        
        database.updateGroupSettings(extra.from, { 
          antilinkAction: setAction,
          antilink: true // Auto-enable when setting execution action
        });
        
        const feedback = setAction === 'kick' 
          ? '🔱 *Judgment Sealed:* Any intruder weaving external portal links will be struck by my Golden Staff and kicked completely out of this court!'
          : '🗑️ *Judgment Sealed:* All foreign link scrolls will be instantly burned to ashes the second they hit the floor.';
          
        return extra.reply(feedback);
      }
      
      if (opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? '𝖡𝖮𝖴𝖭𝖣𝖠𝖱𝖸 𝖠𝖢𝖳𝖨𝖵𝖤' : '𝖡𝖮𝖴𝖭𝖣𝖠𝖱𝖸 𝖡𝖱𝖮𝖪𝖤𝖭';
        const action = settings.antilinkAction || 'delete';
        
        return extra.reply(`┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖡𝖠𝖱𝖱𝖨𝖤𝖱  𝖬𝖠𝖭𝖨𝖥𝖤𝖲𝖳  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n🌀 *𝖲𝖾𝖺𝗅 𝖲𝗍𝖺𝗍𝗎𝗌:* ${status}\n⚔️ *𝖯𝗎 finish𝗆𝖾𝗇𝗍:* ${action.toUpperCase()}`);
      }
      
      return extra.reply('🪵 *Wukong Grins:* That chant does not exist in my scrolls. Type \`.antilink\` to read the setup directive.');
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The spatial barrier collapsed! Error: ${error.message}`);
    }
  }
};
