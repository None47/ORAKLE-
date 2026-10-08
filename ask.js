/* AI reasoning consumes the live packet in the request; saved snapshots never substitute for it. */
'use strict';
const { json, options, readBody, dbFailure } = require('../lib/http');
const { authorized } = require('../lib/auth');
const { askWithPacket, isConfigured } = require('../lib/ai');

module.exports = async function ask(req) {
  if (req.method === 'OPTIONS') return options(req);
  if (!authorized(req)) return json(401, { ok: false, error: 'UNAUTHORIZED' }, req);
  if (req.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' }, req);
  const body = await readBody(req);
  const question = body && typeof body.question === 'string' ? body.question.trim() : '';
  if (!question || question.length > 500) return json(400, { ok: false, error: 'QUESTION_REQUIRED_OR_TOO_LONG' }, req);
  if (!body.packet || !body.version) return json(409, { ok: false, error: 'FRESH_LIVE_PACKET_REQUIRED' }, req);
  if (!isConfigured()) return json(503, { ok: false, error: 'AI_NOT_CONFIGURED' }, req);
  try {
    const result = await askWithPacket(question, body.packet, body.version);
    return json(200, result, req);
  } catch (e) {
    if (['PACKET_NOT_LOCKED','PACKET_MUTATION_AFTER_LOCK','LIVE_PACKET_STALE'].includes(e.code))
      return json(409, { ok: false, error: e.code }, req);
    if (e.code === 'AI_NOT_CONFIGURED') return json(503, { ok: false, error: e.code }, req);
    if (e.code === 'AI_PROVIDER_FAILURE') return json(502, { ok: false, error: e.code }, req);
    return dbFailure(e, req);
  }
};

