(function () {
  const baseUrl = "http://localhost:4000"
  const apiKey = document.currentScript.getAttribute("data-api-key");
  const brandColor = "#5d966c";
  const brandLight = "#e8f5ec";
  const brandDark = "#4a7858";

  // Create chatbot container
  const container = document.createElement("div");
  container.id = "my-chatbot-container";
  container.innerHTML = `
    <div id="chatbot-box" style="
        position:fixed;
        bottom:20px;
        right:20px;
        width:360px;
        max-width:90vw;
        height:500px;
        border-radius:16px;
        box-shadow:0 10px 25px rgba(0,0,0,0.15);
        display:flex;
        flex-direction:column;
        overflow:hidden;
        background:white;
        font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
        z-index:9999;
        opacity:0;
        transform:translateY(20px) scale(0.95);
        transition:opacity 0.3s ease, transform 0.3s ease;
    ">
      <div style="
          background:${brandColor};
          color:white;
          padding:16px;
          font-weight:600;
          display:flex;
          justify-content:space-between;
          align-items:center;
          box-shadow:0 2px 4px rgba(0,0,0,0.1);
      ">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:8px;height:8px;background:#4ade80;border-radius:50%;"></div>
          <span>Support Assistant</span>
        </div>
        <div>
          <button id="chat-clear" title="Clear chat" style="
              margin-right:8px;
              background:rgba(255,255,255,0.2);
              border:none;
              border-radius:50%;
              width:32px;
              height:32px;
              color:white;
              font-size:14px;
              cursor:pointer;
              transition:background 0.2s;
          ">🗑️</button>
          <button id="chat-close" style="
              background:rgba(255,255,255,0.2);
              border:none;
              border-radius:50%;
              width:32px;
              height:32px;
              color:white;
              font-size:14px;
              cursor:pointer;
              transition:background 0.2s;
          ">✕</button>
        </div>
      </div>

      <div id="chat-messages" style="
          flex:1;
          padding:16px;
          overflow-y:auto;
          display:flex;
          flex-direction:column;
          gap:12px;
          background:#fafafa;
      ">
      
        <div style="
    background: whitesmoke;
    padding: 10px;
    border-radius: 100px;
    font-size: 14px;
">Hello! 👋 I’m your virtual assistant. How can I help you today?</div>
      </div>

      <div style="padding:12px 16px;background:white;border-top:1px solid #f0f0f0;">
        <div style="display:flex;background:white;border-radius:24px;border:1px solid #eaeaea;overflow:hidden;">
          <textarea id="chat-input" placeholder="Type your message..." style="
              flex:1;
              padding:12px 16px;
              border:none;
              resize:none;
              height:20px;
              font-size:14px;
              background:transparent;
              outline:none;
              max-height:120px;
          "></textarea>
          <button id="chat-send" style="
              background:${brandColor};
              color:white;
              border:none;
              padding:0 20px;
              cursor:pointer;
              font-weight:500;
              transition:background 0.2s;
              display:flex;
              align-items:center;
              justify-content:center;
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <button id="chat-open" style="
        position:fixed;
        bottom:20px;
        right:20px;
        width:60px;
        height:60px;
        border-radius:50%;
        background:${brandColor};
        color:white;
        border:none;
        font-size:24px;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 6px 16px rgba(0,0,0,0.2);
        cursor:pointer;
        z-index:9998;
        transition:transform 0.3s ease, box-shadow 0.3s ease;
    ">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;
  document.body.appendChild(container);

  const chatBox = document.getElementById("chatbot-box");
  const openBtn = document.getElementById("chat-open");
  const closeBtn = document.getElementById("chat-close");
  const clearBtn = document.getElementById("chat-clear");
  const sendBtn = document.getElementById("chat-send");
  const input = document.getElementById("chat-input");
  const messagesDiv = document.getElementById("chat-messages");



  let sending = false;
  let abortController = null;

  // Add Inter font if not already present
  if (!document.querySelector('link[href*="inter"]')) {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }

  // Initial state
  chatBox.style.display = "none";

  // Button hover effects
  const style = document.createElement('style');
  style.textContent = `
    #chat-open:hover { transform: scale(1.05); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
    #chat-send:hover { background: ${brandDark} !important; }
    #chat-close:hover, #chat-clear:hover { background: rgba(255,255,255,0.3) !important; }
    #chat-input::placeholder { color: #888; }
    .typing-dot { animation: pulse 1.5s infinite; opacity: 0.6; }
    @keyframes pulse { 
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
    .message-animation { animation: messageAppear 0.3s ease; }
    @keyframes messageAppear {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  openBtn.addEventListener("click", () => { 
    chatBox.style.display = "flex"; 
    openBtn.style.display = "none"; 
    setTimeout(() => {
      chatBox.style.opacity = "1";
      chatBox.style.transform = "translateY(0) scale(1)";
    }, 10);
  });
  
  closeBtn.addEventListener("click", () => { 
    chatBox.style.opacity = "0";
    chatBox.style.transform = "translateY(20px) scale(0.95)";
    setTimeout(() => {
      chatBox.style.display = "none"; 
      openBtn.style.display = "flex";
    }, 300);
  });
  
  clearBtn.addEventListener("click", () => { 
    messagesDiv.innerHTML = ""; 
    // Add a small confirmation effect
    clearBtn.textContent = "✓";
    setTimeout(() => {
      clearBtn.textContent = "🗑️";
    }, 1000);
  });

  // Append message
  function appendMessage(sender, text, source = null, streaming = false) {
    const msgDiv = document.createElement("div");
    msgDiv.style.display = "flex";
    msgDiv.style.justifyContent = sender === "user" ? "flex-end" : "flex-start";
    msgDiv.className = "message-animation";

    const bubble = document.createElement("div");
    bubble.style.padding = "12px 16px";
    bubble.style.borderRadius = "18px";
    bubble.style.maxWidth = "80%";
    bubble.style.fontSize = "14px";
    bubble.style.lineHeight = "1.5";
    bubble.style.wordBreak = "break-word";
    bubble.style.background = sender === "user" ? brandColor : "#f0f4f8";
    bubble.style.color = sender === "user" ? "white" : "#333";
    bubble.style.boxShadow = sender === "user" ? "0 2px 4px rgba(0,0,0,0.1)" : "0 1px 2px rgba(0,0,0,0.05)";
    bubble.innerHTML = text + (streaming ? " <span class='typing-dot'>●</span>" : "");
    msgDiv.appendChild(bubble);

    // if (source && !streaming && sender === "bot") {
    //   const srcDiv = document.createElement("div");
    //   srcDiv.style.fontSize = "11px";
    //   srcDiv.style.marginTop = "4px";
    //   srcDiv.style.color = source === "Error" ? "#e53e3e" : "#718096";
    //   srcDiv.style.padding = "0 8px";
    //   srcDiv.textContent = source === "KnowledgeBase" ? "✓ From knowledge base" :
    //                        source === "Cohere" ? "AI generated response" : source;
    //   msgDiv.appendChild(srcDiv);
    // }

    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return bubble;
  }

  async function sendMessage() {
    const question = input.value.trim();
    if (!question || sending) return;
    input.value = "";

    // Reset textarea height
    // input.style.height = '50px';

    appendMessage("user", question);

    const botBubble = appendMessage("bot", "", "Streaming...", true);
    sending = true;
    abortController = new AbortController();

    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({ question }),
        signal: abortController.signal
      });

      if (!res.ok) {
        botBubble.textContent = "Error: " + (await res.json()).error;
        sending = false;
        return;
      }

      // Stream response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      let source = "Cohere";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const dataStr = line.slice(6);
          if (dataStr === "[DONE]") {
            botBubble.querySelector(".typing-dot")?.remove();
            sending = false;
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.type === "source") {
              source = parsed.value;
            } else if (parsed.type === "content") {
              accumulated += parsed.value;
              botBubble.innerHTML = accumulated + " <span class='typing-dot'>●</span>";
            }
          } catch (e) { console.error(e); }
        }
      }

      // Final source
    //   const srcDiv = document.createElement("div");
    //   srcDiv.style.fontSize = "11px";
    //   srcDiv.style.marginTop = "4px";
    //   srcDiv.style.color = source === "Error" ? "#e53e3e" : "#718096";
    //   srcDiv.style.padding = "0 8px";
    //   srcDiv.textContent = source === "KnowledgeBase" ? "✓ From knowledge base" :
    //                        source === "Cohere" ? "AI generated response" : source;
    //   botBubble.parentNode.appendChild(srcDiv);

    } catch (e) {
      if (e.name === "AbortError") console.log("Request aborted");
      else botBubble.textContent = "Network error";
    } finally {
      sending = false;
      abortController = null;
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', function() {
    // this.style.height = 'auto';
    // this.style.height = (this.scrollHeight) + 'px';
    if (this.scrollHeight > 120) {
      this.style.overflowY = 'auto';
    } else {
      this.style.overflowY = 'hidden';
    }
  });

})();