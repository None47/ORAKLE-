
/* Safe storage — survives private mode / blocked storage with in-memory fallback */
const LS=(()=>{try{const t=window["localStorage"];t.setItem('__t','1');t.removeItem('__t');return t;}
 catch(e){const m={};return{getItem:k=>k in m?m[k]:null,setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]}};}})();
function toast(msg){const t=document.createElement('div');t.className='toast';t.innerHTML=msg;
 document.getElementById('toasts').appendChild(t);setTimeout(()=>t.remove(),3100);}

/* ================= DATA — extracted verbatim from your files ================= */
const WEEKS = {"weeks": [{"s": "2026-07-20", "ph": "RAMP", "th": "Day 1 \u2014 see the destination, then reboot Python", "d": {"1": ["(pre-flight) Rest. Autopilot begins Wednesday Jul 22."], "2": ["(pre-flight) Optional: create Google account access to Colab. Nothing else."], "3": ["DAY 1: Colab \u2192 upload 'P1 Transformer' notebook \u2192 Runtime>Run all \u2192 WATCH it learn", "GitHub profile: photo, bio 'AI Engineering @ VTU, Batch 2028'", "Email/message college SIH SPOC: ask internal hackathon date"], "4": ["Python reboot 1: variables, strings, lists \u2014 type everything, no copy-paste", "New repo 'python-reboot' on GitHub, push today's file", "Anki: install + 5 cards from today"], "5": ["Python reboot 2: dicts, loops, functions \u2014 build a word-counter on any text file", "Push (commit = green square)", "Handbook \u00a72 (Core Thesis) \u2014 10 min only"], "6": ["Python reboot 3: read files \u2014 count Shakespeare's most common words (Colab data)", "Longer block if flowing (cap 4 hr)"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-07-27", "ph": "RAMP", "th": "Python week 2 \u2014 classes, files, tests", "d": {"1": ["Python: functions deeply \u2014 write 5 small exercises you invent yourself", "DSA: 2 easy array problems \u2014 struggling is the work", "Anki 10 min"], "2": ["Python: classes \u2014 build a Flashcard class (question, answer, review())", "Push to GitHub", "Anki + first DSA pattern cards"], "3": ["Python: files \u2014 tiny journal CLI (add entry, list entries)", "DSA: 2 easy (hash map)", "Follow up SIH SPOC if silent"], "4": ["pytest: write 3 tests for Flashcard \u2014 tests are a superpower", "Push", "Anki"], "5": ["Mini-project: flashcard CLI with save-to-file decks", "DSA: 2 easy", "Handbook \u00a716 (Python craft) \u2014 10 min"], "6": ["Polish flashcard CLI + 5-line README + push", "Optional: rerun Colab notebook, read attention comments"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-08-03", "ph": "RAMP", "th": "P1 starts \u2014 the tokenizer is yours", "d": {"1": ["p1-transformer repo: read tokenizer.py line by line, explain each line ALOUD in English", "pytest \u2192 green. Commit 'read + understood tokenizer'", "DSA: 2 easy"], "2": ["Delete tokenizer.py. Rebuild from memory. Peek only after 10+ min stuck", "Tests green \u2192 commit 'tokenizer from memory'", "Anki: stoi/itos/encode/decode cards"], "3": ["dataset.py aloud: what is x, what is y, why shifted one? 5 lines in DECISIONS.md", "DSA: 2 (two-pointer)", "Karpathy 'Let's build GPT': first 20 min ONLY, build-alongside"], "4": ["Rebuild get_batch from memory. Print shapes to verify", "Commit", "Anki"], "5": ["Scratch file: load corpus, print vocab, play with encode/decode", "DSA: 2 easy", "Karpathy: next 20 min"], "6": ["Buffer: whatever slipped (something did \u2014 \u00d72 rule)", "SIH: team formation started? (6 ppl, \u22651 female)"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-08-10", "ph": "RAMP", "th": "P1 \u2014 bigram + SIH window", "d": {"1": ["model.py: read GPT class with \u00a721.1 open, annotate every line", "DSA: 2 easy", "Anki"], "2": ["Train bigram-only version \u2014 watch loss fall, log numbers in DECISIONS.md", "Commit", "Karpathy: 20 min"], "3": ["Attention on PAPER: Q\u00b7K\u00b7V for 3 tokens by hand, one softmax by hand", "DSA: 2 (sliding window)", "Anki"], "4": ["SIH internal hackathon window \u2014 if scheduled it OUTRANKS P1 (Rule 1). Else reread Head.forward hints", "Anki"], "5": ["Implement Head.forward (the 4 lines). Run train.py. Errors = the real learning", "Commit 'attention works' \u2014 MILESTONE. Celebrate deliberately"], "6": ["Attention worked \u2192 generate + save samples. Didn't \u2192 debug with \u00a728 table", "SIH team sync"], "0": ["Log the week in DECISIONS.md \u2014 it becomes your write-up", "Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-08-17", "ph": "RAMP", "th": "P1 \u2014 full model training", "d": {"1": ["Full training run on Colab GPU: log train/val loss every 300 iters", "DSA: 2 (binary search)", "Anki"], "2": ["Tune: lr 10x up, 10x down \u2014 one run each, write what happened", "Commit", "Karpathy: 20 min"], "3": ["Vaswani paper \u00a71-3 (skim math, get the shape), 1-page note", "DSA: 2", "Anki"], "4": ["Add temperature + top-k to generate(). Compare 0.5/0.8/1.2", "Commit + save samples"], "5": ["README 'Results': loss curve screenshot + best samples", "DSA: 2 (trees)"], "6": ["Hyperfocus block (cap 6h): push toward val < 1.8. Recovery half-day after", "SIH status check"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-08-24", "ph": "RAMP", "th": "P1 \u2014 BPE + pack for Bangalore", "d": {"1": ["minbpe study 30 min \u2192 start YOUR bpe.py: train merges on corpus", "DSA: 2", "Anki"], "2": ["Finish BPE encode/decode + 3 tests. Commit", "Karpathy tokenizer video: 20 min"], "3": ["Swap char\u2192BPE in training. Compare loss curves, log it", "DSA: 2"], "4": ["Buffer: BPE always overruns. Finish + commit", "Anki"], "5": ["DECISIONS.md ramp summary: built, broke, learned", "Pack for semester"], "6": ["Travel/settle buffer \u2014 MVS only (1 commit)", "Bangalore desk setup: desk = code only"], "0": ["Book 3 Focusmate slots for next week \u2014 college template starts", "Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-08-31", "ph": "PHASE 1", "th": "Semester starts \u2014 college template", "d": {"1": ["06-08 deep block: RoPE \u2014 read 15 min, implement rotary embeddings", "College (mandatory only)", "Body double 16:30: DSA 1 medium attempt + Anki"], "2": ["Deep block: RoPE debugging (shapes will fight \u2014 normal)", "Body double: DSA 1 medium", "Anki"], "3": ["Deep block: ablation \u2014 RoPE vs learned positions, log both", "College", "DSA 1 medium"], "4": ["Deep block: pick winner, clean model.py, commit", "DSA + 20 min: list your 6+ backlog subjects + Dec exam dates", "Anki"], "5": ["Deep block: long run toward val<1.5 (leave training, study meanwhile)", "DSA 1 medium", "SIH nominations close ~early Sep \u2014 verify status TODAY"], "6": ["Longer block: repo quality pass \u2014 clean modules, one-command README", "College catch-up"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-09-07", "ph": "PHASE 1", "th": "P1 write-up \u2014 not done until published", "d": {"1": ["Deep block: write-up outline + intro (45/15, body-double writing)", "College", "DSA 1 medium + Anki"], "2": ["Deep block: architecture section \u2014 teach a 12-year-old", "Body double: DSA", "Anki"], "3": ["Deep block: training-dynamics from DECISIONS.md (debug story = best part)", "College", "DSA 1 medium"], "4": ["Deep block: results + 'what I'd do differently' \u2014 full draft", "Body double: DSA", "Anki"], "5": ["Blog setup (GitHub Pages, 1 hr MAX \u2014 no theme rabbit hole)", "DSA 1 medium", "Karpathy: finish remainder"], "6": ["Edit pass: cut 20%, verify EVERY number (\u00a729 headline rule)", "College catch-up"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-09-14", "ph": "PHASE 1", "th": "Ship P1 publicly", "d": {"1": ["PUBLISH P1 write-up. Cross-post LinkedIn + X. Pin repo", "College", "DSA 1 medium + Anki"], "2": ["Resume rebuild (Appendix D): 1 page, projects 50%+, P1 with links", "Body double: DSA", "Anki"], "3": ["LinkedIn rebuild: headline, about, P1 featured", "College", "DSA 1 medium"], "4": ["GitHub profile README \u2014 pass the founder 10-min test", "Body double: DSA", "Anki"], "5": ["Fix anything from a friend's 5-min founder-test look", "DSA 1 medium"], "6": ["OSS rung 1: read nanoGPT end-to-end + half-page note", "College catch-up"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-09-21", "ph": "PHASE 1", "th": "Gate-1 buffer \u2014 start P3", "d": {"1": ["Deep block: P3 corpus choice (1000+ real docs) + design in DECISIONS.md", "College", "DSA 1 medium + Anki"], "2": ["Deep block: P3 repo scaffold: folders, README plan", "Body double: DSA", "Anki"], "3": ["Deep block: chunking v1 \u2014 512-token chunks with overlap", "College", "DSA 1 medium"], "4": ["Deep block: embeddings v1 \u2014 bge-small on 100 chunks, sanity-check similarity", "Body double: DSA", "Anki"], "5": ["Deep block: vector store (Chroma) + first retrieval query end-to-end", "DSA 1 medium"], "6": ["Longer block: retrieval quality pass \u2014 5 queries, eyeball, log misses", "College catch-up"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-09-28", "ph": "PHASE 1", "th": "Wave 1 opens \u2014 apply in parallel", "d": {"1": ["Deep block: P3 generation v1 \u2014 quantized small model, first RAG answers", "College", "DSA 1 medium + Anki"], "2": ["Deep block: P3 iteration", "Wave 1: list 15 big-tech postings whose stated criteria you MEET", "Anki"], "3": ["Deep block: P3", "College", "DSA 1 medium"], "4": ["Deep block: P3", "Body double: 3 portal apps + 2 outreaches (Appendix D template)", "Anki"], "5": ["Deep block: P3", "DSA 1 medium", "Backlog prep 60 min begins (Dec cycle)"], "6": ["Longer block: P3 demo v0 (Streamlit local)", "College catch-up"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-10-05", "ph": "BUILD PHASE", "th": "BUILD \u2014 P1 + fundamentals. Applications locked.", "d": {"1": ["CURRENT CAMPAIGN STATE: DAY 1 \u2014 STARTED OCT 7, 2026 \u2014 BUILD PHASE \u2014 Python \u2192 blank-file competence rebuild (variables, collections, control flow, loops, functions, basic debugging)", "No applications \u2014 BUILD PHASE", "Health + necessary academics only"], "2": ["DAY 2 \u2014 Oct 8: Python blank-file drills \u2014 unfamiliar basic problems, no references", "Remediation: targeted cycle \u2192 retest \u2192 continue exact gap", "DSA 1 easy + Anki (parallel, not blocking)"], "3": ["Python: collections + control flow + loops \u2014 blank-file", "P1 repo: scaffold + first commit", "DSA 1 easy"], "4": ["Python: functions + debugging \u2014 blank-file + traceback narration", "NumPy shape/broadcast kata if gap exposed", "College (mandatory only)"], "5": ["Python gate: demonstrated blank-file capability \u2014 retest gate", "Pandas DataFrames/Filtering/Groupby if Classical ML gap exposed", "Health"], "6": ["Buffer: repair exact gap only, never restart whole stage", "Anki + 1 commit", "REST \u2014 hobby, walk, music. Protected."], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing \u2014 BUILD PHASE check: applications locked?", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-10-12", "ph": "BUILD PHASE", "th": "BUILD \u2014 P1 + fundamentals. Applications locked. (Original: \ud83c\udfc1 GATE 1 \u2192 Phase 2)", "d": {"1": ["BUILD: Final gate polish \u2014 Applications locked until Nov 6", "College", "DSA 1 medium + Anki"], "2": ["Gate spillover buffer", "BUILD: P1 deep block \u2014 fundamentals only, no applications (quarantined)", "Anki"], "3": ["BUILD: \ud83c\udfc1 GATE 1 (Oct 15): verify all. Cleared \u2192 CELEBRATE. Missed \u2192 ladder \u00a712.6, slide, never compress \u2014 Applications locked until Nov 6", "No new work today"], "4": ["Phase 2: P3 \u00a72 vector store + retrieval hardening", "BUILD: P1 deep block \u2014 fundamentals only, no applications (quarantined)", "Anki"], "5": ["BUILD: P3 \u00a72 \u2014 Applications locked until Nov 6", "DSA 1 medium", "Backlog 60 min"], "6": ["BUILD: Longer: retrieval done end-to-end \u2014 Applications locked until Nov 6", "OSS rung 2: pick repo (AI4Bharat/vLLM), find small issue"], "0": ["BUILD: Weekly review 30 min (5 questions, by hand) + set next week's ONE thing \u2014 Applications locked until Nov 6", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-10-19", "ph": "BUILD PHASE", "th": "BUILD \u2014 P1 + fundamentals. Applications locked. (Original: P3 \u00a73 \u2014 eval harness (the differentiator))", "d": {"1": ["BUILD: Gold set: write 15 of 50 Q&A pairs \u2014 Applications locked until Nov 6", "College", "DSA 1 medium + Anki"], "2": ["15 more gold Q&A", "BUILD: P1 deep block \u2014 fundamentals only, no applications (quarantined)", "Anki"], "3": ["BUILD: 20 more (50 done) \u2014 Applications locked until Nov 6", "College", "DSA 1 medium"], "4": ["recall@k metric \u2192 first baseline number!", "BUILD: P1 deep block \u2014 fundamentals only, no applications (quarantined)", "Backlog 60 min"], "5": ["BUILD: faithfulness + relevance (ragas or custom) \u2014 Applications locked until Nov 6", "DSA 1 medium"], "6": ["BUILD: Full baseline eval run \u2014 ALL numbers in DECISIONS.md \u2014 Applications locked until Nov 6", "College catch-up"], "0": ["BUILD: Weekly review 30 min (5 questions, by hand) + set next week's ONE thing \u2014 Applications locked until Nov 6", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-10-26", "ph": "BUILD PHASE", "th": "BUILD \u2014 P1 + fundamentals. Applications locked. (Original: P3 \u00a74 \u2014 improve and PROVE it)", "d": {"1": ["BUILD: Pick ONE improvement, hypothesis in DECISIONS.md \u2014 Applications locked until Nov 6", "College", "DSA 1 medium + Anki"], "2": ["Implement it", "BUILD: P1 deep block \u2014 fundamentals only, no applications (quarantined)", "Anki"], "3": ["BUILD: Re-run eval \u2014 quantify the delta. THIS number is your interview story \u2014 Applications locked until Nov 6", "College", "DSA 1 medium"], "4": ["Second iteration or harden", "BUILD: P1 deep block \u2014 fundamentals only, no applications (quarantined)", "Backlog 60 min"], "5": ["BUILD: P3 buffer \u2014 Applications locked until Nov 6", "DSA 1 medium"], "6": ["BUILD: OSS rung 2: open first small PR (doc/test fix) \u2014 learn the workflow \u2014 Applications locked until Nov 6", "College catch-up"], "0": ["BUILD: Weekly review 30 min (5 questions, by hand) + set next week's ONE thing \u2014 Applications locked until Nov 6", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-11-02", "ph": "BUILD PHASE", "th": "BUILD \u2014 P1 + fundamentals. Applications locked. (Original: P3 \u00a75 \u2014 deploy)", "d": {"1": ["BUILD: Backend-min: FastAPI wrapper \u2014 Applications locked until Nov 6", "College", "DSA 1 + Anki + Backlog 60 min"], "2": ["Streamlit demo UI", "BUILD: P1 deep block \u2014 fundamentals only, no applications (quarantined)", "Backlog 60 min"], "3": ["BUILD: Deploy Railway/Render \u2014 public URL \u2014 Applications locked until Nov 6", "College", "DSA 1 + Backlog 60 min"], "4": ["Demo hardening (deploy breaks things \u2014 normal)", "BUILD: P1 deep block \u2014 fundamentals only, no applications (quarantined)", "Backlog 60 min"], "5": ["BUILD: P3 write-up outline \u2014 Applications locked until Nov 6", "DSA 1", "Backlog 60 min"], "6": ["BUILD: Write-up draft half \u2014 Applications locked until Nov 6", "College catch-up"], "0": ["BUILD: Weekly review 30 min (5 questions, by hand) + set next week's ONE thing \u2014 Applications locked until Nov 6", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-11-09", "ph": "PHASE 2", "th": "P3 write-up + STAR bank", "d": {"1": ["Write-up: system + eval design", "College", "DSA 1 + Anki + Backlog 60 min"], "2": ["Write-up: baseline\u2192iteration numbers + failures", "Body double: 3 apps + 2 outreaches", "Backlog 60 min"], "3": ["Finish draft", "College", "DSA 1 + Backlog 60 min"], "4": ["Edit, verify every number", "STAR bank: 3 stories (P1 NaN, P3 evals, gate call)", "Backlog 60 min"], "5": ["PUBLISH P3 + demo link. Pin. Resume update (15 min)", "Backlog 60 min"], "6": ["4 more STAR stories + Anki-drill them", "College catch-up"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-11-16", "ph": "PHASE 2", "th": "Backlog ramp \u2014 projects throttle down", "d": {"1": ["Backlog prep 2 hr (PRIMARY until exams end \u2014 Rule 5)", "Deep 60 min: P3 polish only", "DSA 1 + Anki"], "2": ["Backlog 2 hr", "Body double: 3 apps + 2 outreaches", "Anki"], "3": ["Backlog 2 hr", "Repo maintenance 30 min", "DSA 1"], "4": ["Backlog 2 hr", "Body double: apps+outreach", "Anki"], "5": ["Backlog 2 hr", "DSA 1"], "6": ["Backlog 3 hr (past papers, recall ALOUD, never rereading)", "MVS: 1 commit"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-11-23", "ph": "PHASE 2", "th": "Backlog exams mode", "d": {"1": ["Backlog 2-3 hr (exam days: exam is the ONLY mission)", "MVS commit", "Anki"], "2": ["Backlog 2-3 hr", "Wave-1: 2 apps", "Anki"], "3": ["Backlog 2-3 hr", "MVS", "DSA 1"], "4": ["Backlog 2-3 hr", "Anki"], "5": ["Backlog 2-3 hr", "MVS"], "6": ["Backlog 3 hr", "Rest block \u2014 exams are load"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-11-30", "ph": "PHASE 2", "th": "Exams (verify YOUR timetable) \u2014 survival", "d": {"1": ["Exam/prep. Baseline + MVS only", "Anki 10 min"], "2": ["Exam/prep", "MVS"], "3": ["Exam/prep", "Anki"], "4": ["Exam/prep", "MVS"], "5": ["Exam/prep", "Anki"], "6": ["Exam/prep or recovery", "MVS"], "0": ["Exams done? Full rest day. Earned.", "Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-12-07", "ph": "PHASE 2", "th": "Re-entry (gentle) + interview season warm-up", "d": {"1": ["Re-entry: body double + micro-pomodoro ONLY (\u00a743.8)", "1 small P3 bugfix commit", "Anki"], "2": ["Deep 90 min: OSS \u2014 respond to PR review / find substantive issue", "Body double: 3 apps + 2 outreaches", "Anki"], "3": ["ML fundamentals refresh ALOUD: bias-variance, overfitting, dropout", "DSA 1 medium", "Anki"], "4": ["System design: \u00a727 framework, draw 'design a RAG system' solo", "Body double: apps+outreach", "Anki"], "5": ["DSA timed: 2 mediums in 60 min \u2014 measure real speed", "STAR bank: 2 stories"], "6": ["Mock interview #1 (Pramp/friend) + debrief protocol", "College catch-up"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-12-14", "ph": "PHASE 2", "th": "Wave-1 final push + agents begin", "d": {"1": ["DSA 2 timed mediums", "College if running", "Anki + 1 sysdesign read"], "2": ["P3.5 planning: read \u00a723, sketch ReAct on paper", "Body double: 4 apps + 3 outreaches (final push)", "Anki"], "3": ["DSA 2 timed", "Draw 1 system design (recsys)", "Anki"], "4": ["Agent reading: Anthropic 'Building Effective Agents' (2 hr)", "Body double: apps+outreach", "Anki"], "5": ["Mock #2 + debrief", "DSA 1"], "6": ["ReAct loop from scratch v0 \u2014 one tool (calculator), raw API calls", "Buffer"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-12-21", "ph": "PHASE 2", "th": "Gate-2 prep", "d": {"1": ["P3 final polish vs Gate-2 checklist", "DSA 2 timed", "Anki"], "2": ["ReAct v0 working end-to-end", "Final Wave-1 apps (50+ total logged)", "Anki"], "3": ["Buffer", "Draw 1 system design", "Anki"], "4": ["Buffer / holiday flex", "Mock #3", "Anki"], "5": ["Light day allowed \u2014 family. MVS: 1 commit", "Anki"], "6": ["Gate-2 audit: P3 shipped+deployed+write-up? 50+ apps? ~180 DSA? Fix weakest", "Anki"], "0": ["Quarterly review #2 (2 hr \u00a745.3): market scan + system tune", "Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2026-12-28", "ph": "PHASE 3", "th": "\ud83c\udfc1 GATE 2 (Jan 1) \u2192 convert", "d": {"1": ["Buffer/rest \u2014 big season starts Jan 4", "Anki"], "2": ["Buffer", "MVS"], "3": ["Buffer", "Anki"], "4": ["\ud83c\udfc1 GATE 2 (Jan 1): verify. Plan Phase-3 calendar: interview template starts Monday", "Rest"], "5": ["Book 2 mocks; refresh Wellfound/YC list (30-50 AI startups)", "Anki"], "6": ["P3.5 spec (\u00a733) \u2014 capability 1 plan", "Light"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-01-04", "ph": "PHASE 3", "th": "P3.5 c1: tool use (Jan 15)", "d": {"1": ["P3.5: ReAct + search_documents (wrap P3 retrieval)", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["P3.5: search_web tool + error handling", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["P3.5: execute_code sandboxed", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["P3.5: loop control (max iters, final-answer detect)", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["P3.5: tool use DONE \u2192 commit + demo gif", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["Buffer/polish", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-01-11", "ph": "PHASE 3", "th": "P3.5 c2: MCP server (Jan 22)", "d": {"1": ["MCP SDK server skeleton", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["3 MCP tools (search/get/summarize)", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["Test with Claude Desktop", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Test with Cursor + README", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Publish standalone MCP repo \u2014 portfolio signal!", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["Buffer", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-01-18", "ph": "PHASE 3", "th": "P3.5 c3: agent evals (Jan 30)", "d": {"1": ["Gold trajectories: 15 tuples", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["20 more tuples", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["15 more (50) + trajectory-recording runner", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Metrics: answer acc, tool-call acc, efficiency", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Nightly eval + first dashboard numbers", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["Eval buffer", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-01-25", "ph": "PHASE 3", "th": "P3.5 c4: memory (Feb 7)", "d": {"1": ["Short-term summarization after N msgs", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Long-term vector memory: write path", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["Read path \u2014 retrieve at task start", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Memory eval \u2014 does it help? MEASURE", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Buffer + commit", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["Buffer", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-02-01", "ph": "PHASE 3", "th": "P3.5 c5-6: multi-agent + observability", "d": {"1": ["Researcher agent", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Writer agent + shared state", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["2-agent end-to-end + failure mitigations", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["LangSmith/Langfuse integration", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Multi-agent DONE", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["Buffer", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-02-08", "ph": "PHASE 3", "th": "P3.5 c7: hardening + write-up", "d": {"1": ["Retries+backoff, cost caps, timeouts", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["State persistence (resume after failure)", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["Write-up: architecture + MCP", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Write-up: evals + memory + failures", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["PUBLISH P3.5 (early vs Feb 28). Resume update", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["P2 variant DECISION: A quant / B kernel / C engine (A if unsure)", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-02-15", "ph": "PHASE 3", "th": "P2 starts \u2014 inference", "d": {"1": ["P2 baseline: Llama-3.2-1B FP16 \u2014 measure tok/s + memory", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Study your variant deeply (vLLM docs / quant papers)", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["First implementation slice", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Implementation", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Implementation + honest benchmark harness", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["P2 block", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Real interviews outrank everything from here (Rule 4)", "Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-02-22", "ph": "PHASE 3", "th": "P2 build", "d": {"1": ["Implementation", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Implementation", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["First working version", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Benchmark vs baseline \u2014 real numbers", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Profile \u2192 iterate slowest path (\u00a728)", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["P2 block", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-03-01", "ph": "PHASE 3", "th": "P2 optimize", "d": {"1": ["Optimization round", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Quality benchmark (quant: perplexity delta)", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["Cost-of-inference table: tok/s, $/1M tok, memory", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Iterate", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Buffer", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["OSS rung 3: substantive PR in flight", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-03-08", "ph": "PHASE 3", "th": "P2 ship", "d": {"1": ["Write-up: architecture + method", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Write-up: benchmarks + honest trade-offs", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["Write-up: cost table + what-next", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Edit \u2014 verify EVERY number", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["PUBLISH P2. Portfolio complete: P1+P3+P3.5+P2. Resume update", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["OSS PR iterations", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-03-15", "ph": "PHASE 3", "th": "Full interview mode", "d": {"1": ["Full-loop practice day", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Real interviews / take-homes (outrank all)", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["Practice + take-home work", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Real interviews / mock #12+", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Nudge every application >7 days old", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["Take-home polish", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Backlog May-cycle: 45 min/day starts Apr 1", "Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-03-22", "ph": "PHASE 3", "th": "Offers season", "d": {"1": ["Interviews + take-homes", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Interviews", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["Interviews + outreach 5", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Interviews", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Funnel count (apps\u2192replies\u2192interviews) \u2014 adjust", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["Weakest-funnel work", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-03-29", "ph": "PHASE 3", "th": "Convert", "d": {"1": ["Interviews", "06:00 DSA 2 timed + Anki", "Body double 13:00: 5 outreaches + 3 apps (Wave-2 quota)"], "2": ["Interviews", "06:00 DSA 2 timed + Anki", "Mock interview (alt days) or extra build block"], "3": ["Interviews", "06:00 DSA 2 timed + Anki", "Body double: 5 outreaches + 3 apps"], "4": ["Interviews", "06:00 DSA 2 timed + Anki", "Mock or system-design drawing"], "5": ["Funnel review + backlog 45 min", "06:00 DSA 2 timed + Anki", "Body double: follow-ups + kanban update"], "6": ["Longer block", "Codebase reading 2h: vLLM core + half-page note"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-04-05", "ph": "PHASE 3", "th": "Offers + backlog balance", "d": {"1": ["Interviews/take-homes (primary)", "Backlog 45 min (May cycle)", "DSA 1 + Anki"], "2": ["Interviews", "Backlog 45 min", "Anki"], "3": ["Interviews + outreach 3", "Backlog 45 min", "Anki"], "4": ["Interviews", "Backlog 45 min", "Anki"], "5": ["Funnel: <10 interviews total? \u2192 outreach 10/day + reread \u00a741", "Backlog 45 min"], "6": ["OSS merge push (2+ merged target)", "Backlog 90 min"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-04-12", "ph": "PHASE 3", "th": "Decision zone", "d": {"1": ["Interviews / offer calls", "Backlog 45 min", "Anki"], "2": ["Interviews", "Backlog 45 min", "Anki"], "3": ["Offer eval if any: \u00a742 \u2014 learning 40/network 25/comp 15/brand 10/option 10", "Backlog 45 min"], "4": ["Interviews", "Backlog 45 min", "Anki"], "5": ["Interviews", "Backlog 45 min"], "6": ["Buffer", "Backlog 90 min"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-04-19", "ph": "PHASE 3", "th": "Close it out", "d": {"1": ["Interviews / negotiation", "Backlog 60 min", "Anki"], "2": ["Interviews", "Backlog 60 min", "Anki"], "3": ["Interviews", "Backlog 60 min", "Anki"], "4": ["Interviews", "Backlog 60 min", "Anki"], "5": ["Gate-3 pre-audit: offer likely? No \u2192 contingency ladder CALMLY (\u00a712.6 \u2014 pre-planned)", "Backlog 60 min"], "6": ["Buffer", "Backlog 90 min"], "0": ["Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-04-26", "ph": "PHASE 3", "th": "\ud83c\udfc1 GATE 3 (May 1)", "d": {"1": ["Interviews / finalization", "Backlog 60 min", "Anki"], "2": ["Interviews", "Backlog 60 min", "Anki"], "3": ["Interviews", "Backlog 60 min", "Anki"], "4": ["Interviews", "Backlog 60 min", "Anki"], "5": ["\ud83c\udfc1 GATE 3 (May 1): \u22651 offer signed OR ladder live. Set MLSS alarm (opens ~Jun 1-14) TODAY", "Backlog 60 min"], "6": ["Backlog exams take over (May cycle)", "MVS commit"], "0": ["Quarterly review \u2014 plan Phase 4 with book \u00a712.4", "Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}, {"s": "2027-05-03", "ph": "PHASE 4", "th": "May exams + MLSS ahead", "d": {"1": ["Exams per YOUR timetable \u2014 exams are the mission", "MVS commit", "Anki"], "2": ["Exams", "MVS", "Anki"], "3": ["Exams", "MLSS SOP draft (Appendix D) 45 min", "Anki"], "4": ["Exams", "MVS", "Anki"], "5": ["Exams", "MLSS practice MCQs (math/ML + programming) 45 min"], "6": ["Exams / recovery", "MVS"], "0": ["AUTOPILOT hands over: switch to book \u00a712.4 (internship or contingency). Getting here was the hard part.", "Weekly review 30 min (5 questions, by hand) + set next week's ONE thing", "REST \u2014 hobby, walk, music. Protected."]}}], "ovr": {"2026-07-22": "DAY 1: Colab \u2192 upload P1 notebook \u2192 Run all \u2192 watch it learn. Then GitHub profile + SIH SPOC email. That is the WHOLE day.", "2026-10-15": "\ud83c\udfc1 PHASE GATE 1 \u2014 verify: P1 public / write-up live / resume+LinkedIn+GitHub rebuilt / ~120 DSA. No new work today.", "2027-01-01": "\ud83c\udfc1 PHASE GATE 2 \u2014 verify: P3 shipped+deployed+write-up / 50+ Wave-1 apps / ~180 DSA.", "2027-05-01": "\ud83c\udfc1 PHASE GATE 3 \u2014 \u22651 internship offer OR contingency ladder activated (pre-planned, not failure). Set MLSS June alarm."}, "dl": [["SIH internal hackathon (verify with SPOC)", "2026-08-14"], ["SIH national nominations close", "2026-09-01"], ["\ud83c\udfc1 Gate 1 \u2014 P1 shipped", "2026-10-15"], ["Backlog exams, Dec cycle (verify timetable)", "2026-12-01"], ["\ud83c\udfc1 Gate 2 \u2014 P3 + 50 apps", "2027-01-01"], ["P3.5 shipped", "2027-02-28"], ["\ud83c\udfc1 Gate 3 \u2014 INTERNSHIP OFFER", "2027-05-01"], ["Amazon MLSS registration (~Jun 1-14)", "2027-06-01"]]};
const OVR = {"2026-07-22": "HISTORICAL \u2014 Old Day 1 (Jul 22): Colab \u2192 upload P1 notebook. Preserved as reference. Current campaign started Oct 7.", "2026-10-15": "HISTORICAL \u2014 Original PHASE GATE 1 (Oct 15). Preserved as reference only. Current: P1 SHIP TARGET AFTER BUILD (Nov 15) \u00b7 capability/proof gate. Applications locked until BUILD expires. Original check: P1 public / write-up / resume/LinkedIn/GitHub / ~120 DSA was old campaign logic.", "2027-01-01": "\ud83c\udfc1 PHASE GATE 2 \u2014 verify: P3 shipped+deployed+write-up / 50+ Wave-1 apps / ~180 DSA.", "2027-05-01": "\ud83c\udfc1 PHASE GATE 3 \u2014 \u22651 internship offer OR contingency ladder activated (pre-planned, not failure). Set MLSS June alarm.", "2026-10-07": "CURRENT CAMPAIGN STATE: DAY 1 \u2014 STARTED OCT 7, 2026 \u2014 BUILD PHASE \u2014 Python \u2192 blank-file competence \u2192 rebuild fundamentals \u2192 P1. No applications, no job portals, no referral hunting, no internship research. P1 + fundamentals + necessary academics + health. Applications locked for ~30 days.", "2026-10-08": "DAY 2 \u2014 Oct 8: Python blank-file drills \u2014 unfamiliar basic problems. Gate = demonstrated capability, not checklist. Counter/Tokenizer = evidence only."};
const DLS = [["SIH internal hackathon (verify with SPOC)", "2026-08-14"], ["SIH national nominations close", "2026-09-01"], ["🏁 Gate 1 — P1 shipped (TARGET after BUILD, capability gate)", "2026-11-15"], ["Backlog exams, Dec cycle (verify timetable)", "2026-12-01"], ["🏁 Gate 2 — P3 + 50 apps", "2027-01-01"], ["P3.5 shipped", "2027-02-28"], ["🏁 Gate 3 — INTERNSHIP OFFER", "2027-05-01"], ["Amazon MLSS registration (~Jun 1-14)", "2027-06-01"]];
const SYL = [{"ph": "FOUNDATION \u00b7 JUL 22 \u2014 AUG 23", "mods": [{"id": "m0", "n": "00", "t": "Python \u2014 Revision Sprint", "dl": "2026-07-23", "dep": "entry point \u00b7 2 days", "topics": [["Core syntax sweep: comprehensions, dicts/sets, slicing, f-strings", "1 blank-file drill sheet, no references open"], ["Functions & closures: *args/**kwargs, default-arg trap, lambdas", "write 5 utilities incl. a char_freq(text)"], ["OOP (not Python exit prerequisite): classes, __init__/self basics \u2014 learn when needed, Master Map 01 as reference if needed", "Counter class is one piece of evidence, not gate definition"], ["Files, exceptions, venv, pip; read a traceback bottom-up", "break code deliberately; narrate the error aloud"], ["Git/terminal minimum: init/add/commit/push \u2014 learn to minimum required for project, not Python mastery gate", "first commit to the p1-transformer repo \u2014 evidence of workflow, not mastery"], ["GATE: demonstrated blank-file programming capability across unfamiliar basic problems \u2014 variables, collections, control flow, loops, functions, basic debugging", "Counter/Tokenizer remains as one piece of evidence, not the gate definition"], ["Remediation: Use a short targeted remediation cycle, then retest the gate. Usually \u22641\u20132 focused days for a small gap; if still failing, continue repairing the exact gap. Never restart the whole stage. No new phase.", "Master Map 01A-C is reference library for gap, not second roadmap"]], "del": "Day 2 output: p1-transformer repo cloned, tests green (pytest -q), first commit pushed."}, {"id": "m1", "n": "01", "t": "Data Structures & Algorithms \u2014 opens after Python", "dl": "2027-04-30", "dep": "after 00 \u00b7 parallel track, Jul 24 \u2192 Apr 30", "topics": [["Arrays & strings \u2014 40 problems", "Jul 24\u2013Aug 15 \u00b7 solutions allowed 20-min-stuck rule"], ["Hashing \u2014 25 problems + trigger cards", "'pair/count/duplicate' \u2192 hash map"], ["Two-pointer & sliding window \u2014 40", "'sorted, palindrome' \u00b7 'substring, window k'"], ["Binary search \u2014 25", "'sorted / rotated / minimize max'"], ["Stacks, queues, linked lists \u2014 25", "monotonic stack pattern included"], ["Trees & graphs, BFS/DFS, topo sort \u2014 75", "Sep\u2013Dec block"], ["Heaps & intervals \u2014 25", "'top-k / merge overlapping'"], ["Dynamic programming \u2014 45", "Nov onward; 1D \u2192 2D \u2192 knapsack family"], ["Greedy & backtracking \u2014 30", "prove-the-exchange-argument habit"], ["Checkpoints: Long-term: 300-350 by Apr 30 \u00b7 Historical Oct 15 120 removed for current campaign (BUILD PHASE). DSA remains parallel/non-blocking during BUILD.", "Bar = 2/3 cold mediums in 30 min \u2014 DSA 1 easy + Anki (parallel, not blocking) during BUILD"], ["Daily Anki on pattern triggers", "retention is the track; solving is just exposure"]], "del": "Interview-grade DSA: timed mediums under pressure, pattern reflexes on Anki."}, {"id": "m2", "n": "02", "t": "Mathematics for Machine Learning", "dl": "2026-08-05", "dep": "after 00 \u00b7 Jul 24 \u2192 Aug 05", "topics": [["Linear algebra: vectors, matmul shape algebra, rank/basis intuition, eigen-intuition", "3B1B Essence of LA 1\u201310 + hand drills"], ["Calculus for optimization: derivative, chain rule, gradient, Jacobian shape logic", "3B1B Calculus 1\u20134; derive d/dx of MSE by hand"], ["Probability: distributions, expectation, variance, Bayes, MLE", "derive why cross-entropy = negative log-likelihood"], ["Statistics: sampling, bias/variance, confidence, hypothesis tests", "the language of model evaluation"], ["Numerics: softmax stability, log-sum-exp, why fp16 explodes", "you will meet all three in training runs"], ["Reference: NumPy shape/broadcast/indexing + Master Map 05 granular drills \u2014 Open it when current work exposes a genuine knowledge gap, dependency, or useful deeper reference", "Use a short targeted remediation cycle, then retest the gate. Usually \u22641\u20132 focused days for a small gap; if still failing, continue repairing the exact gap. Never restart the whole stage."]], "del": "Can hand-derive backprop for a 2-layer net and explain cross-entropy from first principles."}, {"id": "m3", "n": "03", "t": "Classical Machine Learning", "dl": "2026-08-23", "dep": "after 02 \u00b7 Aug 06 \u2192 Aug 23 \u00b7 ref: 100 Days of ML", "topics": [["ML framing: supervised/unsupervised, train/val/test discipline, leakage", "the sin list: leakage, peeking, p-hacking"], ["Data pipeline: cleaning, imputation, outliers, scaling, encodings", "pandas + sklearn ColumnTransformer"], ["Linear & logistic regression \u2014 implement from scratch, then sklearn", "gradient descent by hand on real data"], ["Regularization: L1/L2, why it works, bias-variance in practice", "plot the tradeoff curve yourself"], ["Trees, random forests, gradient boosting (XGBoost)", "tabular king; feature importance honestly"], ["Unsupervised: k-means, PCA, embeddings preview", "PCA by eigen-decomposition once, on paper"], ["Metrics: precision/recall/F1, ROC-AUC, calibration; CV & tuning", "choose the metric BEFORE the model \u2014 always"], ["Capstone: end-to-end tabular project (dataset \u2192 model \u2192 error analysis \u2192 report)", "small, complete, in the portfolio repo"], ["Prereq spike (if cold fails): NumPy + Pandas \u2014 DataFrames/Filtering/Groupby/Merge/Missing \u2014 Open it when current work exposes a genuine knowledge gap, dependency, or useful deeper reference", "Use a short targeted remediation cycle, then retest the gate. Usually \u22641\u20132 focused days for a small gap; if still failing, continue repairing the exact gap. Never restart the whole stage. Master Map 02/04 as reference."]], "del": "One complete classical-ML mini-project with honest metrics + interview fluency (bias-variance, regularization, metrics)."}]}, {"ph": "DEEP LEARNING & FLAGSHIP P1 \u00b7 AUG 24 \u2014 OCT 15", "mods": [{"id": "m4", "n": "04", "t": "Deep Learning", "dl": "2026-09-14", "dep": "after 02, 03 \u00b7 Aug 24 \u2192 Sep 14", "topics": [["PyTorch core: tensors, broadcasting, autograd, nn.Module, Dataset/DataLoader", "predict every shape before running"], ["MLP from scratch: forward, backward, training loop \u2014 no nn.Sequential first", "then rewrite clean with nn.Module"], ["Optimization: SGD\u2192momentum\u2192AdamW; LR schedules, warmup", "run the LR-too-high experiment once, on purpose"], ["Training pathologies: over/underfitting, vanishing/exploding gradients, clipping", "the \u00a728 debugging table becomes reflex"], ["Regularization in DL: dropout mechanics (train vs eval), weight decay, early stopping", "explain dropout's inference-time behavior cold"], ["Embeddings: what nn.Embedding learns; visualize with PCA", "bridge to transformers"], ["CNNs & RNNs \u2014 survey level only: why each won, why attention replaced RNNs", "2 pages of notes, zero projects; not the target stack"], ["Bigram language model on TinyShakespeare", "the baseline P1 must beat"], ["Cold-recall checklist: tensor shapes, devices CPU/GPU, parameters, losses, optimizers, checkpoints, mixed precision, GPU debug \u2014 Open it when current work exposes a genuine knowledge gap, dependency, or useful deeper reference", "Use a short targeted remediation cycle, then retest the gate. Usually \u22641\u20132 focused days for a small gap; if still failing, continue repairing the exact gap. Never restart the whole stage. Master Map 07 as reference."]], "del": "A trained MLP + bigram LM, debugged by hand; fluency in the full training-loop vocabulary."}, {"id": "m5", "n": "05", "t": "Transformers & LLM Internals \u2014 FLAGSHIP P1", "dl": "2026-11-15", "dep": "after 04 \u00b7 Sep 15 \u2192 Nov 15 \u00b7 TARGET: AFTER BUILD \u00b7 capability/proof gate (original Oct 15 historical)", "topics": [["Tokenization: char-level \u2192 BPE, build both; vocab/sequence-length tradeoff", "minbpe studied, own mini-trainer written"], ["Attention from first principles: Q/K/V, scaling, causal mask \u2014 paper first, then code", "the centerpiece; hand-compute a 2-token example"], ["Multi-head attention, FFN, residuals, LayerNorm vs RMSNorm", "assemble the block; derive param count from config"], ["Positional encodings: learned vs sinusoidal vs RoPE \u2014 implement two, ablate", "ablation table = write-up gold"], ["Full pretraining run: warmup+cosine, clipping, checkpoints, benchmark val ~1.5 nats (reference, not absolute gate) \u2014 reproducible training run + learning curve + baseline comparison + explained failure modes + generation examples + ablation", "Log every failure + fix in DECISIONS.md \u2014 capability/proof gate, not numeric gate"], ["Sampling: temperature, top-k/top-p; generation quality analysis", ""], ["Papers: Vaswani 2017 + Llama-2 (deltas: RoPE/RMSNorm/SwiGLU/GQA)", "1-page note each"], ["SHIP P1: public repo, one-command reproduce, 1,500-word write-up published", "no write-up = 60% of the signal lost"], ["Gate-1 rebuild: resume (projects 50%+, live links), LinkedIn, GitHub profile", "Applications unlock = P1 shipped + proof complete + BUILD lock expired (original Wave-1 Oct 15 historical)"], ["Optional reference after P1: Master Map 09-11 for Attention granular + LoRA/QLoRA/HF ecosystem \u2014 Open it when current work exposes a genuine knowledge gap, dependency, or useful deeper reference. Never browse it to decide what to study next.", "P1 ships first, no FOMO"]], "del": "P1 SHIP \u2014 TARGET: AFTER BUILD \u00b7 capability/proof gate. Original Oct 15 date is historical. Applications remain locked until BUILD expires. Ship = public repo + 1,500-word write-up + reproducible run + learning curve + baseline comparison + failure analysis + generation examples + ablation."}]}, {"ph": "SYSTEMS & FLAGSHIP P3 \u00b7 OCT 16 \u2014 JAN 01", "mods": [{"id": "m6", "n": "06", "t": "Backend Engineering for AI Products", "dl": "2026-11-01", "dep": "after 00 \u00b7 Oct 16 \u2192 Nov 01 \u00b7 in service of P3, not a webdev detour", "topics": [["HTTP & REST: verbs, status codes, JSON APIs, auth basics (tokens, rate limits)", "design the P3 API on paper first"], ["FastAPI: routes, pydantic models, async basics, error handling", "serve your model behind an endpoint"], ["SQL + Postgres: schema, joins, indexes; when SQL vs vector store", "store eval runs + application tracker in it"], ["Docker: image, container, volumes; dockerize the P3 service", "one Dockerfile, understood line by line"], ["Deployment: Railway/Render, env vars, logging, health checks", "a URL a founder can click is the deliverable"], ["Frontend minimum: Streamlit/Gradio for demos", "deliberate ceiling \u2014 full frontend is out of scope for this role"]], "del": "A dockerized FastAPI service deployed to a public URL \u2014 the chassis P3 ships on."}, {"id": "m7", "n": "07", "t": "LLM Engineering: RAG & Evaluation \u2014 FLAGSHIP P3", "dl": "2027-01-01", "dep": "after 05, 06 \u00b7 Nov 02 \u2192 Jan 01 \u00b7 \u26e9 GATE 2", "topics": [["LLM APIs, prompting, structured output, function-calling basics", "the commodity layer \u2014 one week, no more"], ["Embedding models + vector stores (FAISS/Chroma): index 1,000+ real docs", "real corpus, not toy data"], ["Chunking & retrieval: size/overlap tradeoffs, top-k, hybrid + rerank (stretch)", "measure, don't vibe"], ["Generation over context: grounding, citation, hallucination control", "open-weights model (Llama-class)"], ["EVALUATION \u2014 the differentiator: 50-question gold set, recall@k, faithfulness, LLM-as-judge", "harness must catch a regression you plant deliberately"], ["One quantified improvement loop: change \u2192 metric moves \u2192 documented", "'recall@5 0.61\u21920.72' beats any adjective"], ["Fine-tuning: LoRA on a small model; when FT beats RAG beats prompting", "stretch; quantify or don't claim"], ["SHIP P3: live demo (on the 06 chassis) + 2,000-word write-up", "plus ~50 Wave-1 applications sent Oct\u2013Dec"]], "del": "\u26e9 GATE 2 \u00b7 JAN 01 \u2014 P3 live + write-up + 50 applications out. Wave-2 (startups) opens."}]}, {"ph": "DIFFERENTIATION & CONVERSION \u00b7 JAN 02 \u2014 MAY 01", "mods": [{"id": "m8", "n": "08", "t": "Agent Engineering & MCP \u2014 FLAGSHIP P3.5", "dl": "2027-02-28", "dep": "after 07 \u00b7 Jan 02 \u2192 Feb 28", "topics": [["ReAct loop from scratch \u2014 raw API calls, own tool layer, no frameworks", "frameworks teach frameworks; builds teach architecture"], ["Tool calling: JSON schemas, execution layer, malformed-call handling, safety validation", "where production agents actually break"], ["MCP: protocol, primitives; write a server exposing P3 retrieval; publish standalone", "a repo few applicants will have"], ["Agent evaluation: gold trajectories, tool-call accuracy, efficiency, recovery rate", "evaluate the path, not just the answer"], ["Memory: summarization, sliding window, vector long-term memory", ""], ["Multi-agent: 2-agent researcher\u2192writer, shared state; failure modes + mitigations", "loops, overflow, deadlock, error cascade"], ["Observability: LangSmith/Langfuse tracing on every run", "production-readiness signal"], ["SHIP P3.5 + MCP repo + 2,500-word write-up", "targets the agent-engineer premium"]], "del": "Agent system with trajectory-level evals + published MCP server."}, {"id": "m9", "n": "09", "t": "Inference Systems & GPU \u2014 FLAGSHIP P2", "dl": "2027-05-01", "dep": "after 05 \u00b7 Mar 01 \u2192 May 01 \u00b7 \u26e9 GATE 3", "topics": [["KV cache: O(n\u00b2)\u2192O(n), the memory formula, why cache > model at batch 32", "know the 7B worked example cold"], ["Quantization: INT8/INT4 (GPTQ/AWQ concepts); implement + benchmark vs FP16", "P2 default variant"], ["Batching: static/dynamic/continuous; PagedAttention; GQA/MQA cache math", "why vLLM wins, in your own words"], ["Profiling & benchmarking: compute- vs memory-bound, tokens/sec, cost tables", "honest numbers; a wrong benchmark kills credibility"], ["CUDA fundamentals: memory hierarchy, one simple kernel (stretch variant)", "only if choosing the kernel variant"], ["vLLM source reading + one substantive OSS PR attempt", "the frontier-adjacent signal"], ["SHIP P2: implementation + benchmark write-up + cost-of-inference table", "the rarest skill on your resume"]], "del": "\u26e9 GATE 3 \u00b7 MAY 01 \u2014 P2 shipped. Offer in hand, or contingency ladder activates."}, {"id": "m10", "n": "10", "t": "Interviews, Applications & Offers", "dl": "2027-05-01", "dep": "activates Dec 01 \u00b7 runs parallel with 08\u201309", "topics": [["ML theory bank: bias-variance, dropout internals, LR pathologies, clipping, metrics", "mechanism-level answers, never definitions"], ["ML system design: 6-step framework; 12+ practiced designs incl. RAG/recsys/fraud", "one whiteboard design per week from Dec"], ["Behavioral: 10-story STAR bank sourced from P1\u2013P3.5 debugging logs", "rehearsed aloud; mapped to Amazon LPs"], ["Artifact walkthroughs: 2-min and 5-min versions per project", "steer every interview back to the repos"], ["Mock interviews: 20 logged with debriefs (Pramp/peers)", "the highest-leverage prep line item"], ["Outreach engine: 100 founder/engineer cold emails, 5\u201310/wk Jan\u2013Apr", "template + tracker; referrals 2/wk"], ["Applications: 50 Wave-1 (Oct\u2013Dec) + 50 Wave-2 (Jan\u2013Apr)", "competitions: SIH Aug, GRiD cycle, MLSS Jun"], ["Amazon MLSS: SOP drafted + 20-MCQ prep + 2 timed coding problems", "registration window ~June \u2014 calendared"]], "del": "Interview-ready across all four rounds; funnel: 100 outreach \u2192 interviews \u2192 Summer 2027 offer."}]}];

const ORIGINAL_START = new Date(2026,6,22);
const START = new Date(2026,9,7);
const CURRENT_CAMPAIGN_START = new Date(2026,9,7);
const BUILD_PHASE_END = new Date(2026,10,6);
const BUILD_PHASE = { active: true, note: "BUILD PHASE — P1 + fundamentals. Applications locked. No job portals, no referral hunting, no internship research for ~30 days.", until: "Nov 6, 2026" };
const TOTAL = 283;

const GATES = [
 {n:"P1 · TRANSFORMER SHIPS", full:"⛩ GATE 1 — P1: Transformer from scratch, public + 1,500-word write-up",
  d:new Date(2026,10,15),
  why:"No HuggingFace, no copying nanoGPT. Amazon's ML-depth round asked 'transformers at a root level' — P1 is that answer, from having built it. TARGET: after BUILD phase (Oct 7 - Nov 6). Ship = capability/proof gate: public repo + 1,500-word write-up + reproducible run + learning curve + generation examples + ablation. Applications unlock = P1 shipped + proof complete + BUILD lock expired. Original Oct 15 date preserved as historical reference only.",
  src:"Roadmap · Amazon Intern Data.md"},
 {n:"P3 · RAG + EVALS LIVE", full:"⛩ GATE 2 — P3: RAG system + eval harness, deployed + 2,000-word write-up",
  d:new Date(2027,0,1),
  why:"33% of AI companies send a take-home that is literally 'build a RAG app.' P3 IS that take-home, pre-built — you walk in with it done. Ship = startup wave opens.",
  src:"Takehome Grigorev.md · Takehome Playbook.md"},
 {n:"P3.5 · AGENTS + MCP", full:"P3.5 — ReAct agent from scratch + published MCP server",
  d:new Date(2027,1,28),
  why:"The agent-engineer premium: a $62,400 salary split already exists inside the AI-engineer title. A published MCP repo is a signal few applicants have.",
  src:"Interview Stack 140k · Roadmap"},
 {n:"P2 · INFERENCE → OFFER", full:"⛩ GATE 3 — P2: Inference/GPU (KV cache, quantization, vLLM) → internship offer",
  d:new Date(2027,4,1),
  why:"The rarest fresher skill — your NVIDIA + Sarvam differentiator. 'The inference engineer may be the most important AI role in 2026.' <b>Target: a direct AI-first / YC / US-remote offer</b> — the lane your seniors used to reach ₹52–60L off-campus from this exact college. P2 is what puts you in that tail.",
  src:"Inference Scarcity · Nvidia India Data.md"},
 {n:"MLSS · AMAZON", full:"Amazon MLSS registration — the intern→PPO machine",
  d:new Date(2027,5,15),
  why:"Any recognised Indian institute, graduating 2027+ — you qualify. ~60,000 apply, ~3,000 selected (~5%). The door to the ₹63L AS-1 path.",
  src:"Amazon MLSS 2026.md · Leetcode AS1 Tier 3.md"}
];

const DSA_CHECKS = [
 {t:40,  d:new Date(2026,7,15),  lbl:"40 by mid-Aug", gate:""},
 {t:120, d:new Date(2026,9,15),  lbl:"120 by Oct 15 — HISTORICAL (removed for BUILD PHASE)", gate:"⛩"},
 {t:180, d:new Date(2027,0,1),   lbl:"180 by Jan 1",  gate:"⛩"},
 {t:300, d:new Date(2027,3,30),  lbl:"300 by Apr 30", gate:""}
];

/* Curated resources — only what your own plan references (CampusX, Karpathy, 3B1B, minbpe, Vaswani…) */
const RES = {
 m0:[["▶","Python official tutorial","https://docs.python.org/3/tutorial/"],
     ["⌘","pytest docs","https://docs.pytest.org/en/stable/getting-started.html"],
     ["⌘","Pro Git (free book)","https://git-scm.com/book/en/v2"]],
 m1:[["⌘","LeetCode","https://leetcode.com/problemset/"],
     ["⌘","NeetCode 150 (pattern map)","https://neetcode.io/practice"],
     ["⌘","Anki","https://apps.ankiweb.net/"]],
 m2:[["▶","3B1B · Essence of Linear Algebra","https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"],
     ["▶","3B1B · Essence of Calculus","https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"],
     ["▶","3B1B · Neural networks","https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"]],
 m3:[["▶","CampusX · 100 Days of ML (your reference text)","https://www.youtube.com/playlist?list=PLKnIA16_RmvbAlyx4_rdtR66B7EHX5k3z"],
     ["⌘","scikit-learn user guide","https://scikit-learn.org/stable/user_guide.html"],
     ["📄","XGBoost paper","https://arxiv.org/abs/1603.02754"]],
 m4:[["▶","CampusX · 100 Days of Deep Learning (your reference text)","https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn"],
     ["▶","Karpathy · Zero to Hero","https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ"],
     ["⌘","PyTorch tutorials","https://pytorch.org/tutorials/"]],
 m5:[["▶","Karpathy · Let's build GPT (build-alongside, 20 min/day)","https://www.youtube.com/watch?v=kCc8FmEb1nY"],
     ["▶","Karpathy · Let's build the GPT Tokenizer","https://www.youtube.com/watch?v=zduSFxRajkE"],
     ["⌘","minbpe","https://github.com/karpathy/minbpe"],
     ["📄","Attention Is All You Need (Vaswani 2017)","https://arxiv.org/abs/1706.03762"],
     ["📄","Llama 2 (RoPE/RMSNorm/GQA deltas)","https://arxiv.org/abs/2307.09288"],
     ["⌘","TinyShakespeare corpus","https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt"]],
 m6:[["⌘","FastAPI tutorial","https://fastapi.tiangolo.com/tutorial/"],
     ["⌘","Docker · Get started","https://docs.docker.com/get-started/"],
     ["⌘","PostgreSQL tutorial","https://www.postgresqltutorial.com/"],
     ["⌘","Streamlit docs","https://docs.streamlit.io/"]],
 m7:[["⌘","Chroma docs","https://docs.trychroma.com/"],
     ["⌘","FAISS","https://github.com/facebookresearch/faiss"],
     ["⌘","sentence-transformers","https://www.sbert.net/"]],
 m8:[["📄","ReAct paper","https://arxiv.org/abs/2210.03629"],
     ["⌘","Model Context Protocol","https://modelcontextprotocol.io/"],
     ["⌘","MCP GitHub org","https://github.com/modelcontextprotocol"]],
 m9:[["⌘","vLLM source (read it, then one OSS PR)","https://github.com/vllm-project/vllm"],
     ["📄","PagedAttention paper","https://arxiv.org/abs/2309.06180"]],
 m10:[["⌘","Amazon Leadership Principles","https://www.amazon.jobs/content/en/our-workplace/leadership-principles"],
     ["⌘","Sarvam careers (watch for 2027 intern window)","https://www.sarvam.ai/careers"],
     ["⌘","AI4Bharat GitHub (IndicTrans/IndicWhisper)","https://github.com/AI4Bharat"],
     ["⌘","Unstop (GRiD / MLSS / Amazon ML Challenge windows)","https://unstop.com/"]]
};

/* why-lines for roadmap nodes (from your Roadmap drawer content) */
const WHY = {
 m0:"You know Python; fast revision + tooling so nothing later trips on syntax.",
 m1:"The interview gate — parallel the whole way. Your files: Sarvam's top path had no DSA; GRiD R2 is basic; Amazon OA is 2 mediums. Enough to clear gates, not CP obsession.",
 m2:"Enough math to trust and debug models — pulled toward application, not proofs.",
 m3:"Interviews test it (Amazon ML-depth) and its lifecycle recurs in every AI system. Ref: 100 Days of ML.",
 m4:"The foundation the transformer stands on — built by hand. Ref: 100 Days of DL.",
 m5:"⛩ GATE 1. The center of your portfolio. Every piece from a blank file. This is exactly what Amazon's ML-depth round tests — you'll answer from having BUILT it.",
 m6:"The chassis P3 ships on. Enough backend to deploy AI — not a webdev detour.",
 m7:"⛩ GATE 2. 33% of AI companies send 'build a RAG app' as the take-home. P3 IS that take-home, pre-built.",
 m8:"The agent-engineer premium + a published MCP repo few applicants have. Another pre-built take-home.",
 m9:"⛩ GATE 3. The rarest fresher skill — your NVIDIA + Sarvam differentiator.",
 m10:"Where artifacts become offers. The Tier-3 → Amazon AS-1 (₹63L) precedent ran through exactly this funnel."
};

const WINDOWS = [
 {n:"FLIPKART GRiD", tag:"merit-blind · highest EV",
  open:new Date(2027,5,19), close:new Date(2027,6,7), est:true,
  note:"GRiD 8.0 registered Jun 19 → Jul 7 2026 (this year's window is gone). Next expected ~Jun 2027. No college/CGPA filter — R2 is just 2 basic-DSA questions in 45 min. Register ALL tracks the day it opens.",
  src:"Flipkart Grid 2026.md · Flipkart Grid Exp.md"},
 {n:"WAVE-1 APPLICATIONS", tag:"50 apps · your own gate",
  open:new Date(2026,9,15), close:new Date(2026,11,31),
  note:"Opens the day P1 ships. Rebuild resume + LinkedIn + GitHub — AND make Wellfound + workatastartup.com profiles live (that's where the ₹60L senior offers came from). Then 50 applications. The artifact earns the call.",
  src:"Roadmap · Sarvam Reddit.md · Gordian/YC research"},
 {n:"JUSPAY HIRING CHALLENGE", tag:"your batch's cycle · all branches, no CGPA",
  open:new Date(2027,5,1), close:new Date(2027,7,31), est:true,
  note:"Annual, open to all colleges. MCQ → 90-min coding → 2-day hackathon → intern ₹40k/mo → ₹21–27L on conversion. Your batch (2028) eligible when its cycle opens — watch Unstop from mid-2027. A SIRMVIT senior entered this exact door.",
  src:"Unstop Juspay process · internseed"},
 {n:"AMAZON ML CHALLENGE", tag:"Oct hackathon · 2 rounds",
  open:new Date(2026,9,1), close:new Date(2026,9,31), est:true,
  note:"October hackathon, 2 rounds. A CGPA-bypass shortcut alongside MLSS. Enter it — P1 will just have shipped.",
  src:"Amazon MLC Data.md"},
 {n:"STARTUP WAVE-2", tag:"Sarvam-class targets",
  open:new Date(2027,0,1), close:new Date(2027,3,30),
  note:"Opens when P3 is live. Sarvam (intern ₹20–50k/mo, 2026 cycle closed Jun 24 — watch for 2027), Krutrim, Yellow.ai (₹12–85L, remote-friendly). Prep the ASSIGNMENT round hardest — it's their real filter.",
  src:"Sarvam Careers (1).md · Sarvam Glass.md · Yellow SDE Intern.md"},
 {n:"COLD OUTREACH CAMPAIGN", tag:"100 outreaches · 2 referrals/wk",
  open:new Date(2027,0,1), close:new Date(2027,3,30),
  note:"Jan → Apr: 100 cold outreaches to engineers/founders (not recruiters) ≈ 6/week. Cold outreach + referrals convert far above portal applications.",
  src:"Master Edition Part V · dossier §5"},
 {n:"AI4BHARAT · IIT MADRAS", tag:"CGPA-blind · paid research",
  rolling:true,
  note:"Selects on merged PRs to their repos, not marks. Contribute to IndicTrans/IndicWhisper in Phase 2–3 (Nov–Feb), then email the researcher with the PR as the hook. Sarvam's founders came from here.",
  src:"AI4Bharat Intern.md"},
 {n:"NVIDIA DIRECT ROLES", tag:"skip N.Ex.T (CGPA 7.5 wall)",
  rolling:true,
  note:"N.Ex.T needs CGPA 7.5+ — hard wall, SKIP. Direct ML Intern + LLVM/MLIR compiler-intern roles have no hard CGPA filter. P2 (inference/CUDA) is the hook — apply after it ships.",
  src:"Nvidia CGPA Data.md · Nvidia India Data.md"},
 {n:"SIH INTERNAL HACKATHON", tag:"date TBD — ask SPOC",
  tbd:true,
  note:"Day-1 mission: email the college SIH SPOC for the internal hackathon date. If scheduled, it OUTRANKS P1 (Rule 1). Team: 6 people, ≥1 female.",
  src:"AUTOPILOT wk of Aug 10"},
 {n:"GOOGLE STEP / SUMMER", tag:"lottery · ≤10% effort",
  open:new Date(2027,5,1), close:new Date(2027,5,28), est:true,
  note:"Summer internship: 'No CGPA, no experience, any degree.' STEP skews 1st/2nd year — likely missed. Referral-first, keep to ≤10% of application effort.",
  src:"Google Step Data (1).md · Google Student Researcher.md"},
 {n:"AMAZON MLSS", tag:"→ intern → AS-1 ₹63L",
  open:new Date(2027,5,1), close:new Date(2027,5,30), est:true,
  note:"Register ~June 2027. Test: 60 min, MCQs + 2 DSA. ~5% selection, results skew Tier-1/2 — apply, but never your single point of failure.",
  src:"Amazon MLSS 2026.md · MLSS CGPA.md"}
];

const TGT = [
 {n:"SARVAM AI", tag:"PRIMARY · unicorn $1.5B",
  why:"Your #1 target. Series B $234M. Intern (Backend) stipend ₹20–50k/mo, 3–6 mo, BE/BTech/BCA/MCA — CGPA not a stated gate.",
  evi:"Process: 'First an assignment, then interviews the same day… final tech interview contains DSA, then HR. Easy→medium.' Precedent: ₹84L incl. ESOPs — 'No DSA was asked… to get an interview call we built a VAD.'",
  mv:["Build ONE Sarvam-relevant artifact (Indic tokenizer benchmark or inference/quantization demo on an Indic model) — <b>your VAD</b>, it earns the call","Watch careers + intern form (2026 cycle closed Jun 24; expect 2027)","Prep the ASSIGNMENT round hardest — their real filter","Cold-email a Sarvam engineer with the artifact as hook"],
  src:"Sarvam Reddit.md · Sarvam Glass.md · Sarvam Careers (1).md"},
 {n:"AMAZON MLSS", tag:"→ intern → AS-1 ₹63L",
  why:"The ₹60L+ machine. Any recognised Indian institute, grad 2027+ — you qualify. 60-min test, MCQs + 2 DSA. ~60,000 apply, ~3,000 selected (~5%). Results skew Tier-1/2 — never your single point of failure.",
  evi:"ML intern interview: R1 OA = 2 LeetCode-medium; R2 ML-depth 'Bar Raiser' asked 'transformers at a root level, optimization.' Precedent: Tier-3 → 6-mo intern → Applied Scientist PPO ₹63L.",
  mv:["Calendar MLSS registration ~June 2027","2 clean LeetCode-mediums + 6 STAR stories → Leadership Principles","<b>P1 is the 'transformers at root level' answer</b> — you built it","Also enter Amazon ML Challenge (Oct hackathon)"],
  src:"Amazon MLSS 2026.md · Amazon Intern Data.md · Leetcode AS1 Tier 3.md"},
 {n:"FLIPKART GRiD", tag:"merit-blind · highest EV",
  why:"No college/CGPA filter — pure performance. Internships go to Round 1/2/3 qualifiers; winners become full-time 'Flipsters.'",
  evi:"Structure (GRiD 7): R1 screening → R2 coding (2 questions, 45 min, basic DSA) → R3 case-study code → R4 finals.",
  mv:["Register the moment the window opens — <b>ALL tracks</b> (independent shortlisting)","R2 = 2 basic-DSA in 45 min — your parallel track covers it","Treat R3 case-study as a mini-project — your build skill shines"],
  src:"Flipkart Grid 2026.md · Flipkart Grid Exp.md · Flipkart Prepinsta Data.md"},
 {n:"AI4BHARAT · IITM", tag:"CGPA-blind · paid research",
  why:"IIT Madras, 1–2 yr research internship in AI/DS. CGPA-blind, college-blind, paid. Sarvam's founders came from here — the network compounds.",
  evi:"Selects on PRIOR open-source contributions to their repos, not marks.",
  mv:["Contribute to 2–3 repos (IndicTrans / IndicWhisper) in Phase 2–3","Email the researcher with your <b>merged PR</b> as the hook"],
  src:"AI4Bharat Intern.md · AI4Bharat Chatbot.md"},
 {n:"NVIDIA", tag:"direct roles · skip N.Ex.T",
  why:"N.Ex.T needs CGPA 7.5+ — hard wall for you, SKIP it. But direct ML Intern + LLVM/MLIR compiler-intern roles (C++, parallel programming, DL) have NO hard CGPA filter.",
  evi:"'N.Ex.T minimum CGPA 7.5+.' Direct roles via careers portal.",
  mv:["Skip N.Ex.T entirely","Apply direct ML/compiler intern roles — <b>P2 (CUDA/inference) is your differentiator</b>"],
  src:"Nvidia CGPA Data.md · Nvidia India Data.md"},
 {n:"YELLOW.AI", tag:"remote-friendly · ₹12–85L",
  why:"SDE intern (0 YOE): Backend, DSA, Go/Java/Node/Python. GenAI roles: LLMs, Python, NLP, PyTorch. SWE interview ~3 rounds, ~4 coding problems.",
  evi:"P3 (RAG) + P3.5 (agents) map directly onto their conversational-AI product.",
  mv:["Apply via Instahyre/careers + founder outreach in Wave-2"],
  src:"Yellow SDE Intern.md · Yellow GenAI Data.md · Yellow Int2.md"},
 {n:"KRUTRIM", tag:"India's first AI unicorn",
  why:"₹2,000 cr investment. Hiring GenAI research engineer, AI cloud platform engineer — Bengaluru + Palo Alto/SF/Singapore.",
  evi:"P1 + P3 align with their GenAI stack.",
  mv:["Secondary to Sarvam — apply in the <b>Wave-2 startup batch</b>"],
  src:"Krutrim Skills.md"},
 {n:"JUSPAY", tag:"hiring challenge · intern→PPO formalized",
  why:"Annual Hiring Challenge open to ALL colleges and branches — zero CGPA gate. Your batch (2028) becomes eligible ~2027. A senior from YOUR college (Shambhavi, CSE '26) entered exactly this way.",
  evi:"Process: MCQ round → 90-min coding (2–3 problems) → 2-day hackathon (build a real app) → 8–12 month internship at ₹40k/mo → converts to ₹21–27L full-time on performance.",
  mv:["Register the moment your batch's challenge opens (~2027, via Unstop/their site)","The hackathon round is a pre-built take-home — <b>your P-projects ARE the prep</b>","Coding round = 2–3 problems; your DSA track covers it"],
  src:"Unstop Juspay process · internseed · SIRMVIT placement posters"},
 {n:"YC / US-REMOTE", tag:"the ₹60L lane · no pedigree filter",
  why:"US startups pay India-based PROVEN BUILDERS $60–100K+ (₹50–85L) because you still cost a third of a US hire. Hundreds of India-open roles live on workatastartup.com + Wellfound at any time. Ayush (SIRMVIT '25) got ₹60L at Gordian (YC W19) exactly this way — off-campus.",
  evi:"Typical process: application on the board → screen → 60-min technical/case study (system design) → founder/CEO round. Screens on artifacts, take-homes, and owning systems solo — not college.",
  mv:["<b>Wave-1 checklist: Wellfound + workatastartup.com profiles live by Oct 15</b>, P1 pinned","Apply to every India-open AI/backend posting from Jan 2027 (Wave-2)","Take-home = your P3/P3.5, pre-built","Comp is US-linked; ask the cash vs equity split"],
  src:"workatastartup.com · Wellfound · Gordian process · Talhive US-hiring guide 2026"},
 {n:"GOOGLE", tag:"lottery · ≤10% effort",
  why:"Summer internship: 'No CGPA, no experience, any degree, 3–6 mo, Pan-India.' Student Researcher = paid, the only India-accessible frontier-adjacent (DeepMind) door.",
  evi:"STEP interview: two 45-min technicals, same day. STEP skews 1st/2nd year.",
  mv:["Target the no-CGPA summer internship + Student Researcher","<b>Referral-first</b>; cap at 10% of application effort"],
  src:"Google Step Data (1).md · Google Student Researcher.md"}
];

const FUEL = [
 {q:"Tier-3 B.Tech CS, 0 experience → 6-month Amazon intern → Applied Scientist PPO. <b>CTC ~₹63L</b> (in-hand ~₹35L). The mechanism is intern→PPO — never a cold application. The internship is the whole game.",
  src:"Leetcode AS1 Tier 3.md · LeetCode AS1 PPO.md"},
 {q:"Sarvam AI offer, <b>₹84L including ESOPs</b>. 'No DSA was asked… to get an interview call, we had to build a VAD.' The artifact generated the interview. That's your entire strategy in one sentence.",
  src:"Sarvam Reddit.md"},
 {q:"AI engineer demand grew <b>~143% YoY in 2026</b> — 1.6M open positions vs 518K qualified candidates. A 3.2:1 gap. The market is starved for people who can actually build. That scarcity is your leverage.",
  src:"AI Agent Demand · Futureproof Demand · Divogue Shortage Data"},
 {q:"A <b>$140K vs $78K</b> split already exists inside the 'AI engineer' title — a $62,400 gap decided by whether you build with generative AI. P1/P2/P3.5 sit exactly on the premium side. Not luck — design.",
  src:"Interview Stack 140k"},
 {q:"'From slums to PhonePe <b>33 LPA</b> — competitive programming from Year 2, 800+ LeetCode, 3 projects, applied off-campus since PhonePe doesn't visit his college. 2 years of consistent effort.' And: 'in off-campus, CGPA criteria gets relaxed.'",
  src:"Z.ai Tier 3.md · Try Rehearsal Tier 3.md · CGPA Cutoffs"},
 {q:"<b>33%</b> of AI companies send a take-home that is 'build a RAG app or an agent.' Your P3 and P3.5 ARE that take-home — deployed, written up, done before it's assigned. A third of your targets, pre-won.",
  src:"Takehome Grigorev.md · Takehome Playbook.md"},
 {q:"The honest salary map: ordinary fresher AI = ₹8–18L. <b>₹50–60L is the 95th–99th percentile</b>, reached through exactly two doors your files document — AI-first startup + ESOPs, or intern→PPO. Both are artifact routes. Optimize for the room that compounds.",
  src:"AI Fresher Salary India · Indian Unicorns AI Salary · Own Your Career IIT 2026"}
];

/* ================================================================
   CASE FILES — real people who broke in. July 2026 research from
   Reddit/Blind/interview-experience posts + your own corpus.
   Each: who → what they did → outcome → the transferable lesson.
   ================================================================ */
const CASES = [
 {who:"SIRMVIT seniors → ₹21–60L, all off-campus", tier:"YOUR OWN COLLEGE · placement posters, verified Jul 2026",
  bg:"Same VTU college as you. Same professors, same placement cell, no IIT tag. Batches 2025–26.",
  move:"Ayush → Gordian (YC W19) via Wellfound/YC job boards, ₹60L. Joe → Avoca.ai ₹52L; Priyanshu (AIML '26) → Genie AI ₹38L — same YC/AI-startup lane. Shambhavi → Juspay ₹21L via the open Hiring Challenge (intern→PPO). Saurabh → Amazon internship ₹1.2L/mo. Every single one bypassed campus placement.",
  out:"₹21L–₹60L offers, from your exact starting point.",
  lesson:"The ceiling you asked about (₹60L) has already been hit from your own campus, through doors that are all in your plan: YC boards + artifacts, hiring challenges, intern→PPO. The posters aren't inspiration — they're verification.",
  src:"SIRMVIT placement posters · Gordian/Juspay process research (Jul 2026)"},
 {who:"Tier-3 B.Tech CS → Amazon Applied Scientist", tier:"corpus · verified precedent",
  bg:"Tier-3 college, 0 years experience. No pedigree.",
  move:"6-month Amazon internship, converted via PPO. Answered the ML-depth 'Bar Raiser' round on transformers at a root level.",
  out:"AS-1 offer, CTC ~₹63L (in-hand ~₹35L).",
  lesson:"The door is intern→PPO, never a cold application to the full-time role. This is why the internship is the entire game.",
  src:"Leetcode AS1 Tier 3.md · LeetCode AS1 PPO.md"},
 {who:"Fresher → Sarvam AI, no DSA", tier:"corpus · verified precedent",
  bg:"Fresher applicant to an AI-first unicorn.",
  move:"Built a Voice Activity Detection project and led with it. 'To get an interview call, we had to build a VAD.' No DSA was asked on that path.",
  out:"₹84L including ESOPs.",
  lesson:"The artifact generates the interview. Build one company-relevant thing and let the work earn the call.",
  src:"Sarvam Reddit.md"},
 {who:"'From the slums' → PhonePe", tier:"corpus · Reddit",
  bg:"No money, no network, college that PhonePe doesn't visit.",
  move:"Competitive programming from Year 2, 800+ LeetCode, 3 real projects, applied off-campus relentlessly. Two years of consistency.",
  out:"₹33L off-campus offer.",
  lesson:"Off-campus relaxes the CGPA gate but demands proof-of-work and stubbornness. Volume + time, not talent.",
  src:"Z.ai Tier 3.md · Try Rehearsal Tier 3.md"},
 {who:"Senior Staff MLE at Qualcomm, 0 on-the-job ML", tier:"Blind, 2026",
  bg:"Zero professional ML experience. Everything learned from 'useless' online certificates.",
  move:"6 months full-time self-study before applying — then another 6 months of applying to land a single interview. Did not quit the funnel.",
  out:"Senior staff ML engineer offer.",
  lesson:"The funnel is long and mostly silent (~90% no reply is normal). Demonstrated knowledge beat the missing credential — but only because he outlasted the silence.",
  src:"Blind — 'senior ml engineer offer with 0 ml experience'"},
 {who:"26-y/o Google SWE → AI role (internal pivot)", tier:"Business Insider, 2026",
  bg:"Already a Google software engineer, no AI background.",
  move:"7 months learning before applying, 2 hours every day. Made content/taught to understand material; solo projects to nail each concept.",
  out:"Internal transfer to an AI role at Google.",
  lesson:"Teaching-to-learn (write it, explain it) is a hiring-grade study method — the same reason ORACLE makes you debrief every block aloud.",
  src:"Business Insider — '26-year-old Google engineer'"},
 {who:"Self-taught AI engineer, <12 months", tier:"KDnuggets / field guides 2026",
  bg:"Beginner programmer, no CS pedigree.",
  move:"Built ONE deployed, end-to-end RAG project with real evaluation instead of ten half-finished notebooks. Reached out directly to AI-first startups with specific product ideas.",
  out:"Hired inside a year.",
  lesson:"Depth over breadth: one thoughtful shipped project that shows judgment beats a portfolio of Kaggle clones. AI-first startups are the most willing to bet on someone who ships.",
  src:"KDnuggets self-study roadmap; AI-engineering field guide 2026"},
 {who:"The adjacent-entry route", tier:"Blind — community pattern",
  bg:"Zero work experience, couldn't get a direct ML role.",
  move:"Took a data-analyst / SWE role at a company that employs ML scientists, built a GitHub of pet projects, then switched teams from the inside.",
  out:"Lateral move into ML once inside.",
  lesson:"If the front door is shut, a side door + internal transfer works. This is the GCC-route logic (Wells Fargo/JPMC/Walmart → lateral) — a planned ladder, not a failure.",
  src:"Blind — 'break into ML SWE with no industry exp'; AI Jobs India 2026"},
 {who:"AI4Bharat / IIT-M research interns", tier:"corpus + lab norm",
  bg:"CGPA-blind, college-blind selection. Sarvam's own founders came through here.",
  move:"Merged real pull requests into their open repos (IndicTrans / IndicWhisper) BEFORE applying, then emailed a researcher with the PR as the hook.",
  out:"Paid 1–2 year research internships; a network that compounds.",
  lesson:"OSS contributions are the CGPA-blind door hiring panels actually weight — 'strong OSS or published work, not Coursera certificates.'",
  src:"AI4Bharat Intern.md · AI fresher India guide 2026"}
];
const CASE_PATTERNS = [
 "The artifact earns the interview — in every startup case, a built, specific project (not a resume) generated the call.",
 "Intern→PPO or side-door→lateral — nobody cold-applied straight into the senior/full-time seat. There was always a converting foothold.",
 "The funnel is long and silent — 6+ months and ~90% no-reply is normal even for eventual winners. Outlasting it is the skill.",
 "Depth beats breadth — one deployed, evaluated, end-to-end project consistently outperformed many shallow ones.",
 "Consistency over intensity — 2 hours daily for months shows up far more than any single sprint.",
 "OSS + direct outreach open CGPA-blind doors — merged PRs and specific, product-aware messages to founders/engineers convert above portal applications."
];

/* ================================================================
   HIRING REQUIREMENTS — deep research, July 2026.
   Sources: 2026 AI-engineer JDs, YC founding-engineer hiring writeups,
   Anthropic/OpenAI/DeepMind entry analyses, Naukri/Internshala/Wellfound
   fresher listings, Sundeep Teki lab guides, alexeygrigorev field guide,
   plus your own corpus (Sarvam/Amazon/AI4Bharat).
   cov: 'yes' covered by plan · 'partial' thin spot · 'gap' add it.
   ================================================================ */
const REQ_GROUPS = [
 {g:"NON-NEGOTIABLE — every AI/ML role in 2026", items:[
  {r:"RAG — retrieval-augmented generation", d:"“The single most in-demand AI-engineering skill in 2026 — every company building with LLMs needs someone who can ground outputs in real documents.” A deployed RAG system beats a fine-tuned model with no endpoint.", cov:"yes", by:"P3 (Gate 2) — 1,000+ real docs, hybrid retrieval + rerank", src:"AI Engineer Skills 2026; DataExpert portfolio guide"},
  {r:"Evals for non-deterministic systems", d:"“Most AI engineers ship without evaluation. The ones who get hired write tests for non-deterministic systems.” Nearly every JD asks for eval pipelines, golden datasets, LLM-as-judge — this is THE differentiator.", cov:"yes", by:"P3 eval harness — 50-Q gold set, recall@k, faithfulness, planted-regression test", src:"AI Engineer Skills 2026; YC founding-engineer filter"},
  {r:"Deployed projects with live demos + metrics", d:"“Recruiters engage 80% more with GitHub featuring runnable code or live demos.” 3–5 production-ready projects with a public URL and a measured number — not 20 notebooks.", cov:"yes", by:"Every P-project ships: repo + one-command reproduce + write-up + live demo", src:"DataExpert; Scaler; dev.to hiring guides"},
  {r:"Deployment stack — Docker, FastAPI, cloud", d:"“Expected, not nice-to-haves.” Recruiters filter on deployment experience; a clickable URL a founder can open is the deliverable.", cov:"yes", by:"Module 06 — Dockerized FastAPI on Railway/Render", src:"AI Engineer Skills 2026; Unico Connect"},
  {r:"Transformer + attention internals, by hand", d:"“Be prepared to explain the underlying math of embeddings, attention, and optimization.” Exactly the Amazon ML-depth ‘Bar Raiser’ round.", cov:"yes", by:"P1 (Gate 1) — built from a blank file, attention on paper first", src:"MLE new-grad JDs 2026; Amazon Intern Data.md"},
  {r:"PyTorch internals + clean Python", d:"“Deep understanding of PyTorch internals, not just high-level usage. Clean, modular, performance-profiled code.”", cov:"yes", by:"Module 00 + Module 04 — MLP/bigram from scratch, then clean", src:"PlanGrid/AMD/Apple MLE guides 2026"},
 ]},
 {g:"HIGH-WEIGHT — startups & product companies", items:[
  {r:"Agents + MCP", d:"On every 2026 hiring checklist: agent orchestration, MCP integration, agentic-dev proficiency. A published MCP server is a signal few applicants have.", cov:"yes", by:"P3.5 — ReAct from scratch + published MCP server", src:"AI Skills in Demand 2026; YC RFS"},
  {r:"PoC architecture under pressure", d:"YC’s most predictive filter: a paired session designing a proof-of-concept for their actual problem — RAG design, quality measurement, eval datasets, cost per query — then pair-coding it.", cov:"partial", by:"P3/P3.5 give the substance; drill the 6-step system-design framework in Module 10", src:"Recruiting From Scratch — hiring an AI founding engineer 2026"},
  {r:"Ship fast to real users / traction", d:"“Enterprise buyers want teams that bend AI to solve problems faster than ever.” A public artifact with actual users beats a static repo.", cov:"partial", by:"Push each demo publicly; get ≥1 real user to try P3/P3.5 and log it", src:"YC 2026; standout.work"},
  {r:"Cost, observability, guardrails/safety", d:"On the senior JD checklist: cost per query, production observability, safety/guardrails. Worth a paragraph in each write-up.", cov:"partial", by:"Add a cost table + a guardrail note to the P3 and P2 write-ups", src:"AY Automate 15 skills; Unico Connect"},
 ]},
 {g:"EMPLOYABILITY LAYER — passes portal filters & resume keyword-match", items:[
  {r:"Multi-provider LLM API fluency", d:"“Knowing one is not enough” — JDs name Anthropic, OpenAI, and Bedrock. Your scratch-first depth wins interviews; add breadth so keyword filters don’t drop you.", cov:"gap", by:"ADD: a 1-day pass calling 3 providers behind one interface in P3’s commodity-layer week", src:"AI Engineer Skills 2026"},
  {r:"Framework familiarity — LangChain / LlamaIndex", d:"Recruiters and ATS keyword-match on frameworks even when you built the internals yourself. Name them once in a project, honestly.", cov:"gap", by:"ADD: reimplement one P3 retrieval path via LangChain, note it in the README", src:"AI fresher India guide; ML Eng Salary India"},
  {r:"AI-native dev workflow — Cursor / Copilot / Claude Code", d:"“Engineers who ship most in 2026 work best with AI as a collaborator.” Becoming ‘mandatory for high-paying roles.’ You already use Claude as a body-double — make it visible.", cov:"partial", by:"Work in Cursor/VS Code; mention AI-assisted workflow in write-ups + interviews", src:"digitalapplied hiring 2026; AI fresher India guide"},
  {r:"Open-source contributions / public artifacts", d:"“The skills panels actually weight: strong OSS contributions or published work — not Coursera certificates.” AI4Bharat selects purely on merged PRs.", cov:"partial", by:"Elevate: 2–3 merged PRs to IndicTrans/IndicWhisper or vLLM in Phase 2–3", src:"AI fresher India; AI4Bharat Intern.md; DataExec labs 2026"},
 ]},
 {g:"FRONTIER LABS — the long game (Anthropic / OpenAI / DeepMind)", items:[
  {r:"Public artifacts showing scale-thinking", d:"“What works: production systems that show scale thinking + public artifacts of deep expertise.” No PhD required (Anthropic explicit); research instinct + self-direction.", cov:"yes", by:"P1→P2 are exactly this; P2 (inference/GPU) is the rare scale-thinking signal", src:"DataExec 2026; Sundeep Teki lab guide"},
  {r:"Relationships built 6–12 months early", d:"“Develop genuine relationships with people at target companies 6–12 months before applying.” Cold-applying with tutorial projects does not work.", cov:"partial", by:"Start now: follow + reply to lab engineers; your 100-outreach campaign, aimed early", src:"DataExec 2026; dossier §5"},
  {r:"Entry via fellowships / research internships / OSS", d:"Truly entry-level lab roles are rare; the real doors are safety fellowships, research internships, and prior OSS/adjacent-lab work.", cov:"partial", by:"Track Anthropic Fellows / OpenAI Residency windows; OSS is the bridge", src:"OpenAI Residency; Anthropic hiring analysis 2026"},
 ]},
 {g:"REALITY & CONTINGENCY — the India fresher market", items:[
  {r:"Startup fresher pipelines are tiny", d:"Sarvam/Krutrim/Yellow hire ~5–15 freshers/yr, mostly IIT-M/IIIT-H/IISc/PhD. For a Tier-3 off-campus candidate, the artifact + intern-converts route is the only realistic door — which is exactly this plan.", cov:"yes", by:"Intern→PPO + artifact-earns-interview is the whole strategy", src:"AI ML jobs India 2026; ownyourcareer Sarvam"},
  {r:"TARGET: direct ₹50–60L as a fresher — proven at YOUR college", d:"Corrected again Jul 2026. The older Tier-3 research (5/5 cases via service companies) describes a <b>pre-2020, general-SWE market</b> — Pradeep started 2008, the ₹2.16L case 2016. <b>Stale for your cohort.</b> Current, same-college evidence beats it: Ayush → ₹60L (Gordian, YC W19), Joe → ₹52L (Avoca.ai), Priyanshu → ₹38L (Genie AI) — all 2025–26 batch, all direct, all off-campus, <b>zero service companies in between</b>. The AI/YC/US-remote lane did not exist for the older cases. It exists now and your seniors walked through it.", cov:"yes", by:"AIM DIRECT. Wave-1/2 target the AI-first + YC/US-remote lane exclusively (Wellfound + workatastartup profiles live by Oct 15). Service/GCC is unlisted insurance only — never an aim, never a plan, and not something you spend attention on.", src:"SIRMVIT placement posters 2025–26 (primary, current) · Tier-3 report (dated, deprioritised)"},
  {r:"DSA — enough to clear gates, not CP obsession", d:"GitHub wins decisively over LeetCode for AI roles in 2026, but portals/OAs still gate on 2 mediums. Your files agree: Sarvam’s top path had no DSA; GRiD R2 is basic; Amazon OA is 2 mediums.", cov:"yes", by:"DSA track: 300 by Apr, bar = 2/3 cold mediums in 30 min — no more", src:"GitHub-vs-LeetCode 2026; your DSA track"},
 ]}
];

/* ================================================================
   PRIMERS — plain-words teaching notes per module. Read the primer
   BEFORE the module's first block; re-read when lost mid-module.
   ================================================================ */
const PRIMERS = {
 m0:"<b>What this really is:</b> re-learning Python as a tool you shape, not a subject you study. The test of this module isn't syntax recall — it's whether a traceback feels like information instead of punishment.<br><b>3 ideas that carry everything:</b> ① everything in Python is an object with methods you can discover (<i>dir()</i>, <i>help()</i>); ② errors read bottom-up — last line first, then trace upward; ③ git commit = save-point in a game: commit tiny, commit often, fear nothing.",
 m1:"<b>What this really is:</b> pattern recognition training, not math talent. Every interview problem is one of ~12 disguises; the skill is naming the disguise in 30 seconds, and that comes from Anki triggers, not from solving 1,000 problems.<br><b>3 ideas:</b> ① 'pair/count/duplicate' → hash map, 'sorted/rotated' → binary search, 'substring/window' → sliding window — memorize the triggers, the code follows; ② being stuck 20 min = read the solution, understand it, re-code it from memory next day (that IS learning); ③ your bar is 2/3 mediums in 30 min — you are not training for Codeforces.",
 m2:"<b>What this really is:</b> just enough math to trust and debug models — you're building intuition for shapes and slopes, not proving theorems.<br><b>3 ideas:</b> ① a matrix multiply is just many dot products — if you can track (rows×cols)·(cols×k)=(rows×k) you can debug 90% of shape errors; ② a gradient is 'which way is downhill and how steep' — training is literally walking downhill in a million dimensions; ③ cross-entropy = 'how surprised was the model by the right answer' — that's why lower loss means better predictions.",
 m3:"<b>What this really is:</b> the vocabulary of every ML interview and the lifecycle of every ML system: split data → fit → measure honestly → find where it fails. Deep learning changes the model, never this loop.<br><b>3 ideas:</b> ① train/val/test exists because models cheat — leakage is the #1 sin and it's always an accident; ② bias-variance: underfitting = too simple everywhere, overfitting = memorized the noise — every regularization trick is just a lever between them; ③ pick the metric BEFORE the model, or the model picks a flattering one for you.",
 m4:"<b>What this really is:</b> learning the training loop so deeply it becomes reflex — forward, loss, backward, step. P1 stands entirely on this module.<br><b>3 ideas:</b> ① autograd just records every operation and replays it backwards — magic becomes bookkeeping once you print .grad; ② predict every tensor's shape before running the line — the habit that separates people who debug in minutes from people who suffer for hours; ③ when loss explodes it's almost always learning rate; when it flatlines it's almost always data or a wiring bug — check those before touching architecture.",
 m5:"<b>What this really is:</b> THE flagship. A transformer is: turn text into numbers (tokenizer) → let every position look at every earlier position and decide what's relevant (attention) → do it in parallel heads, stack layers, predict next token. That's the whole thing — everything else is stabilizers.<br><b>3 ideas:</b> ① attention = weighted lookup: Q asks 'what am I looking for', K advertises 'what I contain', V is 'what you get' — softmax(QK^T)V is a soft dictionary; ② the causal mask just hides the future so the model can't cheat; ③ do the 3-token attention computation ON PAPER before coding — the Amazon 'root level' question is literally this. When your loss < 1.5 nats you'll understand this system better than most working engineers.",
 m6:"<b>What this really is:</b> making your model a URL a founder can click. Not webdev — plumbing: request in → model runs → JSON out.<br><b>3 ideas:</b> ① an API is a function with an address — FastAPI turns Python functions into endpoints, that's 80% of it; ② Docker = shipping your exact laptop so 'works on my machine' becomes 'works everywhere'; ③ deploy something embarrassingly small on day one — a live hello-world beats a perfect local system, and the demo URL is the deliverable.",
 m7:"<b>What this really is:</b> the take-home a third of AI companies will literally assign you — built early, deployed, measured. RAG = find the relevant documents, paste them into the prompt, make the model answer FROM them.<br><b>3 ideas:</b> ① embeddings put meaning into geometry — similar sentences become nearby points, retrieval is nearest-neighbor search; ② the eval harness is the differentiator: a 50-question gold set + recall@k turns 'it seems better' into 'recall@5 went 0.61→0.72' — almost no fresher has this; ③ plant a deliberate regression and prove your harness catches it — that one sentence in the write-up outweighs everything else.",
 m8:"<b>What this really is:</b> an agent is an LLM in a while-loop: think → pick a tool → observe result → repeat until done. Demystify it once and the hype industry never fools you again.<br><b>3 ideas:</b> ① ReAct is just forcing the model to alternate reasoning and acting in text you parse; ② tools are functions you describe to the model — it outputs which one to call, YOUR code calls it; ③ agents fail in loops and dead-ends, which is why agent evals (gold trajectories) are rarer and more valuable than agent demos. Your published MCP server = a repo few applicants on earth have.",
 m9:"<b>What this really is:</b> the rarest fresher skill — making models FAST and CHEAP. This is your NVIDIA/Sarvam differentiator, and it's mostly one insight applied repeatedly.<br><b>3 ideas:</b> ① generation is O(n²) because each token recomputes attention over everything — the KV cache stores past keys/values so each new token is O(n): know the 7B memory math cold; ② quantization = storing weights in 8 or 4 bits instead of 16 — near-free speedup, always benchmarked, never asserted; ③ throughput lives in batching — PagedAttention is just virtual memory for the KV cache. Read vLLM source with this map and it opens up.",
 m10:"<b>What this really is:</b> conversion season — artifacts become offers. The interview is a performance you rehearse, not an exam you hope about.<br><b>3 ideas:</b> ① every behavioral answer = STAR from your own DECISIONS.md — you already wrote the stories, mine them; ② steer every technical answer to a repo: 'I built exactly this in P3, here's what broke' beats any textbook answer; ③ the funnel is silent (~90% no-reply even for winners) — volume + follow-ups + referrals, and the 2-min/5-min artifact walkthroughs rehearsed out loud 20 times."
};

const GLOSS = [
 {t:"MVS",d:"Minimum Viable Session — shrink a can't-start day to 10 minutes. It still counts; the streak survives. Zero-days get 'tomorrow then.'",s:"AUTOPILOT · §43"},
 {t:"Baseline (the canary)",d:"The five daily signals: meds+sunlight, exercise 20m, Anki 10m, one GitHub commit, ≥7h sleep. When the canary stops singing, check for a dip before pushing.",s:"Execution Cockpit"},
 {t:"Gate",d:"A dated, immovable shipping deadline: P1 Oct 15 → P3 Jan 1 → P3.5 Feb 28 → offer May 1. Gates don't move; the work between them flexes.",s:"Syllabus · Master Edition"},
 {t:"Artifact",d:"A public, reproducible, written-up project (repo + write-up + demo). Artifacts, not grades, generate interviews off-campus.",s:"dossier §5"},
 {t:"P1 / P3 / P3.5 / P2",d:"The four flagships: transformer from scratch → RAG + evals → agents + MCP → inference/GPU. Each is also a pre-built take-home for a slice of your targets.",s:"Roadmap"},
 {t:"Wave-1 / Wave-2",d:"Application batches unlocked by shipping: Wave-1 (50 apps) opens when P1 ships; Wave-2 (startup batch: Sarvam, Krutrim, Yellow) opens when P3 is live.",s:"Roadmap · dossier"},
 {t:"The VAD move",d:"Build a small company-relevant artifact and let it earn the interview call — from the ₹84L Sarvam precedent where a Voice Activity Detection project got the interview and 'no DSA was asked.'",s:"Sarvam Reddit.md"},
 {t:"Intern → PPO",d:"The only documented path to AS-1-level offers from Tier-3: internship converted to a Pre-Placement Offer. Never a cold application to the full-time role.",s:"Leetcode AS1 Tier 3.md"},
 {t:"AS-1",d:"Amazon Applied Scientist level 1. The ₹63L precedent: Tier-3 B.Tech → 6-month intern → AS-1 PPO.",s:"LeetCode AS1 PPO.md"},
 {t:"MLSS",d:"Amazon ML Summer School. Any recognised Indian institute, grad 2027+. 60-min test (MCQs + 2 DSA), ~5% selection. Registration ~June 2027.",s:"Amazon MLSS 2026.md"},
 {t:"Bar Raiser",d:"Amazon's ML-depth interviewer — asked 'transformers at a root level, optimization.' P1 is the answer, from having built it.",s:"Amazon Intern Data.md"},
 {t:"Leadership Principles (LP)",d:"Amazon's behavioral rubric, tested even in technical rounds. Prep: 6+ STAR stories mapped from your project logs.",s:"Amazon I Got An Offer.md"},
 {t:"Take-home",d:"33% of AI companies send one (2–7 days), almost always 'build a RAG app or agent.' Treat it like a mini job. Yours is pre-built: P3/P3.5.",s:"Takehome Grigorev.md"},
 {t:"Body doubling",d:"Working alongside someone (Focusmate slot, or pasting the task + error to Claude) to make starting possible. A tool, not a crutch.",s:"Mission Console"},
 {t:"Dip vs burnout",d:"They feel identical but need opposite responses. Test: halve targets for one week — capacity recovers = dip (push through); doesn't = burnout (rest properly; pushing prolongs it).",s:"§43.8"},
 {t:"Crisis levels",d:"L1 (1–3 days down): drop artifacts 48h, keep baseline. L2 (4–10): pause everything but baseline + CGPA, tell support person, no plan decisions 7 days. L3 (11+, depression signs): psychiatrist within 48h; the plan pauses — you matter more.",s:"§43.8"},
 {t:"RSD",d:"Rejection Sensitive Dysphoria — outsized pain from rejection, common with ADHD. Named in the L2 protocol; expect it during application waves, plan for it.",s:"§43"},
 {t:"Zero-day",d:"A day with nothing done. The rule: zero-days get 'tomorrow then' — no shame spiral, no 2× catch-up.",s:"AUTOPILOT"},
 {t:"Buffer Saturday / ×2 rule",d:"Everything overruns (~2×). Saturdays are unplanned so slippage dies there instead of compounding.",s:"Master Edition"},
 {t:"Quarterly review",d:"The only time the frozen plan may change (§45.3). Inputs: the Execution Log's bugs, not vibes.",s:"Execution Log v1.1"},
 {t:"Execution Log",d:"Where friction goes as 'bugs found through use' + the wins table. A bug is something execution revealed, not something a re-read suggested.",s:"Execution Log v1.1"},
 {t:"DECISIONS.md",d:"Per-project engineering journal (what broke, what you chose, why). Becomes the write-up — and your STAR story bank.",s:"p1-transformer"},
 {t:"Dopamine log (§46)",d:"Deliberate celebration: log what shipped. Your wins feed the fuel rotation here.",s:"Master Edition §46"},
 {t:"BPE",d:"Byte-Pair Encoding — subword tokenization. You build your own after minbpe study; swapping char→BPE is a logged experiment in P1.",s:"Syllabus M05"},
 {t:"RoPE",d:"Rotary Positional Embeddings — the modern positional scheme (Llama-class). Implement + ablate vs sinusoidal; the ablation table is write-up gold.",s:"Syllabus M05"},
 {t:"KV cache",d:"Caching attention keys/values during generation: O(n²)→O(n) per token. Know the memory formula and the 7B example cold — the P2 centerpiece.",s:"Syllabus M09"},
 {t:"Quantization",d:"INT8/INT4 weights to shrink memory and speed inference; always benchmarked against FP16, never asserted.",s:"Syllabus M09"},
 {t:"PagedAttention",d:"vLLM's virtual-memory-style KV-cache management — read the source, then one OSS PR (frontier-adjacent signal).",s:"Syllabus M09"},
 {t:"RAG",d:"Retrieval-Augmented Generation: embed → index (1,000+ real docs) → retrieve → generate grounded answers with citations. P3's core.",s:"Syllabus M07"},
 {t:"Evals / gold set",d:"A 50-question labelled set + recall@k, faithfulness, LLM-as-judge. The differentiator: your harness must catch a regression you plant on purpose.",s:"Syllabus M07"},
 {t:"MCP",d:"Model Context Protocol — a standard for exposing tools/retrieval to models. Publishing an MCP server (over P3's retrieval) is a repo few applicants have.",s:"Syllabus M08"},
 {t:"ReAct",d:"Reason + Act agent loop, built from the raw API with your own tools — no frameworks first.",s:"Syllabus M08"},
 {t:"Trigger cards",d:"Anki cards mapping problem phrasings to patterns ('pair/count/duplicate → hash map'). Retention is the DSA track; solving is just exposure.",s:"Syllabus M01"},
 {t:"Time lens",d:"ORACLE's date scrubber — view any day's mission and countdowns. Pre-load tomorrow, then stop thinking.",s:"ORACLE"}
];

/* ================= STATE (shared schemas with AUTOPILOT.html & Syllabus.html) ================= */
const AP = JSON.parse(LS.getItem("autopilot")||"{}"); AP.days=AP.days||{};
const saveAP=()=>LS.setItem("autopilot",JSON.stringify(AP));
const SY = JSON.parse(LS.getItem("syl_v2")||"{}");
const saveSY=()=>LS.setItem("syl_v2",JSON.stringify(SY));

const USER = JSON.parse(LS.getItem("oracle_user")||"{}");
USER.dl=USER.dl||[];       USER.dlOv=USER.dlOv||{};
USER.win=USER.win||[];     USER.winOv=USER.winOv||{};
USER.gates=USER.gates||{}; USER.tasks=USER.tasks||{};
USER.wins=USER.wins||[];   USER.bugs=USER.bugs||[];
USER.fuel=USER.fuel||[];   USER.offset=USER.offset||0;
USER.stars=USER.stars||[]; USER.mocks=USER.mocks||[];
USER.apps=USER.apps||[];   USER.reviews=USER.reviews||{};
USER.blockGoal=USER.blockGoal||3;
const saveU=()=>LS.setItem("oracle_user",JSON.stringify(USER));

function eGates(){return GATES.map((g,i)=>USER.gates[i]?Object.assign({},g,{d:new Date(USER.gates[i]+"T00:00:00")}):g);}
function eDLs(){
  const base=DLS.map((x,i)=>{const o=USER.dlOv[i]||{};return o.hide?null:[o.l||x[0],o.d||x[1]];}).filter(Boolean);
  return base.concat(USER.dl.map(x=>[x.l,x.d])).sort((a,b)=>a[1]<b[1]?-1:1);
}
function eWindows(){
  const base=WINDOWS.map((w,i)=>{const o=USER.winOv[i]||{};
    if(o.hide)return null;
    if(!o.open&&!o.close)return w;
    return Object.assign({},w,{open:o.open?new Date(o.open+"T00:00:00"):w.open,
      close:o.close?new Date(o.close+"T00:00:00"):w.close,est:false});}).filter(Boolean);
  return base.concat(USER.win.map(w=>({n:w.n,tag:w.tag||"custom",open:new Date(w.open+"T00:00:00"),
    close:new Date(w.close+"T00:00:00"),note:w.note||"Added by you.",src:"your edit"})));
}
function eFuel(){return FUEL.concat(USER.fuel);}

/* ================= ENGINE ================= */
const MS=86400000;
const fmt=d=>d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const fmtS=d=>d.toLocaleDateString('en-IN',{day:'numeric',month:'short'});
const day0=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate());
const dd=(a,b)=>Math.round((day0(b)-day0(a))/MS);
const iso=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,'0')+"-"+String(d.getDate()).padStart(2,'0');
let lens=null;
function today(){ return lens? new Date(lens) : day0(new Date()); }
function isRealToday(){ return !lens; }
function workdays(a,b){let n=0,c=new Date(day0(a));while(c<b){if(c.getDay()!==0)n++;c=new Date(c.getTime()+MS);}return n;}

function weekFor(d){
  // AUTHORITATIVE RULE: ACTIVE SCHEDULE = BUILD overlay from Oct 7 through Nov 6. All pre-existing weekly missions, gates, application targets and phase transitions inside this window are historical/reference only and MUST NOT drive today's mission.
  const buildStart = new Date("2026-10-07T00:00:00");
  const buildEnd = new Date("2026-11-06T23:59:59");
  if(d >= buildStart && d <= buildEnd){
    // Return BUILD week (Oct 5 week is BUILD PHASE)
    for(const w of WEEKS.weeks){ if(w.s==="2026-10-05") return w; }
    // Fallback: find best but force BUILD
    let best=null;
    for(const w of WEEKS.weeks){const ws=new Date(w.s+"T00:00:00"); if(ws<=d&&(!best||ws>new Date(best.s+"T00:00:00")))best=w;}
    if(best) return best;
  }
  let best=null;
  for(const w of WEEKS.weeks){const ws=new Date(w.s+"T00:00:00");
    if(ws<=d&&(!best||ws>new Date(best.s+"T00:00:00")))best=w;}
  if(best){const ws=new Date(best.s+"T00:00:00"); if(d>=new Date(ws.getTime()+7*MS)&&dd(ws,d)>13)return null;}
  return best;
}
function planFor(dRaw){
  const d=USER.offset? new Date(dRaw.getTime()-USER.offset*MS) : dRaw;
  const k=iso(d), w=weekFor(d);
  // BUILD overlay is authoritative Oct 7-Nov 6 — w is forced to BUILD week by weekFor, old gates/missions are historical only
  if(!w){
    if(d<new Date(WEEKS.weeks[0].s+"T00:00:00"))
      return {ph:"PRE-FLIGHT",th:"Before the plan starts",list:["Rest. The plan ignites 22 July 2026. Tonight's only job: fixed sleep time. Optional: open the Colab notebook once, just to look."]};
    return {ph:"POST-PLAN",th:"Past the planned horizon",list:["The 42-week plan ends May 3 2027 — exams + MLSS + the offer table. If no offer landed, run the contingency ladder from the Master Edition (pre-planned, not failure)."]};
  }
  let list=(w.d[String(d.getDay())]||["Buffer day: MVS commit + baseline"]).slice();
  if(OVR[k]) list=[OVR[k]].concat(list.slice(1));
  return {ph:w.ph,th:w.th,list:list};
}
function dayDone(rec){return rec&&((rec.t&&rec.t.m)||rec.mvsdone||((rec.blocks||[]).length>0));}
function streak(){
  let st=0;
  for(let i=0;i<600;i++){const d=new Date();d.setDate(d.getDate()-i);
    const r=AP.days[iso(day0(d))];
    if(dayDone(r))st++;else if(i===0)continue;else break;}
  return st;
}
function ring(label,pct,color){
  const r=38,C=2*Math.PI*r,off=C*(1-Math.min(Math.max(pct,0),1));
  const rt=r+8,Ct=2*Math.PI*rt; /* instrument bezel tick marks */
  return `<div class="ring"><svg width="104" height="104" viewBox="0 0 104 104">
    <circle cx="52" cy="52" r="${rt}" fill="none" stroke="var(--line2)" stroke-width="3"
      stroke-dasharray="1.5 ${Ct/24-1.5}" opacity=".7"/>
    <circle class="track" cx="52" cy="52" r="${r}" stroke-width="6"/>
    <circle class="val" cx="52" cy="52" r="${r}" stroke-width="6" stroke="${color}"
      stroke-dasharray="${C}" stroke-dashoffset="${off}"/>
    <text class="num" x="52" y="58" text-anchor="middle">${Math.round(pct*100)}%</text>
  </svg><div class="lbl">${label}</div></div>`;
}
function syllCounts(){
  let done=0,tot=0;
  SYL.forEach(p=>p.mods.forEach(m=>{tot+=m.topics.length;done+=(SY[m.id]||[]).filter(Boolean).length;}));
  return {done,tot};
}
function activeModule(){
  const allMods=SYL.flatMap(p=>p.mods);
  const sorted=[...allMods].sort((a,b)=>a.dl<b.dl?-1:1);
  return sorted.find(m=>(SY[m.id]||[]).filter(Boolean).length<m.topics.length);
}

/* ================= RENDER ================= */
function render(){
  const T=today();
  const dayN=dd(START,T)+1;
  const plan=planFor(T);

  let phasetxt;
  if(dayN<1) phasetxt=`PRE-FLIGHT · <b>T-minus ${1-dayN} day${1-dayN>1?'s':''}</b> to Day 1 (Jul 22)`;
  else if(dayN>TOTAL) phasetxt=`CAMPAIGN COMPLETE · day ${dayN} · post-gate territory (MLSS ahead)`;
  else phasetxt=`DAY <b>${dayN}</b> OF ${TOTAL} · ${plan.ph} · ${Math.round(dayN/TOTAL*100)}% of the runway used`;
  document.getElementById('phaseline').innerHTML=phasetxt;

  const GG=eGates();
  const gate=GG.find(g=>g.d>=T)||GG[GG.length-1];
  const gd=Math.max(dd(T,gate.d),0);
  document.getElementById('gatename').textContent=gate.full;
  document.getElementById('bigdays').innerHTML=gd+`<small> days</small>`;
  document.getElementById('bigunit').innerHTML=`≈ ${workdays(T,gate.d)} working days<br>(Sundays protected)`;
  document.getElementById('gatesub').textContent=`Gate date: ${fmt(gate.d)} — deadlines that don't move.`;
  document.getElementById('gatewhy').innerHTML=`${gate.why} <span class="src">[${gate.src}]</span>`;

  const sc=syllCounts();
  const solved=parseInt(LS.getItem('oracle_dsa')||'0',10)||0;
  document.getElementById('rings').innerHTML=
    ring('RUNWAY',Math.min(Math.max(dayN/TOTAL,0),1),'var(--amber)')+
    ring('SYLLABUS',sc.tot?sc.done/sc.tot:0,'var(--acc)')+
    ring('DSA/300',Math.min(solved/300,1),'var(--green)');

  const span=dd(START,GG[4].d);
  const pct=Math.min(Math.max(dd(START,T)/span,0),1)*100;
  document.getElementById('railfill').style.width=pct+'%';
  document.getElementById('railyou').style.left=`calc(${pct}% - 2px)`;
  const gm=document.getElementById('gmarks');gm.innerHTML='';
  const sMark=document.createElement('div');
  sMark.className='gmark'+(T>=START?' passed':'');sMark.style.left='0%';sMark.style.transform='translateX(0)';
  sMark.innerHTML=`<div class="tick"></div>START<div class="dd">Jul 22</div>`;gm.appendChild(sMark);
  GG.forEach(g=>{
    const p=Math.min(dd(START,g.d)/span,1)*100;
    const el=document.createElement('div');
    const passed=T>g.d,isNext=(g===gate&&!passed);
    el.className='gmark'+(passed?' passed':'')+(isNext?' next':'');
    el.style.left=p+'%';if(p>96)el.style.transform='translateX(-100%)';
    el.innerHTML=`<div class="tick"></div>${g.n.split('·')[0].trim()}<div class="dd">${fmtS(g.d)}${passed?' ✓':isNext?` · ${dd(T,g.d)}d`:''}</div>`;
    gm.appendChild(el);
  });

  renderLaunch(T,plan);
  renderToday(T,plan);
  renderPace(T,solved);
  renderDl(T);
  renderSyll(T);
  renderRoadmap(T);
  renderRadar(T);
  renderStats(T,dayN,sc,solved);
  renderWeeks(T);
  renderGloss();
  renderAnalytics(T);
  renderMarket();
  renderArsenal();
  renderReqs();
  renderCases();
  renderPipe(T);
  renderReview(T);
  tDraw();

  const lb=document.getElementById('lensbar');
  if(lens){lb.classList.add('on');document.getElementById('lensdate').textContent=fmt(T);}
  else lb.classList.remove('on');
  document.getElementById('streaktop').textContent=streak();
  /* runway hairline across the top of the screen */
  const realN=dd(START,day0(new Date()))+1;
  document.getElementById('runbar').style.width=Math.min(Math.max(realN/TOTAL*100,0),100)+'vw';
}

/* ---- TODAY ---- */
function renderToday(T,plan){
  document.getElementById('todaydate').textContent=fmt(T);
  const tb=document.getElementById('todaybody');
  const k=iso(T);
  const live=isRealToday();
  const day= live ? (AP.days[k]=AP.days[k]||{t:{},b:{},mvs:false,mvsdone:false}) : (AP.days[k]||{t:{},b:{},mvs:false,mvsdone:false});

  let h='';
  if(!live) h+=`<div class="ro">⌖ read-only — viewing another day through the lens</div>`;
  h+=`<div class="theme">WEEK — <b>${plan.th}</b> · ${plan.ph}</div>`;

  /* week strip — the day inside its calendar week */
  {const mon=new Date(T.getTime()-((T.getDay()+6)%7)*MS);
   const DN=['M','T','W','T','F','S','S'];
   h+=`<div class="weekstrip">`;
   for(let i=0;i<7;i++){const dW=new Date(mon.getTime()+i*MS);
     const r=AP.days[iso(dW)];const isT=dd(T,dW)===0;const fut=dW>T;
     const cls=dayDone(r)?((r.t&&r.t.m)||((r.blocks||[]).length)?'done':'mvs'):'';
     h+=`<div class="wsday ${isT?'today':''} ${fut?'future':''}"><div class="wsn">${DN[i]}</div>
       <div class="wsd">${dW.getDate()}</div><div class="wsdot ${cls}"></div></div>`;}
   h+=`</div>`;}

  /* today's sessions — clock-stamped, so the day is a timeline, not a switch */
  if(live){
    const bl=day.blocks||[];
    const tmin=bl.reduce((a,b)=>a+(b.mins||50),0);
    const tstr=tmin?(tmin>=60?`${Math.floor(tmin/60)}h ${tmin%60}m`:`${tmin}m`):'0m';
    h+=`<div class="timeline"><div class="lbl"><span>TODAY'S SESSIONS</span><span>${bl.length} block${bl.length===1?'':'s'} · ${tstr} · floor ${USER.blockGoal||3}</span></div>`;
    if(!bl.length)h+=`<div class="tlempty">No blocks yet today. The first one is the hardest — start it above.</div>`;
    else bl.forEach((b,i)=>{h+=`<div class="tlrow"><span class="tm">${b.at||'—'}</span>
      <span>${b.n?b.n:'<span style="color:var(--faint)">(block '+(i+1)+', no note)</span>'}</span>
      <span class="df ${b.df||'edge'}">${({easy:'EASY',edge:'EDGE',drown:'DEEP'})[b.df||'edge']}</span></div>`;});
    h+=`</div>`;
  }
  h+=`<div class="primary"><div class="plbl">PRIMARY MISSION — this alone makes the day count</div>
    <label class="t ${day.t.m?'done':''}"><input type="checkbox" data-k="m" ${day.t.m?'checked':''} ${live?'':'disabled'}><span><b>${plan.list[0]}</b></span></label></div>`;
  const bankedN=Object.values(AP.days).filter(dayDone).length;
  h+=`<div class="doneb" id="doneb" style="${dayDone(day)?'display:block':''}">✓ Streak safe — evidence #${bankedN} that you ship. The day stays open: keep stacking blocks, wrap up only when you actually stop for the night.</div>`;
  plan.list.slice(1).forEach((t,i)=>{
    h+=`<label class="t ${day.t[i]?'done':''}"><input type="checkbox" data-k="${i}" ${day.t[i]?'checked':''} ${live?'':'disabled'}><span>${t}</span></label>`;
  });
  const myT=USER.tasks[k]||[];
  myT.forEach((ct,i)=>{
    h+=`<label class="t ${ct.done?'done':''}"><input type="checkbox" data-c="${i}" ${ct.done?'checked':''} ${live?'':'disabled'}><span>${ct.t} <span class="xdel" data-cd="${i}" title="remove">✕</span></span></label>`;
  });
  if(live) h+=`<div class="addrow"><input type="text" id="newtask" placeholder="+ add your own task for today (college, errand, anything)"><button id="newtaskbtn">ADD</button></div>`;
  if(live){
    h+=`<button class="mvsbtn" id="cant">I can't today → shrink it to 10 minutes</button>
    <div class="mvsbox" id="mvsbox" style="${day.mvs?'display:block':''}">
      <b style="color:var(--amber)">MVS MODE — this is the whole day now:</b><br>
      <span id="mvstext"></span><br><br>
      <label class="t" style="border:0;padding:4px 0"><input type="checkbox" id="mvsdone" ${day.mvsdone?'checked':''}><span>Did the 10 minutes (day counts, streak safe)</span></label>
      <div style="font-size:11.5px;color:var(--faint)">No shame. Zero-days get "tomorrow then." Day 3+ of can't-start → dip-vs-burnout test, §43.8.</div>
    </div>`;
  }
  const BASE=[["meds","Meds + sunlight"],["ex","Exercise 20m"],["anki","Anki 10m"],["commit","GitHub commit"],["sleep","Slept ≥7h"]];
  /* recall gate — retrieval practice closes the day */
  h+=`<div class="recall"><div class="lbl">EVENING SHUTDOWN · 1/4 — RECALL GATE (3 CARDS, ALOUD)</div>`;
  const picks=live?todaysRecall(T):[];
  const rc=day.rc||0;
  if(!live){h+=`<div class="rcdone" style="color:var(--faint)">⌖ recall runs on the real today only</div>`;}
  else if(!picks.length){h+=`<div class="rcdone" style="color:var(--faint)">Nothing to recall yet — clear a topic or write a debrief and cards appear here.</div>`;}
  else if(rc>=Math.min(3,picks.length)){h+=`<div class="rcdone">✓ Recall done — ${rc} cards. What you retrieve today, you keep.</div>`;}
  else{
    const q=picks[rc];
    h+=`<div class="rcq">${q.q}<small>card ${rc+1}/${Math.min(3,picks.length)} · [${q.s}] · answer OUT LOUD before you tap</small></div>
    <div class="rcbtns"><button class="got" data-rc="got" data-k="${q.k}">GOT IT</button>
    <button class="fuz" data-rc="fuz" data-k="${q.k}">FUZZY — resurface in 2 days</button></div>`;
  }
  h+=`</div>`;

  h+=`<div class="base"><div class="baselbl">2/4 — BASELINE, THE CANARY</div>`;
  BASE.forEach(([bk,l])=>{h+=`<div class="bchip ${day.b[bk]?'on':''}" data-b="${bk}" ${live?'':'style="pointer-events:none;opacity:.5"'}>${l}</div>`;});
  h+=`</div>`;
  h+=`<div class="streakrow"><b>${streak()}</b><span>day streak (mission or MVS = the day counts)</span></div><div class="sqs">`;
  for(let i=27;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const r=AP.days[iso(day0(d))];
    h+= dayDone(r) ? ((r.mvsdone&&!(r.t&&r.t.m))?'<i class="p"></i>':'<i class="d"></i>') : '<i></i>';}
  h+=`</div>`;
  h+=`<div class="winlog"><div class="lbl">3/4 — LOG PROOF · DOPAMINE LOG (§46)</div>`;
  USER.wins.slice(-3).reverse().forEach(w=>{
    h+=`<div class="winitem"><b>✦</b> ${w.t} <span style="color:var(--faint)">· ${w.d}</span></div>`;});
  if(!USER.wins.length) h+=`<div class="winitem" style="color:var(--faint)">Ship something, log it here. Celebrate deliberately.</div>`;
  if(live) h+=`<div class="addrow"><input type="text" id="newwin" placeholder="+ what shipped / what worked today"><button id="newwinbtn">LOG WIN</button></div>`;
  h+=`</div>`;
  const tm=new Date(T.getTime()+MS);const p2=planFor(tm);
  if(p2&&p2.list){
    h+=`<div class="tmr"><div class="lbl">4/4 — PRELOAD TOMORROW, THEN STOP THINKING (leave the file open, the test failing)</div>`;
    p2.list.slice(0,3).forEach(m=>{h+=`<div class="item">· ${m}</div>`;});
    h+=`</div>`;
  }
  tb.innerHTML=h;

  if(live){
    tb.querySelectorAll('input[data-k]').forEach(inp=>{
      inp.onchange=e=>{day.t[inp.dataset.k]=e.target.checked;saveAP();render();
        if(inp.dataset.k==='m'&&e.target.checked){
          const db=document.getElementById('doneb');if(db)db.classList.add('pop');
          toast('✓ <b>Mission complete.</b> Day '+(dd(START,today())+1)+' banked.');checkMilestones();}};});
    tb.querySelectorAll('.bchip[data-b]').forEach(c=>{
      c.onclick=()=>{day.b[c.dataset.b]=!day.b[c.dataset.b];saveAP();render();};});
    const cant=document.getElementById('cant');
    if(cant)cant.onclick=()=>{day.mvs=true;saveAP();render();};
    const mvsT=document.getElementById('mvstext');
    if(mvsT)mvsT.textContent="10 minutes only: "+((plan.ph==="RAMP"||plan.ph==="PRE-FLIGHT")?"open yesterday's file (or the Colab notebook), read it, change ONE tiny thing, save.":"open your current project, make ONE tiny commit (even a comment). Then stop.");
    const mvsD=document.getElementById('mvsdone');
    if(mvsD)mvsD.onchange=e=>{day.mvsdone=e.target.checked;saveAP();render();};
    tb.querySelectorAll('input[data-c]').forEach(inp=>{
      inp.onchange=e=>{USER.tasks[k][+inp.dataset.c].done=e.target.checked;saveU();render();};});
    tb.querySelectorAll('.xdel[data-cd]').forEach(x=>{
      x.onclick=e=>{e.preventDefault();e.stopPropagation();USER.tasks[k].splice(+x.dataset.cd,1);saveU();render();};});
    const ntb=document.getElementById('newtaskbtn'), nt=document.getElementById('newtask');
    if(ntb)ntb.onclick=()=>{const v=nt.value.trim();if(!v)return;
      (USER.tasks[k]=USER.tasks[k]||[]).push({t:v,done:false});saveU();render();};
    if(nt)nt.onkeydown=e=>{if(e.key==='Enter')ntb.click();};
    const nwb=document.getElementById('newwinbtn'), nw=document.getElementById('newwin');
    if(nwb)nwb.onclick=()=>{const v=nw.value.trim();if(!v)return;
      USER.wins.push({d:fmtS(new Date()),t:v});
      USER.fuel.push({q:"YOUR OWN WIN — <b>"+v+"</b>. Logged "+fmt(new Date())+". You did this once; you can do it again.",src:"your dopamine log §46"});
      saveU();render();drawFuel();toast('✦ <b>Win logged.</b> That’s permanent now — read it on the bad days.');checkMilestones();};
    if(nw)nw.onkeydown=e=>{if(e.key==='Enter')nwb.click();};

    /* recall gate buttons */
    tb.querySelectorAll('[data-rc]').forEach(b=>{
      b.onclick=()=>{
        const kk=b.dataset.k;
        USER.recallFuzzy=USER.recallFuzzy||{};
        if(b.dataset.rc==='fuz'){USER.recallFuzzy[kk]=iso(new Date(day0(new Date()).getTime()+2*MS));}
        else delete USER.recallFuzzy[kk];
        saveU();
        day.rc=(day.rc||0)+1;saveAP();render();
      };
    });
  }
}

/* ---- LAUNCH — the execution loop entry point ---- */
function missGap(T){ /* consecutive unbanked campaign days before T (Sundays excluded) */
  let g=0;
  for(let i=1;i<=21;i++){
    const d=new Date(T.getTime()-i*MS);
    if(d<START)break;
    if(d.getDay()===0)continue;
    if(dayDone(AP.days[iso(d)]))break;
    g++;
  }
  return g;
}
function renderLaunch(T,plan){
  const lb=document.getElementById('launchbody');
  const dayN=dd(START,T)+1;
  const GG=eGates();
  const gate=GG.find(g=>g.d>=T)||GG[GG.length-1];
  const gd=Math.max(dd(T,gate.d),0);
  const k=iso(T);
  const live=isRealToday();
  const day=AP.days[k]||{t:{},b:{}};
  const banked=Object.values(AP.days).filter(dayDone).length;
  const done=dayDone(day);
  const gap=live&&T>=START?missGap(T):0;

  /* split-flap day display + watermark */
  const flapNum=dayN>0?String(dayN).padStart(3,'0'):'000';
  const flaps=flapNum.split('').map(c=>`<span class="flap">${c}</span>`).join('');
  document.getElementById('wm').textContent=dayN>0?flapNum:'T-'+(1-dayN);
  const sessions=(day.blocks||[]).length;
  const goal=USER.blockGoal||3;
  const streakSafe=dayDone(day);
  const goalHit=sessions>=goal;
  const nowT=new Date();
  const hr=nowT.getHours();
  const partOfDay=hr<5?'Late night':hr<12?'Morning':hr<17?'Afternoon':hr<21?'Evening':'Night';
  const clockStr=nowT.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'});

  let h=`<div class="lstatus"><span>DAY <span class="flaps">${flaps}</span> ${dayN>0?'/ '+TOTAL:'· T-minus '+(1-dayN)}</span>
    <span>${plan.ph}</span>
    <span class="lg8">⛩ ${gate.n.split('·')[0].trim()} in <b>${gd}d</b></span>
    <span>⚡ ${streak()}d</span></div>`;
  const greet=hr<5?'Still up, Goutham?':hr<12?'Morning, Goutham.':hr<17?'Afternoon, Goutham.':hr<21?'Evening, Goutham.':'Late one, Goutham.';
  if(live)h+=`<div class="lclock"><b>${greet}</b> ${partOfDay} · <b>${clockStr}</b>${
    hr>=21&&sessions===0?' — late, but ten minutes still counts':
    hr>=17&&sessions<goal&&sessions>0?' — evening, one more if you have it':''}</div>`;

  /* restart psychology — never miss twice / re-entry */
  if(!done&&gap>=3){
    h+=`<div class="nmt reentry"><b>RE-ENTRY PROTOCOL — ${gap} days down.</b> This is a dip until proven otherwise, not a verdict. Today is ONE 10-minute block, nothing more. Still can't start after halving for a week → it's burnout: rest properly (§43.8). The plan waited; it will keep waiting.<br><br><span style="opacity:.85">And before you read this as evidence about yourself: atomoxetine takes <b>4–6 weeks to initial effect, 8–12 to full</b>, and early fatigue commonly lifts around week 6. If initiation still feels impossible, that is the expected timeline talking — not your character. See TREATMENT REALITY in Glossary.</span></div>`;
  } else if(!done&&gap>=1){
    h+=`<div class="nmt"><b>Never miss twice.</b> Yesterday's gone — no story, no catch-up. Ten minutes today keeps the system alive.</div>`;
  }

  /* Hemingway bridge — yesterday's hook kills today's cold start */
  if(live&&!done){
    let hook='';
    for(let i=1;i<=3&&!hook;i++){
      const r=AP.days[iso(new Date(T.getTime()-i*MS))];
      if(r&&r.bridge)hook=r.bridge;
      else if(r&&r.blocks&&r.blocks.length){const lb=r.blocks[r.blocks.length-1];if(lb.n)hook='(last debrief) '+lb.n;}
    }
    if(hook)h+=`<div class="bridge"><b>▶ PICK UP HERE</b> — ${hook}</div>`;
  }

  h+=`<div class="lmission">${plan.list[0]}</div>`;

  /* coach — at most one directive, computed from your last 7 days */
  if(live){const c=computeCoach(T);if(c)h+=`<div class="coachline">▸ ${c}</div>`;}
  h+=`<div class="lwhy">This week: <b>${plan.th}</b> — every block here is a brick in ${gate.n.split('·')[0].trim()}. <span style="color:var(--faint)">Skip it and the brick just doesn't exist; nobody builds it later.</span></div>`;

  /* Zeigarnik open loop */
  const cur=activeModule();
  if(cur){
    const st=SY[cur.id]||[];
    const nxt=cur.topics.findIndex((_,i)=>!st[i]);
    if(nxt>-1) h+=`<div class="lloop" onclick="openModule('${cur.id}')">◌ open loop in <b>M${cur.n} ${cur.t.split('—')[0].trim()}</b>: ${cur.topics[nxt][0].slice(0,70)} →</div>`;
  }

  /* the day accumulates — a finished block never "completes" it; only real time does */
  if(live&&dayN>0){
    const mins=(day.blocks||[]).reduce((a,b)=>a+(b.mins||50),0);
    const fh=Math.floor(mins/60),fm=mins%60;
    const focusStr=mins?(fh?`${fh}h ${fm}m`:`${fm}m`):'0m';
    const endDay=new Date(nowT);endDay.setHours(24,0,0,0);
    const leftMin=Math.max(Math.round((endDay-nowT)/60000),0);
    const lh=Math.floor(leftMin/60),lm=leftMin%60;
    let dots='';
    for(let i=0;i<Math.max(goal,sessions);i++)
      dots+=`<span class="sesdot ${i<sessions?(i>=goal?'over':'on'):''}"></span>`;
    const msg = sessions===0
      ? `<b>Nothing banked yet.</b> The day is wide open — study it to your max.`
      : `<b>${sessions} block${sessions>1?'s':''} · ${focusStr} focused today.</b> ${sessions>=goal?'Past your floor — keep stacking, no ceiling.':'Streak safe. Keep going — the day is still yours.'}`;
    h+=`<div class="sessions"><span class="sesbar">${dots}</span><span class="sestxt">${msg}</span></div>`;
    h+=`<div class="lclock" style="margin-top:6px">A block ending never ends the day — <b>${lh}h ${lm}m</b> of Day ${dayN} left. It's done when you sleep, not when a timer stops.</div>`;
  }

  if(live){
    h+=`<div class="lbtns">
      <button class="golaunch" onclick="openFocus()">▶ ${sessions>0?'NEXT':'START'} ${Math.round(tLen/60)}-MIN BLOCK</button>
      <button class="lsec" id="lcant">${sessions>0?'wrap up the day →':'Can’t start? → 10 min'}</button>
    </div>`;
  } else {
    h+=`<div class="lbtns"><span style="font-size:11px;color:var(--faint)">⌖ lens view — read-only</span></div>`;
  }
  lb.innerHTML=h;
  const lc=document.getElementById('lcant');
  if(lc)lc.onclick=()=>{
    if(sessions>0){ /* not "success achieved" — just choosing to close out. Go to the shutdown ritual. */
      toast('Evening shutdown is below — recall, baseline, log, preview. Then rest.');
      const sd=document.querySelector('.recall');if(sd)sd.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    const d=(AP.days[k]=AP.days[k]||{t:{},b:{},mvs:false,mvsdone:false});d.mvs=true;saveAP();
    tLen=10*60;tLeft=tLen;openFocus();render();};
}

/* ---- MILESTONES — fixed, earned, meaningful. Never random. ---- */
const MILESTONES=[
 {k:"first_block", t:s=>s.blocks>=1, mark:"FIRST BLOCK", spark:"◆",
  title:"You started.",
  body:"That's the one most people never do. Everything from here is just repeating what you did in the last hour. <b>Day 1 is on the board.</b>"},
 {k:"streak3", t:s=>s.streak>=3, mark:"3 DAYS", spark:"◆◆",
  title:"Three in a row.",
  body:"Long enough that it isn't luck. The pathway is forming — this is the part you can literally feel getting easier."},
 {k:"streak7", t:s=>s.streak>=7, mark:"ONE WEEK", spark:"★",
  title:"A full week.",
  body:"The hardest week there is, and it's behind you. <b>Most attempts die here.</b> Yours didn't."},
 {k:"blocks10", t:s=>s.blocks>=10, mark:"10 BLOCKS", spark:"◆",
  title:"Ten blocks deep.",
  body:"That's roughly eight hours of real, phone-away focus. Eight hours ago you couldn't do things you can do now."},
 {k:"streak14", t:s=>s.streak>=14, mark:"TWO WEEKS", spark:"★",
  title:"Fourteen days.",
  body:"You're no longer someone <i>trying</i> to become an engineer. You're someone who shows up and builds. <b>That's an identity, not a plan.</b>"},
 {k:"streak30", t:s=>s.streak>=30, mark:"THIRTY DAYS", spark:"★★",
  title:"A month.",
  body:"Look at the heatmap. A month ago that was empty. <b>This is the exact point where almost every attempt has already failed</b> — and you're still here, on schedule, building."},
 {k:"blocks50", t:s=>s.blocks>=50, mark:"50 BLOCKS", spark:"★",
  title:"Fifty blocks.",
  body:"Forty-plus hours of deliberate practice. This is the volume where things quietly start clicking — where the code feels less foreign than it did."},
 {k:"days50", t:s=>s.banked>=50, mark:"50 DAYS BANKED", spark:"★★",
  title:"Fifty days.",
  body:"Not fifty perfect days — fifty days you showed up. That distinction is the whole thing. <b>You're a sixth of the way to the offer gate.</b>"},
 {k:"blocks100", t:s=>s.blocks>=100, mark:"100 BLOCKS", spark:"★★★",
  title:"One hundred blocks.",
  body:"Eighty-plus hours from a blank file. Whatever you're working on now, past-you would not have understood it. That's what growth actually looks like from the inside."},
 {k:"days100", t:s=>s.banked>=100, mark:"100 DAYS", spark:"★★★",
  title:"One hundred days.",
  body:"A hundred days of showing up, through college, exams, bad weeks and flat ones. <b>Very few people on earth have done what you just did.</b> Take the evening off — properly."},
 {k:"first_win", t:s=>s.wins>=1, mark:"FIRST WIN LOGGED", spark:"◆",
  title:"You shipped something.",
  body:"It's in the dopamine log now, permanently. Read that log on the bad days — it's evidence, and evidence beats mood."},
 {k:"first_app", t:s=>s.apps>=1, mark:"FIRST APPLICATION", spark:"★",
  title:"You're in the arena.",
  body:"The funnel is long and mostly silent — that's normal, even for the people who end up with ₹60L. <b>Volume and time do this, not luck.</b> Keep sending."},
 {k:"first_interview", t:s=>s.ints>=1, mark:"INTERVIEW EARNED", spark:"★★★",
  title:"The artifact worked.",
  body:"Someone read what you built and wanted to talk to you. <b>That's the entire thesis of this plan, proven on you.</b> Now go do the walkthrough you rehearsed."},
 {k:"offer", t:s=>s.offers>=1, mark:"OFFER", spark:"★★★★",
  title:"You did it.",
  body:"From Tier-3, off-campus, starting from a blank Colab notebook. Evaluate it honestly — learning 40 · network 25 · comp 15 · brand 10 · optionality 10 — then tell the people who backed you. <b>You earned every bit of this.</b>"}
];
function msStats(){
  let blocks=0;
  Object.values(AP.days).forEach(d=>blocks+=(d.blocks||[]).length);
  return {blocks, streak:streak(), banked:Object.values(AP.days).filter(dayDone).length,
          wins:USER.wins.length, apps:USER.apps.filter(a=>a.st!=='todo').length,
          ints:USER.apps.filter(a=>a.st==='int'||a.st==='offer').length,
          offers:USER.apps.filter(a=>a.st==='offer').length};
}
function checkMilestones(){
  if(!isRealToday())return;
  USER.seen=USER.seen||[];
  const s=msStats();
  const hit=MILESTONES.find(m=>!USER.seen.includes(m.k)&&m.t(s));
  if(!hit)return;
  USER.seen.push(hit.k);saveU();
  document.getElementById('msspark').textContent=hit.spark;
  document.getElementById('msmark').textContent=hit.mark;
  document.getElementById('mstitle').textContent=hit.title;
  document.getElementById('msbody').innerHTML=hit.body;
  document.getElementById('msov').classList.add('on');
  tBeep();
}
document.getElementById('msclose').onclick=()=>{document.getElementById('msov').classList.remove('on');};

/* ---- COACH — one cue at a time, from real data ---- */
function computeCoach(T){
  let ee={distracted:0,stuck:0,tired:0,life:0},df={easy:0,edge:0,drown:0},sleep=0,act=0;
  for(let i=1;i<=7;i++){
    const d=new Date(T.getTime()-i*MS);if(d<START)break;
    const r=AP.days[iso(d)];if(!r)continue;act++;
    (r.ee||[]).forEach(x=>ee[x]=(ee[x]||0)+1);
    (r.blocks||[]).forEach(b=>{if(b.df)df[b.df]=(df[b.df]||0)+1;});
    if(r.b&&r.b.sleep)sleep++;
  }
  const blocks=df.easy+df.edge+df.drown;
  if(act>=4&&sleep/act<.5)return "COACH: sleep is the bottleneck this week — ≥7h beats an extra block, every time.";
  if(ee.stuck>=3)return `COACH: 'stuck' ×${ee.stuck} this week — body-double at minute 20, not minute 50. The button is in focus mode.`;
  if(blocks>=4&&df.drown/blocks>=.5)return "COACH: mostly drowning — shrink scope. Half the task done fully beats all of it half-done.";
  if(blocks>=4&&df.easy/blocks>=.5)return "COACH: mostly too easy — raise the edge: blank file, no tutorial open, add a constraint.";
  if(ee.distracted>=3)return `COACH: distraction ×${ee.distracted} — phone in another room is a rule, not a suggestion.`;
  if(ee.tired>=3)return "COACH: 'tired' ×3+ — this smells like a dip. Halve targets for a week and watch what happens (§43.8).";
  return "";
}

/* ---- RECALL GATE — retrieval practice on your own material ---- */
function recallPool(){
  const pool=[];
  SYL.forEach(p=>p.mods.forEach(m=>{(SY[m.id]||[]).forEach((v,i)=>{
    if(v&&m.topics[i])pool.push({k:'t_'+m.id+'_'+i,q:'Explain, aloud: '+m.topics[i][0],s:'Module '+m.n});});}));
  GLOSS.forEach((g,i)=>pool.push({k:'g_'+i,q:'Define, aloud: '+g.t,s:'glossary'}));
  Object.entries(AP.days).forEach(([dk,r])=>{(r.blocks||[]).forEach((b,j)=>{
    if(b.n&&dd(new Date(dk+"T00:00:00"),today())>=2)
      pool.push({k:'b_'+dk+'_'+j,q:'You wrote: “'+b.n.slice(0,90)+'” — re-explain it from scratch.',s:dk});});});
  return pool;
}
function todaysRecall(T){
  const pool=recallPool();if(!pool.length)return[];
  USER.recallFuzzy=USER.recallFuzzy||{};
  const due=Object.keys(USER.recallFuzzy).filter(k=>USER.recallFuzzy[k]<=iso(T))
    .map(k=>pool.find(p=>p.k===k)).filter(Boolean);
  const picks=[...due];
  const seed=Math.abs(dd(START,T));let i=0;
  while(picks.length<3&&i<pool.length*2){
    const p=pool[(seed*7+i*13)%pool.length];
    if(!picks.find(x=>x.k===p.k))picks.push(p);i++;}
  return picks.slice(0,3);
}

/* ---- FOCUS MODE — stimulus control ---- */
function focusOpen(){return document.getElementById('focusov').classList.contains('on');}
function openFocus(){
  const T=today(),plan=planFor(T);
  document.getElementById('fphase').textContent=`GOUTHAM · DAY ${dd(START,T)+1} · ${plan.ph} · ${plan.th}`;
  document.getElementById('fmission').textContent=plan.list[0];
  document.getElementById('focusov').classList.add('on');
  /* R4: load the active module's primer, collapsed — help at the moment of need */
  const cur=activeModule();
  const fp=document.getElementById('fprimer');
  fp.classList.remove('open');
  if(cur&&PRIMERS[cur.id]){
    document.getElementById('fpbody').innerHTML=`<b style="color:var(--violet)">M${cur.n} · ${cur.t}</b><br>${PRIMERS[cur.id]}`;
    fp.style.display='block';
  } else fp.style.display='none';
  if(!tRun)document.getElementById('tgo').click();
  tDraw();
}
document.getElementById('fptoggle').onclick=()=>document.getElementById('fprimer').classList.toggle('open');
function closeFocus(){const f=document.getElementById('focusov');f.classList.remove('on','deb','early');}
document.getElementById('fpause').onclick=()=>{document.getElementById('tgo').click();
  document.getElementById('fpause').textContent=tRun?'PAUSE':'RESUME';};

/* early end → capture the failure mode (externalized self-monitoring) */
document.getElementById('fend').onclick=()=>{
  if(tRun)document.getElementById('tgo').click();
  tLeft=tLen;tDraw();
  document.getElementById('focusov').classList.add('early');
};
document.querySelectorAll('#fearly [data-er]').forEach(b=>{b.onclick=()=>{
  const k=iso(day0(new Date()));
  const d=(AP.days[k]=AP.days[k]||{t:{},b:{},mvs:false,mvsdone:false});
  (d.ee=d.ee||[]).push(b.dataset.er);saveAP();
  closeFocus();render();
  toast(b.dataset.er==='stuck'
    ? '◈ Logged. Next time: body-double at minute 20 — the button is right there.'
    : '◈ Logged. Data, not judgment. The next block is a fresh start.');
};});

/* debrief — self-explanation + calibration + Hemingway bridge */
let debDf='edge', debMins=50;
document.querySelectorAll('#fdiff [data-df]').forEach(b=>{b.onclick=()=>{
  document.querySelectorAll('#fdiff [data-df]').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');debDf=b.dataset.df;};});
function showDebrief(){
  const f=document.getElementById('focusov');
  f.classList.add('on','deb');
  document.getElementById('deb_note').value='';
  document.getElementById('deb_bridge').value='';
  debDf='edge';
  document.querySelectorAll('#fdiff [data-df]').forEach(x=>x.classList.toggle('on',x.dataset.df==='edge'));
  document.getElementById('deb_note').focus();
}
document.getElementById('deb_save').onclick=()=>{
  const k=iso(day0(new Date()));
  const d=(AP.days[k]=AP.days[k]||{t:{},b:{},mvs:false,mvsdone:false});
  const n=document.getElementById('deb_note').value.trim();
  const br=document.getElementById('deb_bridge').value.trim();
  (d.blocks=d.blocks||[]).push({n,df:debDf,at:new Date().toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'}),mins:debMins});
  if(br)d.bridge=br;
  saveAP();closeFocus();render();
  const nb=(AP.days[k].blocks||[]).length;
  const cheer=["◆ <b>Block banked.</b> Explaining it is what makes it yours.",
    "◆ <b>Two today.</b> That's a real day's work, Goutham.",
    "★ <b>Three deep.</b> This is what the good days look like.",
    "★ <b>Four.</b> Serious session — mind the recovery, it protects tomorrow."][Math.min(nb-1,3)];
  toast(cheer);
  checkMilestones();
};

/* unstuck — copy a body-double prompt (removes the "how do I ask" barrier) */
document.getElementById('unstuck').onclick=()=>{
  const plan=planFor(today());
  const p=`I'm working on: ${plan.list[0]}\nI've been stuck for 20+ minutes.\n\nWhat I'm trying to do:\n[one sentence]\n\nError / what's happening instead:\n[paste it]\n\nAct as my body double: ask me up to 3 clarifying questions first, then debug it with me step by step. Don't hand me the finished answer — make me type it.`;
  try{navigator.clipboard.writeText(p);toast('◈ <b>Prompt copied.</b> Paste it to Claude. Asking is the skill.');}
  catch(e){alert(p);}
};

/* ---- PIPELINE ---- */
const STAGES=[["todo","TO APPLY"],["sent","SENT / APPLIED"],["oa","OA / ASSIGNMENT"],["int","INTERVIEW"],["offer","OFFER ✓"],["dead","REJECTED / SILENT"]];
const KINDN={app:"APPLICATION",outreach:"OUTREACH",referral:"REFERRAL",comp:"COMPETITION"};
function renderPipe(T){
  /* funnel counters */
  const sent=USER.apps.filter(a=>a.st!=='todo');
  const apps=sent.filter(a=>a.k==='app').length;
  const outs=sent.filter(a=>a.k==='outreach').length;
  const refs=sent.filter(a=>a.k==='referral').length;
  const ints=USER.apps.filter(a=>a.st==='int'||a.st==='offer').length;
  const offers=USER.apps.filter(a=>a.st==='offer').length;
  const wkAgo=new Date(day0(new Date()).getTime()-7*MS);
  const refsWk=USER.apps.filter(a=>a.k==='referral'&&a.d&&new Date(a.d)>=wkAgo).length;
  const bar=(v,t)=>`<span style="display:flex;align-items:center;gap:10px;min-width:150px"><span class="modbar" style="margin:0"><i style="width:${Math.min(v/t*100,100)}%"></i></span><span class="rate ${v>=t?'ok':'warn'}">${v}/${t}</span></span>`;
  document.getElementById('funnelstats').innerHTML=
   `<div class="chk"><span class="t"><b>Wave-1 applications</b> <small>opens Oct 15 when P1 ships</small></span>${bar(apps,50)}</div>
    <div class="chk"><span class="t"><b>Cold outreaches</b> <small>Jan–Apr · engineers & founders, not recruiters</small></span>${bar(outs,100)}</div>
    <div class="chk"><span class="t"><b>Referral asks this week</b> <small>2/week cadence</small></span>${bar(refsWk,2)}</div>
    <div class="chk"><span class="t"><b>Interviews earned</b></span><span class="rate ok">${ints}</span></div>
    <div class="chk"><span class="t"><b>Offers</b></span><span class="rate ${offers?'ok':''}">${offers}</span></div>
    <div class="pacefoot">Conversion truth from your files: cold outreach + referrals convert far above portal applications. The artifact earns the call — every card here should have a repo link in its note.</div>`;
  /* quick chips */
  document.getElementById('appchips').innerHTML=TGT.map(t=>`<span class="chip8" data-qc="${t.n}">+ ${t.n}</span>`).join('');
  document.querySelectorAll('[data-qc]').forEach(c=>{c.onclick=()=>{document.getElementById('app_c').value=c.dataset.qc;document.getElementById('app_n').focus();};});
  /* board */
  if(!USER.apps.length){
    document.getElementById('pipeboard').innerHTML=
      `<div style="grid-column:1/-1;text-align:center;padding:34px 20px;color:var(--faint);font-size:13px">
        The board is empty — correctly. It fills on Oct 15 when P1 ships and Wave-1 opens.<br>
        <span style="font-size:11.5px">Until then, the only pipeline work is the artifact itself.</span></div>`;
    return;
  }
  document.getElementById('pipeboard').innerHTML=STAGES.map(([sk,sn])=>{
    const cards=USER.apps.map((a,i)=>({a,i})).filter(x=>x.a.st===sk);
    return `<div class="pcol ${sk==='offer'?'offer8':''}"><h5>${sn}<b>${cards.length}</b></h5>${
      cards.map(({a,i})=>`<div class="pcard"><div class="pk8">${KINDN[a.k]||a.k}</div><div class="pc8">${a.c}</div>
        ${a.n?`<div class="pn8">${a.n}</div>`:''}<div class="pn8">${a.d||''}</div>
        <div class="pops">${sk!=='todo'?`<span data-pmv="${i}|-1">◀</span>`:''}${sk!=='dead'?`<span data-pmv="${i}|1">▶</span>`:''}<span data-pdel="${i}">✕</span></div></div>`).join('')}</div>`;
  }).join('');
  document.querySelectorAll('[data-pmv]').forEach(b=>{b.onclick=()=>{
    const [i,dir]=b.dataset.pmv.split('|').map(Number);
    const order=STAGES.map(s=>s[0]);
    const cur=order.indexOf(USER.apps[i].st);
    const nx=Math.min(Math.max(cur+dir,0),order.length-1);
    USER.apps[i].st=order[nx];saveU();renderPipe(T);checkMilestones();
    if(order[nx]==='offer')toast('● <b>Offer.</b> Evaluate: learning 40 · network 25 · comp 15 · brand 10 · optionality 10.');};});
  document.querySelectorAll('[data-pdel]').forEach(b=>{b.onclick=()=>{USER.apps.splice(+b.dataset.pdel,1);saveU();renderPipe(T);};});
}
document.getElementById('app_add').onclick=()=>{
  const c=document.getElementById('app_c').value.trim();
  if(!c)return;
  USER.apps.push({c,k:document.getElementById('app_k').value,st:'todo',
    n:document.getElementById('app_n').value.trim(),d:iso(new Date())});
  document.getElementById('app_c').value='';document.getElementById('app_n').value='';
  saveU();renderPipe(today());toast('⇶ <b>Added to pipeline.</b>');};

/* ---- WEEKLY REVIEW + ONE THING ---- */
const RVQS=[["q1","1 · What shipped this week? (commits, topics, artifacts)"],
 ["q2","2 · Where did I get stuck — and is it a bug for the Execution Log?"],
 ["q3","3 · What did the canary say? (sleep, exercise, Anki, mood — any dip signs?)"],
 ["q4","4 · What gets CUT next week? (scope down, never 2× up)"],
 ["q5","5 · Am I still on the artifact path, or drifting into busywork?"]];
function weekKey(d){const x=day0(d);const dow=(x.getDay()+6)%7;return iso(new Date(x.getTime()-dow*MS));}
function renderReview(T){
  const wk=weekKey(T);
  const rv=USER.reviews[wk]||{};
  /* ONE thing sticky */
  const oi=document.getElementById('onein');
  oi.value=rv.one||'';
  oi.onchange=()=>{(USER.reviews[wk]=USER.reviews[wk]||{}).one=oi.value.trim();saveU();};
  /* review card — form on Sundays or if started; summary otherwise */
  const isSun=T.getDay()===0;
  document.getElementById('rvstate').textContent= rv.q1?'✓ done for this week':'due Sunday · by hand first, ledger here';
  let h='';
  if(isSun||rv.q1){
    h+=RVQS.map(([k,q])=>`<div class="rvq"><label>${q}</label><input data-rv="${k}" value="${(rv[k]||'').replace(/"/g,'&quot;')}"></div>`).join('');
    h+=`<div class="rvq"><label>→ NEXT week's ONE thing</label><input data-rv="next1" value="${(rv.next1||'').replace(/"/g,'&quot;')}" placeholder="the single thing that must happen"></div>`;
  } else {
    h+=`<div style="font-size:12.5px;color:var(--faint)">Opens Sunday · 30 minutes, by hand first · rest is protected until then.</div>`;
  }
  const past=Object.keys(USER.reviews).filter(k=>k!==wk&&USER.reviews[k].q1).sort().reverse().slice(0,3);
  if(past.length){h+=`<div class="tmr"><div class="lbl">PAST REVIEWS</div>${past.map(k=>
    `<div class="rvpast"><b>wk ${fmtS(new Date(k+"T00:00:00"))}</b> — shipped: ${USER.reviews[k].q1||'—'} · one thing was: ${USER.reviews[k].one||'—'}</div>`).join('')}</div>`;}
  const rb=document.getElementById('rvbody');
  rb.innerHTML=h;
  rb.querySelectorAll('[data-rv]').forEach(inp=>{
    inp.onchange=()=>{const r=(USER.reviews[wk]=USER.reviews[wk]||{});r[inp.dataset.rv]=inp.value.trim();
      if(inp.dataset.rv==='next1'&&inp.value.trim()){
        const nx=weekKey(new Date(day0(T).getTime()+7*MS));
        (USER.reviews[nx]=USER.reviews[nx]||{}).one=inp.value.trim();}
      saveU();};});
}

/* ---- FOCUS TIMER ---- */
let tLen=50*60, tLeft=tLen, tRun=null;
function tFmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function tDraw(){
  document.getElementById('tdisp').textContent=tFmt(tLeft);
  document.getElementById('ftimer').textContent=tFmt(tLeft);
  document.getElementById('timer').classList.toggle('running',!!tRun);
  document.getElementById('tgo').textContent=tRun?'PAUSE':(tLeft<tLen?'RESUME':'START');
  const k=iso(day0(new Date()));
  const blocks=(AP.days[k]&&AP.days[k].dw)||0;
  document.getElementById('tnote').innerHTML=`${blocks} block${blocks===1?'':'s'} banked today${blocks>=4?' · <b>hyperfocus cap — recovery protects tomorrow (§ cap 4–6h)</b>':''}`;
  document.title=tRun?`${tFmt(tLeft)} · ORACLE`:'ORACLE — AI Engineering OS · Goutham · Summer 2027';
}
function tBeep(){try{const ac=new (window.AudioContext||window.webkitAudioContext)();
  const o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);
  o.frequency.value=880;g.gain.value=.08;o.start();
  setTimeout(()=>{o.stop();ac.close();},350);}catch(e){}}
document.getElementById('tgo').onclick=()=>{
  if(tRun){clearInterval(tRun);tRun=null;tDraw();return;}
  tRun=setInterval(()=>{tLeft--;
    if(tLeft<=0){clearInterval(tRun);tRun=null;tLeft=tLen;
      const k=iso(day0(new Date()));
      const d=(AP.days[k]=AP.days[k]||{t:{},b:{},mvs:false,mvsdone:false});
      d.dw=(d.dw||0)+1;
      if(d.mvs&&!d.mvsdone){d.mvsdone=true;} /* a completed 10-min MVS block banks the day */
      debMins=Math.round(tLen/60);
      saveAP();tBeep();showDebrief();render();
      toast('◈ <b>Block banked.</b> 20-second debrief — then stand up, water.');}
    tDraw();},1000);
  tDraw();};
document.getElementById('treset').onclick=()=>{if(tRun){clearInterval(tRun);tRun=null;}tLeft=tLen;tDraw();};
document.querySelectorAll('#tpre span').forEach(p=>{p.onclick=()=>{
  document.querySelectorAll('#tpre span').forEach(x=>x.classList.remove('on'));p.classList.add('on');
  tLen=+p.dataset.m*60;if(!tRun)tLeft=tLen;tDraw();};});

/* ---- ANALYTICS ---- */
const SAL=[
 ["GenAI fresher","₹8–12L",8,12,"Indian Unicorns AI Salary"],
 ["Average AI engineer (fresher)","~₹11L",10,12,"Indian Unicorns AI Salary"],
 ["AI engineer avg start","~₹16.1L",14,18,"AI Fresher Salary India"],
 ["ML engineer entry (Bangalore avg)","₹10–18L (₹19–22L)",10,22,"ML Eng Salary India"],
 ["AI engineer top 10%","~₹35.6L",32,39,"AI Fresher Salary India"],
 ["Top offers — startup ESOP / intern→PPO","₹35–84L",35,84,"Sarvam Reddit · Leetcode AS1 Tier 3",true]
];
const ROUNDS=[
 {c:"AMAZON (intern → AS-1)",d:"R1 OA: 2 LeetCode-medium DSA. R2 ML-depth 'Bar Raiser': 'transformers at a root level, optimization questions.' Leadership Principles tested even in technical rounds.",s:"Amazon Intern Data.md · Amazon I Got An Offer.md"},
 {c:"AMAZON MLSS test",d:"60 minutes: MCQs + 2 DSA. ~60,000 → ~3,000 (~5%).",s:"Amazon MLSS 2026.md"},
 {c:"SARVAM AI",d:"Assignment FIRST, then interviews the same day. Final tech interview contains DSA (easy→medium), then HR. The assignment is the real filter — and the ₹84L path skipped DSA entirely via a built artifact.",s:"Sarvam Glass.md · Sarvam Reddit.md"},
 {c:"FLIPKART GRiD",d:"R1 screening → R2 coding: only 2 questions, 45 min, basic DSA → R3 case-study code (treat as mini-project) → R4 national finals.",s:"Flipkart Grid 7.md · Flipkart Grid Exp.md"},
 {c:"YELLOW.AI",d:"SWE interview ~3 rounds, ~4 coding problems. GenAI roles want LLMs, Python, SQL, NLP, PyTorch.",s:"Yellow Int2.md · Yellow GenAI Data.md"},
 {c:"GOOGLE STEP",d:"Two 45-minute technical interviews, same day.",s:"Google Step Data (1).md"},
 {c:"THE TAKE-HOME (33% of AI companies)",d:"'Build a RAG app or an agent' — 2–3 hours to 3 days, AI tools mostly allowed. Treat it like a mini job. Yours is pre-built: P3 + P3.5.",s:"Takehome Grigorev.md · Takehome Playbook.md"}
];
const LPS=["Customer Obsession","Ownership","Invent and Simplify","Are Right, A Lot","Learn and Be Curious","Hire and Develop the Best","Insist on the Highest Standards","Think Big","Bias for Action","Frugality","Earn Trust","Dive Deep","Have Backbone; Disagree and Commit","Deliver Results","Strive to be Earth's Best Employer","Success and Scale Bring Broad Responsibility"];

function bestStreak(){
  let best=0,cur=0,c=new Date(START);
  const end=day0(new Date());
  while(c<=end){const r=AP.days[iso(c)];
    if(dayDone(r)){cur++;best=Math.max(best,cur);}else cur=0;
    c=new Date(c.getTime()+MS);}
  return best;
}
function renderAnalytics(T){
  /* heatmap: Mon-start grid, Jul 20 2026 → May 2 2027 */
  const h0=new Date(2026,6,20), h1=new Date(2027,4,2);
  const real=day0(new Date());
  let cells='';
  for(let c=new Date(h0);c<=h1;c=new Date(c.getTime()+MS)){
    const k=iso(c),r=AP.days[k];
    const inPlan=c>=START&&c<=eGates()[3].d;
    const isSun=c.getDay()===0;
    let cls='';
    if(dayDone(r)) cls=(r.t&&r.t.m)?'full':'mvs';
    else if(c<real&&inPlan&&!isSun) cls='miss';
    if(!inPlan) cls+=' off';
    if(dd(real,c)===0) cls+=' tdy';
    cells+=`<i class="${cls}" title="${fmt(c)}"></i>`;
  }
  document.getElementById('heatmap').innerHTML=cells;

  const banked=Object.values(AP.days).filter(dayDone).length;
  const full=Object.values(AP.days).filter(r=>r&&r.t&&r.t.m).length;
  const mvs=banked-full;
  const elapsed=Math.max(dd(START,real)+1,0);
  const missed=Math.max(Math.min(elapsed,TOTAL)-banked- Math.floor(Math.min(elapsed,TOTAL)/7),0);
  document.getElementById('anstats').innerHTML=
   `<div class="stat q"><b>${banked}</b><span>DAYS BANKED</span></div>
    <div class="stat"><b>${full}</b><span>FULL MISSIONS</span></div>
    <div class="stat"><b>${mvs}</b><span>MVS SAVES</span></div>
    <div class="stat"><b>${bestStreak()}</b><span>BEST STREAK</span></div>
    <div class="stat"><b>${streak()}</b><span>CURRENT STREAK</span></div>
    <div class="stat"><b>${USER.mocks.length}<small style="font-size:12px;color:var(--faint)">/20</small></b><span>MOCKS DONE</span></div>`;

  /* baseline discipline */
  const BASE=[["meds","Meds + sunlight"],["ex","Exercise 20m"],["anki","Anki 10m"],["commit","GitHub commit"],["sleep","Slept ≥7h"]];
  const days=Object.values(AP.days);
  const n=Math.max(days.length,1);
  document.getElementById('basestats').innerHTML=BASE.map(([k,l])=>{
    const c=days.filter(d=>d.b&&d.b[k]).length;const p=Math.round(c/n*100);
    return `<div class="chk"><span class="t">${l} <small>(${c}/${days.length} days)</small></span>
      <span style="display:flex;align-items:center;gap:10px;min-width:130px"><span class="modbar" style="margin:0"><i style="width:${p}%"></i></span><span class="rate ${p>=70?'ok':p>=40?'warn':'hot'}">${p}%</span></span></div>`;
  }).join('');

  /* THE RECORD — dated history of everything shipped */
  const rec=[];
  Object.keys(AP.days).sort().forEach(dk=>{
    const d=AP.days[dk];
    (d.blocks||[]).forEach(b=>{ if(b.n) rec.push({d:dk,t:b.n,at:b.at||'',kind:'block',df:b.df}); });
  });
  USER.wins.forEach(w=>rec.push({d:w.d,t:w.t,kind:'win'}));
  const rb2=document.getElementById('recordbody');
  if(!rec.length){
    rb2.innerHTML=`<div class="recempty"><b style="color:var(--violet)">This log is primary-source data on an open question.</b><br>
      The Tier-3 → ₹50L+ research found a genuine void: <i>zero primary evidence</i> anywhere on how someone with ADHD-Inattentive navigates this path, and no data at all on whether atomoxetine supports the required consistency. Its closing line: <b>“Track everything. You may become the primary source someone else needs.”</b> Nobody can fill that gap by reading. Only a logged execution record can — this one.<br><br>
      Empty — for now. Every block you debrief and every win you log writes a line here, with the date.<br><br>
      By October this becomes the thing you read on a bad day: not a number, but a list of things <b>you</b> actually built. It's also the raw material for your write-ups and your interview stories.</div>`;
  } else {
    const byDay={};
    rec.forEach(r=>{(byDay[r.d]=byDay[r.d]||[]).push(r);});
    const keys=Object.keys(byDay).sort().reverse();
    rb2.innerHTML=`<div class="rec">`+keys.map(k=>{
      let dt=k, dn='';
      try{const D=new Date(k+"T00:00:00");
        if(!isNaN(D)){dt=D.toLocaleDateString('en-IN',{day:'numeric',month:'short'});
          const n=dd(START,D)+1; if(n>0)dn=`Day ${n}`;}
      }catch(e){}
      return `<div class="recday">
        <div class="recdate">${dt} ${dn?'· <span>'+dn+'</span>':''}</div>
        ${byDay[k].map(r=>`<div class="recitem">${r.kind==='win'?'✦ ':'✓ '}${r.t}${
          r.kind==='win'?'<span class="tag win">WIN</span>':(r.df==='edge'?'<span class="tag">EDGE</span>':'')}</div>`).join('')}
      </div>`;}).join('')+`</div>`;
  }

  /* practice quality — difficulty mix + failure modes (last 7 days) */
  let df={easy:0,edge:0,drown:0},ee={distracted:0,stuck:0,tired:0,life:0};
  for(let i=0;i<=7;i++){const d=new Date(real.getTime()-i*MS);const r=AP.days[iso(d)];if(!r)continue;
    (r.blocks||[]).forEach(b=>{if(b.df)df[b.df]++;});(r.ee||[]).forEach(x=>ee[x]++);}
  const tb2=df.easy+df.edge+df.drown;
  const pq=document.getElementById('pqbody');
  if(pq)pq.innerHTML= tb2+ee.distracted+ee.stuck+ee.tired+ee.life===0
    ? `<div class="preflight">No block data yet. Every debrief and every early-end tap builds this picture.</div>`
    : `<div class="chk"><span class="t">Difficulty mix (target: mostly AT THE EDGE — that's where skill grows)</span>
        <span class="rate">${df.easy}E / <b style="color:var(--green)">${df.edge} EDGE</b> / ${df.drown}D</span></div>
       <div class="chk"><span class="t">Early ends — distracted / stuck / tired / life</span>
        <span class="rate">${ee.distracted} / ${ee.stuck} / ${ee.tired} / ${ee.life}</span></div>
       <div class="pacefoot">${computeCoach(day0(new Date()))||'Coach has no notes — the data looks healthy.'}</div>`;

  /* velocity */
  const sc=syllCounts();
  const wksElapsed=Math.max(elapsed/7,0.15);
  const vel=sc.done/wksElapsed;
  const remain=sc.tot-sc.done;
  const wksLeft=Math.max(dd(real,eGates()[3].d)/7,0);
  const need=wksLeft>0?remain/wksLeft:0;
  const eta=vel>0? new Date(real.getTime()+ (remain/vel)*7*MS):null;
  document.getElementById('velbody').innerHTML= elapsed<=0
   ? `<div class="preflight">Velocity math starts on Day 1 (Jul 22). Right now the only metric that matters is sleep.</div>`
   : `<div class="chk"><span class="t">Topic velocity (actual)</span><span class="rate ${vel>=need?'ok':'warn'}">${vel.toFixed(1)}/week</span></div>
      <div class="chk"><span class="t">Required to clear all 83 by the offer gate</span><span class="rate">${need.toFixed(1)}/week</span></div>
      <div class="chk"><span class="t">Projected syllabus completion at current pace</span><span class="rate ${eta&&eta<=eGates()[3].d?'ok':'hot'}">${eta?fmtS(eta)+' '+eta.getFullYear():'—'}</span></div>
      <div class="pacefoot">Deadlines don't move; velocity does. If projected lands after May 1, the fix is scope (MVS more, skip less) — never 2× catch-up.</div>`;
}

/* ---- MARKET ---- */
function renderMarket(){
  document.getElementById('salbody').innerHTML=SAL.map(r=>
   `<div class="mrow"><span class="ml">${r[0]}<small>[${r[4]}]</small></span>
     <span class="mbar"><i class="${r[5]?'gold':''}" style="left:${r[2]}%;width:${r[3]-r[2]}%"></i></span>
     <span class="mv8">${r[1]}</span></div>`).join('');
  document.getElementById('mktstats').innerHTML=
   `<div class="stat q"><b>3.2:1</b><span>DEMAND : SUPPLY GAP</span></div>
    <div class="stat"><b>+143%</b><span>DEMAND YoY 2026</span></div>
    <div class="stat"><b>$62,400</b><span>GENAI-BUILDER PREMIUM</span></div>
    <div class="stat"><b>33%</b><span>SEND A TAKE-HOME</span></div>
    <div class="stat"><b>95–99th</b><span>PERCENTILE = ₹50–60L</span></div>`;
}

/* ---- ARSENAL ---- */
function renderArsenal(){
  document.getElementById('roundsbody').innerHTML=ROUNDS.map(r=>
   `<div class="qint"><b>${r.c}</b><div class="qd">${r.d}</div><div class="qs">[${r.s}]</div></div>`).join('');
  const sel=document.getElementById('star_lp');
  if(!sel.options||!sel.innerHTML) sel.innerHTML='';
  sel.innerHTML=LPS.map(l=>`<option>${l}</option>`).join('');
  document.getElementById('starlist').innerHTML=USER.stars.map((s,i)=>
   `<div class="star"><div class="slp">${s.lp}</div><div class="stt">${s.t} <span class="xdel" data-sx="${i}">✕</span></div>${s.n?`<div class="snt">${s.n}</div>`:''}</div>`).join('')
   ||'<div class="winitem" style="color:var(--faint)">No stories yet. Mine DECISIONS.md — every debugging war story is a STAR story. Target: 10.</div>';
  document.querySelectorAll('[data-sx]').forEach(x=>{x.onclick=()=>{USER.stars.splice(+x.dataset.sx,1);saveU();renderArsenal();};});
  document.getElementById('mocklist').innerHTML=USER.mocks.map((m,i)=>
   `<div class="qint"><b>${m.k}</b> <span class="qs">· ${m.d}</span><div class="qd">${m.n} <span class="xdel" data-mx="${i}">✕</span></div></div>`).join('')
   ||'<div class="winitem" style="color:var(--faint)">0 of 20. First mock should hurt — that\'s the point of doing it early.</div>';
  document.querySelectorAll('[data-mx]').forEach(x=>{x.onclick=()=>{USER.mocks.splice(+x.dataset.mx,1);saveU();renderArsenal();};});
}
document.getElementById('star_add').onclick=()=>{
  const t=document.getElementById('star_t').value.trim();
  if(!t)return;
  USER.stars.push({lp:document.getElementById('star_lp').value,t,n:document.getElementById('star_n').value.trim()});
  document.getElementById('star_t').value='';document.getElementById('star_n').value='';
  saveU();renderArsenal();toast('▸ <b>Story banked.</b> '+USER.stars.length+'/10.');};
document.getElementById('mock_add').onclick=()=>{
  const n=document.getElementById('mock_n').value.trim();
  if(!n)return;
  USER.mocks.push({k:document.getElementById('mock_k').value,n,d:fmtS(new Date())});
  document.getElementById('mock_n').value='';
  saveU();renderArsenal();toast('▸ <b>Mock logged.</b> '+USER.mocks.length+'/20.');};

/* ---- STATS STRIP (FIG_001) ---- */
function renderStats(T,dayN,sc,solved){
  const banked=Object.values(AP.days).filter(dayDone).length;
  const pc=sc.tot?Math.round(sc.done/sc.tot*100):0;
  const runway=Math.min(Math.max(dayN/TOTAL,0),1);
  document.getElementById('statstrip').innerHTML=
   `<div class="stat q"><b>${banked}</b><span>DAYS BANKED</span><div class="sbar"><i style="width:${Math.min(banked/TOTAL*100,100)}%"></i></div></div>
    <div class="stat"><b>${sc.done}<small style="font-size:12px;color:var(--faint)">/${sc.tot}</small></b><span>TOPICS CLEARED</span><div class="sbar"><i style="width:${pc}%"></i></div></div>
    <div class="stat"><b>${solved}<small style="font-size:12px;color:var(--faint)">/300</small></b><span>DSA SOLVED</span><div class="sbar"><i style="width:${Math.min(solved/3,100)}%"></i></div></div>
    <div class="stat"><b>${streak()}</b><span>DAY STREAK</span><div class="sbar"><i style="width:${Math.min(streak()*2,100)}%"></i></div></div>
    <div class="stat"><b>${USER.wins.length}</b><span>WINS LOGGED</span><div class="sbar"><i style="width:${Math.min(USER.wins.length*4,100)}%"></i></div></div>`;
}

/* ---- 42-WEEK PROGRAM BROWSER ---- */
let openWks=JSON.parse(LS.getItem('oracle_wks')||'{}');
function renderWeeks(T){
  const DAYN=[["1","Mon"],["2","Tue"],["3","Wed"],["4","Thu"],["5","Fri"],["6","Sat"],["0","Sun"]];
  const off=USER.offset||0;
  let h='';
  WEEKS.weeks.forEach((w,wi)=>{
    const ws=new Date(w.s+"T00:00:00");
    const wsOff=new Date(ws.getTime()+off*MS); // real-calendar span this plan-week occupies
    const we=new Date(wsOff.getTime()+6*MS);
    const isCur=T>=wsOff&&T<=we;
    const open=openWks[wi]||isCur;
    h+=`<div class="wk ${isCur?'cur':''} ${open?'open':''}" id="wk_${wi}">
      <div class="wkhdr" data-w="${wi}">
        <span class="wd8">${fmtS(wsOff)} – ${fmtS(we)}</span>
        <span class="wth">${w.th}${isCur?'<span class="cur8">THIS WEEK</span>':''}</span>
        <span class="wph">${w.ph}</span>
      </div><div class="wkbody">`;
    DAYN.forEach(([dk,dn])=>{
      const idx=dk==="0"?6:(+dk-1);
      const dDate=new Date(wsOff.getTime()+idx*MS);
      const isToday=dd(T,dDate)===0;
      const isPast=dDate<T&&!isToday;
      const rec=AP.days[iso(dDate)];
      const okd=dayDone(rec);
      h+=`<div class="wkday ${isToday?'today8':''} ${isPast?'past8':''}">
        <span class="dn">${dn}<br>${dDate.getDate()}</span>
        <span class="dm">${(w.d[dk]||['—']).map(m=>`<div>${m}</div>`).join('')}
        ${okd?'<span class="ok8">✓ DAY BANKED</span>':''}</span></div>`;
    });
    h+=`</div></div>`;
  });
  const wb=document.getElementById('wkbrowser');
  wb.innerHTML=h;
  wb.querySelectorAll('.wkhdr').forEach(hd=>{
    hd.onclick=()=>{const i=hd.dataset.w;
      openWks[i]=!document.getElementById('wk_'+i).classList.contains('open');
      LS.setItem('oracle_wks',JSON.stringify(openWks));
      document.getElementById('wk_'+i).classList.toggle('open');};
  });
}

/* ---- CASE FILES ---- */
function renderCases(){
  document.getElementById('patternsbox').innerHTML=
    `<div class="patterns"><h4>THE PATTERN ACROSS EVERY CASE</h4>`+
    CASE_PATTERNS.map(p=>{const [a,b]=p.split(' — ');return `<div class="pat"><b>›</b><span><b style="color:var(--txt)">${a}</b>${b?' — '+b:''}</span></div>`;}).join('')+
    `</div>`;
  document.getElementById('casesbody').innerHTML=CASES.map(c=>
    `<div class="case">
      <div class="casewho">${c.who}</div><div class="casetier">${c.tier}</div>
      <div class="caserow"><span class="k">START</span>${c.bg}</div>
      <div class="caserow"><span class="k">WHAT THEY DID</span>${c.move}</div>
      <div class="caserow"><span class="k">OUTCOME</span>${c.out}</div>
      <div class="caselesson"><b>Lesson for you:</b> ${c.lesson}</div>
      <div class="casesrc">Source: ${c.src}</div>
    </div>`).join('');
}

/* ---- REQUIREMENTS ---- */
let reqFilter='all';
function renderReqs(){
  const all=REQ_GROUPS.flatMap(g=>g.items);
  const n=k=>all.filter(x=>x.cov===k).length;
  document.getElementById('reqintro').innerHTML=
    `The plan was built for depth — you build the transformer, the RAG system, the agent from a blank file, and that depth is what wins interviews. This is the other half: what job descriptions, portals, and hiring panels literally screen for in 2026, checked against what you're building. <b style="color:var(--txt)">${n('yes')} covered · ${n('partial')} thin · ${n('gap')} to add.</b>`
    +`<div class="reqcov"><span class="rc"><b style="color:var(--green)">${n('yes')}</b> covered</span><span class="rc"><b style="color:var(--amber)">${n('partial')}</b> partial</span><span class="rc"><b style="color:var(--red)">${n('gap')}</b> gap — worth adding</span></div>`;
  const filters=[['all','All'],['gap','Gaps only'],['partial','Thin spots'],['yes','Covered']];
  document.getElementById('reqfilter').innerHTML=filters.map(f=>`<span class="${reqFilter===f[0]?'on':''}" data-rf="${f[0]}">${f[1]}</span>`).join('');
  document.querySelectorAll('[data-rf]').forEach(s=>s.onclick=()=>{reqFilter=s.dataset.rf;renderReqs();});
  let h='';
  REQ_GROUPS.forEach(grp=>{
    const items=grp.items.filter(x=>reqFilter==='all'||x.cov===reqFilter);
    if(!items.length)return;
    h+=`<div class="reqg">${grp.g}</div>`;
    items.forEach(x=>{
      const label={yes:'COVERED',partial:'PARTIAL',gap:'ADD THIS'}[x.cov];
      h+=`<div class="reqrow ${x.cov==='gap'?'gap':''}">
        <div class="reqhead"><span class="reqname">${x.r}</span><span class="reqtag ${x.cov}">${label}</span></div>
        <div class="reqd">${x.d}</div>
        <div class="reqby"><b>${x.cov==='gap'?'→ ':x.cov==='partial'?'~ ':'✓ '}</b>${x.by}</div>
        <div class="reqsrc">Source: ${x.src}</div></div>`;
    });
  });
  document.getElementById('reqbody').innerHTML=h;
}

/* ---- GLOSSARY ---- */
let gq='';
function renderGloss(){
  const q=gq.toLowerCase();
  const list=GLOSS.filter(g=>!q||(g.t+' '+g.d).toLowerCase().includes(q));
  document.getElementById('glossbody').innerHTML=list.map(g=>
    `<div class="gterm"><div class="gt">${g.t}</div><div class="gd">${g.d}</div><div class="gs">[${g.s}]</div></div>`
  ).join('')||'<div class="gterm"><div class="gd">No matching term. It might deserve a spot — everything here came from your files.</div></div>';
}
document.getElementById('gsearch').addEventListener('input',e=>{gq=e.target.value;renderGloss();});

/* ---- PACE ---- */
function renderPace(T,solved){
  document.getElementById('dsain').value=solved;
  let dh='';
  DSA_CHECKS.forEach(c=>{
    const left=c.t-solved,days=dd(T,c.d);
    let cls,txt;
    if(left<=0){cls='done';txt='✓ cleared';}
    else if(days<=0){cls='hot';txt=`${left} overdue`;}
    else{const w=workdays(T,c.d)||1;const rate=left/w;
      cls=rate<=1.5?'ok':rate<=2.5?'warn':'hot';txt=`${rate.toFixed(1)}/day`;}
    dh+=`<div class="chk"><span class="t">${c.gate} ${c.lbl} <small>(${Math.max(days,0)}d)</small></span><span class="rate ${cls}">${txt}</span></div>`;
  });
  document.getElementById('dsachks').innerHTML=dh;
  const OD=eGates()[3].d;
  const offD=dd(T,OD),offW=workdays(T,OD);
  document.getElementById('wdmath').innerHTML= offD>0
    ? `To the offer gate (${fmtS(OD)}): <b>${offD} days</b> = <b>${offW} working days</b> ≈ <b>${Math.floor(offW/6)} full weeks</b> of deep-work blocks. Every one is either a commit or a rest that protects the next commit.`
    : `The offer gate has passed. What matters now is on the table in front of you.`;
}

/* ---- DEADLINES ---- */
let dlOpen=false;
function renderDl(T){
  const rows=eDLs().map(([l,d])=>{
    const dt=new Date(d+"T00:00:00");const days=dd(T,dt);
    return {html:`<div class="dl${days<0?' past':days<=14?' hot':''}"><span>${l}</span><span class="n">${days<0?'✓ past':days===0?'TODAY':days+'d'}</span></div>`,past:days<0};
  });
  const up=rows.filter(r=>!r.past), past=rows.filter(r=>r.past);
  const show=dlOpen?rows.map(r=>r.html):up.slice(0,3).map(r=>r.html);
  const hidden=rows.length-(dlOpen?rows.length:Math.min(up.length,3));
  document.getElementById('dlbody').innerHTML=show.join('')+
    (hidden>0?`<div class="dl" style="border:0;cursor:pointer;color:var(--faint)" onclick="dlOpen=true;render()"><span>▾ ${hidden} more</span></div>`:'')+
    (dlOpen&&rows.length>3?`<div class="dl" style="border:0;cursor:pointer;color:var(--faint)" onclick="dlOpen=false;render()"><span>▴ show less</span></div>`:'');
}

/* ---- ROADMAP ---- */
function renderRoadmap(T){
  const cur=activeModule();
  const items=[];
  SYL.forEach(p=>p.mods.forEach(m=>items.push(m)));
  items.sort((a,b)=>a.dl<b.dl?-1:1);
  let h='';
  items.forEach(m=>{
    const st=SY[m.id]||[];
    const done=st.filter(Boolean).length,tot=m.topics.length,pc=Math.round(done/tot*100);
    const isCur=cur&&cur.id===m.id, isDone=done===tot;
    const isGate=/GATE|⛩/.test(m.dep)||["m5","m7","m9"].includes(m.id);
    h+=`<div class="node ${isDone?'done':''} ${isCur?'active':''} ${isGate?'gate':''}" onclick="openModule('${m.id}')">
      <div class="nk">MODULE ${m.n}${isGate?' · ⛩ GATE':''}<span class="dt">${m.dep.split('·').pop().trim()}</span></div>
      <div class="nn">${m.t}${isCur?'<span class="here">YOU ARE HERE</span>':''}</div>
      <div class="nw">${WHY[m.id]||''}</div>
      <div class="np"><div class="npbar"><i style="width:${pc}%"></i></div><div class="npn">${done}/${tot} · ${pc}%</div></div>
    </div>`;
  });
  h+=`<div class="node gate" onclick="go('tgts')">
    <div class="nk">DESTINATION<span class="dt">Summer 2027</span></div>
    <div class="nn">🎯 INTERNSHIP OFFER</div>
    <div class="nw">The top band (₹50–84L) is reached through exactly two doors your files document: AI-first startup + ESOPs (Sarvam ₹84L) or intern→PPO (Amazon AS-1 ₹63L). Both are artifact routes. Evaluate offers: learning 40 · network 25 · comp 15 · brand 10 · optionality 10.</div>
  </div>`;
  document.getElementById('flow').innerHTML=h;
}
function openModule(id){
  go('syll');
  openMods[id]=true;LS.setItem('oracle_open',JSON.stringify(openMods));
  render();
  setTimeout(()=>{const el=document.getElementById('mod_'+id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},80);
}

/* ---- SYLLABUS ---- */
let openMods=JSON.parse(LS.getItem('oracle_open')||'{}');
function renderSyll(T){
  const sc=syllCounts();
  const g1=dd(T,eGates()[0].d),go_=dd(T,eGates()[3].d);
  document.getElementById('syllstats').innerHTML=
    `<div class="st"><b>${sc.tot?Math.round(sc.done/sc.tot*100):0}%</b><span>PROGRAM COMPLETE</span></div>
     <div class="st"><b>${sc.done}/${sc.tot}</b><span>TOPICS CLEARED</span></div>
     <div class="st"><b>${g1>=0?g1:'—'}</b><span>DAYS TO GATE 1</span></div>
     <div class="st"><b>${go_>=0?go_:'—'}</b><span>DAYS TO OFFER GATE</span></div>`;
  const cur=activeModule();
  let h='';
  SYL.forEach(p=>{
    h+=`<div class="phhdr">▞ ${p.ph}</div>`;
    p.mods.forEach(m=>{
      const st=SY[m.id]||[];
      const done=st.filter(Boolean).length,tot=m.topics.length,pc=Math.round(done/tot*100);
      const isCur=cur&&cur.id===m.id, isDone=done===tot;
      const open=openMods[m.id]||isCur;
      h+=`<div class="mod ${isCur?'active':''} ${isDone?'done':''} ${open?'open':''}" id="mod_${m.id}">
        <div class="modhdr" data-m="${m.id}">
          <div class="modn">${m.n}</div>
          <div><div class="modt">${m.t}${isCur?'<span class="modhere">YOU ARE HERE</span>':''}</div>
            <div class="moddep">${m.dep} · deadline ${fmt(new Date(m.dl+"T00:00:00"))}</div></div>
          <div class="modright"><div class="modpct">${pc}%</div><div class="modbar"><i style="width:${pc}%"></i></div></div>
        </div>
        <div class="modbody">`;
      if(PRIMERS[m.id])h+=`<div class="primer"><div class="plabel">PRIMER — read before the first block · re-read when lost</div>${PRIMERS[m.id]}</div>`;
      const rs=RES[m.id];
      if(rs){h+=`<div class="res"><div class="rlbl">RESOURCES — FROM YOUR OWN PLAN</div>`;
        rs.forEach(r=>{h+=`<a class="rchip" href="${r[2]}" target="_blank" rel="noopener"><span class="ic">${r[0]}</span>${r[1]}</a>`;});
        h+=`</div>`;}
      m.topics.forEach((t,i)=>{
        h+=`<label class="topic ${st[i]?'on':''}"><input type="checkbox" data-m="${m.id}" data-i="${i}" ${st[i]?'checked':''}>
          <span class="tx">${t[0]}${t[1]?`<span class="hint">↳ ${t[1]}</span>`:''}</span></label>`;
      });
      h+=`<div class="moddel">DELIVERABLE — ${m.del}</div></div></div>`;
    });
  });
  const sb=document.getElementById('syllbody');
  sb.innerHTML=h;
  sb.querySelectorAll('.modhdr').forEach(hd=>{
    hd.onclick=()=>{const id=hd.dataset.m;openMods[id]=!document.getElementById('mod_'+id).classList.contains('open');
      LS.setItem('oracle_open',JSON.stringify(openMods));
      document.getElementById('mod_'+id).classList.toggle('open');};
  });
  sb.querySelectorAll('.topic input').forEach(inp=>{
    inp.onchange=()=>{const id=inp.dataset.m,i=+inp.dataset.i;
      SY[id]=SY[id]||[];SY[id][i]=inp.checked;saveSY();render();};
  });
}

/* ---- RADAR ---- */
function renderRadar(T){
  const rows=eWindows().map(w=>{
    let status,order,cd='';
    if(w.tbd){status='<span class="pill tbd">DATE TBD</span>';order=3;cd='ask the SPOC';}
    else if(w.rolling){status='<span class="pill rolling">ROLLING</span>';order=2;cd='always open';}
    else if(T>=w.open&&T<=w.close){status='<span class="pill open">OPEN NOW</span>';order=0;cd=`closes ${fmtS(w.close)} · ${dd(T,w.close)}d left`;}
    else if(T<w.open){const n=dd(T,w.open);status=`<span class="pill soon">IN ${n}d</span>`;order=1;cd=`${w.est?'~':''}${fmtS(w.open)} → ${fmtS(w.close)}`;}
    else{status='<span class="pill closed">CLOSED</span>';order=4;cd=`was ${fmtS(w.open)} → ${fmtS(w.close)}${w.est?' (est)':''}`;}
    return {w,status,order,cd,when:w.open?dd(T,w.open):9999};
  }).sort((a,b)=>a.order-b.order||a.when-b.when);
  document.getElementById('radarbody').innerHTML=rows.map(r=>`
    <div class="row"><div>${r.status}<div class="cd">${r.cd}</div></div>
      <div><div class="nm">${r.w.n} <small>· ${r.w.tag}</small></div>
        <div class="mv">${r.w.note}</div><div class="src">[${r.w.src}]</div></div></div>`).join('');
}

/* ---- TARGETS ---- */
function renderTargets(){
  document.getElementById('tgrid').innerHTML=TGT.map((t,i)=>`
    <div class="tgt" onclick="this.classList.toggle('open')">
      <div class="tn">${t.n}</div><div class="tt">${t.tag}</div>
      <div class="tw">${t.why}</div>
      <div class="tevi">“${t.evi}”</div>
      <div class="tmv">${t.mv.map(m=>`<div>▸ ${m}</div>`).join('')}</div>
      <div class="tsrc">[${t.src}]</div>
      <div class="more">TAP FOR INTEL ▾</div>
    </div>`).join('');
}

/* ---- FUEL ---- */
/* one card per day (deterministic — no motion noise during work); tap to cycle */
let fuelOffset=0, fi=0;
function drawFuel(){
  const F=eFuel();
  fi=(Math.abs(dd(new Date(2026,0,1),day0(new Date())))+fuelOffset)%F.length;
  document.getElementById('fuelq').innerHTML='“'+F[fi].q+'”';
  document.getElementById('fuelsrc').textContent='[ '+F[fi].src+' ]';
  document.getElementById('fueldots').textContent=(fi+1)+' / '+F.length;
}
function nextFuel(){fuelOffset++;drawFuel();}

/* ---- inputs ---- */
document.getElementById('dsain').addEventListener('input',e=>{
  LS.setItem('oracle_dsa',e.target.value||'0');render();
});

/* ---- lens ---- */
const LENS0=new Date(2026,6,20);
const lr=document.getElementById('lensrange');
lr.addEventListener('input',e=>{
  const d=new Date(LENS0.getTime()+parseInt(e.target.value,10)*MS);
  lens=(dd(day0(new Date()),d)===0)?null:d;
  render();
});
function resetLens(){
  lens=null;
  lr.value=Math.min(Math.max(dd(LENS0,day0(new Date())),0),345);
  render();
}

/* ---- clock / theme / routing ---- */
function tickClock(){
  const n=new Date();
  document.getElementById('clock').textContent=
    n.toLocaleDateString('en-IN',{day:'2-digit',month:'short'})+' · '+
    n.toLocaleTimeString('en-IN',{hour12:false});
}
setInterval(tickClock,1000);tickClock();

document.getElementById('themebtn').onclick=()=>{
  document.body.classList.toggle('dark');
  LS.setItem('oracle_theme',document.body.classList.contains('dark')?'dark':'light');
};
if(LS.getItem('oracle_theme')==='dark')document.body.classList.add('dark');

/* simple mode — just today, nothing else */
document.getElementById('zenbtn').onclick=()=>{
  const on=document.body.classList.toggle('zen');
  document.getElementById('zenbtn').classList.toggle('on',on);
  LS.setItem('oracle_zen',on?'1':'0');
  if(on)go('dash');
  toast(on?'◧ <b>Simple mode.</b> Just today. Everything else waits behind ⌘K.':'◧ Full view restored.');
};
if(LS.getItem('oracle_zen')==='1'){document.body.classList.add('zen');document.getElementById('zenbtn').classList.add('on');}

const VIEWS=['dash','road','syll','tgts','radar','pipe','stats','market','arsenal','reqs','cases','gloss'];
function go(v){
  if(!VIEWS.includes(v))v='dash';
  VIEWS.forEach(x=>{
    document.getElementById('v_'+x).classList.toggle('on',x===v);
  });
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.v===v));
  document.querySelectorAll('.bnav .bi').forEach(b=>b.classList.toggle('on',b.dataset.v===v));
  location.hash='/'+v;
  window.scrollTo({top:0});
}
document.querySelectorAll('.tab').forEach(t=>{if(t.dataset.v)t.onclick=()=>go(t.dataset.v);});
document.querySelectorAll('.bnav .bi').forEach(b=>{if(b.dataset.v)b.onclick=()=>go(b.dataset.v);});
document.getElementById('moretab').onclick=openPal;
document.getElementById('morebi').onclick=openPal;
window.addEventListener('hashchange',()=>{const v=location.hash.replace('#/','');if(VIEWS.includes(v))go(v);});

/* ================= COMMAND PALETTE (⌘K) ================= */
let palSel=0, palItems=[];
function palIndex(){
  const ix=[];
  [['Dashboard','dash'],['Roadmap','road'],['Syllabus','syll'],['Targets','tgts'],['Radar','radar'],
   ['Pipeline','pipe'],['Analytics','stats'],['Market','market'],['Arsenal','arsenal'],
   ['Requirements','reqs'],['Case Files','cases'],['Glossary','gloss']]
    .forEach(p=>ix.push({k:'VIEW',t:p[0],s:'switch view',run:()=>go(p[1])}));
  REQ_GROUPS.forEach(g=>g.items.forEach(it=>ix.push({k:'REQ',t:it.r,s:it.cov.toUpperCase()+' · what employers want',run:()=>go('reqs')})));
  CASES.forEach(c=>ix.push({k:'CASE',t:c.who,s:c.tier,run:()=>go('cases')}));
  ix.push({k:'ACTION',t:'Add STAR story',s:'interview arsenal',run:()=>{go('arsenal');document.getElementById('star_t').focus();}});
  ix.push({k:'ACTION',t:'Log mock interview',s:'interview arsenal',run:()=>{go('arsenal');document.getElementById('mock_n').focus();}});
  ix.push({k:'ACTION',t:'Add application / outreach',s:'pipeline',run:()=>{go('pipe');document.getElementById('app_c').focus();}});
  ix.push({k:'ACTION',t:'Start deep-work block',s:'focus mode',run:()=>{go('dash');openFocus();}});
  ix.push({k:'ACTION',t:'Weekly review',s:'5 questions + ONE thing',run:()=>{go('dash');document.getElementById('reviewcard').scrollIntoView({behavior:'smooth'});}});
  USER.apps.forEach(a=>ix.push({k:'PIPE',t:a.c,s:(KINDN[a.k]||a.k)+' · '+a.st,run:()=>go('pipe')}));
  GLOSS.forEach(g=>ix.push({k:'TERM',t:g.t,s:g.d.slice(0,52)+'…',run:()=>{go('gloss');
    const gs=document.getElementById('gsearch');gs.value=g.t;gq=g.t;renderGloss();}}));
  ix.push({k:'ACTION',t:'Export backup',s:'download .json',run:doExport});
  ix.push({k:'ACTION',t:'Toggle theme',s:'dark / light',run:()=>document.getElementById('themebtn').click()});
  ix.push({k:'ACTION',t:'Open control panel',s:'edit dates, windows, gates',run:openModal});
  ix.push({k:'ACTION',t:'Log friction',s:'execution log bug',run:()=>{openModal();document.getElementById('grp_log').scrollIntoView();}});
  SYL.forEach(p=>p.mods.forEach(m=>{
    ix.push({k:'MODULE',t:m.n+' · '+m.t,s:m.dep.slice(0,44),run:()=>openModule(m.id)});
    m.topics.forEach(tp=>ix.push({k:'TOPIC',t:tp[0].slice(0,70),s:'Module '+m.n+' · '+m.t.slice(0,30),run:()=>openModule(m.id)}));
  }));
  TGT.forEach(t=>ix.push({k:'TARGET',t:t.n,s:t.tag,run:()=>go('tgts')}));
  eWindows().forEach(w=>ix.push({k:'WINDOW',t:w.n,s:w.tag,run:()=>go('radar')}));
  return ix;
}
function openPal(){document.getElementById('pal').classList.add('on');
  const i=document.getElementById('palin');i.value='';palFilter('');i.focus();}
function closePal(){document.getElementById('pal').classList.remove('on');}
function palFilter(q){
  const ix=palIndex();q=q.toLowerCase().trim();
  palItems=q? ix.filter(x=>(x.t+' '+(x.s||'')+' '+x.k).toLowerCase().includes(q)).slice(0,40)
           : ix.filter(x=>x.k==='VIEW'||x.k==='ACTION'||x.k==='MODULE').slice(0,20);
  palSel=0;drawPal();
}
function drawPal(){
  const pl=document.getElementById('palist');
  pl.innerHTML=palItems.map((x,i)=>
    `<div class="palit ${i===palSel?'sel':''}" data-pi="${i}"><span class="k">${x.k}</span><span>${x.t}</span><span class="s">${x.s||''}</span></div>`)
    .join('')||'<div class="palit"><span class="k">—</span><span>No matches.</span></div>';
  pl.querySelectorAll('.palit[data-pi]').forEach(el=>{
    el.onclick=()=>{palItems[+el.dataset.pi].run();closePal();};});
  const sel=pl.querySelector('.palit.sel');if(sel&&sel.scrollIntoView)sel.scrollIntoView({block:'nearest'});
}
document.getElementById('palin').addEventListener('input',e=>palFilter(e.target.value));
document.getElementById('palbtn').onclick=openPal;
document.getElementById('pal').addEventListener('click',e=>{if(e.target.id==='pal')closePal();});

/* ================= KEYBOARD ================= */
document.addEventListener('keydown',e=>{
  if(focusOpen()){ /* stimulus control — only space (pause) works during a block */
    if(e.key===' '){e.preventDefault();document.getElementById('fpause').click();}
    return;
  }
  const pal=document.getElementById('pal').classList.contains('on');
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal?closePal():openPal();return;}
  if(pal){
    if(e.key==='Escape'){closePal();}
    else if(e.key==='ArrowDown'){e.preventDefault();palSel=Math.min(palSel+1,palItems.length-1);drawPal();}
    else if(e.key==='ArrowUp'){e.preventDefault();palSel=Math.max(palSel-1,0);drawPal();}
    else if(e.key==='Enter'&&palItems[palSel]){palItems[palSel].run();closePal();}
    return;
  }
  if(e.key==='Escape'&&modal.classList.contains('on')){closeModal();return;}
  const tag=(e.target.tagName||'').toLowerCase();
  if(tag==='input'||tag==='textarea'||e.metaKey||e.ctrlKey||e.altKey)return;
  if(e.key>='1'&&e.key<='9')go(VIEWS[+e.key-1]);
  else if(e.key==='0')go('gloss');
  else if(e.key.toLowerCase()==='t')document.getElementById('themebtn').click();
  else if(e.key.toLowerCase()==='z')document.getElementById('zenbtn').click();
  else if(e.key==='/'){e.preventDefault();openPal();}
});

/* ================= BACKUP SYSTEM ================= */
function doExport(){
  const blob={_oracle:5,exported:new Date().toISOString(),
    autopilot:AP,syl_v2:SY,oracle_user:USER,
    oracle_dsa:LS.getItem('oracle_dsa')||'0',
    oracle_open:LS.getItem('oracle_open')||'{}'};
  dl_file('oracle-backup-'+iso(new Date())+'.json',JSON.stringify(blob,null,1),'application/json');
  LS.setItem('oracle_lastbk',Date.now());
  toast('⛃ <b>Backup exported.</b> Keep it somewhere safe.');
  checkNag();
}
function checkNag(){
  const last=parseInt(LS.getItem('oracle_lastbk')||'0',10);
  const dism=parseInt(LS.getItem('oracle_nagdis')||'0',10);
  const has=Object.keys(AP.days).length>0||syllCounts().done>0||USER.wins.length>0||USER.bugs.length>0;
  const now=Date.now();
  const stale=!last||now-last>7*86400000;
  const recent=dism&&now-dism<3*86400000;
  const el=document.getElementById('nag');
  if(has&&stale&&!recent){
    document.getElementById('nagtxt').textContent= last?
      'Last backup was '+Math.floor((now-last)/86400000)+' days ago.':'Your progress has never been backed up.';
    el.classList.add('on');
  } else el.classList.remove('on');
}
/* one-time browser fingerprint — warns if you're in a different browser than usual */
(function(){
  const ua=navigator.userAgent||'';
  const me=/Arc/i.test(ua)?'Arc':/Edg/i.test(ua)?'Edge':/OPR|Opera/i.test(ua)?'Opera':
    /Firefox/i.test(ua)?'Firefox':/Chrome/i.test(ua)?'Chrome':/Safari/i.test(ua)?'Safari':'this browser';
  const home=LS.getItem('oracle_home');
  if(!home){LS.setItem('oracle_home',me);return;}
  if(home!==me&&!LS.getItem('oracle_browserwarned_'+me)){
    LS.setItem('oracle_browserwarned_'+me,'1');
    setTimeout(()=>toast(`⇄ <b>Different browser.</b> Your history lives in ${home} — this ${me} copy is separate. Sync via ⚙ or go back to ${home}.`),1200);
  }
})();

document.getElementById('nagexp').onclick=doExport;
document.getElementById('nagdis').onclick=()=>{LS.setItem('oracle_nagdis',Date.now());checkNag();};
checkNag();

/* ================= ⚙ CONTROL PANEL ================= */
const modal=document.getElementById('modal');
function openModal(){renderSettings();modal.classList.add('on');}
function closeModal(){modal.classList.remove('on');render();}
document.getElementById('gear').onclick=openModal;
document.getElementById('fricbtn').onclick=()=>{openModal();document.getElementById('grp_log').scrollIntoView();};
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});

function renderSettings(){
  const de=document.getElementById('dl_edit');
  let h='';
  DLS.forEach((x,i)=>{const o=USER.dlOv[i]||{};
    h+=`<div class="srow"><input type="text" value="${(o.l||x[0]).replace(/"/g,'&quot;')}" data-dli="${i}" data-f="l">
      <input type="date" value="${o.d||x[1]}" data-dli="${i}" data-f="d">
      <label class="hide"><input type="checkbox" data-dlh="${i}" ${o.hide?'checked':''}>hide</label></div>`;});
  USER.dl.forEach((x,i)=>{
    h+=`<div class="srow"><input type="text" value="${x.l.replace(/"/g,'&quot;')}" data-cdli="${i}" data-f="l">
      <input type="date" value="${x.d}" data-cdli="${i}" data-f="d">
      <span class="xdel" data-cdlx="${i}">✕</span></div>`;});
  de.innerHTML=h;
  de.querySelectorAll('[data-dli]').forEach(inp=>{inp.onchange=()=>{
    const i=+inp.dataset.dli;USER.dlOv[i]=USER.dlOv[i]||{};USER.dlOv[i][inp.dataset.f]=inp.value;saveU();};});
  de.querySelectorAll('[data-dlh]').forEach(inp=>{inp.onchange=()=>{
    const i=+inp.dataset.dlh;USER.dlOv[i]=USER.dlOv[i]||{};USER.dlOv[i].hide=inp.checked;saveU();};});
  de.querySelectorAll('[data-cdli]').forEach(inp=>{inp.onchange=()=>{
    USER.dl[+inp.dataset.cdli][inp.dataset.f]=inp.value;saveU();};});
  de.querySelectorAll('[data-cdlx]').forEach(x=>{x.onclick=()=>{
    USER.dl.splice(+x.dataset.cdlx,1);saveU();renderSettings();};});
  document.getElementById('dl_add').onclick=()=>{
    const l=document.getElementById('dl_nl').value.trim(),d=document.getElementById('dl_nd').value;
    if(!l||!d)return;USER.dl.push({l,d});saveU();renderSettings();};

  const we=document.getElementById('win_edit');
  let wh='';
  WINDOWS.forEach((w,i)=>{
    if(w.rolling||w.tbd){wh+=`<div class="srow"><span style="font-size:12px;color:var(--dim);flex:1">${w.n}</span><span style="font-size:10.5px;color:var(--faint)">${w.rolling?'rolling — no dates':'TBD — add real date as a deadline above when known'}</span></div>`;return;}
    const o=USER.winOv[i]||{};
    const od=o.open||iso(w.open),cd=o.close||iso(w.close);
    wh+=`<div class="srow"><span style="font-size:12px;color:var(--dim);min-width:160px;flex:1">${w.n}${w.est&&!o.open?' <span style="color:var(--amber)">(estimate)</span>':''}</span>
      <input type="date" value="${od}" data-wi="${i}" data-f="open"><input type="date" value="${cd}" data-wi="${i}" data-f="close"></div>`;});
  USER.win.forEach((w,i)=>{
    wh+=`<div class="srow"><span style="font-size:12px;color:var(--acc);min-width:160px;flex:1">${w.n} · ${w.tag||''}</span>
      <input type="date" value="${w.open}" data-cwi="${i}" data-f="open"><input type="date" value="${w.close}" data-cwi="${i}" data-f="close">
      <span class="xdel" data-cwx="${i}">✕</span></div>`;});
  we.innerHTML=wh;
  we.querySelectorAll('[data-wi]').forEach(inp=>{inp.onchange=()=>{
    const i=+inp.dataset.wi;USER.winOv[i]=USER.winOv[i]||{};USER.winOv[i][inp.dataset.f]=inp.value;saveU();};});
  we.querySelectorAll('[data-cwi]').forEach(inp=>{inp.onchange=()=>{
    USER.win[+inp.dataset.cwi][inp.dataset.f]=inp.value;saveU();};});
  we.querySelectorAll('[data-cwx]').forEach(x=>{x.onclick=()=>{
    USER.win.splice(+x.dataset.cwx,1);saveU();renderSettings();};});
  document.getElementById('win_add').onclick=()=>{
    const n=document.getElementById('win_nn').value.trim(),t=document.getElementById('win_nt').value.trim(),
      o=document.getElementById('win_no').value,c=document.getElementById('win_nc').value;
    if(!n||!o||!c)return;USER.win.push({n,tag:t||'custom',open:o,close:c,note:t||'Added by you.'});saveU();renderSettings();};

  const ge=document.getElementById('gate_edit');
  ge.innerHTML=GATES.map((g,i)=>`<div class="srow">
    <span style="font-size:12px;color:var(--dim);flex:1">${g.n}</span>
    <input type="date" value="${USER.gates[i]||iso(g.d)}" data-gi="${i}"></div>`).join('');
  ge.querySelectorAll('[data-gi]').forEach(inp=>{inp.onchange=()=>{
    const i=+inp.dataset.gi;
    if(iso(GATES[i].d)===inp.value)delete USER.gates[i];else USER.gates[i]=inp.value;
    saveU();};});

  const oi=document.getElementById('offset_in');oi.value=USER.offset;
  oi.onchange=()=>{USER.offset=parseInt(oi.value,10)||0;saveU();};

  const gi=document.getElementById('goal_in');gi.value=USER.blockGoal||3;
  gi.onchange=()=>{USER.blockGoal=Math.max(1,Math.min(8,parseInt(gi.value,10)||3));saveU();render();};

  const bl=document.getElementById('bug_list');
  bl.innerHTML=USER.bugs.map((b,i)=>`<div class="winitem">◆ <b style="color:var(--amber)">${b.w||'—'}</b> — ${b.b} <span style="color:var(--faint)">fix: ${b.f||'—'} · ${b.d}</span> <span class="xdel" data-bx="${i}">✕</span></div>`).join('')||'<div class="winitem" style="color:var(--faint)">No friction logged yet. A bug is something execution revealed, not something a re-read suggested.</div>';
  bl.querySelectorAll('[data-bx]').forEach(x=>{x.onclick=()=>{USER.bugs.splice(+x.dataset.bx,1);saveU();renderSettings();};});
  document.getElementById('bug_add').onclick=()=>{
    const w=document.getElementById('bug_w').value.trim(),b=document.getElementById('bug_b').value.trim(),f=document.getElementById('bug_f').value.trim();
    if(!b)return;USER.bugs.push({d:fmtS(new Date()),w,b,f});
    document.getElementById('bug_w').value='';document.getElementById('bug_b').value='';document.getElementById('bug_f').value='';
    saveU();renderSettings();};

  const fl=document.getElementById('fuel_list');
  fl.innerHTML=USER.fuel.map((f,i)=>`<div class="winitem">⚡ ${f.q.replace(/<[^>]+>/g,'').slice(0,80)}… <span class="xdel" data-fx="${i}">✕</span></div>`).join('');
  fl.querySelectorAll('[data-fx]').forEach(x=>{x.onclick=()=>{USER.fuel.splice(+x.dataset.fx,1);saveU();renderSettings();};});
  document.getElementById('fuel_add').onclick=()=>{
    const q=document.getElementById('fuel_q').value.trim(),s=document.getElementById('fuel_s').value.trim();
    if(!q)return;USER.fuel.push({q,src:s||'your research'});
    document.getElementById('fuel_q').value='';document.getElementById('fuel_s').value='';
    saveU();renderSettings();drawFuel();};

  /* ⇄ cross-browser sync — clipboard, because storage is sealed per browser */
  function syncBlob(){
    return {_oracle:5,exported:new Date().toISOString(),autopilot:AP,syl_v2:SY,oracle_user:USER,
      oracle_dsa:LS.getItem('oracle_dsa')||'0',oracle_open:LS.getItem('oracle_open')||'{}',
      oracle_wks:LS.getItem('oracle_wks')||'{}'};
  }
  const sstat=document.getElementById('sync_status');
  document.getElementById('sync_copy').onclick=()=>{
    const s=JSON.stringify(syncBlob());
    const days=Object.keys(AP.days).length;
    const done=()=>{sstat.innerHTML=`Copied — ${days} day${days===1?'':'s'} of data, ${(s.length/1024).toFixed(1)} KB. Now paste it in the other browser's ⚙ panel.`;
      toast('⧉ <b>Sync code copied.</b> Paste it in the other browser.');};
    try{navigator.clipboard.writeText(s).then(done,()=>{document.getElementById('sync_in').value=s;
      sstat.textContent='Clipboard blocked — the code is in the box below. Select all and copy it manually.';});}
    catch(e){document.getElementById('sync_in').value=s;sstat.textContent='Clipboard blocked — code placed in the box below; copy it manually.';}
  };
  document.getElementById('sync_apply').onclick=()=>{
    const raw=document.getElementById('sync_in').value.trim();
    if(!raw){sstat.textContent='Paste a sync code first.';return;}
    let b; try{b=JSON.parse(raw);}catch(e){sstat.textContent='That isn’t a valid sync code — copy the whole thing, including the braces.';return;}
    if(!b._oracle){sstat.textContent='That isn’t an ORACLE sync code.';return;}
    const incoming=Object.keys(b.autopilot&&b.autopilot.days||{}).length;
    const here=Object.keys(AP.days).length;
    if(!confirm(`Overwrite this browser's data?\n\nHere: ${here} days\nPasted: ${incoming} days\n\nThis cannot be undone.`))return;
    LS.setItem('autopilot',JSON.stringify(b.autopilot||{}));
    LS.setItem('syl_v2',JSON.stringify(b.syl_v2||{}));
    LS.setItem('oracle_user',JSON.stringify(b.oracle_user||{}));
    LS.setItem('oracle_dsa',b.oracle_dsa||'0');
    LS.setItem('oracle_open',b.oracle_open||'{}');
    LS.setItem('oracle_wks',b.oracle_wks||'{}');
    location.reload();
  };

  document.getElementById('exp_all').onclick=doExport;
  document.getElementById('exp_log').onclick=()=>{
    let md="## Bugs found through use\n| Date | Where (§ / chapter / project) | What broke down | Fix idea (for next version) |\n|------|------|------|------|\n";
    USER.bugs.forEach(b=>{md+=`| ${b.d} | ${b.w||''} | ${b.b} | ${b.f||''} |\n`;});
    md+="\n## Wins worth keeping (dopamine log — §46)\n| Date | What shipped / what worked |\n|------|------|\n";
    USER.wins.forEach(w=>{md+=`| ${w.d} | ${w.t} |\n`;});
    if(USER.stars.length){md+="\n## STAR story bank\n| Leadership Principle | Story | Notes |\n|------|------|------|\n";
      USER.stars.forEach(s=>{md+=`| ${s.lp} | ${s.t} | ${s.n||''} |\n`;});}
    if(USER.mocks.length){md+="\n## Mock interview log\n| Date | Type | Debrief |\n|------|------|------|\n";
      USER.mocks.forEach(m=>{md+=`| ${m.d} | ${m.k} | ${m.n} |\n`;});}
    const shipRows=[];
    Object.keys(AP.days).sort().forEach(dk=>{(AP.days[dk].blocks||[]).forEach(b=>{if(b.n)shipRows.push(`| ${dk} | ${b.n.replace(/\|/g,'/')} | ${b.df||''} |`);});});
    if(shipRows.length){md+="\n## Ship log (block debriefs → DECISIONS.md raw material)\n| Date | What was built / learned | Difficulty |\n|------|------|------|\n"+shipRows.join("\n")+"\n";}
    dl_file('execution-log-export-'+iso(new Date())+'.md',md,'text/markdown');};
  document.getElementById('imp_all').onclick=()=>document.getElementById('imp_file').click();
  document.getElementById('imp_file').onchange=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=()=>{try{
      const b=JSON.parse(r.result);
      if(!b._oracle)throw 0;
      LS.setItem('autopilot',JSON.stringify(b.autopilot||{}));
      LS.setItem('syl_v2',JSON.stringify(b.syl_v2||{}));
      LS.setItem('oracle_user',JSON.stringify(b.oracle_user||{}));
      LS.setItem('oracle_dsa',b.oracle_dsa||'0');
      LS.setItem('oracle_open',b.oracle_open||'{}');
      location.reload();
    }catch(_){alert('Not a valid ORACLE backup file.');}};
    r.readAsText(f);};
  document.getElementById('reset_edits').onclick=()=>{
    if(!confirm('Reset all EDITS (dates, windows, gates, offset)? Progress, wins, bugs and tasks are kept.'))return;
    USER.dlOv={};USER.winOv={};USER.gates={};USER.offset=0;saveU();renderSettings();};
}
function dl_file(name,content,type){
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([content],{type}));
  a.download=name;document.body.appendChild(a);a.click();a.remove();
}
/* boot code stripped — see oracle-ui.js */
