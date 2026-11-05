import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for booking a dhow cruise.",
  alternates: { canonical: "/terms-and-conditions" },
  // Placeholder page: remove this line when the owner has supplied the real terms.
  robots: { index: false, follow: false },
};

const TODO = "TODO: owner to supply and review";

// DRAFT: must be reviewed by the business owner before launch.
const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Bookings and confirmation",
    body: "Bookings are confirmed on WhatsApp at +971558479933. A booking is not confirmed until you receive a confirmation message from us.",
  },
  { title: "Prices and payment", body: TODO },
  { title: "Changes and cancellations", body: TODO },
  { title: "Arrival and boarding", body: TODO },
  { title: "Behaviour and safety on board", body: TODO },
  { title: "Children", body: TODO },
  { title: "Liability", body: TODO },
  { title: "Contact", body: "Message us on WhatsApp at +971558479933." },
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