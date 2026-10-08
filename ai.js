/* Provider boundary. Raw HTTP response text is retained before parsing. */
'use strict';
const crypto = require('node:crypto');
const { validateRecommendation } = require('./validator');
const { verifyLockedPacket } = require('./oracle');
const db = require('./db');

const API_KEY = process.env.ORACLE_AI_KEY || '';
const MODEL = process.env.ORACLE_AI_MODEL || '';
const BASE = (process.env.ORACLE_AI_BASE || 'https://api.openai.com/v1').replace(/\/+$/, '');
const MOCK = /^(1|true|yes)$/i.test(process.env.ORACLE_AI_MOCK || '');
let testProviderOverride = null;

function parseJSON(raw) {
  if (typeof raw !== 'string') return null;
  try { return JSON.parse(raw); } catch (_) { return null; }
}
const REQUIRED = [
  'task_id','primary_action','why','do_not','success_condition','minutes',
  'expected_impact','confidence','evidence_used','market_signals_used'
];
function validateAISchema(value) {
  const errors = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { valid: false, errors: ['response must be a JSON object'] };
  for (const key of REQUIRED) if (!Object.prototype.hasOwnProperty.call(value, key)) errors.push('missing required field: ' + key);
  for (const key of Object.keys(value)) if (!REQUIRED.includes(key)) errors.push('unexpected field: ' + key);
  for (const key of ['task_id','primary_action','why','success_condition','expected_impact']) {
    if (typeof value[key] !== 'string' || !value[key].trim()) errors.push(key + ' must be a non-empty string');
  }
  if (typeof value.do_not !== 'string' && !(Array.isArray(value.do_not) && value.do_not.every(x => typeof x === 'string')))
    errors.push('do_not must be a string or an array of strings');
  if (!Number.isInteger(value.minutes) || value.minutes < 1 || value.minutes > 600)
    errors.push('minutes must be an integer number from 1 to 600');
  if (typeof value.confidence !== 'number' || !Number.isFinite(value.confidence) || value.confidence < 0 || value.confidence > 1)
    errors.push('confidence must be a numeric number from 0 to 1');
  for (const key of ['evidence_used','market_signals_used']) {
    if (!Array.isArray(value[key]) || value[key].some(x => typeof x !== 'string')) errors.push(key + ' must be an array of strings');
  }
  return { valid: errors.length === 0, errors };
}
function systemPrompt() {
  return [
    'You are ORACLE\'s recommendation layer. The canonical packet is a snapshot of the original ORACLE application. Never create or alter campaign state.',
    'Recommend only one task that exists in mission.all_tasks or, when every current task is complete, next_mission.tasks. Copy its task_id and title exactly.',
    'If task completion, available time, prerequisites, deadlines, evidence, or market signals are unknown, do not claim they are known. The deterministic validator decides the verdict.',
    'Do not invent completion, time, repositories, benchmarks, evidence, opportunities, jobs, salaries, or market signals. Use empty arrays when no verified IDs are present.',
    'Return exactly one JSON object with exactly these fields: task_id, primary_action, why, do_not, success_condition, minutes, expected_impact, confidence, evidence_used, market_signals_used.',
    'minutes must be a JSON integer from 1 to 600. confidence must be a JSON number from 0 to 1. Do not stringify numbers. No markdown.'
  ].join('\n');
}
function mockResponse(packet) {
  const tasks = packet && packet.mission && packet.mission.all_tasks || [];
  let task = tasks.find(x => x && x.done === false) || tasks.find(x => x && x.done === null);
  if (!task && tasks.length && tasks.every(x => x && x.done === true)) {
      task = (packet.next_mission && packet.next_mission.tasks || []).find(x => x && x.done === false)
        || (packet.next_mission && packet.next_mission.tasks || []).find(x => x && x.done === null);
  }
  if (!task) {
    return { task_id: '', primary_action: '', why: '', do_not: ['No task with explicitly incomplete status is available.'],
      success_condition: '', minutes: 15, expected_impact: '', confidence: 0.5, evidence_used: [], market_signals_used: [] };
  }
  return {
    task_id: task.task_id, primary_action: task.title,
    why: 'Local mock fixture selected an explicitly incomplete canonical task.',
    do_not: packet.campaign && packet.campaign.applications_locked ? ['Applications are locked during BUILD.'] : [],
    success_condition: 'Complete the identified task in the original ORACLE application.',
    minutes: 15, expected_impact: 'Mock-only; no impact estimate is available.',
    confidence: 0.5, evidence_used: [], market_signals_used: []
  };
}
async function obtainProviderOutput(question, packet) {
  if (testProviderOverride) return testProviderOverride(question, packet);
  if (MOCK) {
    const value = mockResponse(packet);
    const raw = JSON.stringify(value);
    return { raw_provider_response: raw, content: raw, mode: 'mock', provider_error: null };
  }
  if (!(API_KEY && MODEL)) {
    const error = new Error('AI_NOT_CONFIGURED');
    error.code = 'AI_NOT_CONFIGURED';
    throw error;
  }
  const response = await fetch(BASE + '/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + API_KEY },
    body: JSON.stringify({
      model: MODEL, temperature: 0.1, max_tokens: 800,
      messages: [
        { role: 'system', content: systemPrompt() },
        { role: 'user', content: 'CANONICAL_PACKET:\n' + JSON.stringify(packet) + '\nQUESTION:\n' + question }
      ],
      signal: AbortSignal.timeout ? AbortSignal.timeout(60000) : undefined
    })
  });
  const raw = await response.text();
  if (!response.ok) {
    const error = new Error('AI_PROVIDER_FAILURE');
    error.code = 'AI_PROVIDER_FAILURE';
    error.raw_provider_response = raw;
    throw error;
  }
  const envelope = parseJSON(raw);
  const content = envelope && envelope.choices && envelope.choices[0]
    && envelope.choices[0].message && envelope.choices[0].message.content;
  return { raw_provider_response: raw, content: typeof content === 'string' ? content : null, mode: 'live', provider_error: null };
}
async function askWithPacket(question, packet, version) {
  const locked = await verifyLockedPacket(db, packet, version);
  if (!locked.ok) {
    const error = new Error(locked.error);
    error.code = locked.error;
    throw error;
  }
  const generated = Date.parse(packet.source.generated_at || '');
  if (!Number.isFinite(generated) || Date.now() - generated > 10 * 60 * 1000 || generated > Date.now() + 60000) {
    const error = new Error('LIVE_PACKET_STALE');
    error.code = 'LIVE_PACKET_STALE';
    throw error;
  }
  const id = crypto.randomUUID();
  let raw = null, parsed = null, schema = { valid: false, errors: ['provider response unavailable'] };
  let deterministic = { verdict: 'REJECT', checks: [{ check: 'schema', status: 'FAIL', detail: 'Provider response unavailable.' }] };
  let final = null, modifications = [], mode = MOCK ? 'mock' : 'live', providerError = null;
  try {
    const output = await obtainProviderOutput(question, packet);
    raw = output.raw_provider_response;
    mode = output.mode;
    parsed = parseJSON(output.content);
    if (!parsed && output.content) {
      try {
        const first = output.content.indexOf('{'), last = output.content.lastIndexOf('}');
        if (first >= 0 && last > first) parsed = JSON.parse(output.content.slice(first, last + 1));
      } catch (_) {}
    }
    schema = validateAISchema(parsed);
    if (schema.valid) {
      const priorDocs = await db.listDocs('ai_recommendations');
      const priorRecommendations = Object.values(priorDocs).map(x => ({
        task_id: x.final_recommendation && x.final_recommendation.task_id,
        verdict: x.final_verdict
      }));
      deterministic = validateRecommendation(packet, parsed, { priorRecommendations });
      modifications = deterministic.modifications;
      final = deterministic.final_recommendation;
    } else {
      deterministic = { verdict: 'REJECT', checks: [{ check: 'ai_schema', status: 'FAIL', detail: schema.errors.join('; ') }] };
    }
  } catch (error) {
    raw = error.raw_provider_response || raw;
    providerError = error.code || error.message;
    if (providerError === 'AI_NOT_CONFIGURED' || providerError === 'AI_PROVIDER_FAILURE'
      || providerError === 'DATABASE_UNAVAILABLE' || providerError === 'DATABASE_WRITE_FAILURE') throw error;
    deterministic = { verdict: 'REJECT', checks: [{ check: 'provider_or_parse', status: 'FAIL', detail: providerError }] };
  }
  const verdict = schema.valid ? deterministic.verdict : 'REJECT';
  const record = {
    id, timestamp: new Date().toISOString(), question,
    packet_version: version, canonical_packet: packet,
    raw_provider_response: raw, parsed_response: parsed,
    schema_validation: schema, deterministic_validation: deterministic,
    modifications, final_recommendation: final, final_verdict: verdict,
    mode, provider_error: providerError
  };
  await db.putDoc('ai_recommendations', id, record);
  const eventId = crypto.randomUUID();
  await db.putDoc('decision_events', eventId, {
    id: eventId, timestamp: new Date().toISOString(), decision_id: id,
    event: 'recommendation_created', detail: { final_verdict: verdict, packet_version: version }
  });
  return Object.assign({ ok: true, audit_id: id, verdict, mode }, record);
}
function isConfigured() { return MOCK || !!(API_KEY && MODEL); }
function configInfo() { return { connected: isConfigured(), model: MODEL || null, mock: MOCK }; }
function setTestProvider(fn) {
  if (process.env.NODE_ENV !== 'test') throw new Error('test-only hook');
  testProviderOverride = fn || null;
}
module.exports = { askWithPacket, validateAISchema, parseJSON, systemPrompt, mockResponse, isConfigured, configInfo,
  _setTestProvider: setTestProvider };
