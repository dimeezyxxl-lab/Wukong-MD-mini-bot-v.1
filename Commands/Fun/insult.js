/**
 * Insult - Give a silly insult to a user
 * Styled with True Wukong Monkey King Personality 🐒⚡🔥
 */

module.exports = {
  name: 'insult',
  aliases: ['insultme', 'burn', 'roast', 'ridicule'],
  category: 'fun',
  description: 'Deliver a legendary ribbing to a fellow mortal',
  usage: '.insult (reply or @user)',
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
      const mentioned = ctx.mentionedJid || [];
      let targetId = null;
      if (mentioned.length) targetId = mentioned[0];
      else if (ctx.participant) targetId = ctx.participant;
      else targetId = extra.sender;

      const targetTag = `@${(targetId || extra.sender).split('@')[0]}`;

      const roasts = [
        "You’re as useful as a blind bat trying to navigate the clouds! 🦇",
        "I’d call you sharp, but you’re as dull as a rusted meditation bowl! 🥣",
        "You’re like a summer thunderstorm—everyone is relieved when you finally clear off! ⛈️",
        "You bring the court much joy... primarily when you decide to take a nap elsewhere! 💤",
        "If laziness were an art, you’d be a masterpiece gathering dust in a forgotten cave! 🖼️",
        "Your wit is like a peach that’s been sitting out in the sun—completely rotten! 🍑",
        "Even the local mountain monkeys have more sense in their tails than you have in your head! 🐒",
        "I’ve seen scrolls with more personality than you! 📜",
        "You couldn’t find your own head if it wasn't attached to your shoulders!  cabeça",
        "You’re the reason the gods invented silence! 🤫"
      ];

      const line = roasts[Math.floor(Math.random() * roasts.length)];
      
      const response = `🐒 *Wukong scoffs at ${targetTag}:* \n\n_"${line}"_`;

      await sock.sendMessage(extra.from, { 
        text: response, 
        mentions: [targetId] 
      }, { quoted: msg });
      
    } catch (error) {
      console.error('[insult] ERROR:', error);
      await extra.reply('💥 *Chaos in Heaven:* My roasting flames have fizzled out!');
    }
  }
};
