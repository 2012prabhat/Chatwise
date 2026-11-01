"use client";

import HomeNav from "./HomeNav";
import HomeSection from "./HomeSection";
import StatsSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import LiveDemoSection from "./LiveDemoSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import CtaSection from "./CtaSection";
import Footer from "./Footer";
import ChatWidget from "@/components/ChatWidget";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-sky-500 selection:text-white">
      <HomeNav />
      <main>
        <HomeSection />
        <StatsSection />
        <FeaturesSection />
        <LiveDemoSection />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}
