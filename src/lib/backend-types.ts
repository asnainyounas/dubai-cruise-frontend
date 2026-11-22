/**
 * src/lib/backend-types.ts
 *
 * TypeScript types derived from the Express backend models and controllers.
 * Sources: backend/src/models/Cruise.js, Departure.js, Booking.js, Enquiry.js
 *          backend/src/controllers/cruise.controller.js (response shapes)
 *
 * These types describe what the backend RETURNS in JSON, not what it stores
 * in MongoDB. _id is mapped to id (string) by serialize.withId() in every
 * response.
 *
 * Keep this file in sync with the backend models. Do NOT add fields that
 * are not present in the backend code.
 */

// ---------------------------------------------------------------------------
// Cruise
// ---------------------------------------------------------------------------

/** Thumbnail image object returned inside cruise objects. */
export interface BackendCruiseImage {
  url: string;
  alt?: string;
}

/** FAQ object as stored in the Cruise model. */
export interface BackendCruiseFaq {
  question: string;
  answer: string;
}

/**
 * Cruise object returned by GET /api/cruises/:slug
 * (all fields that are selected with `.select('-__v').lean()`).
 */
export interface BackendCruise {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  category: "dinner" | "sightseeing" | "private-charter" | "other";
  departurePoint?: string;
  durationMinutes?: number;
  adultPrice: number;
  childPrice: number;
  currency: string;
  images: BackendCruiseImage[];
  inclusions: string[];
  faqs: BackendCruiseFaq[];
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  menuUrl?: string;
  mapUrl?: string;
  pickupAvailable: boolean;
  sortOrder: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

/**
 * Cruise summary object returned by GET /api/cruises (list).
 * Only a subset of fields; first image is flattened to `image`.
 */
export interface BackendCruiseListItem {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  category: "dinner" | "sightseeing" | "private-charter" | "other";
  departurePoint?: string;
  durationMinutes?: number;
  adultPrice: number;
  childPrice: number;
  currency: string;
  pickupAvailable: boolean;
  image: BackendCruiseImage | null; // first image only
}

/** Envelope returned by GET /api/cruises */
export interface BackendCruiseListResponse {
  success: true;
  data: BackendCruiseListItem[];
}

/** Envelope returned by GET /api/cruises/:slug */
export interface BackendCruiseDetailResponse {
  success: true;
  data: BackendCruise;
}

// ---------------------------------------------------------------------------
// Departure
// ---------------------------------------------------------------------------

/**
 * Departure object returned by GET /api/cruises/:slug/departures.
 * Prices fall back to the cruise price when not set on the departure.
 */
export interface BackendDeparture {
  id: string;
  startsAt: string; // ISO 8601, stored UTC
  seatsRemaining: number;
  adultPrice: number;  // departure price if set, else cruise.adultPrice
  childPrice: number;  // departure price if set, else cruise.childPrice
  currency: string;
}

/** Envelope returned by GET /api/cruises/:slug/departures */
export interface BackendDepartureListResponse {
  success: true;
  data: BackendDeparture[];
}

// ---------------------------------------------------------------------------
// Booking (public POST response only)
// ---------------------------------------------------------------------------

/**
 * Booking summary returned by POST /api/bookings (201 Created).
 * No customer PII is included in the response.
 */
export interface BackendBookingCreated {
  reference: string;    // e.g. "DC-A1B2C3D4"
  status: "pending";
  cruiseTitle: string;
  startsAt: string;     // ISO 8601
  adults: number;
  children: number;
  totalPrice: number;
  currency: string;
}

/** Envelope returned by POST /api/bookings */
export interface BackendBookingCreatedResponse {
  success: true;
  data: BackendBookingCreated;
}

// ---------------------------------------------------------------------------
// Enquiry (public POST response only)
// ---------------------------------------------------------------------------

/** Envelope returned by POST /api/enquiries */
export interface BackendEnquiryCreatedResponse {
  success: true;
  data: { message: string };
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------

/** Envelope returned by GET /api/health */
export interface BackendHealthResponse {
  success: true;
  status: "ok";
  uptime: number;
  database: "connected" | "disconnected";
}

// ---------------------------------------------------------------------------
// Generic error envelope
// ---------------------------------------------------------------------------

/** Shape the backend returns for any error (4xx / 5xx). */
export interface BackendErrorResponse {
  success: false;
  message: string;
}
