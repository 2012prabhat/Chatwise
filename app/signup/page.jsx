"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Signup successful!");
        router.push("/login");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-4 back1"
      style={{
        fontFamily: "'Poppins', sans-serif",
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
            backgroundColor: "#60A5FA",
            opacity: 0.2,
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="w-full max-w-sm">
        {/* Logo + tagline */}
        <div className="text-center mb-8">
          <img
            className="h-12 rounded-full mx-auto"
            src="/logoCircle.png"
            alt="ChatWise Logo"
          />
          <h2 className="text-3xl font-semibold text-white mt-4">
            Create an Account
          </h2>
          <p style={{ color: "#94A3B8" }} className="mt-1">
            Join ChatWise and start your journey.
          </p>
        </div>

        {/* Signup box */}
        <div className="backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
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
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
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
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
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
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
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
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p style={{ color: "#94A3B8" }} className="text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold transition-colors"
                style={{ color: "#60A5FA" }}
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
