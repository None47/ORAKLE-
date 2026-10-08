/* ORACLE's editorial experience. Reads the canonical projection; only the original app writes operating state. */
(function () {
  'use strict';
  if (window.__ORACLE_UI__) return;
  window.__ORACLE_UI__ = true;

  const TOKEN_KEY = '__orb_token';
  const THEME_KEY = 'oracle-theme';
  const $ = (root, selector) => root.querySelector(selector);
  let packet = null;
  let lastDecision = null;
  let activeView = 'now';
  let returnFocus = null;
  let commandReturnFocus = null;

  function token() { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (_) { return ''; } }
  function savedTheme() { try { return localStorage.getItem(THEME_KEY) || 'dark'; } catch (_) { return 'dark'; } }
  function setTheme(theme) {
    const root = document.getElementById('oracle-experience');
    if (!root) return;
    const dark = theme !== 'light';
    root.dataset.theme = dark ? 'dark' : 'light';
    root.style.colorScheme = dark ? 'dark' : 'light';
    const button = root.querySelector('[data-a="theme"]');
    if (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.innerHTML = dark
        ? '<span aria-hidden="true">☼</span><span class="ox-theme-label">LIGHT</span>'
        : '<span aria-hidden="true">◐</span><span class="ox-theme-label">DARK</span>';
    }
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (_) {}
    document.body.style.backgroundColor = dark ? '#0a0a0a' : '';
  }
  function filterCommandItems(query, root) {
    const experience = root || document.getElementById('oracle-experience');
    if (!experience) return;
    const normalized = String(query || '').trim().toLowerCase();
    let first = true;
    experience.querySelectorAll('.ox-command-item').forEach(item => {
      const matches = !normalized || item.textContent.toLowerCase().includes(normalized);
      item.hidden = !matches;
      item.setAttribute('aria-selected', String(matches && first));
      if (matches) first = false;
    });
  }
  function openCommandPalette() {
    const root = document.getElementById('oracle-experience');
    const layer = root && root.querySelector('[data-f="command-layer"]');
    const input = root && root.querySelector('[data-f="command-input"]');
    const trigger = root && root.querySelector('[data-a="open-command"]');
    if (!root || !layer || !input) return;
    commandReturnFocus = document.activeElement;
    layer.hidden = false;
    layer.setAttribute('aria-hidden','false');
    if (trigger) trigger.setAttribute('aria-expanded','true');
    input.value = '';
    filterCommandItems('',root);
    input.focus();
  }
  function closeCommandPalette(restoreFocus) {
    const root = document.getElementById('oracle-experience');
    const layer = root && root.querySelector('[data-f="command-layer"]');
    const trigger = root && root.querySelector('[data-a="open-command"]');
    if (!layer || layer.hidden) return;
    layer.hidden = true;
    layer.setAttribute('aria-hidden','true');
    if (trigger) trigger.setAttribute('aria-expanded','false');
    if (restoreFocus && commandReturnFocus && typeof commandReturnFocus.focus === 'function') commandReturnFocus.focus({ preventScroll:true });
    commandReturnFocus = null;
  }
  function moveCommandSelection(direction) {
    const root = document.getElementById('oracle-experience');
    const visible = root && Array.from(root.querySelectorAll('.ox-command-item')).filter(item => !item.hidden);
    if (!visible || !visible.length) return;
    const current = visible.findIndex(item => item.getAttribute('aria-selected') === 'true');
    const next = current < 0 ? 0 : (current + direction + visible.length) % visible.length;
    visible.forEach((item,index) => item.setAttribute('aria-selected',String(index === next)));
  }
  function headers() {
    const result = { 'Content-Type': 'application/json' };
    const value = token();
    if (value) result.Authorization = 'Bearer ' + value;
    return result;
  }
  async function request(path, method, body) {
    const response = await fetch(path, {
      method: method || 'GET', headers: headers(),
      body: body === undefined ? undefined : JSON.stringify(body), cache: 'no-store'
    });
    let json = null;
    try { json = await response.json(); } catch (_) {}
    return { status: response.status, json };
  }
  function date(value, options) {
    if (!value) return 'UNKNOWN';
    const parsed = new Date(value + (String(value).length === 10 ? 'T00:00:00' : ''));
    return Number.isNaN(parsed.getTime()) ? 'UNKNOWN' : parsed.toLocaleDateString(undefined, options || { day:'numeric', month:'short', year:'numeric' });
  }
  function statusOf(task) {
    if (!task || task.done === null || typeof task.done !== 'boolean') return 'STATUS UNKNOWN';
    return task.done ? 'COMPLETE IN ORIGINAL ORACLE' : 'OPEN IN ORIGINAL ORACLE';
  }
  function set(root, field, value) {
    const target = root.querySelector('[data-f="' + field + '"]');
    if (target) target.textContent = value == null || value === '' ? 'UNKNOWN' : String(value);
  }
  function mount() {
    if (document.getElementById('oracle-experience')) return;
    const experience = document.createElement('main');
    experience.id = 'oracle-experience';
    experience.setAttribute('aria-label', 'ORACLE personal intelligence system');
    experience.innerHTML = `
      <div class="ox-shell">
        <header class="ox-topbar">
          <a class="ox-wordmark" href="#now" data-view="now" aria-label="ORACLE, Now">
            <span class="ox-sigil" aria-hidden="true">◈</span><span>ORACLE</span><i>PERSONAL INTELLIGENCE SYSTEM</i>
          </a>
          <button class="ox-command-trigger" type="button" data-a="open-command" aria-label="Search ORACLE, Command K" aria-controls="ox-command-layer" aria-expanded="false"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="6.8" cy="6.8" r="4.7"/><path d="m10.3 10.3 3.2 3.2"/></svg><span class="ox-command-trigger-label">Search ORACLE</span><kbd>⌘ K</kbd></button>
          <div class="ox-topmeta"><span class="ox-live-dot" aria-hidden="true"></span><span data-f="source">LIVE ORIGINAL STATE</span><span class="ox-top-sep">/</span><time data-f="date">—</time></div>
          <button class="ox-theme-toggle" type="button" data-a="theme" aria-pressed="true" aria-label="Switch to light mode"><span aria-hidden="true">☼</span><span class="ox-theme-label">LIGHT</span></button>
          <button class="ox-original-link" type="button" data-a="original">OPEN ORIGINAL ORACLE <span aria-hidden="true">↗</span></button>
        </header>

        <nav class="ox-nav" aria-label="Intelligence views">
          <button type="button" data-view="now" aria-current="page"><span>01</span>NOW</button>
          <button type="button" data-view="campaign"><span>02</span>CAMPAIGN</button>
          <button type="button" data-view="missions"><span>03</span>MISSIONS</button>
          <button type="button" data-view="proof"><span>04</span>PROOF</button>
          <button type="button" data-view="intelligence"><span>05</span>INTELLIGENCE</button>
          <button type="button" data-view="decisions"><span>06</span>DECISIONS</button>
        </nav>

        <section class="ox-view" data-screen="now" aria-labelledby="ox-now-title">
          <div class="ox-eyebrow"><span>THE PRESENT POSITION</span><span class="ox-rule"></span><span data-f="campaign-date">—</span></div>
          <div class="ox-hero">
            <div class="ox-hero-left">
              <div class="ox-dayline">
                <svg class="ox-day-dial" viewBox="0 0 360 360" aria-hidden="true" focusable="false">
                  <defs>
                    <linearGradient id="ox-dial-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stop-color="#21aaa1"/>
                      <stop offset="1" stop-color="#686fff"/>
                    </linearGradient>
                    <radialGradient id="ox-dial-core">
                      <stop offset="0" stop-color="#686fff" stop-opacity=".12"/>
                      <stop offset="1" stop-color="#686fff" stop-opacity="0"/>
                    </radialGradient>
                  </defs>
                  <circle class="ox-dial-core" cx="180" cy="180" r="126"/>
                  <circle class="ox-dial-track" cx="180" cy="180" r="150"/>
                  <g class="ox-dial-ticks"></g>
                  <circle class="ox-dial-progress" data-oracle-dial-progress cx="180" cy="180" r="150"/>
                  <circle class="ox-dial-orbit" cx="180" cy="180" r="126"/>
                  <circle class="ox-dial-marker-halo" data-oracle-dial-halo cx="180" cy="30" r="12"/>
                  <circle class="ox-dial-marker" data-oracle-dial-marker cx="180" cy="30" r="4.5"/>
                </svg>
                <span class="ox-day-num" data-f="day-num">—</span>
                <span class="ox-day-total">/ <b data-f="day-total">—</b><small>CAMPAIGN<br>DAY</small></span>
              </div>
              <p class="ox-phase-label">YOU ARE IN</p>
              <h1 id="ox-now-title" data-f="phase">Reading live position…</h1>
              <p class="ox-campaign-name" data-f="mission-name">—</p>
              <div class="ox-hero-actions">
                <button class="ox-hero-action-primary" type="button" data-view="campaign">VIEW CAMPAIGN <span aria-hidden="true">↗</span></button>
                <button class="ox-hero-action-secondary" type="button" data-a="original">OPEN EXECUTION CONTROLS</button>
              </div>
            </div>
            <aside class="ox-hero-aside" aria-label="Current operating position">
              <div class="ox-preview-top"><span>CAMPAIGN SNAPSHOT</span><span class="ox-preview-live"><i aria-hidden="true"></i>LIVE</span></div>
              <div class="ox-position-card">
                <p class="ox-label">CURRENT POSITION</p>
                <p class="ox-position-title" data-f="position">UNKNOWN</p>
                <p class="ox-position-detail" data-f="position-detail">—</p>
              </div>
              <div class="ox-gate-line"><span class="ox-label">NEXT GATE</span><b data-f="gate">UNKNOWN</b></div>
            </aside>
          </div>

          <div class="ox-now-grid">
            <section class="ox-bottleneck" aria-labelledby="ox-bottleneck-title">
              <div class="ox-section-index"><span>01</span><span>WHAT IS HOLDING YOU</span></div>
              <h2 id="ox-bottleneck-title" data-f="bottleneck">UNKNOWN</h2>
              <p class="ox-source-note" data-f="bottleneck-note">Read from the live ORACLE coach state.</p>
            </section>

            <section class="ox-move" aria-labelledby="ox-move-title">
              <div class="ox-move-head"><span class="ox-section-index"><span>02</span><span>YOUR MOVE</span></span><span class="ox-source-tag">ORIGINAL PLAN</span></div>
              <h2 id="ox-move-title" data-f="action">UNKNOWN</h2>
              <p class="ox-task-state" data-f="task-status">—</p>
              <dl class="ox-move-facts">
                <div><dt>WHY</dt><dd data-f="why">—</dd></div>
                <div><dt>SUCCESS</dt><dd data-f="success">—</dd></div>
                <div><dt>DO NOT</dt><dd data-f="donot">—</dd></div>
                <div><dt>EXPECTED IMPACT</dt><dd data-f="impact">—</dd></div>
                <div><dt>CONFIDENCE</dt><dd data-f="confidence">—</dd></div>
                <div><dt>EVIDENCE</dt><dd data-f="evidence">—</dd></div>
                <div><dt>TIME</dt><dd data-f="time">—</dd></div>
              </dl>
              <div class="ox-move-actions">
                <button class="ox-primary" type="button" data-a="validate">REQUEST A DECISION REVIEW <span aria-hidden="true">↗</span></button>
                <button class="ox-text-button" type="button" data-a="original">OPEN EXECUTION CONTROLS</button>
              </div>
              <div class="ox-decision-output" data-f="decision-output" aria-live="polite" hidden></div>
            </section>
          </div>

          <div class="ox-bottomline">
            <div class="ox-bottomstat"><span>GATE HORIZON</span><b data-f="horizon">UNKNOWN</b></div>
            <div class="ox-bottomstat"><span>SYLLABUS</span><b data-f="syllabus">UNKNOWN</b></div>
            <div class="ox-bottomstat"><span>DSA SOLVED</span><b data-f="dsa">UNKNOWN</b></div>
            <button class="ox-inline-link" type="button" data-view="campaign">READ THE CAMPAIGN <span aria-hidden="true">→</span></button>
          </div>
        </section>

        <section class="ox-view" data-screen="campaign" aria-labelledby="ox-campaign-title" hidden>
          <div class="ox-eyebrow"><span>THE LONG VIEW</span><span class="ox-rule"></span><span>CAMPAIGN / <span data-f="campaign-days">—</span> DAYS</span></div>
          <div class="ox-page-heading"><p class="ox-label">CAMPAIGN POSITION</p><h1 id="ox-campaign-title">A sequence in motion.</h1><p data-f="campaign-summary">—</p></div>
          <div class="ox-runway" aria-label="Campaign timeline">
            <div class="ox-runway-bar"><span data-f="progress-bar"></span></div>
            <div class="ox-runway-points">
              <div><span class="ox-point"></span><small>START</small><b data-f="start-date">—</b></div>
              <div class="ox-current-point"><span class="ox-point"></span><small>YOU ARE HERE</small><b data-f="today-point">—</b></div>
              <div><span class="ox-point ox-point-open"></span><small>NEXT GATE</small><b data-f="gate-date">—</b></div>
            </div>
          </div>
          <div class="ox-campaign-columns">
            <article class="ox-campaign-current"><p class="ox-label">ACTIVE PHASE</p><h2 data-f="campaign-phase">—</h2><p data-f="phase-note">—</p><div class="ox-large-metric"><strong data-f="days-left">—</strong><span>DAYS<br>REMAINING</span></div></article>
            <article class="ox-campaign-next"><p class="ox-label">CURRENT MISSION</p><h2 data-f="campaign-mission">—</h2><p class="ox-small-label">NEXT MISSION IN SOURCE</p><b data-f="next-mission">—</b><p class="ox-source-note">Only current and next mission records are exposed by the live projection.</p></article>
          </div>
          <div class="ox-lock-note" data-f="lock-note"></div>
        </section>

        <section class="ox-view" data-screen="missions" aria-labelledby="ox-missions-title" hidden>
          <div class="ox-eyebrow"><span>THE WORK IN FRONT OF YOU</span><span class="ox-rule"></span><span>MISSION / LIVE PLAN</span></div>
          <div class="ox-page-heading"><p class="ox-label">CURRENT MISSION</p><h1 id="ox-missions-title" data-f="mission-title">—</h1><p data-f="mission-phase">—</p></div>
          <div class="ox-mission-layout">
            <div class="ox-mission-primary"><span class="ox-label">FIRST TASK IN THE ORIGINAL PLAN</span><h2 data-f="mission-task">—</h2><p data-f="mission-task-status">—</p><div class="ox-task-truth"><span>CANONICAL TASK ID</span><code data-f="task-id">—</code></div></div>
            <aside class="ox-mission-aside"><p class="ox-label">NEXT MISSION</p><h3 data-f="next-title">—</h3><div data-f="next-tasks"></div><button class="ox-primary ox-primary-small" type="button" data-a="original">OPEN THE ORIGINAL PLAN <span aria-hidden="true">↗</span></button></aside>
          </div>
          <p class="ox-caveat">The original ORACLE remains the execution surface for checklists, timers, logs, projects, syllabus, and all other operational controls.</p>
        </section>

        <section class="ox-view" data-screen="proof" aria-labelledby="ox-proof-title" hidden>
          <div class="ox-eyebrow"><span>WHAT THE SYSTEM CAN PROVE</span><span class="ox-rule"></span><span>CLAIM ≠ VERIFICATION</span></div>
          <div class="ox-page-heading"><p class="ox-label">PROOF / EVIDENCE</p><h1 id="ox-proof-title">Keep the distinction visible.</h1><p>Claims stay claims until a verification source confirms them.</p></div>
          <div class="ox-proof-ledger">
            <section><p class="ox-label ox-label-verified">VERIFIED</p><div data-f="verified-list" class="ox-ledger-list">No verified evidence in the live packet.</div></section>
            <section><p class="ox-label ox-label-claimed">CLAIMED · UNVERIFIED</p><div data-f="claims-list" class="ox-ledger-list">No claims in the live packet.</div></section>
            <section><p class="ox-label">UNKNOWN</p><p class="ox-unknown-note" data-f="unknown-proof">UNKNOWN · no evidence source is attached to the current task.</p></section>
          </div>
          <p class="ox-caveat">ORACLE does not treat a user-entered win, project, repository, or deployment as verified evidence.</p>
        </section>

        <section class="ox-view" data-screen="intelligence" aria-labelledby="ox-intel-title" hidden>
          <div class="ox-eyebrow"><span>OUTSIDE SIGNAL / INSIDE POSITION</span><span class="ox-rule"></span><span>FRESHNESS MATTERS</span></div>
          <div class="ox-page-heading"><p class="ox-label">INTELLIGENCE</p><h1 id="ox-intel-title">No live signal is connected.</h1><p>Static research is context, not today's market.</p></div>
          <div class="ox-intel-state"><div class="ox-intel-stamp"><span class="ox-label">STATUS</span><strong data-f="intel-status">UNAVAILABLE</strong><small data-f="intel-captured">NO LIVE CAPTURE</small></div><div class="ox-intel-copy"><p class="ox-label">STATIC BASELINE</p><h2 data-f="baseline-date">JULY 2026</h2><p>This baseline is explicitly marked stale by the source. No current hiring, internship, or market signal is presented as live.</p></div></div>
          <div class="ox-signal-list" data-f="signals-list">No live external signals in the canonical packet.</div>
        </section>

        <section class="ox-view" data-screen="decisions" aria-labelledby="ox-decisions-title" hidden>
          <div class="ox-eyebrow"><span>REASONING WITH A TRACE</span><span class="ox-rule"></span><span data-f="api-status">API STATUS UNKNOWN</span></div>
          <div class="ox-page-heading"><p class="ox-label">DECISION RECORD</p><h1 id="ox-decisions-title">Ask. Validate. Keep the trail.</h1><p>AI may propose; deterministic ORACLE rules decide.</p></div>
          <div class="ox-decision-layout">
            <form class="ox-ask" data-a="ask-form"><label for="ox-question">QUESTION GROUNDED IN THE LIVE PACKET</label><textarea id="ox-question" maxlength="500" rows="3" placeholder="What should I work on next?"></textarea><div class="ox-ask-controls"><span data-f="ask-status">A fresh packet is captured before each request.</span><button class="ox-primary" type="submit">RUN DECISION REVIEW <span aria-hidden="true">↗</span></button></div><div data-f="ask-output" class="ox-decision-output" aria-live="polite" hidden></div></form>
            <aside class="ox-token"><p class="ox-label">PRIVATE API ACCESS</p><p>The access token stays in this browser and is excluded from ORACLE state sync.</p><label for="ox-token-input">BEARER TOKEN</label><div class="ox-token-row"><input id="ox-token-input" type="password" autocomplete="new-password" placeholder="Not stored" aria-label="ORACLE API access token"><button type="button" data-a="save-token">SAVE</button></div><small data-f="token-status">No token entered in this session.</small></aside>
          </div>
          <div class="ox-audit-head"><div><p class="ox-label">AUDIT / HISTORY</p><h2>Recent decisions</h2></div><button class="ox-text-button" type="button" data-a="reload-audit">REFRESH HISTORY</button></div>
          <div class="ox-audit-list" data-f="audit-list"><p>Open Decisions to load audit history from the API.</p></div>
        </section>

        <footer class="ox-footer"><span>ORACLE / <span data-f="footer-day">DAY —</span></span><span>STATE FROM THE ORIGINAL APPLICATION</span><button type="button" data-a="original">RETURN TO FULL OPERATING SYSTEM <span aria-hidden="true">↗</span></button></footer>
        <div class="ox-command-layer" id="ox-command-layer" data-f="command-layer" aria-hidden="true" hidden>
          <div class="ox-command-scrim" data-a="close-command"></div>
          <section class="ox-command-dialog" role="dialog" aria-modal="true" aria-labelledby="ox-command-title">
            <h2 id="ox-command-title" class="ox-sr-only">Search ORACLE</h2>
            <div class="ox-command-search"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="6.8" cy="6.8" r="4.7"/><path d="m10.3 10.3 3.2 3.2"/></svg><input type="search" data-f="command-input" placeholder="Search views and actions…" autocomplete="off"><button type="button" data-a="close-command" aria-label="Close command palette"><kbd>ESC</kbd></button></div>
            <div class="ox-command-group-label">QUICK NAVIGATION</div>
            <div class="ox-command-items" aria-label="ORACLE views">
              <button class="ox-command-item" type="button" data-view="now" aria-selected="true"><span class="ox-command-symbol">◷</span><span><b>Now</b><small>Current position and next move</small></span><kbd>↵</kbd></button>
              <button class="ox-command-item" type="button" data-view="campaign" aria-selected="false"><span class="ox-command-symbol">↗</span><span><b>Campaign</b><small>Timeline, milestones, and horizon</small></span><kbd>↵</kbd></button>
              <button class="ox-command-item" type="button" data-view="missions" aria-selected="false"><span class="ox-command-symbol">≡</span><span><b>Missions</b><small>Current task and execution plan</small></span><kbd>↵</kbd></button>
              <button class="ox-command-item" type="button" data-view="proof" aria-selected="false"><span class="ox-command-symbol">◇</span><span><b>Proof</b><small>Evidence and completed work</small></span><kbd>↵</kbd></button>
              <button class="ox-command-item" type="button" data-view="intelligence" aria-selected="false"><span class="ox-command-symbol">⌁</span><span><b>Intelligence</b><small>Signals from the live state</small></span><kbd>↵</kbd></button>
              <button class="ox-command-item" type="button" data-view="decisions" aria-selected="false"><span class="ox-command-symbol">◎</span><span><b>Decisions</b><small>Review and audit history</small></span><kbd>↵</kbd></button>
            </div>
            <div class="ox-command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open view</span><span><kbd>ESC</kbd> close</span></div>
          </section>
        </div>
      </div>`;
    document.body.appendChild(experience);
    setTheme(savedTheme());

    const returnButton = document.createElement('button');
    returnButton.id = 'oracle-return-to-experience';
    returnButton.type = 'button';
    returnButton.innerHTML = '<span aria-hidden="true">◈</span> RETURN TO NOW';
    returnButton.addEventListener('click', returnToExperience);
    document.body.appendChild(returnButton);

    experience.addEventListener('click', event => {
      const viewButton = event.target.closest('[data-view]');
      if (viewButton) { showView(viewButton.dataset.view); return; }
      const action = event.target.closest('[data-a]');
      if (!action) return;
      if (action.dataset.a === 'open-command') { openCommandPalette(); return; }
      if (action.dataset.a === 'close-command') { closeCommandPalette(true); return; }
      if (action.dataset.a === 'theme') { setTheme(experience.dataset.theme === 'dark' ? 'light' : 'dark'); return; }
      if (action.dataset.a === 'original') openOriginal(action);
      if (action.dataset.a === 'validate') validateCurrentMove();
      if (action.dataset.a === 'reload-audit') loadAudit();
      if (action.dataset.a === 'save-token') saveToken();
    });
    experience.querySelector('[data-f="command-input"]').addEventListener('input', event => filterCommandItems(event.target.value,experience));
    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); openCommandPalette(); return;
      }
      const layer = experience.querySelector('[data-f="command-layer"]');
      if (!layer || layer.hidden) return;
      if (event.key === 'Escape') { event.preventDefault(); closeCommandPalette(true); return; }
      if (event.key === 'Tab') {
        const focusable = Array.from(layer.querySelectorAll('input:not([disabled]),button:not([disabled])')).filter(item => !item.hidden);
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        return;
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); moveCommandSelection(event.key === 'ArrowDown' ? 1 : -1); return;
      }
      if (event.key === 'Enter') {
        const selected = experience.querySelector('.ox-command-item[aria-selected="true"]:not([hidden])');
        if (selected) { event.preventDefault(); selected.click(); }
      }
    });
    experience.querySelector('[data-a="ask-form"]').addEventListener('submit', event => {
      event.preventDefault();
      ask($('#ox-question', experience).value.trim());
    });
    window.addEventListener('oracle:packet', event => {
      const previous = packet;
      packet = event.detail.packet;
      lastDecision = null;
      render(packet);
      if (previous) animateStateChanges(previous,packet);
    });
    window.addEventListener('oracle:api-state', event => set(experience, 'api-status', event.detail.connected ? 'API CONNECTED' : 'API UNAVAILABLE · LOCAL STATE REMAINS LIVE'));
    window.addEventListener('oracle:packet-error', event => set(experience, 'source', 'CANONICAL STATE ERROR · ' + event.detail.message));
    window.addEventListener('oracle:packet-saved', () => set(experience, 'api-status', 'PACKET SNAPSHOT SAVED'));
    showExperienceMode();
    refresh();
  }

  function legacyElements() {
    return ['#master-map-invariant','#current-campaign-state','#runbar','.nav','.bnav','.wrap']
      .map(selector => document.querySelector(selector)).filter(Boolean);
  }
  function showExperienceMode() {
    document.body.classList.add('oracle-experience-mode');
    const experience = document.getElementById('oracle-experience');
    document.body.style.backgroundColor = experience && experience.dataset.theme === 'dark' ? '#0a0a0a' : '';
    const returnButton = document.getElementById('oracle-return-to-experience');
    if (experience) experience.hidden = false;
    if (returnButton) returnButton.hidden = true;
    legacyElements().forEach(element => { element.inert = true; element.setAttribute('aria-hidden','true'); });
    showView(activeView);
  }
  function openOriginal(source) {
    returnFocus = source;
    document.body.classList.remove('oracle-experience-mode');
    document.body.style.backgroundColor = '';
    const experience = document.getElementById('oracle-experience');
    const returnButton = document.getElementById('oracle-return-to-experience');
    if (experience) experience.hidden = true;
    if (returnButton) returnButton.hidden = false;
    legacyElements().forEach(element => { element.inert = false; element.removeAttribute('aria-hidden'); });
    const dash = document.getElementById('v_dash');
    if (dash) { dash.setAttribute('tabindex','-1'); dash.focus({ preventScroll:true }); }
  }
  function returnToExperience() {
    showExperienceMode();
    refresh();
    if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus({ preventScroll:true });
  }
  function showView(name) {
    if (!['now','campaign','missions','proof','intelligence','decisions'].includes(name)) return;
    activeView = name;
    const root = document.getElementById('oracle-experience');
    if (!root) return;
    const layer = root.querySelector('[data-f="command-layer"]');
    const selectedFromCommand = !!(layer && layer.contains(document.activeElement));
    closeCommandPalette(false);
    root.querySelectorAll('[data-screen]').forEach(screen => { screen.hidden = screen.dataset.screen !== name; });
    root.querySelectorAll('.ox-nav [data-view]').forEach(button => {
      if (button.dataset.view === name) button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
    });
    if (selectedFromCommand) {
      const activeButton = root.querySelector('.ox-nav [data-view="' + name + '"]');
      if (activeButton) activeButton.focus({ preventScroll:true });
    }
    if (name === 'decisions') loadAudit();
  }
  function refresh() {
    if (typeof window.oracleStatePacket !== 'function') {
      const root = document.getElementById('oracle-experience');
      if (root) set(root,'source','CANONICAL STATE UNAVAILABLE');
      return;
    }
    try { packet = window.oracleStatePacket(); render(packet); }
    catch (error) {
      const root = document.getElementById('oracle-experience');
      if (root) set(root,'source','CANONICAL STATE ERROR · ' + error.message);
    }
  }
  function render(p) {
    const root = document.getElementById('oracle-experience');
    if (!root || !p) return;
    const campaign = p.campaign || {};
    const position = p.position || {};
    const task = p.mission && p.mission.primary_task;
    const gate = p.gate || {};
    const module = position.active_module || {};
    const syllabus = position.syllabus || {};
    const today = date(campaign.date, { day:'2-digit', month:'short', year:'numeric' }).toUpperCase();
    const phase = campaign.phase || 'PHASE UNKNOWN';
    const missionTitle = p.mission && p.mission.title || 'No current mission recorded';
    const moduleTitle = module.title || 'UNKNOWN';
    set(root,'date',today);
    set(root,'campaign-date',today);
    set(root,'day-num',campaign.day_number == null ? '—' : String(campaign.day_number).padStart(2,'0'));
    set(root,'day-total',campaign.total_days == null ? '—' : campaign.total_days);
    updateCampaignDial(root, campaign.day_number, campaign.total_days);
    set(root,'footer-day',campaign.day_number == null ? 'UNKNOWN' : 'DAY ' + campaign.day_number);
    set(root,'phase',phase);
    set(root,'mission-name',missionTitle);
    set(root,'position',moduleTitle);
    set(root,'position-detail',[
      Number.isFinite(syllabus.completed) && Number.isFinite(syllabus.total) ? syllabus.completed + ' / ' + syllabus.total + ' syllabus topics' : null,
      position.dsa_solved == null ? null : position.dsa_solved + ' DSA problems'
    ].filter(Boolean).join(' · ') || 'No further position detail recorded');
    set(root,'gate',gate.name ? gate.name + ' · ' + date(gate.date) : 'UNKNOWN · no upcoming gate recorded');
    set(root,'bottleneck',position.biggest_bottleneck || 'UNKNOWN · the live coach state has no bottleneck');
    set(root,'bottleneck-note',position.biggest_bottleneck ? 'Current bottleneck from the original ORACLE coach.' : 'The original ORACLE has not supplied a bottleneck.');
    set(root,'action',task && task.title || 'UNKNOWN · no primary task in the live plan');
    set(root,'task-status',task ? statusOf(task) + (task.task_id ? ' · ' + task.task_id : '') : 'No canonical task is defined.');
    set(root,'why',task ? 'First task listed in the current original ORACLE day plan.' : 'UNKNOWN · no plan basis is available.');
    set(root,'success','UNKNOWN · the original plan has no structured success condition for this task.');
    set(root,'donot',campaign.applications_locked
      ? 'Applications are locked through ' + date(campaign.build_phase_end) + '. ' + (campaign.build_lock_note || '')
      : 'No explicit restriction is recorded in the live campaign state.');
    set(root,'impact','UNKNOWN · the canonical plan has no impact estimate.');
    set(root,'confidence','UNKNOWN · no validated recommendation is available.');
    const verifiedEvidence = Array.isArray(p.evidence) ? p.evidence.filter(item => item && item.verified === true) : [];
    set(root,'evidence',verifiedEvidence.length
      ? verifiedEvidence.map(item => item.label || item.evidence_id || 'Verified evidence').join(', ')
      : 'No verified evidence is attached to the current task.');
    set(root,'time',p.constraints && Number.isInteger(p.constraints.available_minutes)
      ? p.constraints.available_minutes + ' minutes recorded' : 'UNKNOWN · available time is not recorded');
    set(root,'horizon',gate.date ? date(gate.date, { day:'numeric', month:'short' }) : 'UNKNOWN');
    set(root,'syllabus',Number.isFinite(syllabus.completed) && Number.isFinite(syllabus.total) ? syllabus.completed + ' / ' + syllabus.total : 'UNKNOWN');
    set(root,'dsa',position.dsa_solved == null ? 'UNKNOWN' : position.dsa_solved);

    const days = Number.isFinite(campaign.total_days) ? campaign.total_days : null;
    const dayNumber = Number.isFinite(campaign.day_number) ? campaign.day_number : null;
    const fraction = days && dayNumber != null ? Math.max(0,Math.min(1,dayNumber / days)) : 0;
    const progress = root.querySelector('[data-f="progress-bar"]');
    if (progress) progress.style.width = (fraction * 100) + '%';
    set(root,'campaign-days',days == null ? 'UNKNOWN' : days);
    set(root,'campaign-summary',dayNumber == null || days == null ? 'Campaign position is unknown.' : 'Day ' + dayNumber + ' of ' + days + ' · ' + Math.max(0,days - dayNumber) + ' days remain in the recorded campaign.');
    set(root,'start-date',date(campaign.current_campaign_start || campaign.start_date));
    set(root,'today-point',dayNumber == null ? 'UNKNOWN' : 'DAY ' + dayNumber + ' · ' + date(campaign.date));
    set(root,'gate-date',gate.date ? date(gate.date) : 'UNKNOWN');
    set(root,'campaign-phase',phase);
    set(root,'phase-note',campaign.phase ? 'Phase label supplied by the original campaign plan.' : 'No phase label is available from the live plan.');
    set(root,'days-left',campaign.days_remaining == null ? '—' : campaign.days_remaining);
    set(root,'campaign-mission',missionTitle);
    set(root,'next-mission',p.next_mission && p.next_mission.title || 'UNKNOWN · no next mission recorded');
    const lock = root.querySelector('[data-f="lock-note"]');
    if (lock) {
      lock.textContent = campaign.applications_locked
        ? 'CAMPAIGN RULE · ' + (campaign.build_lock_note || ('Applications locked through ' + date(campaign.build_phase_end) + '.'))
        : 'No active application lock is recorded in the canonical campaign state.';
      lock.classList.toggle('is-locked',!!campaign.applications_locked);
    }

    set(root,'mission-title',missionTitle);
    set(root,'mission-phase',p.mission && p.mission.phase || 'Phase not specified in the original mission record.');
    set(root,'mission-task',task && task.title || 'No primary task is defined in the current mission.');
    set(root,'mission-task-status',task ? statusOf(task) : 'STATUS UNKNOWN');
    set(root,'task-id',task && task.task_id || 'UNKNOWN');
    set(root,'next-title',p.next_mission && p.next_mission.title || 'No next mission recorded');
    const nextTasks = root.querySelector('[data-f="next-tasks"]');
    if (nextTasks) {
      nextTasks.replaceChildren();
      const list = p.next_mission && Array.isArray(p.next_mission.tasks) ? p.next_mission.tasks : [];
      if (!list.length) nextTasks.textContent = 'No next tasks are available in the live projection.';
      else list.forEach(item => {
        const row = document.createElement('p');
        row.className = 'ox-next-task';
        row.textContent = (item.title || 'Untitled task') + ' · ' + statusOf(item);
        nextTasks.appendChild(row);
      });
    }

    const verified = root.querySelector('[data-f="verified-list"]');
    const claims = root.querySelector('[data-f="claims-list"]');
    if (verified) renderLedger(verified,Array.isArray(p.evidence) ? p.evidence.filter(item => item && item.verified === true) : [],'No verified evidence in the live packet.');
    if (claims) renderLedger(claims,Array.isArray(p.user_claims) ? p.user_claims : [],'No user claims in the live packet.',true);
    set(root,'unknown-proof',Array.isArray(p.evidence) && p.evidence.length
      ? 'Some evidence is present; verification state is shown at left.'
      : 'UNKNOWN · no evidence source is attached to the current task.');

    const external = p.external_intelligence || {};
    const signals = Array.isArray(external.live_market_signals) ? external.live_market_signals : [];
    set(root,'intel-status',signals.length ? 'LIVE SIGNALS PRESENT' : 'UNAVAILABLE');
    set(root,'intel-captured',external.captured_at ? 'CAPTURED ' + date(external.captured_at) : 'NO LIVE CAPTURE');
    set(root,'baseline-date',external.static_baseline && external.static_baseline.captured_at
      ? date(external.static_baseline.captured_at + '-01',{month:'long',year:'numeric'}).toUpperCase() : 'UNKNOWN');
    const signalList = root.querySelector('[data-f="signals-list"]');
    if (signalList) {
      signalList.replaceChildren();
      if (!signals.length) signalList.textContent = 'No live external signals in the canonical packet.';
      else signals.forEach(signal => {
        const row = document.createElement('article'); row.className = 'ox-signal';
        const title = document.createElement('h2'); title.textContent = signal.title || signal.signal_id || 'Untitled signal';
        const info = document.createElement('p'); info.textContent = [signal.source,signal.timestamp || signal.captured_at,signal.information].filter(Boolean).join(' · ') || 'Signal metadata incomplete.';
        row.append(title,info); signalList.appendChild(row);
      });
    }
    if (lastDecision) renderDecision(lastDecision);
  }
  function updateCampaignDial(root, dayNumber, totalDays) {
    const progress = root.querySelector('[data-oracle-dial-progress]');
    const marker = root.querySelector('[data-oracle-dial-marker]');
    const halo = root.querySelector('[data-oracle-dial-halo]');
    const ticks = root.querySelector('.ox-dial-ticks');
    if (!progress || !marker || !halo || !ticks) return;

    if (!ticks.childElementCount) {
      const svg = 'http://www.w3.org/2000/svg';
      for (let index = 0; index < 48; index += 1) {
        const angle = index * 7.5 - 90;
        const major = index % 4 === 0;
        const inner = major ? 137 : 141;
        const outer = 146;
        const radians = angle * Math.PI / 180;
        const line = document.createElementNS(svg, 'line');
        line.setAttribute('x1', String(180 + Math.cos(radians) * inner));
        line.setAttribute('y1', String(180 + Math.sin(radians) * inner));
        line.setAttribute('x2', String(180 + Math.cos(radians) * outer));
        line.setAttribute('y2', String(180 + Math.sin(radians) * outer));
        line.setAttribute('class', major ? 'ox-dial-tick ox-dial-tick-major' : 'ox-dial-tick');
        ticks.appendChild(line);
      }
    }

    const valid = Number.isFinite(dayNumber) && Number.isFinite(totalDays) && totalDays > 0;
    const fraction = valid ? Math.max(0, Math.min(1, dayNumber / totalDays)) : 0;
    const circumference = 2 * Math.PI * 150;
    progress.setAttribute('stroke-dasharray', String(circumference));
    const offset = circumference * (1 - fraction);
    if (progress.dataset.dialReady !== 'true') {
      progress.setAttribute('stroke-dashoffset', String(circumference));
      window.requestAnimationFrame(() => {
        progress.setAttribute('stroke-dashoffset', String(offset));
        progress.dataset.dialReady = 'true';
      });
    } else {
      progress.setAttribute('stroke-dashoffset', String(offset));
    }

    const angle = fraction * Math.PI * 2 - Math.PI / 2;
    const x = 180 + Math.cos(angle) * 150;
    const y = 180 + Math.sin(angle) * 150;
    marker.setAttribute('cx', String(x));
    marker.setAttribute('cy', String(y));
    halo.setAttribute('cx', String(x));
    halo.setAttribute('cy', String(y));
    root.classList.toggle('ox-dial-has-data', valid);
  }
  function animateStateChanges(previous, current) {
    const beforeTask = previous.mission && previous.mission.primary_task;
    const afterTask = current.mission && current.mission.primary_task;
    const changed = [];
    if ((previous.campaign || {}).day_number !== (current.campaign || {}).day_number) changed.push('[data-f="day-num"]');
    if ((previous.campaign || {}).phase !== (current.campaign || {}).phase) changed.push('[data-f="phase"]');
    if (!beforeTask || !afterTask || beforeTask.task_id !== afterTask.task_id || beforeTask.title !== afterTask.title || beforeTask.done !== afterTask.done) {
      changed.push('[data-f="action"]');
    }
    const root = document.getElementById('oracle-experience');
    if (!root) return;
    changed.forEach(selector => {
      const node = root.querySelector(selector);
      if (!node) return;
      node.classList.remove('ox-updated');
      void node.offsetWidth;
      node.classList.add('ox-updated');
      window.setTimeout(() => node.classList.remove('ox-updated'),700);
    });
  }
  function renderLedger(target, items, empty, claims) {
    target.replaceChildren();
    if (!items.length) { target.textContent = empty; return; }
    items.forEach(item => {
      const row = document.createElement('article'); row.className = 'ox-ledger-row';
      const title = document.createElement('strong'); title.textContent = item.label || item.text || item.evidence_id || item.claim_id || 'Untitled record';
      const meta = document.createElement('small');
      meta.textContent = claims
        ? 'CLAIMED · NOT VERIFIED' + (item.date ? ' · ' + date(item.date) : '') + (item.source ? ' · ' + item.source : '')
        : 'VERIFIED' + (item.verified_at ? ' · ' + date(item.verified_at) : '') + (item.source ? ' · ' + item.source : '');
      row.append(title,meta); target.appendChild(row);
    });
  }
  function decisionTarget() {
    return document.querySelector('#oracle-experience [data-f="decision-output"]');
  }
  function displayDecision(target, result) {
    if (!target) return;
    target.hidden = false;
    target.replaceChildren();
    const verdict = document.createElement('p');
    verdict.className = 'ox-verdict ox-verdict-' + String(result.verdict || 'unknown').toLowerCase();
    verdict.textContent = 'DETERMINISTIC VERDICT · ' + (result.verdict || 'UNKNOWN') + (result.mode === 'mock' ? ' · LOCAL MOCK' : '');
    target.appendChild(verdict);
    if (result.final_recommendation) {
      const recommendation = result.final_recommendation;
      const heading = document.createElement('h3'); heading.textContent = recommendation.primary_action || 'No action supplied'; target.appendChild(heading);
      [['WHY',recommendation.why],['SUCCESS',recommendation.success_condition],['DO NOT',Array.isArray(recommendation.do_not) ? recommendation.do_not.join(' ') : recommendation.do_not],['EXPECTED IMPACT',recommendation.expected_impact],['CONFIDENCE',recommendation.confidence == null ? null : String(recommendation.confidence)],['EVIDENCE',Array.isArray(recommendation.evidence_used) && recommendation.evidence_used.length ? recommendation.evidence_used.join(', ') : 'No evidence cited.']].forEach(([label,value]) => {
        const line = document.createElement('p'); line.className = 'ox-verdict-detail';
        const strong = document.createElement('strong'); strong.textContent = label;
        const text = document.createElement('span'); text.textContent = value || 'UNKNOWN';
        line.append(strong,text); target.appendChild(line);
      });
    }
    if (result.deterministic_validation && Array.isArray(result.deterministic_validation.checks)) {
      const details = document.createElement('details');
      const summary = document.createElement('summary'); summary.textContent = 'INSPECT DETERMINISTIC CHECKS';
      const pre = document.createElement('pre');
      pre.textContent = JSON.stringify({ checks:result.deterministic_validation.checks,modifications:result.modifications || [],audit_id:result.audit_id || null },null,2);
      details.append(summary,pre); target.appendChild(details);
    }
    if (result.verdict === 'ACCEPT' && result.audit_id) {
      const apply = document.createElement('button'); apply.className = 'ox-apply'; apply.type = 'button'; apply.textContent = 'RECORD ACCEPTED ACTION';
      apply.addEventListener('click',() => applyDecision(result.audit_id,apply)); target.appendChild(apply);
    }
  }
  function renderDecision(result) {
    lastDecision = result;
    const targets = document.querySelectorAll('#oracle-experience [data-f="decision-output"],#oracle-experience [data-f="ask-output"]');
    targets.forEach(target => displayDecision(target,result));
  }
  async function validateCurrentMove() {
    const task = packet && packet.mission && packet.mission.primary_task;
    const status = document.querySelector('#oracle-experience [data-f="decision-output"]');
    if (!task || typeof task.title !== 'string' || typeof task.task_id !== 'string') {
      if (status) { status.hidden = false; status.textContent = 'NEED_INFO · the live plan does not provide a canonical task identity.'; }
      return;
    }
    const question = 'Evaluate the current primary task in the live ORACLE plan as the next action. Use its exact task_id and title. Do not choose another task unless the canonical packet proves it is next. Identify every missing prerequisite, time constraint, or evidence item; do not infer unknown values.';
    await ask(question, status);
  }
  async function ask(question, target) {
    const root = document.getElementById('oracle-experience');
    const output = target || root.querySelector('[data-f="ask-output"]');
    const button = root.querySelector('[data-a="ask-form"] button[type="submit"]');
    if (!question) {
      const status = root.querySelector('[data-f="ask-status"]');
      if (status) status.textContent = 'Enter a question grounded in the live packet.';
      return;
    }
    if (button) button.disabled = true;
    const status = root.querySelector('[data-f="ask-status"]');
    if (status) status.textContent = 'Capturing and locking fresh ORACLE state…';
    if (output) { output.hidden = false; output.textContent = 'REQUEST IN PROGRESS'; }
    try {
      if (typeof window.oracleStatePacket !== 'function') throw new Error('Canonical ORACLE state is unavailable.');
      packet = window.oracleStatePacket();
      const saved = await window.oracleCapturePacket('decision-review');
      if (!saved) throw new Error('Packet lock/capture failed. Check API access, database, and token.');
      const response = await request('/api/ask','POST',{ question,packet,version:saved.version });
      if (!response.json) throw new Error('The server returned no JSON response.');
      if (!response.json.ok) throw new Error(response.json.error || 'Decision review failed.');
      lastDecision = response.json;
      render(packet);
      renderDecision(lastDecision);
      if (status) status.textContent = 'Review stored against packet version ' + saved.version + '.';
      await loadAudit();
    } catch (error) {
      if (output) { output.hidden = false; output.textContent = error.message || 'Decision review failed.'; }
      if (status) status.textContent = 'Review could not be completed.';
    } finally { if (button) button.disabled = false; }
  }
  async function applyDecision(recommendationId, button) {
    button.disabled = true;
    try {
      const decision = await request('/api/decision','POST',{ recommendation_id:recommendationId,action:'accepted' });
      if (decision.status !== 200) throw new Error(decision.json && decision.json.error || 'Decision event failed.');
      const applied = await request('/api/audit-applied','POST',{ recommendation_id:recommendationId });
      if (applied.status !== 200) throw new Error(applied.json && applied.json.error || 'Application event failed.');
      button.textContent = 'ACCEPTED · RECORDED';
      await loadAudit();
    } catch (error) { button.textContent = error.message || 'Could not record decision.'; }
    finally { button.disabled = false; }
  }
  async function loadAudit() {
    const target = document.querySelector('#oracle-experience [data-f="audit-list"]');
    if (!target) return;
    target.textContent = 'Loading audit records…';
    try {
      const result = await request('/api/audit');
      if (result.status !== 200 || !result.json || !result.json.ok) {
        target.textContent = result.json && result.json.error ? result.json.error : 'Audit history is unavailable; API access may be required.';
        return;
      }
      const items = Array.isArray(result.json.items) ? result.json.items : [];
      target.replaceChildren();
      if (!items.length) { target.textContent = 'No decisions have been recorded.'; return; }
      items.slice(0,8).forEach(item => {
        const row = document.createElement('article'); row.className = 'ox-audit-row';
        const head = document.createElement('div'); head.className = 'ox-audit-meta';
        const verdict = document.createElement('b'); verdict.textContent = item.final_verdict || 'UNKNOWN';
        const time = document.createElement('time'); time.textContent = item.timestamp ? date(item.timestamp) : 'Timestamp unknown';
        head.append(verdict,time);
        const question = document.createElement('p'); question.textContent = item.question || 'Question not recorded.';
        const id = document.createElement('small'); id.textContent = 'AUDIT ' + (item.id || 'ID UNKNOWN');
        row.append(head,question,id); target.appendChild(row);
      });
    } catch (_) { target.textContent = 'Audit history is unavailable.'; }
  }
  function saveToken() {
    const root = document.getElementById('oracle-experience');
    const input = root.querySelector('#ox-token-input');
    const status = root.querySelector('[data-f="token-status"]');
    const value = input.value.trim();
    if (!value) { status.textContent = 'Enter a token before saving.'; return; }
    try {
      localStorage.setItem(TOKEN_KEY,value);
      input.value = '';
      status.textContent = 'Token saved in this browser only.';
      if (typeof window.oracleConnect === 'function') window.oracleConnect();
    } catch (_) { status.textContent = 'This browser could not store the token.'; }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
