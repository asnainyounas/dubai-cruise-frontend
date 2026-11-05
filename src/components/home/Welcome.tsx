"use client";

import { useState } from "react";
import Image from "next/image";
import { WELCOME_DATA } from "@/data/home";

export default function Welcome() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="general-row" id="about">
      <div className="dcontainer">
        <div className="text-center">
          <div className="main-title mb30">
            {WELCOME_DATA.titlePrefix}{" "}
            <h1 className="herh">{WELCOME_DATA.titleHighlight}</h1>
          </div>
        </div>
        <div className="wl-grid">
          <div
            className="wl-photo aos-init"
            data-aos="fade-right"
            style={{ transitionDuration: "2000ms" }}
          >
            <Image
              src={WELCOME_DATA.image.src}
              width={WELCOME_DATA.image.width}
              height={WELCOME_DATA.image.height}
              alt={WELCOME_DATA.image.alt}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "16 / 10",
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </div>
          <div
            className="wl-text about-col aos-init"
            data-aos="fade-left"
            style={{ transitionDuration: "2000ms" }}
          >
            {WELCOME_DATA.introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
            <p>
              {WELCOME_DATA.adventureText.before}
              <strong className="conh2">{WELCOME_DATA.adventureText.highlight}</strong>
              {WELCOME_DATA.adventureText.after}
            </p>
            {expanded && (
              <>
                {WELCOME_DATA.expandedParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                <p>
                  {WELCOME_DATA.bookingLink.prefix}{" "}
                  <a href={WELCOME_DATA.bookingLink.url}>{WELCOME_DATA.bookingLink.text}</a>{" "}
                  {WELCOME_DATA.bookingLink.suffix}
                </p>
              </>
            )}
            <a
              className="main-link"
              onClick={() => setExpanded((e) => !e)}
              role="button"
              tabIndex={0}
            >
              {expanded ? "Read less..." : "Read more..."}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}