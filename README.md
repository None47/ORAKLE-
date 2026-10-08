# ORACLE — integrated original application

This project retains the original ORACLE HTML application as its behavioral source. The build injects the single canonical `window.oracleStatePacket()` projection into the original script scope so it reads the original lexical state directly. `oracle-intel.js` consumes that projection for snapshots and API synchronization; it does not reconstruct state. The editorial experience is the opening surface, with the original operating interface available from its top bar and footer.

## Build and run locally

From this directory:

```sh
npm install
npm run build:html
npm test
npm run serve
```

The local shim sets explicit development-only in-memory storage, local unauthenticated access, and a visibly marked mock AI provider. The production API modules are Vercel serverless functions; the local shim is only for browser verification.

## Production environment

Set these in the Vercel project environment:

- `DATABASE_URL` — required PostgreSQL connection string.
- `ORACLE_TOKEN` — required bearer token. Enter it in the browser's Decision Brief panel; it is stored in that browser's local storage under a reserved key and is never mirrored.
- `ORACLE_AI_KEY`, `ORACLE_AI_MODEL`, and optionally `ORACLE_AI_BASE` — required for live AI recommendations.
- `ORACLE_ALLOWED_ORIGIN` — optional exact origin for cross-origin access. Same-origin requests do not need CORS.

Production fails closed: missing database configuration returns HTTP 503 with `DATABASE_UNAVAILABLE`; write failures return HTTP 503 with `DATABASE_WRITE_FAILURE`. Memory storage is enabled only by explicit local/test mode and is rejected in production.

## Canonical state and recommendation flow

`scripts/build-html.js` starts with the preserved original HTML and inserts the sole `window.oracleStatePacket()` projection inside its original script scope. It calls the existing campaign state and functions; it does not recreate the campaign engine. `oracle-intel.js` is consume-only. Completion is a stored boolean when the original state contains one; absent or malformed completion stays `null`. Available time is `null` because the original application does not record it.

The browser locks a packet hash/version before snapshotting it. The AI receives the fresh packet in the request, never a persisted packet substituted by the backend. The strict schema boundary preserves raw provider response text before parsing. The deterministic validator checks task ID and exact task title, completion, mission, prerequisites, time, deadlines, BUILD lock, duplicate actions, evidence, and market references. Current plan checkboxes with no stored key map to `false` because the original UI renders them unchecked; malformed stored values and unrecorded future-task completion remain `null`. User-submitted evidence is an unverified claim until separately verified. No live external provider is connected, so the API returns no fabricated signals.

## Vercel routes

The production routes are `/api/health`, `/api/state`, `/api/state-sync`, `/api/packet`, `/api/packet-lock`, `/api/ask`, `/api/decision`, `/api/evidence`, `/api/audit`, `/api/audit-applied`, `/api/export`, `/api/import`, and `/api/external`. API handlers are serverless modules; the local shim is excluded from the production import graph.

## Verification status

Run `npm test` for the repository test suites. Browser verification requires opening the local server at `http://127.0.0.1:3000`. Vercel deployment is not verified until the project is deployed with production credentials and a reachable PostgreSQL database.
