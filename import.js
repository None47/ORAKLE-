/* Authenticated import with a pre-import snapshot; no unauthenticated restore. */
'use strict';
const { json, options, readBody, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
const COLLECTIONS = ['kv','packets','packet_history','packet_lock','ai_recommendations','decision_events','evidence','external_intelligence','snapshots','meta','oracle_state'];
module.exports = async function importApi(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  const body = await readBody(req);
  if (!body || body.format !== 'oracle-full-export-v1' || !body.data || typeof body.data !== 'object')
    return json(400, { ok: false, error: 'INVALID_IMPORT_FORMAT' }, req);
  try {
    const snapshot = {};
    for (const name of COLLECTIONS) snapshot[name] = await db.listDocs(name);
    await db.putDoc('snapshots', 'pre-import-' + Date.now(), { timestamp: new Date().toISOString(), data: snapshot });
    let restored = 0;
    for (const name of COLLECTIONS) {
      const rows = body.data[name];
      if (!rows || typeof rows !== 'object' || Array.isArray(rows)) continue;
      for (const [id, value] of Object.entries(rows)) {
        await db.putDoc(name, id, value);
        restored++;
      }
    }
    await db.bumpRevision();
    return json(200, { ok: true, restored }, req);
  } catch (e) { return dbFailure(e, req); }
};

