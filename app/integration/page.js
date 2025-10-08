"use client";

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import api from "@/lib/api";

// Icons
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const RevokeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
  </svg>
);

export default function Integration() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [revokingKeyId, setRevokingKeyId] = useState(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [baseUrl, setBaseUrl] = useState(null);

  useEffect(()=>{
    setBaseUrl(process.env.NEXT_PUBLIC_BASE_URL)
  },[])



const fetchKeys = async () => {
  try {
    const response = await api.get("/api-keys"); // cookie automatically sent
    setKeys(response.data);
  } catch (error) {
    console.error("Error fetching keys:", error.response?.data?.error || error.message);
  }
};

  const generateKey = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await response.json();
      if (response.ok) {
        const newKeyWithId = {
          ...data,
          _id: data._id || `key-${Date.now()}`,
          active: true
        };
        setKeys((prev) => [...prev, newKeyWithId]);
      } else {
        console.error('Failed to generate key:', data.error);
      }
    } catch (error) {
      console.error('Error generating key:', error);
    } finally {
      setLoading(false);
    }
  };

  const revokeKey = async (keyId) => {
    setRevokingKeyId(keyId);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('/api/api-keys', {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ keyId })
      });
      if (response.ok) {
        setKeys(prevKeys => prevKeys.map(key => key._id === keyId ? {...key, active: false} : key));
      } else {
        const data = await response.json();
        console.error('Failed to revoke key:', data.error);
        alert('Failed to revoke key: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error revoking key:', error);
      alert('Error revoking key: ' + error.message);
    } finally {
      setRevokingKeyId(null);
    }
  };

  const copyToClipboard = (text, keyId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKeyId(keyId);
      setTimeout(() => setCopiedKeyId(null), 2000);
    }).catch(err => console.error('Failed to copy text: ', err));
  };

  const copyScript = () => {
    if (!keys.length) return alert("Generate an API key first!");
    const script = `<script src="${baseUrl}/embed-chatbot.js" data-api-key="add your api key here"></script>`;
    navigator.clipboard.writeText(script)
      .then(() => {
        setCopiedScript(true);
        setTimeout(() => setCopiedScript(false), 2000);
      })
      .catch(err => console.error("Failed to copy script", err));
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white  rounded-3xl p-6 sm:p-10 w-full ">
          <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
              Integrate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Chatwise Chatbot</span>
            </h1>
            <p className="text-md sm:text-lg text-gray-600 font-medium">
              Generate and manage your API keys to seamlessly embed our chatbot into your application.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How it Works</h2>
            <p className="text-gray-700 leading-relaxed text-base">
              To integrate the Chatwise chatbot, you will need a unique API key for authentication. Copy a generated key and add it to your application&apos;s configuration to embed the chatbot widget, manage conversations, and retrieve user data.
            </p>
          </section>

<section className="bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-300 mb-10">
  <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Your API Keys</h2>
    <button
      onClick={generateKey}
      className="mt-4 sm:mt-0 px-6 py-3 text-base font-semibold text-white rounded-full hover:scale-105 duration-200 disabled:opacity-70 back2"
      disabled={loading}
    >
      {loading ? "Generating..." : "Generate New Key"}
    </button>
  </div>

  {/* ✅ Scrollable List */}
  <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2">
    <ul className="divide-y divide-gray-200 -mx-6 px-6">
      {keys.length === 0 ? (
        <p className="text-center text-gray-500 py-6">
          No API keys found. Click the button above to generate your first key!
        </p>
      ) : (
        keys.map((k) => {
          const keyValue = k.key;
          const uniqueId = k._id;
          const isActive = k.active;
          return (
            <li
              key={uniqueId}
              className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <div className="flex items-center mb-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isActive ? "Active" : "Revoked"}
                  </span>
                </div>
                <span className="font-mono text-sm sm:text-base text-gray-700 break-all">
                  {keyValue}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(keyValue, uniqueId)}
                  disabled={!isActive}
                  className={`inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {copiedKeyId === uniqueId ? (
                    <>
                      <CheckIcon />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                {isActive && (
                  <button
                    onClick={() => revokeKey(uniqueId)}
                    disabled={revokingKeyId === uniqueId}
                    className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 bg-red-100 hover:bg-red-200 text-red-700 disabled:bg-red-50 disabled:cursor-not-allowed"
                  >
                    {revokingKeyId === uniqueId ? (
                      <span>Revoking...</span>
                    ) : (
                      <>
                        <RevokeIcon />
                        <span>Revoke</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </li>
          );
        })
      )}
    </ul>
  </div>
</section>


          {/* New Section: How to Embed */}
          <section className="bg-white rounded-2xl p-6 border border-dashed border-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Embed the Chatbot</h2>
            <p className="text-gray-700 mb-4">
              Copy the script below and paste it anywhere in your HTML file before the closing <code>&lt;/body&gt;</code> tag. Make sure to replace <code>YOUR_API_KEY</code> with your generated key.
            </p>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                {`<script src="${baseUrl}/embed-chatbot.js" data-api-key="add your api key here"></script>`}
              </pre>
              <button
                onClick={copyScript}
                className={`mt-8 px-4 py-2 rounded-md text-white font-medium text-sm transition-colors back2 cursor-pointer `}
              >
                {copiedScript ? "Copied!" : "Copy Script"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
