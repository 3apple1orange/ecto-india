import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { CSSProperties, Fragment } from "react";

const lead = "In a smaller city, mobility is a question of trust.".split(" ");
const bold = "We are building around it.".split(" ");

// TODO(client): describe the real photo accurately, e.g.
// "An auto-rickshaw driver with his auto in Kaithal, Haryana"
const PHOTO_ALT = "An auto-rickshaw driver with his auto in one of ECTO India's trial cities";
// Optional small caption under the photo. Leave "" to hide it.
const PHOTO_CAPTION = "";

// Picks the newest mission.* file, so a leftover old file can never win.
// Runs at build time, so a new photo needs a new build/deploy.
function findPhoto(): string | null {
  const dir = path.join(process.cwd(), "public", "images");
  let best: { file: string; time: number } | null = null;
  for (const ext of ["jpg", "jpeg", "webp", "png"]) {
    const file = `mission.${ext}`;
    const full = path.join(dir, file);
    if (fs.existsSync(full)) {
      const time = fs.statSync(full).mtimeMs;
      if (!best || time > best.time) best = { file, time };
    }
  }
  return best ? `/images/${best.file}` : null;
}

function Words({ words, offset = 0 }: { words: string[]; offset?: number }) {
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="w" style={{ "--i": offset + i } as CSSProperties}>{w}</span>{" "}
        </Fragment>
      ))}
    </>
  );
}

export default function Mission() {
  const photo = findPhoto();

  return (
    <section className="mission" aria-label="Our belief">
      <div className={`wrap missiongrid${photo ? "" : " solo"}`}>
        <div>
          <blockquote>
            <Words words={lead} />
            <strong>
              <Words words={bold} offset={lead.length} />
            </strong>
          </blockquote>
          <p className="mby">ECTO India · Active since February 2024</p>
        </div>

        {photo && (
          <figure className="missphoto">
            <div className="frame">
              <Image
                src={photo}
                alt={PHOTO_ALT}
                fill
                sizes="(max-width: 980px) 90vw, 440px"
                style={{ objectFit: "cover" }}
              />
            </div>
            {PHOTO_CAPTION && <figcaption>{PHOTO_CAPTION}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}