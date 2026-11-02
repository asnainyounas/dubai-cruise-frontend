"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function refreshAos(): IntersectionObserver | undefined {
  if (typeof document === "undefined") return;

  const els = document.querySelectorAll<HTMLElement>("[data-aos]");
  if (els.length === 0) return;

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

  els.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("aos-animate");
    } else {
      io.observe(el);
    }
  });

  return io;
}

// Expose AOS globally with refreshHard()
if (typeof window !== "undefined") {
  (window as unknown as { AOS: { init: () => void; refresh: () => void; refreshHard: () => void } }).AOS = {
    init: () => {
      refreshAos();
    },
    refresh: () => {
      refreshAos();
    },
    refreshHard: () => {
      refreshAos();
    },
  };
}

export default function AosInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | undefined;

    // Call AOS.refreshHard() after new page mounts on every route change
    const frameId = requestAnimationFrame(() => {
      if (
        typeof window !== "undefined" &&
        (window as unknown as { AOS?: { refreshHard?: () => void } }).AOS?.refreshHard
      ) {
        (window as unknown as { AOS: { refreshHard: () => void } }).AOS.refreshHard();
      } else {
        io = refreshAos();
      }
    });

    // Safety fallback: ensure content cannot stay hidden if JS is slow or fails
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll("[data-aos]:not(.aos-animate)").forEach((el) => {
        el.classList.add("aos-animate");
      });
    }, 1200);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(fallbackTimer);
      if (io) io.disconnect();
    };
  }, [pathname]);

  return null;
}
