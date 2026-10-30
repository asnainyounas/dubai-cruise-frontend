"use client";

import { useEffect } from "react";

export default function AosInitializer() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-aos]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("aos-animate"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
