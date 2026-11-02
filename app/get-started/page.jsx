"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
  FaBolt,
  FaShieldAlt,
  FaCheckCircle,
  FaSyncAlt,
  FaCheck,
} from "react-icons/fa";
import { alertSuccess, alertError } from "@/components/Alert";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.company || !form.password || !form.confirmPassword) {
      alertError("Please fill out all required fields.");
      return;
    }

    if (form.password.length < 6) {
      alertError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alertError("Passwords do not match. Please verify.");
      return;
    }

    if (!agreed) {
      alertError("Please accept the Terms of Service to continue.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/signup", form);
      setLoading(false);
      alertSuccess("Verification email sent! Please check your inbox to activate your account.");
      router.push("/login");
    } catch (error) {
      setLoading(false);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Could not create account. Please try again.";
      alertError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
        >
          <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
          <span>Back to website</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="text-xs sm:text-sm font-semibold text-sky-400 hover:text-sky-300 px-3 py-1.5 rounded-xl border border-sky-500/30 hover:border-sky-500/60 bg-sky-500/10 transition-all"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* Main Dual-Column Authentication Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-2">
        <div className="w-full max-w-4xl bg-[#0c1324]/85 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Hero Pane (Hidden on mobile) */}
          <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-[#0f1a36] via-[#0b1429] to-[#070b14] p-8 flex-col justify-between border-r border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Brand Title */}
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 overflow-hidden">
                  <Image
                    src="/logoCircle.png"
                    alt="ChatWise Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  ChatWise
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 leading-snug pt-2">
                Launch your enterprise AI support agent in under 3 minutes.
              </h2>
            </div>

            {/* Value Highlights */}
            <div className="space-y-4 my-8 relative z-10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 text-sm">
                  <FaBolt />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Free Starter Tier</h4>
                  <p className="text-[11px] text-slate-400">
                    Includes 1,000 monthly chatbot queries &amp; knowledge indexing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-sm">
                  <FaCheckCircle />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">No Credit Card Needed</h4>
                  <p className="text-[11px] text-slate-400">
                    Get started completely risk-free with immediate API access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-sm">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Full Data Isolation</h4>
                  <p className="text-[11px] text-slate-400">
                    Your questions, answers, and customer chats belong only to you.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Quote Card */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 relative z-10">
              <div className="flex items-center gap-1 text-emerald-400 text-xs mb-1">
                <FaCheck />
                <span className="font-semibold text-[11px]">Instant Setup Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Join hundreds of product teams deploying autonomous AI assistants across their apps.
              </p>
            </div>
          </div>

          {/* Right Form Pane */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
                <span>Start your journey</span>
                <span>🚀</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Create Your Account
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
                Set up your workspace and start building your AI chatbot.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Company in 2-col row on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Full Name <span className="text-sky-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaUser className="absolute left-3.5 text-slate-500 text-xs pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Company Name <span className="text-sky-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaBuilding className="absolute left-3.5 text-slate-500 text-xs pointer-events-none" />
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Work Email <span className="text-sky-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-3.5 text-slate-500 text-xs pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password & Confirm Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password <span className="text-sky-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaLock className="absolute left-3.5 text-slate-500 text-xs pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min 6 characters"
                      className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Confirm Password <span className="text-sky-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaLock className="absolute left-3.5 text-slate-500 text-xs pointer-events-none" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded bg-[#111b33] border-white/20 text-sky-500 focus:ring-0 focus:ring-offset-0 cursor-pointer shrink-0"
                />
                <label htmlFor="agree" className="text-xs text-slate-400 leading-snug cursor-pointer">
                  I agree to ChatWise&apos;s Terms of Service and Privacy Policy.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <FaSyncAlt className="animate-spin text-sm" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Started Free</span>
                      <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Link for Login */}
            <div className="mt-6 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-sky-400 hover:text-sky-300 transition-colors"
              >
                Log in to dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500">
        Enterprise-grade data security • &copy; {new Date().getFullYear()} ChatWise AI.
      </footer>
    </div>
  );
}
