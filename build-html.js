#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
function option(name, fallback) {
  const at = args.indexOf(name);
  return at >= 0 && args[at + 1] ? path.resolve(args[at + 1]) : fallback;
}
const SOURCE = option('--source', path.join(ROOT, 'Oracle Final Corrected Locked.html'));
const DEST = option('--out', path.join(ROOT, 'index.html'));

const sourceBridge = String.raw`
/* The single canonical projection lives beside the original ORACLE state and calls its existing engine. */
window.oracleStatePacket = function () {
  const now = new Date();
  const T = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(T.getTime() + MS);
  const plan = planFor(T);
  const nextPlan = planFor(tomorrow);
  const dateKey = iso(T);
  const rec = AP.days[dateKey] || {};
  /* The original live-day UI renders an absent checklist key as an unchecked box.
     Treat that specific current-day control as incomplete; malformed stored values stay unknown. */
  const originalCheckbox = (state, key, missingIsUnchecked) => {
    if (state == null) return missingIsUnchecked ? false : null;
    if (typeof state !== 'object' || Array.isArray(state)) return null;
    if (!Object.prototype.hasOwnProperty.call(state, key)) return missingIsUnchecked ? false : null;
    return typeof state[key] === 'boolean' ? state[key] : null;
  };
  const currentTaskDone = (index) => originalCheckbox(rec.t, index === 0 ? 'm' : String(index - 1), true);
  const gates = eGates();
  const currentGate = gates.find(g => g.d >= T) || gates[gates.length - 1] || null;
  const curModule = activeModule();
  const syllabus = syllCounts();
  const planTasks = (plan.list || []).map((title, i) => {
    const done = currentTaskDone(i);
    return { task_id: 'plan:' + dateKey + ':' + i, title, done,
      mission_id: plan.th || plan.ph || null, source: 'original-plan',
      prerequisites: null, deadline: null };
  });
  const customTasks = (USER.tasks[dateKey] || []).map((task, i) => {
    let done = null;
    if (task && typeof task === 'object') {
      if (typeof task.done === 'boolean') done = task.done;
      else if (!Object.prototype.hasOwnProperty.call(task, 'done')) done = false;
    }
    return {
      task_id: 'user:' + dateKey + ':' + i,
      title: task && typeof task.t === 'string' ? task.t : null,
      done,
      mission_id: plan.th || plan.ph || null,
      source: 'original-user-task',
      prerequisites: null, deadline: null
    };
  });
  const allTasks = planTasks.concat(customTasks);
  const nextTasks = (nextPlan.list || []).map((title, i) => {
    const nextKey = iso(tomorrow);
    const nextRec = AP.days[nextKey] || {};
    const done = originalCheckbox(nextRec.t, i === 0 ? 'm' : String(i - 1), false);
    return { task_id: 'plan:' + nextKey + ':' + i, title, done,
      mission_id: nextPlan.th || nextPlan.ph || null, source: 'original-plan',
      prerequisites: null, deadline: null };
  });
  const applicationsLocked = !!(BUILD_PHASE.active && T >= CURRENT_CAMPAIGN_START && T <= BUILD_PHASE_END);
  const deadlineRows = eDLs().map(x => ({ label: x[0], date: x[1] }));
  const dsaRaw = LS.getItem('oracle_dsa');
  const dsaSolved = dsaRaw === null ? null : (Number.isInteger(Number(dsaRaw)) ? Number(dsaRaw) : null);
  const coach = typeof computeCoach === 'function' ? computeCoach(T) : null;
  return {
    schema: 'oracle.state.v1',
    source: { type: 'live-original-oracle', generated_at: now.toISOString(),
      state: 'browser-localStorage', snapshot_only_on_server: true },
    campaign: {
      start_date: iso(START), current_campaign_start: iso(CURRENT_CAMPAIGN_START),
      build_phase_end: iso(BUILD_PHASE_END), total_days: TOTAL, date: iso(T),
      day_number: dd(START, T) + 1, phase: plan.ph || null, week_title: plan.th || null,
      days_remaining: TOTAL - (dd(START, T) + 1),
      applications_locked: applicationsLocked,
      build_lock_note: applicationsLocked ? BUILD_PHASE.note : null
    },
    gate: currentGate ? {
      id: currentGate.n || null, name: currentGate.full || currentGate.n || null,
      date: iso(currentGate.d), why: currentGate.why || null, source: currentGate.src || null
    } : null,
    mission: {
      id: plan.th || plan.ph || null, title: plan.th || null,
      phase: plan.ph || null, primary_task: planTasks[0] || null,
      tasks: planTasks, custom_tasks: customTasks, all_tasks: allTasks
    },
    next_mission: {
      id: nextPlan.th || nextPlan.ph || null, title: nextPlan.th || null,
      phase: nextPlan.ph || null, tasks: nextTasks
    },
    position: {
      active_module: curModule ? { id: curModule.id, title: curModule.t || null,
        deadline: curModule.dl || null } : null,
      syllabus: { completed: syllabus.done, total: syllabus.tot },
      dsa_solved: dsaSolved,
      streak_days: typeof streak === 'function' ? streak() : null,
      blocks_today: Array.isArray(rec.blocks) ? rec.blocks.length : 0,
      minutes_today: Array.isArray(rec.blocks)
        ? rec.blocks.reduce((sum, block) => sum + (Number.isFinite(block.mins) ? block.mins : 0), 0) : 0,
      biggest_bottleneck: typeof coach === 'string' && coach.trim() ? coach : null
    },
    constraints: {
      available_minutes: null, available_time_status: 'UNKNOWN',
      available_time_source: null, deadlines: deadlineRows,
      prerequisites_status: 'NOT_DEFINED_BY_ORIGINAL_PLAN'
    },
    evidence: [],
    user_claims: (USER.wins || []).slice(-20).map((w, i) => ({
      claim_id: 'win:' + dateKey + ':' + i, text: w.t || null, date: w.d || null,
      verified: false, source: 'original-user-win-log'
    })),
    external_intelligence: {
      status: 'unavailable', live_market_signals: [], live_internship_openings: [],
      live_hiring_activity: [], captured_at: null,
      static_baseline: { captured_at: '2026-07', current: false }
    }
  };
};
`;

function fail(message) { console.error('FATAL: ' + message); process.exit(2); }
if (!fs.existsSync(SOURCE)) fail('source not found: ' + SOURCE);
const original = fs.readFileSync(SOURCE, 'utf8');
if (!original.trimStart().toLowerCase().startsWith('<!doctype html')) fail('source is not a complete HTML document');
if (!original.trimEnd().toLowerCase().endsWith('</html>')) fail('source is truncated');
if ((original.match(/<script\b/gi) || []).length !== 1) fail('expected exactly one original inline script block');
if (/oracleStatePacket\s*=/.test(original)) fail('source already contains a canonical projection');
const scriptEnd = original.toLowerCase().lastIndexOf('</script>');
const bodyEnd = original.toLowerCase().lastIndexOf('</body>');
const headEnd = original.toLowerCase().lastIndexOf('</head>');
if (scriptEnd < 0 || bodyEnd < 0 || headEnd < 0) fail('source is missing a required HTML boundary');
let built = original.slice(0, scriptEnd) + sourceBridge + '\n' + original.slice(scriptEnd);
built = built.replace(/<title>[\s\S]*?<\/title>/i, '<title>ORACLE — Personal Intelligence System</title>');
built = built.replaceAll('ORACLE — AI Engineering OS · Goutham · Summer 2027', 'ORACLE — Personal Intelligence System');
built = built.replace(/<meta\s+name="description"\s+content="[^"]*">/i,
  '<meta name="description" content="A private execution and decision intelligence system, grounded in the live ORACLE campaign.">');
 built = built.replace(/<meta\s+name="theme-color"\s+content="[^"]*">/i,
  '<meta name="theme-color" content="#f1eee5">');
const bodyTag = built.match(/<body\b[^>]*>/i);
if (!bodyTag) fail('source is missing its body element');
const experienceBodyTag = /\bclass\s*=/.test(bodyTag[0])
  ? bodyTag[0].replace(/class=(['"])(.*?)\1/i, (full, quote, value) => 'class=' + quote + (value + ' oracle-experience-mode').trim() + quote)
  : bodyTag[0].replace(/>$/, ' class="oracle-experience-mode">');
built = built.replace(bodyTag[0], experienceBodyTag);
const styleTag = '<link rel="stylesheet" href="/oracle-styles.css">';
if (!built.includes(styleTag)) {
  const h = built.toLowerCase().lastIndexOf('</head>');
  built = built.slice(0, h) + styleTag + '\n' + built.slice(h);
}
const scripts = '<script src="/oracle-intel.js"></script>\n<script src="/oracle-ui.js"></script>\n';
const b = built.toLowerCase().lastIndexOf('</body>');
built = built.slice(0, b) + scripts + built.slice(b);
fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.writeFileSync(DEST, built);
const checks = [
  ['original source retained', built.includes(sourceBridge)],
  ['one stylesheet integration', (built.match(/href="\/oracle-styles\.css"/g) || []).length === 1],
  ['one intelligence client', (built.match(/src="\/oracle-intel\.js"/g) || []).length === 1],
  ['one UI client', (built.match(/src="\/oracle-ui\.js"/g) || []).length === 1],
  ['canonical projection is inside original script scope', built.indexOf('window.oracleStatePacket = function') < built.indexOf('</script>')],
  ['one canonical projection in generated HTML', (built.match(/window\.oracleStatePacket\s*=\s*function/g) || []).length === 1],
  ['experience is the opening surface', /<body[^>]*class="[^"]*oracle-experience-mode/.test(built)],
  ['no server implementation in browser page', !/http\.createServer|server\.listen/.test(built)]
];
console.log('Built ' + path.relative(ROOT, DEST) + ' from ' + path.relative(ROOT, SOURCE));
for (const [name, pass] of checks) console.log((pass ? 'PASS ' : 'FAIL ') + name);
if (checks.some(([, pass]) => !pass)) process.exit(1);
