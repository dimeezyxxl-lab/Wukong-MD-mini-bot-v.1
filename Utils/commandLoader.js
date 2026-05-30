/**
 * Wukong-MD: The Celestial Gatekeeper
 * Architected by XyzTech 🐒⚡
 * Harmonizing all available commands for the Great Sage.
 */

const fs = require('fs');
const path = require('path');

const loadCommands = () => {
  const commands = new Map();
  const commandsPath = path.join(__dirname, '..', 'commands');
  
  if (!fs.existsSync(commandsPath)) {
    console.warn('🐒 [Wukong-MD]: The command repository is empty!');
    return commands;
  }
  
  const categories = fs.readdirSync(commandsPath);
  
  categories.forEach(category => {
    const categoryPath = path.join(commandsPath, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
      
      files.forEach(file => {
        try {
          const command = require(path.join(categoryPath, file));
          if (command.name) {
            commands.set(command.name, command);
            if (command.aliases) {
              command.aliases.forEach(alias => {
                commands.set(alias, command);
              });
            }
          }
        } catch (error) {
          console.error(`💥 [Wukong-MD]: Error loading command [${file}]:`, error.message);
        }
      });
    }
  });
  
  console.log(`🐒 [Wukong-MD]: All commands have been successfully cataloged by XyzTech.`);
  return commands;
};

module.exports = { loadCommands };
