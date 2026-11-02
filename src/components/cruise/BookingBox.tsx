"use client";

import { useState, type FormEvent } from "react";

interface Props {
  cruiseTitle: string;
  startingPrice: string;
  whatsappNumber: string; // digits only, for example "971558479933"
}

function todayLocal(): string {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export default function BookingBox({ cruiseTitle, startingPrice, whatsappNumber }: Props) {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const hasPrice = !startingPrice.startsWith("TODO");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adultsN = Number.parseInt(adults, 10);
    const childrenN = Number.parseInt(children, 10);

    if (!date) return setError("Please choose a date.");
    if (date < todayLocal()) return setError("Please choose today or a later date.");
    if (!Number.isInteger(adultsN) || adultsN < 1 || adultsN > 99)
      return setError("Please enter at least 1 adult.");
    if (!Number.isInteger(childrenN) || childrenN < 0 || childrenN > 99)
      return setError("Children must be 0 or more.");
    if (!name.trim()) return setError("Please enter your name.");

    setError("");
    const lines = [
      "Hello, I would like to book:",
      `Tour: ${cruiseTitle}`,
      `Date: ${date}`,
      `Adults: ${adultsN}`,
      `Children: ${childrenN}`,
      `Name: ${name.trim()}`,
    ];
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="bk-box" onSubmit={handleSubmit} noValidate>
      <h2 className="bk-title">Book {cruiseTitle}</h2>
      <p className="bk-price">
        {hasPrice ? `Starting from ${startingPrice}` : "Price confirmed on WhatsApp"}
      </p>

      <label className="bk-field">
        <span>Date</span>
        <input
          type="date"
          value={date}
          min={todayLocal()}
          suppressHydrationWarning
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <div className="bk-row">
        <label className="bk-field">
          <span>Adults</span>
          <input
            type="number"
            min={1}
            max={99}
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
          />
        </label>
        <label className="bk-field">
          <span>Children</span>
          <input
            type="number"
            min={0}
            max={99}
            value={children}
            onChange={(e) => setChildren(e.target.value)}
          />
        </label>
      </div>

      <label className="bk-field">
        <span>Your name</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label className="bk-field">
        <span>Notes (optional)</span>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      {error && (
        <p className="bk-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn-book-now bk-submit">
        Book on WhatsApp
      </button>
      <p className="bk-note">We will confirm your booking on WhatsApp.</p>
    </form>
  );
}