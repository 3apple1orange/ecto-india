import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <p className="tag">Autos and e-rickshaws, for the way smaller cities move.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="/#how">How it works</a></li>
              <li><a href="/#cities">Cities</a></li>
              <li><a href="/#riders">Ride early</a></li>
              <li><a href="/#drive">Drive with us</a></li>
              <li><a href="/#team">Team</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></li>
              <li><a href={site.founder.url}>Founder: {site.founder.name}</a></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
        <p className="wordmark" aria-hidden="true">ecto<span>.</span></p>
        <div className="legal">
          <span>© {year} {site.name}.</span>
          <span>Trials in Uttar Pradesh, Haryana and Punjab</span>
        </div>
      </div>
    </footer>
  );
}