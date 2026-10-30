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

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  const [showExtra, setShowExtra] = useState(false);

  const toggle = (i: number) => setOpenIdx((cur) => (cur === i ? -1 : i));

  return (
    <section className="general-row faq-section" id="faq">
      <div className="dcontainer-fluid">
        <div className="text-center">
          <div className="main-title mb30">Frequently Asked Questions</div>
        </div>
        <div className="faq-grid">
          <div className="faq-img">
            <Image
              src="/img/faq's.jpg"
              alt="Dhow cruise faqs"
              width={420}
              height={420}
            />
          </div>
          <div className="faq-list">
            <div className="wrapper">
              {FAQS_MAIN.map((item, i) => (
                <FaqItem
                  key={item.q}
                  number={i + 1}
                  q={item.q}
                  a={item.a}
                  open={openIdx === i}
                  onToggle={() => toggle(i)}
                />
              ))}
              <div className={`faq-extra${showExtra ? " open" : ""}`}>
                {FAQS_EXTRA.map((item, i) => (
                  <FaqItem
                    key={item.q}
                    number={FAQS_MAIN.length + i + 1}
                    q={item.q}
                    a={item.a}
                    open={openIdx === FAQS_MAIN.length + i}
                    onToggle={() => toggle(FAQS_MAIN.length + i)}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
