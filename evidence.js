/* User-submitted evidence is stored as an unverified claim until verified. */
'use strict';
const crypto = require('node:crypto');
const { json, options, readBody, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
module.exports = async function evidence(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  try {
    if (req.method === 'GET') {
      const items = Object.values(await db.listDocs('evidence')).sort((a,b) => String(b.timestamp).localeCompare(String(a.timestamp)));
      return json(200, { ok: true, items }, req);
    }
    if (req.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
    const body = await readBody(req);
    if (!body || typeof body.label !== 'string' || !body.label.trim()) return json(400, { ok: false, error: 'LABEL_REQUIRED' }, req);
    const id = crypto.randomUUID();
    const claim = { evidence_id: id, timestamp: new Date().toISOString(), label: body.label.trim().slice(0,240),
      reference: typeof body.reference === 'string' ? body.reference.trim().slice(0,1000) : null,
      verified: false, status: 'unverified_user_claim' };
    await db.putDoc('evidence', id, claim);
    return json(201, { ok: true, item: claim }, req);
  } catch (e) { return dbFailure(e, req); }
};

