#!/usr/bin/env node --experimental-strip-types
// Silently configure Modelverse provider — equivalent to:
//   openclaw models auth login --provider modelverse --method api-key
//
// Usage:
//   MODELVERSE_API_KEY=your-key node --experimental-strip-types setup-auth.ts
//   node --experimental-strip-types setup-auth.ts your-key

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { MODELVERSE_BASE_URL, MODELVERSE_MODEL_CATALOG, buildModelverseModelDefinition } from "./models.ts";

const apiKey: string = process.env["MODELVERSE_API_KEY"] ?? process.argv[2] ?? "";
if (!apiKey) {
  console.error("Usage: MODELVERSE_API_KEY=<key> node --experimental-strip-types setup-auth.ts");
  process.exit(1);
}

const stateDir = process.env["OPENCLAW_STATE_DIR"] ?? path.join(os.homedir(), ".openclaw");
const agentDir = process.env["OPENCLAW_AGENT_DIR"] ?? path.join(stateDir, "agents", "main", "agent");
const configFile = path.join(stateDir, "openclaw.json");
const authFile = path.join(agentDir, "auth-profiles.json");
const profileId = "modelverse:default";

// ── helpers ────────────────────────────────────────────────────────────────
function readJson(filePath: string): Record<string, unknown> {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function writeJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ── 1. auth-profiles.json ──────────────────────────────────────────────────
const authStore = readJson(authFile) as {
  version?: number;
  profiles?: Record<string, { type: string; provider: string; key?: string }>;
};

const profiles = authStore.profiles ?? {};
authStore.version = authStore.version ?? 1;
authStore.profiles = {
  ...profiles,
  [profileId]: { type: "api_key", provider: "modelverse", key: apiKey },
};
writeJson(authFile, authStore);
console.log("auth-profiles.json: written");

// ── 2. openclaw.json ───────────────────────────────────────────────────────
const cfg = readJson(configFile) as Record<string, unknown> & {
  auth?: { profiles?: Record<string, unknown> };
  models?: { mode?: string; providers?: Record<string, unknown> };
};

cfg.auth ??= {};
(cfg.auth as Record<string, unknown>).profiles ??= {};
((cfg.auth as Record<string, unknown>).profiles as Record<string, unknown>)[profileId] = {
  provider: "modelverse",
  mode: "api_key",
};

cfg.models ??= {};
(cfg.models as Record<string, unknown>).mode ??= "merge";
(cfg.models as Record<string, unknown>).providers ??= {};
const providers = (cfg.models as Record<string, unknown>).providers as Record<string, unknown>;

providers["modelverse"] = {
  ...(providers["modelverse"] as object | undefined),
  baseUrl: MODELVERSE_BASE_URL,
  api: "openai-completions",
  apiKey,
  models: MODELVERSE_MODEL_CATALOG.map(buildModelverseModelDefinition),
};

writeJson(configFile, cfg);
console.log("openclaw.json: written");
console.log("Done. Modelverse provider configured.");
