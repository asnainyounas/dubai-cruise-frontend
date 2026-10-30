import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AosInitializer from "@/components/home/AosInitializer";

export const metadata: Metadata = {
  title: "Dhow Cruise Dubai, Dhow Cruise Dinner Deals - Price @61 AED",
  description:
    "Enjoy delicious dhow cruise dinner with tanoura show and entertainment show in the tranquil water of Dubai creek and marina Dubai.",
  openGraph: {
    title: "Dhow Cruise in Dubai, Dinner and Sightseeing Tour",
    description:
      "Enjoy delicious dhow cruise dinner with tanoura show and entertainment show in the tranquil water of Dubai creek and marina Dubai.",
    type: "website",
    images: [
      {
        url: "https://d1vqfl8cu8qgdj.cloudfront.net/assets/Dhowcruise/img/dhowcruiseog.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhow Cruise in Dubai, Dinner and Sightseeing Tour",
    images: [
      "https://d1vqfl8cu8qgdj.cloudfront.net/assets/Dhowcruise/img/dhowcruiseog.jpg",
    ],
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
    <html lang="en">
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
