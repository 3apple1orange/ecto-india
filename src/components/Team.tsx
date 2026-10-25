import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

// Show the research endorsement line (wording matches the letter). false to hide.
const SHOW_RESEARCH_NOTE = true;

// Lime highlight, same look as the role pill. Use sparingly: 2–3 per card.
function K({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: "var(--lime)",
        color: "var(--ink)",
        fontWeight: 600,
        padding: "1px 7px",
        borderRadius: 999,
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}

// Finds the photo whatever its extension: name.png, name.jpg, name.jpeg or name.webp
function findImage(base: string): string | null {
  for (const ext of ["png", "jpg", "jpeg", "webp"]) {
    const file = `${base}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", "images", file))) return `/images/${file}`;
  }
  return null;
}

function Portrait({ base, alt, initials }: { base: string; alt: string; initials: string }) {
  const src = findImage(base);
  return (
    <div className="pphoto">
      {src ? (
        <Image src={src} alt={alt} width={900} height={900} sizes="(max-width: 980px) 90vw, 560px" />
      ) : (
        <div className="avatar" aria-hidden="true">{initials}</div>
      )}
    </div>
  );
}

export default function Team() {
  return (
    <section className="block" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <div className="sechead">
          <h2 id="team-title" className="display">
            The people <span className="mark">behind ECTO.</span>
          </h2>
          <p>ECTO India has been active since {site.activeSince}.</p>
        </div>

        <div className="teamgrid">
          <article className="person">
            <Portrait
              base="manan-singla-founder-ecto-india"
              alt="Manan Singla, founder of ECTO India"
              initials="MS"
            />
            <div className="pbody">
              <p className="role">{site.founder.title}</p>
              <h3>{site.founder.name}</h3>
              <p>
                Manan Singla is an entrepreneur and author whose work spans urban mobility, public
                infrastructure, sustainable energy and philosophical writing. He is the founder of ECTO
                India and the author of <K><em>Meet Me in the Backyard</em></K>.
              </p>
              {SHOW_RESEARCH_NOTE && (
                <p>
                  His research paper on platformisation and urban mobility in smaller Indian cities has
                  been endorsed by Angela M. Counts, former Director of Admissions at{" "}
                  <K>Harvard Divinity School</K>.
                </p>
              )}
              <a className="plink" href={site.founder.url}>Read his full profile at manansingla.com</a>
            </div>
          </article>

          <article className="person">
            <Portrait
              base="vansh-gehlot-co-founder-ecto-india"
              alt="Vansh Gehlot, co-founder of ECTO India"
              initials="VG"
            />
            <div className="pbody">
              <p className="role">{site.coFounder.title}</p>
              <h3>{site.coFounder.name}</h3>
              <p>
                Vansh Gehlot is a <K>GenAI and blockchain builder</K> and entrepreneur. He focuses on
                shipping practical AI products and developer tools that move from prototype to real
                users, with work across generative AI, large language models and Web3. He believes in
                building accessible technology that creates equitable opportunities.
              </p>
              <a className="plink" href={site.coFounder.url}>Read more at vanshgehlot.us</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}