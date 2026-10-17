import { trialCities, vehicles } from "./site";

export type LeadKind = "rider" | "driver";
export type LeadField = "name" | "phone" | "city" | "vehicleType" | "ownership" | "consent";
export type FieldErrors = Partial<Record<LeadField, string>>;

// Same limits and messages as functions/api/rider.js and functions/api/driver.js.
// If you change anything here, change it there too.
export const LIMITS = { name: 120, phone: 40, short: 60 } as const;

export const ENDPOINT: Record<LeadKind, string> = {
  rider: "/api/rider",
  driver: "/api/driver",
};

export const CITY_OPTIONS: string[] = [...trialCities.flatMap((g) => [...g.cities]), "Another city"];

export const OWNERSHIP = [
  { id: "own", label: "I own it" },
  { id: "rent", label: "I drive on rent" },
] as const;

export const MESSAGES: Record<LeadField, string> = {
  name: "Please enter your full name.",
  phone: "Please enter a valid 10-digit Indian mobile number.",
  city: "Please select your city.",
  vehicleType: "Please tell us whether you drive an auto or an e-rickshaw.",
  ownership: "Please tell us whether you own your vehicle or drive on rent.",
  consent: "Please agree to be contacted so we can reach you.",
};

export function normalisePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export function validateLead(kind: LeadKind, v: Record<string, string>): FieldErrors {
  const e: FieldErrors = {};

  const name = (v.name ?? "").trim().slice(0, LIMITS.name);
  if (name.length < 2) e.name = MESSAGES.name;

  if (!normalisePhone((v.phone ?? "").trim().slice(0, LIMITS.phone))) e.phone = MESSAGES.phone;

  if (!CITY_OPTIONS.includes((v.city ?? "").trim())) e.city = MESSAGES.city;

  if (kind === "driver") {
    if (!vehicles.some((x) => x.id === v.vehicleType)) e.vehicleType = MESSAGES.vehicleType;
    if (!OWNERSHIP.some((x) => x.id === v.ownership)) e.ownership = MESSAGES.ownership;
  }

  if (v.consent !== "on") e.consent = MESSAGES.consent;

  return e;
}