/* Persisted, authenticated, versioned lock for canonical packet snapshots. */
'use strict';
const { json, options, readBody, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
const { PROTECTED_PATHS, getPacketLock, lockPacket } = require('../lib/oracle');

module.exports = async function packetLock(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  try {
    if (req.method === 'GET') return json(200, { ok: true, lock: await getPacketLock(db) }, req);
    if (req.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
    const body = await readBody(req);
    if (!body || !body.packet) return json(400, { ok: false, error: 'PACKET_REQUIRED' }, req);
    if (body.protected_paths && JSON.stringify([...body.protected_paths].sort()) !== JSON.stringify([...PROTECTED_PATHS].sort()))
      return json(400, { ok: false, error: 'PROTECTED_PATHS_IMMUTABLE' }, req);
    const lock = await lockPacket(db, body.packet, body.expected_version || null);
    return json(200, { ok: true, version: lock.version, version_number: lock.version_number,
      protected_paths: lock.protected_paths, locked_at: lock.locked_at }, req);
  } catch (e) {
    if (e.code === 'PACKET_LOCK_VERSION_CONFLICT') return json(409, { ok: false, error: e.code, current_version: e.current_version }, req);
    if (e.code === 'INVALID_PACKET') return json(400, { ok: false, error: e.code }, req);
    return dbFailure(e, req);
  }
};

