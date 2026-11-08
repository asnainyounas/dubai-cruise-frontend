import type { Metadata } from "next";
import { BUSINESS, OFFICE } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this website handles the information you give us when you book.",
  alternates: { canonical: "/privacy-policy" },
  // Keep noindex until the owner has reviewed this page.
  robots: { index: false, follow: false },
};

// DRAFT: the owner must review this page before launch.
const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Information you give us",
    body: "When you use the booking box on a cruise page, the details you enter (date, number of guests, your name and notes) are placed into a WhatsApp message that you send to us. This website does not store them.",
  },
  {
    title: "How we use your information",
    body: "We use the details you send us on WhatsApp to reply to you, to confirm your booking and to arrange the cruise, including pick-up and drop-off if you ask for it.",
  },
  {
    title: "Cookies and analytics",
    body: "This website does not use advertising cookies or analytics tools at the moment. The maps on this website are provided by Google and may set their own cookies when they load. If we add analytics later, we will update this page.",
  },
  {
    title: "Sharing your information",
    body: "We do not sell your information. If you pay by card or by payment link, the payment is handled by the payment provider, and this website does not store your card details.",
  },
  {
    title: "Your choices",
    body: "You can ask us to delete the details you sent us by messaging us on WhatsApp.",
  },
  {
    title: "Contact",
    body: `WhatsApp: +${BUSINESS.whatsappNumber}. Email: ${BUSINESS.email}. Office: ${OFFICE.name}, ${OFFICE.address}. Opening hours: ${OFFICE.hours}.`,
  },
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
