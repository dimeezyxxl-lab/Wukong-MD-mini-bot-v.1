/**
 * Ship - Ship two users
 * Styled with True Wukong Monkey King Personality 🐒⚡💞
 */

module.exports = {
  name: 'ship',
  aliases: ['shipit', 'match', 'union', 'karmicbond'],
  category: 'fun',
  description: 'Divine the karmic bond between two souls',
  usage: '.ship (random) OR .ship @user1 @user2 OR reply with .ship',
  groupOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
      const mentioned = ctx.mentionedJid || [];
      let a = null, b = null;

      if (mentioned.length >= 2) { a = mentioned[0]; b = mentioned[1]; }
      else if (mentioned.length === 1) { a = mentioned[0]; b = extra.sender; }
      else if (ctx.participant) { a = ctx.participant; b = extra.sender; }
      else {
        if (extra.isGroup && extra.groupMetadata?.participants) {
          const participants = extra.groupMetadata.participants.map(p => p.id).filter(id => id !== sock.user.id);
          if (participants.length >= 2) {
            const shuffled = participants.sort(() => Math.random() - 0.5);
            a = shuffled[0]; b = shuffled[1];
          } else return extra.reply('🪵 *Wukong Grumbles:* Not enough souls here to forge a union!');
        } else return extra.reply('💥 *Chaos in Heaven:* This ritual requires a gathering of souls!');
      }

      const nameOf = id => `@${id.split('@')[0]}`;
      const seed = (a + b).split('').reduce((s,c)=> s + c.charCodeAt(0), 0);
      const love = Math.abs((seed * 7) % 101);

      const status = love > 80 ? 'A match made in the celestial heavens! ❤️' : 
                     love > 50 ? 'A budding promise, like spring blossoms. 🌸' : 
                     'Mostly chaos and monkey business! 😂';

      const response = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖴𝖭𝖨𝖮𝖭  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
                       `🐒 *Wukong’s Divination:*\n` +
                       `${nameOf(a)} & ${nameOf(b)}\n` +
                       `✨ *Bond Strength:* ${love}%\n\n` +
                       `🔮 *Outcome:* ${status}`;

      await sock.sendMessage(extra.from, { text: response, mentions: [a, b] }, { quoted: msg });
    } catch (error) {
      console.error('[ship] ERROR:', error);
      await extra.reply('💥 *Chaos in Heaven:* The karmic threads are tangled! I cannot divine this bond.');
    }
  }
};
