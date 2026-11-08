import type { Metadata } from "next";
import { BUSINESS, OFFICE } from "@/data/business";

export const metadata: Metadata = {
  title: "Book Dhow Cruise Dubai - Online Reservation",
  description:
    "Book your traditional dhow cruise dinner or sightseeing tour in Dubai Creek, Dubai Marina and more. Fast confirmation on WhatsApp.",
  alternates: {
    canonical: "/book",
  },
};

export default function AboutPage() {
  return (
    <div className="book-page-wrap">
      <div className="dcontainer" style={{ maxWidth: "800px", padding: "50px 20px" }}>
        <section className="cruise-section-block">
          <h2 className="cruise-section-heading">Who we are</h2>
          <p className="cruise-body-text">
            {BUSINESS.name} runs dinner cruises in Dubai on our own boats, on Dubai Marina and on Dubai Creek.
          </p>
          <p className="cruise-body-text">
            You can visit our office at {OFFICE.name}, {OFFICE.address}. We are open {OFFICE.hours}.
          </p>
        </section>

        <div className="text-center mb30">
          <span
            style={{
              display: "block",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "var(--orange)",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Online Reservation
          </span>
          <h1 className="main-title" style={{ fontSize: "clamp(28px, 4vw, 42px)", margin: "0 0 15px" }}>
            Book Your Dhow Cruise
          </h1>
          <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.6, margin: 0 }}>
            Fill out the details below. We will confirm your booking on WhatsApp.
          </p>
        </div>

        
      </div>
    </div>
  );
}
