import { site } from "@/lib/site";

const principles = [
  {
    title: "Autos and e-rickshaws only",
    text: "We are built around the vehicles people in smaller cities already use every day. No bikes, no cabs.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V9c0-2 1.5-3.5 3.5-3.5H17c3.5 0 6 3 7.5 6.5l2.5 9z" />
        <path d="M9 5.5V21M18 5.5c1.5 3 2.2 7 2.2 15.5" />
        <circle cx="8" cy="22" r="3" fill="#fff" />
        <circle cx="23" cy="22" r="3" fill="#fff" />
      </svg>
    ),
  },
  {
    title: "Driver-first, no commission",
    text: `The model is designed around the people who drive, and drivers are not charged a commission on their rides.${
      site.comparison ? ` ${site.comparison}` : ""
    }`,
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="15" cy="15" r="11" />
        <path d="M10.5 10h9M10.5 14h9M12 10c4.5 0 4.5 7 0 7l5.5 4" />
      </svg>
    ),
  },
  {
    title: "Built on local trust",
    text: "In a smaller city, people choose the driver they know. We build around those relationships instead of replacing them.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 27s9-7.5 9-15A9 9 0 0 0 6 12c0 7.5 9 15 9 15z" />
        <path d="M11 12.5l3 3 5-5.5" />
      </svg>
    ),
  },
  {
    title: "One city at a time",
    text: "Every city has its own roads, habits and rhythm. We learn each one through trials before we say it is ready.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22c4-1 4-8 8-8s3 7 7 7 4-6 7-6" />
        <circle cx="5" cy="10" r="2.5" />
        <circle cx="25" cy="8" r="2.5" />
        <path d="M7.5 10h7M20 8h2.5" />
      </svg>
    ),
  },
];

export default function Principles() {
  return (
    <section className="block" id="why" aria-labelledby="why-title">
      <div className="wrap">
        <div className="sechead">
          <h2 id="why-title" className="display">
            Mobility built for <span className="mark">smaller cities.</span>
          </h2>
          <p>
            ECTO India is a mobility platform for autos and e-rickshaws, being developed for Tier 2 and
            Tier 3 Indian cities. These are the four ideas behind it.
          </p>
        </div>
        <div className="safegrid">
          {principles.map((p) => (
            <div className="safe" key={p.title}>
              <div className="badge">{p.icon}</div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}