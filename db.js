/* PostgreSQL persistence with explicit local/test memory mode only. */
'use strict';
const crypto = require('node:crypto');
const { SCHEMA_SQL } = require('./schema');
const mem = { docs: Object.create(null), events: [] };
let sqlClient = null;
let migrated = false;
let injectedFailure = null;

class DatabaseError extends Error {
  constructor(code, message, cause) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    if (cause) this.cause = cause;
  }
}
function production() {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
}
function memoryAllowed() {
  return !production() && ['memory', 'test'].includes(process.env.ORACLE_STORAGE_MODE || '');
}
function mode() {
  if (process.env.DATABASE_URL) return 'postgres';
  if (memoryAllowed()) return 'memory';
  throw new DatabaseError('DATABASE_UNAVAILABLE', 'DATABASE_URL is required outside explicit local/test memory mode');
}
function failIfInjected(kind) {
  if (injectedFailure === kind || injectedFailure === 'all') {
    throw new DatabaseError(kind === 'write' ? 'DATABASE_WRITE_FAILURE' : 'DATABASE_UNAVAILABLE', 'injected database failure');
  }
}
function wrap(err, isWrite) {
  if (err instanceof DatabaseError) return err;
  return new DatabaseError(isWrite ? 'DATABASE_WRITE_FAILURE' : 'DATABASE_UNAVAILABLE',
    isWrite ? 'database write failed' : 'database unavailable', err);
}
async function getSql() {
  if (sqlClient) return sqlClient;
  try {
    const neon = require('@neondatabase/serverless');
    sqlClient = neon.neon(process.env.DATABASE_URL);
    return sqlClient;
  } catch (e) { throw wrap(e, false); }
}
async function ensureSchema() {
  if (mode() === 'memory' || migrated) return;
  try {
    const sql = await getSql();
    const statements = SCHEMA_SQL.split(/;\s*(?:\n|$)/).map(s => s.trim()).filter(Boolean);
    for (const statement of statements) await sql.unsafe(statement);
    migrated = true;
  } catch (e) { throw wrap(e, false); }
}
function collection(name) {
  if (!mem.docs[name]) mem.docs[name] = Object.create(null);
  return mem.docs[name];
}
async function putDoc(name, id, value) {
  const storage = mode();
  failIfInjected('write');
  try {
    if (storage === 'memory') collection(name)[id] = { json: JSON.stringify(value), ts: Date.now() };
    else {
      await ensureSchema();
      const sql = await getSql();
      await sql`INSERT INTO docs (collection,id,json,ts) VALUES (${name},${id},${JSON.stringify(value)},${Date.now()}) ON CONFLICT (collection,id) DO UPDATE SET json=excluded.json,ts=excluded.ts`;
    }
    return value;
  } catch (e) { throw wrap(e, true); }
}
async function getDoc(name, id) {
  const storage = mode();
  failIfInjected('read');
  try {
    if (storage === 'memory') {
      const row = collection(name)[id];
      return row ? JSON.parse(row.json) : null;
    }
    await ensureSchema();
    const sql = await getSql();
    const rows = await sql`SELECT json FROM docs WHERE collection=${name} AND id=${id}`;
    if (!rows.length) return null;
    return typeof rows[0].json === 'string' ? JSON.parse(rows[0].json) : rows[0].json;
  } catch (e) { throw wrap(e, false); }
}
async function delDoc(name, id) {
  const storage = mode();
  failIfInjected('write');
  try {
    if (storage === 'memory') delete collection(name)[id];
    else {
      await ensureSchema();
      const sql = await getSql();
      await sql`DELETE FROM docs WHERE collection=${name} AND id=${id}`;
    }
  } catch (e) { throw wrap(e, true); }
}
async function listDocs(name) {
  const storage = mode();
  failIfInjected('read');
  try {
    if (storage === 'memory') {
      const out = {};
      for (const [id, row] of Object.entries(collection(name))) out[id] = JSON.parse(row.json);
      return out;
    }
    await ensureSchema();
    const sql = await getSql();
    const rows = await sql`SELECT id,json FROM docs WHERE collection=${name}`;
    return Object.fromEntries(rows.map(row => [row.id,
      typeof row.json === 'string' ? JSON.parse(row.json) : row.json]));
  } catch (e) { throw wrap(e, false); }
}
async function logEvent(event) {
  const e = Object.assign({ id: crypto.randomUUID(), ts: Date.now() }, event || {});
  const storage = mode();
  failIfInjected('write');
  try {
    if (storage === 'memory') {
      mem.events.unshift(e);
      if (mem.events.length > 5000) mem.events.length = 5000;
    } else {
      await ensureSchema();
      const sql = await getSql();
      await sql`INSERT INTO events (id,ts,op,key,old_value) VALUES (${e.id},${e.ts},${e.op || null},${e.key || null},${e.old == null ? null : JSON.stringify(e.old)})`;
    }
    return e;
  } catch (err) { throw wrap(err, true); }
}
async function revision() {
  const row = await getDoc('meta', 'main');
  return row && Number.isInteger(row.revision) ? row.revision : 0;
}
async function bumpRevision() {
  const row = (await getDoc('meta', 'main')) || { revision: 0 };
  row.revision++;
  row.updated_at = Date.now();
  await putDoc('meta', 'main', row);
  return row.revision;
}
function trunc(value, max = 65536) {
  if (value == null) return null;
  const text = String(value);
  return text.length > max ? text.slice(0, max) + '…[truncated]' : text;
}
function engineInfo() {
  return { driver: process.env.DATABASE_URL ? 'postgres' : (memoryAllowed() ? 'memory' : 'unavailable'),
    has_db: !!process.env.DATABASE_URL, production: production(), memory_allowed: memoryAllowed() };
}
function setTestFailure(kind) {
  if (process.env.NODE_ENV !== 'test') throw new Error('test-only hook');
  injectedFailure = kind || null;
}
function resetForTests() {
  if (process.env.NODE_ENV !== 'test') throw new Error('test-only hook');
  mem.docs = Object.create(null); mem.events.length = 0; injectedFailure = null; migrated = false; sqlClient = null;
}
function setTestSql(client) {
  if (process.env.NODE_ENV !== 'test') throw new Error('test-only hook');
  sqlClient = client;
  migrated = true;
}
module.exports = { DatabaseError, putDoc, getDoc, delDoc, listDocs, logEvent, revision, bumpRevision, trunc,
  ensureSchema, engineInfo, _mem: mem, _setTestFailure: setTestFailure, _setTestSql: setTestSql, _resetForTests: resetForTests };
