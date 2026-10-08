/* Append an application event without editing the immutable recommendation. */
'use strict';
const crypto = require('node:crypto');
const { json, options, readBody, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
module.exports = async function auditApplied(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  const body = await readBody(req);
  if (!body || typeof body.recommendation_id !== 'string') return json(400, { ok: false, error: 'RECOMMENDATION_ID_REQUIRED' }, req);
  try {
    const row = await db.getDoc('ai_recommendations', body.recommendation_id);
    if (!row) return json(404, { ok: false, error: 'RECOMMENDATION_NOT_FOUND' }, req);
    if (row.final_verdict !== 'ACCEPT') return json(409, { ok: false, error: 'ONLY_ACCEPTED_VERDICTS_CAN_BE_APPLIED' }, req);
    const id = crypto.randomUUID();
    await db.putDoc('decision_events', id, { id, timestamp: new Date().toISOString(),
      decision_id: body.recommendation_id, event: 'applied',
      detail: { action: String(body.action || row.final_recommendation.primary_action).slice(0, 500) } });
    return json(200, { ok: true, event_id: id }, req);
  } catch (e) { return dbFailure(e, req); }
};

