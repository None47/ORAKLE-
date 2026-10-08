/* POST /api/state-sync — authenticated mirror writes; original browser state stays authoritative. */
'use strict';
const { json, options, readBody, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
module.exports = async function stateSync(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  const body = await readBody(req);
  if (!body || !Array.isArray(body.keys)) return json(400, { ok: false, error: 'KEYS_REQUIRED' }, req);
  let updated = 0, deleted = 0;
  try {
    for (const item of body.keys) {
      if (!item || typeof item.k !== 'string' || item.k.length > 250 || item.k.startsWith('__orb')) continue;
      const before = await db.getDoc('kv', item.k);
      if (item.v == null) {
        if (before) { await db.delDoc('kv', item.k); deleted++; }
      } else if (typeof item.v === 'string') {
        if (!before || before.value !== item.v) {
          await db.putDoc('kv', item.k, { value: item.v, updated_at: new Date().toISOString() }); updated++;
        }
      }
    }
    const rev = (updated || deleted) ? await db.bumpRevision() : await db.revision();
    return json(200, { ok: true, revision: rev, updated, deleted }, req);
  } catch (e) { return dbFailure(e, req); }
};

