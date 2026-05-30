// commands/general/myactivity.js

const { getStats } = require('../../utils/groupstats');

module.exports = {
    name: 'myactivity',
    aliases: ['mystats', 'mymsgs', 'rank'],
    category: 'general',
    description: 'Check your activity stats and battle rank for today',
    usage: '.myactivity',
    groupOnly: true,

    async execute(sock, msg, args, extra) {
        try {
            const from = extra.from;
            const sender = extra.sender;
            const stats = getStats(from);

            if (!stats || !stats.users || !stats.users[sender]) {
                return extra.reply('🔮 *Wukong Tracker:* You haven\'t recorded any battle power or messages in this realm today!');
            }

            const userCount = stats.users[sender];
            const totalMessages = stats.total;
            const percentage = ((userCount / totalMessages) * 100).toFixed(1);

            // Calculate rank
            const sortedUsers = Object.entries(stats.users)
                .sort((a, b) => b[1] - a[1]);
            
            const rank = sortedUsers.findIndex(([id]) => id === sender) + 1;

            const text = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ ✨ 🪐 𝖶𝖴𝖪𝖮𝖭𝖦 𝖡𝖠𝖳𝖳𝖫𝖤 𝖲𝖳𝖠𝖳𝖲 🪐 ✨\n┗━━━━━━━━━━━━━━━━━━┛\n\n👤 *𝖶𝖺𝗋𝗋𝗂𝗈𝗋:* @${sender.split('@')[0]}\n📝 *𝖲𝖳𝗋𝗂𝗄𝖾𝗌 (𝖬𝖾𝗌𝗌𝖺𝖲𝖾𝗌):* ${userCount}\n📈 *𝖱𝖾𝖺𝗅𝗆 𝖣𝗈𝗆𝗂𝗇𝖺𝗇𝖼𝖾:* ${percentage}%\n🏆 *𝖢𝗈𝗎𝗋𝗍 𝖱𝖺𝗇𝗄:* #${rank} of ${sortedUsers.length}\n\n⚡ _Keep unleashing your power in the chat!_ 🔱`.trim();

            await sock.sendMessage(from, {
                text,
                mentions: [sender]
            }, { quoted: msg });

        } catch (err) {
            console.error('[myactivity cmd] error:', err);
            extra.reply('💥 System alert: Failed compilation map for active ranking matrix.');
        }
    }
};
