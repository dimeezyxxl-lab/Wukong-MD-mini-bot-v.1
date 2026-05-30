/**
 * AutoSticker Command - Enable or disable auto-sticker conversion
 * Styled with True Wukong Monkey King Personality 🐒⚡🔮
 */

const database = require('../../database');

module.exports = {
  name: 'autosticker',
  aliases: ['autos', 'asticker', 'automutate', 'forge'],
  category: 'admin',
  description: 'Enable or disable the automatic sticker mutation forge for images/videos',
  usage: '.autosticker <on/off>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: false,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.autosticker ? '𝖠𝖢𝖳𝖨𝖵𝖤' : '𝖣𝖮𝖱𝖬𝖠𝖭𝖳';
        return extra.reply(
          `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖠𝖴𝖳𝖮-𝖲𝖳𝖨𝖢𝖪𝖤𝖱 𝖥𝖮𝖱𝖦𝖤 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
          `🔮 *𝖥𝖮𝗋𝗀𝖾 𝖲𝗍𝖺𝗍𝗎𝗌:* \`[ ${status} ]\`\n\n` +
          `✨ *𝖶𝗎𝗄𝗈𝗇𝗀 Lore:* When active, every raw image canvas or video scroll dropped into this realm will be instantly mutated into a sticker asset by my magic!\n\n` +
          `📌 *𝖢𝗈𝗎𝗋𝗍 𝖢𝗁𝖺𝗇𝗍𝗌:*\n` +
          `  • \`.autosticker on\`  — Ignite the mutation forge\n` +
          `  • \`.autosticker off\` — Extinguish the forge flames`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'on') {
        if (database.getGroupSettings(extra.from).autosticker) {
          return extra.reply('🪵 *Wukong Blinks:* The mutation forge is already roaring! Any media scroll dropped here is already getting instantly transformed.');
        }
        database.updateGroupSettings(extra.from, { autosticker: true });
        return extra.reply('🔥 *Forge Ignited!* The automatic mutation spell has taken over the realm. Throw your images and videos into the chat and watch them warp into stickers instantly!');
      }
      
      if (opt === 'off') {
        if (!database.getGroupSettings(extra.from).autosticker) {
          return extra.reply('🪵 *Wukong Yawns:* The forge flames are already cold. Auto-sticker mode is resting.');
        }
        database.updateGroupSettings(extra.from, { autosticker: false });
        return extra.reply('❄️ *Forge Extinguished:* The mutation magic has ceased. Media scrolls will now remain in their raw, original forms.');
      }
      
      return extra.reply('🪵 *Wukong Grins:* Wrong chant order! Use \`.autosticker on\` or \`off\` to command the forge.');
    } catch (error) {
      console.error('[AutoSticker Command Error]:', error);
      return extra.reply('💥 *Chaos in Heaven:* The transformation forge ruptured while updating the core seals.');
    }
  }
};
