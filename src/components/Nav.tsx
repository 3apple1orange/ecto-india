"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`top${scrolled ? " scrolled" : ""}`} aria-label="Main">
      <div className="wrap navbar">
        <Logo />
        <div className="navlinks">
          <a href="#how">How it works</a>
          <a href="#cities">Cities</a>
          <a href="#riders">Ride early</a>
          <a href="#drive">Drive with us</a>
          <a href="#team">Team</a>
        </div>
        <div className="navcta">
          <a href="#riders" className="pill ghost">Ride early</a>
          <a href="#drive" className="pill">Driver early access</a>
        </div>
      </div>
    </nav>
  );
}