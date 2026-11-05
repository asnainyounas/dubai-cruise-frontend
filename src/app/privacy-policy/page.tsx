import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this website handles the information you give us when you book.",
  alternates: { canonical: "/privacy-policy" },
  // Placeholder page: remove this line when the owner has supplied the real policy.
  robots: { index: false, follow: false },
};

const TODO = "TODO: owner to supply and review";

// DRAFT: must be reviewed by the business owner before launch.
// Update the "Information you give us" section when bookings are connected to the backend.
const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Information you give us",
    body: "When you use the booking box, the details you enter (date, number of guests, your name and notes) are placed into a WhatsApp message that you send to us. This website does not store them.",
  },
  { title: "How we use your information", body: TODO },
  { title: "Cookies and analytics", body: TODO },
  { title: "Sharing your information", body: TODO },
  { title: "Your choices", body: TODO },
  { title: "Contact", body: "Message us on WhatsApp at +971558479933." },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="hx-hero pg-hero">
        <h1 className="hx-title">Privacy Policy</h1>
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