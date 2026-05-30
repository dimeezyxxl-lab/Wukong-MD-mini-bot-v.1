/**
 * Wukong-MD: The Celestial Proclamation (Broadcast)
 * Architected by XyzTech 🐒⚡
 */

module.exports = {
  name: 'broadcast',
  aliases: ['bc'],
  category: 'owner',
  description: 'Invoke the Great Sage to proclaim a message across all realms.',
  usage: '.broadcast <message>',
  ownerOnly: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('🐒 [Wukong-MD]: Decree unclear. Usage: `.broadcast <your message>`');
      }
      
      const message = args.join(' ');
      const chats = await sock.groupFetchAllParticipating();
      const groups = Object.values(chats);
      
      let success = 0;
      let failed = 0;
      
      await extra.reply('🐒 [Wukong-MD]: Proclaiming your message across the digital heavens...');
      
      for (const group of groups) {
        try {
          await sock.sendMessage(group.id, {
            text: `📢 *CELESTIAL PROCLAMATION*\n\n${message}\n\n_Sent from the Wukong-MD throne._`
          });
          success++;
        } catch (e) {
          failed++;
        }
      }
      
      await extra.reply(`🐒 [Wukong-MD]: Proclamation complete!\n\n✅ Realms reached: ${success}\n❌ Realms resisted: ${failed}`);
      
    } catch (error) {
      console.error(`💥 [Wukong-MD]: The Proclamation collapsed: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The Proclamation could not be sent. Essence error: ${error.message}`);
    }
  }
};
