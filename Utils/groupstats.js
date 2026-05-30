/**
 * Wukong-MD: The Celestial Stats Manager
 * Architected by XyzTech 🐒⚡
 * Recording the activity of the mortal realm within the groups.
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../database/groupStats.json');

/**
 * Reads the sacred scrolls of activity.
 */
function loadDB() {
    try {
        if (!fs.existsSync(DB_PATH)) return {};
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch (err) {
        return {};
    }
}

/**
 * Saves the progress of the mortal realm to the archives.
 */
function saveDB(data) {
    try {
        // Ensure the directory exists before archiving
        const dir = path.dirname(DB_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('💥 [Wukong-MD]: The archive could not be updated:', err.message);
    }
}

/**
 * Records a new activity entry in the group's history.
 */
function addMessage(groupId, senderId) {
    const db = loadDB();
    const today = new Date().toISOString().slice(0, 10);
    const hour = new Date().getHours().toString();

    if (!db[groupId]) db[groupId] = {};
    if (!db[groupId][today]) {
        db[groupId][today] = {
            total: 0,
            users: {},
            hours: {}
        };
    }

    const g = db[groupId][today];

    g.total++;
    g.users[senderId] = (g.users[senderId] || 0) + 1;
    g.hours[hour] = (g.hours[hour] || 0) + 1;

    saveDB(db);
}

/**
 * Retrieves the daily scroll for a specific group.
 */
function getStats(groupId) {
    const db = loadDB();
    const today = new Date().toISOString().slice(0, 10);

    if (!db[groupId] || !db[groupId][today]) return null;
    return db[groupId][today];
}

module.exports = { addMessage, getStats };
