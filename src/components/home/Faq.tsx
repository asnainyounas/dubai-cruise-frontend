"use client";

import { useState } from "react";
import Image from "next/image";
import { FAQS_MAIN, FAQS_EXTRA } from "@/data/home";

function FaqItem({
  number,
  q,
  a,
  open,
  onToggle,
}: {
  number: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`faq-panel${open ? " active" : ""}`}>
      <div className="faq-heading">
        <div className="faq-q" onClick={onToggle} role="button" tabIndex={0}>
          <span className="faq-number">{number}</span> {q}
          <span className="faq-chev" />
        </div>
      </div>
      {open && <div className="faq-body">{a}</div>}
    </div>
  );
}

export interface FaqProps {
  items?: { q: string; a: string }[];
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Faq({
  items,
  title = "Frequently Asked Questions",
  imageSrc = "/img/faq's.jpg",
  imageAlt = "Dhow cruise faqs",
}: FaqProps = {}) {
  const [openIdx, setOpenIdx] = useState(0);
  const [showExtra, setShowExtra] = useState(false);

  const mainItems = items ? items.slice(0, 5) : FAQS_MAIN;
  const extraItems = items ? items.slice(5) : FAQS_EXTRA;

  const toggle = (i: number) => setOpenIdx((cur) => (cur === i ? -1 : i));

  return (
    <section className="general-row faq-section" id="faq">
      <div className="dcontainer-fluid">
        <div className="text-center">
          <div className="main-title mb30">{title}</div>
        </div>
        <div className="faq-grid">
          <div className="faq-img">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={420}
              height={420}
            />
          </div>
          <div className="faq-list">
            <div className="wrapper">
              {mainItems.map((item, i) => (
                <FaqItem
                  key={item.q}
                  number={i + 1}
                  q={item.q}
                  a={item.a}
                  open={openIdx === i}
                  onToggle={() => toggle(i)}
                />
              ))}
              {extraItems.length > 0 && (
                <>
                  <div className={`faq-extra${showExtra ? " open" : ""}`}>
                    {extraItems.map((item, i) => (
                      <FaqItem
                        key={item.q}
                        number={mainItems.length + i + 1}
                        q={item.q}
                        a={item.a}
                        open={openIdx === mainItems.length + i}
                        onToggle={() => toggle(mainItems.length + i)}
                      />
                    ))}
                  </div>
                  <a
                    className="load-question"
                    onClick={() => setShowExtra((s) => !s)}
                    role="button"
                    tabIndex={0}
                  >
                    {showExtra ? "Show less Questions" : "Load more Questions"}{" "}
                    <i aria-hidden="true">›</i>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
