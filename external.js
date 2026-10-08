/* No live intelligence provider is configured; never synthesize signals. */
'use strict';
const { json, options, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
module.exports = async function external(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'GET') return json(503, { ok: false, status: 'unavailable', error: 'EXTERNAL_PROVIDER_NOT_CONNECTED' }, req);
  try {
    const rows = Object.values(await db.listDocs('external_intelligence'))
      .filter(x => x && x.verified === true)
      .sort((a,b) => String(b.retrieved_at).localeCompare(String(a.retrieved_at)));
    return json(200, { ok: true, status: rows.length ? 'connected' : 'unavailable', signals: rows, captured_at: null }, req);
  } catch (e) { return dbFailure(e, req); }
};

