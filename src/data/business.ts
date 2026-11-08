// src/data/business.ts
// One place for the business facts. Change a value here and every page that uses it updates.

export const BUSINESS = {
  // Placeholder: your friend has no business name yet. Check the name and the domain are free before using it publicly.
  name: "Arabian Dhow Cruise",
  whatsappNumber: "971558479933", // digits only
  whatsappDisplay: "+971 55 847 9933",
  email: "Dhowcruisearabian@gmail.com", // CONFIRM with your friend that this is the business email
};

export const CURRENCY = "AED";

// Prices are per person. Children under 3 travel free.
export const PRICE = {
  marinaEarly: 59,
  marinaLate: 69,
  creek: 35,
};

// Extra cost for pick-up and drop-off, per person.
export const PICKUP_EXTRA = {
  marina: 35,
  creek: 25,
};

export const SAILINGS = {
   // CONFIRM boarding with your friend: 6:30 pm is a guess based on the other sailings, which board 30 minutes before.
  marinaEarly: { boarding: "6:30 pm", cruise: "7:00 pm to 9:00 pm", start: "7:00 PM" },
  marinaLate: { boarding: "8:30 pm", cruise: "9:00 pm to 11:00 pm", start: "9:00 PM" },
  creek: { boarding: "8:30 pm", cruise: "9:00 pm to 11:00 pm", start: "9:00 PM" },
};

export const OFFICE = {
  name: "Universal Travel", // CONFIRM this is the name he wants shown
  address: "Shop No. 2, Hassan Abdullah Building, near Emirates NBD bank, Al Satwa, Dubai",
  hours: "8:00 am to 12:00 am (midnight)",
};

export const CARD_FEE_PERCENT = 5; // added to the total when a guest pays by card

export const MAPS = {
  // Pin he sent for the Marina meeting point. Parking is in front of the boat.
  marina: "https://www.google.com/maps/search/?api=1&query=25.0953656,55.1388293",
  creek: "https://maps.app.goo.gl/jpCx4gMWfvvK8o8b6",
};

export const MAP_COORDS = {
  marina: { lat: 25.0953656, lng: 55.1388293 }, // Dubai Marina Harbour, Gate No. 3
  creek: { lat: 25.2651944, lng: 55.3083056 }, // Baniyas Road, Creek side
};