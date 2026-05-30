async function startBot() {
  const sessionFolder = `./${config.sessionName}`;
  const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: createSuppressedLogger('silent'),
    printQRInTerminal: false, // MUST be false
    browser: Browsers.macOS('Desktop'), // Use a canonical browser string for pairing
    auth: state,
    // ... your other config
  });

  store.bind(sock.ev);

  // 🐒 PAIRING CODE LOGIC
  if (!sock.authState.creds.registered) {
    const phoneNumber = '2348161199331'; // Enter your number in E.164 format (no +)
    
    // Brief delay to allow the connection to stabilize
    setTimeout(async () => {
      const code = await sock.requestPairingCode(phoneNumber);
      console.log(`\n🐒 *The Great Sage has generated your Celestial Pairing Code:*`);
      console.log(`🔑 *Code:* ${code}\n`);
      console.log(`💡 *Instructions:* Go to WhatsApp > Linked Devices > Link with phone number > Enter this code.`);
    }, 3000);
  }

  sock.ev.on('connection.update', async (update) => {
    const { connection } = update;
    if (connection === 'open') {
      console.log('\n✅ *The Celestial Gates have opened!*');
      // ... your existing success logs
    }
    // ... your existing reconnection logic
  });

  // ... rest of your code
}
