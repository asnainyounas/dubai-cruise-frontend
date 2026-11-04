import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Premium Menu",
  description:
    "See the premium dinner menu: salads, main course dishes, desserts and beverages.",
  alternates: { canonical: "/menu" },
};

const WHATSAPP_NUMBER = "971558479933";
const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello, I would like to book a dhow cruise"
)}`;

interface MenuSection {
  title: string;
  items: string[];
}

const LEFT: MenuSection[] = [
  {
    title: "Salads",
    items: ["Green Salad", "Mix Raita", "Arabic Mix Salad", "Hummus"],
  },
  {
    title: "Desserts",
    items: ["Mix Fruit Custard", "Plain Custard", "Omali"],
  },
  {
    title: "Beverages",
    items: ["Soft Drinks", "Mineral Water"],
  },
];

const RIGHT: MenuSection[] = [
  {
    title: "Main Course",
    items: [
      "Dam Biryani",
      "Ghee Rice",
      "Pasta",
      "Mix Vegetables",
      "Schezwan Noodles",
      "Shahi Daal",
      "Chicken Karahi",
      "Shish Tawook",
      "Lamb Kabab",
      "Fish Fillet",
      "Arabic Bread or Tandoori Roti",
    ],
  },
];

function MenuCard({ title, items }: MenuSection) {
  return (
    <section className="mn-card">
      <h2 className="mn-heading">{title}</h2>
      <ul className="mn-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function MenuPage() {
  return (
    <>
      <section className="hx-hero pg-hero">
        <h1 className="hx-title">Premium Menu</h1>
        <p className="hx-sub">Salads, main course, desserts and beverages.</p>
      </section>

      <div className="cruise-content-container pg-body">
        <div className="mn-grid">
          <div className="mn-col">
            {LEFT.map((s) => (
              <MenuCard key={s.title} {...s} />
            ))}
          </div>
          <div className="mn-col">
            {RIGHT.map((s) => (
              <MenuCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        <div className="mn-cta">
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-book-now">
            Book on WhatsApp
          </a>{" "}
          <Link href="/#packages" className="btn-enquire-now" style={{ color: "#0f3a56", borderColor: "#0f3a56" }}>
            View Cruises
          </Link>
        </div>
      </div>
    </>
  );
}