/**
 * Wukong-MD: The Celestial Pardon (Unblock)
 * Architected by XyzTech 🐒⚡
 */

module.exports = {
  name: 'unblock',
  aliases: ['pardon', 'forgive'],
  category: 'owner',
  description: 'Invoke the Great Sage to lift the seal from a mortal.',
  usage: '.unblock @user or reply',
  ownerOnly: true,
  
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
        return extra.reply('🐒 [Wukong-MD]: Decree unclear. Which mortal seeks the Celestial Pardon? Mention or reply to them.');
      }
      
      await sock.updateBlockStatus(target, 'unblock');
      
      await sock.sendMessage(extra.from, {
        text: `🐒 [Wukong-MD]: The Great Sage has granted mercy. @${target.split('@')[0]} is no longer bound by the Celestial Seal.`,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      console.error(`💥 [Wukong-MD]: The Pardon failed to manifest: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The mortal's destiny remains sealed. Essence error: ${error.message}`);
    }
  }
};
