/**
 * Uptime Command - Display bot uptime since it was started
 * Styled with True Wukong Monkey King Personality 🐒🌩️
 */

const config = require('../../config');

/**
 * Format time difference into human-readable mythical strings
 * @param {number} seconds - Total seconds of uptime
 * @returns {string} Formatted uptime string
 */
function formatUptime(seconds) {
  if (seconds <= 0) {
    return '0 seconds';
  }
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const parts = [];
  
  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
  }
  if (secs > 0 || parts.length === 0) {
    parts.push(`${secs} ${secs === 1 ? 'second' : 'seconds'}`);
  }
  
  return parts.join(', ');
}

module.exports = {
  name: 'uptime',
  aliases: ['runtime', 'botuptime', 'alive', 'meditation'],
  category: 'general',
  description: 'Show how long the Sage has been awake and running',
  usage: '.uptime',
  
  async execute(sock, msg, args, extra) {
    try {
      // Get process uptime in seconds
      const uptimeSeconds = process.uptime();
      const uptime = formatUptime(uptimeSeconds);
      
      // Get bot info from config
      const botName = config.botName || 'Wukong Bot Mini';
      const botVersion = 'V1.0.1';
      
      // Build pure Monkey King style layout
      let message = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖦𝖱𝖤𝖠𝖳 𝖲𝖠𝖦𝖤 𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫 𝖠𝖶𝖠𝖪𝖤 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
      message += `🐒 *𝖡𝗈𝗍 𝖭𝖺𝗆𝖾:* ${botName}\n`;
      message += `🔱 *𝖢𝗈𝗎𝗋𝗍 𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* \`[ ${botVersion} ]\`\n`;
      message += `⏱️ *𝖠𝗐𝖺𝗄𝖾 𝖥𝗈𝗋:* ${uptime}\n\n`;
      message += `🪐 *𝖶𝗎𝗄𝗈𝗇𝗀 Says:* I have been guarding this realm without taking a single blink! Try to overthrow my throne if you dare. 💨`;
      
      await extra.reply(message);
      
    } catch (error) {
      console.error('Error in uptime command:', error);
      await extra.reply('💥 *Chaos in Heaven:* My dynamic timeline matrix failed to calculate my deep meditation hours.');
    }
  }
};
