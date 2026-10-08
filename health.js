/* Authenticated health check. A production DB is mandatory. */
'use strict';
const { json, options, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const db = require('../lib/db');
const ai = require('../lib/ai');
module.exports = async function health(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'GET') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  try {
    await db.getDoc('meta', 'health');
    return json(200, { ok: true, runtime: 'vercel-serverless', storage: db.engineInfo(),
      ai: { connected: ai.isConfigured(), model: ai.configInfo().model, mock: ai.configInfo().mock },
      version: '5.0.0' }, req);
  } catch (e) { return dbFailure(e, req); }
};

