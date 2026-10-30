"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#top"
      className={`cd-top${showTop ? " cd-is-visible" : ""}`}
      onClick={toTop}
      aria-label="Back to top"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      >
        <path d="M4 15 L12 7 L20 15" />
      </svg>
    </a>
  );
}
