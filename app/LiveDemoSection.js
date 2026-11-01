"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaBookOpen,
  FaRedo,
  FaCheck,
  FaSlidersH,
  FaPaperPlane,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { FiSend } from "react-icons/fi";

const starterPrompts = [
  "How do I reset my account password?",
  "Can I use ChatWise for e-commerce return requests?",
  "What is the average response time for streaming answers?",
  "How do I restrict the chatbot to specific domains?",
];

const mockReplies = {
  "How do I reset my account password?":
    "To reset your password, navigate to the Login page and click 'Forgot Password'. Enter your registered email, and we'll send a secure one-time verification link valid for 1 hour.",
  "Can I use ChatWise for e-commerce return requests?":
    "Absolutely! You can upload your return and exchange policy directly into your Knowledge Base. ChatWise can explain the return process, confirm eligibility criteria, and link users directly to your return portal.",
  "What is the average response time for streaming answers?":
    "ChatWise responses start streaming in under 240ms. By indexing your documents with low-latency vector embeddings, answer chunks begin streaming to the user almost instantaneously.",
  "How do I restrict the chatbot to specific domains?":
    "In your ChatWise dashboard under API Keys, you can specify Allowed Origins (e.g., https://yourbrand.com). Any requests made with that API key from unauthorized domains are blocked automatically.",
};

export default function LiveDemoSection() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! I'm your ChatWise AI assistant. Ask me anything about how ChatWise works, or click one of the suggested prompts below to test our speed!",
      source: "Knowledge Base",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const chatBottomRef = useRef(null);

  const handleSend = (questionToSend) => {
    const q = (questionToSend || input).trim();
    if (!q || isStreaming) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: q }]);
    setInput("");
    setIsStreaming(true);
    setStreamedText("");

    // Determine reply
    const reply =
      mockReplies[q] ||
      `Thanks for your question regarding "${q}". ChatWise leverages your uploaded documentation to provide pinpoint answers, falling back to our fine-tuned Cohere AI model when external context is required.`;

    // Simulate streaming word-by-word
    const words = reply.split(" ");
    let currentIdx = 0;
    let accumulated = "";

    const timer = setInterval(() => {
      if (currentIdx < words.length) {
        accumulated += (currentIdx > 0 ? " " : "") + words[currentIdx];
        setStreamedText(accumulated);
        currentIdx++;
      } else {
        clearInterval(timer);
        setIsStreaming(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: reply,
            source: mockReplies[q] ? "Knowledge Base" : "Cohere AI Fallback",
          },
        ]);
        setStreamedText("");
      }
    }, 40);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hi there! I'm your ChatWise AI assistant. Ask me anything about how ChatWise works, or click one of the suggested prompts below to test our speed!",
        source: "Knowledge Base",
      },
    ]);
    setInput("");
    setIsStreaming(false);
    setStreamedText("");
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedText]);

  return (
    <section id="live-demo" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Interactive Sandbox
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Test ChatWise in <span className="gradientText">Real Time</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          Try typing a custom question below or test our sample queries to see how fast our hybrid knowledge engine answers.
        </p>
      </div>

      {/* Interactive Sandbox Box */}
      <div className="rounded-3xl border border-white/10 bg-[#090e1a]/90 backdrop-blur-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Sandbox Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <FaRobot className="text-base" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">ChatWise Support Engine</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-400">Model: Hybrid Cohere + Knowledge Base</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition border border-white/5 cursor-pointer"
            title="Reset conversation"
          >
            <FaRedo className="text-[11px]" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="p-4 bg-white/[0.02] border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold shrink-0 flex items-center gap-1">
            <HiSparkles className="text-sky-400" /> Prompts:
          </span>
          {starterPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={isStreaming}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-sky-500/20 hover:text-sky-300 text-slate-300 border border-white/5 hover:border-sky-500/30 transition whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Logs Window */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[380px] min-h-[260px] overflow-y-auto">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shrink-0 text-xs shadow-md">
                  <FaRobot />
                </div>
              )}

              <div
                className={`rounded-2xl p-4 max-w-xl text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-tr-sm shadow-md"
                    : "bg-slate-800/80 border border-white/10 text-slate-200 rounded-tl-sm shadow-sm"
                }`}
              >
                <p>{m.text}</p>
                {m.source && m.sender === "bot" && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-sky-400 font-medium">
                    <FaBookOpen className="text-[10px]" />
                    <span>Source: {m.source}</span>
                  </div>
                )}
              </div>

              {m.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  You
                </div>
              )}
            </div>
          ))}

          {/* Currently Streaming Message */}
          {isStreaming && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shrink-0 text-xs shadow-md">
                <FaRobot />
              </div>
              <div className="bg-slate-800/80 border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm p-4 max-w-xl text-sm shadow-sm">
                <p>
                  {streamedText}
                  <span className="inline-block w-2 h-4 ml-1 bg-sky-400 animate-pulse align-middle" />
                </p>
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Streaming response...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-slate-900/60 border-t border-white/[0.08] flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
            placeholder="Type any question (e.g., 'What are your support hours?')..."
            className="flex-1 bg-white/[0.05] border border-white/10 focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm flex items-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-sky-500/25"
          >
            <span>Ask AI</span>
            <FiSend className="text-xs" />
          </button>
        </form>
      </div>
    </section>
  );
}
