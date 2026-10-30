"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SLIDES, VIDEO_URL } from "@/data/home";

function ArrowIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.6">
      {dir === "prev" ? <path d="M15 4 L7 12 L15 20" /> : <path d="M9 4 L17 12 L9 20" />}
    </svg>
  );
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (delta: number) =>
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);

  const trackStyle = {
    transform: `translateX(calc(50% - var(--slide-w) / 2 - ${index} * (var(--slide-w) + 20px) - 10px))`,
  };

  return (
    <section className="main-slider-section">
      <div className="ms-viewport">
        <div className="ms-track" style={trackStyle}>
          {SLIDES.map((slide, i) => (
            <div className={`ms-item${i === index ? " active" : ""}`} key={slide.src}>
              <Image
                src={slide.src}
                width={880}
                height={490}
                alt={slide.alt}
                priority={i === 0}
                style={{ width: "100%", height: "auto" }}
              />
              <span className="ms-play">
                <button
                  type="button"
                  className="video-play-button"
                  aria-label="Play video"
                  onClick={() => setVideoOpen(true)}
                >
                  <span />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="ms-nav ms-prev"
        aria-label="Previous slide"
        onClick={() => go(-1)}
      >
        <ArrowIcon dir="prev" />
      </button>
      <button
        type="button"
        className="ms-nav ms-next"
        aria-label="Next slide"
        onClick={() => go(1)}
      >
        <ArrowIcon dir="next" />
      </button>

      <div className="ms-dots">
        {SLIDES.map((slide, i) => (
          <button
            type="button"
            key={slide.src}
            className={`ms-dot${i === index ? " active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {videoOpen && (
        <div className="video-modal" onClick={() => setVideoOpen(false)}>
          <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              aria-label="Close"
              onClick={() => setVideoOpen(false)}
            >
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
