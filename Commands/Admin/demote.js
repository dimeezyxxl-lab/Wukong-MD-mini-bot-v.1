/**
 * Demote Command - Remove admin privileges
 * Styled with True Wukong Monkey King Personality 🐒🌩️🔻
 */

const { findParticipant } = require('../../utils/jidHelper');

module.exports = {
  name: 'demote',
  aliases: ['removeadmin', 'strip', 'banishrank', 'castdown'],
  category: 'admin',
  description: 'Strip a member of their court status and cast them down to mortal status',
  usage: '.demote @user',
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
        return extra.reply('🪵 *Wukong Snickers:* Who am I stripping titles from? Mention them or reply to their scroll!\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .demote @user');
      }
      
      // Fetch FRESH group metadata to avoid stale cache
      const freshMetadata = await sock.groupMetadata(extra.from);
      
      // Use findParticipant for LID-aware matching with fresh metadata
      const foundParticipant = findParticipant(freshMetadata.participants, target);
      
      if (!foundParticipant) {
        return extra.reply('❌ *Realm Scan Failed:* That individual does not reside within this territory!');
      }
      
      // Check if user is admin using fresh data
      if (foundParticipant.admin !== 'admin' && foundParticipant.admin !== 'superadmin') {
        return extra.reply('🪵 *Wukong Laughs:* You cannot strip a title from someone who is already a common peasant!');
      }
      
      // Strip rank privileges
      await sock.groupParticipantsUpdate(extra.from, [target], 'demote');
      
      await sock.sendMessage(extra.from, {
        text: `🔻 *𝖳𝖨𝖳𝖫𝖤 𝖲𝖳𝖱𝖨𝖯𝖯𝖤𝖣!*\n\n⚡ *𝖶𝗎𝗄𝗈𝗇𝗀 Judgment:* @${target.split('@')[0]} has been dragged from the celestial throne and cast back down to mortal status! Your command seals are broken.`,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The decree failed to process! Error: ${error.message}`);
    }
  }
};
