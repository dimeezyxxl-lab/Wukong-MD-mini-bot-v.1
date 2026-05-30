/**
 * Wukong-MD: Celestial Auto-React Manager
 * Architected by XyzTech 🐒⚡
 * Controls the bot's subtle reactions to the mortal world.
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../config.js');

function load() {
    try {
        // Clearing the path for the Great Sage's insight
        delete require.cache[require.resolve('../config.js')];
        const config = require('../config.js');
        
        return {
            enabled: config.autoReact || false,
            mode: config.autoReactMode || 'bot'
        };
    } catch (err) {
        console.error('💥 [Wukong-MD]: Failed to read the sacred config:', err.message);
        return {
            enabled: false,
            mode: 'bot'
        };
    }
}

function save(data) {
    try {
        const configContent = fs.readFileSync(CONFIG_PATH, 'utf8');
        let updatedContent = configContent;
        
        // Update the autoReact state
        updatedContent = updatedContent.replace(
            /autoReact:\s*(true|false)/,
            `autoReact: ${data.enabled}`
        );
        
        // Refine or initialize the reaction mode
        if (configContent.includes('autoReactMode:')) {
            updatedContent = updatedContent.replace(
                /autoReactMode:\s*['"]\w+['"]/,
                `autoReactMode: '${data.mode}'`
            );
        } else {
            updatedContent = updatedContent.replace(
                /(autoReact:\s*(?:true|false),?)/,
                `$1\n    autoReactMode: '${data.mode}',`
            );
        }
        
        fs.writeFileSync(CONFIG_PATH, updatedContent, 'utf8');
        
        // Purge the cache to reflect the new reality
        delete require.cache[require.resolve('../config.js')];
        console.log(`🐒 [Wukong-MD]: The celestial settings have been updated by XyzTech.`);
    } catch (err) {
        console.error('💥 [Wukong-MD]: The attempt to rewrite the scroll failed:', err.message);
    }
}

module.exports = { load, save };
