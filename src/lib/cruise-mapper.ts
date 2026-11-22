/**
 * src/lib/cruise-mapper.ts
 *
 * Merges a live backend cruise response into the local static CruiseData
 * object. The backend is the source of truth for prices and duration only.
 * All editorial content (text, images, FAQs, inclusions, SEO, slug, title)
 * always comes from the local data file and is NEVER overridden.
 *
 * Usage:
 *   const data = mergeBackendCruise(localCruise, await apiGet<BackendCruiseDetailResponse>(...));
 */

import type { CruiseData } from "@/data/cruises";
import type { BackendCruise } from "@/lib/backend-types";

/**
 * Merges backend pricing / duration into local cruise data.
 *
 * Fields that MAY be overridden when remote is non-null and the value passes
 * validation:
 *   - adultPrice   (finite number >= 0)
 *   - childPrice   (finite number >= 0)
 *   - durationMinutes (positive integer)
 *   - startingPrice (rebuilt as "From <adultPrice> <currency> per person"
 *                    when remote.adultPrice > 0 and is finite)
 *
 * Fields that are NEVER overridden:
 *   title, shortDescription, subtitle, intro, whatToExpect,
 *   foodAndEntertainment, whyChoose, slug, seoTitle, seoDescription,
 *   heroImage, images, galleryImages, inclusions, faqs, mapUrl,
 *   departurePoint, category, currency, draft, hasPage
 *
 * @param local  - Static CruiseData from src/data/cruises.ts.
 * @param remote - BackendCruise from GET /api/cruises/:slug, or null.
 * @returns      The local object unchanged when remote is null; a new
 *               merged object (spread) when remote is provided.
 */
export function mergeBackendCruise(
  local: CruiseData,
  remote: BackendCruise | null,
): CruiseData {
  // If remote is null (backend disabled / fetch failed / cruise not in DB),
  // return the same local object — no allocation, referential equality kept.
  if (remote === null) {
    return local;
  }

  // ---- Validate remote fields before accepting them ----------------------

  // adultPrice
  const remoteAdultPrice = remote.adultPrice;
  const adultPriceOk =
    typeof remoteAdultPrice === "number" &&
    Number.isFinite(remoteAdultPrice) &&
    remoteAdultPrice >= 0;

  // childPrice
  const remoteChildPrice = remote.childPrice;
  const childPriceOk =
    typeof remoteChildPrice === "number" &&
    Number.isFinite(remoteChildPrice) &&
    remoteChildPrice >= 0;

  // durationMinutes
  const remoteDuration = remote.durationMinutes;
  const durationOk =
    remoteDuration !== undefined &&
    typeof remoteDuration === "number" &&
    Number.isInteger(remoteDuration) &&
    remoteDuration > 0;

  // ---- Dev warning when local and remote prices diverge ------------------
  if (
    process.env.NODE_ENV === "development" &&
    adultPriceOk &&
    local.adultPrice !== undefined &&
    remoteAdultPrice !== local.adultPrice
  ) {
    console.warn(
      `[cruise-mapper] PRICE MISMATCH for "${local.slug}": ` +
        `local.adultPrice=${local.adultPrice}, remote.adultPrice=${remoteAdultPrice}. ` +
        `Using remote value. Update src/data/business.ts to silence this warning.`,
    );
  }

  // ---- Build the merged object -------------------------------------------
  const merged: CruiseData = { ...local };

  if (adultPriceOk) {
    merged.adultPrice = remoteAdultPrice;

    // Rebuild startingPrice only when adultPrice is positive-finite
    if (remoteAdultPrice > 0) {
      merged.startingPrice = `From ${remoteAdultPrice} ${local.currency} per person`;
    }
  }

  if (childPriceOk) {
    merged.childPrice = remoteChildPrice;
  }

  if (durationOk) {
    merged.durationMinutes = remoteDuration;
  }

  return merged;
}
