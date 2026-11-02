"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/components/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
  FaBolt,
  FaShieldAlt,
  FaRobot,
  FaSyncAlt,
  FaCheck,
} from "react-icons/fa";
import { alertSuccess, alertError } from "@/components/Alert";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isHydrated, login } = useAuthStore();
  const [form, setForm] = useState({
    email: "2012prabhat@gmail.com",
    password: "prabhat@123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Automatically redirect authenticated user to dashboard
  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isHydrated, router]);

  const fillDemoCredentials = () => {
    setForm({
      email: "2012prabhat@gmail.com",
      password: "prabhat@123",
    });
    alertSuccess("Demo credentials filled!");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alertError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        login(data.user);
        alertSuccess(`Welcome back, ${data.user.name || "User"}!`);
        router.push("/dashboard");
      } else {
        alertError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      alertError("Something went wrong. Please check your connection.");
    }
  };

  // If user is already logged in, hide login page and show redirecting state
  if (isHydrated && isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center select-none">
        <div className="flex flex-col items-center gap-3">
          <FaSyncAlt className="text-sky-400 text-2xl animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Already signed in. Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
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
            Don&apos;t have an account?
          </span>
          <Link
            href="/get-started"
            className="text-xs sm:text-sm font-semibold text-sky-400 hover:text-sky-300 px-3 py-1.5 rounded-xl border border-sky-500/30 hover:border-sky-500/60 bg-sky-500/10 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Dual-Column Authentication Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl bg-[#0c1324]/85 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Hero Pane (Hidden on mobile) */}
          <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-[#0f1a36] via-[#0b1429] to-[#070b14] p-8 flex-col justify-between border-r border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

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
                Turn your knowledge into instant, 24/7 AI customer answers.
              </h2>
            </div>

            {/* Value Highlights */}
            <div className="space-y-4 my-8 relative z-10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 text-sm">
                  <FaBolt />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Hybrid RAG Engine</h4>
                  <p className="text-[11px] text-slate-400">
                    Dual retrieval: your indexed FAQs first, Cohere LLM fallback.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-sm">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Enterprise Privacy</h4>
                  <p className="text-[11px] text-slate-400">
                    Encrypted API keys, HttpOnly session cookies, zero data training.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-sm">
                  <FaRobot />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">1-Minute Integration</h4>
                  <p className="text-[11px] text-slate-400">
                    Single script tag embeds seamlessly on any HTML or React site.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Quote Card */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 relative z-10">
              <div className="flex items-center gap-1 text-emerald-400 text-xs mb-1">
                <FaCheck />
                <span className="font-semibold text-[11px]">94.2% Resolution Rate</span>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                &ldquo;ChatWise cut our repetitive support ticket volume in half within 48 hours.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Form Pane */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
                <span>Welcome back</span>
                <span>👋</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Log in to ChatWise
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
                Access your AI bot dashboard, analytics, and knowledge base.
              </p>
            </div>

            {/* Demo Credentials Pill */}
            <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs shrink-0">
                  <FaBolt />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>Demo Account Pre-filled</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    2012prabhat@gmail.com • prabhat@123
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={fillDemoCredentials}
                className="px-2.5 py-1 text-[11px] font-semibold text-sky-300 hover:text-white bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 rounded-lg transition-all cursor-pointer shrink-0"
              >
                Reset to Demo
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Input with Show/Hide Toggle */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <FaLock className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-11 pr-11 py-3 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#111b33] border-white/20 text-sky-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Keep me signed in for 30 days</span>
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
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Link for Signup */}
            <div className="mt-6 text-center text-xs text-slate-400">
              New to ChatWise?{" "}
              <Link
                href="/get-started"
                className="font-semibold text-sky-400 hover:text-sky-300 transition-colors"
              >
                Create a free account
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500">
        Protected by enterprise-grade TLS 1.3 encryption • &copy; {new Date().getFullYear()} ChatWise AI.
      </footer>
    </div>
  );
}
