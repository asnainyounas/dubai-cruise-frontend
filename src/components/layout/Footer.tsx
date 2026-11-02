import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/data/nav";
import ScrollToTop from "./ScrollToTop";

const POWERED_LOGO =
  "https://d1vqfl8cu8qgdj.cloudfront.net/assets/small_website/image/BDS/white-r-logos.png";

export default function Footer() {
  const enabledFooterLinks = FOOTER_LINKS.filter((link) => link.enabled);

  return (
    <footer className="footer_block" id="contact">
      {/* Fixed bottom bar on mobile */}
      <div className="top-footer">
        <div className="dcontainer-fluid">
          <div className="top-footer-icon">
            <a href="tel:+97142087433" className="top-footer-icon-block call-icon">
              <span>+97142087433</span>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=+971565481752&text=Hello_DhowCruiseinDubai"
              target="_blank"
              rel="noreferrer"
              className="top-footer-icon-block whatsapp-icon"
              aria-label="WhatsApp"
            />
            <a
              href="mailto:info@dhowcruiseindubai.com"
              className="top-footer-icon-block message-icon"
              aria-label="Email Us"
            />
          </div>
        </div>
      </div>

      <div className="bottom-footer">
        <div className="dcontainer-fluid">
          <div className="footer-grid">
            <div className="footer-block footer-powered">
              <div className="footer-logo">
                <span>Powered By</span>
                <Image
                  src={POWERED_LOGO}
                  alt="rayna logo"
                  width={140}
                  height={50}
                  style={{ width: "auto", height: "auto", maxHeight: "60px", maxWidth: "100%" }}
                />
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
                  <p>© 2026 dhowcruiseindubai.com </p>
                </div>
                <div className="footer-copyright dev-line">
                  <p>
                    Design and Developed By{" "}
                    <span className="gold">Technoheaven Consultancy</span>{" "}
                  </p>
                </div>
              </div>
              <ul className="social-ul">
                <li>
                  <a
                    href="https://www.facebook.com/dhowcruisesindubai"
                    className="social-icon-li facebook"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noreferrer"
                  />
                </li>
                <li>
                  <a
                    href="https://twitter.com/raynagroup"
                    className="social-icon-li twitter"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noreferrer"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}
