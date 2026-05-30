/**
 * Calculator Command - The Divine Abacus
 * Styled with True Wukong Monkey King Personality 🐒⚡🧮
 */

module.exports = {
    name: 'calc',
    aliases: ['calculate', 'math', 'abacus'],
    category: 'utility',
    description: 'Use the Divine Abacus to solve mortal math',
    usage: '.calc <expression>',
    
    async execute(sock, msg, args, extra) {
      try {
        if (args.length === 0) {
          return extra.reply('🪵 *Wukong scratches his head:* You need to give me numbers to crunch, mortal! Use it like this: `.calc 5 + 5`');
        }
        
        const expression = args.join(' ');
        
        // Basic safety check
        if (!/^[0-9+\-*/(). ]+$/.test(expression)) {
          return extra.reply('💥 *Wukong swats the air:* Those aren\'t numbers! I only know how to calculate with math symbols (+, -, *, /, parentheses).');
        }
        
        try {
          // Note: Using eval is standard for simple bot calculators, 
          // though ensure your bot environment is secure.
          const result = eval(expression);
          
          let text = `🐒 *The Divine Abacus has spoken!*\n\n`;
          text += `✨ *Calculation:* \`${expression}\`\n`;
          text += `🔱 *Result:* \`${result}\`\n\n`;
          text += `_Not that it matters—the Great Sage lives forever!_`;
          
          await extra.reply(text);
        } catch (evalError) {
          await extra.reply('🌀 *Chaos in the Heavens:* That equation is broken. Even the Heavenly scribes couldn\'t solve that one!');
        }
        
      } catch (error) {
        await extra.reply(`❌ *A mishap in the clouds:* ${error.message}`);
      }
    }
  };
