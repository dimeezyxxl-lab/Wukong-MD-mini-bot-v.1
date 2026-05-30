/**
 * Wukong-MD: The Celestial Seal (Block)
 * Architected by XyzTech 🐒⚡
 */

module.exports = {
  name: 'block',
  aliases: ['banish'],
  category: 'owner',
  description: 'Invoke the Great Sage to seal a mortal away.',
  usage: '.block @user or reply',
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
        return extra.reply('🐒 [Wukong-MD]: Decree unclear. Banishment requires a target. Mention or reply to the mortal you wish to seal.');
      }
      
      await sock.updateBlockStatus(target, 'block');
      
      await sock.sendMessage(extra.from, {
        text: `🐒 [Wukong-MD]: The Great Sage has spoken! @${target.split('@')[0]} has been cast into the void of silence.`,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      console.error(`💥 [Wukong-MD]: The Seal failed to manifest: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The mortal's essence resisted the seal. Error: ${error.message}`);
    }
  }
};
