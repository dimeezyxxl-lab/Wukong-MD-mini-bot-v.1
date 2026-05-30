/**
 * Kick Command
 * Remove mentioned or replied users from the group
 * Includes robust self-kick prevention for PN/LID IDs
 * Styled with True Wukong Monkey King Personality 🐒⚡🔱
 */

const config = require('../../config');
const handler = require('../../handler');

module.exports = {
  name: 'kick',
  aliases: ['remove', 'expel', 'banish', 'staffstrike'],
  category: 'admin',
  description: 'Strike a lawbreaker with the Golden Staff and banish them from the mountain range',
  usage: '.kick @user',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      const mentioned = ctx?.mentionedJid || [];
      let usersToKick = [];
      
      if (mentioned && mentioned.length > 0) {
        usersToKick = mentioned;
      } else if (ctx?.participant && ctx.stanzaId && ctx.quotedMessage) {
        usersToKick = [ctx.participant];
      }
      
      if (usersToKick.length === 0) {
        return extra.reply('🪵 *Wukong Snickers:* Point out the troublemaker clearly! Mention them or reply directly to their scroll scroll so I can aim my staff.');
      }
      
      const botId = sock.user?.id || '';
      const botLid = sock.user?.lid || '';
      const botPhoneNumber = botId.includes(':') ? botId.split(':')[0] : (botId.includes('@') ? botId.split('@')[0] : botId);
      const botIdFormatted = botPhoneNumber + '@s.whatsapp.net';
      const botLidNumeric = botLid.includes(':') ? botLid.split(':')[0] : (botLid.includes('@') ? botLid.split('@')[0] : botLid);
      const botLidWithoutSuffix = botLid.includes('@') ? botLid.split('@')[0] : botLid;
      
      const metadata = await sock.groupMetadata(chatId);
      const participants = metadata.participants || [];
      
      const isTryingToKickBot = usersToKick.some((userId) => {
        const userPhoneNumber = userId.includes(':') ? userId.split(':')[0] : (userId.includes('@') ? userId.split('@')[0] : userId);
        const userLidNumeric = userId.includes('@lid') ? userId.split('@')[0].split(':')[0] : '';
        
        const directMatch = (
          userId === botId ||
          userId === botLid ||
          userId === botIdFormatted ||
          userPhoneNumber === botPhoneNumber ||
          (userLidNumeric && botLidNumeric && userLidNumeric === botLidNumeric)
        );
        
        if (directMatch) return true;
        
        const participantMatch = participants.some((p) => {
          const pPhoneNumber = p.phoneNumber ? p.phoneNumber.split('@')[0] : '';
          const pId = p.id ? p.id.split('@')[0] : '';
          const pLid = p.lid ? p.lid.split('@')[0] : '';
          const pFullId = p.id || '';
          const pFullLid = p.lid || '';
          const pLidNumeric = pLid.includes(':') ? pLid.split(':')[0] : pLid;
          
          const isThisParticipantBot = (
            pFullId === botId ||
            pFullLid === botLid ||
            pLidNumeric === botLidNumeric ||
            pPhoneNumber === botPhoneNumber ||
            pId === botPhoneNumber ||
            p.phoneNumber === botIdFormatted ||
            (botLid && pLid && botLidWithoutSuffix === pLid)
          );
          
          if (!isThisParticipantBot) return false;
          
          return (
            userId === pFullId ||
            userId === pFullLid ||
            userPhoneNumber === pPhoneNumber ||
            userPhoneNumber === pId ||
            userId === p.phoneNumber ||
            (pLid && userLidNumeric && userLidNumeric === pLidNumeric) ||
            (userLidNumeric && pLidNumeric && userLidNumeric === pLidNumeric)
          );
        });
        
        return participantMatch;
      });
      
      if (isTryingToKickBot) {
        await extra.reply('🪵 *Wukong Laughs:* Trying to point my own staff back at me? Bold, but completely useless! I cannot banish myself from this court.');
        return;
      }
      
      // Execute banishment update request
      await sock.groupParticipantsUpdate(chatId, usersToKick, 'remove');
      
      const usernames = usersToKick.map((jid) => `@${jid.split('@')[0]}`);
      
      let successText = `⚡ *𝖡𝖠𝖭𝖨𝖲𝖧𝖬𝖤𝖭𝖳 𝖣𝖤𝖢𝖱𝖤𝖤!*\n\n`;
      successText += `🐒 *𝖶𝗎𝗄𝗈𝗇𝗀 Judgment:* The court room has spoken! I have extended the Golden Staff and forcefully struck down ${usernames.join(', ')}.\n\n`;
      successText += `💨 They have been blasted clean past the horizon walls and into the mortal fog!`;
      
      await sock.sendMessage(extra.from, { 
        text: successText, 
        mentions: usersToKick 
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Kick command error:', error);
      await extra.reply('💥 *Chaos in Heaven:* My staff swing missed or the target was protected by an elder shield! (Verify that I am granted full Admin seals inside this group).');
    }
  },
};
