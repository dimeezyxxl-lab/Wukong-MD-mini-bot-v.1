/**
 * Promote Command - Make member admin
 * Styled with True Wukong Monkey King Personality 🐒🌩️🔺
 */

const { findParticipant } = require('../../utils/jidHelper');

module.exports = {
  name: 'promote',
  aliases: ['makeadmin', 'appoint', 'coronate', 'elevate'],
  category: 'admin',
  description: 'Elevate a warrior to the rank of Court General with full command seals',
  usage: '.promote @user',
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
        return extra.reply('🪵 *Wukong Snickers:* Who are we handing power to? Mention them or reply to their scroll!\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .promote @user');
      }
      
      // Fetch FRESH group metadata to avoid stale cache
      const freshMetadata = await sock.groupMetadata(extra.from);
      
      // Use findParticipant for LID-aware matching with fresh metadata
      const foundParticipant = findParticipant(freshMetadata.participants, target);
      
      if (!foundParticipant) {
        return extra.reply('❌ *Realm Scan Failed:* That individual does not reside within this territory!');
      }
      
      // Check if already admin using fresh data
      if (foundParticipant.admin === 'admin' || foundParticipant.admin === 'superadmin') {
        return extra.reply('🪵 *Wukong Laughs:* That warrior already sits upon a commander throne! They are already an admin.');
      }
      
      // Grant rank privileges
      await sock.groupParticipantsUpdate(extra.from, [target], 'promote');
      
      await sock.sendMessage(extra.from, {
        text: `🔺 *𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖤𝖫𝖤𝖵𝖠𝖳𝖨𝖮𝖭*\n\n⚡ *𝖶𝗎𝗄𝗈𝗇𝗀 Decree:* @${target.split('@')[0]} has been officially crowned as a Court General of this mountain! Sacred command seals have been bound to your spirit. Rule alongside us wisely.`,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The promotion decree dissolved into ash! Error: ${error.message}`);
    }
  }
};
