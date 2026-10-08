/* Authenticated data export. */
'use strict';
const { json, options, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
const COLLECTIONS = ['kv','packets','packet_history','packet_lock','ai_recommendations','decision_events','evidence','external_intelligence','snapshots','meta','oracle_state'];
module.exports = async function exportApi(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'GET') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  try {
    const data = {};
    for (const name of COLLECTIONS) data[name] = await db.listDocs(name);
    return json(200, { ok: true, format: 'oracle-full-export-v1', exported_at: new Date().toISOString(), data }, req);
  } catch (e) { return dbFailure(e, req); }
};

