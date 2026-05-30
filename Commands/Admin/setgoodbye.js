/**
 * Set Goodbye - Customize goodbye message
 * Styled with True Wukong Monkey King Personality 🐒📝💨
 */

const db = require('../../database');

module.exports = {
  name: 'setgoodbye',
  aliases: ['goodbyetext', 'carveparting', 'setproclamation'],
  category: 'admin',
  description: 'Carve a custom parting decree to blast at deserters who flee the mountain',
  usage: '.setgoodbye <message> (use @user for member mention)',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args) {
    try {
      const groupId = msg.key.remoteJid;
      
      if (!args.length) {
        const groupSettings = db.getGroupSettings(groupId);
        const currentMsg = groupSettings.goodbyeMessage || 'Left the mountain.';
        
        return await sock.sendMessage(groupId, {
          text: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖴𝖲𝖳𝖮𝖬  𝖯𝖠𝖱𝖳𝖨𝖭𝖦  𝖲𝖢𝖱𝖮𝖫𝖫  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
                `📝 *𝖢𝖴𝗋𝗋𝖾𝗇𝗍 𝖡𝖺𝗇finish𝗆𝖾𝗇𝗍 𝖢𝖧𝖺𝗇𝗍:*\n_"${currentMsg}"_\n\n` +
                `📌 *𝖧𝗈𝗐 𝗍𝗈 𝖱𝖾-𝖢𝖺𝗋𝗏𝖾:*\n` +
                `  • Chant \`.setgoodbye <text>\` to forge a new parting message.\n` +
                `  • Include \`@user\` inside your text to dynamically pin the target's handle into the scroll.`
        }, { quoted: msg });
      }
      
      const goodbyeMessage = args.join(' ');
      
      if (goodbyeMessage.length > 500) {
        return await sock.sendMessage(groupId, {
          text: '❌ *Scroll Overflow:* That parting chant is far too heavy! Keep your proclamation under 500 characters.'
        }, { quoted: msg });
      }
      
      // Update the database records
      db.updateGroupSettings(groupId, { goodbyeMessage });
      
      // Generate preview tracking variables
      const previewSender = msg.key.participant || msg.key.remoteJid || '';
      const previewText = goodbyeMessage.replace('@user', `@${previewSender.split('@')[0]}`);
      
      let successText = `✅ *𝖯𝖠𝖱𝖳𝖨𝖭𝖦  𝖣𝖤𝖢𝖱𝖤𝖤  𝖲𝖤𝖠𝖫𝖤𝖸.*\n\n`;
      successText += `🪵 *Wukong Grins:* I have chiseled your new words into the boundary walls! \n\n`;
      successText += `👁️ *𝖯𝗋𝖾𝗏𝗂𝖾𝗐 Scroll:* \n"${previewText}"`;

      await sock.sendMessage(groupId, {
        text: successText,
        mentions: previewSender ? [previewSender] : []
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Set Goodbye Error:', error);
      await sock.sendMessage(groupId, {
        text: `💥 *Chaos in Heaven:* The boundary ink spilled! Failed to preserve the new parting decree: ${error.message}`
      }, { quoted: msg });
    }
  }
};
