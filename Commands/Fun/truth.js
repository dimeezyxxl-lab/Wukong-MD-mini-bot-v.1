/**
 * Truth - Get a random truth question
 * Styled with True Wukong Monkey King Personality 🐒⚡⚖️
 */

const { truth } = require('@bochilteam/scraper');
const { translate } = require('@vitalets/google-translate-api');

module.exports = {
  name: 'truth',
  aliases: ['honesty', 'trial', 'reveal'],
  category: 'fun',
  description: 'Submit yourself to a Trial of Honesty',
  usage: '.truth',
  execute: async (sock, msg, args, extra) => {
    try {
      await extra.reply('⏳ *Wukong is searching the scrolls for a question to test your spirit...*');
      
      const question = await truth();
      const res = await translate(question, { to: 'en' });
      
      const response = `┏⚡━━━━━━━━━━━━━━━━━━┓\n┃ 🔱  𝖳𝖱𝖨𝖠𝖫  𝖮𝖥  𝖧𝖮𝖭𝖤𝖲𝖳𝖸  🔱\n┗━━━━━━━━━━━━━━━━━━┛\n\n` +
                       `🐒 *Wukong Demands:* \n_"${res.text}"_\n\n` +
                       `⚖️ *Speak the truth, or be exposed as a trickster!*`;
        
      await extra.reply(response);
      
    } catch (error) {
      console.error('Truth Error:', error);
      await extra.reply('💥 *Chaos in Heaven:* The scrolls of truth are illegible! Even the wisest sage cannot decipher this.');
    }
  }
};
