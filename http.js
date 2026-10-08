/* Vercel serverless response helpers; no production HTTP server. */
'use strict';
const ALLOWED_ORIGIN = process.env.ORACLE_ALLOWED_ORIGIN || '';
function corsHeaders(req) {
  const origin = req && req.headers && (req.headers.origin || req.headers.Origin);
  if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) {
    return { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN, 'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization' };
  }
  return {};
}
function json(statusCode, obj, req) {
  return { statusCode, headers: Object.assign({
    'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'
  }, corsHeaders(req)), body: JSON.stringify(obj) };
}
function binary(statusCode, buf, contentType, extraHeaders, req) {
  const isText = /^text\/|json|xml|javascript|css/.test(contentType);
  return { statusCode, headers: Object.assign({
    'Content-Type': contentType, 'Cache-Control': 'no-store', 'Content-Length': String(buf.length)
  }, extraHeaders || {}, corsHeaders(req)), body: isText ? buf.toString('utf8') : buf.toString('base64'),
  isBase64Encoded: !isText };
}
function options(req) {
  const headers = corsHeaders(req);
  return headers['Access-Control-Allow-Origin'] ? { statusCode: 204, headers } : { statusCode: 204, headers: { 'Cache-Control': 'no-store' } };
}
async function readBody(req) {
  if (!req || req.body == null) return null;
  if (typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (_) { return undefined; } }
  return null;
}
function dbFailure(err, req) {
  const code = err && err.code;
  if (code === 'DATABASE_UNAVAILABLE' || code === 'DATABASE_WRITE_FAILURE') {
    return json(503, { ok: false, error: code }, req);
  }
  return json(500, { ok: false, error: 'INTERNAL_ERROR' }, req);
}
module.exports = { json, binary, options, readBody, corsHeaders, dbFailure };

