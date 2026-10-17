export const site = {
  name: "ECTO India",
  url: "https://www.ectoindia.com",
  tagline: "Auto-Rickshaw Mobility for Tier 2 & 3 Cities",
  description:
    "ECTO India is an auto-rickshaw mobility platform being developed for Tier 2 and Tier 3 Indian cities, focused on local trust and driver-first economics.",

  stage: "Trial operations in 11 cities",
  stageDetail:
    "ECTO India is developing an auto-rickshaw mobility platform, with trial operations across 11 cities in Uttar Pradesh, Haryana and Punjab.",

  // Client confirmed: driver-first, no commission. Do NOT add a daily fee publicly yet.
  model: "Driver-first, no commission",

  // Comparison line. Uber, Ola and Rapido also offer zero-commission / subscription
  // models for autos, so this compares on scope (vehicles + cities), not commission.
  // Set to "" to hide it everywhere.
  comparison:
    "Not another Uber, Ola or Rapido. ECTO is built only for autos and e-rickshaws, in Tier 2 and Tier 3 cities.",

  activeSince: "February 2024", // start date, NOT an incorporation date

  founder: {
    name: "Manan Singla",
    title: "Founder, ECTO India",
    personId: "https://www.manansingla.com/#person",
    url: "https://www.manansingla.com/",
  },
  coFounder: {
    name: "Vansh Gehlot",
    title: "Co-founder, ECTO India",
    url: "https://www.vanshgehlot.us/",
  },

  organizationId: "https://www.ectoindia.com/#organization",
  websiteId: "https://www.ectoindia.com/#website",

  contactEmail: "contact@ectoindia.com",

  // Add the APK / Play Store URL here ONLY when it is ready for public distribution.
  apkUrl: null as string | null,

  sameAs: [] as string[], // add ECTO's own real profiles only
};

export const trialCities = [
  { state: "Uttar Pradesh", cities: ["Aligarh", "Muzaffarnagar", "Rampur", "Shahjahanpur"] },
  { state: "Haryana", cities: ["Kaithal", "Bhiwani", "Sirsa", "Cheeka"] },
  { state: "Punjab", cities: ["Sangrur", "Pathankot", "Moga"] },
] as const;

export const vehicles = [
  { id: "auto", label: "Auto" },
  { id: "erickshaw", label: "E-rickshaw" },
] as const;