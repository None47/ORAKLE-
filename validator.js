/* Strict deterministic recommendation validator. */
'use strict';
function add(checks, check, status, detail) { checks.push({ check, status, detail }); }
function norm(value) { return String(value == null ? '' : value).trim().replace(/\s+/g, ' ').toLocaleLowerCase(); }
function validDate(value) { return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value + 'T00:00:00Z')); }
function appLike(text) {
  return /\b(apply|application|job portal|internship|internships|recruiter|referral|outreach|job opening|hiring process|submit (an )?application)\b/i.test(text || '');
}
function allDone(tasks) { return Array.isArray(tasks) && tasks.length > 0 && tasks.every(t => t && t.done === true); }

function validateRecommendation(packet, rec, context = {}) {
  const checks = [];
  const modifications = [];
  let verdict = 'ACCEPT';
  let selected = null;
  let selectedMission = packet && packet.mission;
  const fail = (name, text) => add(checks, name, 'FAIL', text);
  const need = (name, text) => add(checks, name, 'NEED_INFO', text);
  const pass = (name, text) => add(checks, name, 'PASS', text);

  if (!packet || packet.schema !== 'oracle.state.v1') {
    need('canonical_packet', 'Canonical ORACLE packet is missing or malformed.');
    return { verdict: 'NEED_INFO', checks, modifications, final_recommendation: null };
  }

  const campaign = packet.campaign || {};
  if (!campaign.date || !campaign.phase || !packet.mission) need('campaign_phase', 'Campaign phase or current mission is missing.');
  else pass('campaign_phase', campaign.phase + ' on ' + campaign.date);

  const buildStart = campaign.current_campaign_start;
  const buildEnd = campaign.build_phase_end;
  const inBuildDates = validDate(campaign.date) && validDate(buildStart) && validDate(buildEnd)
    && campaign.date >= buildStart && campaign.date <= buildEnd;
  const buildActive = inBuildDates && /build/i.test(campaign.phase || '');
  if (campaign.applications_locked !== buildActive) fail('build_lock_state', 'Packet application-lock flag disagrees with original campaign dates and phase.');
  else pass('build_lock_state', buildActive ? 'Original campaign dates lock applications during BUILD.' : 'Applications are not locked by current campaign phase.');

  const currentTasks = packet.mission && packet.mission.all_tasks;
  const nextTasks = packet.next_mission && packet.next_mission.tasks;
  if (!Array.isArray(currentTasks)) need('canonical_tasks', 'Current original-plan task list is missing.');
  if (!rec || typeof rec.task_id !== 'string' || !rec.task_id.trim()) {
    need('task_identity', 'Recommendation must identify one canonical task_id.');
  } else {
    selected = Array.isArray(currentTasks) ? currentTasks.find(t => t && t.task_id === rec.task_id) : null;
    if (!selected && allDone(currentTasks) && Array.isArray(nextTasks)) {
      selected = nextTasks.find(t => t && t.task_id === rec.task_id) || null;
      if (selected) selectedMission = packet.next_mission;
    }
    if (!selected && !Array.isArray(currentTasks)) need('task_identity', 'Current mission tasks are unavailable; task identity cannot be checked.');
    else if (!selected) fail('task_identity', 'task_id does not identify an available task in the current mission or a valid next mission.');
    else pass('task_identity', 'task_id exactly matches ' + selected.task_id);
  }

  if (selected) {
    const isNext = selectedMission === packet.next_mission;
    if (isNext && !allDone(currentTasks)) fail('mission_transition', 'A next-mission task cannot be selected until every current-mission task is complete.');
    else if (isNext) pass('mission_transition', 'Current mission is complete; the identified task belongs to the next mission.');
    if (selected.done === true) fail('completion_state', 'The selected canonical task is already complete.');
    else if (selected.done === false) pass('completion_state', 'The selected task is explicitly incomplete in original ORACLE state.');
    else need('completion_state', 'The selected task completion state is unknown and remains null.');
    if (typeof rec.primary_action !== 'string' || norm(rec.primary_action) !== norm(selected.title))
      fail('task_action_match', 'primary_action must exactly match the canonical task title for the supplied task_id.');
    else pass('task_action_match', 'Action text exactly matches its canonical task.');

    if (selected.mission_id && selected.mission_id !== selectedMission.id)
      fail('mission_alignment', 'Selected task mission_id does not match the canonical mission.');
    else if (!selected.mission_id) need('mission_alignment', 'Canonical task has no mission_id.');
    else pass('mission_alignment', 'Selected task is attached to its canonical mission.');

    if (!Array.isArray(selected.prerequisites)) need('prerequisites', 'Original ORACLE does not define prerequisites for this task.');
    else {
      let blocked = false, unknown = false;
      for (const prereqId of selected.prerequisites) {
        const prereq = [...(currentTasks || []), ...(nextTasks || [])].find(t => t && t.task_id === prereqId);
        if (!prereq) unknown = true;
        else if (prereq.done === false) blocked = true;
        else if (prereq.done !== true) unknown = true;
      }
      if (blocked) fail('prerequisites', 'At least one required prerequisite is explicitly incomplete.');
      else if (unknown) need('prerequisites', 'At least one prerequisite is not verified complete.');
      else pass('prerequisites', 'All listed prerequisites are complete.');
    }
  }

  const duplicated = Array.isArray(currentTasks) && currentTasks.filter(t => t && t.task_id !== rec.task_id && norm(t.title) === norm(rec.primary_action)).length > 0;
  if (duplicated) fail('duplicate_action', 'Action text duplicates a different canonical task.');
  else if (selected) pass('duplicate_action', 'No duplicate canonical task title.');
  const prior = (context.priorRecommendations || []).some(x => x && x.task_id === rec.task_id && x.verdict === 'ACCEPT');
  if (prior) fail('duplicate_decision', 'The same task already has an accepted recommendation.');

  if (buildActive && appLike(rec.primary_action)) fail('application_lock', 'Application-related recommendations are rejected during the original BUILD lock.');
  else pass('application_lock', buildActive ? 'No application action during BUILD.' : 'No active BUILD application restriction.');

  const available = packet.constraints && packet.constraints.available_minutes;
  if (!Number.isInteger(available) || available <= 0) need('available_time', 'Available time is unknown or ambiguous; no minutes are inferred.');
  else if (!Number.isInteger(rec.minutes)) need('available_time', 'Recommendation minutes must be an integer.');
  else if (rec.minutes > available) {
    modifications.push({ field: 'minutes', from: rec.minutes, to: available, rule: 'cap_to_verified_available_time' });
    pass('available_time', 'Recommendation was capped to the verified available time.');
  } else pass('available_time', rec.minutes + ' minutes fit within ' + available + ' available minutes.');

  const deadlines = packet.constraints && packet.constraints.deadlines;
  if (!Array.isArray(deadlines)) need('deadlines', 'Canonical deadline list is unavailable.');
  else {
    const invalid = deadlines.some(d => !d || !validDate(d.date));
    if (invalid) need('deadlines', 'At least one original deadline has an invalid or unknown date.');
    else {
      const today = validDate(campaign.date) ? Date.parse(campaign.date + 'T00:00:00Z') : NaN;
      const urgent = deadlines.filter(d => Date.parse(d.date + 'T00:00:00Z') >= today && Date.parse(d.date + 'T00:00:00Z') - today <= 48 * 3600000);
      if (urgent.length) add(checks, 'deadlines', 'WARN', 'Campaign deadline(s) within 48 hours: ' + urgent.map(d => d.label).join(', '));
      else pass('deadlines', 'No recorded campaign deadline within 48 hours.');
    }
  }

  const evidence = Array.isArray(packet.evidence) ? packet.evidence : [];
  const evidenceIds = new Set(evidence.filter(x => x && x.verified === true).map(x => x.evidence_id));
  for (const id of rec.evidence_used || []) {
    if (!evidenceIds.has(id)) fail('evidence_grounding', 'Evidence reference is absent or not verified: ' + id);
  }
  if (!(rec.evidence_used || []).length) pass('evidence_grounding', 'No evidence claim was made.');
  else if ((rec.evidence_used || []).every(id => evidenceIds.has(id))) pass('evidence_grounding', 'Every evidence reference is verified in the canonical packet.');

  const external = packet.external_intelligence || {};
  const signals = [
    ...(external.live_market_signals || []), ...(external.live_internship_openings || []),
    ...(external.live_hiring_activity || [])
  ];
  const signalIds = new Set(signals.filter(x => x && x.verified === true).map(x => x.signal_id));
  for (const id of rec.market_signals_used || []) {
    if (!signalIds.has(id)) fail('market_grounding', 'Market signal is absent or not verified: ' + id);
  }
  if (!(rec.market_signals_used || []).length) pass('market_grounding', 'No market signal was claimed.');
  else if ((rec.market_signals_used || []).every(id => signalIds.has(id))) pass('market_grounding', 'Every market signal is verified in the canonical packet.');

  if (checks.some(c => c.status === 'FAIL')) verdict = 'REJECT';
  else if (checks.some(c => c.status === 'NEED_INFO')) verdict = 'NEED_INFO';
  else if (checks.some(c => c.status === 'WARN') || modifications.length) verdict = 'MODIFY';
  const final = Object.assign({}, rec);
  if (modifications.length) final.minutes = modifications[modifications.length - 1].to;
  return { verdict, checks, modifications, final_recommendation: final };
}
module.exports = { validateRecommendation, appLike, norm, validDate };
