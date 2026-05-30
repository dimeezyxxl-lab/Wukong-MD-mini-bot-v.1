/**
 * Clean Command - Delete messages in group
 * Styled with True Wukong Monkey King Personality 🐒💨🧹
 */

module.exports = {
  name: 'clean',
  aliases: ['purge', 'clear', 'sweep', 'clonesweep'],
  category: 'admin',
  description: 'Summon shadow clones to sweep scrolls away from the court room',
  usage: '.clean <number>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const count = parseInt(args[0]);
      if (!count || count < 1 || count > 100) {
        return extra.reply('🪵 *Wukong Snickers:* You must give my clones a clear quota! Specify a number of scrolls to sweep between 1 and 100.\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .clean 25');
      }

      const jid = extra.from;
      const { store } = require('../../index');
      
      // Check if message is a reply targeting a specific troublemaker
      const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;

      const msgs = store.messages[jid];
      if (!msgs) {
        return extra.reply('🔮 *Wukong Tracker:* My memory store for this room is empty. There are no scrolls here to disintegrate!');
      }

      let messagesToDelete = [];

      if (quotedMsg && quotedParticipant) {
        // Mode: Target and sweep a specific troublemaker's scrolls
        messagesToDelete = Object.values(msgs)
          .filter(m => {
            const sender = m.key.participant || m.key.remoteJid;
            return sender === quotedParticipant;
          })
          .sort((a, b) => (b.messageTimestamp || 0) - (a.messageTimestamp || 0))
          .slice(0, count);
          
        if (messagesToDelete.length > 0) {
          await extra.reply(`🪐 *Deploying specialized clones...* Hunting down and shredding the last ${messagesToDelete.length} messages from that specific individual!`);
        }
      } else {
        // Mode: General purge sweep of the timeline room
        messagesToDelete = Object.values(msgs)
          .sort((a, b) => (b.messageTimestamp || 0) - (a.messageTimestamp || 0))
          .slice(0, count);
          
        if (messagesToDelete.length > 0) {
          await extra.reply(`💨 **Chews hair and blows*💨 *Shadow Clone Technique!* Dispatching clones to clear ${messagesToDelete.length} messy scrolls from this court...`);
        }
      }

      if (messagesToDelete.length === 0) {
        return extra.reply('🪵 *Wukong Blinks:* My clones searched high and low, but could not locate any active targets matching your criteria.');
      }

      let deleted = 0;
      for (const m of messagesToDelete) {
        try {
          await sock.sendMessage(jid, { delete: m.key });
          deleted++;
          // Small delay to keep the cloud infrastructure stable
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (err) {
          console.error('[clean] delete error:', err.message);
        }
      }
      
    } catch (e) {
      console.error('[clean cmd] error:', e);
      extra.reply('💥 *Chaos in Heaven:* My clones fumbled their brooms! Failed to successfully sweep the timeline.');
    }
  }
};
