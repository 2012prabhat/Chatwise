"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBookOpen,
  FaKey,
  FaBolt,
  FaChartBar,
  FaCheck,
  FaCode,
  FaRobot,
  FaPlus,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCopy,
  FaShieldAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import Layout from "@/components/Layout";
import useAuthStore from "@/components/useAuthStore";
import api from "@/lib/api";

export default function DashboardPage() {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();

  const [faqCount, setFaqCount] = useState(0);
  const [recentFaqs, setRecentFaqs] = useState([]);
  const [keyCount, setKeyCount] = useState(0);
  const [activeKey, setActiveKey] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    setLoadingStats(true);
    try {
      // Load FAQs count
      const faqRes = await api.get("/knowledgebase/list");
      if (faqRes.data?.faqs) {
        setFaqCount(faqRes.data.faqs.length);
        setRecentFaqs(faqRes.data.faqs.slice(-3).reverse());
      }

      // Load API Keys count
      const keysRes = await api.get("/api-keys");
      if (Array.isArray(keysRes.data)) {
        const activeKeys = keysRes.data.filter((k) => k.active);
        setKeyCount(activeKeys.length);
        if (activeKeys.length > 0) {
          setActiveKey(activeKeys[0].key);
        }
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const copyQuickScript = () => {
    const keyVal = activeKey || "YOUR_API_KEY";
    const script = `<script src="${window.location.origin}/chatbot.js" data-api-key="${keyVal}"></script>`;
    navigator.clipboard.writeText(script);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const calculateProgress = () => {
    let score = 25; // Account created
    if (faqCount > 0) score += 25;
    if (keyCount > 0) score += 25;
    if (faqCount > 0 && keyCount > 0) score += 25;
    return score;
  };

  const progress = calculateProgress();

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* ========================================================== */}
        {/* HERO WELCOME BANNER */}
        {/* ========================================================== */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900/90 via-[#0d162b] to-[#0a1222] border border-white/10 shadow-[0_15px_40px_-15px_rgba(2,132,199,0.25)] overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-500/10 blur-[90px] pointer-events-none rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
                <HiSparkles /> Workspace Active
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back,{" "}
                <span className="gradientText">
                  {user?.name || "Workspace Admin"}
                </span>{" "}
                👋
              </h1>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Here is your ChatWise dashboard for{" "}
                <span className="text-white font-semibold">
                  {user?.company || "your organization"}
                </span>
                . Ingest company knowledge, manage production API keys, and monitor AI resolutions in real-time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/knowledgebase"
                className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs sm:text-sm font-semibold border border-white/10 transition flex items-center gap-2"
              >
                <FaPlus className="text-sky-400 text-xs" />
                <span>Add Knowledge</span>
              </Link>

              <Link
                href="/integration"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/25 transition flex items-center gap-2"
              >
                <FaCode className="text-xs" />
                <span>Deploy Script</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* STATS CARDS GRID */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Knowledge Base */}
          <div className="rounded-2xl p-5 bg-slate-900/60 border border-white/10 hover:border-sky-500/30 backdrop-blur-xl transition group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">
                Knowledge Base FAQs
              </span>
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-sm group-hover:scale-110 transition-transform">
                <FaBookOpen />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {loadingStats ? "..." : faqCount}
              </span>
              <span className="text-xs text-sky-400 font-semibold">
                articles indexed
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-400">Vector Search</span>
              <Link
                href="/knowledgebase"
                className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
              >
                <span>Manage</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>

          {/* Card 2: Active API Keys */}
          <div className="rounded-2xl p-5 bg-slate-900/60 border border-white/10 hover:border-indigo-500/30 backdrop-blur-xl transition group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">
                Active API Keys
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm group-hover:scale-110 transition-transform">
                <FaKey />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {loadingStats ? "..." : keyCount}
              </span>
              <span className="text-xs text-indigo-400 font-semibold">
                live credentials
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-400">Domain Guard</span>
              <Link
                href="/integration"
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <span>Keys & Embed</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>

          {/* Card 3: Avg Response Speed */}
          <div className="rounded-2xl p-5 bg-slate-900/60 border border-white/10 hover:border-emerald-500/30 backdrop-blur-xl transition group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">
                Avg Response Speed
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm group-hover:scale-110 transition-transform">
                <FaBolt />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">240</span>
              <span className="text-xs text-emerald-400 font-semibold">
                ms streaming
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-400">Stream Protocol</span>
              <span className="text-emerald-400 font-medium">Ultra-low latency</span>
            </div>
          </div>

          {/* Card 4: AI Deflection */}
          <div className="rounded-2xl p-5 bg-slate-900/60 border border-white/10 hover:border-amber-500/30 backdrop-blur-xl transition group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">
                Resolution Deflection
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-sm group-hover:scale-110 transition-transform">
                <FaRobot />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">94%</span>
              <span className="text-xs text-amber-400 font-semibold">
                autonomous
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-400">Hybrid Fallback</span>
              <span className="text-amber-400 font-medium">Strict guardrails</span>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SETUP CHECKLIST BAR */}
        {/* ========================================================== */}
        <div className="rounded-2xl p-6 bg-slate-900/40 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Chatbot Launch Checklist</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {progress}% Complete
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete these 4 steps to deploy your personalized chatbot to production.
              </p>
            </div>
            {progress < 100 && (
              <Link
                href={faqCount === 0 ? "/knowledgebase" : "/integration"}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1.5"
              >
                <span>Continue Next Step</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 4 Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-emerald-500/20">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0 font-bold">
                ✓
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">
                  1. Workspace Created
                </p>
                <p className="text-[10px] text-emerald-400">Account Ready</p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                faqCount > 0
                  ? "bg-white/[0.02] border-emerald-500/20"
                  : "bg-white/[0.01] border-white/5 hover:border-sky-500/30"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                  faqCount > 0
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {faqCount > 0 ? "✓" : "2"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">
                  2. Train Knowledge Base
                </p>
                <p className="text-[10px] text-slate-400">
                  {faqCount > 0 ? `${faqCount} FAQs Active` : "Pending input"}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                keyCount > 0
                  ? "bg-white/[0.02] border-emerald-500/20"
                  : "bg-white/[0.01] border-white/5 hover:border-sky-500/30"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                  keyCount > 0
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {keyCount > 0 ? "✓" : "3"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">
                  3. Generate API Key
                </p>
                <p className="text-[10px] text-slate-400">
                  {keyCount > 0 ? `${keyCount} Key Ready` : "Create credential"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-sky-500/30 transition">
              <div className="w-6 h-6 rounded-full bg-white/10 text-slate-400 flex items-center justify-center text-xs shrink-0 font-bold">
                4
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">
                  4. Embed on Website
                </p>
                <p className="text-[10px] text-slate-400">1-line script tag</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* TWO-COLUMN DASHBOARD HUB */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2 COLUMNS: Quick Hub + Recent Knowledge Base */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Embed Snippet Box */}
            <div className="rounded-2xl p-6 bg-slate-900/60 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-sm">
                    <FaCode />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Instant Embed Snippet
                    </h3>
                    <p className="text-xs text-slate-400">
                      Paste right before the closing &lt;/body&gt; tag of your website
                    </p>
                  </div>
                </div>

                <button
                  onClick={copyQuickScript}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 hover:text-white border border-white/10 transition cursor-pointer"
                >
                  {copiedSnippet ? (
                    <>
                      <FaCheck className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-[#070b14] border border-white/[0.06] text-xs font-mono text-slate-300 overflow-x-auto">
                <code>
                  {`<script src="${typeof window !== "undefined" ? window.location.origin : "https://chatwise.ai"}/chatbot.js" data-api-key="${activeKey || "YOUR_API_KEY"}"></script>`}
                </code>
              </pre>
            </div>

            {/* Recent Knowledge Base Entries */}
            <div className="rounded-2xl p-6 bg-slate-900/60 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
                    <FaBookOpen />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Recent Knowledge Base FAQs
                    </h3>
                    <p className="text-xs text-slate-400">
                      Prioritized first before AI fallback queries
                    </p>
                  </div>
                </div>

                <Link
                  href="/knowledgebase"
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <span>View All ({faqCount})</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>

              {recentFaqs.length > 0 ? (
                <div className="space-y-3">
                  {recentFaqs.map((faq, idx) => (
                    <div
                      key={faq._id || idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-xs font-bold text-white truncate">
                          {faq.question}
                        </p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium shrink-0">
                          Indexed
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-slate-400 mb-3">
                    No FAQs added yet. Ingest your first Q&A to personalize answers!
                  </p>
                  <Link
                    href="/knowledgebase"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold hover:bg-sky-500/30 transition"
                  >
                    <FaPlus className="text-[10px]" /> Add First FAQ
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Engine Specs & Direct Testing Prompt */}
          <div className="space-y-6">
            {/* System Status Panel */}
            <div className="rounded-2xl p-6 bg-slate-900/60 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FaShieldAlt className="text-sky-400" />
                <span>Architecture Status</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Cohere AI Model</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Vector Knowledge</span>
                  <span className="text-sky-400 font-semibold">Active Match</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Origin Domain Whitelist</span>
                  <span className="text-slate-300 font-mono text-[11px]">Enforced</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Stream Protocol</span>
                  <span className="text-indigo-400 font-semibold">SSE (Text Stream)</span>
                </div>
              </div>
            </div>

            {/* Test Assistant Callout */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-teal-500/10 border border-sky-500/20 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto text-lg">
                <FaRobot />
              </div>
              <h4 className="text-sm font-bold text-white">
                Test Your Chatbot Live
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click the floating chat widget at the bottom right corner of this screen to test how your chatbot answers right now!
              </p>
              <div className="pt-1">
                <span className="inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-sky-300 font-medium">
                  👉 Click bottom-right bubble
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
