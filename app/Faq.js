"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaSearch, FaQuestionCircle, FaComments } from "react-icons/fa";
import { useRouter } from "next/navigation";

const categories = ["All", "Integration", "Training & AI", "Security & Data"];

const faqs = [
  {
    category: "Integration",
    question: "How long does it take to integrate ChatWise into a website?",
    answer:
      "Less than 60 seconds. Simply copy your generated one-line script tag from the dashboard and paste it right before the closing </body> tag of your website. It works seamlessly on React, Next.js, WordPress, Webflow, Shopify, and standard HTML.",
  },
  {
    category: "Training & AI",
    question: "Can I train ChatWise with my own documents and custom FAQs?",
    answer:
      "Yes! In your Knowledge Base dashboard, you can add question-and-answer pairs or upload documents. Our hybrid engine prioritizes your custom content first, guaranteeing brand-accurate answers before consulting AI fallback.",
  },
  {
    category: "Training & AI",
    question: "What AI models does ChatWise use for generative responses?",
    answer:
      "ChatWise utilizes state-of-the-art Cohere AI language models combined with high-speed vector embeddings for semantic retrieval. Responses are streamed in real time for lightning-fast delivery under 250 milliseconds.",
  },
  {
    category: "Security & Data",
    question: "Is customer data safe and GDPR/SOC2 compliant?",
    answer:
      "Yes. All communications are encrypted in transit via TLS 1.3 and at rest with AES-256. ChatWise does not use your proprietary customer data to train public models, and API keys can be origin-restricted to your exact domain.",
  },
  {
    category: "Integration",
    question: "Can I customize the chatbot appearance to match my brand?",
    answer:
      "Absolutely. You can customize primary and secondary theme colors, brand logos, assistant avatars, welcome greetings, and conversational tone from your dashboard.",
  },
  {
    category: "Security & Data",
    question: "Can I revoke or regenerate API keys if compromised?",
    answer:
      "Yes. From the API Keys management page, you can generate multiple API keys (e.g., for development vs production) and revoke or disable any key instantly with zero downtime.",
  },
];

export default function FaqSection() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-4">
          <FaQuestionCircle className="text-xs" /> Help Center
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked <span className="gradientText">Questions</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Have questions? Here are the most common inquiries about integration, AI training, and security.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search topics (e.g. 'integration', 'security', 'training')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-sky-500/60 focus:bg-white/[0.07] text-white text-sm placeholder-slate-400 focus:outline-none transition backdrop-blur-xl shadow-lg"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
              activeCategory === cat
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                : "bg-white/[0.03] text-slate-400 hover:text-white border border-white/5 hover:bg-white/[0.08]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3.5">
        <AnimatePresence>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                    isOpen
                      ? "bg-slate-900/80 border-sky-500/40 shadow-lg shadow-sky-500/5"
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center justify-between p-5 sm:p-6 text-left">
                    <span className="text-base sm:text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 shrink-0"
                    >
                      <FaChevronDown className="text-xs" />
                    </motion.div>
                  </div>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 sm:px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/[0.06] pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 bg-white/[0.02] rounded-2xl border border-white/5">
              No questions found matching &ldquo;{searchQuery}&rdquo;. Try another search keyword.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Support Card Prompt */}
      <div className="mt-14 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-lg shrink-0">
            <FaComments />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Still have questions?</h4>
            <p className="text-xs text-slate-400">Our team and support bot are ready to assist you 24/7.</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/get-started")}
          className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold border border-white/10 transition cursor-pointer"
        >
          Talk to Us
        </button>
      </div>
    </section>
  );
}
