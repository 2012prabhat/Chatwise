"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";

export default function Footer() {
  const router = useRouter();

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050811] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Info (Col 2) */}
          <div className="md:col-span-2 space-y-4">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/30">
                <Image
                  src="/logoCircle.png"
                  alt="ChatWise Logo"
                  width={22}
                  height={22}
                  className="h-5 w-5 object-contain"
                />
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">
                ChatWise
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Autonomous, document-aware AI chatbot platform for modern businesses. Ingest your knowledge, embed with 1 line of code, and automate 80%+ of inquiries.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                All Systems Operational · 99.99% Uptime
              </span>
            </div>
          </div>

          {/* Navigation Column 1: Product */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleScroll("features")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Features & Bento Grid
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("live-demo")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Interactive Sandbox
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("how-it-works")}
                  className="hover:text-white transition cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("testimonials")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/integration")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Integration Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Dashboard & Tools */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="hover:text-white transition cursor-pointer"
                >
                  API Keys Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/knowledgebase")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Knowledge Base
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/login")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Account Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/get-started")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Create Account
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Trust & FAQ */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Trust & Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleScroll("faq")}
                  className="hover:text-white transition cursor-pointer"
                >
                  FAQ Center
                </button>
              </li>
              <li>
                <span className="hover:text-white transition cursor-default">
                  Security & Encryption
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-default">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-default">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ChatWise. Built for intelligent, effortless customer support.</p>

          <div className="flex items-center space-x-4 text-slate-400">
            <a
              href="https://github.com/2012prabhat/chatwise"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition text-base"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <span className="hover:text-white transition text-base cursor-pointer" aria-label="Twitter">
              <FaTwitter />
            </span>
            <span className="hover:text-white transition text-base cursor-pointer" aria-label="LinkedIn">
              <FaLinkedin />
            </span>
            <span className="hover:text-white transition text-base cursor-pointer" aria-label="Discord">
              <FaDiscord />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
