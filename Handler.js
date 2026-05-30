/**
 * Message Handler - The Celestial Overseer
 * Styled with True Wukong Monkey King Personality 🐒⚡
 */

// ... [Keep your imports the same] ...

// Helper for Wukong-themed log formatting
const log = (msg) => console.log(`🐒 [Wukong-MD]: ${msg}`);

const handleMessage = async (sock, msg) => {
  try {
    if (!msg.message) return;
    const from = msg.key.remoteJid;
    
    // ... [Keep system JID filter] ...

    // Auto-React System
    if (config.autoReact && msg.message && !msg.key.fromMe) {
      // ... [Keep logic] ...
      if (mode === 'bot') {
        const prefixList = ['.', '/', '#'];
        if (prefixList.includes(text?.trim()[0])) {
          await sock.sendMessage(jid, { react: { text: '⚡', key: msg.key } }); // Wukong's lightning
        }
      }
    }

    // ... [Keep your container unwrapping logic] ...

    // Anti-link enforcement with Wukong flavor
    if (linkPattern.test(body)) {
      // ... [Inside the link detection logic]
      const action = (groupSettings.antilinkAction || 'delete').toLowerCase();
      
      if (action === 'kick' && botIsAdmin) {
        await sock.sendMessage(from, { delete: msg.key });
        await sock.groupParticipantsUpdate(from, [sender], 'remove');
        await sock.sendMessage(from, { 
          text: `🚫 *Forbidden Path!*\n\nThe Great Sage does not tolerate external links here.\n\n_Powered by XyzTech_`,
          mentions: [sender]
        }, { quoted: msg });
      } else {
        await sock.sendMessage(from, { delete: msg.key });
        await sock.sendMessage(from, { 
          text: `⚠️ *Anti-link triggered!*\n\nKeep the discussion pure, mortal.\n\n_Powered by XyzTech_`,
          mentions: [sender]
        }, { quoted: msg });
      }
    }

    // ... [Update other error messages to include the XyzTech signature] ...

    // Execute command with persona logs
    log(`Executing command: ${commandName} from ${sender.split('@')[0]}`);
    
    await command.execute(sock, msg, args, {
      // ... [Keep your execute arguments] ...
    });
    
  } catch (error) {
    console.error('💥 Chaos in the Handler:', error);
    // ... [Error feedback with Wukong flavor]
  }
};

// ... [Rest of your file stays identical for functionality] ...
