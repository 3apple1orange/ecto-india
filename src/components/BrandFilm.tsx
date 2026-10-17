"use client";

import { useEffect, useRef, useState } from "react";
import JsonLd from "./JsonLd";
import { site } from "@/lib/site";

const schema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "ECTO India brand film",
  description: "A short brand film for ECTO India, an auto-rickshaw mobility platform for Tier 2 and Tier 3 Indian cities.",
  thumbnailUrl: `${site.url}/video/ecto.png`,
  contentUrl: `${site.url}/video/ecto-video.mp4`,
  uploadDate: "2026-10-08",
  duration: "PT8S",
  publisher: { "@id": site.organizationId },
};

export default function BrandFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // stays on the poster; visitor can press play

    // play only while on screen
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section className="film" aria-label="ECTO India brand film">
      <JsonLd data={schema} />
      <div className="wrap">
        <div className="filmframe">
          <video
            ref={ref}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/ecto.png"
            width={1024}
            height={576}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="ECTO India auto-rickshaw driving away in a cloud of dust"
          >
            <source src="/video/ecto-video.webm" type="video/webm" />
            <source src="/video/ecto-video.mp4" type="video/mp4" />
          </video>
          <button type="button" className="filmbtn" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}>
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
        <p className="filmcap">ECTO India brand film</p>
      </div>
    </section>
  );
}