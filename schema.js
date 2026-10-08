/* PostgreSQL schema for state snapshots, immutable decisions, evidence, and audit events. */
'use strict';
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS docs (
  collection TEXT NOT NULL,
  id TEXT NOT NULL,
  json JSONB NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (collection,id)
);
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  op TEXT,
  key TEXT,
  old_value TEXT
);
CREATE TABLE IF NOT EXISTS oracle_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  packet JSONB NOT NULL,
  version TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS oracle_canon (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  version TEXT NOT NULL,
  protected_paths JSONB NOT NULL,
  packet_hash TEXT NOT NULL,
  locked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS packet_versions (
  version TEXT PRIMARY KEY,
  packet JSONB NOT NULL,
  packet_hash TEXT NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  question TEXT NOT NULL,
  packet_version TEXT NOT NULL,
  canonical_packet JSONB NOT NULL,
  raw_provider_response TEXT,
  parsed_response JSONB,
  schema_validation JSONB NOT NULL,
  deterministic_validation JSONB NOT NULL,
  modifications JSONB NOT NULL,
  final_recommendation JSONB,
  final_verdict TEXT NOT NULL,
  record JSONB NOT NULL
);
CREATE TABLE IF NOT EXISTS evidence (
  id TEXT PRIMARY KEY,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  claim JSONB NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS external_intel (
  id TEXT PRIMARY KEY,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  signal JSONB NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  decision_id TEXT,
  event TEXT NOT NULL,
  detail JSONB NOT NULL
);
CREATE INDEX IF NOT EXISTS docs_collection_ts_idx ON docs(collection,ts DESC);
CREATE INDEX IF NOT EXISTS events_ts_idx ON events(ts DESC);
CREATE INDEX IF NOT EXISTS decisions_ts_idx ON decisions(ts DESC);
CREATE INDEX IF NOT EXISTS evidence_ts_idx ON evidence(ts DESC);
CREATE INDEX IF NOT EXISTS external_intel_ts_idx ON external_intel(ts DESC);
CREATE INDEX IF NOT EXISTS audit_events_ts_idx ON audit_events(ts DESC);
CREATE INDEX IF NOT EXISTS audit_events_decision_idx ON audit_events(decision_id);
`;
module.exports = { SCHEMA_SQL };

