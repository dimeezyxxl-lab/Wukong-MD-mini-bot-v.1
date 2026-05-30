/**
 * Dare - Get a random dare challenge
 * Styled with True Wukong Monkey King Personality 🐒⚡🔥
 */

module.exports = {
  name: 'dare',
  aliases: ['trial', 'challenge', 'test'],
  category: 'fun',
  description: 'Subject yourself to a Trial of Will set by the Great Sage',
  usage: '.dare',
  execute: async (sock, msg, args) => {
    try {
      const trials = [
        "Empty your scroll gallery and show the court what you hide! 🖼️",
        "Surrender your status to the whim of the group for a full cycle! 📜",
        "Call a random soul from your contacts and howl like a mountain beast! 🐺",
        "Post a portrait of your most foolish expression for all to see! 😜",
        "Send a message to your heart's desire and lay bare your truth! ❤️",
        "Perform 20 iron-body squats and provide proof of your strength! 💪",
        "Adorn your profile with a picture of a humble toad for a day! 🐸",
        "Send a voice scroll of you chanting the Great Sage's name! 🎤",
        "Let the group dictate your status for the next sun-cycle! ✍️",
        "Confess the most ridiculous blunder you have ever committed! 🤭",
        "Reveal the last 5 secrets you searched for in the Celestial Archive! 🔍",
        "Dance the Monkey King's jig for 60 seconds! 🐒",
        "Mimic the voice of the most senior warrior in this court! 🎭",
        "Speak only in the tongue of a foreign land for the next 10 minutes! 🌏",
        "Proclaim to the world that you have fallen to the Great Sage's bet! 🏳️",
        "Grant a fellow warrior access to your scrolls for 2 minutes! 📱",
        "Send a playful message of charm to a random contact! 😉",
        "Perform 50 rhythmic leaps of agility! 🤸",
        "Tell a joke; if the court does not laugh, you must face the Trial again! 🤡",
        "Perform a ritualistic dance for the digital scrolls!"
      ];
      
      const randomTrial = trials[Math.floor(Math.random() * trials.length)];
      
      let response = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖳𝖱𝖨𝖠𝖫  𝖮𝖥  𝖶𝖨𝖫𝖫  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
      response += `🐒 *𝖶𝗎𝗄𝗈𝗇𝗀 𝖣𝖾𝖼𝗋𝖾𝖾:*\n_"${randomTrial}"_\n\n`;
      response += `⚔️ *Will you accept this challenge, mortal?*`;
      
      await sock.sendMessage(msg.key.remoteJid, {
        text: response
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Dare Error:', error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `💥 *Chaos in Heaven:* The Trial of Will has collapsed in the ether!`
      }, { quoted: msg });
    }
  }
};
