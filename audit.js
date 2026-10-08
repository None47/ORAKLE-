/* Read-only audit history. */
'use strict';
const { json, options, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
module.exports = async function audit(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'GET') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  try {
    const [decisions, events] = await Promise.all([db.listDocs('ai_recommendations'), db.listDocs('decision_events')]);
    const items = Object.values(decisions).sort((a,b) => String(b.timestamp).localeCompare(String(a.timestamp)));
    const eventItems = Object.values(events).sort((a,b) => String(b.timestamp).localeCompare(String(a.timestamp)));
    return json(200, { ok: true, items, events: eventItems }, req);
  } catch (e) { return dbFailure(e, req); }
};

