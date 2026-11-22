import type { Metadata } from "next";
import Faq from "@/components/home/Faq";
import { FAQS_EXTRA, FAQS_MAIN } from "@/data/home";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about our Dubai Marina and Dubai Creek dinner cruises: prices, sailing times, what is included, pick-up, children and how to book.",
  alternates: { canonical: "/faqs" },
};

// General questions first, then the cruise questions shared with the home page.
const INTRO_FAQS = [
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
];

const FAQS = [...INTRO_FAQS, ...FAQS_MAIN, ...FAQS_EXTRA];

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