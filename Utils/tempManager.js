/**
 * Wukong-MD: The Celestial Repository
 * Architected by XyzTech 🐒⚡
 * Managing the lifecycle of temporary artifacts within the digital heavens.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();
const TEMP_DIR = path.join(PROJECT_ROOT, 'temp');

/**
 * Invokes the manifestation of the Celestial Repository.
 */
function initializeTempSystem() {
  const tempDirAbsolute = path.resolve(TEMP_DIR);
  
  // Imprinting the environment to favor our sacred repository
  process.env.TMPDIR = tempDirAbsolute;
  process.env.TMP = tempDirAbsolute;
  process.env.TEMP = tempDirAbsolute;
  
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    console.log('🐒 [Wukong-MD]: The Celestial Repository has been manifested.');
  }
  
  return TEMP_DIR;
}

/**
 * Access the path to the Celestial Repository.
 */
function getTempDir() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
  return TEMP_DIR;
}

/**
 * Forge a path for a temporary artifact.
 */
function createTempFilePath(prefix = 'temp', extension = 'tmp') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2);
  return path.join(getTempDir(), `${prefix}_${timestamp}_${random}.${extension}`);
}

/**
 * Purge a specific artifact from the Repository.
 */
function deleteTempFile(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) {
      const resolvedPath = path.resolve(filePath);
      const tempDirResolved = path.resolve(TEMP_DIR);
      
      if (resolvedPath.startsWith(tempDirResolved)) {
        fs.unlinkSync(filePath);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error(`💥 [Wukong-MD]: The Repository failed to purge an artifact: ${error.message}`);
    return false;
  }
}

/**
 * Purge multiple artifacts from the Repository.
 */
function deleteTempFiles(filePaths) {
  if (!Array.isArray(filePaths)) return;
  filePaths.forEach(deleteTempFile);
}

module.exports = {
  initializeTempSystem,
  getTempDir,
  createTempFilePath,
  deleteTempFile,
  deleteTempFiles,
  TEMP_DIR
};
