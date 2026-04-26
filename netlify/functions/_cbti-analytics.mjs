import { getStore } from "@netlify/blobs";

export const STORE_NAME = "cbti-analytics-v1";
export const SUMMARY_KEY = "summary/summary-v1.json";
const SUMMARY_SCHEMA_VERSION = 1;
const MAX_SUMMARY_UPDATE_RETRIES = 8;

export const PERSONA_META = {
  BIMC: { alias: "PvPer", name: "抽象派引战大祭司" },
  BIMO: { alias: "LMAO", name: "抽象解构乐子人" },
  BITC: { alias: "1vs9", name: "赛博纪检委 / 键盘斗士" },
  BITO: { alias: "HP=0", name: "随时破防的悲情战士" },
  BKMC: { alias: "socialSOS", name: "披着搞笑外衣的社恐" },
  BKMO: { alias: "Happy Puppy", name: "无差别贴贴的快乐小狗" },
  BKTC: { alias: "TL;DR", name: "强迫症信息分发节点" },
  BKTO: { alias: "9999+", name: "情绪黑洞发电机" },
  LIMC: { alias: "Dark Mode", name: "阴暗爬行的地狱笑话机" },
  LIMO: { alias: "Watermelon Hunter", name: "赛博前排吃瓜刺客" },
  LITC: { alias: "1TB.zip", name: "赛博朋克捡破烂大师" },
  LITO: { alias: "IQ=250", name: "薛定谔的理中客" },
  LKMC: { alias: "E-eye", name: "群聊角落的电子监控探头" },
  LKMO: { alias: "+1 Bot", name: "赛博佛系点赞机器" },
  LKTC: { alias: "Ping=460ms", name: "薛定谔的已读不回者" },
  LKTO: { alias: "EMOer", name: "深夜网易云潜水员" }
};

export const PERSONA_CODES = Object.keys(PERSONA_META).sort((left, right) =>
  left.localeCompare(right, "en")
);

export function createAnalyticsStore() {
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

export function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), {
    ...init,
    headers
  });
}

export function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

export function getAdminToken() {
  return process.env.CBTI_ANALYTICS_TOKEN || "";
}

export function isAuthorizedRequest(request) {
  const expected = getAdminToken();
  if (!expected) {
    return false;
  }

  const authHeader = request.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return false;
  }

  return match[1] === expected;
}

function createEmptyCounts() {
  return Object.fromEntries(PERSONA_CODES.map((code) => [code, 0]));
}

function normalizeNonNegativeInteger(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.floor(number);
}

function normalizeIsoTimestamp(value) {
  if (typeof value !== "string" || !value) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : null;
}

export function createEmptySummary() {
  return {
    schemaVersion: SUMMARY_SCHEMA_VERSION,
    totalVisits: 0,
    totalStarts: 0,
    totalResults: 0,
    lastUpdatedAt: null,
    counts: createEmptyCounts()
  };
}

export function normalizeSummary(summary) {
  const next = createEmptySummary();
  if (!summary || typeof summary !== "object") return next;

  next.totalVisits = normalizeNonNegativeInteger(summary.totalVisits);
  next.totalStarts = normalizeNonNegativeInteger(summary.totalStarts);
  next.totalResults = normalizeNonNegativeInteger(summary.totalResults);
  next.lastUpdatedAt = normalizeIsoTimestamp(summary.lastUpdatedAt);

  if (summary.counts && typeof summary.counts === "object") {
    for (const code of PERSONA_CODES) {
      next.counts[code] = normalizeNonNegativeInteger(summary.counts[code]);
    }
  }

  return next;
}

export function cloneSummary(summary) {
  const normalized = normalizeSummary(summary);
  return {
    ...normalized,
    counts: { ...normalized.counts }
  };
}

function getLatestIsoTimestamp(currentIso, candidateIso) {
  const current = normalizeIsoTimestamp(currentIso);
  const candidate = normalizeIsoTimestamp(candidateIso);
  if (!current) return candidate;
  if (!candidate) return current;
  return Date.parse(candidate) > Date.parse(current) ? candidate : current;
}

export function addVisitToSummary(summary, recordedAt) {
  const next = cloneSummary(summary);
  next.totalVisits += 1;
  next.lastUpdatedAt = getLatestIsoTimestamp(next.lastUpdatedAt, recordedAt);
  return next;
}

export function addStartToSummary(summary, recordedAt) {
  const next = cloneSummary(summary);
  next.totalStarts += 1;
  next.lastUpdatedAt = getLatestIsoTimestamp(next.lastUpdatedAt, recordedAt);
  return next;
}

export function addResultToSummary(summary, personaCode, recordedAt) {
  if (!PERSONA_CODES.includes(personaCode)) {
    throw new Error(`Unknown personaCode: ${personaCode}`);
  }

  const next = cloneSummary(summary);
  next.totalResults += 1;
  next.counts[personaCode] += 1;
  next.lastUpdatedAt = getLatestIsoTimestamp(next.lastUpdatedAt, recordedAt);
  return next;
}

function extractTimestamp(key) {
  const match = key.match(/\/(\d{13})-/);
  return match ? Number(match[1]) : 0;
}

function extractPersonaCode(key) {
  const match = key.match(/^results\/([^/]+)\//);
  return match ? decodeURIComponent(match[1]) : null;
}

function withTimestamp(summary, timestamp) {
  if (!timestamp) return;
  summary.lastUpdatedAt = getLatestIsoTimestamp(
    summary.lastUpdatedAt,
    new Date(timestamp).toISOString()
  );
}

async function listAllKeys(store, prefix) {
  const keys = [];
  for await (const page of store.list({ prefix, paginate: true })) {
    for (const blob of page.blobs) {
      keys.push(blob.key);
    }
  }
  return keys;
}

export function buildPublicSummary(summary) {
  const normalized = normalizeSummary(summary);
  const ranking = PERSONA_CODES.map((code) => {
    const count = normalized.counts[code];
    return {
      code,
      alias: PERSONA_META[code].alias,
      name: PERSONA_META[code].name,
      count,
      share: normalized.totalResults ? Number(((count / normalized.totalResults) * 100).toFixed(1)) : 0
    };
  }).sort((left, right) => {
    if (right.count !== left.count) return right.count - left.count;
    return left.code.localeCompare(right.code, "en");
  });

  return {
    totalVisits: normalized.totalVisits,
    totalStarts: normalized.totalStarts,
    totalResults: normalized.totalResults,
    uniquePersonasHit: ranking.filter((item) => item.count > 0).length,
    lastUpdatedAt: normalized.lastUpdatedAt,
    ranking
  };
}

export async function loadSummarySnapshot(store) {
  const entry = await store.getWithMetadata(SUMMARY_KEY, {
    type: "json",
    consistency: "strong"
  });

  if (entry === null) return null;

  return {
    summary: normalizeSummary(entry.data),
    etag: entry.etag
  };
}

export async function rebuildSummaryFromEvents(store) {
  const summary = createEmptySummary();

  const visitKeys = await listAllKeys(store, "visits/");
  for (const key of visitKeys) {
    summary.totalVisits += 1;
    withTimestamp(summary, extractTimestamp(key));
  }

  const startKeys = await listAllKeys(store, "starts/");
  for (const key of startKeys) {
    summary.totalStarts += 1;
    withTimestamp(summary, extractTimestamp(key));
  }

  const resultKeys = await listAllKeys(store, "results/");
  for (const key of resultKeys) {
    summary.totalResults += 1;

    const code = extractPersonaCode(key);
    if (code && code in summary.counts) {
      summary.counts[code] += 1;
    }

    withTimestamp(summary, extractTimestamp(key));
  }

  return summary;
}

export async function ensureSummarySnapshot(store) {
  const existing = await loadSummarySnapshot(store);
  if (existing) return existing;

  const rebuilt = await rebuildSummaryFromEvents(store);
  const created = await store.setJSON(SUMMARY_KEY, rebuilt, { onlyIfNew: true });
  if (created.modified) {
    return {
      summary: rebuilt,
      etag: created.etag
    };
  }

  const afterRace = await loadSummarySnapshot(store);
  if (afterRace) return afterRace;

  throw new Error("Failed to initialize analytics summary snapshot");
}

export async function updateSummarySnapshot(store, mutator) {
  let current = await ensureSummarySnapshot(store);

  for (let attempt = 0; attempt < MAX_SUMMARY_UPDATE_RETRIES; attempt += 1) {
    const next = normalizeSummary(mutator(cloneSummary(current.summary)));
    const updated = await store.setJSON(SUMMARY_KEY, next, {
      onlyIfMatch: current.etag
    });

    if (updated.modified) {
      return next;
    }

    const fresh = await loadSummarySnapshot(store);
    if (!fresh) {
      current = await ensureSummarySnapshot(store);
      continue;
    }

    current = fresh;
  }

  throw new Error("Failed to update analytics summary after concurrent retries");
}
