/**
 * gayrate - Measure fabulousness
 * Styled with True Wukong Monkey King Personality 🐒⚡🌈
 */

module.exports = {
  name: 'gayrate',
  aliases: ['gay', 'fabulousness', 'aura'],
  category: 'fun',
  description: 'Measure the level of fabulous energy in a soul',
  usage: '.gayrate (reply or @user)',
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
      const mentioned = ctx.mentionedJid || [];
      let targetId = null;
      if (mentioned.length) targetId = mentioned[0];
      else if (ctx.participant) targetId = ctx.participant;
      else targetId = extra.sender;

      const targetTag = `@${(targetId || extra.sender).split('@')[0]}`;

      // Measuring the soul's energy
      const base = (targetId || extra.sender).toString().split('').reduce((s,c)=> s + c.charCodeAt(0), 0);
      const percent = ((base % 101) + Math.floor(Math.random()*7)) % 101; // 0-100

      const readings = [
        `🐒 *Wukong gazes deeply:* ${targetTag} emits ${percent}% pure, unfettered fabulousness! 🌈`,
        `✨ *Fiery Eyes reading:* ${targetTag} contains ${percent}% divine glitter energy. Quite dazzling!`,
        `🔱 *Celestial Gauge:* ${targetTag} is ${percent}% radiating cosmic radiance. A sight for sore eyes!`,
        `💖 *Verdict:* ${targetTag} is ${percent}% legendary fabulous! Even the heavens take notice.`
      ];

      const out = readings[Math.floor(Math.random() * readings.length)];
      
      await sock.sendMessage(extra.from, { 
        text: out, 
        mentions: [targetId] 
      }, { quoted: msg });
      
    } catch (error) {
      console.error('[gayrate] ERROR:', error);
      await extra.reply('💥 *Chaos in Heaven:* My Fiery Eyes are clouded! Failed to read the aura.');
    }
  }
};
