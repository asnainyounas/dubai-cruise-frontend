/**
 * src/lib/booking.ts
 *
 * Pure helper functions for the booking system:
 * - Dubai timezone date/time conversions
 * - Departure groupings
 * - Price estimation
 * - WhatsApp message formatting
 * - Phone number validation (matches backend regex & minimum digits rule)
 *
 * All functions are pure with NO network or database I/O.
 */

import type { BackendDeparture } from "@/lib/backend-types";

// ---------------------------------------------------------------------------
// Timezone Formats (Asia/Dubai, UTC+4)
// ---------------------------------------------------------------------------

const dubaiDateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Dubai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const dubaiTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Dubai",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const dubaiDatePartsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Dubai",
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

/**
 * Returns "YYYY-MM-DD" in the Asia/Dubai timezone.
 *
 * @param iso - ISO 8601 date string, e.g. "2026-11-28T17:00:00.000Z"
 * @returns "YYYY-MM-DD" in Asia/Dubai
 */
export function toDubaiDateKey(iso: string): string {
  const date = new Date(iso);
  return dubaiDateKeyFormatter.format(date);
}

/**
 * Formats an ISO string to a 12-hour time in Asia/Dubai, e.g. "7:00 PM".
 *
 * @param iso - ISO 8601 date string
 * @returns Time string, e.g. "7:00 PM"
 */
export function formatDubaiTime(iso: string): string {
  const date = new Date(iso);
  return dubaiTimeFormatter.format(date);
}

/**
 * Formats an ISO string to a human-readable date in Asia/Dubai, e.g. "Sat 28 Nov 2026".
 *
 * @param iso - ISO 8601 date string
 * @returns Date string, e.g. "Sat 28 Nov 2026"
 */
export function formatDubaiDate(iso: string): string {
  const date = new Date(iso);
  const parts = dubaiDatePartsFormatter.formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  return `${weekday} ${day} ${month} ${year}`;
}

// ---------------------------------------------------------------------------
// Departure Grouping
// ---------------------------------------------------------------------------

export interface FormattedSailing {
  id: string;
  startsAt: string;
  timeLabel: string;
  adultPrice: number;
  childPrice: number;
  currency: string;
}

export interface GroupedDepartures {
  dateKey: string;
  label: string;
  sailings: FormattedSailing[];
}

/**
 * Groups departures by their Dubai calendar date, sorted chronologically.
 *
 * @param departures - List of BackendDeparture objects
 * @returns Array of grouped dates with their sorted sailings
 */
export function groupDeparturesByDate(
  departures: BackendDeparture[],
): GroupedDepartures[] {
  const map = new Map<string, GroupedDepartures>();

  for (const dep of departures) {
    const dateKey = toDubaiDateKey(dep.startsAt);
    let group = map.get(dateKey);
    if (!group) {
      group = {
        dateKey,
        label: formatDubaiDate(dep.startsAt),
        sailings: [],
      };
      map.set(dateKey, group);
    }

    group.sailings.push({
      id: dep.id,
      startsAt: dep.startsAt,
      timeLabel: formatDubaiTime(dep.startsAt),
      adultPrice: dep.adultPrice,
      childPrice: dep.childPrice,
      currency: dep.currency || "AED",
    });
  }

  // Sort groups ascending by dateKey
  const sortedGroups = Array.from(map.values()).sort((a, b) =>
    a.dateKey.localeCompare(b.dateKey),
  );

  // Sort sailings within each group ascending by startsAt
  for (const group of sortedGroups) {
    group.sailings.sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
  }

  return sortedGroups;
}

// ---------------------------------------------------------------------------
// Pricing & Estimation
// ---------------------------------------------------------------------------

/**
 * Calculates estimated total for given guests and sailing prices.
 */
export function estimateTotal(
  adults: number,
  children: number,
  adultPrice: number,
  childPrice: number,
): number {
  const validAdults = Math.max(0, Number.isFinite(adults) ? adults : 0);
  const validChildren = Math.max(0, Number.isFinite(children) ? children : 0);
  return validAdults * (adultPrice || 0) + validChildren * (childPrice || 0);
}

// ---------------------------------------------------------------------------
// WhatsApp Message Builder
// ---------------------------------------------------------------------------

export interface WhatsAppBookingParams {
  reference?: string;
  cruiseTitle: string;
  dateLabel: string;
  timeLabel: string;
  adults: number;
  children: number;
  name: string;
  notes?: string;
  total?: number;
  currency?: string;
}

/**
 * Constructs the WhatsApp pre-filled booking message text.
 */
export function buildWhatsAppBookingMessage(
  params: WhatsAppBookingParams,
): string {
  const {
    reference,
    cruiseTitle,
    dateLabel,
    timeLabel,
    adults,
    children,
    name,
    notes,
    total,
    currency = "AED",
  } = params;

  const lines: string[] = [];

  if (reference) {
    lines.push(`Hello, my booking reference is ${reference}.`);
  } else {
    lines.push("Hello, I would like to book:");
  }

  lines.push(`Tour: ${cruiseTitle}`);
  lines.push(`Date: ${dateLabel}`);
  lines.push(`Sailing: ${timeLabel}`);
  lines.push(`Adults: ${adults}`);
  lines.push(`Children: ${children}`);
  lines.push(`Name: ${name.trim()}`);

  if (total !== undefined && total > 0) {
    lines.push(`Total: ${total} ${currency}`);
  }

  if (notes && notes.trim()) {
    lines.push(`Notes: ${notes.trim()}`);
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Phone Validation
// ---------------------------------------------------------------------------

const PHONE_REGEX = /^\+?[0-9\s\-()]{7,20}$/;

/**
 * Validates a phone number matching the backend rule:
 * - 7 to 20 characters
 * - Only digits, spaces, plus, hyphens, and parentheses
 * - At least 7 numeric digits
 */
export function isValidPhone(value: string): boolean {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!PHONE_REGEX.test(trimmed)) return false;
  const digitsOnly = trimmed.replace(/\D/g, "");
  return digitsOnly.length >= 7;
}
