"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { alertSuccess, alertError } from "@/components/Alert";
import axios from "axios";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alertError("Passwords do not match!");
    return;
  }

  setLoading(true);

  try {
    const { data } = await axios.post("/api/auth/signup", form);

    setLoading(false);
    alertSuccess("Verification email sent to your email ID");
  } catch (error) {
    setLoading(false);

    if (error.response && error.response.data?.message) {
      alertError(error.response.data.message);
    } else {
      alertError("Something went wrong. Please try again.");
    }
  }
};


  return (
    <div
      className="flex items-center justify-center relative p-4 back1"
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
          <Image
                       src="/logoCircle.png"
                       alt="ChatWise Logo"
                       width={42}
                       height={32}
                       className="h-12 rounded-full mx-auto"
                       onClick={()=>router.push("/")}
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

            {/* Password + Confirm Password in same row */}
            <div className="flex gap-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-1/2 rounded-lg border-2 text-white h-12 px-4 transition duration-300 ease-in-out"
                style={{
                  borderColor: "#334155",
                  backgroundColor: "rgba(30,41,59,0.5)",
                  color: "#E2E8F0",
                }}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-1/2 rounded-lg border-2 text-white h-12 px-4 transition duration-300 ease-in-out"
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
              <button
                onClick={() => router.push("/login")}
                className="font-semibold transition-colors cursor-pointer"
                style={{ color: "#60A5FA" }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
