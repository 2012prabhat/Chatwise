"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
  FaKey,
  FaSyncAlt,
} from "react-icons/fa";
import { alertError, alertSuccess } from "@/components/Alert";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tokenParam = params.get("token");
      if (tokenParam) setToken(tokenParam);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alertError("Please fill in both password fields");
      return;
    }

    if (password.length < 6) {
      alertError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alertError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.patch(
        "/api/auth/reset-password",
        { token, newPassword: password, confirmPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);
      alertSuccess(data.message || "Password reset successfully! You can now log in.");
      router.push("/login");
    } catch (error) {
      setLoading(false);
      const errorMsg =
        error.response?.data?.message ||
        "Could not reset password. The link may be expired.";
      alertError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between relative overflow-hidden select-none p-4">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to login</span>
        </Link>
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/logoCircle.png" alt="Logo" width={32} height={32} className="rounded-full" />
          <span className="text-sm font-bold text-white tracking-tight">ChatWise</span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-[#0c1324]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 mx-auto mb-4 text-white text-lg">
              <FaKey />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Set New Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
              Please enter and confirm your new secure account password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                New Password
              </label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-11 pr-11 py-3 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Confirm New Password
              </label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-slate-500 text-xs pointer-events-none" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="w-full bg-[#111b33] text-white placeholder-slate-500 text-xs sm:text-sm pl-11 pr-11 py-3 rounded-xl border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
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
                  <span>Saving New Password...</span>
                </>
              ) : (
                <>
                  <span>Save Password &amp; Log In</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400 border-t border-white/10">
            Remember your credentials?{" "}
            <Link href="/login" className="font-semibold text-sky-400 hover:text-sky-300">
              Back to log in
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500">
        ChatWise AI • Enterprise Security
      </footer>
    </div>
  );
}
