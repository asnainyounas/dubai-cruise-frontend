import type { Metadata } from "next";
import { BUSINESS, CURRENCY, PICKUP_EXTRA, PRICE, SAILINGS } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for booking a Dubai Marina or Dubai Creek dinner cruise.",
  alternates: { canonical: "/terms-and-conditions" },
  // Remove this line when every TODO below has been replaced with the owner's real policy.
  robots: { index: false, follow: false },
};

// DRAFT: must be reviewed by the business owner before launch.
const TODO = "TODO: owner to supply and review";
const aed = (n: number) => `${n} ${CURRENCY}`;
const WA = `+${BUSINESS.whatsappNumber}`;

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Bookings and confirmation",
    body: [
      `Bookings are confirmed on WhatsApp at ${WA}. A booking is not confirmed until you receive a confirmation message from us.`,
    ],
  },
  {
    title: "Prices and payment",
    body: [
      `Prices are per person. The Creek cruise costs ${aed(PRICE.creek)}. The Marina early sailing costs ${aed(PRICE.marinaEarly)} and the Marina dinner sailing costs ${aed(PRICE.marinaLate)}.`,
      "Children under 3 travel free.",
      `How to pay and any card fee: ${TODO}`,
    ],
  },
  {
    title: "Pick-up and drop-off",
    body: [
      `Pick-up and drop-off can be arranged for an extra ${aed(PICKUP_EXTRA.marina)} per person on the Marina cruise and ${aed(PICKUP_EXTRA.creek)} per person on the Creek cruise.`,
      "Ask us on WhatsApp whether your area is covered before you book.",
    ],
  },
  {
    title: "Changes and cancellations",
    body: [
      "You can change or cancel your booking up to 4 hours before the cruise.",
      `Refunds and changes after that time: ${TODO}`,
    ],
  },
  {
    title: "Arrival and boarding",
    body: [
      `Marina early sailing: boarding at ${SAILINGS.marinaEarly.boarding}, cruising from ${SAILINGS.marinaEarly.cruise}. Marina dinner sailing: boarding at ${SAILINGS.marinaLate.boarding}, cruising from ${SAILINGS.marinaLate.cruise}. Creek cruise: boarding at ${SAILINGS.creek.boarding}, cruising normally from ${SAILINGS.creek.cruise}.`,
      "The Marina cruise boards at Dubai Marina Harbour, Gate No. 3. The Creek cruise boards on Baniyas Road, Creek side, opposite the Rolex twin towers.",
      "If you arrive late, your seat will still be available.",
    ],
  },
   {
    title: "Behaviour and safety on board",
    body: [
      "We ask all guests to behave respectfully towards other guests and the crew, and to follow the crew's instructions on board.",
      "Please look after children at all times and move carefully on the boat, especially on deck and on the stairs.",
    ],
  },
  {
    title: "Dress code",
    body: ["There is no special dress code."],
  },
 
  {
    title: "Contact",
    body: [`Message us on WhatsApp at ${WA} or email ${BUSINESS.email}.`],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="hx-hero pg-hero">
        <h1 className="hx-title">Terms and Conditions</h1>
      </section>
      <div className="cruise-content-container pg-body">
        {SECTIONS.map((s) => (
          <section className="cruise-section-block" key={s.title}>
            <h2 className="cruise-section-heading">{s.title}</h2>
            {s.body.map((para, i) => (
              <p className="cruise-body-text" key={i}>
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}