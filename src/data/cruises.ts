// src/data/cruises.ts
// Cruise detail data shaped to match Dubai-cruise-backend/src/models/Cruise.js
// Business facts (prices, times, contact) live in ./business.ts. Change them there.

import { BUSINESS, CARD_FEE_PERCENT, CURRENCY, MAPS, PICKUP_EXTRA, PRICE, SAILINGS } from "./business";

export interface CruiseImage {
  url: string;
  alt: string;
}

export interface CruiseFaq {
  question: string;
  answer: string;
}

export interface CruiseData {
  // Backend model fields
  slug: string;
  title: string;
  shortDescription: string;
  subtitle: string;
  category: "dinner" | "sightseeing" | "private-charter" | "other";
  departurePoint: string;
  durationMinutes?: number;
  adultPrice?: number;
  childPrice?: number;
  currency: string;
  heroImage: CruiseImage;
  images: CruiseImage[];
  inclusions: string[];
  faqs: CruiseFaq[];
  seoTitle: string;
  seoDescription: string;
  mapUrl: string;
  startingPrice: string;

  // Detail page sections
  intro: string;
  whatToExpect: string[];
  foodAndEntertainment: string[];
  whyChoose: string[];
  galleryImages: CruiseImage[];
  draft?: boolean; // true = placeholder page, hidden from search engines
}

const TODO = "TODO: add real details";
const WA = `+${BUSINESS.whatsappNumber}`;
const aed = (n: number) => `${n} ${CURRENCY}`;
const img = (url: string, alt: string): CruiseImage => ({ url, alt });

// ---- Shared texts ----
const pickup = (extra: number) =>
  `Pick-up and drop-off can be arranged for an extra ${aed(extra)} per person. Ask us on WhatsApp whether your area is covered.`;
const CHANGE_POLICY = "You can change or cancel your booking up to 4 hours before the cruise.";
const CHILDREN =
  "Children of any age can join. Children under 3 travel free, and children aged 3 and over pay the per-person price.";
const NO_DRESS_CODE = "There is no special dress code.";

const PAYMENT = `You can pay by cash, by card or by payment link, and a deposit can be arranged. If you pay by card, ${CARD_FEE_PERCENT}% is added to the total amount. Ask us on WhatsApp for the details.`;

const MARINA_TIMES = `Sunset sailing: boarding at ${SAILINGS.marinaEarly.boarding}, cruising from ${SAILINGS.marinaEarly.cruise}. Dinner sailing: boarding at ${SAILINGS.marinaLate.boarding}, cruising from ${SAILINGS.marinaLate.cruise}.`;
const MARINA_PRICES = `The sunset sailing costs ${aed(PRICE.marinaEarly)} per person and the dinner sailing costs ${aed(PRICE.marinaLate)} per person. Children under 3 travel free, and children aged 3 and over pay the per-person price.`;
const MARINA_SIGHTS =
  "You pass the Marina skyscrapers, the Dubai Marina canal, Dubai Marina Mall and Pier 7, the twisted tower on the canal, and Jumeirah Beach, with views towards Ain Dubai.";

const CREEK_TIMES = `Boarding is at ${SAILINGS.creek.boarding}, half an hour before sailing. The cruise is normally from ${SAILINGS.creek.cruise}.`;
const CREEK_PRICES = `The Creek cruise costs ${aed(PRICE.creek)} per person. Children under 3 travel free, and children aged 3 and over pay the per-person price.`;
const CREEK_SIGHTS =
  "On the way you pass places such as the Spice Souk, the Bur Dubai Bazaar, Dubai Museum, the Dubai Heritage Center and Village, Al Maktoum Bridge, Sheikh Maktoum House, the Al Bastakia District, the Ruler's Court, Dubai Heritage House, the National Bank of Dubai building, Infinity Bridge and Palm Deira.";
const CREEK_LOCATION =
  "Baniyas Road, on the Creek side, opposite the Rolex twin towers. You can park at P3, and the nearest metro station is Union (Exit 1).";

export const CRUISES: Record<string, CruiseData> = {
  "creek-cruise": {
    slug: "creek-cruise",
    title: "Dhow Cruise Creek",
    shortDescription:
      "A two-hour dhow cruise on Dubai Creek with a buffet dinner, live shows and music.",
    subtitle:
      "Two hours on the water along historic Dubai Creek, with dinner, live shows and music.",
    category: "dinner",
    departurePoint:
      "Baniyas Road, Creek side, opposite the Rolex twin towers. Parking: P3. Nearest metro: Union, Exit 1.",
    durationMinutes: 120,
    adultPrice: PRICE.creek,
    currency: CURRENCY,
    startingPrice: `From ${aed(PRICE.creek)} per person`,
    mapUrl: MAPS.creek,
    seoTitle: `Dhow Cruise Creek Dubai from ${aed(PRICE.creek)} | Dinner and Shows`,
    seoDescription: `Two-hour dhow dinner cruise on Dubai Creek with a buffet dinner, five live shows and music, from ${aed(PRICE.creek)} per person. Book on WhatsApp.`,
    heroImage: img("/img/hallview-28.jpg", "Dining hall on the Dubai Creek dhow cruise"),
    intro:
      "Sail along Dubai Creek for two hours on a traditional dhow, passing the old trading quarters of Bur Dubai and Deira. A buffet dinner, live shows and music on board make it a relaxed evening in the historic heart of the city.",
    inclusions: [
      "Two hours of cruising",
      "Buffet dinner",
      "Five live entertainment shows",
      "Music on board",
      "Free soft drinks",
    ],
    whatToExpect: [
      `${CREEK_TIMES} The price is ${aed(PRICE.creek)} per person, and children under 3 travel free.`,
      CREEK_SIGHTS,
      `Where to find us: ${CREEK_LOCATION}`,
      pickup(PICKUP_EXTRA.creek),
    ],
    foodAndEntertainment: [
      "A buffet dinner is served on board during the cruise, and soft drinks are free.",
      "Five live shows are part of the evening: Tanura dance, puppet dance, horse dance, Sufi dance and an Egyptian lights Tanura show, with music throughout.",
      "There is no welcome drink on the Creek cruise.",
      "Soft drinks are free. If you have a question about other drinks, ask us on WhatsApp.",
    ],
    whyChoose: [
      "A historic Creek route past heritage landmarks",
      "Buffet dinner, five live shows and music included",
      "Children under 3 travel free",
      "Easy to reach by metro (Union, Exit 1) or by car (P3 parking)",
      `Bookings confirmed on WhatsApp ${WA}`,
    ],
    galleryImages: [
      img("/img/hall-16.jpg", "Dining tables set up in the hall on the Creek cruise"),
      img("/img/halltables-32.jpg", "Tables in the dining hall on board"),
      img("/img/hallwhole-31.jpg", "The whole dining hall on the Creek dhow"),
      img("/img/halltopview-30.jpg", "Dining hall seen from above"),
      img("/img/buffet-24.jpg", "Buffet counter on board"),
      img("/img/plates-29.jpg", "Plates stacked at the buffet"),
      img("/img/waiter-21.jpg", "Staff serving at the buffet"),
      img("/img/flowerhall-33.jpg", "Flower arrangement in the dining hall"),
      img("/img/outsidehall-17.jpg", "Seating area on the Creek cruise"),
    ],
    images: [
      img("/img/hallview-28.jpg", "Dining hall on the Dubai Creek dhow cruise"),
      img("/img/hall-16.jpg", "Dining tables set up in the hall on the Creek cruise"),
      img("/img/buffet-24.jpg", "Buffet counter on board"),
    ],
    faqs: [
      { question: "Where does the Creek cruise depart from?", answer: CREEK_LOCATION },
      { question: "What are the sailing times?", answer: CREEK_TIMES },
      { question: "How much does the cruise cost?", answer: CREEK_PRICES },
      { question: "How long is the cruise?", answer: "The cruise lasts two hours." },
      {
        question: "What is included?",
        answer:
          "Two hours of cruising, a buffet dinner, five live entertainment shows, music on board and free soft drinks.",
      },
      {
        question: "What shows are on board?",
        answer:
          "Tanura dance, puppet dance, horse dance, Sufi dance and an Egyptian lights Tanura show.",
      },
      { question: "What can I see from the boat?", answer: CREEK_SIGHTS },
      { question: "Is pick-up and drop-off available?", answer: pickup(PICKUP_EXTRA.creek) },
      { question: "Is there a dress code?", answer: NO_DRESS_CODE },
      { question: "Can I change or cancel my booking?", answer: CHANGE_POLICY },
      { question: "Can children join the cruise?", answer: CHILDREN },
      { question: "How do I pay?", answer: PAYMENT },
      {
        question: "How can I confirm my booking?",
        answer: `Bookings are confirmed on WhatsApp ${WA}.`,
      },
    ],
  },

  "dubai-marina-cruise": {
    slug: "dubai-marina-cruise",
    title: "Dubai Marina Dinner Cruise",
    shortDescription:
      "A two-hour dinner cruise on the Dubai Marina canal with a buffet dinner, live shows and music.",
    subtitle:
      "Two hours on the water in Dubai Marina, with dinner, live shows and the skyline all around you.",
    category: "dinner",
    departurePoint: "Dubai Marina Harbour, Gate No. 3 (P1-AA-AB)",
    durationMinutes: 120,
    adultPrice: PRICE.marinaEarly,
    currency: CURRENCY,
    startingPrice: `From ${aed(PRICE.marinaEarly)} per person`,
    mapUrl: MAPS.marina,
    seoTitle: `Dubai Marina Dinner Cruise from ${aed(PRICE.marinaEarly)} | Buffet and Shows`,
    seoDescription: `Two-hour dinner cruise on Dubai Marina with a buffet dinner, live shows and music. Sunset and dinner sailings from ${aed(PRICE.marinaEarly)} per person. Book on WhatsApp.`,
    heroImage: img("/img/boat-4.jpg", "Dubai Marina dinner cruise boat lit up at night"),
    intro:
      "Spend two hours on the water in Dubai Marina, with the towers lit up around you. Choose the sunset sailing or the later dinner sailing, enjoy a buffet dinner and watch live shows on board.",
    inclusions: [
      "Two hours of cruising",
      "Welcome drinks",
      "International buffet dinner",
      "Unlimited soft beverages",
      "Live entertainment shows",
      "Music on board",
      "Separate facilities for men and women",
    ],
    whatToExpect: [
      `${MARINA_TIMES} ${MARINA_PRICES}`,
      MARINA_SIGHTS,
      "Where to find us: Dubai Marina Harbour, Gate No. 3 (P1-AA-AB). Parking is in front of the boat. Use the departure location link on this page to find it.",
      pickup(PICKUP_EXTRA.marina),
    ],
    foodAndEntertainment: [
      "Welcome drinks and an international buffet dinner are included, along with unlimited soft beverages.",
      "Live entertainment on board includes a Tanura show, a drum show and a puppet show, with music throughout the cruise.",
      "Soft drinks are free. If you have a question about other drinks, ask us on WhatsApp.",
    ],
    whyChoose: [
      "A choice of sunset or dinner sailing",
      "Buffet dinner, live shows and music included",
      "Children under 3 travel free",
      "Separate facilities for men and women on board",
      `Bookings confirmed on WhatsApp ${WA}`,
    ],
    galleryImages: [
      img("/img/dayboat-12.jpg", "Dubai Marina cruise boat on the water in daylight"),
      img("/img/daytable-11.jpg", "Dining tables on deck during the day"),
      img("/img/familytable-10.jpg", "A table set for a family on the Marina cruise"),
      img("/img/sidetable-14.jpg", "Side tables on deck with city views"),
      img("/img/tables-7.jpg", "Deck tables with the Dubai skyline behind"),
      img("/img/view-6.jpg", "Deck seating on the Marina cruise"),
      img("/img/singletable-13.jpg", "A single table set for dinner"),
      img("/img/insidetable-9.jpg", "Indoor seating on the Marina cruise"),
      img("/img/boat-5.jpg", "Marina cruise boat lit up at night"),
    ],
    images: [
      img("/img/boat-4.jpg", "Dubai Marina dinner cruise boat lit up at night"),
      img("/img/dayboat-12.jpg", "Dubai Marina cruise boat on the water in daylight"),
      img("/img/tables-7.jpg", "Deck tables with the Dubai skyline behind"),
    ],
    faqs: [
      {
        question: "Where does the Dubai Marina cruise depart from?",
        answer:
          "Dubai Marina Harbour, Gate No. 3 (P1-AA-AB). Parking is in front of the boat. Use the departure location link on this page to find it.",
      },
      { question: "What sailing times are available?", answer: MARINA_TIMES },
      { question: "How much does the cruise cost?", answer: MARINA_PRICES },
      { question: "How long is the cruise?", answer: "Each cruise lasts two hours." },
      {
        question: "What is included?",
        answer:
          "Two hours of cruising, welcome drinks, an international buffet dinner, unlimited soft beverages, live entertainment shows, music on board, and separate facilities for men and women.",
      },
      { question: "What shows are on board?", answer: "A Tanura show, a drum show and a puppet show." },
      { question: "What can I see from the boat?", answer: MARINA_SIGHTS },
      { question: "Is pick-up and drop-off available?", answer: pickup(PICKUP_EXTRA.marina) },
      { question: "Is there a dress code?", answer: NO_DRESS_CODE },
      { question: "Can I change or cancel my booking?", answer: CHANGE_POLICY },
      { question: "Can children join the cruise?", answer: CHILDREN },
      { question: "How do I pay?", answer: PAYMENT },
      {
        question: "How can I confirm my booking?",
        answer: `Bookings are confirmed on WhatsApp ${WA}.`,
      },
    ],
  },
};

// ---- Placeholder pages for the other home page cards ----
// Every text here is a short draft for review. Anything specific to the
// operator (times, prices, inclusions, menu) is left as TODO.
interface DraftInput {
  slug: string;
  title: string;
  subtitle: string;
  category: CruiseData["category"];
  heroUrl: string;
  intro: string;
}

function draftCruise(d: DraftInput): CruiseData {
  const hero: CruiseImage = { url: d.heroUrl, alt: d.title };
  return {
    slug: d.slug,
    title: d.title,
    shortDescription: d.subtitle,
    subtitle: d.subtitle,
    category: d.category,
    departurePoint: TODO,
    currency: CURRENCY,
    startingPrice: TODO,
    mapUrl: TODO,
    seoTitle: d.title,
    seoDescription: d.subtitle,
    heroImage: hero,
    images: [hero],
    galleryImages: [],
    intro: d.intro,
    inclusions: [TODO, TODO, TODO, TODO],
    whatToExpect: [TODO],
    foodAndEntertainment: [
      `Menu details: ${TODO}`,
      `Drinks policy: ${TODO}`,
      `Entertainment schedule: ${TODO}`,
    ],
    whyChoose: [`Direct booking support on WhatsApp ${WA}`, TODO],
    faqs: [
      { question: "Where does this tour start?", answer: TODO },
      { question: "How long does it last?", answer: TODO },
      { question: "What is included?", answer: `Inclusions: ${TODO}` },
      {
        question: "Is pick-up and drop-off available?",
        answer: `Pick-up and drop-off details: ${TODO}`,
      },
      { question: "What is the price?", answer: `Prices: ${TODO}` },
      {
        question: "How can I confirm my booking?",
        answer: `Bookings are confirmed on WhatsApp ${WA}.`,
      },
    ],
    draft: true,
  };
}

Object.assign(CRUISES, {
  "musandam-dibba-tour": draftCruise({
    slug: "musandam-dibba-tour",
    title: "Musandam Dibba Tour",
    subtitle: "A sea-and-mountain escape along the Musandam and Dibba coast.",
    category: "sightseeing",
    heroUrl: "/img/musandam-dibba-tour-small.jpg",
    intro:
      "Leave the city behind and head for the coastline of Musandam and Dibba, where rugged mountains meet open water.",
  }),
  "dhow-cruise-in-abu-dhabi": draftCruise({
    slug: "dhow-cruise-in-abu-dhabi",
    title: "Dhow Cruise in Abu Dhabi",
    subtitle: "A cruise on the waters of Abu Dhabi with views of the city.",
    category: "sightseeing",
    heroUrl: "/img/dhow-cruise-abu-dhabi-small.jpg",
    intro:
      "Spend time on the water in Abu Dhabi aboard a traditional dhow and see the capital from a different angle.",
  }),
  "desert-safari-dhow-cruise": draftCruise({
    slug: "desert-safari-dhow-cruise",
    title: "Desert Safari - Dhow Cruise",
    subtitle: "A dhow cruise and a desert safari combined in one experience.",
    category: "other",
    heroUrl: "/img/dhow-cruise-and-desert-safari-small.jpg",
    intro:
      "Combine two classic Dubai experiences: time on the water aboard a dhow and an adventure in the desert.",
  }),
  "charter-for-special-events": draftCruise({
    slug: "charter-for-special-events",
    title: "Charter For Special Events",
    subtitle: "Private dhow charters for celebrations and group events.",
    category: "private-charter",
    heroUrl: "/img/special-charter-small.jpg",
    intro:
      "Hire a dhow for your own group, whether it is a family gathering, a celebration or a company event.",
  }),
  "dhow-cruise-dubai-city-tour": draftCruise({
    slug: "dhow-cruise-dubai-city-tour",
    title: "Dhow Cruise - Dubai City Tour",
    subtitle: "A Dubai city sightseeing tour combined with a dhow cruise.",
    category: "sightseeing",
    heroUrl: "/img/dhow-cruise-and-dubai-city-tour-small.jpg",
    intro:
      "See the sights of Dubai on a city tour and enjoy a dhow cruise as part of the experience.",
  }),
  "lotus-mega-yacht-dinner-cruise": draftCruise({
    slug: "lotus-mega-yacht-dinner-cruise",
    title: "Lotus Mega Yacht Dinner Cruise",
    subtitle: "A dinner cruise aboard a yacht.",
    category: "dinner",
    heroUrl: "/img/suset-dhow-cruise-dinner-dubai.jpg",
    intro: "Enjoy an evening of dinner on the water aboard a yacht.",
  }),
});

export function getCruiseBySlug(slug: string): CruiseData | undefined {
  return CRUISES[slug];
}

export function getAllCruiseSlugs(): string[] {
  return Object.keys(CRUISES);
}