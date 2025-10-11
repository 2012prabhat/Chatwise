"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { alertError, alertSuccess } from "@/components/Alert";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
      alertSuccess(data.message || "Reset link sent to your email");
      router.push("/login");
    } catch (error) {
      setLoading(false);
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      alertError(errorMsg);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-4 back1"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 -z-10 h-full w-full"
        style={{
          backgroundColor: "#0F172A",
          backgroundImage:
            "linear-gradient(to right,#8080800a 1px,transparent 1px),linear-gradient(to bottom,#8080800a 1px,transparent 1px)",
          backgroundSize: "14px 24px",
        }}
      >
        <div
          className="absolute left-0 right-0 top-0 -z-10 m-auto rounded-full"
          style={{
            height: "310px",
            width: "310px",
            backgroundColor: "#60A5FA",
            opacity: 0.2,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="w-full max-w-sm">
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <Image
            src="/logoCircle.png"
            alt="ChatWise Logo"
            width={42}
            height={32}
            className="h-12 rounded-full mx-auto cursor-pointer"
            onClick={() => router.push("/")}
          />
          <h2 className="text-3xl font-semibold text-white mt-4">
            Forgot Password?
          </h2>
          <p style={{ color: "#94A3B8" }} className="mt-1">
            Enter your email to receive a reset link.
          </p>
        </div>

        {/* Forgot Password Box */}
        <div className="backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border-2 text-white h-12 px-4 transition duration-300 ease-in-out"
                style={{
                  borderColor: "#334155",
                  backgroundColor: "rgba(30,41,59,0.5)",
                  color: "#E2E8F0",
                }}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 px-5 font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                style={{
                  backgroundImage: "linear-gradient(to right,#3B82F6,#60A5FA)",
                  color: "#ffffff",
                }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p style={{ color: "#94A3B8" }} className="text-sm">
              Remember your password?{" "}
              <button
                onClick={() => router.push("/login")}
                className="font-semibold transition-colors cursor-pointer"
                style={{ color: "#60A5FA" }}
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
