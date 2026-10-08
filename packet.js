/* Version-checked canonical packet snapshots. */
'use strict';
const { json, options, readBody, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
const { packetSanity, packetHash, verifyLockedPacket, isValidPacket } = require('../lib/oracle');

module.exports = async function packet(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  try {
    if (req.method === 'GET') {
      const latest = await db.getDoc('packets', 'latest');
      return json(200, latest
        ? { ok: true, ...latest, sanity: packetSanity(latest.packet) }
        : { ok: true, packet: null, version: null, sanity: [] }, req);
    }
    if (req.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
    const body = await readBody(req);
    const packet = body && body.packet;
    if (!isValidPacket(packet)) return json(400, { ok: false, error: 'INVALID_PACKET', sanity: packetSanity(packet) }, req);
    const locked = await verifyLockedPacket(db, packet, body.version);
    if (!locked.ok) return json(409, { ok: false, error: locked.error, current_version: locked.current_version || null }, req);
    const hash = packetHash(packet);
    const record = { packet, version: body.version, hash, reason: String(body.reason || 'capture').slice(0, 80),
      received_at: Date.now(), revision: await db.bumpRevision() };
    await db.putDoc('packet_history', hash, record);
    await db.putDoc('packets', 'latest', record);
    await db.putDoc('oracle_state', 'main', { packet, version: body.version, updated_at: record.received_at });
    return json(200, { ok: true, version: body.version, hash, revision: record.revision,
      received_at: record.received_at, sanity: packetSanity(packet) }, req);
  } catch (e) { return dbFailure(e, req); }
};

