/**
 * GitHub Command - Show bot GitHub repository and stats
 * Styled with True Wukong Monkey King Personality 🐒📜
 */

const axios = require('axios');
const config = require('../../config');

module.exports = {
    name: 'github',
    aliases: ['repo', 'git', 'source', 'sc', 'script', 'scroll', 'origins'],
    category: 'general',
    description: 'Show the celestial source code scroll and repository stats',
    usage: '.github',
    ownerOnly: false,

    async execute(sock, msg, args, extra) {
        try {
            const chatId = extra.from;
            
            // Your Personal GitHub Repository configurations linked below
            const repoUrl = 'https://github.com/Dimeezyxxl-lab/KnightBot-Mini';
            const apiUrl = 'https://api.github.com/repos/Dimeezyxxl-lab/KnightBot-Mini';
            
            // Send loading message wrapped in flavor text
            const loadingMsg = await extra.reply('🪐 *Summoning the clouds...* Reaching into the celestial library to pull the source code scroll...');
            
            try {
                // Fetch repository data from GitHub API
                const response = await axios.get(apiUrl, {
                    headers: {
                        'User-Agent': 'Dimeezyxxl-Mini'
                    }
                });
                
                const repo = response.data;
                
                // Pure Wukong premium layout
                let message = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫 𝖠𝖱𝖳𝖨𝖥𝖠𝖢𝖳 𝖲𝖢𝖱𝖮𝖫𝖫 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
                message += `🐒 *𝖡𝗈𝗍 𝖭𝖺𝗆𝖾:* ${config.botName || 'Wukong Bot Mini'}\n`;
                message += `📜 *𝖲𝖼𝗋𝗈𝗅𝗅 𝖭𝖺𝗆𝖾:* ${repo.name}\n`;
                message += `👑 *𝖢𝗅𝖺𝗇 𝖫𝖾𝖺𝖽𝖾𝗋:* ${repo.owner.login}\n`;
                message += `📝 *𝖯𝗎𝗋𝗉𝗈𝗌𝖾:* ${repo.description || 'No description provided'}\n`;
                message += `🌐 *𝖫𝖨𝖭𝖪:* ${repo.html_url}\n\n`;
                
                message += `🔱 *𝖲𝖢𝖱𝖮𝖫𝖫 𝖬𝖠𝖭𝖨𝖥𝖤𝖲𝖳 (𝖲𝖳STA)\n`;
                message += `⭐ *𝖲𝗉𝗂𝗋𝗂𝗍𝗎𝖺𝗅 𝖲𝗍𝖺𝗋𝗌:* ${repo.stargazers_count.toLocaleString()}\n`;
                message += `🍴 *𝖢𝖫𝗈𝗇𝖾𝖽 𝖥𝗈𝗋𝗄𝗌:* ${repo.forks_count.toLocaleString()}\n`;
                message += `👁️ *𝖦𝗎𝖺𝗋finish𝗌 (𝖶𝖺𝗍𝖼𝗁𝖾𝗋𝗌):* ${repo.watchers_count.toLocaleString()}\n`;
                message += `📦 *𝖠𝗋𝗍𝗂𝖿𝖺𝖢𝖳 𝖶𝖾finish𝗁𝗍:* ${(repo.size / 1024).toFixed(2)} MB\n\n`;
                
                message += `✨ *𝖰𝖴𝖨𝖢𝖪 𝖢𝖧𝖠𝖭𝖳𝖲*\n`;
                message += `⭐ Leave a Star: ${repo.html_url}/stargazers\n`;
                message += `🍴 Forge a Fork: ${repo.html_url}/fork\n`;
                message += `📥 Plunder Code: \`git clone ${repo.clone_url}\`\n\n`;
                
                message += `┗━━━━━━━━━━━━━━━━━┛\n\n`;
                message += `> _Bound by the ultimate power of ${config.botName || 'Wukong Bot Mini'}_ 💨`;
                
                // Edit the loading message with the beautiful data block
                await sock.sendMessage(chatId, {
                    text: message,
                    edit: loadingMsg.key
                });
                
            } catch (apiError) {
                // Fallback message if API fails
                console.error('GitHub API Error:', apiError.message);
                
                let fallbackMessage = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱 𝖢𝖤𝖫𝖤𝖲𝖳𝖨𝖠𝖫 𝖠𝖱𝖳𝖨𝖥𝖠𝖢𝖳 𝖲𝖢𝖱𝖮𝖫𝖫 🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n`;
                fallbackMessage += `🐒 *𝖡𝗈𝗍 𝖭𝖺𝗆𝖾:* ${config.botName || 'Wukong Bot Mini'}\n`;
                fallbackMessage += `📜 *𝖲𝖼𝗋𝗈𝗅𝗅:* KnightBot-Mini\n`;
                fallbackMessage += `👑 *𝖮𝖶𝗇𝖾𝗋:* Dimeezyxxl-lab\n`;
                fallbackMessage += `🌐 *𝖴𝖱𝖫:* ${repoUrl}\n\n`;
                fallbackMessage += `⚠️ *Note:* The celestial networks are fluctuating. Live repository stats are hidden behind a cloud barrier. Visit the scroll manually!\n\n`;
                fallbackMessage += `┗━━━━━━━━━━━━━━━━━┛\n\n`;
                fallbackMessage += `> _Bound by the ultimate power of ${config.botName || 'Wukong Bot Mini'}_ 💨`;
                
                await sock.sendMessage(chatId, {
                    text: fallbackMessage,
                    edit: loadingMsg.key
                });
            }
            
        } catch (error) {
            console.error('GitHub command error:', error);
            await extra.reply(`💥 *Chaos in Heaven:* Failed to open the scroll coordinates: ${error.message}`);
        }
    }
};
