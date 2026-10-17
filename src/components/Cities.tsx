import { trialCities } from "@/lib/site";

export default function Cities() {
  const total = trialCities.reduce((n, g) => n + g.cities.length, 0);

  return (
    <section className="cities" id="cities" aria-labelledby="cities-title">
      <span className="ring" aria-hidden="true" />
      <div className="wrap">
        <div className="sechead">
          <h2 id="cities-title" className="display">
            Trials across {total} cities.
          </h2>
          <p>
            ECTO is on trial in Tier 2 and Tier 3 cities across Uttar Pradesh, Haryana and Punjab.
            We are learning each city before we open it up properly.
          </p>
        </div>

        <div className="staterows">
          {trialCities.map((g) => (
            <div className="staterow" key={g.state}>
              <h3 className="statename">
                {g.state} <span>{g.cities.length}</span>
              </h3>
              <ul className="citylist">
                {g.cities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="citynote">
          Trial availability can differ from city to city. Riders can{" "}
          <a href="#riders">join as early riders</a>, and drivers can{" "}
          <a href="#drive">request early access</a>.
        </p>
      </div>
    </section>
  );
}