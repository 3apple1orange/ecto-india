import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/lib/site";

function hasImage(file: string) {
  return fs.existsSync(path.join(process.cwd(), "public", "images", file));
}

function Portrait({ file, alt, initials }: { file: string; alt: string; initials: string }) {
  return (
    <div className="pphoto">
      {hasImage(file) ? (
        <Image
          src={`/images/${file}`}
          alt={alt}
          width={900}
          height={900}
          sizes="(max-width: 980px) 90vw, 560px"
        />
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
              file="manan-singla-founder-ecto-india.png"
              alt="Manan Singla, founder of ECTO India"
              initials="MS"
            />
            <div className="pbody">
              <p className="role">{site.founder.title}</p>
              <h3>{site.founder.name}</h3>
              <p>
                Manan Singla is an entrepreneur and author whose work spans urban mobility, public
                infrastructure, sustainable energy and philosophical writing. He is the founder of ECTO
                India and the author of <em>Meet Me in the Backyard</em>.
              </p>
              <a className="plink" href={site.founder.url}>Read his full profile at manansingla.com →</a>
            </div>
          </article>

          <article className="person">
            <Portrait
              file="vansh-gehlot-co-founder-ecto-india.png"
              alt="Vansh Gehlot, co-founder of ECTO India"
              initials="VG"
            />
            <div className="pbody">
              <p className="role">{site.coFounder.title}</p>
              <h3>{site.coFounder.name}</h3>
              <p>
                Vansh Gehlot is a GenAI and blockchain builder and entrepreneur. He focuses on shipping
                practical AI products and developer tools that move from prototype to real users, with
                work across generative AI, large language models and Web3. He believes in building
                accessible technology that creates equitable opportunities.
              </p>
              <a className="plink" href={site.coFounder.url}>Read more at vanshgehlot.us →</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}