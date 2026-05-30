/**
 * Wukong-MD: The Celestial Response System (Auto-React)
 * Architected by XyzTech 🐒⚡
 */

module.exports = {
  name: 'autoreact',
  aliases: ['ar'],
  category: 'owner',
  description: 'Invoke the Great Sage to acknowledge mortal messages.',
  usage: '.autoreact <on/off/set bot/set all>',
  ownerOnly: true,

  async execute(sock, msg, args, extra) {
    try {
      const { load, save } = require('../../utils/autoReact');
      const db = load();

      if (!args[0]) {
        return extra.reply(
          '🐒 *Wukong-MD: Celestial Response Menu*\n\n' +
          '• `.autoreact on` - Activate the Great Sage\'s gaze.\n' +
          '• `.autoreact off` - Withdraw the Sage’s gaze.\n' +
          '• `.autoreact set bot` - React only to commands.\n' +
          '• `.autoreact set all` - React to all mortal messages.'
        );
      }

      const opt = args.join(' ').toLowerCase();

      if (opt === 'on') {
        db.enabled = true;
        save(db);
        return extra.reply('✅ [Wukong-MD]: The Great Sage is now watching and acknowledging.');
      }

      if (opt === 'off') {
        db.enabled = false;
        save(db);
        return extra.reply('❌ [Wukong-MD]: The Great Sage has averted his gaze.');
      }

      if (opt === 'set bot') {
        db.mode = 'bot';
        save(db);
        return extra.reply('🤖 [Wukong-MD]: Mode shifted: Acknowledging only sacred commands.');
      }

      if (opt === 'set all') {
        db.mode = 'all';
        save(db);
        return extra.reply('🌟 [Wukong-MD]: Mode shifted: Bestowing favor upon all mortal messages.');
      }

      extra.reply('💥 [Wukong-MD]: My wisdom does not recognize this command. Check your input.');
    } catch (err) {
      console.error(`💥 [Wukong-MD]: Response system failure: ${err.message}`);
      extra.reply('💥 [Wukong-MD]: The Celestial Response System has suffered a disturbance.');
    }
  }
};
