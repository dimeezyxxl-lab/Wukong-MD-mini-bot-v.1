/**
 * Wukong-MD: The Celestial Gatekeeper (Mode)
 * Architected by XyzTech 🐒⚡
 */

const config = require('../../config');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'mode',
  aliases: ['botmode', 'privatemode', 'publicmode'],
  description: 'Toggle the Celestial Gate between private or public access.',
  usage: '.mode <private/public>',
  category: 'owner',
  ownerOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const mode = config.selfMode ? 'PRIVATE (Restricted to Sage)' : 'PUBLIC (Open to Mortals)';
        return extra.reply(
          `🐒 *Wukong-MD: Celestial Gate Status*\n\n` +
          `Current Gate: *${mode}*\n\n` +
          `Commands:\n` +
          `  • \`.mode private\` - Restrict access.\n` +
          `  • \`.mode public\` - Open access to all.`
        );
      }
      
      const mode = args[0].toLowerCase();
      
      if (mode === 'private' || mode === 'priv') {
        if (config.selfMode) return extra.reply('🐒 [Wukong-MD]: The Gate is already sealed. Only the Great Sage may pass.');
        
        updateConfig('selfMode', true);
        config.selfMode = true;
        return extra.reply('🐒 [Wukong-MD]: The Gate is sealed. My wisdom is now restricted to the inner circle.');
      }
      
      if (mode === 'public' || mode === 'pub') {
        if (!config.selfMode) return extra.reply('🐒 [Wukong-MD]: The Gate is already wide open to all realms.');
        
        updateConfig('selfMode', false);
        config.selfMode = false;
        return extra.reply('🐒 [Wukong-MD]: The Gate is opened. The Great Sage shares his wisdom with all mortals.');
      }
      
      return extra.reply('💥 [Wukong-MD]: Decree unclear. Use `.mode private` or `.mode public`.');
      
    } catch (error) {
      console.error(`💥 [Wukong-MD]: Gatekeeper failure: ${error.message}`);
      await extra.reply('💥 [Wukong-MD]: The Celestial Gate is stuck. My powers failed to alter the configuration.');
    }
  }
};

function updateConfig(key, value) {
  try {
    const configPath = path.join(__dirname, '..', '..', 'config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    const regex = new RegExp(`(${key}:\\s*)(true|false)`, 'g');
    configContent = configContent.replace(regex, `$1${value}`);
    fs.writeFileSync(configPath, configContent, 'utf8');
    delete require.cache[require.resolve('../../config')];
  } catch (error) {
    console.error('Error saving config:', error);
  }
}
