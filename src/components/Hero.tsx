import { site } from "@/lib/site";
import HeroCard from "./HeroCard";

export default function Hero() {
  return (
    <header className="hero">
      <div className="herobg" aria-hidden="true">
        <svg viewBox="0 0 800 600">
          <path
            d="M20 120 C180 80 300 60 280 200 C260 330 120 300 160 200 C200 100 470 80 520 230 C560 350 560 470 680 460 C760 452 790 400 820 380"
            fill="none" stroke="#000" strokeWidth="40" strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="wrap herogrid">
        <div>
          <p className="stage">
            <span className="pulse" aria-hidden="true" />
            {site.stage}
          </p>
          <h1 className="display">
            <span className="line">auto <span className="strike">bula,</span></span>
            <span className="line">book kar lo!</span>
          </h1>
          <p className="lede">
            ECTO India is building a mobility platform for autos and e-rickshaws in Tier 2 and
            Tier 3 cities, built on local trust and driver-first economics. Trials are running
            across 11 cities in Uttar Pradesh, Haryana and Punjab.
          </p>
          <p className="herometa">Active since {site.activeSince}</p>
        </div>
        <HeroCard />
      </div>
    </header>
  );
}