"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaKey,
  FaDatabase,
  FaPalette,
  FaRocket,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const steps = [
  {
    step: "01",
    title: "Generate Secure API Key",
    tagline: "Instant Credential Setup",
    desc: "Create an account and generate a dedicated API key with domain-origin whitelist protections to safeguard your requests.",
    icon: <FaKey className="text-sky-400 text-xl" />,
    preview: {
      label: "API Key Generated",
      badge: "Domain: *.yourbrand.com",
      accent: "from-sky-500/20 to-blue-500/20",
    },
  },
  {
    step: "02",
    title: "Train Knowledge Base",
    tagline: "Sync Docs & Common FAQs",
    desc: "Input your customer FAQs, return policies, product features, or support documentation. Our engine indexes your knowledge in milliseconds.",
    icon: <FaDatabase className="text-indigo-400 text-xl" />,
    preview: {
      label: "48 Knowledge Articles Indexed",
      badge: "Vector Index: Up to date",
      accent: "from-indigo-500/20 to-purple-500/20",
    },
  },
  {
    step: "03",
    title: "Personalize Widget & Persona",
    tagline: "Seamless Brand Harmony",
    desc: "Adjust brand colors, custom greetings, support avatars, and tone of voice to seamlessly blend with your existing website aesthetic.",
    icon: <FaPalette className="text-amber-400 text-xl" />,
    preview: {
      label: "Theme: Brand Cyan & Dark Slate",
      badge: "Tone: Professional & Concise",
      accent: "from-amber-500/20 to-rose-500/20",
    },
  },
  {
    step: "04",
    title: "Paste Script & Go Live",
    tagline: "Deploy in 60 Seconds",
    desc: "Paste our lightweight script tag into your website's HTML before the closing body tag. Your intelligent AI bot is live and handling tickets instantly.",
    icon: <FaRocket className="text-emerald-400 text-xl" />,
    preview: {
      label: "<script src='chatbot.js' />",
      badge: "Status: 100% Live",
      accent: "from-emerald-500/20 to-teal-500/20",
    },
  },
];

export default function HowItWorks() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
          <FaRocket className="text-xs" /> Seamless 4-Step Onboarding
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How ChatWise <span className="gradientText">Works</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          From sign up to a fully trained customer support chatbot in less than 5 minutes. No engineering background required.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setActiveStep(index)}
            className={`rounded-3xl p-6 sm:p-7 cardBack flex flex-col justify-between transition-all duration-300 relative border ${
              activeStep === index
                ? "border-sky-500/40 shadow-[0_10px_35px_-10px_rgba(56,189,248,0.25)] -translate-y-1.5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            {/* Top Row: Number & Icon */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-black text-slate-400 font-mono">
                  {item.step}
                </span>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>

              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block mb-1">
                {item.tagline}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Visual Micro Badge */}
            <div className={`mt-6 p-3 rounded-xl bg-gradient-to-r ${item.preview.accent} border border-white/10`}>
              <p className="text-xs font-semibold text-white truncate">{item.preview.label}</p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-300">
                <FaCheck className="text-emerald-400 text-[10px]" />
                <span>{item.preview.badge}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA Banner inside How It Works */}
      <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-teal-500/10 border border-sky-500/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h4 className="text-xl font-bold text-white">Ready to see it on your site today?</h4>
          <p className="text-sm text-slate-300 mt-1">Get started in minutes with 500 free queries included.</p>
        </div>
        <button
          onClick={() => router.push("/get-started")}
          className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition shadow-lg shadow-white/10 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Claim Your Free API Key</span>
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </section>
  );
}
