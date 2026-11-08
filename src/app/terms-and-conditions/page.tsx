import type { Metadata } from "next";
import {
  BUSINESS,
  CARD_FEE_PERCENT,
  CURRENCY,
  OFFICE,
  PICKUP_EXTRA,
  PRICE,
  SAILINGS,
} from "@/data/business";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for booking our Dubai Marina and Dubai Creek dinner cruises.",
  alternates: { canonical: "/terms-and-conditions" },
  // Still a draft: remove this line when the owner has reviewed every section.
  robots: { index: false, follow: false },
};

const aed = (n: number) => `${n} ${CURRENCY}`;

// DRAFT: must be reviewed by the business owner before launch.
const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Bookings and confirmation",
    body: `Bookings are confirmed on WhatsApp at +${BUSINESS.whatsappNumber}. A booking is not confirmed until you receive a confirmation message from us.`,
  },
  {
    title: "Prices",
    body: `Prices are per person. The Creek cruise costs ${aed(PRICE.creek)}. The Marina sunset sailing costs ${aed(PRICE.marinaEarly)} and the Marina dinner sailing costs ${aed(PRICE.marinaLate)}. Children under 3 travel free, and children aged 3 and over pay the per-person price.`,
  },
  {
    title: "Payment",
    body: `You can pay by cash, by card or by payment link, and a deposit can be arranged. If you pay by card, ${CARD_FEE_PERCENT}% is added to the total amount. The deposit amount is confirmed with you on WhatsApp when you book.`,
  },
  {
    title: "Changes and cancellations",
    body: `You can change or cancel your booking up to 4 hours before the cruise. If you need to change or cancel later than that, please message us on WhatsApp and we will tell you what is possible.`,
  },
  {
    title: "Pick-up and drop-off",
    body: `Pick-up and drop-off can be arranged for an extra ${aed(PICKUP_EXTRA.marina)} per person on the Marina cruise and ${aed(PICKUP_EXTRA.creek)} per person on the Creek cruise. Please ask us on WhatsApp whether your area is covered.`,
  },
  {
    title: "Arrival and boarding",
    body: `Marina sunset sailing: boarding at ${SAILINGS.marinaEarly.boarding}. Marina dinner sailing: boarding at ${SAILINGS.marinaLate.boarding}. Creek cruise: boarding at ${SAILINGS.creek.boarding}.`,
  },
  {
    title: "Children",
    body: "Children of any age can join. Children under 3 travel free, and children aged 3 and over pay the per-person price.",
  },
  { title: "Dress code", body: "There is no special dress code." },
  {
    title: "Behaviour and safety on board",
    body: "Please follow the instructions of the crew on board, for your own safety and the safety of other guests.",
  },
  {
    title: "Contact",
    body: `WhatsApp: +${BUSINESS.whatsappNumber}. Email: ${BUSINESS.email}. Office: ${OFFICE.name}, ${OFFICE.address}. Opening hours: ${OFFICE.hours}.`,
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
            <p className="cruise-body-text">{s.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
