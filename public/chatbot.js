(function () {
  // Prevent double initialization
  if (document.getElementById("chatwise-embed-host")) return;

  const currentScript = document.currentScript;
  const scriptSrc = currentScript ? currentScript.src : "";
  let detectedOrigin = "https://chatwise-chatbot.vercel.app";
  try {
    if (scriptSrc) {
      detectedOrigin = new URL(scriptSrc).origin;
    } else if (typeof window !== "undefined" && window.location.origin) {
      detectedOrigin = window.location.origin;
    }
  } catch (e) {
    // fallback
  }

  const baseUrl = detectedOrigin;
  const apiKey = (currentScript && currentScript.getAttribute("data-api-key")) || "";
  const brandColor = (currentScript && currentScript.getAttribute("color")) || "#0ea5e9";
  const brandLogo = (currentScript && currentScript.getAttribute("logo")) || "";

  // FontAwesome SVG definitions matching react-icons/fa
  const SVG_ROBOT = `<svg viewBox="0 0 640 512" fill="currentColor" width="100%" height="100%"><path d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z"/></svg>`;
  const SVG_BOLT = `<svg viewBox="0 0 320 512" fill="currentColor" width="100%" height="100%"><path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"/></svg>`;
  const SVG_COMMENT = `<svg viewBox="0 0 512 512" fill="currentColor" width="100%" height="100%"><path d="M144 208c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"/></svg>`;
  const SVG_PLANE = `<svg viewBox="0 0 512 512" fill="currentColor" width="100%" height="100%"><path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"/></svg>`;
  const SVG_TRASH = `<svg viewBox="0 0 448 512" fill="currentColor" width="100%" height="100%"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>`;
  const SVG_CHEVRON = `<svg viewBox="0 0 448 512" fill="currentColor" width="100%" height="100%"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/></svg>`;
  const SVG_COPY = `<svg viewBox="0 0 448 512" fill="currentColor" width="100%" height="100%"><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/></svg>`;
  const SVG_CHECK = `<svg viewBox="0 0 512 512" fill="currentColor" width="100%" height="100%"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`;
  const SVG_STOP = `<svg viewBox="0 0 448 512" fill="currentColor" width="100%" height="100%"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"/></svg>`;

  const primaryGradient = brandColor === "#0ea5e9"
    ? "linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #4f46e5 100%)"
    : `linear-gradient(135deg, ${brandColor} 0%, #2563eb 100%)`;

  // Host element appended to body
  const host = document.createElement("div");
  host.id = "chatwise-embed-host";
  host.style.cssText = "all: initial; position: fixed; right: 0; bottom: 0; z-index: 2147483647 !important; pointer-events: none;";
  document.body.appendChild(host);

  // Attach Shadow DOM for 100% CSS isolation
  const shadow = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;

  // Shadow Root Stylesheet (complete isolation, exact match to ChatWidget.js)
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .cw-widget-container {
      position: fixed;
      right: 16px;
      bottom: 16px;
      pointer-events: auto;
      user-select: none;
      z-index: 2147483647;
    }
    @media (min-width: 640px) {
      .cw-widget-container {
        right: 24px;
        bottom: 24px;
      }
    }

    #cw-window {
      width: calc(100vw - 32px);
      max-width: 410px;
      height: 580px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      border-radius: 24px;
      overflow: hidden;
      background: rgba(9, 16, 31, 0.96);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(14, 165, 233, 0.25);
      color: #ffffff;
      opacity: 0;
      transform: translateY(16px) scale(0.96);
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #cw-window.cw-open {
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
    }

    #cw-header {
      position: relative;
      padding: 16px 20px;
      background: linear-gradient(to right, #0c162e, #0f1d3d, #0a1428);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    #cw-header-glow {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, rgba(14, 165, 233, 0.1), transparent, rgba(99, 102, 241, 0.1));
      pointer-events: none;
    }

    #cw-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: #070b14;
      user-select: text;
    }
    #cw-messages::-webkit-scrollbar {
      width: 5px;
    }
    #cw-messages::-webkit-scrollbar-track {
      background: transparent;
    }
    #cw-messages::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }

    .cw-msg-user-row {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 8px;
      animation: cwSlide 0.2s ease-out;
    }

    .cw-msg-bot-row {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      gap: 8px;
      animation: cwSlide 0.2s ease-out;
    }

    .cw-user-bubble {
      background: ${primaryGradient};
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 16px 16px 2px 16px;
      max-width: 82%;
      font-size: 13.5px;
      line-height: 1.5;
      word-break: break-word;
      box-shadow: 0 4px 14px rgba(14, 165, 233, 0.2);
    }

    .cw-bot-bubble {
      background: rgba(19, 29, 54, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #f1f5f9;
      padding: 12px 16px;
      border-radius: 16px 16px 16px 2px;
      max-width: 82%;
      font-size: 13.5px;
      line-height: 1.55;
      word-break: break-word;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }

    .cw-chip {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.07);
      color: #cbd5e1;
      font-size: 12px;
      padding: 10px 14px;
      border-radius: 12px;
      cursor: pointer;
      text-align: left;
      transition: all 0.15s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cw-chip:hover {
      background: rgba(14, 165, 233, 0.12);
      border-color: rgba(14, 165, 233, 0.35);
      color: #ffffff;
      transform: translateX(2px);
    }

    #cw-launcher {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    #cw-launcher-btn {
      position: relative;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${primaryGradient};
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px rgba(14, 165, 233, 0.35);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
    }
    #cw-launcher-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 30px rgba(14, 165, 233, 0.5);
    }
    #cw-launcher-btn:active {
      transform: scale(0.95);
    }

    #cw-ping-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.2);
      animation: cwPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      pointer-events: none;
    }

    #cw-teaser-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 16px;
      background: rgba(12, 22, 46, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #ffffff;
      font-size: 12px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: all 0.2s ease;
      animation: cwSlideLeft 0.3s ease-out;
    }
    #cw-teaser-pill:hover {
      transform: scale(1.05);
      border-color: rgba(56, 189, 248, 0.6);
    }

    @media (max-width: 639px) {
      #cw-teaser-pill {
        display: none !important;
      }
    }

    .cw-pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #34d399;
      animation: cwDotPulse 1.8s infinite;
    }

    .cw-dots span {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #38bdf8;
      margin: 0 2px;
      animation: cwBounce 1.4s infinite ease-in-out both;
    }
    .cw-dots span:nth-child(1) { animation-delay: -0.32s; }
    .cw-dots span:nth-child(2) { animation-delay: -0.16s; }

    @keyframes cwBounce {
      0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
      40% { transform: scale(1); opacity: 1; }
    }
    @keyframes cwSlide {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cwSlideLeft {
      from { opacity: 0; transform: translateX(12px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes cwPing {
      75%, 100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes cwDotPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
  `;
  shadow.appendChild(styleEl);

  // Widget Root in Shadow DOM
  const widgetRoot = document.createElement("div");
  widgetRoot.className = "cw-widget-container";
  widgetRoot.innerHTML = `
    <!-- Main Chat Window -->
    <div id="cw-window" style="display:none;">
      <!-- Header -->
      <div id="cw-header">
        <div id="cw-header-glow"></div>
        <div style="position:relative;display:flex;align-items:center;gap:12px;">
          <!-- Bot Avatar -->
          <div style="position:relative;width:40px;height:40px;border-radius:14px;background:${primaryGradient};display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(14,165,233,0.3);overflow:hidden;color:white;">
            ${
              brandLogo
                ? `<img src="${brandLogo}" style="width:100%;height:100%;object-fit:cover;" />`
                : `<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;">${SVG_ROBOT}</div>`
            }
            <span style="position:absolute;bottom:0px;right:0px;width:9px;height:9px;border-radius:50%;background:#34d399;border:2px solid #0c162e;" class="cw-pulse-dot"></span>
          </div>

          <div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-weight:700;font-size:14px;letter-spacing:0.3px;color:#ffffff;">ChatWise AI</span>
              <span style="font-size:10px;font-weight:700;padding:1px 5px;border-radius:4px;background:rgba(14,165,233,0.2);color:#7dd3fc;border:1px solid rgba(14,165,233,0.3);">PRO</span>
            </div>
            <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#94a3b8;margin-top:2px;">
              <span style="width:5px;height:5px;border-radius:50%;background:#34d399;"></span>
              <span>Instant RAG answers</span>
            </div>
          </div>
        </div>

        <!-- Header Actions -->
        <div style="position:relative;display:flex;align-items:center;gap:4px;">
          <button id="cw-clear-btn" type="button" title="Clear conversation" style="background:transparent;border:none;color:#94a3b8;padding:8px;border-radius:10px;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
            <div style="width:14px;height:14px;">${SVG_TRASH}</div>
          </button>
          <button id="cw-close-btn" type="button" title="Minimize chat" style="background:transparent;border:none;color:#94a3b8;padding:8px;border-radius:10px;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
            <div style="width:14px;height:14px;">${SVG_CHEVRON}</div>
          </button>
        </div>
      </div>

      <!-- Messages Container -->
      <div id="cw-messages">
        <!-- Welcome Hero Screen -->
        <div id="cw-welcome" style="padding:20px 8px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;">
          <div style="width:54px;height:54px;border-radius:20px;background:linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2));border:1px solid rgba(14,165,233,0.3);display:flex;align-items:center;justify-content:center;color:#38bdf8;box-shadow:inset 0 0 12px rgba(14,165,233,0.2);">
            <div style="width:22px;height:22px;">${SVG_BOLT}</div>
          </div>
          <div>
            <h4 style="font-size:16px;font-weight:700;color:#ffffff;">How can I assist you today?</h4>
            <p style="font-size:12px;color:#94a3b8;max-width:280px;line-height:1.5;margin-top:4px;">
              Ask any question about our platform, features, or documentation. I look up verified answers instantly!
            </p>
          </div>

          <!-- Suggested Starter Chips -->
          <div style="width:100%;text-align:left;margin-top:8px;display:flex;flex-direction:column;gap:8px;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;padding:0 4px;">Suggested queries</div>
            <div class="cw-chip" data-prompt="What are your core features?">
              <span>⚡ What are your core features?</span>
              <span style="opacity:0.6;font-size:11px;">→</span>
            </div>
            <div class="cw-chip" data-prompt="How do I embed the chatbot?">
              <span>🔌 How do I embed the chatbot?</span>
              <span style="opacity:0.6;font-size:11px;">→</span>
            </div>
            <div class="cw-chip" data-prompt="What are your pricing plans?">
              <span>💳 What are your pricing plans?</span>
              <span style="opacity:0.6;font-size:11px;">→</span>
            </div>
            <div class="cw-chip" data-prompt="How is my data protected?">
              <span>🛡️ How is my data protected?</span>
              <span style="opacity:0.6;font-size:11px;">→</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Input Area -->
      <div style="padding:12px 14px;background:#0a1224;border-top:1px solid rgba(255,255,255,0.1);display:flex;flex-direction:column;gap:8px;flex-shrink:0;">
        <div style="display:flex;align-items:center;background:#111c38;border-radius:16px;border:1px solid rgba(255,255,255,0.1);padding:4px 6px 4px 14px;gap:8px;transition:border-color 0.2s;">
          <textarea id="cw-input" placeholder="Ask ChatWise AI anything..." rows="1" style="flex:1;background:transparent;border:none;outline:none;color:#ffffff;font-size:13px;resize:none;max-height:80px;line-height:1.4;padding:6px 0;"></textarea>
          <button id="cw-send-btn" type="button" title="Send message" style="width:36px;height:36px;border-radius:12px;background:${primaryGradient};color:white;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 0.15s;flex-shrink:0;box-shadow:0 4px 12px rgba(14,165,233,0.3);">
            <div style="width:14px;height:14px;">${SVG_PLANE}</div>
          </button>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#64748b;padding:0 4px;">
          <span style="display:flex;align-items:center;gap:4px;">
            <div style="width:10px;height:10px;color:#38bdf8;">${SVG_BOLT}</div>
            <span>Powered by <strong style="color:#94a3b8;">ChatWise AI</strong></span>
          </span>
          <span>Enter ↵ to send</span>
        </div>
      </div>
    </div>

    <!-- Floating Launcher -->
    <div id="cw-launcher">
      <!-- Greeting Teaser Pill -->
      <div id="cw-teaser-pill" style="display:none;">
        <span class="cw-pulse-dot"></span>
        <span>Need help? Chat with AI 👋</span>
        <span id="cw-teaser-close" style="color:#94a3b8;font-size:11px;margin-left:4px;cursor:pointer;">✕</span>
      </div>

      <!-- Circular Trigger Button -->
      <button id="cw-launcher-btn" type="button" aria-label="Open ChatWise AI Chat">
        <div id="cw-ping-ring"></div>
        <div style="width:24px;height:24px;">${SVG_COMMENT}</div>
        <span id="cw-unread-badge" style="display:none;position:absolute;top:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:#10b981;color:white;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #070b14;box-shadow:0 2px 5px rgba(0,0,0,0.3);"></span>
      </button>
    </div>
  `;
  shadow.appendChild(widgetRoot);

  // References inside Shadow DOM
  const windowEl = shadow.getElementById("cw-window");
  const launcherEl = shadow.getElementById("cw-launcher");
  const launcherBtn = shadow.getElementById("cw-launcher-btn");
  const closeBtn = shadow.getElementById("cw-close-btn");
  const clearBtn = shadow.getElementById("cw-clear-btn");
  const sendBtn = shadow.getElementById("cw-send-btn");
  const inputEl = shadow.getElementById("cw-input");
  const messagesEl = shadow.getElementById("cw-messages");
  const welcomeEl = shadow.getElementById("cw-welcome");
  const teaserPill = shadow.getElementById("cw-teaser-pill");
  const teaserClose = shadow.getElementById("cw-teaser-close");
  const unreadBadge = shadow.getElementById("cw-unread-badge");

  let messagesCount = 0;
  let isSending = false;
  let abortController = null;

  // Show teaser greeting after 1.8s
  setTimeout(() => {
    if (windowEl.style.display === "none" && messagesCount === 0) {
      teaserPill.style.display = "flex";
    }
  }, 1800);

  teaserClose.addEventListener("click", (e) => {
    e.stopPropagation();
    teaserPill.style.display = "none";
  });

  teaserPill.addEventListener("click", () => {
    openWidget();
  });

  function openWidget() {
    teaserPill.style.display = "none";
    launcherEl.style.display = "none";
    windowEl.style.display = "flex";
    requestAnimationFrame(() => {
      windowEl.classList.add("cw-open");
      inputEl.focus();
    });
  }

  function closeWidget() {
    windowEl.classList.remove("cw-open");
    setTimeout(() => {
      windowEl.style.display = "none";
      launcherEl.style.display = "flex";
    }, 250);
  }

  launcherBtn.addEventListener("click", openWidget);
  closeBtn.addEventListener("click", closeWidget);

  clearBtn.addEventListener("click", () => {
    messagesEl.innerHTML = "";
    messagesEl.appendChild(welcomeEl);
    messagesCount = 0;
    unreadBadge.style.display = "none";
  });

  // Handle Suggested Query Chips
  messagesEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".cw-chip");
    if (chip) {
      const prompt = chip.getAttribute("data-prompt");
      if (prompt) {
        inputEl.value = prompt;
        sendMessage();
      }
    }
  });

  function appendMessage(sender, text, isStreaming = false) {
    if (welcomeEl && welcomeEl.parentNode === messagesEl && messagesCount === 0) {
      welcomeEl.remove();
    }
    messagesCount++;

    const row = document.createElement("div");
    row.className = sender === "user" ? "cw-msg-user-row" : "cw-msg-bot-row";

    if (sender === "bot") {
      const avatar = document.createElement("div");
      avatar.style.cssText = `
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background: rgba(14, 165, 233, 0.2);
        border: 1px solid rgba(14, 165, 233, 0.3);
        color: #38bdf8;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-bottom: 2px;
      `;
      avatar.innerHTML = `<div style="width:14px;height:14px;">${SVG_ROBOT}</div>`;
      row.appendChild(avatar);
    }

    const col = document.createElement("div");
    col.style.cssText = "display: flex; flex-direction: column; gap: 4px; max-width: 82%;";

    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "cw-user-bubble" : "cw-bot-bubble";

    if (isStreaming && !text) {
      bubble.innerHTML = `<div class="cw-dots"><span></span><span></span><span></span></div>`;
    } else {
      bubble.textContent = text;
    }
    col.appendChild(bubble);

    // Timestamp
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const timeDiv = document.createElement("div");
    timeDiv.style.cssText = `font-size: 10px; color: #64748b; padding: 0 4px; text-align: ${sender === "user" ? "right" : "left"};`;
    timeDiv.textContent = timeStr;
    col.appendChild(timeDiv);

    row.appendChild(col);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    return { bubble, col, row };
  }

  function setSendingState(sending) {
    isSending = sending;
    if (sending) {
      sendBtn.innerHTML = `<div style="width:12px;height:12px;">${SVG_STOP}</div>`;
      sendBtn.style.background = "rgba(239, 68, 68, 0.25)";
      sendBtn.style.border = "1px solid rgba(239, 68, 68, 0.4)";
      sendBtn.style.color = "#f87171";
      sendBtn.title = "Stop generating";
    } else {
      sendBtn.innerHTML = `<div style="width:14px;height:14px;">${SVG_PLANE}</div>`;
      sendBtn.style.background = primaryGradient;
      sendBtn.style.border = "none";
      sendBtn.style.color = "#ffffff";
      sendBtn.title = "Send message";
    }
  }

  async function sendMessage() {
    if (isSending) {
      if (abortController) {
        abortController.abort();
        setSendingState(false);
      }
      return;
    }

    const question = inputEl.value.trim();
    if (!question) return;

    inputEl.value = "";
    appendMessage("user", question);

    const { bubble } = appendMessage("bot", "", true);
    setSendingState(true);
    abortController = new AbortController();

    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ question }),
        signal: abortController.signal,
      });

      if (!res.ok) {
        let msg = "Unable to process request right now. Please try again.";
        if (res.status === 401) {
          msg = "API authentication failed. Please verify your integration key.";
        }
        bubble.textContent = msg;
        setSendingState(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      let sourceTag = "Hybrid AI";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const dataStr = line.slice(6);
          if (dataStr === "[DONE]") {
            setSendingState(false);
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.type === "source") {
              sourceTag = parsed.value;
            } else if (parsed.type === "content") {
              accumulated += parsed.value;
              bubble.textContent = accumulated;
              messagesEl.scrollTop = messagesEl.scrollHeight;
            }
          } catch (e) {
            // chunk boundary
          }
        }
      }

      // Add Source & Copy footer to completed bot bubble
      const botFooter = document.createElement("div");
      botFooter.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-top: 8px;
        margin-top: 8px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 10px;
      `;

      const sourceBadge = document.createElement("span");
      sourceBadge.style.cssText = "color: #34d399; font-weight: 500; display: flex; align-items: center; gap: 4px;";
      sourceBadge.innerHTML = `<span>✓</span><span>${sourceTag === "KnowledgeBase" ? "Verified FAQ" : "Hybrid AI"}</span>`;

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.style.cssText = "background: transparent; border: none; color: #94a3b8; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 10px;";
      copyBtn.innerHTML = `<div style="width:10px;height:10px;">${SVG_COPY}</div><span>Copy</span>`;

      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(accumulated);
        copyBtn.innerHTML = `<div style="width:10px;height:10px;color:#34d399;">${SVG_CHECK}</div><span style="color:#34d399;">Copied</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = `<div style="width:10px;height:10px;">${SVG_COPY}</div><span>Copy</span>`;
        }, 2000);
      });

      botFooter.appendChild(sourceBadge);
      botFooter.appendChild(copyBtn);
      bubble.appendChild(botFooter);

    } catch (e) {
      if (e.name !== "AbortError") {
        bubble.textContent = "Network error. Please check your connection.";
      }
    } finally {
      setSendingState(false);
      abortController = null;
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
})();
