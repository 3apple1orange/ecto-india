import LeadForm from "./LeadForm";

const points = [
  "Hear first when ECTO opens in your city",
  "Autos and e-rickshaws, driven by local drivers",
  "We only contact you about early access",
];

export default function Riders() {
  return (
    <section className="riders" id="riders" aria-labelledby="riders-title">
      <div className="wrap ridersgrid">
        <div>
          <h2 id="riders-title" className="display">Ride early with ECTO.</h2>
          <p className="lead">
            ECTO is on trial in 11 cities across Uttar Pradesh, Haryana and Punjab. Join as an early
            rider and we will tell you when you can book an auto or e-rickshaw in your city.
          </p>
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
          <h3 className="cardtitle">Become an early rider.</h3>
          <LeadForm kind="rider" />
        </div>
      </div>
    </section>
  );
}