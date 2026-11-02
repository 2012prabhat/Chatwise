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
  FaPlus,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi";
import api from "@/lib/api";
import useAuthStore from "./useAuthStore";

export default function Navbar({ onMobileToggle, mobileOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

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

  const getPageTitle = () => {
    if (pathname === "/dashboard") return { title: "Overview", subtitle: "Real-time metrics & system performance" };
    if (pathname === "/knowledgebase") return { title: "Knowledge Base", subtitle: "Train your AI on custom Q&A and documentation" };
    if (pathname === "/integration") return { title: "Integration & Keys", subtitle: "Manage API keys and embed code for your sites" };
    return { title: "Console", subtitle: "ChatWise Management Platform" };
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b14]/80 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
        </button>

        {/* Brand on mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <Image
            src="/logoCircle.png"
            alt="ChatWise"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="text-white font-bold text-base">ChatWise</span>
        </div>

        {/* Breadcrumb / Page Title on Desktop */}
        <div className="hidden lg:flex flex-col">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/dashboard" className="hover:text-slate-200 transition">
              Console
            </Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">{title}</span>
          </div>
          <h1 className="text-base font-bold text-white tracking-tight">{title}</h1>
        </div>
      </div>

      {/* Right: Quick actions + Status + User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* System Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Hybrid AI Live</span>
        </div>

        {/* Quick link to Knowledge or Embed */}
        {pathname !== "/knowledgebase" && (
          <Link
            href="/knowledgebase"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white text-xs font-semibold transition"
          >
            <FaPlus className="text-[10px] text-sky-400" />
            <span>Add Knowledge</span>
          </Link>
        )}

        {/* User Pill */}
        <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-sky-400/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-100 leading-tight">
                {user?.name || "Member"}
              </span>
              <span className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">
                {user?.company || "Organization"}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
          >
            <BiLogOut className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}
