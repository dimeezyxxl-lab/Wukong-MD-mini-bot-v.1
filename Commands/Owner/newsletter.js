/**
 * Wukong-MD: The Celestial Scribe (Newsletter Info)
 * Architected by XyzTech 🐒⚡
 */

function getChannelInviteCode(link) {
  try {
    let cleanLink = link.trim().split('?')[0].split('#')[0];
    const patterns = [/(?:whatsapp\.com|wa\.me)\/channel\/([A-Za-z0-9]+)/i, /\/channel\/([A-Za-z0-9]+)/i, /channel\/([A-Za-z0-9]+)/i];
    for (const pattern of patterns) {
      const match = cleanLink.match(pattern);
      if (match && match[1]) return match[1];
    }
    return /^[A-Za-z0-9]+$/.test(cleanLink) ? cleanLink : null;
  } catch (e) { return null; }
}

module.exports = {
  name: 'newsletter',
  aliases: ['channel', 'channelinfo', 'nl'],
  category: 'owner',
  description: 'Invoke the Celestial Scribe to archive channel information.',
  usage: '.newsletter <channel link>',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || args.join(' ');
      const link = getChannelInviteCode(text.replace(/^\.(newsletter|nl|channel|channelinfo)\s+/i, ''));
      
      if (!link) return extra.reply('🐒 [Wukong-MD]: Decree unclear. Please provide a valid channel link or invite code.');
      
      await extra.reply('🐒 [Wukong-MD]: The Scribe is searching the Celestial Archives...');
      
      const meta = await sock.newsletterMetadata('invite', link);
      if (!meta) throw new Error('Newsletter not found');
      
      let infoText = `🐒 *Wukong-MD: Celestial Archive*\n\n`;
      infoText += `🆔 *ID:* \`${meta.id || 'N/A'}\`\n`;
      if (meta.description) infoText += `📝 *Description:* ${meta.description}\n`;
      if (meta.invite) infoText += `🔗 *Invite Code:* \`${meta.invite}\`\n`;
      if (meta.subscriberCount !== undefined) infoText += `👥 *Subscribers:* ${meta.subscriberCount.toLocaleString()}\n`;
      if (meta.creationTime) infoText += `📅 *Created:* ${new Date(meta.creationTime * 1000).toLocaleDateString()}\n`;
      
      if (meta.image) {
        await sock.sendMessage(extra.from, { image: { url: meta.image }, caption: infoText }, { quoted: msg });
      } else {
        await sock.sendMessage(extra.from, { text: infoText }, { quoted: msg });
      }
        
    } catch (error) {
      console.error(`💥 [Wukong-MD]: The Scribe failed to find the scroll: ${error.message}`);
      await extra.reply(`💥 [Wukong-MD]: The archive is empty or the path is incorrect. Essence error: ${error.message}`);
    }
  }
};
