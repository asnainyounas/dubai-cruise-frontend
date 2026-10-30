export const CDN = "https://d1vqfl8cu8qgdj.cloudfront.net/assets/Dhowcruise";
export const WA_BASE = "https://api.whatsapp.com/send?phone=+971565481752&text=Hello_";
export const VIDEO_URL =
  "https://d1vqfl8cu8qgdj.cloudfront.net/assets/video/Dhow%20Cruise%20Dinner%20Dubai%20-%20Rayna%20Tours.mp4";

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
  { src: "/img/dhow-dinner-cruise-dubai.jpg", alt: "dhow dinner cruise" },
  { src: "/img/dhow-cruise-dinner-dubai.jpg", alt: "dhow cruise dinner dubai" },
  { src: "/img/dubai-dhow-cruise-marina.jpg", alt: "Dubai Dhow Cruise" },
  { src: "/img/dhow-dinner-cruise.jpg", alt: "dhow cruise" },
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
  titlePrefix: "Welcome to the",
  titleHighlight: "Dhow Cruise Dubai",
  image: {
    src: "/img/rayna-tripadvisor.jpg",
    alt: "Tripadvisor logo",
    width: 460,
    height: 260,
  },
  introParagraphs: [
    "Dhow Cruise Dubai exposes you to the “other side” of Dubai’s highly gripping and eye-popping enchantment, asides breathtaking skyscrapers and luxurious shopping venues.",
    "Don’t miss the opportunity to tour Dubai dhow cruise with us, whether you want to explore the old Dubai Creek or encounter the ultramodern episodes of dhow dinner cruise Dubai Marina.",
  ],
  adventureText: {
    before: "Are you an enthusiast of nature and adventure? Musandam Dibba is our incredible ",
    highlight: "dhow cruise in Dubai",
    after: " which surprises you on every nautical mile.",
  },
  expandedParagraphs: [
    "Cruising in Dubai is an ‘abode on water’ experience with every minute detail of your sail paid attention to with our bespoke and sophisticate services. If you’re looking to make the night special on your special event or romantic escape, there is nothing better than dhow cruise Dubai at night. Tour Dubai dhow dinner cruise for an exceptional breakout with colourful belly dancing or the dervish traditional Tanoura dance to spice it up!",
    "Worried about dhow cruise Dubai price? Don’t be...because we can cater to your individual as well as larger group needs without going hard on your wallet and without compromising on the service quality. You’ll be amazed while enjoying the range of our sumptuous and palatable offerings serviced at an attractive dhow cruise with dinner price.",
  ],
  bookingLink: {
    prefix: "Get the most happening and fascinating ",
    text: "dhow cruise in Dubai",
    suffix: " We promise to make the dhow cruise Dubai worth repeating again.",
    url: "https://www.raynatours.com/dhow-cruise-dubai-c-11690",
  },
};

export interface PackageItem {
  col: number;
  big?: boolean;
  img: string;
  alt: string;
  title: string;
  duration: string;
  text: string;
  book: string;
  wa: string;
  href?: string;
}

export const PACKAGES: PackageItem[] = [
  {
    col: 1,
    img: "dhow-cruise-creek-small.jpg",
    alt: "Dubai Cruise Creek",
    title: "Dhow Cruise Creek",
    duration: "Duration : 2 hours",
    text: "A trip down the historic creek on our wooden dhow with Arabian-inspired setting is one of the most splendid things to enjoy during Dubai vacation. Offers you a relaxing experience",
    book: "https://www.raynatours.com/dubai/dhow-cruise/dhow-cruise-dinner---creek-e-86?utm_source=dhowcruiseindubai&utm_medium=link&utm_campaign=seosmallsites",
    wa: "Dhow%20Cruise%20Creek",
    href: "/cruises/creek-cruise",
  },
  {
    col: 1,
    img: "musandam-dibba-tour-small.jpg",
    alt: "Musandam Dibba Tour",
    title: "Musandam Dibba Tour",
    duration: "Duration : 5 hours",
    text: "Experience something different apart from watching the huge, luxurious skyscrapers and malls. Try out by taking by the Musandam Dibba tour, a experience in Oman.",
    book: "https://www.raynatours.com/dubai/dhow-cruise/musandam-dibba-tour-e-63?utm_source=dhowcruiseindubai&utm_medium=link&utm_campaign=seosmallsites",
    wa: "Musandam%20Dibba%20Tour",
  },
  {
    col: 1,
    img: "dhow-cruise-abu-dhabi-small.jpg",
    alt: "Dhow Cruise in Abu Dhabi",
    title: "Dhow Cruise in Abu Dhabi",
    duration: "Duration : 2 hours",
    text: "Join us for an outstanding cruising experience that is not to be missed in Abu Dhabi! Our two-hour cruise is a wonderful way to relax and views of Abu Dhabi's skyline.",
    book: "https://www.raynatours.com/abu-dhabi/dhow-cruise/dhow-cruise-abu-dhabi-e-241?utm_source=dhowcruiseindubai&utm_medium=link&utm_campaign=seosmallsites",
    wa: "Dhow%20Cruise%20in%20Abu%20Dhabi",
  },
  {
    col: 2,
    big: true,
    img: "dhow-cruise-marina-small.jpg",
    alt: "Dhow Cruise Marina",
    title: "Dhow Cruise Marina",
    duration: "Duration : 2 hours",
    text: "Join us for an outstanding cruising experience that is not to be missed in Dubai! Our two-hour cruise is a wonderful way to relax and views of Dubai's skyline.",
    book: "https://www.raynatours.com/dubai/dhow-cruise/dhow-cruise-dinner---marina-e-87?utm_source=dhowcruiseindubai&utm_medium=link&utm_campaign=seosmallsites",
    wa: "Dhow%20Cruise%20Marina",
    href: "/cruises/dubai-marina-cruise",
  },
  {
    col: 2,
    big: true,
    img: "dhow-cruise-and-desert-safari-small.jpg",
    alt: "Desert Safari - Dhow Cruise",
    title: "Desert Safari - Dhow Cruise",
    duration: "Duration : 6 hours",
    text: "Two of the best things, you will never stop thanking yourself after enjoying them in Dubai, are the Desert Safari and Dhow Cruise. They are the must for every tourist to experience otherwise the whole idea of vacationing will fall flat.",
    book: "https://www.dhowcruiseindubai.com/desert-safari-dhow-cruise.html",
    wa: "Desert%20Safari%20-%20Dhow%20Cruise",
  },
  {
    col: 3,
    img: "special-charter-small.jpg",
    alt: "Charter For Special Events",
    title: "Charter For Special Events ",
    duration: "Duration : 2 hours",
    text: "Dhow Cruise in Dubai provides fantastic dhow cruise options for special events and functions including get-together, corporate events, kids' parties, and family events",
    book: "https://www.dhowcruiseindubai.com/dhow-charter-special-events.html",
    wa: "Charter%20For%20Special%20Events",
  },
  {
    col: 3,
    img: "dhow-cruise-and-dubai-city-tour-small.jpg",
    alt: "Dhow Cruise - Dubai City Tour",
    title: "Dhow Cruise - Dubai City Tour",
    duration: "Duration : 4 hours",
    text: "When vacationing in Dubai, be sure to include all attractions and activities that allow you to experience this incredible city at its best. We, dhowcruiseindubai.com, take care of your holiday needs.",
    book: "https://www.dhowcruiseindubai.com/dhow-cruise-dubai-city-tour.html",
    wa: "Dhow%20Cruise%20-%20Dubai%20City%20Tour",
  },
  {
    col: 3,
    img: "suset-dhow-cruise-dinner-dubai.jpg",
    alt: "Sunset Cruise in Dubai Marina",
    title: "Lotus Mega Yacht Dinner Cruise",
    duration: "Duration : 180 mn",
    text: "Step aboard the Lotus Mega Yacht Dinner Cruise for a grand evening of fine dining, live entertainment, and stunning waterfront views, where luxury, elegance, and unforgettable moments come together under the night sky.",
    book: "https://www.raynatours.com/dubai/cruise-and-boat-tours/lotus-mega-yacht-dinner-cruise-e-507783?utm_source=dhowcruiseindubai&utm_medium=link&utm_campaign=seosmallsites",
    wa: "Lotus%20Mega%20Yacht%20Dinner%20Cruise",
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
    departure: "Depature Time : 08:30 PM",
    duration: "Duration : 1.5 Hours",
    price: "Price : 75 AED",
  },
  {
    heading: "Dhow Cruise Marina",
    departure: "Depature Time : 08:45 PM",
    duration: "Duration : 1.5 Hours",
    price: "Price : 140 AED",
  },
];

export interface MenuBlock {
  title: string;
  pdf: string;
}

export const MENU_BLOCKS: MenuBlock[] = [
  { title: "1. Dhow Cruise Creek Menu", pdf: `${CDN}/creek-menu.pdf` },
  { title: "2. Dhow Cruise Marina Menu", pdf: `${CDN}/marina-menu.pdf` },
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
    href: "https://maps.google.com/?cid=4977102213412695299",
  },
];

export interface FaqItemData {
  q: string;
  a: string;
}

export const FAQS_MAIN: FaqItemData[] = [
  {
    q: "What are the best Dhow Cruises in Dubai?",
    a: "There are mainly two types of dhow cruises in Dubai: Dhow Cruise Creek and Dhow Cruise Marina. Between these two, the dhow cruise Marina is the most popular, as the Marina area is considered to be the most modern and the most happening area. Moreover, it is also promoted the most by the tour providers. On the other hand, the dhow cruise on Dubai Creek gives you the glimpse of the old side of the city. In short, you can book a cruise depending on your preferences and what you want to see.",
  },
  {
    q: "What are the activities in dhow cruise Dubai?",
    a: "The dhow cruise experience is designed to ensure that the guests have a memorable time. As guests enter the dhow, they are welcomed with soulful music and delicious welcome drinks. As the dhow starts sailing, the guests are treated with scrumptious buffet dinner that includes both local and international delicacies. Live entertainment show in the form of Tanoura dance are also available to the guests. They are also free to visit the upper deck to enjoy the view of the surroundings.",
  },
  {
    q: "How to Reach Dhow Cruise Dubai?",
    a: "You can opt for transportation at the time of booking. www.dhowcruiseindubai.com offers pickup and drop off services to those who require it. On the other hand, you can also reach the departure point in your own vehicle or via public transportation.",
  },
  {
    q: "What Should I Wear on Dhow Cruise Dubai?",
    a: "Formals and smart casuals are acceptable dress code during dhow cruise. Men and women should avoid wearing shorts. Short skirts and sleeveless dresses are also a no-no. Slippers and flip-flops are also not acceptable.",
  },
  {
    q: "What is the difference between Dhow Cruise Creek and Marina Dhow Cruise?",
    a: "The only difference between a dhow cruise Creek and Marina dhow cruise is the venue and the sights you get to see. However, the entire dhow cruise experience is the same in both cruises.",
  },
  {
    q: "What is Included in Dhow Cruise Dinner Menu?",
    a: "The dhow cruise dinner menu includes a three-course meal, i.e. starters, main course and desserts. Starters include soup, salads, dips and dressings, and kebabs. The main course includes a combination of local and international dishes. The desert menu also offers different options.",
  },
  {
    q: "How to Book Dhow Cruise Dubai?",
    a: "Online booking is the best way to book a dhow cruise in Dubai. To book with dhowcruiseindubai.com, you can visit the website and enquire about the package you are interested in. You would get a reply through email or SMS and book your tickets and make the payment as well. The best part of online booking is that you are likely to get some discounts and deals as well.",
  },
];

export const FAQS_EXTRA: FaqItemData[] = [
  {
    q: "What is the best time to visit dhow cruise Dubai ?",
    a: "The dhow cruise dinner happens in the evening, when the temperature of the city is cooler. So, dhow cruise is a great option throughout the year. However, if the heat of the city is unbearable to you, especially in the summer, you can book a table in the fully air-conditioned lower deck of the dhow. Also, avoid booking a dhow cruise during the month of Ramadan, as no drinks are served, and there are no entertainment performances onboard during this month.",
  },
  {
    q: "Where is dhow cruise creek located?",
    a: "Dubai Creek is located between Bur Dubai and Deira. It is in the old part of the city.",
  },
  {
    q: "I am vegetarian, is there veg food also available in Dhow Cruise Dubai?",
    a: "Yes, vegetarian food is available on dhow cruise Dubai. Do mention your food preferences at the time of booking.",
  },
  {
    q: "Can I book Dhow Cruise Dubai for private party?",
    a: "Yes, you can book an entire dhow cruise for a few hours for a private party. You can contact us to know all the details about the same.",
  },
  {
    q: "Are drinks served free of charges?",
    a: "A welcome drink is included in the dhow cruise package. All other drinks, both alcoholic and non-alcoholic, would be charged.",
  },
  {
    q: "Do we get pick and drop facility?",
    a: "Yes, we can arrange pickup and drop off for you. Kindly inform whether you need pick up and drop off at the time of booking.",
  },
  {
    q: "Which is better creek or marina?",
    a: "There is no right answer for this question. The answer would depend on your preferences. If you want to see the modern and glamorous Dubai, head to Dubai Marina. On the other hand, if you want to see the old charm of the city, head to Dubai Creek.",
  },
  {
    q: "What is Musandam Dibba Tour?",
    a: "The Musandam Dibba tour is a dhow cruise tour on the Mussandam Peninsula in Oman. It is a five hours trip from Dubai and includes buffet lunch and some interesting activities like snorkeling, swimming, banana boat riding, etc.",
  },
  {
    q: "What are the days of operation for the Dhow Dinner Cruise?",
    a: "The dhow dinner cruise is available 7 days a week and 365 days a year.",
  },
  {
    q: "What is dhow cruise dinner?",
    a: "Dhow cruises are traditional dhows turned into restaurants. They are popular tourist attractions in Dubai and usually happen at Dubai Creek and Dubai Marina. A 2-3 hours dhow cruise dinner includes a relaxing dinner, entertainment and sightseeing as well.",
  },
  {
    q: "What is the capacity of dhow cruise ?",
    a: "The dhow has an upper and lower deck and can hold 200 people.",
  },
  {
    q: "Is photography allowed at dhow cruise?",
    a: "Yes, photography is allowed.",
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
