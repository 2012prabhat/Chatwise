"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaSmile,
  FaBolt,
  FaBuilding,
  FaComments,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaSmile className="text-sky-400 text-xl" />,
    value: 98,
    suffix: "%",
    title: "Customer Satisfaction",
    desc: "Consistent 4.9/5 CSAT rating across customer interactions",
    badge: "+38% vs traditional forms",
  },
  {
    icon: <FaBolt className="text-amber-400 text-xl" />,
    value: 240,
    suffix: "ms",
    title: "Avg First Response",
    desc: "Streamed responses powered by optimized vector indexing",
    badge: "10x faster than live agents",
  },
  {
    icon: <FaBuilding className="text-indigo-400 text-xl" />,
    value: 5000,
    suffix: "+",
    title: "Businesses Powered",
    desc: "From agile startups to fast-growing modern enterprises",
    badge: "Across 40+ countries",
  },
  {
    icon: <FaComments className="text-emerald-400 text-xl" />,
    value: 12,
    suffix: "M+",
    title: "Queries Handled",
    desc: "Autonomous resolution without needing human intervention",
    badge: "84% deflection rate",
  },
];

const clientBrands = [
  "Acme SaaS",
  "FinFlow",
  "DataPulse",
  "CloudScale",
  "DevNexus",
  "OmniCommerce",
];

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 border-y border-white/[0.06] bg-[#070b14]/70">
      {/* Brand Trust Strip */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-6">
          Powering conversations for modern teams worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
          {clientBrands.map((brand, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-sm sm:text-base font-semibold text-slate-200 tracking-wider hover:text-white hover:border-white/20 transition-all cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* Grid of Metric Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative group p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-sky-500/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.2)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                {stat.badge}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-baseline">
              <Counter value={stat.value} animate={visible} />
              <span className="text-sky-400 ml-0.5">{stat.suffix}</span>
            </div>

            <h3 className="text-base font-bold text-slate-100 mt-2">
              {stat.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {stat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Counter({ value, animate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [animate, value]);

  return <span>{count.toLocaleString()}</span>;
}
