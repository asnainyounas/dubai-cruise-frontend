import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCruiseBySlug, getAllCruiseSlugs } from "@/data/cruises";
import Faq from "@/components/home/Faq";
import BookingBox from "@/components/cruise/BookingBox";

const WHATSAPP_NUMBER = "971558479933";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllCruiseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cruise = getCruiseBySlug(slug);

  if (!cruise) {
    return {};
  }

  return {
    title: cruise.seoTitle,
    description: cruise.seoDescription,
    alternates: {
      canonical: `/cruises/${cruise.slug}`,
    },
    // Placeholder pages are hidden from search engines until real content is added.
    robots: cruise.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: cruise.seoTitle,
      description: cruise.seoDescription,
      type: "website",
      images: [
        {
          url: cruise.heroImage.url,
          alt: cruise.heroImage.alt,
        },
      ],
    },
  };
}

export default async function CruiseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cruise = getCruiseBySlug(slug);

  if (!cruise) {
    notFound();
  }

  const waEnquiryUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I have a question about the ${cruise.title}`
  )}`;
  const waBookingUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I would like to book the ${cruise.title}`
  )}`;

  return (
    <article className="cruise-detail-page">
      {/* Hero */}
          {/* Hero */}
      <section className="hx-hero">
        <div className="hx-inner">
          <div className="hx-photos">
            <div className="hx-circle">
              <Image
                src={cruise.heroImage.url}
                alt={cruise.heroImage.alt}
                fill
                priority
                sizes="(min-width: 992px) 440px, 86vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            {cruise.images[1] && (
              <div className="hx-circle-small">
                <Image
                  src={cruise.images[1].url}
                  alt={cruise.images[1].alt}
                  fill
                  sizes="170px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <div className="hx-text">
            <p className="hx-welcome">Welcome to our</p>
            <h1 className="hx-title">{cruise.title}</h1>
            <p className="hx-sub">{cruise.subtitle}</p>
            <div className="hx-buttons">
              <a href="#book" className="hx-btn hx-btn-gold">
                Book Now
              </a>
              <a
                href={waEnquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hx-btn hx-btn-green"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content on the left, booking box on the right (on top on mobile) */}
      <div className="bk-layout">
        <div className="bk-main">
          <div className="cruise-content-container">
            <section className="cruise-section-block">
              <h2 className="cruise-section-heading">About {cruise.title}</h2>
              {/* DRAFT: review */}
              <p className="cruise-body-text">{cruise.intro}</p>

              <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "25px 0 10px", color: "#000" }}>
                Inclusions
              </h3>
              <ul className="cruise-inclusions-list">
                {cruise.inclusions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="cruise-map-link-wrap">
                <strong>Location map:</strong>{" "}
                {cruise.mapUrl.startsWith("http") ? (
                  <a
                    href={cruise.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--linkblue)", textDecoration: "underline" }}
                  >
                    View Departure Location
                  </a>
                ) : (
                  <span>{cruise.mapUrl}</span>
                )}
              </div>
            </section>

            <section className="cruise-section-block">
              <h2 className="cruise-section-heading">What to Expect</h2>
              {cruise.whatToExpect.map((para, idx) => (
                // DRAFT: review
                <p key={idx} className="cruise-body-text">
                  {para}
                </p>
              ))}
            </section>

            <section className="cruise-section-block">
              <h2 className="cruise-section-heading">Food, Drinks and Entertainment</h2>
              {cruise.foodAndEntertainment.map((item, idx) => (
                // DRAFT: review
                <p key={idx} className="cruise-body-text">
                  {item}
                </p>
              ))}
            </section>

            <section className="cruise-section-block">
              <h2 className="cruise-section-heading">Why Choose Us</h2>
              <ul className="cruise-why-list">
                {cruise.whyChoose.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </section>

            {cruise.galleryImages.length > 0 && (
              <section className="cruise-section-block">
                <h2 className="cruise-section-heading">Cruise Gallery</h2>
                <div className="cruise-gallery-grid">
                  {cruise.galleryImages.map((img, idx) => (
                    <div key={idx} className="cruise-gallery-item">
                      <Image
                        src={img.url}
                        alt={img.alt}
                        width={400}
                        height={250}
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <aside className="bk-aside" id="book">
          <BookingBox
            cruiseTitle={cruise.title}
            startingPrice={cruise.startingPrice}
            whatsappNumber={WHATSAPP_NUMBER}
          />
        </aside>
      </div>

      {/* FAQ */}
      <Faq
        title={`${cruise.title} FAQs`}
        items={cruise.faqs.map((f) => ({ q: f.question, a: f.answer }))}
      />

      {/* Bottom strip */}
      <aside className="cruise-bottom-strip">
        <div className="cruise-bottom-strip-inner">
          <div className="strip-price">
            Starting from: <span>{cruise.startingPrice}</span>
          </div>
          <div className="strip-buttons">
            <a href="tel:+971558479933" className="strip-call-btn">
              Call: +971558479933
            </a>
            <a
              href={waBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="strip-wa-btn"
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </aside>
    </article>
  );
}