/**
 * ⚡ Wukong-MD: Celestial Configuration ⚡
 * Architected by XyzTech 🐒⚡
 */

module.exports = {
    // 👑 MANAGEMENT PROFILE
    ownerNumber: ['2349022370895', '2348161199331'], 
    ownerName: ['Xyz Mini', 'Xyz'], 

    // 🤖 BOT SYSTEM SETUP
    botName: 'Wukong-MD',
    prefix: '.',
    sessionName: 'session',
    // Keep this empty or use env variable for security!
    sessionID: process.env.SESSION_ID || '', 
    newsletterJid: '', 
    updateZipUrl: '', 

    // 🎨 CUSTOM MEDIA & STICKERS
    packname: 'Wukong-MD',
    author: 'XyzTech',

    // ⚙️ AUTOMATION & BEHAVIOR
    selfMode: false, 
    autoRead: false,
    autoTyping: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot', 
    autoDownload: false,

    // 🛡️ ADVANCED SECURITY & GROUP MANAGER
    defaultGroupSettings: {
        antilink: false,
        antilinkAction: 'delete', 
        antitag: false,
        antitagAction: 'delete',
        antiall: false, 
        antiviewonce: false,
        antibot: false,
        anticall: false, 
        antigroupmention: false, 
        antigroupmentionAction: 'delete', 
        
        // 📥 GREETINGS SYSTEM
        welcome: false,
        welcomeMessage: '┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ ✨ 🪐 𝖭𝖤𝖶 𝖬𝖤𝖬𝖡𝖤𝖱 𝖣𝖤𝖳𝖤𝖢𝖳𝖤𝖣 🪐 ✨\n┃ 👤 𝖴𝗌𝖾𝗋: @user\n┃ 📊 𝖳𝗈𝗍𝖺𝗅 𝖬𝖾𝗆𝖻𝖾𝗋𝗌: #memberCount\n┃ ⏰ 𝖳𝗂𝗆𝖾: time\n┗━━━━━━━━━━━━━━━━━━┛\n\nHey *@user*! Welcome to *@group* ✨\n\n📝 *𝖦𝗋𝗈𝗎𝗉 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇:*\ngroupDesc\n\n> 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖡𝗒 𝖶𝗎𝗄𝗈𝗇𝗀-𝖬𝖣',
        goodbye: false,
        goodbyeMessage: '✨ Farewell @user 💎 We hope to see you again soon!',
        
        // 🔌 EXTRA MODULES
        antiSpam: false,
        antidelete: false,
        nsfw: false,
        detect: false,
        chatbot: false,
        autosticker: false 
    },

    // 🔑 SECURE API CREDENTIALS
    apiKeys: {
        openai: '',
        deepai: '',
        remove_bg: ''
    },

    // 💬 SYSTEM NOTICE CONFIGURATION
    messages: {
        wait: '🌀 Loading... process is running, please wait.',
        success: '⭐ Completed successfully!',
        error: '💥 [Wukong-MD]: System alert: An error occurred!',
        ownerOnly: '🔒 Access Denied! This parameter is restricted to the Bot Owner.',
        adminOnly: '🔱 Staff Only! This function requires group administrator privileges.',
        groupOnly: '🌐 Restricted! This feature is exclusively for group chats.',
        privateOnly: '📥 Private Access! Please interact with this command in private chat.',
        botAdminNeeded: '⚙️ Configuration Error! Please grant admin rights to the bot first.',
        invalidCommand: '🔮 Unknown input. Use .menu to discover valid operations.'
    },

    // 🌐 LOCALIZATION & LIMITS
    timezone: 'Africa/Lagos',
    maxWarnings: 3,

    // 📱 DIGITAL PRESENCE
    social: {
        github: 'https://github.com/mruniquehacker/Wukong-MD',
        instagram: 'https://instagram.com/xyz_wukong',
        youtube: 'http://youtube.com/@xyz_universe1'
    }
};
