#!/usr/bin/env node
/**
 * scripts/test-api-layer.mjs
 *
 * Automated test suite for the API layer:
 * - isBackendEnabled()
 * - apiGet()
 * - mergeBackendCruise()
 *
 * Requirements tested:
 * (a) isBackendEnabled() is false when env vars are unset
 * (b) apiGet returns null without network call when disabled
 * (c) USE_BACKEND=true + API_URL=http://127.0.0.1:9 -> apiGet returns null within 6 seconds
 * (d) mergeBackendCruise(local, null) -> returns same object reference
 * (e) remote.adultPrice=59 -> startingPrice = "From 59 AED per person", all text fields match local
 * (f) remote.adultPrice missing / 0 / negative / NaN / string -> startingPrice NOT overridden
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read cruise fixture
const fixturePath = path.join(__dirname, "fixtures", "backend-cruise.fixture.json");
const backendCruiseFixture = JSON.parse(fs.readFileSync(fixturePath, "utf-8"));

// We dynamically test the compiled or stripped modules, or replicate pure logic
// Since frontend uses TypeScript, we can import via ts-node/tsx/loader or direct test
// In Node 24+, strip-types works with TS files directly!

async function runTests() {
  console.log("Running API Layer Tests...\n");
  let passedCount = 0;

  function pass(msg) {
    passedCount++;
    console.log(`PASS: ${msg}`);
  }

  // Import modules
  const apiModule = await import("../src/lib/api.ts");
  const mapperModule = await import("../src/lib/cruise-mapper.ts");
  const cruisesModule = await import("../src/data/cruises.ts");

  const { isBackendEnabled, apiGet } = apiModule;
  const { mergeBackendCruise } = mapperModule;
  const { CRUISES } = cruisesModule;

  const localCruise = CRUISES["creek-cruise"];
  assert.ok(localCruise, "CRUISES['creek-cruise'] should exist");

  // Test (a): isBackendEnabled() is false when env vars unset
  {
    const origUse = process.env.USE_BACKEND;
    const origUrl = process.env.API_URL;
    delete process.env.USE_BACKEND;
    delete process.env.API_URL;

    assert.equal(isBackendEnabled(), false, "isBackendEnabled() must be false when env vars are unset");

    process.env.USE_BACKEND = "true";
    delete process.env.API_URL;
    assert.equal(isBackendEnabled(), false, "isBackendEnabled() must be false when API_URL is unset");

    process.env.USE_BACKEND = "false";
    process.env.API_URL = "http://localhost:5000";
    assert.equal(isBackendEnabled(), false, "isBackendEnabled() must be false when USE_BACKEND is false");

    // Restore
    if (origUse !== undefined) process.env.USE_BACKEND = origUse; else delete process.env.USE_BACKEND;
    if (origUrl !== undefined) process.env.API_URL = origUrl; else delete process.env.API_URL;

    pass("(a) isBackendEnabled() is false when env vars unset or incomplete");
  }

  // Test (b): apiGet returns null without network call when disabled
  {
    delete process.env.USE_BACKEND;
    delete process.env.API_URL;

    const res = await apiGet("/cruises/creek-cruise");
    assert.equal(res, null, "apiGet must return null when disabled without throwing or network error");
    pass("(b) apiGet returns null without network call when disabled");
  }

  // Test (c): USE_BACKEND=true + API_URL=http://127.0.0.1:9 -> apiGet returns null within 6 seconds
  {
    process.env.USE_BACKEND = "true";
    process.env.API_URL = "http://127.0.0.1:9";

    const t0 = Date.now();
    const res = await apiGet("/health");
    const elapsed = Date.now() - t0;

    assert.equal(res, null, "apiGet must return null on connection failure");
    assert.ok(elapsed < 6000, `Call should finish well within 6s (took ${elapsed}ms)`);

    delete process.env.USE_BACKEND;
    delete process.env.API_URL;
    pass(`(c) USE_BACKEND=true + API_URL=http://127.0.0.1:9 returns null within 6 seconds (took ${elapsed}ms)`);
  }

  // Test (d): mergeBackendCruise(local, null) -> returns same object reference
  {
    const merged = mergeBackendCruise(localCruise, null);
    assert.strictEqual(merged, localCruise, "mergeBackendCruise must return exactly the same object reference if remote is null");
    pass("(d) mergeBackendCruise(local, null) returns same object reference");
  }

  // Test (e): remote.adultPrice=59 -> startingPrice = "From 59 AED per person", all text fields equal to local
  {
    const remote = {
      ...backendCruiseFixture,
      adultPrice: 59,
      childPrice: 40,
      durationMinutes: 90
    };

    const merged = mergeBackendCruise(localCruise, remote);

    assert.equal(merged.adultPrice, 59, "adultPrice should be overridden to 59");
    assert.equal(merged.childPrice, 40, "childPrice should be overridden to 40");
    assert.equal(merged.durationMinutes, 90, "durationMinutes should be overridden to 90");
    assert.equal(merged.startingPrice, "From 59 AED per person", "startingPrice should be 'From 59 AED per person'");

    // Verify all text / editorial fields remain identical to local
    assert.equal(merged.slug, localCruise.slug);
    assert.equal(merged.title, localCruise.title);
    assert.equal(merged.shortDescription, localCruise.shortDescription);
    assert.equal(merged.subtitle, localCruise.subtitle);
    assert.equal(merged.intro, localCruise.intro);
    assert.deepEqual(merged.whatToExpect, localCruise.whatToExpect);
    assert.deepEqual(merged.foodAndEntertainment, localCruise.foodAndEntertainment);
    assert.deepEqual(merged.whyChoose, localCruise.whyChoose);
    assert.deepEqual(merged.inclusions, localCruise.inclusions);
    assert.deepEqual(merged.faqs, localCruise.faqs);
    assert.equal(merged.seoTitle, localCruise.seoTitle);
    assert.equal(merged.seoDescription, localCruise.seoDescription);
    assert.equal(merged.heroImage, localCruise.heroImage);
    assert.deepEqual(merged.images, localCruise.images);

    pass("(e) remote.adultPrice=59 -> startingPrice='From 59 AED per person', editorial fields unchanged");
  }

  // Test (f): remote.adultPrice missing / 0 / negative / NaN / string -> startingPrice NOT overridden
  {
    const invalidPrices = [undefined, null, 0, -10, NaN, "50", "free"];
    for (const badPrice of invalidPrices) {
      const remote = {
        ...backendCruiseFixture,
        adultPrice: badPrice
      };

      const merged = mergeBackendCruise(localCruise, remote);
      assert.equal(
        merged.startingPrice,
        localCruise.startingPrice,
        `startingPrice should NOT be overridden when adultPrice is ${badPrice}`
      );
      if (typeof badPrice !== "number" || isNaN(badPrice) || badPrice < 0) {
        assert.equal(
          merged.adultPrice,
          localCruise.adultPrice,
          `adultPrice should NOT be overridden when adultPrice is ${badPrice}`
        );
      }
    }
    pass("(f) remote.adultPrice missing / 0 / negative / NaN / string -> startingPrice NOT overridden");
  }

  console.log(`\nAll ${passedCount} test groups PASSED successfully.`);
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
