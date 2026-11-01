"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaChevronRight,
  FaBolt,
  FaShieldAlt,
  FaCode,
  FaCheck,
  FaArrowRight,
  FaRobot,
  FaBookOpen,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { FiSend } from "react-icons/fi";

const sampleQuestions = [
  {
    q: "How do I embed ChatWise on my website?",
    a: "It takes just 30 seconds! Add our 1-line script tag before your closing </body> tag with your API key. It works instantly on Next.js, React, WordPress, Shopify, and plain HTML.",
    source: "Knowledge Base",
  },
  {
    q: "Can I train the bot on my own custom documents?",
    a: "Yes! Simply paste your FAQs or upload documentation in the Knowledge Base dashboard. ChatWise indexes your data and prioritizes your answers before falling back to Cohere AI.",
    source: "Knowledge Base",
  },
  {
    q: "What happens if a user asks something not in my docs?",
    a: "Our smart hybrid fallback seamlessly queries our fine-tuned Cohere AI model with strict guardrails to answer politely and helpfully without hallucinating.",
    source: "Hybrid AI Fallback",
  },
];

function HomeSection() {
  const router = useRouter();
  const [activeQA, setActiveQA] = useState(sampleQuestions[0]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectQuestion = (item) => {
    if (activeQA.q === item.q) return;
    setIsTyping(true);
    setActiveQA(item);
    setTimeout(() => setIsTyping(false), 350);
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-500/20 via-indigo-600/15 to-teal-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-sky-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid background texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Feature Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-sky-400/30 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.15)] mb-8 hover:border-sky-400/60 transition-all cursor-pointer group"
          onClick={() => {
            const el = document.getElementById("features");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-200 tracking-wide">
            Next-Gen AI Customer Support Platform
          </span>
          <FaChevronRight className="text-[10px] text-sky-400 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]"
        >
          Instant Support Answers,{" "}
          <span className="gradientText block mt-2">
            Trained on Your Business
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          Empower your website with an autonomous AI chatbot. Ingest your FAQs & docs in seconds, embed with 1 line of code, and deliver 24/7 instant human-grade answers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-base group"
            onClick={() => router.push("/get-started")}
          >
            Start Building Free
            <FaArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-200 cursor-pointer text-base"
            onClick={() => {
              const el = document.getElementById("live-demo");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <HiSparkles className="text-sky-400 text-sm" />
            Explore Live Demo
          </button>
        </motion.div>

        {/* Micro Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400 font-medium"
        >
          <div className="flex items-center gap-1.5">
            <FaCheck className="text-emerald-400 text-xs" />
            No credit card needed
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <FaBolt className="text-sky-400 text-xs" />
            &lt; 250ms response time
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <FaCode className="text-indigo-400 text-xs" />
            1-line script embed
          </div>
        </motion.div>

        {/* HERO INTERACTIVE PRODUCT PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 w-full relative"
        >
          {/* Subtle Ambient Back-glow behind preview */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

          {/* Floating Pill Badges */}
          <div className="hidden lg:flex absolute -top-5 -left-6 z-20 items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-xl animate-bounce [animation-duration:4s]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left">
              <p className="text-[11px] font-semibold text-slate-200">Resolution Speed</p>
              <p className="text-xs font-bold text-emerald-400">180ms avg response</p>
            </div>
          </div>

          <div className="hidden lg:flex absolute -bottom-5 -right-6 z-20 items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-sky-500/30 backdrop-blur-xl shadow-xl animate-bounce [animation-duration:5s]">
            <FaRobot className="text-sky-400 text-lg" />
            <div className="text-left">
              <p className="text-[11px] font-semibold text-slate-200">Hybrid Engine</p>
              <p className="text-xs font-bold text-sky-400">Knowledge + Cohere AI</p>
            </div>
          </div>

          {/* Window Container */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0c1222]/90 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden text-left">
            {/* Window Topbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-slate-900/60">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-medium text-slate-400 hidden sm:inline">
                  ChatWise Interactive Assistant Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Stream Mode
                </span>
              </div>
            </div>

            {/* Quick Demo Question Selector Bar */}
            <div className="px-4 py-3 bg-white/[0.02] border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
              <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
                <HiSparkles className="text-sky-400" /> Test asking:
              </span>
              {sampleQuestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuestion(item)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                    activeQA.q === item.q
                      ? "bg-sky-500/20 text-sky-300 border border-sky-400/40 font-medium"
                      : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/5"
                  }`}
                >
                  {item.q}
                </button>
              ))}
            </div>

            {/* Interactive Chat Conversation Body */}
            <div className="p-5 sm:p-6 space-y-4 min-h-[220px]">
              {/* User Message */}
              <div className="flex items-start justify-end gap-3">
                <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-lg shadow-md text-sm sm:text-base">
                  {activeQA.q}
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700/80 border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-200 shrink-0">
                  You
                </div>
              </div>

              {/* Bot Response */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <FaRobot className="text-sm" />
                </div>
                <div className="bg-slate-800/80 border border-white/10 rounded-2xl rounded-tl-sm p-4 max-w-xl text-slate-200 text-sm sm:text-base shadow-sm">
                  {isTyping ? (
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse [animation-delay:300ms]" />
                    </div>
                  ) : (
                    <div>
                      <p className="leading-relaxed">{activeQA.a}</p>
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-sky-400 font-medium">
                          <FaBookOpen className="text-[11px]" />
                          Verified: {activeQA.source}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Response time: 0.18s
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Input Bar Simulation */}
            <div className="p-3 sm:p-4 bg-slate-900/60 border-t border-white/[0.08] flex items-center gap-3">
              <input
                type="text"
                readOnly
                placeholder="Click one of the suggested prompts above or launch full demo..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-300 placeholder-slate-400 focus:outline-none"
              />
              <button
                className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-sky-500/20"
                onClick={() => router.push("/get-started")}
              >
                <span>Deploy</span>
                <FiSend className="text-xs" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeSection;
