import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AosInitializer from "@/components/home/AosInitializer";
import { BUSINESS, CURRENCY, PRICE } from "@/data/business";

const mainFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-main",
});
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const TITLE = `Dhow Cruise Dubai from ${PRICE.creek} ${CURRENCY} | Marina and Creek Dinner Cruises`;
const DESCRIPTION = `Two-hour dinner cruises in Dubai Marina and on Dubai Creek with a buffet dinner, live shows and music, from ${PRICE.creek} ${CURRENCY} per person. Book on WhatsApp.`;
const OG_IMAGE = "/img/boat-4.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BUSINESS.name}`,
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: BUSINESS.name,
    images: [{ url: OG_IMAGE, alt: "Dubai Marina dinner cruise boat lit up at night" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mainFont.variable}>
      <body>
        <div id="top">
          <Header />
          <main>{children}</main>
          <Footer />
          <AosInitializer />
        </div>
      </body>
    </html>
  );
}