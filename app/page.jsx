"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

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
          <img
            src="logoCircle.png"
            alt="ChatWise Logo"
            className="h-8 transition-transform duration-2000 ease-in-out"
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
              {item.replace("-", " ")}
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

      <section id="home" className="min-h-[calc(100vh-65px)] p-4 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-semibold text-[#4b3ef7]">Chatwise</h1>
        <h1 className="text-4xl text-center italic font-bold text-white mt-2">Simplifying Support With Intelligence</h1>
        <h2 className="text-gray-300 md:px-44 text-center text-2xl mt-12">Transform your customer support with AI that understands your business. Train it on your docs, customize its persona, and watch it handle inquiries 24/7.</h2>
        <div className="mt-12 flex gap-6">
          <button
            className="bg-white flex items-center gap-2 text-black px-4 py-1 rounded rounded-lg hover:bg-gray-200 transition duration-300 group font-semibold cursor-pointer"
            onClick={() => router.push("/get-started")}
          >
            Get Started
            <FaChevronRight className="transition-transform duration-300 group-hover:translate-x-1 " />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded cursor-pointer text-white backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition duration-300 rounded rounded-lg">
            <FaPlay className="text-white" />
            Watch Demo
          </button>
        </div>
      </section>
      <section id="features" className="min-h-[calc(100vh-65px)] p-4 flex flex-col items-center justify-center">
      
        
      </section>
      <section id="how-it-works"></section>
      <section id="testimonials"></section>
      <section id="faq"></section>
    </div>

  );
}
