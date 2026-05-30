// commands/admin/groupstats.js

const { getStats } = require('../../utils/groupstats');

module.exports = {
    name: 'groupstats',
    aliases: ['stats', 'leaderboard', 'gstats', 'topmembers', 'msgs', 'messagestats'],
    category: 'general',
    description: 'Show today\'s realm chat dominance ranking',
    usage: '.groupstats',
    groupOnly: true,

    async execute(sock, msg, args, extra) {
        try {
            const from = extra.from;
            const stats = getStats(from);

            if (!stats) {
                return extra.reply('🔮 *Wukong Tracker:* The battlegrounds are quiet. No power or activity has been recorded in this realm today!');
            }

            const { total, users } = stats;

            // Get top 5 members sorting by message count
            const sortedUsers = Object.entries(users)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            // Dynamic medal mapping for the top warriors
            const medals = ['👑', '🥈', '🥉', '⚡', '➜'];

            let topText = sortedUsers.length
                ? sortedUsers.map(([id, count], i) => `│ ${medals[i] || '➜'} @${id.split('@')[0]} \n│    ↳ _${count} strikes_`).join('\n')
                : 'No active warriors in the court yet.';

            const text = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ ✨ 🪐 𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫 𝖫𝖤𝖠𝖣𝖤𝖱𝖡𝖮𝖠𝖱𝖣 🪐 ✨\n┗━━━━━━━━━━━━━━━━━━┛\n\n📌 *𝖳𝗈𝗍𝖺𝗅 𝖱𝖾𝖺𝗅𝗆 𝖲𝗍𝗋𝗂𝗄𝖾𝗌:* ${total}\n\n🔱 *𝖳𝖮𝖯 𝖣𝖮𝖬𝖨𝖭𝖠𝖭𝖳 𝖶𝖠𝖱𝖱𝖨𝖮𝖱𝖲:*\n${topText}\n┗━━━━━━━━━━━━━━━━━┛\n\n👉 _Want to see your personal standing? Type_ \`.myactivity\``;

            await sock.sendMessage(from, {
                text,
                mentions: sortedUsers.map(u => u[0])
            }, { quoted: msg });

        } catch (err) {
            console.error('[groupstats cmd] error:', err);
            extra.reply('💥 System alert: Failed compilation map for active ranking matrix.');
        }
    }
};
