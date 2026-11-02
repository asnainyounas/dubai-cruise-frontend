"use client";

import { useEffect, useState, type TransitionEvent } from "react";
import Image from "next/image";
import { SLIDES, VIDEO_URL } from "@/data/home";

const N = SLIDES.length;
// Three copies of the slides, so a slide is always visible on both sides.
const LOOP_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES];

function ArrowIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.6">
      {dir === "prev" ? <path d="M15 4 L7 12 L15 20" /> : <path d="M9 4 L17 12 L9 20" />}
    </svg>
  );
}

export default function HeroSlider() {
  const [pos, setPos] = useState(N); // start on the first slide of the middle copy
  const [animate, setAnimate] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);

  const go = (delta: number) => {
    setAnimate(true);
    setPos((p) => p + delta);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(true);
      setPos((p) => p + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // After sliding into a copy at the edge, jump back to the middle copy with no animation.
  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    const home = N + ((((pos - N) % N) + N) % N);
    if (home !== pos) {
      setAnimate(false);
      setPos(home);
    }
  };

  const current = ((pos % N) + N) % N;

  const trackStyle = {
    transform: `translateX(calc(50% - var(--slide-w) / 2 - ${pos} * (var(--slide-w) + 20px) - 10px))`,
    transition: animate ? "transform 0.6s ease" : "none",
  };

  return (
    <section className="main-slider-section">
      <div className="ms-viewport">
        <div
          className={`ms-track${animate ? "" : " no-anim"}`}
          style={trackStyle}
          onTransitionEnd={handleTransitionEnd}
        >
          {LOOP_SLIDES.map((slide, i) => (
            <div
              className={`ms-item${i === pos ? " active" : ""}`}
              key={i}
              aria-hidden={Math.floor(i / N) !== 1}
            >
              <Image
                src={slide.src}
                width={880}
                height={495}
                alt={slide.alt}
                priority={i === N}
                style={{ width: "100%", height: "auto", aspectRatio: "16 / 9", objectFit: "cover" }}
              />
              <span className="ms-play">
                <button
                  type="button"
                  className="video-play-button"
                  aria-label="Play video"
                  tabIndex={i === pos ? 0 : -1}
                  onClick={() => setVideoOpen(true)}
                >
                  <span />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="ms-nav ms-prev" aria-label="Previous slide" onClick={() => go(-1)}>
        <ArrowIcon dir="prev" />
      </button>
      <button type="button" className="ms-nav ms-next" aria-label="Next slide" onClick={() => go(1)}>
        <ArrowIcon dir="next" />
      </button>

      <div className="ms-dots">
        {SLIDES.map((slide, i) => (
          <button
            type="button"
            key={slide.src}
            className={`ms-dot${i === current ? " active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setAnimate(true);
              setPos(N + i);
            }}
          />
        ))}
      </div>

      {videoOpen && (
        <div className="video-modal" onClick={() => setVideoOpen(false)}>
          <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="video-modal-close" aria-label="Close" onClick={() => setVideoOpen(false)}>
              ×
            </button>
            <div className="video-modal-body">
              <video src={VIDEO_URL} width="100%" controls autoPlay />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}