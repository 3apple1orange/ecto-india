// POST /api/driver: driver early-access sign-ups from ectoindia.com
// Keep these lists in sync with src/lib/site.ts and src/lib/leads.ts.

const CITIES = [
  "Aligarh", "Muzaffarnagar", "Rampur", "Shahjahanpur",
  "Kaithal", "Bhiwani", "Sirsa", "Cheeka",
  "Sangrur", "Pathankot", "Moga",
  "Another city",
];
const VEHICLES = { auto: "Auto", erickshaw: "E-rickshaw" };
const OWNERSHIP = { own: "Owns it", rent: "Drives on rent" };
const LIMITS = { name: 120, phone: 40, short: 60 };
const FALLBACK_FROM = "ECTO INDIA <onboarding@resend.dev>";
const CONTACT = "contact@ectoindia.com";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const field = (form, key, max) => {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

function normalisePhone(raw) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ status: "error", message: "We could not read your request. Please try again." }, 400);
  }

  // Spam trap: real visitors never fill this hidden field
  if (field(form, "website", 200)) return json({ status: "success" });

  const name = field(form, "name", LIMITS.name);
  const phoneRaw = field(form, "phone", LIMITS.phone);
  const city = field(form, "city", LIMITS.short);
  const vehicleType = field(form, "vehicleType", LIMITS.short);
  const ownership = field(form, "ownership", LIMITS.short);
  const consent = form.get("consent") === "on";

  const errors = {};
  if (name.length < 2) errors.name = "Please enter your full name.";
  const phone = normalisePhone(phoneRaw);
  if (!phone) errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  if (!CITIES.includes(city)) errors.city = "Please select your city.";
  if (!Object.hasOwn(VEHICLES, vehicleType)) errors.vehicleType = "Please tell us whether you drive an auto or an e-rickshaw.";
  if (!Object.hasOwn(OWNERSHIP, ownership)) errors.ownership = "Please tell us whether you own your vehicle or drive on rent.";
  if (!consent) errors.consent = "Please agree to be contacted so we can reach you.";

  if (Object.keys(errors).length) return json({ status: "error", errors }, 400);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.error("RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return json(
      { status: "error", message: `Our sign-up form is not set up yet. Please email ${CONTACT}.` },
      500
    );
  }

  const received = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";
  const text = [
    "Type: Driver early access",
    `Name: ${name}`,
    `Mobile: ${phone}`,
    `City: ${city}`,
    `Drives: ${VEHICLES[vehicleType]}`,
    `Vehicle: ${OWNERSHIP[ownership]}`,
    `Received: ${received}`,
  ].join("\n");

  let res = null;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || FALLBACK_FROM,
        to: [env.CONTACT_TO_EMAIL],
        subject: `New enquiry: Driver early access from ${name}`,
        text,
      }),
    });
  } catch (err) {
    console.error("Resend request failed", err);
  }

  if (!res || !res.ok) {
    if (res) console.error("Resend error", res.status, await res.text());
    return json(
      { status: "error", message: `We could not send your request right now. Please try again, or email ${CONTACT}.` },
      502
    );
  }

  return json({ status: "success" });
}