/**
 * Welcome - Enable/disable welcome messages
 * Styled with True Wukong Monkey King Personality 🐒👋✨
 */

const db = require('../../database');

module.exports = {
  name: 'welcome',
  aliases: ['welcomeon', 'welcomeoff', 'gates', 'entryseal'],
  category: 'admin',
  description: 'Enable or disable the ceremonial greeting scrolls for newcomers',
  usage: '.welcome on/off',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  execute: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;
      const action = args[0]?.toLowerCase();
      
      if (!action || !['on', 'off'].includes(action)) {
        const groupSettings = db.getGroupSettings(groupId);
        const status = groupSettings.welcome ? '𝖦𝖴𝖠𝖱𝖣𝖤𝖣' : '𝖣𝖮𝖱𝖬𝖠𝖭𝖳';
        
        return await sock.sendMessage(groupId, {
          text: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖦𝖠𝖳𝖤𝖲  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
                `✨ *𝖤𝗇𝗍𝗋𝗒 𝖲𝖾𝖺𝗅 𝖲𝗍𝖺𝗍𝗎𝗌:* \`[ ${status} ]\`\n` +
                `📜 *𝖢𝗎𝗋𝗋𝖾𝗇𝗍 𝖦𝗋𝖾𝖾𝗍𝗂𝗇𝗀 𝖢𝖧𝖺𝗇𝗍:* _${groupSettings.welcomeMessage || 'Welcome to the mountain.'}_\n\n` +
                `📌 *𝖢𝗈𝗎𝗋𝗍 𝖢𝗈𝗆𝗆𝖺𝗇𝖽𝗌:*\n` +
                `  • \`.welcome on\`  — Activate the greeting scrolls\n` +
                `  • \`.welcome off\` — Keep the mountain entry silent\n\n` +
                `👉 _𝖳𝗈 customize the entry decree, chant:_ \`.setwelcome <message>\``
        }, { quoted: msg });
      }
      
      const enable = action === 'on';
      db.updateGroupSettings(groupId, { welcome: enable });
      
      const responseText = enable
        ? '✨ *Gates Guarded!* My attendants are now waiting at the entrance. Every new warrior entering the mountain will be greeted with your custom induction decree!'
        : '🪵 *Wukong Yawns:* The entry seals are deactivated. Newcomers will slip into the court unnoticed; I will not bother with the formalities today.';

      await sock.sendMessage(groupId, { text: responseText }, { quoted: msg });
      
    } catch (error) {
      console.error('Welcome Error:', error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `💥 *Chaos in Heaven:* The entry seals fractured while rewriting the welcome decree: ${error.message}`
      }, { quoted: msg });
    }
  }
};
