/**
 * Wukong-MD: The Celestial Cipher (Set Prefix)
 * Architected by XyzTech 🐒⚡
 */

const config = require('../../config');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'setprefix',
  aliases: ['prefix'],
  category: 'owner',
  description: 'Invoke the Great Sage to alter the sacred invocation cipher.',
  usage: '.setprefix <new prefix>',
  ownerOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply(
          `🐒 *Wukong-MD: The Celestial Cipher*\n\n` +
          `Current Cipher: *${config.prefix}*\n\n` +
          `Usage: \`.setprefix <new symbol>\` to redefine the sacred invocation.`
        );
      }
      
      const newPrefix = args[0];
      
      if (newPrefix.length > 3) {
        return extra.reply('💥 [Wukong-MD]: The cipher is too complex! Keep it between 1-3 characters.');
      }
      
      // Update config file
      const configPath = path.join(__dirname, '../../config.js');
      let configContent = fs.readFileSync(configPath, 'utf-8');
      configContent = configContent.replace(/prefix: '.*'/, `prefix: '${newPrefix}'`);
      fs.writeFileSync(configPath, configContent);
      
      // Update runtime
      config.prefix = newPrefix;
      delete require.cache[require.resolve('../../config')];
      
      await extra.reply(
        `✅ [Wukong-MD]: The Cipher has been transmuted.\n\n` +
        `New sacred invocation: \`${newPrefix}command\``
      );
      
    } catch (error) {
      console.error(`💥 [Wukong-MD]: Cipher failure: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The ritual to redefine the cipher collapsed. Error: ${error.message}`);
    }
  }
};
