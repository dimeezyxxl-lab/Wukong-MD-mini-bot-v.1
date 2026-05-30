/**
 * Group Link Command - Get group invite link
 * Styled with True Wukong Monkey King Personality 🐒⚡🌀
 */

module.exports = {
    name: 'grouplink',
    aliases: ['link', 'invite', 'portalkey', 'gatekey'],
    category: 'admin',
    description: 'Summon the celestial realm portal key for outsiders to enter',
    usage: '.grouplink',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        // Fetch the raw invite code from the server matrix
        const code = await sock.groupInviteCode(extra.from);
        const link = `https://chat.whatsapp.com/${code}`;
        
        let text = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖯𝖮𝖱𝖳𝖠𝖫  𝖪𝖤𝖸  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
        text += `🪐 *𝖢𝗈𝗎𝗋𝗍 𝖱𝖾𝖺𝗅𝗆:* ${extra.groupMetadata.subject}\n`;
        text += `🌀 *𝖯𝗈𝗋𝗍𝖺𝗅 𝖫𝗂𝗇𝗄:* ${link}\n\n`;
        text += `⚠️ *𝖶𝗎𝗄𝗈𝗇𝗀'𝗌 𝖶𝖺𝗋𝗇𝗂𝗇finish:* _Do not scatter this portal key across the public wilderness! If unwanted demons crawl into my court using this link, I will swing my staff!_`;
        
        await extra.reply(text);
        
      } catch (error) {
        await extra.reply(`💥 *Chaos in Heaven:* The portal keys were misplaced or the gates are sealed! Error: ${error.message}`);
      }
    }
  };
