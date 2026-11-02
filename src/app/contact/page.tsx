import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact us on WhatsApp to ask about our dhow cruises or to confirm a booking.",
  alternates: { canonical: "/contact" },
  // Placeholder page: remove this line when the TODO details are filled in.
  robots: { index: false, follow: false },
};

const WHATSAPP_NUMBER = "971558479933";
const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello, I have a question about a dhow cruise"
)}`;

export default function ContactPage() {
  return (
    <>
      <section className="hx-hero pg-hero">
        <h1 className="hx-title">Contact Us</h1>
        <p className="hx-sub">The quickest way to reach us is on WhatsApp.</p>
      </section>

      <div className="cruise-content-container pg-body">
        <section className="cruise-section-block">
          <h2 className="cruise-section-heading">Book or ask a question</h2>
          <p className="cruise-body-text">
            Send us a message on WhatsApp to ask about a cruise or to confirm a booking.
          </p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-book-now pg-btn">
            Chat on WhatsApp
          </a>
        </section>

        <section className="cruise-section-block">
          <h2 className="cruise-section-heading">Our details</h2>
          <ul className="cruise-why-list">
            <li>WhatsApp: +971558479933</li>
            <li>Email: TODO: add real details</li>
            <li>Address: TODO: add real details</li>
            <li>Opening hours: TODO: add real details</li>
          </ul>
        </section>
      </div>
    </>
  );
}