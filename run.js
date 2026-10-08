#!/usr/bin/env node
'use strict';
process.env.NODE_ENV = 'test';
process.env.ORACLE_STORAGE_MODE = 'test';
process.env.ORACLE_LOCAL_AUTH = '1';
process.env.ORACLE_AI_MOCK = '1';
process.env.ORACLE_TOKEN = '';
delete process.env.DATABASE_URL;

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const db = require('../lib/db');
const ai = require('../lib/ai');
const validator = require('../lib/validator');
const { PROTECTED_PATHS } = require('../lib/oracle');
const health = require('../api/health');
const state = require('../api/state');
const stateSync = require('../api/state-sync');
const packetApi = require('../api/packet');
const lockApi = require('../api/packet-lock');
const askApi = require('../api/ask');
const decisionApi = require('../api/decision');
const auditApi = require('../api/audit');
const auditAppliedApi = require('../api/audit-applied');
const evidenceApi = require('../api/evidence');
const externalApi = require('../api/external');
const exportApi = require('../api/export');
const importApi = require('../api/import');
let passed = 0, failed = 0;

async function test(name, fn) {
  try { await fn(); console.log('PASS ' + name); passed++; }
  catch (e) { console.error('FAIL ' + name + '\n  ' + (e.stack || e)); failed++; }
}
function req(method, body, headers = {}) {
  return { method, body, headers: Object.assign({ host: '127.0.0.1:3000' }, headers) };
}
function json(response) { return JSON.parse(response.body); }
function basePacket() {
  const now = new Date().toISOString();
  return {
    schema: 'oracle.state.v1',
    source: { type: 'live-original-oracle', generated_at: now, state: 'browser-localStorage', snapshot_only_on_server: true },
    campaign: { start_date: '2026-10-07', current_campaign_start: '2026-10-07',
      build_phase_end: '2026-11-06', total_days: 283, date: '2026-10-09',
      day_number: 3, phase: 'BUILD PHASE', week_title: 'BUILD PHASE',
      days_remaining: 280, applications_locked: true, build_lock_note: 'Applications locked through Nov 6.' },
    gate: { id: 'G1', name: 'First gate', date: '2026-11-06', why: 'Test fixture only', source: 'test fixture' },
    mission: { id: 'mission-current', title: 'Current mission', phase: 'BUILD PHASE',
      primary_task: null, tasks: [], custom_tasks: [], all_tasks: [
        { task_id: 'plan:2026-10-09:0', title: 'Complete the canonical test task', done: false,
          mission_id: 'mission-current', source: 'original-plan', prerequisites: [], deadline: null }
      ] },
    next_mission: { id: 'mission-next', title: 'Next mission', phase: 'BUILD PHASE',
      tasks: [{ task_id: 'plan:2026-10-10:0', title: 'Complete the next canonical task', done: false,
        mission_id: 'mission-next', source: 'original-plan', prerequisites: [], deadline: null }] },
    position: { active_module: null, syllabus: { completed: 0, total: 0 }, dsa_solved: null,
      streak_days: null, blocks_today: 0, minutes_today: 0, biggest_bottleneck: null },
    constraints: { available_minutes: 60, available_time_status: 'KNOWN_FOR_TEST', deadlines: [],
      prerequisites_status: 'DEFINED_FOR_TEST' },
    evidence: [{ evidence_id: 'verified-evidence-1', verified: true, label: 'fixture evidence' }],
    user_claims: [],
    external_intelligence: { status: 'connected', live_market_signals: [], live_internship_openings: [],
      live_hiring_activity: [], captured_at: now, static_baseline: { captured_at: '2026-07', current: false } }
  };
}
function rec(packet, extra = {}) {
  const task = packet.mission.all_tasks[0];
  return Object.assign({
    task_id: task.task_id, primary_action: task.title, why: 'This is the exact task from the live ORACLE packet.',
    do_not: ['Do not claim unverified evidence.'], success_condition: 'Complete the original ORACLE task.',
    minutes: 25, expected_impact: 'The task advances the recorded mission.', confidence: 0.7,
    evidence_used: [], market_signals_used: []
  }, extra);
}
async function capture(packet, expectedVersion = null) {
  const locked = await lockApi(req('POST', { packet, expected_version: expectedVersion, protected_paths: PROTECTED_PATHS }));
  assert.equal(locked.statusCode, 200, json(locked).error);
  const version = json(locked).version;
  const saved = await packetApi(req('POST', { packet, version, reason: 'test' }));
  assert.equal(saved.statusCode, 200, json(saved).error);
  return { version, saved: json(saved) };
}
async function askWith(provider, packet, version) {
  ai._setTestProvider(provider);
  return askApi(req('POST', { question: 'What should I do next?', packet, version }));
}
function canonicalProjectionFromBuiltSource(dayRecord = { t: { m: true, 0: false } }) {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const match = html.match(/window\.oracleStatePacket = function \(\) \{[\s\S]*?\n\};/);
  assert.ok(match, 'build must inject the canonical projection in the original script scope');
  const day = '2026-10-09';
  const originalState = {
    START: new Date('2026-10-07T00:00:00'), TOTAL: 283,
    CURRENT_CAMPAIGN_START: new Date('2026-10-07T00:00:00'), BUILD_PHASE_END: new Date('2026-11-06T00:00:00'),
    BUILD_PHASE: { active: true, note: 'original lock', until: 'Nov 6, 2026' },
    AP: { days: { [day]: dayRecord } },
    USER: { tasks: { [day]: [{ t: 'Explicitly complete custom task', done: true }, { t: 'Unknown custom task', done: null }] }, wins: [] },
    MS: 86400000,
    planFor: date => date.getDate() === 9
      ? { ph: 'BUILD PHASE', th: 'Original mission', list: ['Primary task', 'Second task'] }
      : { ph: 'BUILD PHASE', th: 'Next original mission', list: ['Next task'] },
    iso: date => date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0'),
    dd: (a,b) => Math.round((new Date(b.getFullYear(),b.getMonth(),b.getDate()) - new Date(a.getFullYear(),a.getMonth(),a.getDate())) / 86400000),
    eGates: () => [{ n: 'G1', full: 'Original gate', d: new Date('2026-11-06T00:00:00'), why: 'real fixture source', src: 'original' }],
    activeModule: () => null, syllCounts: () => ({ done: 4, tot: 40 }), streak: () => 1,
    eDLs: () => [], LS: { getItem: () => null }, computeCoach: () => null,
    window: {}
  };
  vm.runInNewContext(match[0], originalState);
  return originalState.window.oracleStatePacket();
}

async function main() {
  db._resetForTests();
  await test('one projection maps original completion true/false/null without guessing', () => {
    const source = canonicalProjectionFromBuiltSource();
    assert.equal(source.mission.all_tasks[0].done, true);
    assert.equal(source.mission.all_tasks[1].done, false);
    assert.equal(source.mission.custom_tasks[0].done, true);
    assert.equal(source.mission.custom_tasks[1].done, null);
    assert.equal(source.campaign.phase, 'BUILD PHASE');
    assert.equal(source.campaign.applications_locked, true);
    assert.equal(source.position.syllabus.completed, 4);
  });
  await test('original unchecked current checklist defaults to false while malformed and future states stay unknown', () => {
    const absent = canonicalProjectionFromBuiltSource(null);
    assert.equal(absent.mission.all_tasks[0].done, false);
    assert.equal(absent.mission.all_tasks[1].done, false);
    assert.equal(absent.mission.custom_tasks[1].done, null);
    assert.equal(absent.next_mission.tasks[0].done, null);
    const malformed = canonicalProjectionFromBuiltSource({ t: { m: 'yes' } });
    assert.equal(malformed.mission.all_tasks[0].done, null);
  });
  await test('canonical packet is one projection in the host and intel consumes it', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const intel = fs.readFileSync(path.join(__dirname, '..', 'oracle-intel.js'), 'utf8');
    assert.equal((html.match(/window\.oracleStatePacket\s*=\s*function/g) || []).length, 1);
    assert.doesNotMatch(intel, /function\s+oracleStatePacket\s*\(|window\.oracleStatePacket\s*=/);
    assert.match(intel, /window\.oracleStatePacket\(\)/);
    assert.doesNotMatch(fs.readFileSync(path.join(__dirname, '..', 'api', 'ask.js'), 'utf8'), /oracleStatePacket\s*\(/);
  });

  await test('strict AI schema accepts numeric JSON values only', () => {
    assert.equal(ai.validateAISchema(rec(basePacket())).valid, true);
    assert.equal(ai.validateAISchema(rec(basePacket(), { minutes: '25' })).valid, false);
    assert.equal(ai.validateAISchema(rec(basePacket(), { confidence: '0.7' })).valid, false);
    assert.equal(ai.validateAISchema(Object.assign(rec(basePacket()), { advances_mission: true })).valid, false);
  });
  await test('correct canonical task is ACCEPT when all required facts are known', () => {
    const p = basePacket();
    assert.equal(validator.validateRecommendation(p, rec(p)).verdict, 'ACCEPT');
  });
  await test('wrong task_id is REJECT', () => {
    const p = basePacket();
    assert.equal(validator.validateRecommendation(p, rec(p, { task_id: 'not-a-task' })).verdict, 'REJECT');
  });
  await test('unrelated action is REJECT despite matching task_id', () => {
    const p = basePacket();
    assert.equal(validator.validateRecommendation(p, rec(p, { primary_action: 'Browse unrelated videos' })).verdict, 'REJECT');
  });
  await test('missing mission is NEED_INFO', () => {
    const p = basePacket(); p.mission = null;
    assert.equal(validator.validateRecommendation(p, rec(basePacket())).verdict, 'NEED_INFO');
  });
  await test('missing available time is NEED_INFO', () => {
    const p = basePacket(); p.constraints.available_minutes = null;
    assert.equal(validator.validateRecommendation(p, rec(p)).verdict, 'NEED_INFO');
  });
  await test('ambiguous string time is NEED_INFO, never coerced', () => {
    const p = basePacket(); p.constraints.available_minutes = '60';
    assert.equal(validator.validateRecommendation(p, rec(p)).verdict, 'NEED_INFO');
  });
  await test('unknown task completion remains NEED_INFO', () => {
    const p = basePacket(); p.mission.all_tasks[0].done = null;
    assert.equal(validator.validateRecommendation(p, rec(p)).verdict, 'NEED_INFO');
  });
  await test('completed current mission permits a valid next-mission task', () => {
    const p = basePacket(); p.mission.all_tasks[0].done = true;
    const next = p.next_mission.tasks[0];
    const result = validator.validateRecommendation(p, rec(p, { task_id: next.task_id,
      primary_action: next.title, mission_id: next.mission_id }));
    assert.equal(result.verdict, 'ACCEPT');
    assert.ok(result.checks.some(x => x.check === 'mission_transition' && x.status === 'PASS'));
  });
  await test('stale recommendation for a completed task is REJECT', () => {
    const p = basePacket(); p.mission.all_tasks[0].done = true;
    assert.equal(validator.validateRecommendation(p, rec(p)).verdict, 'REJECT');
  });
  await test('BUILD plus application recommendation is REJECT', () => {
    const p = basePacket();
    p.mission.all_tasks[0].title = 'Apply to internships';
    assert.equal(validator.validateRecommendation(p, rec(p, { primary_action: 'Apply to internships' })).verdict, 'REJECT');
  });
  await test('fabricated evidence reference is REJECT', () => {
    const p = basePacket();
    assert.equal(validator.validateRecommendation(p, rec(p, { evidence_used: ['fabricated-repo'] })).verdict, 'REJECT');
  });
  await test('fabricated market signal reference is REJECT', () => {
    const p = basePacket();
    assert.equal(validator.validateRecommendation(p, rec(p, { market_signals_used: ['fake-opening'] })).verdict, 'REJECT');
  });
  await test('duplicate task title is REJECT', () => {
    const p = basePacket();
    p.mission.all_tasks.push(Object.assign({}, p.mission.all_tasks[0], { task_id: 'duplicate-id' }));
    assert.equal(validator.validateRecommendation(p, rec(p)).verdict, 'REJECT');
  });
  await test('undefined prerequisites yield NEED_INFO', () => {
    const p = basePacket(); p.mission.all_tasks[0].prerequisites = null;
    assert.equal(validator.validateRecommendation(p, rec(p)).verdict, 'NEED_INFO');
  });

  await test('memory storage is explicit and reports its mode', () => {
    assert.equal(db.engineInfo().driver, 'memory');
    assert.equal(db.engineInfo().memory_allowed, true);
  });
  await test('production without DATABASE_URL returns 503 DATABASE_UNAVAILABLE', async () => {
    const old = { NODE_ENV: process.env.NODE_ENV, VERCEL_ENV: process.env.VERCEL_ENV,
      DATABASE_URL: process.env.DATABASE_URL, ORACLE_STORAGE_MODE: process.env.ORACLE_STORAGE_MODE,
      ORACLE_TOKEN: process.env.ORACLE_TOKEN };
    try {
      process.env.NODE_ENV = 'production'; process.env.VERCEL_ENV = 'production';
      delete process.env.DATABASE_URL; process.env.ORACLE_STORAGE_MODE = 'memory'; process.env.ORACLE_TOKEN = 'secret';
      const result = await health(req('GET', null, { authorization: 'Bearer secret' }));
      assert.equal(result.statusCode, 503); assert.equal(json(result).error, 'DATABASE_UNAVAILABLE');
    } finally {
      for (const [k,v] of Object.entries(old)) v === undefined ? delete process.env[k] : process.env[k] = v;
    }
  });
  await test('production DB write failure returns 503 DATABASE_WRITE_FAILURE', async () => {
    const old = { NODE_ENV: process.env.NODE_ENV, VERCEL_ENV: process.env.VERCEL_ENV,
      DATABASE_URL: process.env.DATABASE_URL, ORACLE_STORAGE_MODE: process.env.ORACLE_STORAGE_MODE,
      ORACLE_TOKEN: process.env.ORACLE_TOKEN };
    try {
      db._setTestSql(Object.assign(async () => [], { unsafe: async () => [] }));
      db._setTestFailure('write');
      process.env.NODE_ENV = 'production'; process.env.VERCEL_ENV = 'production';
      process.env.DATABASE_URL = 'postgres://test.invalid/db'; process.env.ORACLE_STORAGE_MODE = 'memory';
      process.env.ORACLE_TOKEN = 'secret';
      const result = await stateSync(req('POST', { keys: [{ k: 'demo', v: 'value' }] }, { authorization: 'Bearer secret' }));
      assert.equal(result.statusCode, 503); assert.equal(json(result).error, 'DATABASE_WRITE_FAILURE');
    } finally {
      for (const [k,v] of Object.entries(old)) v === undefined ? delete process.env[k] : process.env[k] = v;
      db._resetForTests();
    }
  });
  await test('production with missing auth is rejected', async () => {
    const old = { NODE_ENV: process.env.NODE_ENV, VERCEL_ENV: process.env.VERCEL_ENV, ORACLE_TOKEN: process.env.ORACLE_TOKEN };
    try {
      process.env.NODE_ENV = 'production'; process.env.VERCEL_ENV = 'production'; process.env.ORACLE_TOKEN = '';
      const result = await state(req('GET'));
      assert.equal(result.statusCode, 401); assert.equal(json(result).error, 'UNAUTHORIZED');
    } finally {
      for (const [k,v] of Object.entries(old)) v === undefined ? delete process.env[k] : process.env[k] = v;
    }
  });
  await test('production CORS does not grant wildcard origins', () => {
    const http = require('../lib/http');
    assert.equal(http.corsHeaders({ headers: { origin: 'https://unapproved.example' } })['Access-Control-Allow-Origin'], undefined);
  });

  await test('authenticated health and state APIs respond in local mode', async () => {
    db._resetForTests();
    const h = await health(req('GET')); assert.equal(h.statusCode, 200); assert.equal(json(h).ok, true);
    const s = await state(req('GET')); assert.equal(s.statusCode, 200); assert.equal(json(s).ok, true);
  });
  await test('state sync writes a mirror and import requires authorization', async () => {
    const result = await stateSync(req('POST', { keys: [{ k: 'autopilot', v: '{"days":{}}' }] }));
    assert.equal(result.statusCode, 200); assert.equal(json(result).updated, 1);
    const old = { NODE_ENV: process.env.NODE_ENV, ORACLE_LOCAL_AUTH: process.env.ORACLE_LOCAL_AUTH, ORACLE_TOKEN: process.env.ORACLE_TOKEN };
    try {
      process.env.NODE_ENV = 'production'; delete process.env.ORACLE_LOCAL_AUTH; process.env.ORACLE_TOKEN = '';
      const unauthorized = await importApi(req('POST', {}));
      assert.equal(unauthorized.statusCode, 401);
    } finally {
      for (const [k,v] of Object.entries(old)) v === undefined ? delete process.env[k] : process.env[k] = v;
    }
  });
  await test('packet lock persists and packet snapshot capture succeeds', async () => {
    db._resetForTests();
    const p = basePacket(), result = await capture(p);
    const lock = await lockApi(req('GET'));
    assert.equal(json(lock).lock.version, result.version);
    assert.equal(result.saved.sanity.every(x => x.status === 'PASS'), true);
  });
  await test('packet mutation after lock is rejected', async () => {
    db._resetForTests();
    const p = basePacket(), locked = await capture(p);
    const changed = JSON.parse(JSON.stringify(p)); changed.campaign.day_number++;
    const response = await packetApi(req('POST', { packet: changed, version: locked.version }));
    assert.equal(response.statusCode, 409);
    assert.equal(json(response).error, 'PACKET_MUTATION_AFTER_LOCK');
  });
  await test('changing lock version requires the current expected version', async () => {
    db._resetForTests();
    const p = basePacket(), first = await capture(p);
    const changed = basePacket(); changed.campaign.date = '2026-10-10'; changed.source.generated_at = new Date().toISOString();
    const conflict = await lockApi(req('POST', { packet: changed, expected_version: 'wrong' }));
    assert.equal(conflict.statusCode, 409);
    const update = await lockApi(req('POST', { packet: changed, expected_version: first.version, protected_paths: PROTECTED_PATHS }));
    assert.equal(update.statusCode, 200);
  });

  await test('malformed AI JSON is rejected and raw output is retained exactly', async () => {
    db._resetForTests();
    const p = basePacket(), locked = await capture(p), raw = '  { definitely not json }\n';
    const response = await askWith(async () => ({ raw_provider_response: raw, content: raw, mode: 'live' }), p, locked.version);
    assert.equal(response.statusCode, 200); assert.equal(json(response).verdict, 'REJECT');
    const audit = Object.values(await db.listDocs('ai_recommendations'))[0];
    assert.equal(audit.raw_provider_response, raw);
    assert.equal(audit.schema_validation.valid, false);
  });
  await test('malformed AI schema is rejected', async () => {
    db._resetForTests();
    const p = basePacket(), locked = await capture(p);
    const raw = JSON.stringify({ primary_action: 'missing fields' });
    const response = await askWith(async () => ({ raw_provider_response: raw, content: raw, mode: 'live' }), p, locked.version);
    assert.equal(json(response).verdict, 'REJECT');
    assert.equal(json(response).schema_validation.valid, false);
  });
  await test('raw provider response is preserved byte-for-byte before parsing', async () => {
    db._resetForTests();
    const p = basePacket(), locked = await capture(p), value = rec(p);
    const raw = '\n  ' + JSON.stringify({ choices: [{ message: { content: JSON.stringify(value) } }] }, null, 2) + '\n';
    const response = await askWith(async () => ({ raw_provider_response: raw, content: JSON.stringify(value), mode: 'live' }), p, locked.version);
    assert.equal(json(response).verdict, 'ACCEPT');
    const audit = Object.values(await db.listDocs('ai_recommendations'))[0];
    assert.equal(audit.raw_provider_response, raw);
    assert.deepEqual(audit.parsed_response, value);
  });
  await test('AI boolean cannot bypass task validator', async () => {
    db._resetForTests();
    const p = basePacket(), locked = await capture(p), value = Object.assign(rec(p), { advances_mission: true });
    const raw = JSON.stringify(value);
    const response = await askWith(async () => ({ raw_provider_response: raw, content: raw, mode: 'live' }), p, locked.version);
    assert.equal(json(response).verdict, 'REJECT');
    assert.ok(json(response).schema_validation.errors.some(x => x.includes('unexpected field')));
  });
  await test('live mock API returns NEED_INFO for unknown completion and available time', async () => {
    db._resetForTests();
    const p = basePacket(); p.constraints.available_minutes = null; p.mission.all_tasks[0].done = null;
    const locked = await capture(p);
    ai._setTestProvider(null);
    const response = await askApi(req('POST', { question: 'What should I do?', packet: p, version: locked.version }));
    assert.equal(response.statusCode, 200); assert.equal(json(response).verdict, 'NEED_INFO');
    assert.equal(json(response).mode, 'mock');
  });
  await test('live packet in request wins over stale saved packet', async () => {
    db._resetForTests();
    const old = basePacket(); old.campaign.date = '2026-10-08'; old.source.generated_at = new Date().toISOString();
    const first = await capture(old);
    const fresh = basePacket(); fresh.campaign.date = '2026-10-09'; fresh.source.generated_at = new Date().toISOString();
    const relock = await lockApi(req('POST', { packet: fresh, expected_version: first.version, protected_paths: PROTECTED_PATHS }));
    assert.equal(relock.statusCode, 200);
    const version = json(relock).version;
    await packetApi(req('POST', { packet: fresh, version }));
    const value = rec(fresh);
    const response = await askWith(async () => ({ raw_provider_response: JSON.stringify(value), content: JSON.stringify(value), mode: 'live' }), fresh, version);
    assert.equal(json(response).verdict, 'ACCEPT');
    const audit = Object.values(await db.listDocs('ai_recommendations'))[0];
    assert.equal(audit.canonical_packet.campaign.date, '2026-10-09');
  });
  await test('API ask rejects missing live packet instead of using persisted snapshot', async () => {
    const response = await askApi(req('POST', { question: 'What next?' }));
    assert.equal(response.statusCode, 409); assert.equal(json(response).error, 'FRESH_LIVE_PACKET_REQUIRED');
  });
  await test('decision and application history are append-only and visible in audit', async () => {
    db._resetForTests();
    const p = basePacket(), locked = await capture(p), value = rec(p);
    const asked = await askWith(async () => ({ raw_provider_response: JSON.stringify(value), content: JSON.stringify(value), mode: 'live' }), p, locked.version);
    const auditId = json(asked).audit_id;
    const decision = await decisionApi(req('POST', { recommendation_id: auditId, action: 'accepted' }));
    const applied = await auditAppliedApi(req('POST', { recommendation_id: auditId }));
    const audit = await auditApi(req('GET'));
    assert.equal(decision.statusCode, 200); assert.equal(applied.statusCode, 200);
    assert.equal(json(audit).items.length, 1); assert.equal(json(audit).events.length, 3);
    const unchanged = await db.getDoc('ai_recommendations', auditId);
    assert.equal(unchanged.applied, undefined);
  });
  await test('evidence endpoint stores claims as unverified', async () => {
    db._resetForTests();
    const response = await evidenceApi(req('POST', { label: 'Python' }));
    assert.equal(response.statusCode, 201); assert.equal(json(response).item.verified, false);
  });
  await test('external endpoint returns empty unavailable data with no provider', async () => {
    db._resetForTests();
    const response = await externalApi(req('GET'));
    assert.equal(response.statusCode, 200); assert.equal(json(response).status, 'unavailable');
    assert.deepEqual(json(response).signals, []);
  });
  await test('export and import endpoints require format and retain auth boundary', async () => {
    db._resetForTests();
    const exported = await exportApi(req('GET'));
    assert.equal(exported.statusCode, 200); assert.equal(json(exported).format, 'oracle-full-export-v1');
    const imported = await importApi(req('POST', json(exported)));
    assert.equal(imported.statusCode, 200);
  });
  await test('API routes contain no production HTTP server implementation', () => {
    const apiDir = path.join(__dirname, '..', 'api');
    for (const name of fs.readdirSync(apiDir).filter(x => x.endsWith('.js'))) {
      const text = fs.readFileSync(path.join(apiDir, name), 'utf8');
      assert.doesNotMatch(text, /http\.createServer|server\.listen/);
    }
  });

  ai._setTestProvider(null);
  console.log('\nTOTAL PASSED: ' + passed);
  console.log('TOTAL FAILED: ' + failed);
  if (failed) process.exitCode = 1;
}
main().catch(e => { console.error(e); process.exitCode = 1; });
