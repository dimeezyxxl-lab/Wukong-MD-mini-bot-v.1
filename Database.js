/**
 * Wukong-MD: The Celestial Ledger (Database)
 * Managed by XyzTech 🐒⚡
 */

const fs = require('fs');
const path = require('path');
const config = require('./config');

const DB_PATH = path.join(__dirname, 'database');
// ... [Keep your DB constants the same] ...

// Improved writeDB to prevent corruption
const writeDB = (filePath, data) => {
  try {
    const tempPath = filePath + '.tmp';
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2));
    fs.renameSync(tempPath, filePath); // Atomic operation
    return true;
  } catch (error) {
    console.error(`💥 The Celestial Ledger failed to update: ${error.message}`);
    return false;
  }
};

// ... [Keep the rest of your functions identical] ...
