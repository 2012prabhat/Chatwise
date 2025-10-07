"use client";
import { useEffect, useRef, useState } from "react";

export default function StatsSection() {
  const stats = [
    { value: 97, suffix: "%", title: "Customer Satisfaction", desc: "Average rating from users" },
    { value: 24, suffix: "/7", title: "Availability", desc: "Always ready to help" },
    { value: 5000, suffix: "+", title: "Businesses", desc: "Trust our platform" },
    { value: 10, suffix: "M+", title: "Conversations", desc: "Handled by our AI" },
  ];

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
     <section
  ref={sectionRef}
  className="text-white py-16 bg-muted/50 p-8 bg-[#1b1f1e]/40 backdrop-blur-sm"
>
  <div className="flex flex-wrap justify-between text-center">
    {stats.map((stat, i) => (
      <div key={i} className="w-1/2 md:w-auto mb-6">
        <CounterCard
          value={stat.value}
          suffix={stat.suffix}
          title={stat.title}
          desc={stat.desc}
          animate={visible}
        />
      </div>
    ))}
  </div>
</section>


    </>
  );
}

function CounterCard({ value, suffix, title, desc, animate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        clearInterval(counter);
        start = value;
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [animate, value]);

  return (
    <div className="flex flex-col items-center transition-opacity duration-1000 opacity-100">
      <div className="text-4xl md:text-5xl font-bold text-primary">
        {count}
        {suffix}
      </div>
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-200 text-muted-foreground">{desc}</p>
    </div>
  );
}
