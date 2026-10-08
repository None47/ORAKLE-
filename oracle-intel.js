/* Same-origin API client. The canonical projection lives in the original ORACLE script scope. */
(function () {
  'use strict';
  if (window.__ORACLE_INTEL__) return;
  window.__ORACLE_INTEL__ = true;

  const S = { connected: false, packet: null, version: null, health: null, lastSync: null, dirty: Object.create(null) };
  window.__ORACLE_INTEL_STATE__ = S;
  const TOKEN_KEY = '__orb_token';
  function authHeaders(extra) {
    const h = Object.assign({ 'Content-Type': 'application/json' }, extra || {});
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) h.Authorization = 'Bearer ' + token;
    } catch (_) {}
    return h;
  }
  async function api(method, path, body) {
    const response = await fetch(path, {
      method, headers: authHeaders(),
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store'
    });
    let json = null;
    try { json = await response.json(); } catch (_) {}
    return { status: response.status, json };
  }
  function emitPacket(reason) {
    try {
      if (typeof window.oracleStatePacket !== 'function') throw new Error('ORACLE_CANONICAL_STATE_UNAVAILABLE');
      const packet = window.oracleStatePacket();
      S.packet = packet;
      window.dispatchEvent(new CustomEvent('oracle:packet', { detail: { packet, reason } }));
      return packet;
    } catch (error) {
      window.dispatchEvent(new CustomEvent('oracle:packet-error', { detail: { message: error.message } }));
      return null;
    }
  }

  async function capture(reason) {
    const packet = emitPacket(reason);
    if (!packet) return null;
    try {
      const lock = await api('POST', '/api/packet-lock', {
        packet, expected_version: S.version, protected_paths: [
          'schema', 'campaign', 'gate', 'mission', 'next_mission', 'constraints', 'source.type'
        ]
      });
      if (lock.status === 409 && lock.json && lock.json.current_version) {
        S.version = lock.json.current_version;
        return null;
      }
      if (lock.status !== 200 || !lock.json || !lock.json.ok) return null;
      S.version = lock.json.version;
      const saved = await api('POST', '/api/packet', { packet, version: S.version, reason });
      if (saved.status !== 200 || !saved.json || !saved.json.ok) return null;
      S.connected = true;
      S.lastSync = new Date().toISOString();
      window.dispatchEvent(new CustomEvent('oracle:packet-saved', { detail: saved.json }));
      return saved.json;
    } catch (_) { return null; }
  }
  window.oracleCapturePacket = capture;

  function localKeys() {
    const keys = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !key.startsWith('__orb')) keys.push(key);
      }
    } catch (_) {}
    return keys;
  }
  async function syncLocalState() {
    const keys = localKeys().map(k => ({ k, v: localStorage.getItem(k) }));
    if (!keys.length) return;
    const r = await api('POST', '/api/state-sync', { keys });
    if (r.status === 200 && r.json && r.json.ok) S.lastSync = new Date().toISOString();
  }
  let timer = null;
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await syncLocalState();
      await capture('state-change');
    }, 700);
  }
  try {
    const setItem = localStorage.setItem.bind(localStorage);
    const removeItem = localStorage.removeItem.bind(localStorage);
    localStorage.setItem = function (key, value) {
      setItem(key, value);
      if (typeof key === 'string' && !key.startsWith('__orb')) schedule();
    };
    localStorage.removeItem = function (key) {
      removeItem(key);
      if (typeof key === 'string' && !key.startsWith('__orb')) schedule();
    };
    window.addEventListener('storage', e => {
      if (e.key && !e.key.startsWith('__orb')) schedule();
    });
  } catch (_) {}
  document.addEventListener('change', schedule, true);

  async function boot() {
    emitPacket('boot');
    const health = await api('GET', '/api/health');
    S.health = health.json;
    S.connected = health.status === 200 && !!(health.json && health.json.ok);
    if (!S.connected) {
      window.dispatchEvent(new CustomEvent('oracle:api-state', { detail: { connected: false, health: health.json } }));
      return;
    }
    const serverState = await api('GET', '/api/state');
    if (serverState.status !== 200 || !serverState.json || !serverState.json.ok) {
      S.connected = false;
      window.dispatchEvent(new CustomEvent('oracle:api-state', { detail: { connected: false, state: serverState.json } }));
      return;
    }
    const lock = await api('GET', '/api/packet-lock');
    if (lock.status === 200 && lock.json && lock.json.lock) S.version = lock.json.lock.version;
    await syncLocalState();
    await capture('boot');
    window.dispatchEvent(new CustomEvent('oracle:api-state', { detail: { connected: true, health: S.health } }));
  }
  window.oracleConnect = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();

  window.addEventListener('beforeunload', () => {
    const packet = S.packet || emitPacket('unload');
    if (!packet) return;
    try {
      navigator.sendBeacon('/api/packet', new Blob([JSON.stringify({ packet, version: S.version, reason: 'unload' })], { type: 'application/json' }));
    } catch (_) {}
  });
})();
