#!/usr/bin/env node
/**
 * scripts/check-backend.mjs
 *
 * Manual smoke-test script: checks every public GET endpoint of the Express
 * backend and prints a PASS/FAIL summary.
 *
 * Run after the backend is started and seeded:
 *   API_URL=http://localhost:5000 node scripts/check-backend.mjs
 *
 * Or on Windows (PowerShell):
 *   $env:API_URL="http://localhost:5000"; node scripts/check-backend.mjs
 *
 * This script makes GET requests ONLY. It never sends credentials or prints
 * secret values. It does NOT start the backend.
 */

// Keep these in sync with src/data/business.ts PRICE values
const EXPECTED = {
  creek: 35,       // PRICE.creek
  marinaEarly: 59, // PRICE.marinaEarly (sunset)
  marinaLate: 69,  // PRICE.marinaLate (dinner)
};

const KNOWN_SLUGS = ["creek-cruise", "dubai-marina-cruise"];

const BASE_URL = (process.env.API_URL ?? "http://localhost:5000").replace(/\/+$/, "");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let passed = 0;
let failed = 0;

function pass(label) {
  passed++;
  console.log(`  ✅  PASS  ${label}`);
}

function fail(label, reason) {
  failed++;
  console.log(`  ❌  FAIL  ${label}`);
  if (reason) console.log(`         ↳ ${reason}`);
}

/**
 * Fetches a URL and returns { status, ms, body, keys, count }.
 * Never throws — returns an error object on failure.
 */
async function get(path) {
  const url = `${BASE_URL}${path}`;
  const t0 = Date.now();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const ms = Date.now() - t0;
    let body = null;
    try { body = await res.json(); } catch { /* ignore */ }
    const keys = body && typeof body === "object" ? Object.keys(body) : [];
    const count =
      body && body.data && Array.isArray(body.data) ? body.data.length : null;
    return { url, status: res.status, ms, body, keys, count, error: null };
  } catch (err) {
    return { url, status: null, ms: Date.now() - t0, body: null, keys: [], count: null, error: err.message };
  }
}

function printRow(r) {
  const status = r.status ?? "ERR";
  const ms = `${r.ms}ms`;
  const count = r.count !== null ? ` (${r.count} items)` : "";
  const topKeys = r.keys.length ? ` keys=[${r.keys.join(",")}]` : "";
  console.log(`  ${status}  ${ms}${count}${topKeys}  ${r.url}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`\nBackend smoke-test → ${BASE_URL}\n`);

// 1. Health
console.log("── /api/health ──────────────────────────────────────");
{
  const r = await get("/api/health");
  printRow(r);
  if (r.status === 200 && r.body?.status === "ok") pass("health endpoint returns 200 and status=ok");
  else fail("health endpoint returns 200 and status=ok", r.error ?? `HTTP ${r.status}`);
}

// 2. Cruise list
console.log("\n── GET /api/cruises ─────────────────────────────────");
{
  const r = await get("/api/cruises");
  printRow(r);
  if (r.status === 200 && r.body?.success && Array.isArray(r.body.data)) {
    pass(`GET /api/cruises returns 200 with ${r.body.data.length} cruise(s)`);
  } else {
    fail("GET /api/cruises returns 200 with data array", r.error ?? `HTTP ${r.status}`);
  }
}

// 3. Cruise detail for each known slug + expected price check
for (const slug of KNOWN_SLUGS) {
  console.log(`\n── GET /api/cruises/${slug} ${"─".repeat(Math.max(0, 40 - slug.length))}`);
  const r = await get(`/api/cruises/${slug}`);
  printRow(r);

  if (r.status === 200 && r.body?.success && r.body.data) {
    pass(`GET /api/cruises/${slug} returns 200`);
    const cruise = r.body.data;

    // adultPrice must be a positive number
    if (typeof cruise.adultPrice === "number" && cruise.adultPrice > 0) {
      pass(`${slug} has positive adultPrice (${cruise.adultPrice})`);
    } else {
      fail(`${slug} has positive adultPrice`, `got ${JSON.stringify(cruise.adultPrice)}`);
    }

    // Check against expected prices
    let expectedPrice = null;
    if (slug === "creek-cruise") expectedPrice = EXPECTED.creek;
    if (slug === "dubai-marina-cruise") {
      // Marina cruise may carry either the early or late price — check both
      const ap = cruise.adultPrice;
      if (ap === EXPECTED.marinaEarly || ap === EXPECTED.marinaLate) {
        pass(`${slug} adultPrice matches an expected Marina price (${ap})`);
      } else {
        fail(
          `${slug} adultPrice matches an expected Marina price`,
          `got ${ap}, expected ${EXPECTED.marinaEarly} or ${EXPECTED.marinaLate}`,
        );
      }
      expectedPrice = null; // already checked above
    }
    if (expectedPrice !== null) {
      if (cruise.adultPrice === expectedPrice) {
        pass(`${slug} adultPrice === ${expectedPrice}`);
      } else {
        fail(`${slug} adultPrice === ${expectedPrice}`, `got ${cruise.adultPrice}`);
      }
    }
  } else {
    fail(`GET /api/cruises/${slug} returns 200`, r.error ?? `HTTP ${r.status}`);
  }
}

// 4. Departures for each known slug
for (const slug of KNOWN_SLUGS) {
  console.log(`\n── GET /api/cruises/${slug}/departures ─────────────`);
  const r = await get(`/api/cruises/${slug}/departures`);
  printRow(r);

  if (r.status === 200 && r.body?.success && Array.isArray(r.body.data)) {
    pass(`GET /api/cruises/${slug}/departures returns 200`);
    const deps = r.body.data;
    if (deps.length > 0) {
      pass(`${slug} has ${deps.length} upcoming departure(s)`);
    } else {
      fail(`${slug} has upcoming departures`, "array is empty — seed the database");
    }
  } else {
    fail(`GET /api/cruises/${slug}/departures returns 200`, r.error ?? `HTTP ${r.status}`);
  }
}

// 5. Summary
console.log("\n" + "─".repeat(55));
console.log(`Total: ${passed + failed} checks — ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("Some checks failed. See above for details.");
  process.exit(1);
} else {
  console.log("All checks passed.");
}
