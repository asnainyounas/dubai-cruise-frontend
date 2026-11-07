import { BUSINESS } from "@/data/business";

export default function Logo() {
  return (
    <span className="site-logo">
      <svg viewBox="0 0 64 64" width="46" height="46" aria-hidden="true" focusable="false">
        <path d="M30 6 L30 40 L8 40 Z" fill="#f26b21" />
        <path d="M34 14 L34 40 L52 40 Z" fill="#f7a35c" />
        <path d="M6 44 H58 L52 56 H14 Z" fill="#0f3a56" />
      </svg>
      <span className="site-logo-text">
        <strong>{BUSINESS.name}</strong>
        <small>Dinner cruises in Dubai</small>
      </span>
    </span>
  );
}
