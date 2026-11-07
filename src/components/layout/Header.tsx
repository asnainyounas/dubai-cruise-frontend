"use client";
import Logo from "./Logo"
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/nav";


const WHATSAPP_NUMBER = "971558479933";
const WHATSAPP_LABEL = "+971 55 847 9933";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const enabledNavItems = NAV_ITEMS.filter((item) => item.enabled && item.href !== "/book");
  const bookNowItem = NAV_ITEMS.find((item) => item.href === "/book" && item.enabled);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <nav>
        <div className="top-header">
          <Link className="navbar-brand" href="/">
            <Logo />
          </Link>
          <div className="top-header-right">
            <ul className="top-contact-ul">
              <li>
                <a
                  className="top-wa-link"
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon" /> WhatsApp : {WHATSAPP_LABEL}
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="navbar-toggle"
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="bottom-header">
          <div className="dcontainer">
            <ul className={`nav-ul${open ? " open" : ""}`}>
              {enabledNavItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className={active ? "nav-active" : undefined}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} onClick={() => setOpen(false)}>
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
              {bookNowItem && (
                <li>
                  {/* Sends visitors to the cruise cards; each card has its own Book Online button. */}
                  <Link href="/#packages" className="BookNowBTN" onClick={() => setOpen(false)}>
                    {bookNowItem.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}