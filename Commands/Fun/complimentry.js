/**
 * Compliment - Send a random compliment
 * Styled with True Wukong Monkey King Personality 🐒⚡✨
 */

module.exports = {
  name: 'compliment',
  aliases: ['praise', 'blessing', 'goodword'],
  category: 'fun',
  description: 'Receive a blessing of wisdom from the Great Sage',
  usage: '.compliment [@user]',
  execute: async (sock, msg, args) => {
    try {
      const blessings = [
        "Your spirit burns as bright as the sun! ☀️",
        "Even the Jade Emperor would admire your resolve! 👑",
        "You have the heart of a true warrior! ⚔️",
        "You are more cunning than a thousand foxes! 🦊",
        "Your presence brings peace to the mountain! ⛰️",
        "You possess the wisdom of the ancient scrolls! 📜",
        "You are a rare gem in this chaotic realm! 💎",
        "Your kindness is stronger than my Golden Staff! 🔱",
        "You are destined for greatness, mortal! 🌟",
        "Your laugh echoes louder than thunder! ⚡",
        "You are a treasure to all who know you! 💖",
        "Your resolve is as unbreakable as stone! 🐒",
        "You inspire awe in every corner of the court! 🏯",
        "You carry the grace of the heavens! ✨",
        "You are truly one of a kind, a legend in the making! 🚀",
        "Your mind is sharp enough to cut through any illusion! 🧠",
        "You bring light to even the darkest clouds! 🌈",
        "You are worth more than all the gold in the treasury! 💰",
        "You are a steadfast friend, loyal and true! 🤝",
        "The universe is lucky to have you! 🌌"
      ];
      
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      const blessing = blessings[Math.floor(Math.random() * blessings.length)];
      
      let response = `✨ *𝖶𝗎𝗄𝗈𝗇𝗀'𝗌 𝖢𝖾𝗅𝖾𝗌𝗍𝗂𝖺𝗅 𝖡𝗅𝖾𝗌𝗌𝗂𝗇𝗀:*\n\n_"${blessing}"_`;
      
      if (mentioned.length > 0) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: `@${mentioned[0].split('@')[0]} ${response}`,
          mentions: mentioned
        }, { quoted: msg });
      } else {
        await sock.sendMessage(msg.key.remoteJid, {
          text: response
        }, { quoted: msg });
      }
      
    } catch (error) {
      console.error('Compliment Error:', error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `💥 *Chaos in Heaven:* The blessing scrolls have scattered in the wind!`
      }, { quoted: msg });
    }
  }
};
