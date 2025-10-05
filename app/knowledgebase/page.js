"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function KnowledgeBasePage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false); // for adding FAQ
  const [fetching, setFetching] = useState(true); // for fetching FAQs

  // ✅ Fetch FAQs
  const fetchFaqs = async () => {
    setFetching(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/knowledgebase/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setFaqs(data.faqs);
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
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/knowledgebase/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        // Refresh list after delete
        fetchFaqs();
      } else {
        alert(data.error || "Failed to delete FAQ");
      }
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  };

  // ✅ Add FAQ
  const handleAddFAQ = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/knowledgebase/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question, answer }),
      });

      const data = await res.json();

      if (res.ok) {
        // Refresh FAQs list to get the new FAQ with _id
        await fetchFaqs();
        setQuestion("");
        setAnswer("");
      } else {
        alert(data.error || "Failed to add FAQ");
      }
    } catch (err) {
      console.error("Error adding FAQ:", err);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Knowledge Base</h1>

        {/* Add FAQ Form */}
        <form
          onSubmit={handleAddFAQ}
          className="mb-8 space-y-4 bg-white p-6 rounded shadow"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter a question"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter the answer"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--mainCol)] text-white px-4 py-2 rounded hover:bg-[var(--mainColHover)] disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add FAQ"}
          </button>
        </form>

        {/* FAQ List */}
        <h2 className="text-2xl font-semibold mb-4">Your FAQs</h2>

        {fetching ? (
          <p className="text-gray-600">Loading FAQs...</p>
        ) : (
          <div className="space-y-3">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div
                  key={faq._id || index} // ✅ unique key
                  className="p-4 border rounded bg-white shadow-sm flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">{faq.question}</p>
                    <p className="text-gray-700 mt-1">{faq.answer}</p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteFAQ(faq._id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No FAQs yet. Add your first one!</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
