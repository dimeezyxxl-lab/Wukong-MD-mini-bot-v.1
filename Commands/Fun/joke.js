/**
 * Joke Command - Send random jokes
 * Styled with True Wukong Monkey King Personality 🐒⚡😂
 */

const APIs = require('../../utils/api');

module.exports = {
  name: 'joke',
  aliases: ['jokes', 'humor', 'jest'],
  category: 'fun',
  description: 'Hear a jester’s tale from the Great Sage',
  usage: '.joke',
  
  async execute(sock, msg, args, extra) {
    try {
      await extra.reply('⏳ *Wukong is digging into his bag of celestial jests...*');
      
      const joke = await APIs.getJoke();
      
      const setup = joke.setup || joke.question || 'Why did the mortal cross the mountain?';
      const punchline = joke.punchline || joke.answer || 'To escape my Golden Staff!';
      
      let text = `🐒 *Wukong shares a Court Jest:*\n\n`;
      text += `📜 _"${setup}"_\n\n`;
      text += `💥 *Punchline:* "${punchline}"`;
      
      await extra.reply(text);
      
    } catch (error) {
      console.error('[Joke Error]:', error);
      await extra.reply('💥 *Chaos in Heaven:* My jester’s scrolls are tangled! Even I can’t find a laugh in this mess.');
    }
  }
};
