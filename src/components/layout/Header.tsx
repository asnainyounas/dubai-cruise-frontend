"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CDN } from "@/data/home";
import { NAV_ITEMS } from "@/data/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const enabledNavItems = NAV_ITEMS.filter((item) => item.enabled && item.href !== "/book");
  const bookNowItem = NAV_ITEMS.find((item) => item.href === "/book" && item.enabled);

  return (
    <header className="site-header">
      <nav>
        <div className="top-header">
          <Link className="navbar-brand" href="/">
            <Image
              src={`${CDN}/img/logo.png`}
              width={360}
              height={96}
              alt="Dhow Cruise in Dubai Logo"
              priority
            />
          </Link>
          <div className="top-header-right">
            <a
              className="advertise-logo"
              href="https://api.whatsapp.com/send?phone=+971565481752&text=Hello_Charter%20For%20Special%20Events"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="https://www.dhowcruiseindubai.com/img/special-events.gif"
                alt="dhow special events"
                height={40}
                width={314}
                unoptimized
              />
            </a>
            <ul className="top-contact-ul">
              <li>
                <span className="icon" /> Call : +971 42087433
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
              {enabledNavItems.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("/") ? (
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              {bookNowItem && (
                <li>
                  <Link
                    href={bookNowItem.href}
                    className="BookNowBTN"
                    onClick={() => setOpen(false)}
                  >
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
