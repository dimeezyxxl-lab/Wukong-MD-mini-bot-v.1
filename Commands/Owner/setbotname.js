/**
 * Wukong-MD: The Identity Transmutation (SetBotName)
 * Architected by XyzTech 🐒⚡
 */

const config = require('../../config');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'setbotname',
  aliases: ['setname', 'botname'],
  category: 'owner',
  description: 'Invoke the Great Sage to adopt a new honorary title.',
  usage: '.setbotname <new name> or reply to a message',
  ownerOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      let newBotName = quotedMsg 
        ? (quotedMsg.conversation || quotedMsg.extendedTextMessage?.text || quotedMsg.imageMessage?.caption || '').trim()
        : args.join(' ').trim();
      
      if (!newBotName) {
        return extra.reply(
          `🐒 *Wukong-MD: Identity Transmutation*\n\n` +
          `The Sage currently goes by: *${config.botName}*\n\n` +
          `Invoke: \`.setbotname <New Title>\` to bestow a new name.`
        );
      }
      
      if (newBotName.length > 50) return extra.reply('💥 [Wukong-MD]: A title this long defies the laws of the heavens!');
      
      // Update config file
      const configPath = path.join(__dirname, '../../config.js');
      let configContent = fs.readFileSync(configPath, 'utf-8');
      configContent = configContent.replace(
        /botName:\s*['"`]([^'"`]*)['"`]/,
        `botName: '${newBotName.replace(/'/g, "\\'")}'`
      );
      fs.writeFileSync(configPath, configContent, 'utf-8');
      delete require.cache[require.resolve('../../config')];
      
      await extra.reply(`🐒 [Wukong-MD]: The transmuted essence is complete. I shall now be known as *${newBotName}* throughout the realms.`);
      
    } catch (error) {
      console.error(`💥 [Wukong-MD]: Transmutation failure: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The ritual failed. Essence error: ${error.message}`);
    }
  }
};
