/**
 * Group Info Command - Display group information
 * Styled with Wukong Personality ⚡
 */

module.exports = {
    name: 'groupinfo',
    aliases: ['info', 'ginfo', 'realm'],
    category: 'general',
    description: 'Show group information',
    usage: '.groupinfo',
    groupOnly: true,
    
    async execute(sock, msg, args, extra) {
      try {
        const metadata = extra.groupMetadata;
        
        const admins = metadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');
        
        let text = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ ✨ 🪐 𝖶𝖴𝖪𝖮𝖭𝖦 𝖱𝖤𝖠𝖫𝖬 𝖲𝖢𝖠𝖭𝖭𝖤𝖱 🪐 ✨\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
        text += `🏷️ *𝖱𝖾𝖺𝗅𝗆 𝖭𝖺𝗆𝖾:* ${metadata.subject}\n`;
        text += `🆔 *𝖬𝖺𝗍𝗋𝗂𝗑 𝖨𝖣:* \`${metadata.id}\`\n`;
        text += `👥 *𝖶𝖺𝗋𝗋𝗂𝗈𝗋𝗌 (𝖬𝖾𝗆𝖻𝖾𝗋𝗌):* ${metadata.participants.length}\n`;
        text += `🔱 *𝖢𝗈𝗎𝗋𝗍 𝖦𝗎𝖺𝗋𝖽𝗂𝖺𝗇𝗌 (𝖠𝖽𝗆𝗂𝗇𝗌):* ${admins.length}\n`;
        text += `🔒 *𝖱𝖾𝗌𝗍𝗋𝗂𝖼𝗍𝖾𝖽:* ${metadata.restrict ? '🟢 𝖸𝖾𝗌' : '🔴 𝖭𝗈'}\n`;
        text += `📢 *𝖠𝗇𝗇𝗈𝗎𝗇𝖼𝖾 𝖬𝗈𝖽𝖾:* ${metadata.announce ? '🟢 𝖸𝖾𝗌' : '🔴 𝖭𝗈'}\n`;
        text += `📅 *𝖥𝗈𝗎𝖿𝖣𝖾𝖽:* ${new Date(metadata.creation * 1000).toLocaleDateString()}\n\n`;
        text += `📝 *𝖱𝖾𝖺𝗅𝗆 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇:*\n${metadata.desc || '_No description provided._'}\n\n`;
        text += `🔱 *𝖢𝖮𝖴𝖱𝖳 𝖦𝖴𝖳𝖱𝖣𝖨𝖠𝖭𝖲:*\n`;
        
        admins.forEach((admin, index) => {
          text += `│ ${index + 1}. ➜ @${admin.id.split('@')[0]}\n`;
        });
        text += `┗━━━━━━━━━━━━━━━━━┛`;
        
        await sock.sendMessage(extra.from, {
          text,
          mentions: admins.map(a => a.id)
        }, { quoted: msg });
        
      } catch (error) {
        await extra.reply(`💥 System alert: Failed to map out the realm structure. ${error.message}`);
      }
    }
  };
