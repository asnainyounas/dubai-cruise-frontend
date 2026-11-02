import Link from "next/link";

export default function NotFound() {
  return (
    <section className="general-row" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="dcontainer text-center" style={{ maxWidth: "600px", padding: "60px 20px" }}>
        <p style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px", color: "var(--orange)", fontWeight: 700, marginBottom: "10px" }}>
          404 Error
        </p>
        <h1 className="main-title" style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "20px" }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.6, marginBottom: "30px" }}>
          The page you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>
        <div>
          <Link
            href="/"
            className="cruise-package-link"
            style={{
              display: "inline-block",
              background: "var(--purple)",
              color: "#fff",
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "0",
              transition: "0.3s",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
