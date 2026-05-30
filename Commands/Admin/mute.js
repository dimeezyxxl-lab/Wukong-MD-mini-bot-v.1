/**
 * Mute Command - Close group (only admins can send)
 * Styled with True Wukong Monkey King Personality 🐒⚡🔒
 */

module.exports = {
    name: 'mute',
    aliases: ['close', 'closegroup', 'courtseal', 'lockgates'],
    category: 'admin',
    description: 'Enforce the Court Silence Barrier so only admins can voice decrees',
    usage: '.mute',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        // Update group settings to announcement mode
        await sock.groupSettingUpdate(extra.from, 'announcement');
        
        let text = `🔒 *𝖢𝖮𝖴𝖱𝖳  𝖲𝖨𝖫𝖤𝖭𝖢𝖤  𝖡𝖠𝖱𝖱𝖨𝖤𝖱  𝖠𝖢𝖳𝖨𝖵𝖠𝖳𝖤𝖣*\n\n`;
        text += `🐒 *𝖶𝗎𝗄𝗈𝗇𝗀 Decree:* The main gates to the temple court have been firmly locked! \n\n`;
        text += `🤫 *𝖲𝖨𝗅𝖾𝗇𝖼𝖾:* All mortal chatter has been completely bound. Only Group Admins and Celestial Elders possess the spiritual rank to voice their scrolls here until further notice.`;
        
        await extra.reply(text);
        
      } catch (error) {
        await extra.reply(`💥 *Chaos in Heaven:* The temple gate mechanisms jammed! Failed to lock the court room: ${error.message}`);
      }
    }
  };
