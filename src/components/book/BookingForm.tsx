"use client";

import { useState } from "react";

export interface TourOption {
  slug: string;
  title: string;
}

interface BookingFormProps {
  initialTourSlug?: string;
  tours: TourOption[];
}

export default function BookingForm({ initialTourSlug, tours }: BookingFormProps) {
  const defaultSlug =
    tours.find((t) => t.slug === initialTourSlug)?.slug || tours[0]?.slug || "";

  const [tourSlug, setTourSlug] = useState(defaultSlug);
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Minimum date is today (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!tourSlug) {
      newErrors.tour = "Please select a cruise tour.";
    }
    if (!date) {
      newErrors.date = "Please select a tour date.";
    } else if (date < today) {
      newErrors.date = "The date cannot be in the past.";
    }
    if (!adults || adults < 1) {
      newErrors.adults = "At least 1 adult is required.";
    }
    if (children < 0) {
      newErrors.children = "Children count cannot be negative.";
    }
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }
    if (!phone.trim() || phone.trim().length < 6) {
      newErrors.phone = "Please enter a valid phone or WhatsApp number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const selectedTour = tours.find((t) => t.slug === tourSlug) || tours[0];

    const messageLines = [
      `*Dhow Cruise Booking Enquiry*`,
      `Tour: ${selectedTour.title}`,
      `Date: ${date}`,
      `Adults: ${adults}`,
      `Children: ${children}`,
      `Full Name: ${fullName.trim()}`,
      `Phone/WhatsApp: ${phone.trim()}`,
    ];
    if (notes.trim()) {
      messageLines.push(`Notes: ${notes.trim()}`);
    }

    const waText = messageLines.join("\n");
    const waUrl = `https://wa.me/971558479933?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp in a new tab without calling any API or backend
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="booking-card">
      <form onSubmit={handleSubmit} noValidate>
        {/* Tour Selection */}
        <div className="form-group">
          <label htmlFor="tour" className="form-label">
            Select Cruise Tour <span className="required">*</span>
          </label>
          <select
            id="tour"
            name="tour"
            value={tourSlug}
            onChange={(e) => {
              setTourSlug(e.target.value);
              if (errors.tour) setErrors((prev) => ({ ...prev, tour: "" }));
            }}
            className={`form-input${errors.tour ? " input-error" : ""}`}
          >
            {tours.map((t) => (
              <option
                key={t.slug}
                value={t.slug}
                selected={t.slug === defaultSlug}
              >
                {t.title}
              </option>
            ))}
          </select>
          {errors.tour && <span className="error-text">{errors.tour}</span>}
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date of Cruise <span className="required">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            min={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
            }}
            className={`form-input${errors.date ? " input-error" : ""}`}
            required
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        {/* Guests Row */}
        <div className="form-row">
          <div className="form-group form-col">
            <label htmlFor="adults" className="form-label">
              Adults (12+ yrs) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              min="1"
              value={adults}
              onChange={(e) => {
                setAdults(parseInt(e.target.value, 10) || 1);
                if (errors.adults) setErrors((prev) => ({ ...prev, adults: "" }));
              }}
              className={`form-input${errors.adults ? " input-error" : ""}`}
              required
            />
            {errors.adults && <span className="error-text">{errors.adults}</span>}
          </div>

          <div className="form-group form-col">
            <label htmlFor="children" className="form-label">
              Children (3-11 yrs)
            </label>
            <input
              type="number"
              id="children"
              name="children"
              min="0"
              value={children}
              onChange={(e) => {
                setChildren(parseInt(e.target.value, 10) || 0);
                if (errors.children) setErrors((prev) => ({ ...prev, children: "" }));
              }}
              className={`form-input${errors.children ? " input-error" : ""}`}
            />
            {errors.children && <span className="error-text">{errors.children}</span>}
          </div>
        </div>

        {/* Contact Details Row */}
        <div className="form-row">
          <div className="form-group form-col">
            <label htmlFor="fullName" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
              }}
              className={`form-input${errors.fullName ? " input-error" : ""}`}
              required
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group form-col">
            <label htmlFor="phone" className="form-label">
              Phone / WhatsApp Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. +971 55 847 9933"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
              }}
              className={`form-input${errors.phone ? " input-error" : ""}`}
              required
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label htmlFor="notes" className="form-label">
            Special Requests / Dietary Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Special requests, vegetarian food, pick-up questions..."
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Informational confirmation text (Rule: Never say booking is confirmed) */}
        <div className="booking-info-banner">
          <span className="banner-icon">ℹ</span>
          <span>We will confirm your booking on WhatsApp</span>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-booking-btn">
            Send Booking Request via WhatsApp
          </button>
        </div>

        {submitted && (
          <div className="submitted-banner">
            <p>
              Your booking details have been opened in WhatsApp.
              <br />
              <strong>We will confirm your booking on WhatsApp</strong> shortly.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
