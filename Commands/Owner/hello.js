/**
 * Wukong-MD: The Celestial Greeting
 * Architected by XyzTech 🐒⚡
 */

module.exports = {
    name: 'hello',
    category: 'main',
    description: 'Invoke the Great Sage to offer a celestial greeting.',
    async execute(sock, msg, args, extra) {
        const greeting = `✨ *The Heavens Part, the Sage Speaks!* ✨

🐒 *Wukong-MD greets you, mortal.*

I have traversed the nine heavens and the ten thousand realms to be here. My golden eyes see all, and my staff remains ever-ready to serve. 

*What wisdom or task do you seek from the Great Sage today?*

> ⚡ *Powered by Wukong-MD | Architected by XyzTech*`;

        await sock.sendMessage(extra.from, { 
            text: greeting 
        }, { quoted: msg });
    }
};
