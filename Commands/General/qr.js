/**
 * QR Code Generator Command
 * Styled with True Wukong Monkey King Personality 🐒𝌆
 */

const qrcode = require('qrcode');

module.exports = {
  name: 'qr',
  aliases: ['qrcode', 'matrixseal', 'array'],
  category: 'general',
  description: 'Weave text or a link into a celestial matrix QR code seal',
  usage: '.qr <text>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('🪵 *Wukong Snickers:* You ask for a matrix seal, but your scroll is empty! Give me text or a link to weave.\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .qr https://github.com');
      }
      
      const text = args.join(' ');
      
      // Weaving alert
      await extra.reply('🪐 *Tracing the grid layout...* Locking your chant into a geometric matrix seal!');

      const qrBuffer = await qrcode.toBuffer(text, {
        type: 'png',
        width: 500,
        margin: 2
      });
      
      // Send the QR code back with premium layout formatting
      await sock.sendMessage(extra.from, {
        image: qrBuffer,
        caption: `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫 𝖬𝖠𝖳𝖱𝖨𝖷 𝖲𝖤𝖠𝖫 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n✨ *𝖶𝗎𝗄𝗈𝗇𝗀 Magic:* The information has been locked down safely inside this geometric array!\n\n📝 *𝖤𝗆𝖻𝖾𝖽𝖽𝖾𝖽 𝖢𝗁𝖺𝗇𝗍:* _${text}_\n\n💨 _Bound by the power of the Monkey King Bot Mini_`
      }, { quoted: msg });
      
    } catch (error) {
      await extra.reply(`💥 *Chaos in Heaven:* The matrix strings snapped! Failed to compress text:\n\n❌ *𝖤𝗋𝗋𝗈𝗋:* ${error.message}`);
    }
  }
};
