/**
 * AI Chat Command - ChatGPT-style responses
 * Styled with True Wukong Monkey King Personality 🐒⚡📜
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'ai',
  aliases: ['gpt', 'chatgpt', 'ask', 'oracle', 'divine'],
  category: 'ai',
  description: 'Consult the Celestial All-Knowing Archive for wisdom',
  usage: '.ai <question>',
  
  async execute(sock, msg, args, extra) {
    try {
      if (args.length === 0) {
        return extra.reply('🪵 *Wukong Scratches Head:* My archives are vast, but I cannot read your mind! Ask a question so I can consult the scrolls.\n\n👉 *𝖤𝗑𝖺𝗆𝗉𝗅𝖾:* .ai Why is the sky blue?');
      }
      
      const question = args.join(' ');
      
      // Sending an immediate "thinking" message creates immersion
      await extra.reply('⏳ *Consulting the Infinite Archive...*');
      
      const response = await APIs.chatAI(question);
      
      // Extract the wisdom
      const answer = response.response || response.msg || response.data?.msg || response;
      
      // Present the oracle response
      await extra.reply(`📜 *Celestial Wisdom:*\n\n${answer}`);
      
    } catch (error) {
      console.error('[AI Command Error]:', error);
      await extra.reply('💥 *Chaos in Heaven:* The connection to the Infinite Archive has been severed by a demonic storm! Try again once the clouds clear.');
    }
  }
};
