async function startBot() {
  const sessionFolder = `./${config.sessionName}`; // Using config.sessionName for theme consistency
  const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: createSuppressedLogger('silent'),
    printQRInTerminal: false,
    browser: ['Wukong-MD', 'Chrome', '10.0'], // You can now use your branded browser string
    auth: state,
    syncFullHistory: false,
    downloadHistory: false,
    markOnlineOnConnect: false,
    getMessage: async () => undefined
  });

  store.bind(sock.ev);
  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'connecting') {
      console.log('🐒 *The Celestial Gates are trembling...*');
    }

    if (connection === 'open') {
      console.log('\n✅ *The Celestial Gates have opened!*');
      console.log(`📱 *Bot Identity:* ${sock.user.id.split(':')[0]}`);
      // ... your other success logs
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== 401;
      if (shouldReconnect) {
        startBot(); // Reconnect
      } else {
        console.log('⚠️ *Connection closed. You may need to re-pair.*');
      }
    }
  });

  // 🐒 IMPROVED PAIRING CODE LOGIC
  // We only trigger this if the bot is not registered and the connection is not yet active
  if (!sock.authState.creds.registered) {
    const phoneNumber = '2348161199331'; 

    setTimeout(async () => {
      try {
        const code = await sock.requestPairingCode(phoneNumber);
        console.log(`\n🐒 *The Great Sage has generated your Celestial Pairing Code:*`);
        console.log(`🔑 *Code:* ${code}`);
        console.log(`💡 *Instructions:* Go to WhatsApp > Linked Devices > Link with phone number > Enter this code.\n`);
      } catch (err) {
        console.error('💥 *Failed to generate pairing code:*', err);
      }
    }, 5000); // 5-second delay ensures the socket is ready
  }
}
