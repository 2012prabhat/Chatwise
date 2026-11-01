"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaChevronRight, FaBolt, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

export default function CtaSection() {
  const router = useRouter();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 border border-sky-500/30 bg-gradient-to-br from-slate-900/95 via-[#0b1426] to-[#070d18] shadow-[0_20px_70px_-15px_rgba(2,132,199,0.3)] overflow-hidden text-center">
        {/* Ambient Gradient Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-sky-500/20 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-6">
          <HiSparkles /> Start Free Today
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Ready to Automate Support in <span className="gradientText">Under 5 Minutes?</span>
        </h2>

        {/* Subhead */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Embed an intelligent AI chatbot onto your website today. Train on your docs, resolve up to 85% of queries autonomously, and delight customers 24/7.
        </p>

        {/* Dual Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.push("/get-started")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-base group"
          >
            <span>Get Started for Free</span>
            <FaChevronRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => router.push("/integration")}
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all cursor-pointer text-base"
          >
            Read Integration Guide
          </button>
        </div>

        {/* Proof items */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <FaBolt className="text-sky-400" /> 500 free queries included
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <FaShieldAlt className="text-emerald-400" /> No credit card required
          </span>
          <span>•</span>
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
