/* Packet integrity helpers. This module verifies snapshots; it never projects state. */
'use strict';
const crypto = require('node:crypto');
const PROTECTED_PATHS = Object.freeze([
  'schema', 'source.type', 'campaign', 'gate', 'mission', 'next_mission', 'constraints'
]);
function stable(value, path = '') {
  if (Array.isArray(value)) return '[' + value.map((item, i) => stable(item, path + '[' + i + ']')).join(',') + ']';
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).filter(k => path !== 'source' || k !== 'generated_at').sort();
    return '{' + keys.map(k => JSON.stringify(k) + ':' + stable(value[k], path ? path + '.' + k : k)).join(',') + '}';
  }
  return JSON.stringify(value);
}
function packetHash(packet) {
  return crypto.createHash('sha256').update(stable(packet)).digest('hex');
}
function packetSanity(packet) {
  const issues = [];
  if (!packet || typeof packet !== 'object' || Array.isArray(packet)) return [{ check: 'shape', status: 'FAIL' }];
  if (packet.schema !== 'oracle.state.v1') issues.push({ check: 'schema', status: 'FAIL' });
  if (!packet.source || packet.source.type !== 'live-original-oracle') issues.push({ check: 'source', status: 'FAIL' });
  if (!packet.campaign || !packet.campaign.date || !packet.campaign.start_date) issues.push({ check: 'campaign', status: 'NEED_INFO' });
  if (!packet.mission || !Array.isArray(packet.mission.all_tasks)) issues.push({ check: 'mission_tasks', status: 'NEED_INFO' });
  return issues.length ? issues : [
    { check: 'shape', status: 'PASS' },
    { check: 'canonical_source', status: 'PASS' },
    { check: 'tasks_present', status: 'PASS' }
  ];
}
function isValidPacket(packet) {
  return packetSanity(packet).every(x => x.status === 'PASS');
}
async function getPacketLock(db) { return db.getDoc('packet_lock', 'main'); }
async function lockPacket(db, packet, expectedVersion) {
  if (!isValidPacket(packet)) {
    const error = new Error('INVALID_PACKET');
    error.code = 'INVALID_PACKET';
    throw error;
  }
  const current = await getPacketLock(db);
  const actualVersion = current ? current.version : null;
  if ((expectedVersion || null) !== actualVersion) {
    const error = new Error('PACKET_LOCK_VERSION_CONFLICT');
    error.code = 'PACKET_LOCK_VERSION_CONFLICT';
    error.current_version = actualVersion;
    throw error;
  }
  const hash = packetHash(packet);
  const lock = {
    version: hash, previous_version: actualVersion, version_number: current ? current.version_number + 1 : 1,
    protected_paths: PROTECTED_PATHS.slice(), packet_hash: hash, locked_at: Date.now()
  };
  await db.putDoc('packet_lock', 'main', lock);
  return lock;
}
async function verifyLockedPacket(db, packet, version) {
  const lock = await getPacketLock(db);
  if (!lock) return { ok: false, error: 'PACKET_NOT_LOCKED' };
  if (version !== lock.version || packetHash(packet) !== lock.packet_hash)
    return { ok: false, error: 'PACKET_MUTATION_AFTER_LOCK', current_version: lock.version };
  return { ok: true, lock };
}
module.exports = { PROTECTED_PATHS, stable, packetHash, packetSanity, isValidPacket, getPacketLock, lockPacket, verifyLockedPacket };
