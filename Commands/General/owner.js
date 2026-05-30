/**
 * Owner Command - Sends bot owner's contact card (vCard)
 * Styled with Wukong Personality ⚡
 */

const config = require('../../config');

module.exports = {
    name: 'owner',
    aliases: ['creator', 'dev', 'botowner'],
    category: 'general',
    description: 'Show bot owner contact information',
    usage: '.owner',
    ownerOnly: false,

    async execute(sock, msg, args, extra) {
        try {
            const chatId = extra.from;

            // Owner numbers array -> convert each to a vCard dynamically
            const ownerNames = Array.isArray(config.ownerName) ? config.ownerName : [config.ownerName];
            const vCards = config.ownerNumber.map((num, index) => {
                const name = ownerNames[index] || ownerNames[0] || 'Bot Owner';
                return {
                    vcard: `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;waid=${num}:${num}
END:VCARD
                    `.trim()
                };
            });

            const displayName = ownerNames[0] || config.ownerName || 'Bot Owner';

            // Send contact card attachment
            await sock.sendMessage(chatId, {
                contacts: {
                    displayName: displayName,
                    contacts: vCards
                }
            });

            // Themed Wukong reply
            await extra.reply(`🔱 *💥 𝖶𝖴𝖪𝖮𝖭𝖦 𝖱𝖤𝖠𝖫𝖬 𝖫𝖤𝖠𝖣𝖤𝖱!* 💥\n\n👑 Above is the official contact card for my *Creator/Owner*. Respect the power! ✨`);

        } catch (error) {
            console.error('Owner command error:', error);
            await extra.reply(`💥 System alert: Failed to summon owner contact information. ${error.message}`);
        }
    }
};
