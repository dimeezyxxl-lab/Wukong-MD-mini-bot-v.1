/**
 * Wukong-MD: The Celestial Rebirth (Restart)
 * Architected by XyzTech 🐒⚡
 */

const { exec } = require('child_process');

module.exports = {
  name: 'restart',
  aliases: ['reboot', 'reload'],
  category: 'owner',
  description: 'Invoke the Great Sage to shed his form and undergo rebirth.',
  usage: '.restart',
  ownerOnly: true,

  async execute(sock, msg, args, extra) {
    try {
      await extra.reply('🐒 [Wukong-MD]: The Great Sage is entering the furnace of rebirth. I shall return in a moment...');

      const run = (cmd) =>
        new Promise((resolve, reject) => {
          exec(cmd, (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve(stdout || stderr);
          });
        });

      try {
        await run('pm2 restart all');
        return;
      } catch (e) {
        console.log('🐒 [Wukong-MD]: PM2 not found, initiating hard exit.');
      }

      setTimeout(() => {
        process.exit(0);
      }, 1000);
    } catch (error) {
      console.error(`💥 [Wukong-MD]: Rebirth failed: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The cycle of rebirth was interrupted. Essence error: ${error.message}`);
    }
  },
};
