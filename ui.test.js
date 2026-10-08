#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); console.log('PASS ' + name); passed++; }
  catch (e) { console.error('FAIL ' + name + '\n  ' + (e.stack || e)); failed++; }
}
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('index.html'), intel = read('oracle-intel.js'), ui = read('oracle-ui.js');
test('index opens on the integrated experience and preserves the original locked application', () => {
  assert.ok(html.includes('<title>') && html.includes('GATE PREFLIGHT'));
  assert.ok(html.includes('<title>ORACLE — Personal Intelligence System</title>'));
  assert.doesNotMatch(html, /ORACLE — AI Engineering OS · Goutham · Summer 2027/);
  assert.ok(html.includes('class="oracle-experience-mode"'));
  assert.ok(html.includes('window.oracleStatePacket = function'));
  assert.ok(fs.readFileSync(path.join(root, 'Oracle Final Corrected Locked.html'), 'utf8').includes('const START = new Date(2026,9,7)'));
  assert.ok(html.includes('id="imp_all"') && html.includes('id="newtaskbtn"'));
});
test('frontend includes one stylesheet, one UI module, and one consume-only API client', () => {
  assert.equal((html.match(/href="\/oracle-styles\.css"/g) || []).length, 1);
  assert.equal((html.match(/src="\/oracle-ui\.js"/g) || []).length, 1);
  assert.equal((html.match(/src="\/oracle-intel\.js"/g) || []).length, 1);
  assert.doesNotMatch(html, /src="\/oracle-core\.js"/);
});
test('exactly one canonical projection is executable', () => {
  assert.equal((html.match(/window\.oracleStatePacket\s*=\s*function/g) || []).length, 1);
  assert.doesNotMatch(intel, /function\s+oracleStatePacket\s*\(|window\.oracleStatePacket\s*=/);
  assert.doesNotMatch(ui, /function\s+oracleStatePacket\s*\(|window\.oracleStatePacket\s*=/);
  assert.match(intel, /window\.oracleStatePacket\(\)/);
});
test('editorial experience exposes live position, move, uncertainty, proof, and intelligence', () => {
  for (const label of ['CURRENT POSITION','YOUR MOVE','WHY','SUCCESS','DO NOT','EXPECTED IMPACT','CONFIDENCE','EVIDENCE','TIME','VERIFIED','CLAIMED · UNVERIFIED','INTELLIGENCE'])
    assert.ok(ui.includes(label), label);
  assert.match(ui, /UNKNOWN/);
  assert.match(ui, /No live external signals|UNAVAILABLE/i);
});
test('available time remains null and user claims are explicitly unverified', () => {
  assert.match(html, /available_minutes: null/);
  assert.match(html, /verified: false/);
  assert.doesNotMatch(intel, /available_minutes\s*:\s*(90|180|240)/);
});
test('no synthetic fallback campaign/task/repository values are in production frontend', () => {
  assert.doesNotMatch(intel, /Day 12|pytorch-core|repo:attn|3 hours|available_minutes\s*:\s*180/i);
  assert.doesNotMatch(ui, /Day 12|pytorch-core|repo:attn|3 hours/i);
});
test('production browser API uses relative routes and keeps auth token out of state sync', () => {
  assert.match(intel, /fetch\(path/);
  assert.match(intel, /Authorization\s*=\s*'Bearer '/);
  assert.match(intel, /startsWith\('__orb'\)/);
});
test('build script is portable and does not contain environment-specific paths', () => {
  const build = read('scripts/build-html.js');
  assert.doesNotMatch(build, /\/home\/z\/my-project|\/Users\/[^/]+\/Downloads/);
  assert.match(build, /path\.resolve\(__dirname/);
});
test('build completes from a clean output directory', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'oracle-build-'));
  try {
    const out = path.join(temp, 'clean', 'index.html');
    const result = spawnSync(process.execPath, [path.join(root, 'scripts/build-html.js'),
      '--source', path.join(root, 'Oracle Final Corrected Locked.html'), '--out', out],
      { cwd: temp, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.ok(fs.existsSync(out));
    const built = fs.readFileSync(out, 'utf8');
    assert.match(built, /window\.oracleStatePacket = function/);
    assert.equal((built.match(/src="\/oracle-intel\.js"/g) || []).length, 1);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
});
test('responsive experience and reduced-motion rules are present', () => {
  const css = read('oracle-styles.css');
  assert.match(css, /@media\(max-width:620px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /ox-hero/);
  assert.match(css, /oracle-return-to-experience/);
  assert.match(css, /--ox-paper:#f7f8fa/);
  assert.match(css, /@keyframes ox-rise-in/);
  assert.match(css, /@keyframes ox-state-tick/);
  assert.match(ui, /animateStateChanges/);
});
test('Vercel config contains no wildcard CORS policy', () => {
  assert.doesNotMatch(read('vercel.json'), /Access-Control-Allow-Origin.*\*/);
});
test('production front-end only imports the serverless API surface', () => {
  assert.doesNotMatch(html, /http\.createServer|server\.listen/);
  assert.match(intel, /\/api\/packet-lock/);
  assert.match(ui, /\/api\/ask/);
});
console.log('\nUI checks passed: ' + passed);
console.log('UI checks failed: ' + failed);
if (failed) process.exitCode = 1;
