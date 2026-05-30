/**
 * Unmute Command - Open group (all members can send)
 * Styled with True Wukong Monkey King Personality 🐒⚡🔓
 */

module.exports = {
    name: 'unmute',
    aliases: ['open', 'opengroup', 'unseal', 'unlockgates'],
    category: 'admin',
    description: 'Dismantle the Court Silence Barrier so all souls can speak freely',
    usage: '.unmute',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        // Update group settings to allow everyone to message
        await sock.groupSettingUpdate(extra.from, 'not_announcement');
        
        let text = `🔓 *𝖢𝖮𝖴𝖱𝖳  𝖲𝖨𝖫𝖤𝖭𝖢𝖤  𝖡𝖠𝖱𝖱𝖨𝖤𝖱  𝖲𝖧𝖠𝖳𝖳𝖤𝖱𝖤𝖣*\n\n`;
        text += `🐒 *𝖶𝗎𝗄𝗈𝗇𝗀 Decree:* The sealing inscriptions on the temple gates have been broken!\n\n`;
        text += `🗣️ *𝖥𝗋𝖾𝖾𝖽𝗈𝗆:* The binding voice incantation is lifted. Every mortal traveler, local beast, and warrior in this realm is now free to cast their scrolls and speak openly in the court room!`;
        
        await extra.reply(text);
        
      } catch (error) {
        await extra.reply(`💥 *Chaos in Heaven:* The boundary keys snapped! Failed to unseal the court room: ${error.message}`);
      }
    }
  };
