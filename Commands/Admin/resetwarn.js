/**
 * ResetWarn Command - Reset warnings for a user
 * Styled with True Wukong Monkey King Personality 🐒⚡🧼
 */

const database = require('../../database');

module.exports = {
  name: 'resetwarn',
  aliases: ['resetwarning', 'clearwarn', 'unwarn', 'delwarn', 'pardon'],
  category: 'admin',
  description: 'Wipe clean the celestial record sheet and forgive a user\'s crimes',
  usage: '.resetwarn @user',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      let target;
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      const mentioned = ctx?.mentionedJid || [];
      
      if (mentioned && mentioned.length > 0) {
        target = mentioned[0];
      } else if (ctx?.participant && ctx.stanzaId && ctx.quotedMessage) {
        target = ctx.participant;
      } else {
        return extra.reply('🪵 *Wukong Snickers:* Who am I pardoning? Mention them or reply to their scroll so I know whose record to wipe!\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .resetwarn @user');
      }
      
      // Get current warnings before clearing
      const currentWarnings = database.getWarnings(extra.from, target);
      
      if (currentWarnings.count === 0) {
        return extra.reply(`🪵 *Wukong Blinks:* @${target.split('@')[0]} has a spotless slate! There are no black marks here to erase.`, { mentions: [target] });
      }
      
      // Clear all warnings from the database ledger
      database.clearWarnings(extra.from, target);
      
      let text = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖯𝖠𝖱𝖣𝖮𝖭  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
      text += `🧼 *𝖢𝖫𝖾𝖺𝗇e𝖽 Soul:* @${target.split('@')[0]}\n`;
      text += `🔥 *𝖡𝗎𝗋𝗇𝖾𝖽 𝖢𝗋𝗂𝗆𝖾𝗌:* ${currentWarnings.count} Active Demerits\n\n`;
      text += `✨ *𝖶𝗎𝗄𝗈𝗇𝗀 Mercy:* I have ripped their old record scroll in half and burned it to ash! Your sins are washed away, but don't make me swing my staff again.`;

      await sock.sendMessage(extra.from, {
        text,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      console.error('ResetWarn command error:', error);
      await extra.reply(`💥 *Chaos in Heaven:* The judgment ledger caught fire! Error: ${error.message}`);
    }
  }
};
