/**
 * Get Profile Picture Command
 * Fetch and download a target user's avatar styled for Wukong Bot Mini ⚡
 */

const axios = require('axios');

module.exports = {
  name: 'getpp',
  aliases: ['gp', 'getpic', 'avatar'],
  category: 'general',
  description: 'Get profile picture of a user',
  usage: '.getpp (reply to message or tag user)',
  
  async execute(sock, msg, args, extra) {
    try {
      let targetUser = null;
      
      // Check if it's a reply
      const quotedMessage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (quotedMessage) {
        // Get the participant who sent the quoted message
        targetUser = msg.message.extendedTextMessage.contextInfo.participant;
      } else {
        // Check if user is tagged
        const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        if (mentionedJid && mentionedJid.length > 0) {
          targetUser = mentionedJid[0];
        } else {
          // If no reply or tag, use the sender of current message
          targetUser = extra.sender;
        }
      }
      
      if (!targetUser) {
        return extra.reply('⚙️ *Configuration Error:* Could not target user matrix. Mention someone or reply to their message.');
      }
      
      try {
        // Try to get the profile picture from Baileys matrix
        const ppUrl = await sock.profilePictureUrl(targetUser, 'image');
        
        if (!ppUrl) {
          return extra.reply('🔮 *Wukong Tracker:* Profile picture not found or hidden by user privacy settings.');
        }
        
        // Download the profile picture
        const response = await axios.get(ppUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        
        // Send the profile picture back with premium styling
        await sock.sendMessage(extra.from, { 
          image: buffer,
          caption: `🔱 *💥 𝖶𝖴𝖪𝖮𝖭𝖦 𝖨𝖭𝖳𝖤𝖱𝖢𝖤𝖯𝖳!* 💥\n\n👤 *𝖳𝖺𝗋𝗀𝖾𝗍:* @${targetUser.split('@')[0]}\n🪐 *𝖱𝖾𝗍𝗋𝖨𝖾𝗏𝖺𝗅:* Avatar extracted successfully!`,
          mentions: [targetUser]
        }, { quoted: msg });
        
      } catch (profileError) {
        // Handle variations of fetch or access errors smoothly
        if (profileError.message?.includes('item-not-found') || 
            profileError.output?.statusCode === 404 || 
            profileError.output?.statusCode === 500 ||
            profileError.message?.includes('not found')) {
          return extra.reply('🔮 *Wukong Tracker:* Target profile picture is nonexistent or blank.');
        } else if (profileError.output?.statusCode === 401 || 
                   profileError.message?.includes('forbidden') || 
                   profileError.message?.includes('unauthorized')) {
          return extra.reply('🔒 *Access Denied:* Target avatar matrix is restricted by individual privacy configurations.');
        } else {
          return extra.reply('🔮 *Wukong Tracker:* Profile picture could not be retrieved.');
        }
      }
      
    } catch (error) {
      extra.reply('💥 System alert: Failed compilation map for avatar extraction.');
    }
  }
};
