/**
 * Set Welcome - Customize welcome message
 * Styled with True Wukong Monkey King Personality 🐒📝✨
 */

const db = require('../../database');

module.exports = {
  name: 'setwelcome',
  aliases: ['welcometext', 'carvewelcome', 'setdecree'],
  category: 'admin',
  description: 'Carve a custom induction decree to greet new warriors entering the realm',
  usage: '.setwelcome <message> (use @user for member mention)',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args) {
    try {
      const groupId = msg.key.remoteJid;
      
      if (!args.length) {
        const groupSettings = db.getGroupSettings(groupId);
        const currentMsg = groupSettings.welcomeMessage || 'Welcome to the mountain realm.';
        
        return await sock.sendMessage(groupId, {
          text: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖴𝖲𝖳𝖮𝖬  𝖤𝖭𝖳𝖱𝖸  𝖣𝖤𝖢𝖱𝖤𝖤  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
                `📝 *𝖢𝖴𝗋𝗋𝖾𝗇𝗍 𝖨𝖭𝖽𝗎𝖼finish𝗇 𝖢𝖧𝖺𝗇𝗍:*\n_"${currentMsg}"_\n\n` +
                `📌 *𝖧𝗈𝗐 𝗍𝗈 𝖱𝖾-𝖢𝖺𝗏𝖾:*\n` +
                `  • Chant \`.setwelcome <text>\` to forge a new entry message.\n` +
                `  • Include \`@user\` inside your text to dynamically pin the newcomer's handle into the scroll.`
        }, { quoted: msg });
      }
      
      const welcomeMessage = args.join(' ');
      
      if (welcomeMessage.length > 500) {
        return await sock.sendMessage(groupId, {
          text: '❌ *Scroll Overflow:* That welcome chant is far too heavy! Keep your induction decree under 500 characters.'
        }, { quoted: msg });
      }
      
      // Update the database records
      db.updateGroupSettings(groupId, { welcomeMessage });
      
      // Generate preview tracking variables
      const previewSender = msg.key.participant || msg.key.remoteJid || '';
      const previewText = welcomeMessage.replace('@user', `@${previewSender.split('@')[0]}`);
      
      let successText = `✅ *𝖤𝖭𝖳𝖱𝖸  𝖣𝖤𝖢𝖱𝖤𝖤  𝖲𝖤𝖠𝖫𝖤𝖣.*\n\n`;
      successText += `🪵 *Wukong Grins:* I have chiseled your new greeting directly into the palace gates! \n\n`;
      successText += `👁️ *𝖯𝗋𝖾𝗏𝗂𝖾𝗐 Scroll:* \n"${previewText}"`;

      await sock.sendMessage(groupId, {
        text: successText,
        mentions: previewSender ? [previewSender] : []
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Set Welcome Error:', error);
      await sock.sendMessage(groupId, {
        text: `💥 *Chaos in Heaven:* The greeting ink spilled! Failed to preserve the new induction decree: ${error.message}`
      }, { quoted: msg });
    }
  }
};
