#!/usr/bin/env node
/* Local-only Vercel-function shim for browser and HTTP verification. */
'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.ORACLE_STORAGE_MODE = process.env.ORACLE_STORAGE_MODE || 'memory';
process.env.ORACLE_LOCAL_AUTH = process.env.ORACLE_LOCAL_AUTH || '1';
process.env.ORACLE_AI_MOCK = process.env.ORACLE_AI_MOCK || '1';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const PORT = parseInt(process.env.PORT || '3000', 10);
const ROUTES = {
  '/api/health': '../api/health.js', '/api/state': '../api/state.js',
  '/api/state/sync': '../api/state-sync.js', '/api/state-sync': '../api/state-sync.js',
  '/api/packet': '../api/packet.js', '/api/packet/lock': '../api/packet-lock.js',
  '/api/packet-lock': '../api/packet-lock.js', '/api/ask': '../api/ask.js',
  '/api/decision': '../api/decision.js', '/api/evidence': '../api/evidence.js',
  '/api/audit': '../api/audit.js', '/api/audit/applied': '../api/audit-applied.js',
  '/api/audit-applied': '../api/audit-applied.js', '/api/export': '../api/export.js',
  '/api/import': '../api/import.js', '/api/external': '../api/external.js'
};
function send(res, status, headers, body) {
  if (typeof body !== 'string' && !Buffer.isBuffer(body)) body = JSON.stringify(body);
  res.writeHead(status, headers); res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > 5 * 1024 * 1024) { req.destroy(); reject(new Error('body too large')); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve(null);
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch (_) { resolve(undefined); }
    });
    req.on('error', reject);
  });
}
const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://127.0.0.1:' + PORT), p = u.pathname;
  console.log('[' + new Date().toISOString().slice(11, 19) + '] ' + req.method + ' ' + p);
  if (Object.prototype.hasOwnProperty.call(ROUTES, p)) {
    try {
      const handler = require(ROUTES[p]);
      const body = ['POST','PUT'].includes(req.method) ? await readBody(req) : null;
      const query = Object.fromEntries(u.searchParams.entries());
      const result = await handler({ method: req.method, headers: req.headers, body, query, url: req.url, path: p });
      return send(res, result.statusCode, result.headers || {}, result.body || '');
    } catch (error) {
      console.error('[local function shim]', error);
      return send(res, 500, { 'Content-Type':'application/json' }, { ok:false, error:'LOCAL_HANDLER_FAILURE' });
    }
  }
  const staticFiles = {
    '/':'index.html','/index.html':'index.html','/oracle-styles.css':'oracle-styles.css',
    '/oracle-ui.js':'oracle-ui.js','/oracle-intel.js':'oracle-intel.js'
  };
  if (!Object.prototype.hasOwnProperty.call(staticFiles,p)) return send(res,404,{'Content-Type':'text/plain'},'not found');
  const file = path.join(ROOT, staticFiles[p]);
  if (!fs.existsSync(file)) return send(res,404,{'Content-Type':'text/plain'},'not found');
  const ext = path.extname(file).toLowerCase();
  const type = ext === '.html' ? 'text/html; charset=utf-8' : ext === '.js'
    ? 'application/javascript; charset=utf-8' : ext === '.css' ? 'text/css; charset=utf-8' : 'application/octet-stream';
  return send(res,200,{'Content-Type':type,'Cache-Control':'no-store'},fs.readFileSync(file));
});
server.listen(PORT,'127.0.0.1',() => {
  console.log('ORACLE local verification server: http://127.0.0.1:' + PORT);
  console.log('Storage: explicit local memory; AI: deterministic mock; production routes remain serverless.');
});
