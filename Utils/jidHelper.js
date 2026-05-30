/**
 * Wukong-MD: The Celestial Identity Navigator
 * Architected by XyzTech 🐒⚡
 * Bridging the gap between mortal Phone Numbers and LIDs.
 */

const { jidDecode, jidEncode } = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// Celestial cache to maintain balance
const lidMappingCache = new Map();

/**
 * Retrieves the mapping from the sacred archives.
 */
const getLidMappingValue = (user, direction) => {
  if (!user) return null;
  const cacheKey = `${direction}:${user}`;
  if (lidMappingCache.has(cacheKey)) return lidMappingCache.get(cacheKey);
  
  const sessionPath = path.join(__dirname, '..', config.sessionName || 'session');
  const suffix = direction === 'pnToLid' ? '.json' : '_reverse.json';
  const filePath = path.join(sessionPath, `lid-mapping-${user}${suffix}`);
  
  if (!fs.existsSync(filePath)) {
    lidMappingCache.set(cacheKey, null);
    return null;
  }
  
  try {
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    const value = raw ? JSON.parse(raw) : null;
    lidMappingCache.set(cacheKey, value || null);
    return value || null;
  } catch (error) {
    console.error(`💥 [Wukong-MD]: Could not decipher identity mapping: ${error.message}`);
    lidMappingCache.set(cacheKey, null);
    return null;
  }
};

/**
 * Normalizes JID identities to a singular truth.
 */
const normalizeJidWithLid = (jid) => {
  if (!jid) return jid;
  try {
    const decoded = jidDecode(jid);
    if (!decoded?.user) return `${jid.split(':')[0].split('@')[0]}@s.whatsapp.net`;
    
    let user = decoded.user;
    let server = decoded.server === 'c.us' ? 's.whatsapp.net' : decoded.server;
    
    const mapToPn = () => {
      const pnUser = getLidMappingValue(user, 'lidToPn');
      if (pnUser) {
        user = pnUser;
        server = server === 'hosted.lid' ? 'hosted' : 's.whatsapp.net';
        return true;
      }
      return false;
    };
    
    if (['lid', 'hosted.lid', 's.whatsapp.net', 'hosted'].includes(server)) mapToPn();
    
    return jidEncode(user, server === 'hosted' ? 'hosted' : 's.whatsapp.net');
  } catch {
    return jid;
  }
};

/**
 * Constructs comparable variants of an identity for matching.
 */
const buildComparableIds = (jid) => {
  if (!jid) return [];
  try {
    const decoded = jidDecode(jid);
    if (!decoded?.user) return [normalizeJidWithLid(jid)].filter(Boolean);
    
    const variants = new Set();
    const normalizedServer = decoded.server === 'c.us' ? 's.whatsapp.net' : decoded.server;
    variants.add(jidEncode(decoded.user, normalizedServer));
    
    const isPnServer = ['s.whatsapp.net', 'hosted'].includes(normalizedServer);
    const isLidServer = ['lid', 'hosted.lid'].includes(normalizedServer);
    
    if (isPnServer) {
      const lidUser = getLidMappingValue(decoded.user, 'pnToLid');
      if (lidUser) variants.add(jidEncode(lidUser, normalizedServer === 'hosted' ? 'hosted.lid' : 'lid'));
    } else if (isLidServer) {
      const pnUser = getLidMappingValue(decoded.user, 'lidToPn');
      if (pnUser) variants.add(jidEncode(pnUser, normalizedServer === 'hosted.lid' ? 'hosted' : 's.whatsapp.net'));
    }
    
    return Array.from(variants);
  } catch {
    return [jid];
  }
};

/**
 * Locates a participant amidst the chaos of multiple identifiers.
 */
const findParticipant = (participants = [], userIds) => {
  const targets = (Array.isArray(userIds) ? userIds : [userIds])
    .filter(Boolean)
    .flatMap(id => buildComparableIds(id));
  
  if (!targets.length) return null;
  
  return participants.find(p => {
    if (!p) return false;
    const participantIds = [p.id, p.lid, p.userJid].filter(Boolean).flatMap(id => buildComparableIds(id));
    return participantIds.some(id => targets.includes(id));
  }) || null;
};

module.exports = { findParticipant, buildComparableIds, normalizeJidWithLid, getLidMappingValue };
