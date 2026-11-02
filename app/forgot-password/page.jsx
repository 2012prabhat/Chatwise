"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  FaEnvelope,
  FaArrowRight,
  FaArrowLeft,
  FaKey,
  FaSyncAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { alertError, alertSuccess } from "@/components/Alert";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alertError("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/auth/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);
      setSent(true);
      alertSuccess(data.message || "Password reset instructions sent to your email!");
    } catch (error) {
      setLoading(false);
      const errorMsg =
        error.response?.data?.message ||
        "Could not send reset link. Please check the email entered.";
      alertError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
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
          href="/login"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
        >
          <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
          <span>Back to login</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white"
        >
          <span>ChatWise Home</span>
        </Link>
      </header>

      {/* Centered Glass Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-[#0c1324]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 mx-auto mb-4 text-white text-lg">
              <FaKey />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
              Enter your registered email address and we&apos;ll send you a secure link to reset your credentials.
            </p>
          </div>

          {sent ? (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <FaCheckCircle className="text-emerald-400 text-3xl mx-auto" />
              <h3 className="text-sm font-bold text-white">Reset Link Dispatched</h3>
              <p className="text-xs text-slate-300">
                We sent an email to <strong className="text-white">{email}</strong>. Please click the link inside to set a new password.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs text-sky-400 hover:underline pt-2 inline-block cursor-pointer"
              >
                Didn&apos;t receive it? Try another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Account Email Address
                </label>
                <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSyncAlt className="animate-spin text-sm" />
                    <span>Sending Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Password Reset Link</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Back Link */}
          <div className="pt-2 text-center text-xs text-slate-400 border-t border-white/10">
            Remember your credentials?{" "}
            <Link
              href="/login"
              className="font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              Back to log in
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500">
        ChatWise AI • Enterprise Security
      </footer>
    </div>
  );
}
