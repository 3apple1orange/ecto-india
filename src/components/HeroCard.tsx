"use client";

import { FormEvent, ReactNode, useId, useState } from "react";
import { site } from "@/lib/site";

type RideId = "bike" | "cab" | "auto" | "erickshaw";

const svgProps = {
  className: "ico",
  viewBox: "0 0 48 26",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons: Record<RideId, ReactNode> = {
  bike: (
    <svg {...svgProps}>
      <circle cx="9" cy="18" r="6" />
      <circle cx="39" cy="18" r="6" />
      <path d="M9 18h8l6-9h8l8 9M27 7h6l6 11M21 11h8" />
    </svg>
  ),
  cab: (
    <svg {...svgProps}>
      <path d="M3 18v-5l6-1 6-7h16l7 7 6 1v5z" />
      <path d="M16 12h20M24 5v7" />
      <circle cx="13" cy="19" r="4" fill="#fff" />
      <circle cx="36" cy="19" r="4" fill="#fff" />
    </svg>
  ),
  auto: (
    <svg {...svgProps}>
      <path d="M6 19V8c0-3 2-5 5-5h16c5 0 8 4 10 9l3 7z" />
      <path d="M14 3v16M27 3c2 4 3 9 3 16" />
      <circle cx="12" cy="20" r="4" fill="#fff" />
      <circle cx="38" cy="20" r="4" fill="#fff" />
    </svg>
  ),
  erickshaw: (
    <svg {...svgProps}>
      <path d="M6 4h34" />
      <path d="M9 4v12M37 4v12M23 4v12" />
      <path d="M4 16h40l-2 4H6z" />
      <path d="M30 7l-3 4h4l-3 4" />
      <circle cx="11" cy="21" r="3.5" fill="#fff" />
      <circle cx="37" cy="21" r="3.5" fill="#fff" />
    </svg>
  ),
};

// Order as the client asked: bike ✕, cab ✕, auto ✓, e-rickshaw ✓
const rides: { id: RideId; label: string; available: boolean }[] = [
  { id: "bike", label: "Bike", available: false },
  { id: "cab", label: "Cab", available: false },
  { id: "auto", label: "Auto", available: true },
  { id: "erickshaw", label: "E-rickshaw", available: true },
];

export default function HeroCard() {
  const uid = useId();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [ride, setRide] = useState<"auto" | "erickshaw">("auto");
  const [notice, setNotice] = useState(0);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (site.apkUrl) {
      window.open(site.apkUrl, "_blank", "noopener");
      return;
    }
    setNotice((n) => n + 1);
  }

  return (
    <form className="book heroform" onSubmit={onSubmit} aria-label="Book a ride">
      <h2 className="asktitle">Where to today?</h2>

      <div className="stops">
        <div className="stop">
          <span className="dot" aria-hidden="true" />
          <div className="inwrap">
            <label htmlFor={`${uid}-pickup`}>Pickup</label>
            <input
              id={`${uid}-pickup`}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Where are you?"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="stop">
          <span className="sq" aria-hidden="true" />
          <div className="inwrap">
            <label htmlFor={`${uid}-drop`}>Drop</label>
            <input
              id={`${uid}-drop`}
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Where to?"
              autoComplete="off"
            />
          </div>
        </div>
        <button
          type="button"
          className="swap"
          aria-label="Swap pickup and drop"
          onClick={() => {
            setPickup(drop);
            setDrop(pickup);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 2v12M2 5l3-3 3 3M11 14V2M8 11l3 3 3-3" />
          </svg>
        </button>
      </div>

      <div className="ridegrid" role="radiogroup" aria-label="Ride type">
        {rides.map((r) =>
          r.available ? (
            <div className="ridetile" key={r.id}>
              <input
                type="radio"
                name="ride"
                id={`${uid}-${r.id}`}
                value={r.id}
                checked={ride === r.id}
                onChange={() => setRide(r.id as "auto" | "erickshaw")}
              />
              <label htmlFor={`${uid}-${r.id}`}>
                <span className="rbadge yes" aria-hidden="true">✓</span>
                {icons[r.id]}
                <b>{r.label}</b>
                <small>On ECTO</small>
              </label>
            </div>
          ) : (
            <div className="ridetile" key={r.id}>
              <div className="off" aria-disabled="true">
                <span className="rbadge no" aria-hidden="true">✕</span>
                {icons[r.id]}
                <b>{r.label}</b>
                <small>Not on ECTO</small>
              </div>
            </div>
          )
        )}
      </div>

      <button type="submit" className="pill dark bookbtn">
        {ride === "auto" ? "Book an auto" : "Book an e-rickshaw"}
      </button>

      <div aria-live="polite">
        {notice > 0 ? (
          <div className="notice" key={notice}>
            Booking happens in the ECTO app, which is on trial in 11 cities across Uttar Pradesh,
            Haryana and Punjab. <a href="#riders">Join as an early rider</a> to hear when it opens in
            your city.
          </div>
        ) : (
          <p className="status">Autos and e-rickshaws only. On trial in 11 cities.</p>
        )}
      </div>
    </form>
  );
}