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
        <div className="drow">
          <div
            className="col-lg-5 col-md-5 col-sm-6 col-xs-12 aos-init"
            data-aos="fade-right"
            style={{ transitionDuration: "2000ms" }}
          >
            <div className="about-img">
              <Image
                src={WELCOME_DATA.image.src}
                width={WELCOME_DATA.image.width}
                height={WELCOME_DATA.image.height}
                alt={WELCOME_DATA.image.alt}
              />
            </div>
          </div>
          <div
            className="col-lg-7 col-md-7 col-sm-6 col-xs-12 about-col aos-init"
            data-aos="fade-left"
            style={{ transitionDuration: "2000ms" }}
          >
            {WELCOME_DATA.introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
            <div>
              {WELCOME_DATA.adventureText.before}
              <h2 className="conh2"> {WELCOME_DATA.adventureText.highlight} </h2>
              {WELCOME_DATA.adventureText.after}
            </div>
            {expanded && (
              <span>
                {WELCOME_DATA.expandedParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                <p>
                  {WELCOME_DATA.bookingLink.prefix}
                  <a href={WELCOME_DATA.bookingLink.url}>
                    {" "}
                    {WELCOME_DATA.bookingLink.text}
                  </a>{" "}
                  {WELCOME_DATA.bookingLink.suffix}
                </p>
              </span>
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
