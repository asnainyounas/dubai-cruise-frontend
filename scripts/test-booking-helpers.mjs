#!/usr/bin/env node
/**
 * scripts/test-booking-helpers.mjs
 *
 * Automated tests for frontend booking helper functions in src/lib/booking.ts.
 * Runner: npx tsx
 */

import assert from "node:assert/strict";
import {
  toDubaiDateKey,
  formatDubaiTime,
  formatDubaiDate,
  groupDeparturesByDate,
  estimateTotal,
  buildWhatsAppBookingMessage,
  isValidPhone,
} from "../src/lib/booking.ts";

let passed = 0;
let failed = 0;

function pass(msg) {
  passed++;
  console.log(`✅  PASS  ${msg}`);
}

function fail(msg, reason) {
  failed++;
  console.log(`❌  FAIL  ${msg}`);
  if (reason) console.log(`         ↳ ${reason}`);
}

console.log("\nRunning Frontend Booking Helpers Tests...\n");

// 1. toDubaiDateKey
try {
  const d1 = toDubaiDateKey("2026-11-28T17:00:00.000Z");
  assert.equal(d1, "2026-11-28", "2026-11-28T17:00:00.000Z should give 2026-11-28 in Dubai (21:00)");

  const d2 = toDubaiDateKey("2026-11-28T21:00:00.000Z");
  assert.equal(d2, "2026-11-29", "2026-11-28T21:00:00.000Z should give 2026-11-29 in Dubai (01:00 next day)");
  pass('toDubaiDateKey for 17:00Z gives "2026-11-28" and for 21:00Z gives "2026-11-29"');
} catch (err) {
  fail("toDubaiDateKey", err.message);
}

// 2. formatDubaiTime and formatDubaiDate
try {
  const time = formatDubaiTime("2026-11-28T15:00:00.000Z");
  assert.equal(time, "7:00 PM", "15:00 UTC (+4 Dubai) should format as 7:00 PM");

  const dateLabel = formatDubaiDate("2026-11-28T15:00:00.000Z");
  assert.equal(dateLabel, "Sat 28 Nov 2026");

  pass('formatDubaiTime for 15:00Z gives "7:00 PM" and formatDubaiDate gives "Sat 28 Nov 2026"');
} catch (err) {
  fail("formatDubaiTime / formatDubaiDate", err.message);
}

// 3. groupDeparturesByDate
try {
  const fixture = [
    {
      id: "dep-1",
      startsAt: "2026-11-28T17:00:00.000Z", // 21:00 Dubai
      seatsRemaining: 50,
      adultPrice: 69,
      childPrice: 69,
      currency: "AED",
    },
    {
      id: "dep-2",
      startsAt: "2026-11-28T15:00:00.000Z", // 19:00 Dubai
      seatsRemaining: 50,
      adultPrice: 59,
      childPrice: 59,
      currency: "AED",
    },
    {
      id: "dep-3",
      startsAt: "2026-11-29T15:00:00.000Z", // 19:00 Dubai
      seatsRemaining: 40,
      adultPrice: 59,
      childPrice: 59,
      currency: "AED",
    },
    {
      id: "dep-4",
      startsAt: "2026-11-29T17:00:00.000Z", // 21:00 Dubai
      seatsRemaining: 40,
      adultPrice: 69,
      childPrice: 69,
      currency: "AED",
    },
  ];

  const grouped = groupDeparturesByDate(fixture);
  assert.equal(grouped.length, 2, "Should group into exactly 2 dates");
  assert.equal(grouped[0].dateKey, "2026-11-28");
  assert.equal(grouped[1].dateKey, "2026-11-29");

  // Sailings on 2026-11-28 must be sorted chronologically: 19:00 before 21:00
  assert.equal(grouped[0].sailings.length, 2);
  assert.equal(grouped[0].sailings[0].id, "dep-2", "19:00 sailing should come first");
  assert.equal(grouped[0].sailings[0].timeLabel, "7:00 PM");
  assert.equal(grouped[0].sailings[1].id, "dep-1", "21:00 sailing should come second");
  assert.equal(grouped[0].sailings[1].timeLabel, "9:00 PM");

  pass("groupDeparturesByDate on fixture with Marina 19:00 and 21:00 sailings on two dates sorted chronologically");
} catch (err) {
  fail("groupDeparturesByDate", err.message);
}

// 4. estimateTotal
try {
  const total = estimateTotal(2, 1, 59, 59);
  assert.equal(total, 177, "2 adults * 59 + 1 child * 59 must equal 177");
  pass("estimateTotal(2, 1, 59, 59) is 177");
} catch (err) {
  fail("estimateTotal", err.message);
}

// 5. buildWhatsAppBookingMessage with and without reference
try {
  const withRef = buildWhatsAppBookingMessage({
    reference: "DC-A1B2C3D4",
    cruiseTitle: "Dubai Marina Dinner Cruise",
    dateLabel: "Sat 28 Nov 2026",
    timeLabel: "7:00 PM",
    adults: 2,
    children: 1,
    name: "John Doe",
    total: 177,
    currency: "AED",
    notes: "Vegetarian meal",
  });
  assert.ok(withRef.startsWith("Hello, my booking reference is DC-A1B2C3D4."));
  assert.ok(withRef.includes("Tour: Dubai Marina Dinner Cruise"));
  assert.ok(withRef.includes("Total: 177 AED"));
  assert.ok(withRef.includes("Notes: Vegetarian meal"));

  const withoutRef = buildWhatsAppBookingMessage({
    cruiseTitle: "Dubai Marina Dinner Cruise",
    dateLabel: "Sat 28 Nov 2026",
    timeLabel: "7:00 PM",
    adults: 2,
    children: 1,
    name: "John Doe",
  });
  assert.ok(withoutRef.startsWith("Hello, I would like to book:"));
  assert.ok(withoutRef.includes("Tour: Dubai Marina Dinner Cruise"));
  assert.ok(!withoutRef.includes("booking reference"));

  pass("buildWhatsAppBookingMessage with and without a reference formats accurately");
} catch (err) {
  fail("buildWhatsAppBookingMessage", err.message);
}

// 6. isValidPhone
try {
  assert.equal(isValidPhone("+971 55 847 9933"), true, "+971 55 847 9933 should be valid");
  assert.equal(isValidPhone("abc"), false, "abc should be invalid");
  assert.equal(isValidPhone("12"), false, "12 should be invalid");
  assert.equal(isValidPhone("0501234567"), true, "0501234567 should be valid");
  pass('isValidPhone accepts "+971 55 847 9933" and rejects "abc" and "12"');
} catch (err) {
  fail("isValidPhone", err.message);
}

console.log("\n" + "─".repeat(55));
console.log(`Results: ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
