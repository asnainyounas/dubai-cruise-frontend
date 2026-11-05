export const WA_BASE = "https://api.whatsapp.com/send?phone=+971565481752&text=Hello_";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "About", href: "#about" },
  { label: "Event Parties", href: "#packages" },
  { label: "Desert Safari Tours", href: "#packages" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ'S", href: "#faq" },
  { label: "Contact", href: "/contact" },
];

export interface SlideItem {
  src: string;
  alt: string;
}

export const SLIDES: SlideItem[] = [
  { src: "/img/boat-26.jpg", alt: "Dhow cruise boat lit up at night on the water" },
  { src: "/img/fulboat-19.jpg", alt: "Illuminated boat on the water at night" },
  { src: "/img/hallview-28.jpg", alt: "Dining hall on board with set tables" },
  { src: "/img/buffet-24.jpg", alt: "Buffet dinner served on board" },
];

export interface WelcomeData {
  titlePrefix: string;
  titleHighlight: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  introParagraphs: string[];
  adventureText: {
    before: string;
    highlight: string;
    after: string;
  };
  expandedParagraphs: string[];
  bookingLink: {
    prefix: string;
    text: string;
    suffix: string;
    url: string;
  };
}

export const WELCOME_DATA: WelcomeData = {
  titlePrefix: "Welcome aboard",
  titleHighlight: "Dubai Dhow Cruises",
  image: {
    src: "/img/boat-5.jpg",
    alt: "A dhow lit up at night on the water",
    width: 640,
    height: 400,
  },
  introParagraphs: [
    "Dubai looks different from the water. On a dhow cruise you leave the traffic behind and see the city lit up from a quiet, slow-moving boat.",
    "We offer two cruises: a Dubai Marina cruise with sunset and dinner sailings, and a Dubai Creek cruise through the older part of the city. Both last two hours and include a buffet dinner, live shows and music on board.",
  ],
  adventureText: {
    before: "Not sure which one to pick? Choose the ",
    highlight: "Dubai Marina cruise",
    after: " for the glowing skyline and the Marina canal, or the Creek cruise for the older side of the city.",
  },
  expandedParagraphs: [
    "On the Marina cruise you sail along the Dubai Marina canal, past the Marina skyscrapers, Dubai Marina Mall and Pier 7, and the twisted tower, with views of Jumeirah Beach and Ain Dubai. Pick a sunset sailing in the early evening or a dinner sailing later at night.",
    "On the Creek cruise you pass heritage landmarks such as the Spice Souk, the Bur Dubai bazaar, Dubai Museum and the Dubai Heritage Center and Village, with Al Maktoum Bridge and Infinity Bridge along the way.",
  ],
  bookingLink: {
    prefix: "Ready to go? Message us on WhatsApp at +971558479933 or",
    text: "see our cruises",
    suffix: "to choose one. Bookings are confirmed on WhatsApp.",
    url: "/#packages",
  },
};

export interface PackageItem {
  col: number;
  big?: boolean;
  img: string;
  alt: string;
  title: string;
  slug: string;
  duration: string;
  text: string;
  book: string;
  wa: string;
  href?: string;
  hasPage: boolean;
  bookUrl?: string; // optional: a real booking page link for this tour
}

export const PACKAGES: PackageItem[] = [
  {
    col: 1,
    img: "dhow-cruise-creek-small.jpg",
    alt: "Dubai Cruise Creek",
    title: "Dhow Cruise Creek",
    slug: "creek-cruise",
    duration: "Duration : 2 hours",
    text: "Two hours on Dubai Creek with a buffet dinner, five live shows and music, passing the Spice Souk and other heritage landmarks.",
    book: "/book?tour=creek-cruise",
    wa: "Dhow%20Cruise%20Creek",
    href: "/cruises/creek-cruise",
    hasPage: true,
  },
  {
    col: 1,
    img: "musandam-dibba-tour-small.jpg",
    alt: "Musandam Dibba Tour",
    title: "Musandam Dibba Tour",
    slug: "musandam-dibba-tour",
    duration: "Duration : 5 hours",
    text: "Experience something different apart from watching the huge, luxurious skyscrapers and malls. Try out by taking by the Musandam Dibba tour, a experience in Oman.",
    book: "/book?tour=musandam-dibba-tour",
    wa: "Musandam%20Dibba%20Tour",
    hasPage: false,
  },
  {
    col: 1,
    img: "dhow-cruise-abu-dhabi-small.jpg",
    alt: "Dhow Cruise in Abu Dhabi",
    title: "Dhow Cruise in Abu Dhabi",
    slug: "dhow-cruise-in-abu-dhabi",
    duration: "Duration : 2 hours",
    text: "Join us for an outstanding cruising experience that is not to be missed in Abu Dhabi! Our two-hour cruise is a wonderful way to relax and views of Abu Dhabi's skyline.",
    book: "/book?tour=dhow-cruise-in-abu-dhabi",
    wa: "Dhow%20Cruise%20in%20Abu%20Dhabi",
    hasPage: false,
  },
  {
    col: 2,
    big: true,
    img: "dhow-cruise-marina-small.jpg",
    alt: "Dhow Cruise Marina",
    title: "Dhow Cruise Marina",
    slug: "dubai-marina-cruise",
    duration: "Duration : 2 hours",
    text: "Two hours on the Dubai Marina canal with a buffet dinner, live shows and music. Choose a sunset sailing or a dinner sailing.",
    book: "/book?tour=dubai-marina-cruise",
    wa: "Dhow%20Cruise%20Marina",
    href: "/cruises/dubai-marina-cruise",
    hasPage: true,
  },
  {
    col: 2,
    big: true,
    img: "dhow-cruise-and-desert-safari-small.jpg",
    alt: "Desert Safari - Dhow Cruise",
    title: "Desert Safari - Dhow Cruise",
    slug: "desert-safari-dhow-cruise",
    duration: "Duration : 6 hours",
    text: "Two of the best things, you will never stop thanking yourself after enjoying them in Dubai, are the Desert Safari and Dhow Cruise. They are the must for every tourist to experience otherwise the whole idea of vacationing will fall flat.",
    book: "/book?tour=desert-safari-dhow-cruise",
    wa: "Desert%20Safari%20-%20Dhow%20Cruise",
    hasPage: false,
  },
  {
    col: 3,
    img: "special-charter-small.jpg",
    alt: "Charter For Special Events",
    title: "Charter For Special Events ",
    slug: "charter-for-special-events",
    duration: "Duration : 2 hours",
    text: "Dhow Cruise in Dubai provides fantastic dhow cruise options for special events and functions including get-together, corporate events, kids' parties, and family events",
    book: "/book?tour=charter-for-special-events",
    wa: "Charter%20For%20Special%20Events",
    hasPage: false,
  },
  {
    col: 3,
    img: "dhow-cruise-and-dubai-city-tour-small.jpg",
    alt: "Dhow Cruise - Dubai City Tour",
    title: "Dhow Cruise - Dubai City Tour",
    slug: "dhow-cruise-dubai-city-tour",
    duration: "Duration : 4 hours",
     text: "A Dubai city sightseeing tour combined with a dhow cruise.",
    book: "/book?tour=dhow-cruise-dubai-city-tour",
    wa: "Dhow%20Cruise%20-%20Dubai%20City%20Tour",
    hasPage: false,
  },
  {
    col: 3,
    img: "suset-dhow-cruise-dinner-dubai.jpg",
    alt: "Sunset Cruise in Dubai Marina",
    title: "Lotus Mega Yacht Dinner Cruise",
    slug: "lotus-mega-yacht-dinner-cruise",
    duration: "Duration : 180 mn",
    text: "Step aboard the Lotus Mega Yacht Dinner Cruise for a grand evening of fine dining, live entertainment, and stunning waterfront views, where luxury, elegance, and unforgettable moments come together under the night sky.",
    book: "/book?tour=lotus-mega-yacht-dinner-cruise",
    wa: "Lotus%20Mega%20Yacht%20Dinner%20Cruise",
    hasPage: false,
  },
];

export interface MenuItem {
  heading: string;
  departure: string;
  duration: string;
  price: string;
}

export const MENUS: MenuItem[] = [
  {
    heading: "Dhow Cruise Creek",
    departure: "Departure Time : TODO: add real details",
    duration: "Duration : 2 Hours",
    price: "Price : TODO: add real details",
  },
  {
    heading: "Dhow Cruise Marina",
    departure: "Departure Time : Sunset 6:00 PM, Dinner 9:00 PM",
    duration: "Duration : 2 Hours",
    price: "Price : TODO: add real details",
  },
];

export interface MenuBlock {
  title: string;
  pdf: string;
}

export const MENU_BLOCKS: MenuBlock[] = [
  { title: "1. Dhow Cruise Creek Menu", pdf: "/menu" },
  { title: "2. Dhow Cruise Marina Menu", pdf: "/menu" },
];

export interface RouteItem {
  title: string;
  href: string;
}

export const ROUTES: RouteItem[] = [
  {
    title: "Dhow Cruise Marina Route",
    href: "https://www.google.ae/maps/place/Aisha+2+Dhow+Cruise/@25.069333,55.1311557,338m/data=!3m2!1e3!4b1!4m12!1m6!3m5!1s0x3e5f13513605329f:0x7c513b0c8fa8b3e1!2sAisha+2+Dhow+Cruise!8m2!3d25.0698359!4d55.1306508!3m4!1s0x3e5f13513605329f:0x7c513b0c8fa8b3e1!8m2!3d25.0698359!4d55.1306508",
  },
  {
    title: "Dhow Cruise Creek Route",
    href: "https://maps.app.goo.gl/jpCx4gMWfvvK8o8b6",
  },
];

export interface FaqItemData {
  q: string;
  a: string;
}

export const FAQS_MAIN: FaqItemData[] = [
  {
    q: "What dhow cruises do you offer?",
    a: "We offer a Dubai Marina cruise with sunset and dinner sailings, and a Dubai Creek cruise. Both cruises last two hours.",
  },
  {
    q: "What is the difference between the Creek and Marina cruises?",
    a: "The Marina cruise sails along the Dubai Marina canal among modern towers, while the Creek cruise sails along Dubai Creek past heritage landmarks such as the Spice Souk and the Bur Dubai bazaar. Both include a buffet dinner, live shows and music.",
  },
  {
    q: "What is included in the cruise?",
    a: "The Marina cruise includes two hours of cruising, welcome drinks, an international buffet dinner, unlimited soft beverages, live entertainment shows, music on board, and separate facilities for men and women. The Creek cruise includes two hours of cruising, a buffet dinner, five live shows and music on board.",
  },
  {
    q: "What are the Marina cruise sailing times?",
    a: "The sunset sailing starts boarding at 5:30 pm and cruises from 6:00 pm to 8:00 pm. The dinner sailing starts boarding at 8:30 pm and cruises from 9:00 pm to 11:00 pm.",
  },
  {
    q: "Where does the Creek cruise start?",
    a: "The Creek cruise leaves from Baniyas Road, on the Creek side, opposite the Rolex twin towers. You can park at P3, and the nearest metro station is Union (Exit 1).",
  },
  {
    q: "How do I book?",
    a: "Use the booking box on a cruise page, or message us on WhatsApp at +971558479933. Bookings are confirmed on WhatsApp.",
  },
  {
    q: "How much does a cruise cost?",
    a: "Prices: TODO: add real details",
  },
];

export const FAQS_EXTRA: FaqItemData[] = [
  {
    q: "What shows are on board?",
    a: "The Marina cruise has a Tanura show, a drum show and a puppet show. The Creek cruise has five shows: Tanura dance, puppet dance, horse dance, Sufi dance and an Egyptian lights Tanura show.",
  },
  {
    q: "What can I see on the Marina cruise?",
    a: "You pass the Marina skyscrapers, the Dubai Marina canal, Dubai Marina Mall and Pier 7, the twisted tower on the canal, and Jumeirah Beach, with views towards Ain Dubai.",
  },
  {
    q: "What can I see on the Creek cruise?",
    a: "You pass places such as the Spice Souk, the Bur Dubai bazaar, Dubai Museum, the Dubai Heritage Center and Village, Al Maktoum Bridge, the Al Bastakia district and Infinity Bridge.",
  },
  {
    q: "What does the menu include?",
    a: "You can see the premium menu on our menu page.",
  },
  {
    q: "Is hotel pick-up and drop-off available?",
    a: "Pick-up and drop-off details: TODO: add real details",
  },
  {
    q: "Is there a dress code?",
    a: "Dress code: TODO: add real details",
  },
  {
    q: "Can I change or cancel my booking?",
    a: "Change and cancellation policy: TODO: add real details",
  },
  {
    q: "Can children join the cruise?",
    a: "Children's details: TODO: add real details",
  },
];



export interface FooterLink {
  label: string;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Sitemap", href: "#sitemap" },
];
