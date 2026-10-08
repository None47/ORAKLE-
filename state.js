/* GET /api/state — authenticated localStorage mirror status. */
'use strict';
const { json, options, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
module.exports = async function state(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'GET') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  try {
    const rows = await db.listDocs('kv');
    return json(200, { ok: true, keys: rows, revision: await db.revision() }, req);
  } catch (e) { return dbFailure(e, req); }
};

