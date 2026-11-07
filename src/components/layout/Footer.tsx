import Link from "next/link";
import { FOOTER_LINKS } from "@/data/nav";
import ScrollToTop from "./ScrollToTop";
import { BUSINESS, OFFICE } from "@/data/business";
// ---- Business details: edit these here, nothing else in this file needs changing ----
const BUSINESS_NAME = BUSINESS.name;
const WHATSAPP_NUMBER = BUSINESS.whatsappNumber;
const EMAIL = BUSINESS.email;

const SOCIAL_LINKS: { label: string; href: string; className: "facebook" | "twitter" }[] = [];

const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello, I would like to book a dhow cruise"
)}`;

export default function Footer() {
  const enabledFooterLinks = FOOTER_LINKS.filter((link) => link.enabled);

  return (
    <footer className="footer_block" id="contact">
      {/* Fixed bottom bar on mobile */}
      <div className="top-footer">
        <div className="dcontainer-fluid">
          <div className="top-footer-icon">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="top-footer-icon-block call-icon">
              <span>+{WHATSAPP_NUMBER}</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="top-footer-icon-block whatsapp-icon"
              aria-label="WhatsApp"
            />
            {EMAIL && (
              <a
                href={`mailto:${EMAIL}`}
                className="top-footer-icon-block message-icon"
                aria-label="Email Us"
              />
            )}
          </div>
        </div>
      </div>

      <div className="bottom-footer">
        <div className="dcontainer-fluid">
          <div className="footer-grid">
            <div className="footer-block footer-powered">
                           <div className="footer-logo">
                <span className="footer-brand-name">{BUSINESS_NAME}</span>
                <p className="ft-office">
                  {OFFICE.name}, {OFFICE.address}
                  <br />
                  Open {OFFICE.hours}
                </p>
              </div>
            </div>
            <div className="footer-block footer-links">
              <ul className="href-ul">
                {enabledFooterLinks.map((link) => (
                  <li key={link.label}>
                    <i aria-hidden="true">›</i>
                    <Link href={link.href}> {link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-block footer-copy">
              <div className="footer-copy-text">
                <div className="footer-copyright">
                  <p>
                    © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
                  </p>
                </div>
              </div>
              {SOCIAL_LINKS.length > 0 && (
                <ul className="social-ul">
                  {SOCIAL_LINKS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        className={`social-icon-li ${s.className}`}
                        aria-label={s.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}