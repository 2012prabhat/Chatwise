"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const steps = [
    {
      title: "1️⃣ Generate API Key",
      desc: "Create your unique API key to connect your chatbot securely with your application.",
    },
    {
      title: "2️⃣ Embed Script",
      desc: "Copy and paste the provided script into your website to display the chatbot instantly.",
    },
    {
      title: "3️⃣ Train Your Chatbot",
      desc: "Add your own questions and answers in the knowledge base to personalize the chatbot.",
    },
    {
      title: "4️⃣ Deploy and Engage",
      desc: "Deploy your chatbot and let it assist users on your platform in real-time.",
    },
  ];

  return (
    <section id="how-it-works" className="min-h-screen  py-20 px-4 flex flex-col items-center text-center back1">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl gradientText mb-16"
      >
        How It Works
      </motion.h1>

      {/* Grid with two steps per row */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }} // 👈 Re-animates on every scroll-in
            className="shadow-lg p-6 text-white rounded-3xl border-l-8 border-gray-300 text-left bg-[#1b1f1e]/40 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold text-white mb-2">
              {step.title}
            </h2>
            <p className="text-gray-200 text-lg">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
