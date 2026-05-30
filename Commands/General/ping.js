/**
 * Ping Command - Check bot response time
 * Styled with Wukong Personality ⚡
 */

module.exports = {
    name: 'ping',
    aliases: ['p'],
    category: 'general',
    description: 'Check bot response speed',
    usage: '.ping',
    
    async execute(sock, msg, args, extra) {
      try {
        const start = Date.now();
        // Initializing the strike
        const sent = await extra.reply('🐒 *Summoning the Golden Staff...* Prep for impact!');
        const end = Date.now();
        
        const responseTime = end - start;
        
        // Final legendary response
        await sock.sendMessage(extra.from, {
          text: `🔱 *💥 𝖶𝖴𝖪𝖮𝖭𝖦 𝖲𝖳𝖱𝖨𝖪𝖤!* 💥\n\n🪐 *𝖲𝗍𝖺𝗍𝗎𝗌:* The Monkey King is fully awake!\n⚡ *𝖲𝗉𝖾𝖾𝖽:* 𝗅𝗂𝗀𝗁𝗍𝗇𝗂𝗇𝗀-𝖿𝖺𝗌𝗍 \`[ ${responseTime}ms ]\`\n🛸 *𝖱𝖾𝖺𝗅𝗆:* Operational & Unstoppable.`,
          edit: sent.key
        });
        
      } catch (error) {
        await extra.reply(`💥 System alert: An error occurred! ${error.message}`);
      }
    }
  };
