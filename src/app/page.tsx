import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BrandFilm from "@/components/BrandFilm";
import Journey from "@/components/Journey";
import Principles from "@/components/Principles";
import Stats from "@/components/Stats";
import Cities from "@/components/Cities";
import Riders from "@/components/Riders";
import Mission from "@/components/Mission";
import RoadDivider from "@/components/RoadDivider";
import Drive from "@/components/Drive";
import Team from "@/components/Team";
import AppSection from "@/components/AppSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <BrandFilm />
        <Journey />
        <Principles />
        <Stats />
        <Cities />
        <Riders />
        <Mission />
        <RoadDivider />
        <Drive />
        <Team />
        <AppSection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}