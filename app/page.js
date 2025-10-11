"use client";

import StatsSection from "./StatsSection";
import HomeSection from "./HomeSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import HomeNav from "./HomeNav";

export default function Navbar() {
  return (
    <div className="back1">
      <HomeNav />
      <HomeSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <Faq />
    </div>
  );
}
