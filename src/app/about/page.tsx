import type { Metadata } from "next";
import { PACKAGES } from "@/data/home";
import BookingForm from "@/components/book/BookingForm";

export const metadata: Metadata = {
  title: "Book Dhow Cruise Dubai - Online Reservation",
  description:
    "Book your traditional dhow cruise dinner or sightseeing tour in Dubai Creek, Dubai Marina and more. Fast confirmation on WhatsApp.",
  alternates: {
    canonical: "/book",
  },
};

interface BookPageProps {
  searchParams: Promise<{
    tour?: string;
  }>;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const { tour } = await searchParams;

  const tours = PACKAGES.map((pkg) => ({
    slug: pkg.slug,
    title: pkg.title,
  }));

  // Fallback to first tour if slug is unknown
  const validTour = tours.some((t) => t.slug === tour);
  const initialTourSlug = validTour ? tour : tours[0]?.slug;

  return (
    <div className="book-page-wrap">
      <div className="dcontainer" style={{ maxWidth: "800px", padding: "50px 20px" }}>
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

        <BookingForm initialTourSlug={initialTourSlug} tours={tours} />
      </div>
    </div>
  );
}
