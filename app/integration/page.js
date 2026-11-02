"use client";

import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import api from "@/lib/api";
import { alertSuccess, alertError, alertConfirm } from "@/components/Alert";
import {
  FaKey,
  FaCode,
  FaCopy,
  FaCheck,
  FaTrashAlt,
  FaShieldAlt,
  FaTerminal,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaBolt,
  FaPalette,
  FaSyncAlt,
  FaPlus,
  FaGlobe,
  FaLock,
  FaExternalLinkAlt,
} from "react-icons/fa";

const PRESET_COLORS = [
  { name: "Cyan Sky", hex: "#0ea5e9" },
  { name: "Neon Emerald", hex: "#10b981" },
  { name: "Royal Purple", hex: "#8b5cf6" },
  { name: "Sunset Amber", hex: "#f59e0b" },
  { name: "Rose Crimson", hex: "#f43f5e" },
  { name: "Midnight Navy", hex: "#0f172a" },
];

export default function IntegrationPage() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [revokingKeyId, setRevokingKeyId] = useState(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [revealedKeys, setRevealedKeys] = useState({});
  const [selectedKeyId, setSelectedKeyId] = useState("");
  const [brandColor, setBrandColor] = useState("#0ea5e9");
  const [brandLogo, setBrandLogo] = useState("");
  const [activeTab, setActiveTab] = useState("html");
  const [baseUrl, setBaseUrl] = useState("https://chatwise-chatbot.vercel.app");

  // Determine base URL dynamically (use current origin by default so local dev works seamlessly)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin =
        window.location.origin ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        "https://chatwise-chatbot.vercel.app";
      setBaseUrl(origin);
    }
  }, []);

  // Fetch API keys
  const fetchKeys = async () => {
    setFetching(true);
    try {
      const res = await api.get("/api-keys");
      const fetchedKeys = Array.isArray(res.data) ? res.data : [];
      setKeys(fetchedKeys);

      // Select first active key if none selected
      const firstActive = fetchedKeys.find((k) => k.active);
      if (firstActive && !selectedKeyId) {
        setSelectedKeyId(firstActive._id);
      }
    } catch (err) {
      console.error("Error fetching keys:", err);
      // Fallback: try raw fetch with token
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        try {
          const raw = await fetch("/api/api-keys", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (raw.ok) {
            const data = await raw.json();
            setKeys(data);
            const firstActive = data.find((k) => k.active);
            if (firstActive && !selectedKeyId) {
              setSelectedKeyId(firstActive._id);
            }
          }
        } catch (e) {
          console.error("Fallback error:", e);
        }
      }
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  // Generate new API key
  const generateKey = async () => {
    setLoading(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch("/api/api-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate key");
      }

      await fetchKeys();
      alertSuccess("New API key generated successfully!");
    } catch (err) {
      console.error("Error generating key:", err);
      alertError(err.message || "Failed to generate API key.");
    } finally {
      setLoading(false);
    }
  };

  // Revoke API key
  const revokeKey = async (keyId) => {
    const confirm = await alertConfirm(
      "Revoking this key will immediately disconnect any active chat widgets using it. Proceed?"
    );
    if (!confirm.isConfirmed) return;

    setRevokingKeyId(keyId);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch("/api/api-keys", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ keyId }),
      });

      if (res.ok) {
        setKeys((prev) =>
          prev.map((k) => (k._id === keyId ? { ...k, active: false } : k))
        );
        alertSuccess("API Key revoked successfully.");
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to revoke key");
      }
    } catch (err) {
      console.error("Error revoking key:", err);
      alertError(err.message || "Could not revoke key.");
    } finally {
      setRevokingKeyId(null);
    }
  };

  // Toggle key visibility mask
  const toggleKeyReveal = (id) => {
    setRevealedKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Copy helper
  const copyToClipboard = (text, keyId) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(keyId);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  // Active key resolution
  const activeKeys = useMemo(() => keys.filter((k) => k.active), [keys]);
  const activeSelectedKey = useMemo(() => {
    return (
      keys.find((k) => k._id === selectedKeyId)?.key ||
      activeKeys[0]?.key ||
      "YOUR_API_KEY_HERE"
    );
  }, [keys, selectedKeyId, activeKeys]);

  // Code snippets by tab
  const snippets = useMemo(() => {
    const logoAttr = brandLogo ? ` logo="${brandLogo}"` : "";
    const colorAttr = brandColor ? ` color="${brandColor}"` : "";

    return {
      html: `<!-- ChatWise AI Chatbot Widget -->
<script
  src="${baseUrl}/chatbot.js"
  data-api-key="${activeSelectedKey}"${colorAttr}${logoAttr}
  defer
></script>`,

      nextjs: `// In your Next.js root layout (app/layout.jsx or pages/_app.js)
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="${baseUrl}/chatbot.js"
          strategy="lazyOnload"
          data-api-key="${activeSelectedKey}"
          color="${brandColor}"${brandLogo ? `\n          logo="${brandLogo}"` : ""}
        />
      </body>
    </html>
  );
}`,

      react: `// In your top-level React Component or App.jsx
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "${baseUrl}/chatbot.js";
    script.setAttribute("data-api-key", "${activeSelectedKey}");
    script.setAttribute("color", "${brandColor}");${
        brandLogo ? `\n    script.setAttribute("logo", "${brandLogo}");` : ""
      }
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>{/* Your App UI */}</div>;
}`,

      curl: `# Query chatbot directly via REST API
curl -X POST "${baseUrl}/api/chat" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${activeSelectedKey}" \\
  -d '{
    "message": "What services do you offer?"
  }'`,
    };
  }, [baseUrl, activeSelectedKey, brandColor, brandLogo]);

  const copyCurrentSnippet = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <Layout>
      <div className="space-y-8 pb-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1324] via-[#09101d] to-[#060a12] border border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -mb-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <FaBolt className="text-sky-400" />
                <span>Zero-Latency Embed Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Integrations &amp; API Management
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect your AI chatbot to any website, CMS, or native mobile app.
                Customize brand colors, generate API keys, and copy plug-and-play code snippets.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="/test-embed.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                title="Preview public embedded widget in a standalone page"
              >
                <FaExternalLinkAlt className="text-xs text-sky-400" />
                <span>Test Public View</span>
              </a>

              <button
                onClick={generateKey}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSyncAlt className="animate-spin" />
                    <span>Generating Key...</span>
                  </>
                ) : (
                  <>
                    <FaPlus />
                    <span>Generate New API Key</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="text-xs font-medium text-slate-400">Active API Keys</div>
              <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-2">
                {activeKeys.length}
                <span className="text-xs font-normal text-emerald-400">operational</span>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="text-xs font-medium text-slate-400">Total Issued Keys</div>
              <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-2">
                {keys.length}
                <span className="text-xs font-normal text-slate-400">keys</span>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="text-xs font-medium text-slate-400">CORS Whitelist</div>
              <div className="text-sm font-bold text-sky-400 mt-2 flex items-center gap-1.5">
                <FaGlobe className="text-sky-400" />
                <span>Global (* Enabled)</span>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="text-xs font-medium text-slate-400">Script Protocol</div>
              <div className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                <FaLock className="text-emerald-400" />
                <span>TLS 1.3 / HTTPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Customizer & Code Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Customizer Settings Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0c1324]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-5 shadow-xl">
              <div className="flex items-center gap-2 text-white font-bold text-base border-b border-white/10 pb-4">
                <FaPalette className="text-sky-400" />
                <span>Customize Your Chatbot</span>
              </div>

              {/* Key Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select Associated API Key
                </label>
                {activeKeys.length > 0 ? (
                  <select
                    value={selectedKeyId}
                    onChange={(e) => setSelectedKeyId(e.target.value)}
                    className="w-full bg-[#111b33] text-white text-xs font-mono rounded-xl p-3 border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                  >
                    {activeKeys.map((k) => (
                      <option key={k._id} value={k._id}>
                        {k.key.slice(0, 12)}••••••••{k.key.slice(-6)} (Active)
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
                    <span>No active key found.</span>
                    <button
                      onClick={generateKey}
                      className="text-white bg-amber-600 hover:bg-amber-500 px-2 py-1 rounded font-semibold text-[11px]"
                    >
                      Create One
                    </button>
                  </div>
                )}
              </div>

              {/* Brand Accent Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Brand Theme Color
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setBrandColor(color.hex)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all text-left ${
                        brandColor.toLowerCase() === color.hex.toLowerCase()
                          ? "bg-white/10 border-sky-400 text-white shadow-sm"
                          : "bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="truncate">{color.name}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Color Input */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      placeholder="#0ea5e9"
                      className="w-full bg-[#111b33] text-white text-xs font-mono pl-8 pr-3 py-2.5 rounded-xl border border-white/10 focus:border-sky-500 outline-none"
                    />
                    <div
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded border border-white/20"
                      style={{ backgroundColor: brandColor }}
                    />
                  </div>
                  <input
                    type="color"
                    value={brandColor.startsWith("#") ? brandColor : "#0ea5e9"}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Brand Logo URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Brand Avatar / Logo URL (Optional)
                </label>
                <input
                  type="url"
                  value={brandLogo}
                  onChange={(e) => setBrandLogo(e.target.value)}
                  placeholder="https://yourdomain.com/logo.png"
                  className="w-full bg-[#111b33] text-white text-xs placeholder-slate-500 px-3 py-2.5 rounded-xl border border-white/10 focus:border-sky-500 outline-none"
                />
              </div>

              {/* Mini Live Preview Badge */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs font-semibold text-slate-400 mb-2">Live Floating Trigger Preview</div>
                <div className="bg-[#09101d] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-colors overflow-hidden"
                      style={{ backgroundColor: brandColor }}
                    >
                      {brandLogo ? (
                        <img
                          src={brandLogo}
                          alt="Logo"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <FaBolt className="text-sm" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Support Assistant</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Online &amp; Answering
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Snippet Code Generator Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0c1324]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-xl flex flex-col h-full">
              {/* Header Tabs */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex space-x-1 sm:space-x-2">
                  {[
                    { id: "html", label: "HTML Script", icon: FaCode },
                    { id: "nextjs", label: "Next.js", icon: FaCode },
                    { id: "react", label: "React Hook", icon: FaCode },
                    { id: "curl", label: "cURL API", icon: FaTerminal },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 cursor-pointer ${
                          isActive
                            ? "border-sky-400 text-sky-400 bg-white/5"
                            : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Icon className="text-xs" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 1-Click Copy Snippet */}
                <button
                  onClick={copyCurrentSnippet}
                  className="mb-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition cursor-pointer"
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

              {/* Code Display Area */}
              <div className="relative p-4 sm:p-6 bg-[#070b14]/90 flex-1 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-sky-300 leading-relaxed whitespace-pre selection:bg-sky-500/30">
                  {snippets[activeTab]}
                </pre>
              </div>

              {/* Implementation Note */}
              <div className="p-4 bg-white/[0.02] border-t border-white/5 text-xs text-slate-400 flex items-start gap-2.5">
                <FaShieldAlt className="text-sky-400 shrink-0 mt-0.5" />
                <span>
                  {activeTab === "html" &&
                    "Paste this single tag right before </body> in your HTML template (WordPress, Shopify, Webflow, Wix, or static site)."}
                  {activeTab === "nextjs" &&
                    "Uses Next.js next/script with lazyOnload to guarantee zero penalty to your Core Web Vitals score."}
                  {activeTab === "react" &&
                    "Injects the script client-side cleanly when your React component mounts and cleans up on unmount."}
                  {activeTab === "curl" &&
                    "Call ChatWise programmatically from any server-side language (Node.js, Python, Go, Ruby)."}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* API Keys Management Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaKey className="text-sky-400" />
                <span>Your API Keys</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage credentials used to authenticate your chatbot integrations
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchKeys}
                disabled={fetching}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition cursor-pointer"
              >
                <FaSyncAlt className={fetching ? "animate-spin" : ""} />
                <span>Refresh</span>
              </button>

              <button
                onClick={generateKey}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500 transition cursor-pointer disabled:opacity-50"
              >
                <FaPlus />
                <span>Generate Key</span>
              </button>
            </div>
          </div>

          {/* Keys List */}
          <div className="space-y-3">
            {fetching ? (
              <div className="text-center py-12 bg-[#0c1324]/40 rounded-2xl border border-white/5">
                <FaSyncAlt className="text-sky-400 text-xl animate-spin mx-auto mb-2" />
                <p className="text-slate-400 text-xs">Loading API keys...</p>
              </div>
            ) : keys.length > 0 ? (
              keys.map((k) => {
                const isRevealed = revealedKeys[k._id];
                const displayKey = isRevealed
                  ? k.key
                  : `${k.key.slice(0, 8)}••••••••••••••••••••••••${k.key.slice(-4)}`;

                return (
                  <div
                    key={k._id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      k.active
                        ? "bg-[#0c1324]/80 border-white/10 hover:border-sky-500/30"
                        : "bg-[#0c1324]/40 border-white/5 opacity-60"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Key details */}
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                              k.active
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                k.active ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                              }`}
                            />
                            {k.active ? "Active" : "Revoked"}
                          </span>

                          {k.createdAt && (
                            <span className="text-[11px] text-slate-500">
                              Created {new Date(k.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {/* Secret key code display */}
                        <div className="flex items-center gap-2">
                          <code className="text-xs sm:text-sm font-mono text-sky-300 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 break-all">
                            {displayKey}
                          </code>
                          <button
                            onClick={() => toggleKeyReveal(k._id)}
                            className="p-2 text-slate-400 hover:text-white transition rounded-lg hover:bg-white/5 text-xs"
                            title={isRevealed ? "Hide Key" : "Reveal Key"}
                          >
                            {isRevealed ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* Key action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => copyToClipboard(k.key, k._id)}
                          disabled={!k.active}
                          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-40"
                        >
                          {copiedKeyId === k._id ? (
                            <>
                              <FaCheck className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <FaCopy />
                              <span>Copy Key</span>
                            </>
                          )}
                        </button>

                        {k.active && (
                          <button
                            onClick={() => revokeKey(k._id)}
                            disabled={revokingKeyId === k._id}
                            className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                          >
                            {revokingKeyId === k._id ? (
                              <>
                                <FaSyncAlt className="animate-spin" />
                                <span>Revoking...</span>
                              </>
                            ) : (
                              <>
                                <FaTrashAlt />
                                <span>Revoke</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-[#0c1324]/40 rounded-2xl border border-white/5 p-6">
                <FaKey className="text-slate-600 text-3xl mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">No API Keys Generated Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                  Create your first API key to start embedding your chatbot and authenticating
                  customer interactions.
                </p>
                <button
                  onClick={generateKey}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Generate First Key
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security & Production Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-sm">
              <FaShieldAlt />
            </div>
            <h4 className="text-sm font-bold text-white">Strict Secret Hygiene</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never commit your secret keys to public git repositories or client bundles. Store
              them in environment variables like <code>CHATWISE_API_KEY</code>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">
              <FaGlobe />
            </div>
            <h4 className="text-sm font-bold text-white">Automatic CORS Protection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Widget embed scripts are served with CORS origin protection and rate limiting to prevent
              unauthorized script abuse.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
              <FaBolt />
            </div>
            <h4 className="text-sm font-bold text-white">Instant Key Revocation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              If an API key is ever compromised, revoking it takes effect across the global Edge
              network in under 500 milliseconds.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
