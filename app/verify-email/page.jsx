"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaExclamationTriangle, FaSyncAlt, FaArrowRight } from "react-icons/fa";

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("verifying"); // "verifying", "success", "error"
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    setToken(searchParams.get("token"));
  }, [searchParams]);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const response = await axios.post("/api/auth/verify-email", { token });
        setStatus("success");
        setMessage(response.data.message || "Email verified successfully! Your account is now active.");
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed or link has expired.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col justify-between relative overflow-hidden select-none p-4">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/logoCircle.png" alt="Logo" width={36} height={36} className="rounded-full" />
          <span className="text-lg font-bold text-white tracking-tight">ChatWise</span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-[#0c1324]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          {status === "verifying" && (
            <div className="space-y-4">
              <FaSyncAlt className="text-sky-400 text-4xl animate-spin mx-auto" />
              <h2 className="text-xl font-bold text-white">Verifying Account</h2>
              <p className="text-xs text-slate-400">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl mx-auto">
                <FaCheckCircle />
              </div>
              <h2 className="text-xl font-bold text-white">Email Verified!</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{message}</p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="w-full h-11 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Log in to your Dashboard</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 text-3xl mx-auto">
                <FaExclamationTriangle />
              </div>
              <h2 className="text-xl font-bold text-white">Verification Failed</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{message}</p>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/get-started"
                  className="w-full h-11 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center transition"
                >
                  Create New Account
                </Link>
                <Link
                  href="/login"
                  className="text-xs text-sky-400 hover:underline pt-1"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500">
        &copy; {new Date().getFullYear()} ChatWise AI.
      </footer>
    </div>
  );
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
