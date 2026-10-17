"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import { trialCities, vehicles } from "@/lib/site";
import {
  ENDPOINT,
  LIMITS,
  OWNERSHIP,
  validateLead,
  type FieldErrors,
  type LeadField,
  type LeadKind,
} from "@/lib/leads";

type Status = "idle" | "sending" | "done";

const copy = {
  rider: {
    cta: "Join as an early rider",
    note: "Early riders hear first when ECTO opens up in their city.",
    doneTitle: "You are on the early rider list.",
    done: "Thank you. We will contact you on the number you shared when ECTO opens up in your city.",
  },
  driver: {
    cta: "Request driver early access",
    note: "Driver-first, no commission. Our team will call you about early access.",
    doneTitle: "Request received.",
    done: "Thank you. The ECTO team will call you on the number you shared about early access.",
  },
} as const;

const FALLBACK_ERROR = "Something went wrong. Please try again, or email contact@ectoindia.com.";

export default function LeadForm({ kind }: { kind: LeadKind }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [general, setGeneral] = useState("");

  const id = (f: string) => `${uid}-${f}`;
  const errId = (f: LeadField) => `${uid}-${f}-err`;
  const a11y = (f: LeadField) =>
    errors[f] ? { "aria-invalid": true as const, "aria-describedby": errId(f) } : {};
  const err = (f: LeadField) =>
    errors[f] ? (
      <p className="ferr" id={errId(f)}>
        {errors[f]}
      </p>
    ) : null;

  // Clear a field's error as soon as the visitor changes it
  function onFieldChange(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as unknown as HTMLInputElement).name as LeadField;
    if (name && errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string") values[k] = v;
    });

    setGeneral("");
    const found = validateLead(kind, values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    setErrors({});

    // Pages Functions don't run under "next dev": log instead of sending
    if (process.env.NODE_ENV === "development") {
      const lead = { ...values };
      delete lead.website;
      console.log(`[ECTO ${kind} sign-up, dev mode, not sent]`, lead);
      setStatus("done");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT[kind], { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.status === "success") {
        setStatus("done");
        return;
      }
      setStatus("idle");
      if (data?.errors) setErrors(data.errors as FieldErrors);
      else setGeneral(data?.message || FALLBACK_ERROR);
    } catch {
      setStatus("idle");
      setGeneral("We could not reach the server. Check your connection and try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="success" role="status">
        <span className="tick" aria-hidden="true">✓</span>
        <h3>{copy[kind].doneTitle}</h3>
        <p>{copy[kind].done}</p>
      </div>
    );
  }

  return (
    <form className="leadform" onSubmit={onSubmit} onChange={onFieldChange} noValidate>
      {general && (
        <p className="formerr" role="alert">
          {general}
        </p>
      )}

      <div className="stops">
        <div className={`field${errors.name ? " invalid" : ""}`}>
          <label htmlFor={id("name")}>Full name</label>
          <input
            id={id("name")}
            name="name"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            placeholder="Your name"
            {...a11y("name")}
          />
          {err("name")}
        </div>
        <div className={`field${errors.phone ? " invalid" : ""}`}>
          <label htmlFor={id("phone")}>Mobile number</label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            maxLength={LIMITS.phone}
            autoComplete="tel"
            placeholder="98765 43210"
            {...a11y("phone")}
          />
          {err("phone")}
        </div>
        <div className={`field${errors.city ? " invalid" : ""}`}>
          <label htmlFor={id("city")}>City</label>
          <select id={id("city")} name="city" required defaultValue="" {...a11y("city")}>
            <option value="" disabled>Select your city</option>
            {trialCities.map((g) => (
              <optgroup key={g.state} label={g.state}>
                {g.cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </optgroup>
            ))}
            <option value="Another city">Another city</option>
          </select>
          {err("city")}
        </div>
      </div>

      {kind === "driver" && (
        <>
          <fieldset className="chips" {...a11y("vehicleType")}>
            <legend>You drive</legend>
            {vehicles.map((v) => (
              <div className="chip" key={v.id}>
                <input type="radio" name="vehicleType" id={id(v.id)} value={v.id} />
                <label htmlFor={id(v.id)}>{v.label}</label>
              </div>
            ))}
            {err("vehicleType")}
          </fieldset>

          <fieldset className="chips" {...a11y("ownership")}>
            <legend>Your vehicle</legend>
            {OWNERSHIP.map((o) => (
              <div className="chip" key={o.id}>
                <input type="radio" name="ownership" id={id(o.id)} value={o.id} />
                <label htmlFor={id(o.id)}>{o.label}</label>
              </div>
            ))}
            {err("ownership")}
          </fieldset>
        </>
      )}

      {/* Spam trap: real visitors never see or fill this */}
      <div className="sr" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" {...a11y("consent")} />
        <span>
          I agree to be contacted by ECTO India about early access. See our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      {err("consent")}

      <button type="submit" className="pill dark bookbtn" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : copy[kind].cta}
      </button>

      <p className="status">{copy[kind].note}</p>
    </form>
  );
}