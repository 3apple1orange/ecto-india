import JsonLd from "./JsonLd";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "Is ECTO available in my city?",
    a: "ECTO is currently on trial in 11 cities across Uttar Pradesh, Haryana and Punjab: Aligarh, Muzaffarnagar, Rampur, Shahjahanpur, Kaithal, Bhiwani, Sirsa, Cheeka, Sangrur, Pathankot and Moga. Availability can differ from city to city while trials are running.",
  },
  {
    q: "What kind of vehicles does ECTO use?",
    a: "ECTO is built around autos and e-rickshaws, the vehicles people in smaller cities already use every day. Bikes and cabs are not part of the platform.",
  },
  {
    q: "Do drivers pay a commission?",
    a: "ECTO is designed as a driver-first platform with no commission on rides. Request driver early access and our team will explain the current terms when they call you.",
  },
  {
    q: "Can I sign up as a rider?",
    a: "Yes. Join as an early rider and we will contact you when ECTO opens up in your city.",
  },
  {
    q: "How can I get the app?",
    a: "The Android app is on trial and is not yet publicly available. We will publish the download link on this website once it is ready. Until then, riders can join as early riders and drivers can request early access.",
  },
  {
    q: "Who is behind ECTO India?",
    a: `ECTO India was founded by ${site.founder.name}, with ${site.coFounder.name} as co-founder, and has been active since ${site.activeSince}.`,
  },
  {
    q: "How do I contact ECTO?",
    a: `Write to ${site.contactEmail}. This address is also for press enquiries.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section className="block faqsec" id="faq" aria-labelledby="faq-title">
      <JsonLd data={faqSchema} />
      <div className="wrap">
        <div className="sechead">
          <h2 id="faq-title" className="display">Good to know.</h2>
          <p>
            Still curious? Write to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </div>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span className="plus" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}