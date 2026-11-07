"use client";

import { useState } from "react";
import { MAP_COORDS, MAPS } from "@/data/business";

type RouteKey = "marina" | "creek";

interface RouteData {
  key: RouteKey;
  title: string;
  href: string;
}

const ROUTES_DATA: RouteData[] = [
  {
    key: "marina",
    title: "Dubai Marina Dinner Cruise Route",
    href: MAPS.marina,
  },
  {
    key: "creek",
    title: "Dhow Cruise Creek Route",
    href: MAPS.creek,
  },
];

export default function RoutesSection() {
  const [activeRoute, setActiveRoute] = useState<RouteKey>("marina");
  const currentCoords = MAP_COORDS[activeRoute];
  const iframeSrc = `https://www.google.com/maps?q=${currentCoords.lat},${currentCoords.lng}&z=16&output=embed`;
  const activeTitle = activeRoute === "marina" ? "Dubai Marina meeting point" : "Dubai Creek meeting point";

  return (
    <section className="general-row dhowcruise-route">
      <div className="dcontainer">
        <div className="route-grid">
          <div
            className="dhowcruise-route-map aos-init"
            data-aos="zoom-in"
            style={{ transitionDuration: "2000ms" }}
          >
            <iframe
              src={iframeSrc}
              width="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${activeTitle}`}
              style={{
                width: "100%",
                border: 0,
                borderRadius: "5px",
                boxShadow: "1px 3px 10px #848484",
                display: "block",
              }}
            />
          </div>
          <div
            className="dhowcruise-route-block aos-init"
            data-aos="fade-left"
            style={{ transitionDuration: "3000ms" }}
          >
            {ROUTES_DATA.map((route) => {
              const isActive = activeRoute === route.key;
              return (
                <div key={route.key}>
                  <div
                    className="main-title text-white"
                    onClick={() => setActiveRoute(route.key)}
                    role="button"
                    tabIndex={0}
                    style={{
                      cursor: "pointer",
                      color: isActive ? "var(--orange)" : "#fff",
                      textDecoration: isActive ? "underline" : "none",
                      textUnderlineOffset: "6px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {route.title}
                  </div>
                  <a
                    href={route.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="we-sub-btn we_background mb30"
                  >
                    <span className="Departure-block" />
                    Departure Location
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
