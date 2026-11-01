"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaShieldAlt,
  FaCode,
  FaChartPie,
  FaSlidersH,
  FaCheck,
  FaCopy,
  FaFilePdf,
  FaFileAlt,
  FaGlobe,
  FaKey,
  FaArrowRight,
} from "react-icons/fa";
import { FiCpu } from "react-icons/fi";

function FeaturesSection() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("html");

  const embedSnippets = {
    html: `<script\n  src="https://chatwise.ai/chatbot.js"\n  data-api-key="cw_live_9482bf7a21"\n></script>`,
    react: `// In your App.jsx or RootLayout.jsx\nimport Script from "next/script";\n\n<Script\n  src="https://chatwise.ai/chatbot.js"\n  data-api-key="cw_live_9482bf7a21"\n  strategy="lazyOnload"\n/>`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-4"
        >
          <FiCpu /> Comprehensive AI Toolkit
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Everything You Need to <span className="gradientText block mt-1">Automate Support at Scale</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-300"
        >
          Built from the ground up for modern businesses. Ingest company data, connect secure APIs, and delight users without coding headaches.
        </motion.p>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: Large Document-Aware Knowledge Base (Col-span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 rounded-3xl p-6 sm:p-8 cardBack relative overflow-hidden group border border-white/10 hover:border-sky-500/30"
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-xl mb-5">
                <FaBookOpen />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Knowledge Base & Document Training
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Upload business documents, pricing sheets, product manuals, or custom FAQ pairs. ChatWise indexes and cross-references your documents to generate accurate, source-backed answers.
              </p>
            </div>

            {/* Visual Document Ingestion Demo UI inside card */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-2">
                <span className="font-semibold text-slate-300">Synchronized Knowledge Assets</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 100% Vector Indexed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                  <FaFilePdf className="text-rose-400 text-xl shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">SaaS_Pricing_2026.pdf</p>
                    <p className="text-[10px] text-slate-400">14 pages • Synced</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                  <FaFileAlt className="text-sky-400 text-xl shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">Refund_Policy_FAQ.md</p>
                    <p className="text-[10px] text-slate-400">32 Q&As • Synced</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                  <FaGlobe className="text-indigo-400 text-xl shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">docs.yourdomain.com</p>
                    <p className="text-[10px] text-slate-400">Live Crawl • Synced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Smart Hybrid Fallback System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-6 sm:p-8 cardBack relative overflow-hidden group border border-white/10 hover:border-indigo-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl mb-5">
              <FiCpu />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Smart Hybrid Fallback
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              If an inquiry isn&apos;t covered by your custom FAQs, ChatWise automatically routes through Cohere AI with strict safety guardrails.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-slate-300 font-medium">1. Exact Docs Match</span>
              <span className="text-sky-400 font-semibold">Priority 1</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-slate-300 font-medium">2. Cohere AI Reasoning</span>
              <span className="text-indigo-400 font-semibold">Fallback</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-slate-300 font-medium">3. Guardrail Safeguard</span>
              <span className="text-emerald-400 font-semibold">Zero Hallucinations</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: 1-Line Embed Code Integration (Col-span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="md:col-span-2 rounded-3xl p-6 sm:p-8 cardBack relative overflow-hidden group border border-white/10 hover:border-emerald-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl mb-5">
              <FaCode />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Embed in 60 Seconds with One Script Tag
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              No complex SDK installations or backend servers. Simply copy the generated script tag, insert your API key, and your customized chatbot appears on your site immediately.
            </p>
          </div>

          {/* Interactive Code Preview Box */}
          <div className="mt-6 rounded-2xl bg-[#070b14] border border-white/10 overflow-hidden text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/[0.08]">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab("html")}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === "html" ? "bg-white/10 text-white font-semibold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  HTML / Script Tag
                </button>
                <button
                  onClick={() => setActiveTab("react")}
                  className={`px-3 py-1 rounded-md transition ${
                    activeTab === "react" ? "bg-white/10 text-white font-semibold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Next.js / React
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <FaCheck className="text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 font-mono text-slate-300 overflow-x-auto leading-relaxed">
              <code>{embedSnippets[activeTab]}</code>
            </pre>
          </div>
        </motion.div>

        {/* CARD 4: API Key Management & Security */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6 sm:p-8 cardBack relative overflow-hidden group border border-white/10 hover:border-amber-500/30 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl mb-5">
              <FaKey />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Granular API Keys
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Issue separate API keys for development, staging, and production domains. Revoke compromised keys with a single click.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-white">Production Storefront</p>
                <p className="font-mono text-[10px] text-slate-400">cw_live_****39a1</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                Active
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-white">Staging Environment</p>
                <p className="font-mono text-[10px] text-slate-400">cw_test_****88cf</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-semibold border border-amber-500/20">
                Sandbox
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
