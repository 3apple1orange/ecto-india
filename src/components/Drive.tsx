import LeadForm from "./LeadForm";
import { site } from "@/lib/site";

const points = [
  "No commission on your rides",
  "Autos and e-rickshaws, nothing else",
  "Early access, with a call from our team",
];

export default function Drive() {
  return (
    <section className="drive" id="drive" aria-labelledby="drive-title">
      <span className="ring" aria-hidden="true" />
      <div className="wrap drivegrid">
        <div>
          <h2 id="drive-title" className="display">Drive with ECTO.</h2>
          <p className="lead">
            ECTO is driver-first, with no commission. If you drive an auto or e-rickshaw in one of our
            trial cities, ask for early access and our team will get in touch.
          </p>
          {site.comparison && <p className="versus">{site.comparison}</p>}
          <ul className="points">
            {points.map((p) => (
              <li key={p}>
                <span className="tickdot" aria-hidden="true">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="book">
          <h3 className="cardtitle">Request driver early access.</h3>
          <LeadForm kind="driver" />
        </div>
      </div>
    </section>
  );
}