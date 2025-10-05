"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const boxRef = useRef();
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("chat_messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  const sendQuestion = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { sender: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    // Add a placeholder message for the bot's response
    const botMsgId = Date.now();
    setMessages((m) => [...m, { 
      sender: "bot", 
      text: "", 
      id: botMsgId,
      isStreaming: true,
      source: "Streaming..."
    }]);

    // Create an abort controller to allow cancellation
    abortControllerRef.current = new AbortController();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/chat", { // Changed endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ question: trimmed }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        console.error("Chat error:", res.status, errorData);
        
        let errorMessage = "Sorry, something went wrong.";
        if (res.status === 401) {
          errorMessage = "Please log in to use the chat feature.";
        } else if (res.status === 503) {
          errorMessage = "The AI service is temporarily unavailable. Please try again in a moment.";
        }
        
        // Update the placeholder message with the error
        setMessages((m) => 
          m.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: errorMessage, isStreaming: false, source: "Error" } 
              : msg
          )
        );
        return;
      }

      // Process the streaming response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let source = "HuggingFace"; // Default source

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk and process it
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              // Stream completed
              setMessages((m) => 
                m.map(msg => 
                  msg.id === botMsgId 
                    ? { ...msg, isStreaming: false, source } 
                    : msg
                )
              );
              break;
            }
            
            try {
              const parsed = JSON.parse(data);
              
              if (parsed.type === 'source') {
                source = parsed.value;
                setMessages((m) => 
                  m.map(msg => 
                    msg.id === botMsgId 
                      ? { ...msg, source } 
                      : msg
                  )
                );
              } else if (parsed.type === 'content') {
                accumulatedText += parsed.value;
                setMessages((m) => 
                  m.map(msg => 
                    msg.id === botMsgId 
                      ? { ...msg, text: accumulatedText } 
                      : msg
                  )
                );
              }
            } catch (e) {
              console.error("Error parsing streaming data:", e);
            }
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error("Send question error:", err);
        setMessages((m) => 
          m.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: "Network error — please check your connection and try again.", isStreaming: false, source: "Error" } 
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
      
      // Update the last message to show it was stopped
      setMessages((m) => {
        const lastMsg = m[m.length - 1];
        if (lastMsg.isStreaming) {
          return m.map(msg => 
            msg.id === lastMsg.id 
              ? { ...msg, isStreaming: false, source: "Stopped" } 
              : msg
          );
        }
        return m;
      });
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chat_messages");
  };

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50">
        {open ? (
          <div className="w-80 md:w-96 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
            <div className="bg-[var(--mainCol)] text-white px-4 py-3 flex items-center justify-between">
              <div className="font-semibold">Support Bot</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="text-sm opacity-90 hover:opacity-100 mr-2"
                  title="Clear chat"
                >
                  🗑️
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-sm opacity-90 hover:opacity-100"
                >
                  Close
                </button>
              </div>
            </div>

            <div
              ref={boxRef}
              className="p-3 flex-1 overflow-y-auto h-64 space-y-3"
              style={{ maxHeight: "16rem" }}
            >
              {messages.length === 0 && (
                <div className="text-gray-500 text-sm">
                  Ask me anything about your product or FAQ. I&apos;ll search our knowledge base first, then use AI if needed.
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={m.sender === "user" ? "text-right" : ""}>
                  <div
                    className={
                      "inline-block px-3 py-2 rounded-lg text-sm max-w-xs " +
                      (m.sender === "user" 
                        ? "bg-[var(--mainCol)] text-white" 
                        : "bg-gray-100 text-gray-900")
                    }
                  >
                    {m.text}
                    {m.isStreaming && <span className="animate-pulse">●</span>}
                    {m.source && m.sender === "bot" && !m.isStreaming && (
                      <div className={`text-xs mt-1 ${m.source === "Error" ? "text-red-500" : "text-gray-500"}`}>
                        {m.source === "KnowledgeBase" ? "✓ From knowledge base" : 
                         m.source === "HuggingFace" ? "🤖 AI generated" : 
                         m.source === "Stopped" ? "⏹️ Stopped" :
                         m.source}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your question and press Enter"
                className="w-full border rounded px-3 py-2 text-sm resize-none h-12"
                disabled={sending}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-500">
                  {sending ? (
                    <button 
                      onClick={stopGeneration}
                      className="text-red-500 hover:underline"
                    >
                      Stop generating
                    </button>
                  ) : (
                    "Press Enter to send"
                  )}
                </div>
                <button
                  onClick={sending ? stopGeneration : sendQuestion}
                  disabled={!input.trim() && !sending}
                  className="bg-[var(--mainCol)] text-white text-sm px-3 py-1 rounded hover:bg-[var(--mainColHover)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Stop" : "Send"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="cursor-pointer w-14 h-14 rounded-full flex items-center justify-center shadow-lg primaryBtn hover:scale-105 transition-transform"
            aria-label="Open chat"
          >
            💬
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {messages.length}
              </span>
            )}
          </button>
        )}
      </div>
    </>
  );
}