/* Append a decision event; recommendation records are immutable. */
'use strict';
const crypto = require('node:crypto');
const { json, options, readBody, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
module.exports = async function decision(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  const body = await readBody(req);
  if (!body || typeof body.recommendation_id !== 'string' || !['accepted','rejected','dismissed'].includes(body.action))
    return json(400, { ok: false, error: 'INVALID_DECISION_EVENT' }, req);
  try {
    const recommendation = await db.getDoc('ai_recommendations', body.recommendation_id);
    if (!recommendation) return json(404, { ok: false, error: 'RECOMMENDATION_NOT_FOUND' }, req);
    if (body.action === 'accepted' && recommendation.final_verdict !== 'ACCEPT')
      return json(409, { ok: false, error: 'ONLY_ACCEPTED_VERDICTS_CAN_BE_APPLIED' }, req);
    const id = crypto.randomUUID();
    await db.putDoc('decision_events', id, { id, timestamp: new Date().toISOString(),
      decision_id: body.recommendation_id, event: body.action, detail: { note: String(body.note || '').slice(0, 500) } });
    return json(200, { ok: true, event_id: id }, req);
  } catch (e) { return dbFailure(e, req); }
};

