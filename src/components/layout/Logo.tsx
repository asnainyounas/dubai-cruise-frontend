export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 96"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Arabian Dhow Cruise"
    >
      {/* Sails */}
      <path d="M46 12 C46 12 14 44 10 62 L46 62 Z" fill="#c8963e" />
      <path d="M50 24 L50 62 L80 62 C76 48 64 34 50 24 Z" fill="#0f3a56" />
      {/* Mast */}
      <line x1="46" y1="10" x2="46" y2="66" stroke="#0f3a56" strokeWidth="2" />
      {/* Hull */}
      <path d="M6 66 H88 C84 76 76 82 66 82 H28 C18 82 10 76 6 66 Z" fill="#0f3a56" />
      {/* Waves */}
      <path
        d="M6 90 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0"
        fill="none"
        stroke="#c8963e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Name */}
      <text x="104" y="50" fontFamily="Georgia, 'Times New Roman', serif" fontSize="40" fontWeight="700" fill="#0f3a56">
        Arabian
      </text>
      <text x="106" y="78" fontFamily="Georgia, 'Times New Roman', serif" fontSize="20" fontWeight="700" letterSpacing="4" fill="#c8963e">
        DHOW CRUISE
      </text>
    </svg>
  );
}