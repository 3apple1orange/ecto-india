"use client";

import { useEffect } from "react";

// Reveal rules: elements matching `sel` get tagged at runtime, so no other
// component needs editing. `d` adds extra stagger steps.
const rules: { sel: string; fx: string; d?: number }[] = [
  { sel: ".sechead h2", fx: "mask" },
  { sel: ".sechead p", fx: "up", d: 2 },
  { sel: ".filmframe", fx: "scale" },
  { sel: ".safe", fx: "up" },
  { sel: ".stat", fx: "up" },
  { sel: ".staterow", fx: "up" },
  { sel: ".citylist li", fx: "pop" },
  { sel: ".citynote", fx: "up" },
  { sel: ".riders h2", fx: "mask" },
  { sel: ".riders .lead", fx: "up", d: 2 },
  { sel: ".riders .points li", fx: "left", d: 3 },
  { sel: ".riders .book", fx: "scale", d: 2 },
  { sel: ".mission blockquote", fx: "words" },
  { sel: ".mby", fx: "up", d: 4 },
  { sel: ".drive h2", fx: "mask" },
  { sel: ".drive .lead", fx: "up", d: 2 },
  { sel: ".versus", fx: "up", d: 3 },
  { sel: ".drive .points li", fx: "left", d: 3 },
  { sel: ".drive .book", fx: "scale", d: 2 },
  { sel: ".person", fx: "scale" },
  { sel: ".app .stage", fx: "up" },
  { sel: ".app h2", fx: "mask", d: 1 },
  { sel: ".applede", fx: "up", d: 3 },
  { sel: ".app .pill", fx: "up", d: 4 },
  { sel: ".phone", fx: "phone" },
  { sel: ".faq details", fx: "up" },
  { sel: ".foot > div", fx: "up" },
];

const parallax = [
  { sel: ".herobg svg", f: 0.12 },
  { sel: ".ring", f: -0.1 },
];

export default function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const tagged: HTMLElement[] = [];
    const counters: HTMLElement[] = [];
    let raf = 0;

    /* ---- scroll progress + parallax ---- */
    const px = parallax.flatMap(({ sel, f }) =>
      Array.from(document.querySelectorAll<HTMLElement>(sel)).map((el) => ({ el, f }))
    );

    const tick = () => {
      const max = root.scrollHeight - root.clientHeight;
      root.style.setProperty("--p", String(max > 0 ? Math.min(1, root.scrollTop / max) : 0));
      if (reduce) return;
      for (const { el, f } of px) {
        const box = el.parentElement!.getBoundingClientRect();
        if (box.bottom < -300 || box.top > window.innerHeight + 300) continue;
        const c = box.top + box.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-c * f).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let io: IntersectionObserver | null = null;
    let cio: IntersectionObserver | null = null;

    if (!reduce) {
      /* ---- reveal on scroll ----
         `watch` maps the element we observe -> the elements to reveal.
         Clipped headings (mask) are revealed via their PARENT, because a
         fully clipped element has no visible area and is never "intersecting". */
      const watch = new Map<Element, HTMLElement[]>();

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            io!.unobserve(e.target);
            const els = watch.get(e.target) ?? [];
            watch.delete(e.target);
            for (const el of els) {
              el.classList.add("in");
              // Once revealed, hand the element back to its normal styles (hover etc.)
              timers.push(
                window.setTimeout(() => {
                  el.removeAttribute("data-fx");
                  el.classList.remove("in");
                  el.style.removeProperty("--i");
                }, 3000)
              );
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );

      for (const { sel, fx, d = 0 } of rules) {
        const seen = new Map<Element, number>();
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          if (el.hasAttribute("data-fx") || el.closest(".hero")) return;
          const parent = el.parentElement!;
          const idx = seen.get(parent) ?? 0;
          seen.set(parent, idx + 1);
          el.style.setProperty("--i", String(Math.min(idx + d, 10)));
          el.setAttribute("data-fx", fx);
          tagged.push(el);

          const target = fx === "mask" ? parent : el;
          const list = watch.get(target);
          if (list) list.push(el);
          else {
            watch.set(target, [el]);
            io!.observe(target);
          }
        });
      }

      /* ---- count-up numbers ---- */
      cio = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            cio!.unobserve(el);
            const to = Number(el.dataset.count);
            const from = Number(el.dataset.from ?? 0);
            const start = performance.now();
            const run = (now: number) => {
              const t = Math.min(1, (now - start) / 1500);
              const eased = 1 - Math.pow(1 - t, 3);
              el.textContent = String(Math.round(from + (to - from) * eased));
              if (t < 1) requestAnimationFrame(run);
            };
            requestAnimationFrame(run);
          }
        },
        { threshold: 0.6 }
      );
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = el.dataset.from ?? "0";
        counters.push(el);
        cio!.observe(el);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
      cio?.disconnect();
      timers.forEach((t) => clearTimeout(t));
      tagged.forEach((el) => {
        el.removeAttribute("data-fx");
        el.classList.remove("in");
        el.style.removeProperty("--i");
      });
      counters.forEach((el) => {
        el.textContent = el.dataset.count ?? "";
      });
    };
  }, []);

  return null;
}