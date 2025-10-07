"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";
import StatsSection from "./StatsSection";
import HomeSection from "./HomeSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close mobile menu on click
    }
  };

  return (

    <div className="back1">
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 back1"

      >
        {/* Brand + Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
         <Image
  src="/logoCircle.png"
  alt="ChatWise Logo"
  width={32}
  height={32}
  className="h-8 transition-transform duration-[2000ms] ease-in-out"
/>
          <span className="text-white font-bold text-xl">ChatWise</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          {["features", "how-it-works", "testimonials", "faq"].map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-gray-200 transition-colors duration-300 capitalize"
              onClick={() => handleScroll(item)}
            >
              {item.replaceAll("-", " ")}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button
            className="text-white cursor-pointer px-4 py-1 rounded  transition duration-300"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className="bg-white flex items-center gap-2 text-black px-4 py-1 rounded hover:bg-gray-200 transition duration-300 group font-semibold cursor-pointer"
            onClick={() => router.push("/get-started")}
          >
            Get Started
            <FaChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiMenu />}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="absolute top-full left-0 w-full bg-[var(--mainCol)] flex flex-col items-center py-4 space-y-4 md:hidden"
          >
            {["features", "how-it-works", "testimonials", "faq"].map((item) => (
              <li
                key={item}
                className="cursor-pointer text-white text-lg hover:text-gray-200 transition-colors duration-300 list-none"
                onClick={() => handleScroll(item)}
              >
                {item.replace("-", " ")}
              </li>
            ))}

            <div className="flex space-x-4 mt-2">
              <button
                className="text-white border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition duration-300"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="bg-white flex items-center gap-2 text-black px-4 py-1 rounded hover:bg-gray-200 transition duration-300 group"
                onClick={() => router.push("/get-started")}
              >
                Get Started
                <FaChevronRight className="transition-transform duration-300 group-hover:translate-x-2" />
              </button>

            </div>
          </div>
        )}
      </nav>

      <HomeSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <Faq />
     
    </div>

  );
}
