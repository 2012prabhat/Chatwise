"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Head of Customer Success",
    company: "SaaSify Global",
    avatarBg: "from-sky-500 to-blue-600",
    initials: "AS",
    review:
      "ChatWise transformed our support workflow overnight. Our first response time dropped from 18 minutes to literally under a second, and our team now focuses only on high-tier enterprise tickets.",
    rating: 5,
    highlight: "94% autonomous resolution rate",
  },
  {
    id: 2,
    name: "Sana Verma",
    role: "Lead Product Manager",
    company: "NextCart E-Commerce",
    avatarBg: "from-indigo-500 to-purple-600",
    initials: "SV",
    review:
      "The setup was unbelievable — we pasted the script tag into our Shopify store, uploaded our return policy, and it started handling customer queries flawlessly. Our customer CSAT jumped to 4.9/5.",
    rating: 5,
    highlight: "Saved 25+ agent hours weekly",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Founder & CEO",
    company: "TechNest Ventures",
    avatarBg: "from-teal-500 to-emerald-600",
    initials: "RM",
    review:
      "The hybrid fallback is pure genius. When users ask specific business questions, it cites our exact knowledge base. When they ask open-ended questions, the Cohere AI model handles it naturally.",
    rating: 5,
    highlight: "Best ROI tool we adopted this year",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
          <div className="flex text-amber-400 text-[10px]">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span>Rated 4.9/5 by High-Growth Teams</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Loved by Support Teams, <span className="gradientText">Trusted by Users</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Discover how companies use ChatWise to reduce ticket volumes and deliver instant answers 24/7.
        </p>
      </div>

      {/* Testimonials 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="rounded-3xl p-7 cardBack flex flex-col justify-between border border-white/10 hover:border-sky-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_15px_35px_-10px_rgba(56,189,248,0.2)]"
          >
            <div>
              {/* Rating + Quote Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex text-amber-400 text-sm gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <FaQuoteLeft className="text-slate-600 text-xl group-hover:text-sky-400 transition-colors" />
              </div>

              {/* Review Text */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic mb-6">
                &ldquo;{item.review}&rdquo;
              </p>
            </div>

            {/* Author info + Highlight Badge */}
            <div className="pt-5 border-t border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-tr ${item.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0`}
                >
                  {item.initials}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                    <FaCheckCircle className="text-sky-400 text-xs shrink-0" title="Verified Customer" />
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {item.role} · <span className="text-slate-300">{item.company}</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-[11px] font-medium text-sky-300">
                ⭐ {item.highlight}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
