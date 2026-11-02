import type { Metadata } from "next";
import Faq from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about our dhow cruises in Dubai and how to book.",
  alternates: { canonical: "/faqs" },
  // Placeholder page: remove this line when the TODO answers are filled in.
  robots: { index: false, follow: false },
};

const TODO = "TODO: add real details";

const FAQS = [
  {
    q: "What is a dhow?",
    a: "A dhow is a traditional wooden vessel that has been used for centuries around the Arabian Gulf. Dhow cruises in Dubai use boats built in this style.",
  },
  {
    q: "Where does the Creek cruise sail?",
    a: "Dubai Creek is a saltwater inlet between Bur Dubai and Deira, in the older part of the city.",
  },
  {
    q: "Where does the Marina cruise sail?",
    a: "Dubai Marina is a canal district on the Dubai coastline, surrounded by high-rise towers and waterfront walkways.",
  },
  {
    q: "What sailings does the Marina cruise offer?",
    a: `The Dubai Marina cruise has sunset and dinner sailings. Exact times: ${TODO}`,
  },
  {
    q: "How do I book?",
    a: "Use the booking box on any cruise page, or message us on WhatsApp +971558479933. Bookings are confirmed on WhatsApp.",
  },
  { q: "How much does a cruise cost?", a: `Prices: ${TODO}` },
  { q: "What is included?", a: `Inclusions: ${TODO}` },
  { q: "Is hotel pick-up and drop-off available?", a: `Pick-up and drop-off details: ${TODO}` },
  { q: "Is there a dress code?", a: `Dress code: ${TODO}` },
  { q: "Can I change or cancel my booking?", a: `Change and cancellation policy: ${TODO}` },
];

export default function FaqsPage() {
  return (
    <>
      <section className="hx-hero pg-hero">
        <h1 className="hx-title">Frequently Asked Questions</h1>
        <p className="hx-sub">Answers about our dhow cruises and how to book.</p>
      </section>
      <Faq title="Common Questions" items={FAQS} />
    </>
  );
}