/* Private API auth. Production always requires ORACLE_TOKEN. */
'use strict';
function isLocalRequest(req) {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') return false;
  if (!/^(1|true|yes)$/i.test(process.env.ORACLE_LOCAL_AUTH || '')) return false;
  const h = req && req.headers || {};
  const host = h.host || h.Host || '';
  return /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host) || process.env.NODE_ENV === 'test';
}
function authorized(req) {
  const token = process.env.ORACLE_TOKEN || '';
  if (!token) return isLocalRequest(req);
  const h = req && req.headers || {};
  const supplied = h.authorization || h.Authorization || '';
  return supplied === 'Bearer ' + token;
}
function unauthorizedResponse() { return { statusCode: 401, body: { ok: false, error: 'UNAUTHORIZED' } }; }
module.exports = { authorized, unauthorizedResponse, hasToken: () => !!process.env.ORACLE_TOKEN, isLocalRequest };
