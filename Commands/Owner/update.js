/**
 * Wukong-MD: The Celestial Ascension (Update)
 * Architected by XyzTech 🐒⚡
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const config = require('../../config');

// ... [Keep your helper functions: run, extractZip, downloadFile, copyRecursive, updateViaZip] ...

module.exports = {
  name: 'update',
  aliases: ['upgrade'],
  category: 'owner',
  description: 'Invoke the Great Sage to ascend to a newer version.',
  usage: '.update [optional_zip_url]',
  ownerOnly: true,

  async execute(sock, msg, args, extra) {
    const zipUrl = (args[0] || config.updateZipUrl || process.env.UPDATE_ZIP_URL || '').trim();

    if (!zipUrl) {
      return extra.reply('🐒 [Wukong-MD]: Decree unclear. No source URL provided in the sacred configuration.');
    }

    try {
      await extra.reply('🐒 [Wukong-MD]: Commencing Celestial Ascension. Downloading new scrolls from the heavens...');

      const { copiedFiles } = await updateViaZip(zipUrl);

      const summary = copiedFiles.length
        ? `✅ [Wukong-MD]: Ascension complete! ${copiedFiles.length} scrolls updated.`
        : '✅ [Wukong-MD]: Ascension complete. The Great Sage is already in harmony with the latest version.';

      await sock.sendMessage(extra.from, { 
        text: `${summary}\n\n🐒 [Wukong-MD]: Entering the furnace of rebirth to integrate changes...` 
      }, { quoted: msg });

      try {
        await run('pm2 restart all');
        return;
      } catch {}

      setTimeout(() => process.exit(0), 1500);
    } catch (error) {
      console.error(`💥 [Wukong-MD]: Ascension collapsed: ${error.message}`);
      await sock.sendMessage(extra.from, { 
        text: `💥 [Wukong-MD]: The Ascension failed. The celestial path is obstructed:\n${String(error.message || error)}` 
      }, { quoted: msg });
    }
  }
};
