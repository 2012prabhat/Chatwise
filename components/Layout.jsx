"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FaChartBar,
  FaBookOpen,
  FaCode,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaBolt,
  FaCheck,
  FaRobot,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { HiX } from "react-icons/hi";
import Navbar from "./Navbar";
import ChatWidget from "@/components/ChatWidget";
import useAuthStore from "./useAuthStore";
import api from "@/lib/api";

const navigationItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: FaChartBar,
    badge: null,
  },
  {
    name: "Knowledge Base",
    href: "/knowledgebase",
    icon: FaBookOpen,
    badge: "Vector AI",
  },
  {
    name: "Integration & Keys",
    href: "/integration",
    icon: FaCode,
    badge: null,
  },
];

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      logout();
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-sky-500 selection:text-white">
      {/* ============================================================== */}
      {/* DESKTOP SIDEBAR (Visible on lg and above) */}
      {/* ============================================================== */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#090e1c] border-r border-white/[0.08] sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)] group-hover:border-sky-400 transition-colors">
              <Image
                src="/logoCircle.png"
                alt="ChatWise Logo"
                width={26}
                height={26}
                className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-lg tracking-tight flex items-center gap-1.5">
                ChatWise
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  AI
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Management
            </p>
            <nav className="space-y-1.5">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-sky-500/20 to-blue-600/15 text-sky-300 border border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`text-base transition-colors ${
                          isActive
                            ? "text-sky-400"
                            : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Quick Links
            </p>
            <nav className="space-y-1.5">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition group"
              >
                <div className="flex items-center gap-3">
                  <FaExternalLinkAlt className="text-xs text-slate-400 group-hover:text-slate-200" />
                  <span>Public Landing Page</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>

        {/* System Health Card */}
        <div className="p-4 mx-4 mb-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Hybrid Engine Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Cohere API + Vector Search online. Zero downtime reported.
          </p>
        </div>

        {/* User Card at bottom */}
        <div className="p-4 border-t border-white/[0.08] flex items-center justify-between bg-[#080d19]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {user?.name || "Admin Member"}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {user?.company || "Organization"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer shrink-0"
          >
            <BiLogOut className="text-lg" />
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* MOBILE DRAWER OVERLAY */}
      {/* ============================================================== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-72 bg-[#090e1c] border-r border-white/10 flex flex-col h-full z-10 p-5 space-y-6 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logoCircle.png"
                  alt="ChatWise"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <span className="text-white font-bold text-lg">ChatWise</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            <nav className="space-y-2 flex-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon className={isActive ? "text-sky-400" : "text-slate-400"} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  <span>Public Landing Page</span>
                </Link>
              </div>
            </nav>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-xs font-bold text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{user?.name}</p>
                  <p className="text-[10px] text-slate-400">{user?.company}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-rose-400 hover:text-rose-300 p-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MAIN VIEWPORT WRAPPER */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          onMobileToggle={() => setMobileOpen(!mobileOpen)}
          mobileOpen={mobileOpen}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}
