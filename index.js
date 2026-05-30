async function startBot() {
  // Use the Render-specific disk path for persistence
  const sessionFolder = `/opt/render/project/src/${config.sessionName}`; 
  const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: createSuppressedLogger('silent'),
    printQRInTerminal: false,
    browser: ['Wukong-MD', 'Chrome', '10.0'],
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
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== 401;
      if (shouldReconnect) {
        startBot(); 
      } else {
        console.log('⚠️ *Connection closed. You may need to re-pair.*');
      }
    }
  });

  // Updated to use process.env for Render deployment
  if (!sock.authState.creds.registered) {
    const phoneNumber = process.env.PHONE_NUMBER; 

    setTimeout(async () => {
      try {
        if (!phoneNumber) throw new Error("PHONE_NUMBER environment variable is missing.");
        const code = await sock.requestPairingCode(phoneNumber);
        console.log(`\n🐒 *The Great Sage has generated your Celestial Pairing Code:*`);
        console.log(`🔑 *Code:* ${code}`);
        console.log(`💡 *Instructions:* Go to WhatsApp > Linked Devices > Link with phone number > Enter this code.\n`);
      } catch (err) {
        console.error('💥 *Failed to generate pairing code:*', err);
      }
    }, 5000);
  }
}
