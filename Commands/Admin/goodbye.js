/**
 * Goodbye - Enable/disable goodbye messages
 * Styled with True Wukong Monkey King Personality 🐒👋🍃
 */

const db = require('../../database');

module.exports = {
  name: 'goodbye',
  aliases: ['goodbyeon', 'goodbyeoff', 'partingseal', 'desertion'],
  category: 'admin',
  description: 'Enable or disable parting scrolls for members who flee the realm',
  usage: '.goodbye on/off',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args) {
    try {
      const groupId = msg.key.remoteJid;
      const action = args[0]?.toLowerCase();
      
      if (!action || !['on', 'off'].includes(action)) {
        const groupSettings = db.getGroupSettings(groupId);
        const status = groupSettings.goodbye ? '𝖵𝖨𝖦𝖨𝖫𝖠𝖭𝖳' : '𝖨𝖦𝖭𝖮𝖱𝖤𝖣';
        
        return await sock.sendMessage(groupId, {
          text: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫  𝖯𝖠𝖱𝖳𝖨𝖭𝖦  𝖲𝖤𝖠𝖫  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
                `🍃 *𝖣𝖾𝗌𝖾𝗋finish𝗇 𝖳𝗋𝖺𝖼𝗄𝖾𝗋:* \`[ ${status} ]\`\n` +
                `📝 *𝖢𝗎𝗋𝗋𝖾𝗇𝗍 𝖯𝖺𝗋finish𝗇𝖌 𝖢𝖧𝖺𝗇𝗍:* _${groupSettings.goodbyeMessage || 'Left the mountain.'}_\n\n` +
                `📌 *𝖢𝗈𝗎𝗋𝗍 𝖢finish𝖼finish𝖾𝗌:* \n` +
                `  • \`.goodbye on\`  — Record and blast parting scrolls\n` +
                `  • \`.goodbye off\` — Let deserters slip away unnoticed\n\n` +
                `👉 _𝖳𝗈 customize the parting scroll, chant:_ \`.setgoodbye <message>\``
        }, { quoted: msg });
      }
      
      const enable = action === 'on';
      db.updateGroupSettings(groupId, { goodbye: enable });
      
      const responseText = enable
        ? '🍃 *Seal Activated!* My scouts are now tracking the borders. Anyone fleeing or deserting this kingdom will be met with a parting scroll as they fall!'
        : '🪵 *Wukong Yawns:* Parting tracking disabled. Let them walk out into the mortal fog; I won\'t waste any breath acknowledging their exit.';

      await sock.sendMessage(groupId, { text: responseText }, { quoted: msg });
      
    } catch (error) {
      console.error('Goodbye Error:', error);
      await sock.sendMessage(groupId, {
        text: `💥 *Chaos in Heaven:* The parting seal fractured while rewriting the exit decree: ${error.message}`
      }, { quoted: msg });
    }
  }
};
