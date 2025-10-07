"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I integrate ChatWise into my website?",
      answer:
        "Simply generate your API key and embed the provided script into your website. ChatWise will instantly appear and start working.",
    },
    {
      question: "Can I train ChatWise with my own data?",
      answer:
        "Yes! You can easily upload your custom FAQs or documents to make ChatWise respond with context specific to your business.",
    },
    {
      question: "Is ChatWise secure for handling customer data?",
      answer:
        "Absolutely. ChatWise uses encrypted connections and does not store any customer messages without your consent.",
    },
    {
      question: "Does ChatWise support multiple languages?",
      answer:
        "Yes, ChatWise supports multiple languages and automatically detects the user's language to respond appropriately.",
    },
    {
      question: "Can I customize the look and feel of ChatWise?",
      answer:
        "Of course! You can adjust colors, icons, and welcome messages to match your brand’s design.",
    },
  ];

  // Filter based on search
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      id="faq"
      className="back1 min-h-screen py-20 text-center flex flex-col items-center px-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold gradientText mb-6"
      >
        Frequently Asked Questions ❓
      </motion.h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-full border border-gray-700 focus:outline-none  text-white mb-10"
      />

      <div className="w-full space-y-4 px-5">
        <AnimatePresence>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="cardBack rounded-md p-2 shadow-md text-left border-l-4 border-gray-300 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-white" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-300 mt-3 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No results found for your search.</p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
