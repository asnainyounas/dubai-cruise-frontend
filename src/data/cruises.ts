// src/data/cruises.ts
// Cruise detail data shaped to match Dubai-cruise-backend/src/models/Cruise.js

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
    currency: "AED",
    startingPrice: TODO,
    mapUrl: "https://maps.app.goo.gl/jpCx4gMWfvvK8o8b6",
    seoTitle: "Dhow Cruise Creek Dubai - Dinner and Live Shows",
    seoDescription:
      "Two-hour dhow dinner cruise on Dubai Creek with a buffet dinner, five live shows and music. Departs from Baniyas Road. Book on WhatsApp.",
    heroImage: {
      url: "/img/dhow-cruise-dinner-dubai.jpg",
      alt: "Dhow Cruise Creek Dubai",
    },
    intro:
      "Sail along Dubai Creek for two hours on a traditional dhow, passing the old trading quarters of Bur Dubai and Deira. A buffet dinner, live shows and music on board make it a relaxed evening in the historic heart of the city.",
    inclusions: [
      "Two hours of cruising",
      "Buffet dinner",
      "Five live entertainment shows",
      "Music on board",
    ],
    whatToExpect: [
      `Sailing times: ${TODO}`,
      "On the way you pass places such as the Spice Souk, the Bur Dubai bazaar, Dubai Museum, the Dubai Heritage Center and Village, Al Maktoum Bridge, the Al Bastakia district and Infinity Bridge.",
      "Where to find us: Baniyas Road, on the Creek side, opposite the Rolex twin towers. You can park at P3, and the nearest metro station is Union (Exit 1).",
    ],
    foodAndEntertainment: [
      "A buffet dinner is served on board during the cruise.",
      "Five live shows are part of the evening: Tanura dance, puppet dance, horse dance, Sufi dance and an Egyptian lights Tanura show, with music throughout.",
      `Drinks policy: ${TODO}`,
    ],
    whyChoose: [
      "A historic Creek route past heritage landmarks",
      "Buffet dinner, five live shows and music included",
      "Easy to reach by metro (Union, Exit 1) or by car (P3 parking)",
      "Bookings confirmed on WhatsApp +971558479933",
    ],
    galleryImages: [
      { url: "/img/dhow-dinner-cruise-dubai.jpg", alt: "Evening dhow cruise on Dubai Creek" },
      { url: "/img/dhow-dinner-cruise.jpg", alt: "Illuminated wooden dhow on Dubai Creek" },
      { url: "/img/dhow-cruise-creek-small.jpg", alt: "Dubai Creek traditional sailing" },
    ],
    images: [
      { url: "/img/dhow-cruise-dinner-dubai.jpg", alt: "Dhow Cruise Creek Dubai" },
      { url: "/img/dhow-dinner-cruise-dubai.jpg", alt: "Evening dhow cruise on Dubai Creek" },
      { url: "/img/dhow-dinner-cruise.jpg", alt: "Illuminated wooden dhow on Dubai Creek" },
      { url: "/img/dhow-cruise-creek-small.jpg", alt: "Dubai Creek traditional sailing" },
    ],
    faqs: [
      {
        question: "Where does the Creek cruise depart from?",
        answer:
          "Baniyas Road, on the Creek side, opposite the Rolex twin towers. You can park at P3, and the nearest metro station is Union (Exit 1).",
      },
      { question: "What are the sailing times?", answer: `Sailing times: ${TODO}` },
      { question: "How long is the cruise?", answer: "The cruise lasts two hours." },
      {
        question: "What is included?",
        answer: "Two hours of cruising, a buffet dinner, five live entertainment shows and music on board.",
      },
      {
        question: "What shows are on board?",
        answer:
          "Tanura dance, puppet dance, horse dance, Sufi dance and an Egyptian lights Tanura show.",
      },
      {
        question: "What can I see from the boat?",
        answer:
          "Places such as the Spice Souk, the Bur Dubai bazaar, Dubai Museum, the Dubai Heritage Center and Village, Al Maktoum Bridge, the Al Bastakia district and Infinity Bridge.",
      },
      { question: "How much does it cost?", answer: `Prices: ${TODO}` },
      {
        question: "Is hotel pick-up and drop-off available?",
        answer: `Pick-up and drop-off details: ${TODO}`,
      },
      { question: "Is there a dress code?", answer: `Dress code: ${TODO}` },
      {
        question: "How can I confirm my booking?",
        answer: "Bookings are confirmed on WhatsApp +971558479933.",
      },
    ],
  },

  "dubai-marina-cruise": {
    slug: "dubai-marina-cruise",
    title: "Dubai Marina Dhow Cruise",
    shortDescription:
      "A two-hour dhow cruise on the Dubai Marina canal with buffet dinner, live shows and music.",
    subtitle:
      "Two hours on the water in Dubai Marina, with dinner, live shows and the skyline all around you.",
    category: "dinner",
    departurePoint: TODO,
    durationMinutes: 120,
    currency: "AED",
    startingPrice: TODO,
    mapUrl: TODO,
    seoTitle: "Dubai Marina Dhow Cruise Dinner - Sunset and Dinner Sailings",
    seoDescription:
      "Two-hour dhow cruise on Dubai Marina with a buffet dinner, live shows and music. Choose a sunset or dinner sailing and book on WhatsApp.",
    heroImage: {
      url: "/img/dubai-dhow-cruise-marina.jpg",
      alt: "Dubai Marina Dhow Cruise",
    },
    intro:
      "Spend two hours on a dhow gliding along the Dubai Marina canal, with the towers lit up around you. Choose a sunset sailing or a later dinner sailing, enjoy a buffet dinner and watch live shows on board.",
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
      "Sunset sailing: boarding at 5:30 pm, cruising from 6:00 pm to 8:00 pm. Dinner sailing: boarding at 8:30 pm, cruising from 9:00 pm to 11:00 pm.",
      "Along the route you pass the Marina skyscrapers, the Dubai Marina canal, Dubai Marina Mall and Pier 7, the twisted tower on the canal, and Jumeirah Beach, with views towards Ain Dubai.",
    ],
    foodAndEntertainment: [
      "Welcome drinks and an international buffet dinner are included, along with unlimited soft beverages.",
      "Live entertainment on board includes a Tanura show, a drum show and a puppet show, with music throughout the cruise.",
      `Drinks beyond the included soft beverages: ${TODO}`,
    ],
    whyChoose: [
      "A choice of sunset or dinner sailing",
      "Buffet dinner, live shows and music included",
      "Separate facilities for men and women on board",
      "Bookings confirmed on WhatsApp +971558479933",
    ],
    galleryImages: [
      { url: "/img/suset-dhow-cruise-dinner-dubai.jpg", alt: "Sunset cruise view in Dubai Marina" },
      { url: "/img/dhow-cruise-marina-small.jpg", alt: "Dubai Marina dhow cruise sailing" },
      { url: "/img/dubai-dhow-cruise-marina.jpg", alt: "Illuminated marina towers at night" },
    ],
    images: [
      { url: "/img/dubai-dhow-cruise-marina.jpg", alt: "Dubai Marina Dhow Cruise" },
      { url: "/img/suset-dhow-cruise-dinner-dubai.jpg", alt: "Sunset cruise view in Dubai Marina" },
      { url: "/img/dhow-cruise-marina-small.jpg", alt: "Dubai Marina dhow cruise sailing" },
      { url: "/img/dubai-dhow-cruise-marina.jpg", alt: "Illuminated marina towers at night" },
    ],
    faqs: [
      {
        question: "Where does the Dubai Marina cruise depart from?",
        answer: `Departure point: ${TODO}`,
      },
      {
        question: "What sailing times are available?",
        answer:
          "Sunset sailing: boarding at 5:30 pm, cruising from 6:00 pm to 8:00 pm. Dinner sailing: boarding at 8:30 pm, cruising from 9:00 pm to 11:00 pm.",
      },
      { question: "How long is the cruise?", answer: "Each cruise lasts two hours." },
      {
        question: "What is included?",
        answer:
          "Two hours of cruising, welcome drinks, an international buffet dinner, unlimited soft beverages, live entertainment shows, music on board, and separate facilities for men and women.",
      },
      {
        question: "What shows are on board?",
        answer: "A Tanura show, a drum show and a puppet show.",
      },
      {
        question: "What can I see from the boat?",
        answer:
          "The Marina skyscrapers, the Dubai Marina canal, Dubai Marina Mall and Pier 7, the twisted tower on the canal, and Jumeirah Beach, with views towards Ain Dubai.",
      },
      { question: "How much does it cost?", answer: `Prices: ${TODO}` },
      {
        question: "Is hotel pick-up and drop-off available?",
        answer: `Pick-up and drop-off details: ${TODO}`,
      },
      { question: "Is there a dress code?", answer: `Dress code: ${TODO}` },
      {
        question: "How can I confirm my booking?",
        answer: "Bookings are confirmed on WhatsApp +971558479933.",
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
    currency: "AED",
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
    whyChoose: ["Direct booking support on WhatsApp +971558479933", TODO],
    faqs: [
      { question: "Where does this tour start?", answer: TODO },
      { question: "How long does it last?", answer: TODO },
      { question: "What is included?", answer: `Inclusions: ${TODO}` },
      {
        question: "Is hotel pick-up and drop-off available?",
        answer: `Pick-up and drop-off details: ${TODO}`,
      },
      { question: "What is the price?", answer: `Prices: ${TODO}` },
      {
        question: "How can I confirm my booking?",
        answer: "Bookings are confirmed on WhatsApp +971558479933.",
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