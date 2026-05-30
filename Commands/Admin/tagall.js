/**
 * Tag All Command - Mention all group members
 * Styled with True Wukong Monkey King Personality 🐒⚡📣
 */

module.exports = {
    name: 'tagall',
    aliases: ['mentionall', 'everyone', 'rollcall', 'warhorn'],
    category: 'admin',
    description: 'Blow the war horn and manifest every single soul in the realm',
    usage: '.tagall <message>',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        const message = args.join(' ') || 'Heed the Great Sage\'s absolute command!';
        
        const participants = extra.groupMetadata.participants.map(p => p.id || p.lid).filter(Boolean);
        
        let text = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖱𝖮𝖫𝖫  𝖢𝖠𝖫𝖫  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
        text += `📢 *𝖢𝗈𝗎𝗋𝗍 𝖣𝖤𝖢𝖱𝖤𝖤:*\n_"${message}"_\n\n`;
        text += `⚔️ *𝖬𝖺𝗇finish𝖾𝗌𝗍𝖾𝖽 𝖲𝗈𝗎𝗅𝗌:* \n`;
        
        participants.forEach((participant, index) => {
          text += `  ${index + 1}. ✨ @${participant.split('@')[0]}\n`;
        });
        
        await sock.sendMessage(extra.from, {
          text,
          mentions: participants
        }, { quoted: msg });
        
      } catch (error) {
        await extra.reply(`💥 *Chaos in Heaven:* The war horn fractured! Failed to summon all souls: ${error.message}`);
      }
    }
  };
