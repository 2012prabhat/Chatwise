"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
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
      // Token is now in HttpOnly cookie, no need to save manually
      // You can save user info in localStorage or Zustand
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } else {
      alert(data.error || "Login failed");
    }
  } catch (error) {
    setLoading(false);
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-4"
      style={{
        backgroundColor: "var(--mainCol)", // background-dark
        fontFamily: "'Poppins', sans-serif",
        color: "#E2E8F0", // on-surface-dark
      }}
    >
      {/* Grid background */}
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
            backgroundColor: "#f0abfc", // fuchsia-400
            opacity: 0.2,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="w-full max-w-sm">
        {/* Logo + tagline */}
        <div className="text-center mb-8">
          
          
          <h1
            className="text-5xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right,#60A5FA,#ffffff)", // from blue-400 to white
            }}
          >
            ChatWise
          </h1>
          <p style={{ color: "#94A3B8" /* on-surface-dark-muted */ }} className="mt-2 text-lg">
            AI-Powered Conversations
          </p>
        </div>

        {/* Login box */}
        <div
          className="backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
          style={{
            backgroundColor: "rgba(30,41,59,0.8)", // surface-dark/80
            boxShadow: "0 25px 50px -12px rgba(59,130,246,0.1)", // shadow-primary/10
          }}
        >
          <div className="text-center mb-6">
            <img className="h-12 rounded-full mx-auto" src="/logoCircle.png" alt="" />
            <h2 className="text-3xl font-semibold text-white">Welcome Back!</h2>
            <p style={{ color: "#94A3B8" }} className="mt-1">
              Please enter your credentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-lg border-2 text-white h-12 px-4 transition duration-300 ease-in-out"
                style={{
                  borderColor: "#334155", // slate-700
                  backgroundColor: "rgba(30,41,59,0.5)", // slate-800/50
                  color: "#E2E8F0", // on-surface-dark
                }}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-lg border-2 text-white h-12 px-4 transition duration-300 ease-in-out"
                style={{
                  borderColor: "#334155",
                  backgroundColor: "rgba(30,41,59,0.5)",
                  color: "#E2E8F0",
                }}
                required
              />
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm font-medium transition-colors"
                style={{ color: "#60A5FA" }} // primary-light
              >
                Forgot Password?
              </a>
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
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p style={{ color: "#94A3B8" }} className="text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-semibold transition-colors"
              style={{ color: "#60A5FA" }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
