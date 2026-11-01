"use client";

import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuthStore from "@/components/useAuthStore";

function HomeNav() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070b14]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand + Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/30 group-hover:border-sky-400 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Image
              src="/logoCircle.png"
              alt="ChatWise Logo"
              width={26}
              height={26}
              className="h-6 w-6 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-extrabold text-xl tracking-tight flex items-center gap-1.5">
              ChatWise
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                AI
              </span>
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {[
            { id: "features", label: "Features" },
            { id: "live-demo", label: "Live Demo" },
            { id: "how-it-works", label: "How It Works" },
            { id: "testimonials", label: "Reviews" },
            { id: "faq", label: "FAQ" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <button
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
          )}

          <button
            className="relative group overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 cursor-pointer"
            onClick={() => router.push("/get-started")}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Get Started Free
              <FaChevronRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06] transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 rounded-2xl bg-[#0b101d] border border-white/10 p-5 shadow-2xl backdrop-blur-2xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {[
              { id: "features", label: "Features" },
              { id: "live-demo", label: "Live Demo" },
              { id: "how-it-works", label: "How It Works" },
              { id: "testimonials", label: "Reviews" },
              { id: "faq", label: "FAQ" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <button
                className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] transition"
                onClick={() => {
                  router.push("/dashboard");
                  setMenuOpen(false);
                }}
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] transition"
                onClick={() => {
                  router.push("/login");
                  setMenuOpen(false);
                }}
              >
                Sign In
              </button>
            )}

            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25"
              onClick={() => {
                router.push("/get-started");
                setMenuOpen(false);
              }}
            >
              Get Started Free
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default HomeNav;
