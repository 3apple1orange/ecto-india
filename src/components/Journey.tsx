"use client";

import { useEffect, useRef, useState } from "react";

const ROAD =
  "M-40 130 C140 110 330 70 330 210 C330 330 170 320 190 220 C210 110 470 70 610 150 C760 235 650 420 800 430 C930 440 960 290 1110 280 C1230 272 1330 320 1460 360";

// TODO(client): confirm these three steps match the real trial app flow.
const steps = [
  {
    n: "1",
    title: "Say where you are going",
    text: "Open the ECTO app, set your pickup and drop, and request an auto.",
    at: 0,
  },
  {
    n: "2",
    title: "A local driver accepts",
    text: "An auto-rickshaw driver from your own city picks up the request.",
    at: 0.36,
  },
  {
    n: "3",
    title: "Ride with someone local",
    text: "Your driver comes to you and takes you across town, on a network built around drivers.",
    at: 0.72,
  },
];

export default function Journey() {
  const section = useRef<HTMLElement>(null);
  const road = useRef<SVGPathElement>(null);
  const lit = useRef<SVGPathElement>(null);
  const auto = useRef<SVGGElement>(null);
  const pinA = useRef<SVGGElement>(null);
  const pinB = useRef<SVGGElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = section.current;
    const p = road.current;
    const l = lit.current;
    const a = auto.current;
    const A = pinA.current;
    const B = pinB.current;
    if (!s || !p || !l || !a || !A || !B) return;

    const len = p.getTotalLength();
    const startL = len * 0.06;
    const endL = len * 0.94;
    const pa = p.getPointAtLength(startL);
    const pb = p.getPointAtLength(endL);
    A.setAttribute("transform", `translate(${pa.x},${pa.y})`);
    B.setAttribute("transform", `translate(${pb.x},${pb.y})`);
    l.style.strokeDasharray = `${len} ${len}`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = (prog: number) => {
      const d = startL + (endL - startL) * prog;
      const pt = p.getPointAtLength(d);
      const pt2 = p.getPointAtLength(Math.min(len, d + 2));
      const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
      a.setAttribute("transform", `translate(${pt.x},${pt.y}) rotate(${ang})`);
      l.style.strokeDashoffset = String(len - d);
      setActive(prog >= steps[2].at ? 2 : prog >= steps[1].at ? 1 : 0);
    };

    let raf = 0;
    const update = () => {
      const r = s.getBoundingClientRect();
      const total = s.offsetHeight - window.innerHeight;
      const prog = Math.min(1, Math.max(0, -r.top / total));
      place(reduce ? Math.round(prog * 2) / 2 : prog);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    setReady(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="journey" id="how" ref={section} aria-labelledby="how-title">
      <div className="sticky">
        <div className="wrap">
          <div className="jhead">
            <h2 id="how-title" className="display">
              Three steps, then you are moving.
            </h2>
            <p className="hint">Keep scrolling to ride along.</p>
          </div>
        </div>

        <div className="roadwrap">
          <svg viewBox="0 0 1400 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path ref={road} d={ROAD} fill="none" stroke="#1F2B24" strokeWidth="44" strokeLinecap="round" />
            <path d={ROAD} fill="none" stroke="#3A4A40" strokeWidth="3" strokeLinecap="round" />
            <path ref={lit} d={ROAD} fill="none" stroke="#A7EB2A" strokeWidth="4" strokeLinecap="round" />
            <g ref={pinA}>
              <circle r="15" fill="#A7EB2A" stroke="#000" strokeWidth="4" />
            </g>
            <g ref={pinB}>
              <rect x="-13" y="-13" width="26" height="26" rx="5" fill="#000" />
              <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#A7EB2A" />
            </g>
            <g ref={auto} style={{ opacity: ready ? 1 : 0 }}>
              <g transform="translate(-30,-19)">
                <ellipse cx="32" cy="22" rx="30" ry="18" fill="rgba(0,0,0,.18)" />
                <rect x="2" y="3" width="56" height="32" rx="11" fill="#A7EB2A" stroke="#000" strokeWidth="3" />
                <rect x="6" y="6" width="36" height="26" rx="8" fill="#000" />
                <path d="M42 8 C50 9 54 13 55 19 C54 25 50 29 42 30 Z" fill="#E9F9C9" stroke="#000" strokeWidth="2.5" />
                <circle cx="57" cy="19" r="3" fill="#fff" stroke="#000" strokeWidth="1.5" />
                <rect x="11" y="15" width="22" height="8" rx="3" fill="#A7EB2A" />
              </g>
            </g>
          </svg>
        </div>

        <div className="wrap">
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.n} className={`step${active === i ? " on" : ""}`}>
                <div className="n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}