"use client";

import { useState, useEffect, useMemo, useRef, type FormEvent } from "react";
import { CARD_FEE_PERCENT } from "@/data/business";
import type {
  BackendDeparture,
  BackendDepartureListResponse,
  BackendBookingCreated,
} from "@/lib/backend-types";
import {
  groupDeparturesByDate,
  estimateTotal,
  buildWhatsAppBookingMessage,
  isValidPhone,
} from "@/lib/booking";

interface Props {
  cruiseTitle: string;
  cruiseSlug: string;
  startingPrice: string;
  whatsappNumber: string; // digits only, for example "971558479933"
}

function todayLocal(): string {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingBox({
  cruiseTitle,
  cruiseSlug,
  startingPrice,
  whatsappNumber,
}: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  const isBackendMode = Boolean(apiUrl);

  // Departures state (for backend mode)
  const [departures, setDepartures] = useState<BackendDeparture[] | null>(null);
  const [loadingDepartures, setLoadingDepartures] = useState(isBackendMode);
  const [departuresError, setDeparturesError] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(0);

  // Form field state
  const [selectedDateKey, setSelectedDateKey] = useState("");
  const [selectedSailingId, setSelectedSailingId] = useState("");
  const [date, setDate] = useState(""); // for whatsapp-only mode
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);

  // Success state
  const [bookingSuccess, setBookingSuccess] = useState<BackendBookingCreated | null>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  const hasPrice = !startingPrice.startsWith("TODO");

  // Fetch departures on mount or reload (backend mode only)
  useEffect(() => {
    if (!apiUrl) return;

    let active = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    fetch(`${apiUrl}/api/cruises/${cruiseSlug}/departures?days=60`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as BackendDepartureListResponse;
        if (active) {
          if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
            setDepartures(json.data);
            setDeparturesError(false);
          } else {
            setDeparturesError(true);
          }
          setLoadingDepartures(false);
        }
      })
      .catch(() => {
        clearTimeout(timeoutId);
        if (active) {
          setDeparturesError(true);
          setLoadingDepartures(false);
        }
      });

    return () => {
      active = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [apiUrl, cruiseSlug, reloadCounter]);

  // Group departures by date
  const groupedDates = useMemo(() => {
    return departures ? groupDeparturesByDate(departures) : [];
  }, [departures]);

  // Derive active date key (selected or first available)
  const activeDateKey =
    selectedDateKey && groupedDates.some((g) => g.dateKey === selectedDateKey)
      ? selectedDateKey
      : groupedDates.length > 0
      ? groupedDates[0].dateKey
      : "";

  // Available sailings for active date
  const availableSailings = useMemo(() => {
    if (!activeDateKey || !groupedDates.length) return [];
    const group = groupedDates.find((g) => g.dateKey === activeDateKey);
    return group ? group.sailings : [];
  }, [groupedDates, activeDateKey]);

  // Derive active sailing ID (selected or first available in group)
  const activeSailingId =
    selectedSailingId && availableSailings.some((s) => s.id === selectedSailingId)
      ? selectedSailingId
      : availableSailings.length > 0
      ? availableSailings[0].id
      : "";

  // Focus confirmation panel on success
  useEffect(() => {
    if (bookingSuccess) {
      confirmationRef.current?.focus();
    }
  }, [bookingSuccess]);

  // Current selected sailing details
  const currentSailing = availableSailings.find((s) => s.id === activeSailingId);
  const adultsNum = Number.parseInt(adults, 10) || 0;
  const childrenNum = Number.parseInt(children, 10) || 0;
  const estimatedTotal = estimateTotal(
    adultsNum,
    childrenNum,
    currentSailing?.adultPrice || 0,
    currentSailing?.childPrice || 0
  );

  // Reset form handler
  const handleReset = () => {
    setBookingSuccess(null);
    setError("");
    setShowWhatsAppFallback(false);
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setWebsite("");
    setAdults("2");
    setChildren("0");
    setSelectedDateKey("");
    setSelectedSailingId("");
  };

  // WhatsApp-only submit (used when backend is off or unavailable)
  const handleWhatsAppOnlySubmit = (e: FormEvent<HTMLFormElement>) => {
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

  // Backend mode submit
  const handleBackendSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setShowWhatsAppFallback(false);

    // Client-side validations
    if (!activeDateKey || !activeSailingId || !currentSailing) {
      setError("Please choose a date and sailing time.");
      return;
    }
    if (!Number.isInteger(adultsNum) || adultsNum < 1 || adultsNum > 50) {
      setError("Please enter between 1 and 50 adults.");
      return;
    }
    if (!Number.isInteger(childrenNum) || childrenNum < 0 || childrenNum > 50) {
      setError("Children must be between 0 and 50.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("Please enter a valid phone number with at least 7 digits.");
      return;
    }
    if (email.trim().length > 0 && !EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address, or leave it blank.");
      return;
    }

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const payload: Record<string, unknown> = {
      departureId: activeSailingId,
      adults: adultsNum,
      children: childrenNum,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        ...(email.trim() ? { email: email.trim() } : {}),
      },
      ...(notes.trim() ? { notes: notes.trim() } : {}),
      ...(website ? { website } : {}),
    };

    try {
      const res = await fetch(`${apiUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const json = await res.json().catch(() => null);

      if (res.status === 201 && json?.success && json?.data) {
        // Success outcome
        setBookingSuccess(json.data as BackendBookingCreated);
      } else if (res.status === 409) {
        // 409 or seats conflict: sailing no longer available
        setError("That sailing is no longer available. Please choose another.");
        setReloadCounter((c) => c + 1);
      } else if (res.status === 429) {
        // Rate limited
        setError("Too many requests from your connection. Please message us on WhatsApp instead.");
        setShowWhatsAppFallback(true);
      } else if (res.status === 400) {
        // Validation error
        const msg =
          typeof json?.message === "string" && json.message.length > 0
            ? json.message
            : "Please check your details and try again.";
        setError(msg);
      } else {
        // Other errors
        setError("We could not save your request. You can send it to us on WhatsApp instead.");
        setShowWhatsAppFallback(true);
      }
    } catch {
      clearTimeout(timeoutId);
      setError("We could not save your request. You can send it to us on WhatsApp instead.");
      setShowWhatsAppFallback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------------------------------------------------------
  // RENDER: Success confirmation panel
  // -------------------------------------------------------------------------
  if (bookingSuccess) {
    const selectedGroup = groupedDates.find((g) => g.dateKey === activeDateKey);
    const dateLabel = selectedGroup ? selectedGroup.label : activeDateKey;
    const timeLabel = currentSailing ? currentSailing.timeLabel : "";

    const waMsg = buildWhatsAppBookingMessage({
      reference: bookingSuccess.reference,
      cruiseTitle,
      dateLabel,
      timeLabel,
      adults: bookingSuccess.adults,
      children: bookingSuccess.children,
      name,
      total: bookingSuccess.totalPrice,
      currency: bookingSuccess.currency,
      notes,
    });
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

    return (
      <div className="bk-box bk-success-panel" aria-live="polite">
        <h2
          ref={confirmationRef}
          tabIndex={-1}
          className="bk-success-title"
          style={{ outline: "none" }}
        >
          Booking request received
        </h2>
        <div className="bk-success-ref">{bookingSuccess.reference}</div>

        <div className="bk-success-details">
          <p>
            <strong>Tour:</strong> {bookingSuccess.cruiseTitle || cruiseTitle}
          </p>
          <p>
            <strong>Date:</strong> {dateLabel}
          </p>
          <p>
            <strong>Sailing:</strong> {timeLabel}
          </p>
          <p>
            <strong>Guests:</strong> {bookingSuccess.adults} adult
            {bookingSuccess.adults > 1 ? "s" : ""}
            {bookingSuccess.children > 0
              ? `, ${bookingSuccess.children} child${bookingSuccess.children > 1 ? "ren" : ""}`
              : ""}
          </p>
          <p>
            <strong>Total:</strong> {bookingSuccess.totalPrice} {bookingSuccess.currency}
          </p>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-book-now bk-submit"
          style={{ display: "inline-block", textDecoration: "none" }}
        >
          Send this on WhatsApp to confirm
        </a>

        <p className="bk-success-note">
          Your booking is confirmed when we reply to you on WhatsApp.
        </p>

        <button type="button" onClick={handleReset} className="bk-reset-btn">
          Make another booking
        </button>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // RENDER: WhatsApp-only mode (when backend is off OR dates fetch failed)
  // -------------------------------------------------------------------------
  if (!isBackendMode || departuresError) {
    return (
      <form className="bk-box" onSubmit={handleWhatsAppOnlySubmit} noValidate>
        <h2 className="bk-title">Book {cruiseTitle}</h2>
        <p className="bk-price">
          {hasPrice ? `Starting from ${startingPrice}` : "Price confirmed on WhatsApp"}
        </p>

        {isBackendMode && departuresError && (
          <p className="bk-unavailable-note" role="note">
            Online booking is unavailable right now. You can still book on WhatsApp.
          </p>
        )}

        <label className="bk-field" htmlFor="bk-wo-date">
          <span>Date</span>
          <input
            id="bk-wo-date"
            type="date"
            value={date}
            min={todayLocal()}
            suppressHydrationWarning
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <div className="bk-row">
          <label className="bk-field" htmlFor="bk-wo-adults">
            <span>Adults</span>
            <input
              id="bk-wo-adults"
              type="number"
              min={1}
              max={99}
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
          </label>
          <label className="bk-field" htmlFor="bk-wo-children">
            <span>Children</span>
            <input
              id="bk-wo-children"
              type="number"
              min={0}
              max={99}
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />
          </label>
        </div>

        <label className="bk-field" htmlFor="bk-wo-name">
          <span>Your name</span>
          <input
            id="bk-wo-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="bk-field" htmlFor="bk-wo-notes">
          <span>Notes (optional)</span>
          <textarea
            id="bk-wo-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        {error && (
          <p className="bk-error" role="alert" aria-live="polite">
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

  // -------------------------------------------------------------------------
  // RENDER: Backend Mode (Loading or Departures Available)
  // -------------------------------------------------------------------------
  const selectedGroup = groupedDates.find((g) => g.dateKey === activeDateKey);
  const dateLabel = selectedGroup ? selectedGroup.label : activeDateKey;
  const timeLabel = currentSailing ? currentSailing.timeLabel : "";

  const fallbackMsg = buildWhatsAppBookingMessage({
    cruiseTitle,
    dateLabel,
    timeLabel,
    adults: adultsNum,
    children: childrenNum,
    name,
    total: estimatedTotal,
    currency: currentSailing?.currency || "AED",
    notes,
  });
  const fallbackUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fallbackMsg)}`;

  return (
    <form className="bk-box" onSubmit={handleBackendSubmit} noValidate>
      <h2 className="bk-title">Book {cruiseTitle}</h2>
      <p className="bk-price">
        {hasPrice ? `Starting from ${startingPrice}` : "Price confirmed on WhatsApp"}
      </p>

      {loadingDepartures && (
        <p className="bk-loading" aria-live="polite">
          Loading dates...
        </p>
      )}

      {/* Honeypot field (hidden from sighted users) */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="bk-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Date Select */}
      <label className="bk-field" htmlFor="bk-select-date">
        <span>Date</span>
        <select
          id="bk-select-date"
          value={activeDateKey}
          onChange={(e) => {
            setSelectedDateKey(e.target.value);
            setSelectedSailingId("");
          }}
          disabled={loadingDepartures}
        >
          {groupedDates.map((g) => (
            <option key={g.dateKey} value={g.dateKey}>
              {g.label}
            </option>
          ))}
        </select>
      </label>

      {/* Sailing Select */}
      <label className="bk-field" htmlFor="bk-select-sailing">
        <span>Sailing</span>
        <select
          id="bk-select-sailing"
          value={activeSailingId}
          onChange={(e) => setSelectedSailingId(e.target.value)}
          disabled={loadingDepartures || availableSailings.length === 0}
        >
          {availableSailings.map((s) => (
            <option key={s.id} value={s.id}>
              {s.timeLabel} - {s.adultPrice} {s.currency} per person
            </option>
          ))}
        </select>
      </label>

      {/* Guests row */}
      <div className="bk-row">
        <label className="bk-field" htmlFor="bk-adults">
          <span>Adults</span>
          <input
            id="bk-adults"
            type="number"
            min={1}
            max={50}
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
          />
        </label>
        <label className="bk-field" htmlFor="bk-children">
          <span>Children aged 3 and over</span>
          <input
            id="bk-children"
            type="number"
            min={0}
            max={50}
            value={children}
            onChange={(e) => setChildren(e.target.value)}
          />
        </label>
      </div>
      <p className="bk-field-hint">Children under 3 travel free. Do not count them.</p>

      {/* Total Box */}
      {currentSailing && (
        <div className="bk-total-box">
          <div className="bk-total-amount">
            Estimated total: {estimatedTotal} {currentSailing.currency}
          </div>
          <div className="bk-total-cardnote">
            Final total is confirmed on WhatsApp. If you pay by card, {CARD_FEE_PERCENT}% is
            added to the total.
          </div>
        </div>
      )}

      {/* Contact fields */}
      <label className="bk-field" htmlFor="bk-name">
        <span>Your name</span>
        <input
          id="bk-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="bk-field" htmlFor="bk-phone">
        <span>Phone / WhatsApp number</span>
        <input
          id="bk-phone"
          type="tel"
          placeholder="+971 50 123 4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <label className="bk-field" htmlFor="bk-email">
        <span>Email (optional)</span>
        <input
          id="bk-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="bk-field" htmlFor="bk-notes">
        <span>Notes (optional)</span>
        <textarea
          id="bk-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      {error && (
        <p className="bk-error" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      {showWhatsAppFallback && (
        <div style={{ marginBottom: "12px" }}>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-book-now bk-submit"
            style={{
              display: "inline-block",
              textAlign: "center",
              textDecoration: "none",
              background: "#25D366",
            }}
          >
            Send request on WhatsApp
          </a>
        </div>
      )}

      <button type="submit" className="btn-book-now bk-submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending booking request..." : "Request Booking"}
      </button>
      <p className="bk-note">We will confirm your booking on WhatsApp.</p>
    </form>
  );
}
