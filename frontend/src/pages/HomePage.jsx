import React from "react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Services from "../components/Services";
import Approach from "../components/Approach";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import HomeHighlights from "../components/HomeHighlights";
import SectionReveal from "../components/SectionReveal";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SectionReveal><HomeHighlights /></SectionReveal>
      <SectionReveal><Marquee /></SectionReveal>
      <SectionReveal><Services /></SectionReveal>
      <SectionReveal><Approach /></SectionReveal>
      <SectionReveal><About /></SectionReveal>
      <SectionReveal><Testimonials /></SectionReveal>
      <SectionReveal><CTA /></SectionReveal>
      <SectionReveal><Contact /></SectionReveal>
    </main>
  );
}
