"use client";

import { useState, useEffect } from "react";
import { FaQuestionCircle, FaTrashAlt, FaPlus } from "react-icons/fa";
import Layout from "@/components/Layout";
import api from "@/lib/api";

export default function KnowledgeBasePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch FAQs
  const fetchFaqs = async () => {
    setFetching(true);
    try {
      const res = await api.get("/knowledgebase/list");
      setFaqs(res.data.faqs);
    } catch (err) {
      console.error("Error loading FAQs:", err);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // ✅ Delete FAQ
  const handleDeleteFAQ = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await api.delete(`/knowledgebase/${id}`);
      fetchFaqs();
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  };

  // ✅ Add FAQ
  const handleAddFAQ = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/knowledgebase/add", { question, answer });
      await fetchFaqs();
      setQuestion("");
      setAnswer("");
      setShowModal(false);
    } catch (err) {
      console.error("Error adding FAQ:", err);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6 mt-4 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            Knowledge Base
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and organize common chatbot questions easily.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-3 h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent px-1">
          {fetching ? (
            <p className="text-gray-500 text-center text-sm py-10">
              Loading FAQs...
            </p>
          ) : faqs.length > 0 ? (
            faqs.map((faq) => (
              <div
                key={faq._id}
                className="flex justify-between items-start p-4 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {faq.question}
                  </p>
                  <p className="text-gray-600 mt-1 text-xs leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteFAQ(faq._id)}
                  className="text-red-500 hover:text-red-600 opacity-70 hover:opacity-100 transition text-sm mt-1"
                  title="Delete FAQ"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center text-sm py-10">
              No FAQs yet. Add your first one!
            </p>
          )}
        </div>

        {/* Add Button */}
        <div className="flex justify-end mt-5">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:scale-[1.02] transition-transform back2 cursor-pointer"
          >
            <FaPlus />
            Add FAQ
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-[90%] max-w-md border border-gray-200 animate-scaleIn">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Add New FAQ
              </h3>
              <form onSubmit={handleAddFAQ} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 text-sm p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter question"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Answer
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 text-sm p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter answer"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-1.5 rounded-md border text-gray-500 hover:bg-gray-100 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm hover:opacity-90 transition disabled:opacity-50 back2 cursor-pointer"
                  >
                    {loading ? "Adding..." : "Add FAQ"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
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
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </Layout>
  );
}
