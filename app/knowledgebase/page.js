"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaBookOpen,
  FaPlus,
  FaTrashAlt,
  FaSearch,
  FaCopy,
  FaCheck,
  FaLightbulb,
  FaTimes,
  FaMagic,
  FaBrain,
  FaCheckCircle,
  FaSyncAlt,
  FaArrowRight,
  FaFilter,
} from "react-icons/fa";
import Layout from "@/components/Layout";
import api from "@/lib/api";
import { alertSuccess, alertError, alertConfirm } from "@/components/Alert";

// Starter FAQ templates to help users get started quickly
const FAQ_TEMPLATES = [
  {
    category: "General",
    question: "What are your standard support hours and response times?",
    answer:
      "Our AI assistant is available 24/7/365 to answer questions instantly. Human engineering support is available Monday through Friday from 9:00 AM to 6:00 PM EST, with a guaranteed 2-hour SLA for critical issues.",
  },
  {
    category: "Pricing",
    question: "How does the pricing model work and can I upgrade anytime?",
    answer:
      "We offer flexible tiered plans starting with a Free Starter tier (1,000 queries/month). Paid plans scale with your usage volume. You can upgrade, downgrade, or cancel your subscription anytime directly from your billing portal.",
  },
  {
    category: "Security",
    question: "How is our company data protected and is it used for training?",
    answer:
      "Your data is strictly encrypted at rest with AES-256 and in transit via TLS 1.3. We never train public foundation models on your private knowledge base, chats, or customer queries.",
  },
  {
    category: "Technical",
    question: "How do I embed the chat widget into my website or web app?",
    answer:
      "Simply head over to the Integration tab in your dashboard, copy the 1-line <script> tag containing your unique API key, and paste it before the closing </body> tag of your HTML or in your Next.js/React layout.",
  },
  {
    category: "Support",
    question: "What happens if the AI chatbot cannot answer a user's question?",
    answer:
      "When the AI detects low semantic confidence or a complex edge case, it gracefully apologizes and offers to forward the user's inquiry directly to your team's support email or ticketing system.",
  },
];

export default function KnowledgeBasePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  // Fetch FAQs from API
  const fetchFaqs = async () => {
    setFetching(true);
    try {
      const res = await api.get("/knowledgebase/list");
      setFaqs(res.data.faqs || []);
    } catch (err) {
      console.error("Error loading FAQs:", err);
      alertError("Failed to load FAQs. Please check your connection.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Delete FAQ with confirmation
  const handleDeleteFAQ = async (id, qTitle) => {
    const result = await alertConfirm(
      `Delete "${qTitle ? qTitle.slice(0, 35) + "..." : "this FAQ"}"?`
    );
    if (!result.isConfirmed) return;

    try {
      await api.delete(`/knowledgebase/${id}`);
      setFaqs((prev) => prev.filter((item) => item._id !== id));
      alertSuccess("FAQ removed from knowledge base.");
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      alertError("Could not delete FAQ. Please try again.");
    }
  };

  // Add FAQ to API
  const handleAddFAQ = async (e) => {
    e?.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alertError("Please provide both a question and an answer.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/knowledgebase/add", {
        question: question.trim(),
        answer: answer.trim(),
      });

      if (res.data?.doc) {
        setFaqs((prev) => [res.data.doc, ...prev]);
      } else {
        await fetchFaqs();
      }

      setQuestion("");
      setAnswer("");
      setShowModal(false);
      alertSuccess("FAQ added and indexed for chatbot retrieval!");
    } catch (err) {
      console.error("Error adding FAQ:", err);
      alertError(err.response?.data?.error || "Failed to save FAQ.");
    } finally {
      setLoading(false);
    }
  };

  // Quick prefill from template
  const applyTemplate = (tpl) => {
    setQuestion(tpl.question);
    setAnswer(tpl.answer);
    setSelectedCategory(tpl.category);
    setShowTemplatesModal(false);
    setShowModal(true);
  };

  // Copy answer to clipboard
  const handleCopyAnswer = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered FAQs based on search and tab filter
  const filteredFaqs = useMemo(() => {
    let result = faqs;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.question?.toLowerCase().includes(q) ||
          item.answer?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [faqs, searchQuery]);

  // Statistics
  const totalFaqs = faqs.length;
  const totalWords = useMemo(() => {
    return faqs.reduce((acc, curr) => {
      const count = (curr.answer || "").split(/\s+/).filter(Boolean).length;
      return acc + count;
    }, 0);
  }, [faqs]);

  return (
    <Layout>
      <div className="space-y-8 pb-12">
        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1324] via-[#09101d] to-[#060a12] border border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <FaBrain className="text-sky-400" />
                <span>RAG Semantic Knowledge Base</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Train Your AI Chatbot
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Add verified Q&amp;A pairs to power your conversational agent.
                Every item is indexed automatically so your chatbot delivers
                accurate, brand-safe responses to customer inquiries.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowTemplatesModal(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <FaLightbulb className="text-amber-400" />
                <span>Templates</span>
              </button>

              <button
                onClick={() => {
                  setQuestion("");
                  setAnswer("");
                  setShowModal(true);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
              >
                <FaPlus />
                <span>Add Q&amp;A Pair</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="text-xs font-medium text-slate-400">Total Indexed FAQs</div>
              <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-2">
                {totalFaqs}
                <span className="text-xs font-normal text-sky-400">active</span>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="text-xs font-medium text-slate-400">Knowledge Volume</div>
              <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-2">
                {totalWords}
                <span className="text-xs font-normal text-slate-400">words</span>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="text-xs font-medium text-slate-400">Semantic Index</div>
              <div className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Synchronized</span>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="text-xs font-medium text-slate-400">Chatbot Status</div>
              <div className="text-sm font-bold text-sky-400 mt-2 flex items-center gap-1.5">
                <FaCheckCircle className="text-sky-400" />
                <span>Ready to Answer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filter & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search knowledge base by question or answer..."
              className="w-full bg-[#0c1324]/80 text-white placeholder-slate-500 text-sm pl-10 pr-10 py-2.5 rounded-xl border border-white/10 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredFaqs.length}</strong> of{" "}
              <strong className="text-white">{faqs.length}</strong> questions
            </span>
            <button
              onClick={fetchFaqs}
              disabled={fetching}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition cursor-pointer disabled:opacity-50"
              title="Refresh Knowledge Base"
            >
              <FaSyncAlt className={fetching ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Starter Templates Highlight Carousel */}
        {faqs.length === 0 && !fetching && (
          <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm mb-2">
              <FaMagic />
              <span>Start Fast With Ready-Made Templates</span>
            </div>
            <p className="text-slate-300 text-xs mb-4">
              Your knowledge base is empty! Click any common template below to populate your
              chatbot with standard answers in seconds:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FAQ_TEMPLATES.slice(0, 3).map((tpl, idx) => (
                <div
                  key={idx}
                  onClick={() => applyTemplate(tpl)}
                  className="group bg-[#0c1324]/90 hover:bg-[#111b33] p-4 rounded-xl border border-white/10 hover:border-sky-500/50 cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      {tpl.category}
                    </span>
                    <FaArrowRight className="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all text-xs" />
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-sky-300 line-clamp-2">
                    {tpl.question}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ List Cards */}
        <div className="space-y-4">
          {fetching ? (
            <div className="text-center py-20 bg-[#0c1324]/40 rounded-2xl border border-white/5">
              <FaSyncAlt className="text-sky-400 text-2xl animate-spin mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Syncing knowledge base...</p>
            </div>
          ) : filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={faq._id || index}
                className="group relative bg-[#0c1324]/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-sky-500/30 transition-all duration-200 p-5 sm:p-6 shadow-lg hover:shadow-sky-500/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* Tags row */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Vector Indexed
                      </span>
                    </div>

                    {/* Question */}
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      {faq.question}
                    </h3>

                    {/* Answer */}
                    <p className="text-sm text-slate-300 leading-relaxed pt-1 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-start">
                    <button
                      onClick={() => handleCopyAnswer(faq.answer, faq._id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition text-xs flex items-center gap-1.5 cursor-pointer"
                      title="Copy Answer"
                    >
                      {copiedId === faq._id ? (
                        <>
                          <FaCheck className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <FaCopy />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteFAQ(faq._id, faq.question)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition text-xs flex items-center gap-1.5 cursor-pointer"
                      title="Delete FAQ"
                    >
                      <FaTrashAlt />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-[#0c1324]/50 rounded-2xl border border-white/5 p-8">
              <FaBookOpen className="text-slate-600 text-4xl mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">
                {searchQuery ? "No matching FAQs found" : "Your Knowledge Base is Empty"}
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                {searchQuery
                  ? `No questions or answers matched "${searchQuery}". Try a different keyword or reset search.`
                  : "Train your chatbot by adding frequently asked questions or selecting from our curated templates."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
                  >
                    Clear Search
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setShowTemplatesModal(true)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition cursor-pointer flex items-center gap-2"
                    >
                      <FaLightbulb className="text-amber-400" />
                      Browse Templates
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition cursor-pointer flex items-center gap-2"
                    >
                      <FaPlus />
                      Add Custom FAQ
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal: Add New FAQ */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-xl bg-[#0c1324] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-5 animate-scaleIn">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <FaBrain />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Add Knowledge Base Item</h3>
                    <p className="text-xs text-slate-400">
                      Provide a clear question and definitive answer
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleAddFAQ} className="space-y-4">
                {/* Question Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Customer Question <span className="text-sky-400">*</span>
                    </label>
                    <span className="text-[10px] text-slate-500">
                      {question.length}/200 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={question}
                    maxLength={200}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., What is your return and refund policy?"
                    className="w-full bg-[#111b33] text-white placeholder-slate-500 border border-white/10 text-sm px-4 py-3 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                    required
                    autoFocus
                  />
                </div>

                {/* Answer Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Bot Answer / Resolution <span className="text-sky-400">*</span>
                    </label>
                    <span className="text-[10px] text-slate-500">
                      {answer.split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Provide a detailed, helpful answer that the AI will use to respond to users..."
                    rows={5}
                    className="w-full bg-[#111b33] text-white placeholder-slate-500 border border-white/10 text-sm p-4 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition leading-relaxed resize-none"
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Tip: Be concise, courteous, and include relevant links if needed.
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-xs sm:text-sm font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !question.trim() || !answer.trim()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-indigo-500 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <FaSyncAlt className="animate-spin" />
                        <span>Indexing FAQ...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Save &amp; Index</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Starter Templates Browser */}
        {showTemplatesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-[#0c1324] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-5 animate-scaleIn max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <FaLightbulb />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Starter FAQ Templates</h3>
                    <p className="text-xs text-slate-400">
                      Pick a template to customize and add directly to your chatbot
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTemplatesModal(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Template Items List */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {FAQ_TEMPLATES.map((tpl, i) => (
                  <div
                    key={i}
                    onClick={() => applyTemplate(tpl)}
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-sky-500/40 transition cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {tpl.category}
                      </span>
                      <span className="text-xs text-sky-400 opacity-0 group-hover:opacity-100 transition flex items-center gap-1 font-semibold">
                        Use Template <FaArrowRight />
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-sky-300">
                      {tpl.question}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {tpl.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setShowTemplatesModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </Layout>
  );
}
