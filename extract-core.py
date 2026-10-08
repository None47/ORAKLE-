#!/usr/bin/env python3
"""Extracts the original ORACLE <script> block into oracle-core.js.

Removes only the final boot lines (renderTargets/drawFuel/resetLens/
checkMilestones/go/setInterval) so the file becomes pure data + state
logic with no auto-init. The new UI's own boot code handles init.

Everything else (USER, GATES, SYL, planFor, eGates, syllCounts, the
original render* functions, etc.) is preserved verbatim — the new UI
calls planFor/eGates/etc. directly and ignores the old render* funcs.
"""
import re, pathlib

SRC = pathlib.Path("/home/z/my-project/download/oracle-vercel/Oracle Final Corrected Locked.html")
DST = pathlib.Path("/home/z/my-project/download/oracle-vercel/oracle-core.js")

html = SRC.read_text(encoding="utf-8")

# extract the script block content (between <script> and </script>)
m = re.search(r"<script>(.*?)</script>", html, re.DOTALL)
if not m:
    raise SystemExit("no <script> block found")
script = m.group(1)

# strip the trailing boot code (last ~6 lines that look like init calls)
# the original ends with:
#   renderTargets();drawFuel();resetLens();checkMilestones();
#   go(location.hash.replace('#/','')||'dash');
#   setInterval(()=>{if(!lens&&!focusOpen())render();},60000);
boot_re = re.compile(
    r"\n*/\* -+ boot -+ \*/\s*\n"
    r"renderTargets\(\);drawFuel\(\);resetLens\(\);checkMilestones\(\);\s*\n"
    r"go\(location\.hash\.replace\([^)]*\)\|\|'dash'\);\s*\n"
    r"setInterval\([^)]*\)=>\{[^}]*\},60000\);\s*$",
    re.MULTILINE
)
m2 = boot_re.search(script)
if m2:
    print(f"Stripping boot code: {len(m2.group(0))} chars removed")
    script = script[:m2.start()] + "\n/* boot code stripped — see oracle-ui.js */\n"
else:
    # fallback: strip last 4 lines if they look like boot
    lines = script.rstrip().split("\n")
    boot_marker = None
    for i, ln in enumerate(lines):
        if "/* ---- boot ----" in ln or "boot" in ln.lower():
            boot_marker = i
    if boot_marker is not None:
        print(f"Stripping from boot marker at line {boot_marker+1}")
        script = "\n".join(lines[:boot_marker]) + "\n/* boot code stripped — see oracle-ui.js */\n"
    else:
        print("WARNING: could not find boot code to strip — leaving as-is")

DST.write_text(script, encoding="utf-8")
print(f"Wrote {DST} ({len(script):,} bytes, {script.count(chr(10))+1} lines)")

# quick sanity check: should still define planFor, eGates, etc.
for name in ("planFor", "eGates", "syllCounts", "activeModule", "USER", "GATES", "SYL", "START", "TOTAL"):
    if f"function {name}" in script or f"const {name}" in script or f"let {name}" in script or f"var {name}" in script:
        print(f"  ✓ {name} defined")
    else:
        # USER might be assigned inside a function
        if name == "USER" and "USER =" in script:
            print(f"  ✓ {name} assigned (inside function)")
        elif name == "GATES" and "GATES =" in script:
            print(f"  ✓ {name} assigned (inside function)")
        else:
            print(f"  ✗ {name} NOT FOUND")
