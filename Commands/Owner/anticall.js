/**
 * Wukong-MD: The Celestial Decree (Anti-Call)
 * Architected by XyzTech 🐒⚡
 */

module.exports = {
  name: 'anticall',
  category: 'owner',
  ownerOnly: true,
  description: 'Invoke the Great Sage to block incoming mortal calls.',
  usage: '.anticall on/off',

  async execute(sock, msg, args, extra) {
    if (!args[0] || !['on', 'off'].includes(args[0].toLowerCase())) {
      return extra.reply('🐒 [Wukong-MD]: Decree unclear. Use `.anticall on` to manifest the barrier or `.anticall off` to lower it.');
    }

    const enabled = args[0].toLowerCase() === 'on';
    const fs = require('fs');
    const path = require('path');
    const configPath = path.join(__dirname, '../../config.js');
    
    try {
      let configFile = fs.readFileSync(configPath, 'utf8');
      
      // Update the barrier status
      configFile = enabled 
        ? configFile.replace(/anticall:\s*false/g, 'anticall: true')
        : configFile.replace(/anticall:\s*true/g, 'anticall: false');
      
      fs.writeFileSync(configPath, configFile);
      delete require.cache[require.resolve('../../config')];
      
      await extra.reply(
        enabled
          ? '🐒 [Wukong-MD]: The Celestial Barrier is active. Mortal calls shall be repelled by the Great Sage!'
          : '🐒 [Wukong-MD]: The Celestial Barrier has been dispelled. Calls may now pass through.'
      );
    } catch (err) {
      console.error(`💥 [Wukong-MD]: The Decree failed to manifest: ${err.message}`);
      extra.reply('💥 [Wukong-MD]: My powers failed to alter the sacred configuration.');
    }
  }
};
