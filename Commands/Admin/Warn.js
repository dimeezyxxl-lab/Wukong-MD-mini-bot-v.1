/**
 * Warn Command - Warn a user
 * Styled with True Wukong Monkey King Personality 🐒⚡📋
 */

const database = require('../../database');
const config = require('../../config');

module.exports = {
  name: 'warn',
  aliases: ['warning', 'demerit', 'strike'],
  category: 'admin',
  description: 'Inscribe a demonic demerit on a rulebreaker\'s celestial record',
  usage: '.warn @user <reason>',
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
        return extra.reply('🪵 *Wukong Snickers:* Who am I putting on blast? Mention them or reply to their scroll with a reason so I can mark my ledger!\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .warn @user Chaos making');
      }
      
      const reason = args.slice(mentioned.length > 0 ? 1 : 0).join(' ') || 'Defying court order';
      
      // Cannot warn fellow admins/elders
      const foundParticipant = extra.groupMetadata.participants.find(
        p => (p.id === target || p.lid === target) && (p.admin === 'admin' || p.admin === 'superadmin')
      );
      
      if (foundParticipant) {
        return extra.reply('🪵 *Wukong Halts:* Hold it! You cannot mark the record of a fellow Court Commander. They outrank simple demerit scrolls!');
      }
      
      const warnings = database.addWarning(extra.from, target, reason);
      
      let text = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖣𝖤𝖬𝖤𝖱𝖨𝖳  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
      text += `👤 *𝖳𝖺𝗋𝗀𝖾𝗍 𝖲𝗈𝗎𝗅:* @${target.split('@')[0]}\n`;
      text += `📝 *𝖳𝗋𝖺𝗇𝗌𝗀𝗋𝖾𝗌𝗌finish:* _${reason}_\n`;
      text += `⚠️ *𝖫𝖾𝖽𝗀𝖾𝗋 Marks:* [ ${warnings.count} / ${config.maxWarnings} ]\n\n`;
      
      if (warnings.count >= config.maxWarnings) {
        text += `💥 *𝖳𝖧𝖤  𝖫𝖨𝖭𝖤  𝖨𝖲  𝖢𝖱𝖮𝖲𝖲𝖤𝖣!*\n\n`;
        text += `🐒 @${target.split('@')[0]} has maxed out their ledger demerits! My patience is completely depleted. Extending the Golden Staff to sweep them into exile!`;
        
        await sock.sendMessage(extra.from, {
          text,
          mentions: [target]
        }, { quoted: msg });
        
        if (extra.isBotAdmin) {
          await sock.groupParticipantsUpdate(extra.from, [target], 'remove');
          database.clearWarnings(extra.from, target);
        }
      } else {
        const remaining = config.maxWarnings - warnings.count;
        text += `⚡ *𝖶𝗎𝗄𝗈𝗇𝗀'𝗌 Warning:* Watch your step, mortal! You have *${remaining}* mistake(s) left before my staff swings and clears you out of this realm permanently.`;
        
        await sock.sendMessage(extra.from, {
          text,
          mentions: [target]
        }, { quoted: msg });
      }
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The judgment scroll ripped! Error: ${error.message}`);
    }
  }
};
