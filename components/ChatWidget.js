"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTrashAlt,
  FaTimes,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaBolt,
  FaRegCommentDots,
  FaStop,
} from "react-icons/fa";

const QUICK_PROMPTS = [
  "⚡ What are your core features?",
  "🔌 How do I embed the chatbot?",
  "💳 What are your pricing plans?",
  "🛡️ How is my data protected?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [showTeaser, setShowTeaser] = useState(false);

  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Load chat history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chat_messages");
      if (saved) setMessages(JSON.parse(saved));
    } catch (e) {
      console.warn("Could not read chat history:", e);
    }
  }, []);

  // Show floating teaser pill after short delay if widget is closed
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Save chat history & auto-scroll
  useEffect(() => {
    try {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    } catch (e) {
      console.warn("Could not save chat history:", e);
    }
    if (boxRef.current) {
      boxRef.current.scrollTo({
        top: boxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // Send question (user query)
  const sendQuestion = async (customText) => {
    const questionText = (customText || input).trim();
    if (!questionText || sending) return;

    const userMsg = {
      sender: "user",
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    const botMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "",
        id: botMsgId,
        isStreaming: true,
        source: "Streaming...",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    abortControllerRef.current = new AbortController();

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ question: questionText }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        let errorMessage = "Sorry, something went wrong.";
        if (res.status === 401) {
          errorMessage = "Please log in to use the full AI chat assistant.";
        } else if (res.status === 503) {
          errorMessage = "The AI service is temporarily experiencing high load. Please try again shortly.";
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? { ...msg, text: errorMessage, isStreaming: false, source: "Error" }
              : msg
          )
        );
        return;
      }

      // Stream response processing
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let source = "Hybrid AI";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMsgId
                    ? { ...msg, isStreaming: false, source }
                    : msg
                )
              );
              break;
            }

            try {
              const parsed = JSON.parse(data);

              if (parsed.type === "source") {
                source = parsed.value;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMsgId ? { ...msg, source } : msg
                  )
                );
              } else if (parsed.type === "content") {
                accumulatedText += parsed.value;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMsgId ? { ...msg, text: accumulatedText } : msg
                  )
                );
              }
            } catch (e) {
              // Ignore partial chunk parse error
            }
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Chat stream aborted by user");
      } else {
        console.error("Send error:", err);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? {
                  ...msg,
                  text: "Network connection error. Please verify your internet connection.",
                  isStreaming: false,
                  source: "Error",
                }
              : msg
          )
        );
      }
    } finally {
      setSending(false);
      abortControllerRef.current = null;
    }
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setSending(false);

      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.isStreaming) {
          return prev.map((msg) =>
            msg.id === lastMsg.id
              ? { ...msg, isStreaming: false, source: "Stopped" }
              : msg
          );
        }
        return prev;
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chat_messages");
  };

  const copyMessage = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <aside aria-label="Support Assistant Widget" className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-[9999] select-none">
      {/* Open Chat Window */}
      {open ? (
        <div
          className="w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#09101f]/95 backdrop-blur-2xl text-white animate-widgetIn"
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(14, 165, 233, 0.25)",
          }}
        >
          {/* Header */}
          <div className="relative px-5 py-4 bg-gradient-to-r from-[#0c162e] via-[#0f1d3d] to-[#0a1428] border-b border-white/10 flex items-center justify-between shrink-0">
            {/* Ambient header glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

            <div className="relative flex items-center gap-3">
              {/* Bot Avatar with glowing pulse */}
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 text-white text-lg">
                  <FaRobot />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0c162e] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white tracking-wide">
                    ChatWise AI
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    PRO
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Instant RAG answers</span>
                </div>
              </div>
            </div>

            {/* Actions: Clear & Close */}
            <div className="relative flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition-all text-xs"
                  title="Clear conversation"
                >
                  <FaTrashAlt />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all text-sm"
                title="Minimize chat"
              >
                <FaChevronDown />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            ref={boxRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent select-text"
          >
            {/* Empty State / Welcome Screen */}
            {messages.length === 0 ? (
              <div className="py-6 px-2 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-3xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 text-2xl shadow-inner shadow-sky-500/20">
                  <FaBolt />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    How can I assist you today?
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Ask any question about our platform, features, or documentation.
                    I look up verified answers instantly!
                  </p>
                </div>

                {/* Quick Starter Prompt Chips */}
                <div className="space-y-2 pt-2 text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-1">
                    Suggested queries
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendQuestion(prompt.replace(/^[^\s]+\s/, ""))}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-sky-500/10 text-xs text-slate-300 hover:text-white border border-white/5 hover:border-sky-500/30 transition-all duration-150 flex items-center justify-between group"
                      >
                        <span className="truncate">{prompt}</span>
                        <span className="text-slate-500 group-hover:text-sky-400 text-[10px] group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={m.id || i}
                  className={`flex items-end gap-2 ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  } animate-messageSlide`}
                >
                  {/* Bot Avatar beside bot messages */}
                  {m.sender === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0 text-xs mb-1">
                      <FaRobot />
                    </div>
                  )}

                  <div className="space-y-1 max-w-[82%]">
                    {/* Message Bubble */}
                    <div
                      className={`relative px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.sender === "user"
                          ? "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white rounded-br-sm shadow-md shadow-sky-500/15"
                          : "bg-[#131d36]/90 border border-white/10 text-slate-100 rounded-bl-sm shadow-md"
                      }`}
                    >
                      {/* Streaming cursor or content */}
                      <div className="whitespace-pre-wrap break-words">
                        {m.text}
                        {m.isStreaming && !m.text && (
                          <div className="flex items-center gap-1.5 py-1">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
                            <span
                              className="w-2 h-2 rounded-full bg-sky-400 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            />
                            <span
                              className="w-2 h-2 rounded-full bg-sky-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                          </div>
                        )}
                        {m.isStreaming && m.text && (
                          <span className="inline-block w-1.5 h-3 ml-1 bg-sky-400 animate-pulse" />
                        )}
                      </div>

                      {/* Source tag on completed bot messages */}
                      {m.sender === "bot" && !m.isStreaming && (
                        <div className="flex items-center justify-between gap-3 pt-2 mt-2 border-t border-white/10 text-[10px]">
                          <span
                            className={`inline-flex items-center gap-1 font-medium ${
                              m.source === "KnowledgeBase"
                                ? "text-emerald-400"
                                : m.source === "Error"
                                ? "text-red-400"
                                : m.source === "Stopped"
                                ? "text-amber-400"
                                : "text-sky-400"
                            }`}
                          >
                            {m.source === "KnowledgeBase" && "✓ Verified FAQ"}
                            {m.source === "HuggingFace" && "🤖 AI Reasoning"}
                            {m.source === "Hybrid AI" && "⚡ Hybrid Answer"}
                            {m.source === "Stopped" && "⏹️ Generation Paused"}
                            {m.source === "Error" && "⚠️ Issue Encountered"}
                            {!["KnowledgeBase", "HuggingFace", "Hybrid AI", "Stopped", "Error"].includes(
                              m.source
                            ) && m.source}
                          </span>

                          <button
                            onClick={() => copyMessage(m.text, m.id || i)}
                            className="text-slate-400 hover:text-white transition flex items-center gap-1"
                            title="Copy reply"
                          >
                            {copiedId === (m.id || i) ? (
                              <>
                                <FaCheck className="text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <FaCopy />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`text-[10px] text-slate-500 px-1 ${
                        m.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-[#0a1224] border-t border-white/10 space-y-2 shrink-0">
            <div className="relative flex items-center bg-[#111c38] rounded-2xl border border-white/10 focus-within:border-sky-500/60 focus-within:ring-1 focus-within:ring-sky-500/40 transition-all p-1.5">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask ChatWise AI anything..."
                rows={1}
                disabled={sending}
                className="flex-1 bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm px-3 py-1.5 outline-none resize-none max-h-24 min-h-[38px] leading-5"
              />

              {/* Send / Stop Button */}
              {sending ? (
                <button
                  type="button"
                  onClick={stopGeneration}
                  className="w-9 h-9 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 flex items-center justify-center transition-all shrink-0 cursor-pointer"
                  title="Stop generating"
                >
                  <FaStop className="text-xs" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => sendQuestion()}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/30 flex items-center justify-center transition-all shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  title="Send message"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              )}
            </div>

            {/* Bottom Tagline */}
            <div className="flex items-center justify-between px-2 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <FaBolt className="text-sky-400 text-[9px]" />
                <span>Powered by ChatWise AI</span>
              </span>
              <span>Enter ↵ to send</span>
            </div>
          </div>
        </div>
      ) : (
        /* Floating Launcher Bubble */
        <div className="relative flex items-center gap-3">
          {/* Teaser Greeting Pill */}
          {showTeaser && messages.length === 0 && (
            <div
              onClick={() => setOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0c162e]/95 backdrop-blur-xl border border-sky-500/30 text-white text-xs font-medium shadow-xl cursor-pointer hover:border-sky-400 transition-all hover:scale-105 animate-teaserSlide"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Need help? Chat with AI 👋</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className="text-slate-400 hover:text-white ml-1 text-[11px]"
              >
                ✕
              </button>
            </div>
          )}

          {/* Circular Glow Button */}
          <button
            onClick={() => {
              setOpen(true);
              setShowTeaser(false);
            }}
            className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-sky-500/35 hover:shadow-sky-500/50 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-white/20"
            aria-label="Open AI Support Chat"
          >
            {/* Ambient Pulse Ring */}
            <span className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping pointer-events-none" />

            <FaRegCommentDots className="text-2xl group-hover:rotate-12 transition-transform duration-200" />

            {/* Unread / Message Count Badge */}
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#070b14] shadow">
                {messages.length}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Widget CSS Animations */}
      <style jsx>{`
        @keyframes widgetIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes teaserSlide {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-widgetIn {
          animation: widgetIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-messageSlide {
          animation: messageSlide 0.2s ease-out;
        }
        .animate-teaserSlide {
          animation: teaserSlide 0.3s ease-out;
        }
      `}</style>
    </aside>
  );
}
