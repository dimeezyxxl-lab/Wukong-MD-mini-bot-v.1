/**
 * Wukong-MD: The Celestial Purifier
 * Architected by XyzTech 🐒⚡
 * Maintains balance by removing temporary debris.
 */

const fs = require('fs');
const path = require('path');
const { getTempDir } = require('./tempManager');
const config = require('../config');

// Divine intervals
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
const FILE_AGE_THRESHOLD_MS = 30 * 60 * 1000;
const SESSION_DIR_NAME = config.sessionName || 'session';

/**
 * Sweeps away the temporary dust of the mortal realm.
 */
function cleanupOldFiles() {
  try {
    const tempDir = getTempDir();
    if (!fs.existsSync(tempDir)) return;
    
    const now = Date.now();
    let deletedCount = 0;
    let totalSizeFreed = 0;
    
    const files = fs.readdirSync(tempDir);
    
    for (const file of files) {
      const filePath = path.join(tempDir, file);
      try {
        const stats = fs.statSync(filePath);
        
        // Never disturb the sacred Session Directory
        if (stats.isDirectory()) continue;
        
        if (now - stats.mtimeMs > FILE_AGE_THRESHOLD_MS) {
          totalSizeFreed += stats.size;
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      } catch (error) {
        // Silently ignore files currently held by the system
      }
    }
    
    if (deletedCount > 0) {
      const sizeMB = (totalSizeFreed / (1024 * 1024)).toFixed(2);
      console.log(`🐒 [Wukong-MD]: Purified ${deletedCount} files, restoring ${sizeMB} MB of harmony.`);
    }
  } catch (error) {
    console.error('💥 [Wukong-MD]: The Purifier encountered chaos:', error.message);
  }
}

function startCleanup() {
  console.log('🐒 [Wukong-MD]: The Celestial Purifier is now active.');
  cleanupOldFiles();
  
  cleanupInterval = setInterval(cleanupOldFiles, CLEANUP_INTERVAL_MS);
}

// ... [Keep your stopCleanup and Process Handlers the same] ...
