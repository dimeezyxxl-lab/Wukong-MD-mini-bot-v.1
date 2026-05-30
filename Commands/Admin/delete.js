/**
 * Delete Command
 * Delete a replied message
 * Styled with True Wukong Monkey King Personality 🐒💨🔥
 */

module.exports = {
  name: 'delete',
  aliases: ['del', 'erase', 'smash', 'shred'],
  description: 'Instantly disintegrate a targeted message scroll from existence',
  usage: '.delete (reply to a message)',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      
      if (!ctx?.stanzaId || !ctx?.participant) {
        return extra.reply('🪵 *Wukong Snickers:* My staff can\'t hit thin air! Point exactly at the target. Reply to the specific message scroll you want me to dissolve.');
      }
      
      const deleteKey = { 
        remoteJid: extra.from, 
        id: ctx.stanzaId, 
        participant: ctx.participant 
      };
      
      // Smash the target message from existence
      await sock.sendMessage(extra.from, { delete: deleteKey });
      
    } catch (error) {
      console.error('Delete command error:', error);
      await extra.reply('💥 *Chaos in Heaven:* The message scroll was bound by a strange sigil. I failed to disintegrate it!');
    }
  }
};
