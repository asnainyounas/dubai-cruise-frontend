import type { Metadata } from "next";
import { BUSINESS, OFFICE, SAILINGS } from "@/data/business";
import { CRUISES } from "@/data/cruises";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact us on WhatsApp or by email to ask about our Dubai Marina and Dubai Creek dinner cruises or to confirm a booking.",
  alternates: { canonical: "/contact" },
};

const waUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
  "Hello, I have a question about a dhow cruise"
)}`;

const marinaMap = CRUISES["dubai-marina-cruise"].mapUrl;
const creekMap = CRUISES["creek-cruise"].mapUrl;

const linkStyle = { color: "var(--linkblue)", textDecoration: "underline" } as const;

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
            <li>WhatsApp: +{BUSINESS.whatsappNumber}</li>
            <li>
              Email:{" "}
              <a href={`mailto:${BUSINESS.email}`} style={linkStyle}>
                {BUSINESS.email}
              </a>
            </li>
            <li>
              Office: {OFFICE.name}, {OFFICE.address}
            </li>
            <li>Opening hours: {OFFICE.hours}</li>
          </ul>
        </section>

        <section className="cruise-section-block">
          <h2 className="cruise-section-heading">Where to find us</h2>
          <ul className="cruise-why-list">
            <li>
              Dubai Marina cruise: Dubai Marina Harbour, Gate No. 3 (P1-AA-AB).{" "}
              <a href={marinaMap} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                View on map
              </a>
            </li>
            <li>
              Dubai Creek cruise: Baniyas Road, Creek side, opposite the Rolex twin towers. Parking at P3,
              nearest metro Union (Exit 1).{" "}
              <a href={creekMap} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                View on map
              </a>
            </li>
          </ul>
        </section>

        <section className="cruise-section-block">
          <h2 className="cruise-section-heading">Cruise times</h2>
          <ul className="cruise-why-list">
            <li>Marina early sailing: {SAILINGS.marinaEarly.cruise}</li>
            <li>Marina dinner sailing: {SAILINGS.marinaLate.cruise}</li>
            <li>Creek cruise: {SAILINGS.creek.cruise}</li>
          </ul>
        </section>
      </div>
    </>
  );
}