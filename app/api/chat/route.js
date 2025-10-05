import { NextResponse } from "next/server";
import { CohereClient } from "cohere-ai";
import connectDB from "@/lib/db";
import KnowledgeBase from "@/models/KnowledgeBase";
import ApiKey from "@/models/ApiKey";
import jwt from "jsonwebtoken";
import { authCheck } from "@/lib/authCheck";

// ✅ Initialize Cohere client
const cohere = new CohereClient({
  apiKey: process.env.CO_API_KEY,
});

const encoder = new TextEncoder();

// Allowed domains for CORS (or use '*' for all)
const ALLOWED_ORIGINS = ["*"]; // Change to specific domains for production

export async function OPTIONS(req) {
  // Handle preflight request
  const origin = req.headers.get("origin") || "*";
  const headers = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
  };
  return new Response(null, { headers });
}

export async function POST(req) {
  const origin = req.headers.get("origin") || "*";
  const headers = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
  };

  try {
    await connectDB();

    const { question } = await req.json();
    if (!question) {
      return new Response(JSON.stringify({ error: "Question is required" }), { status: 400, headers });
    }

    let tenantId;

    // ✅ 1. Check API Key first
    const apiKey = req.headers.get("x-api-key");
    if (apiKey) {
      const keyDoc = await ApiKey.findOne({ key: apiKey, active: true });
      if (!keyDoc) {
        return new Response(JSON.stringify({ error: "Invalid API key" }), { status: 401, headers });
      }
      tenantId = keyDoc.tenantId.toString();
    } else {
      // ✅ 2. Fallback to JWT
      let decoded = authCheck(req);

      tenantId = decoded.id || decoded._id || decoded.userId;
      if (!tenantId) {
        return new Response(JSON.stringify({ error: "Invalid token payload" }), { status: 401, headers });
      }
    }

    // ✅ Streaming response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    processRequest(question, tenantId, writer).catch(error => {
      console.error("Error in processRequest:", error);
      writer.write(encoder.encode(`data: ${JSON.stringify({ type: "error", value: "Processing error" })}\n\n`));
      writer.write(encoder.encode("data: [DONE]\n\n"));
      writer.close();
    });

    return new Response(stream.readable, { headers });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: "Server error", details: err.message }), { status: 500, headers });
  }
}

async function processRequest(question, tenantId, writer) {
  const encoder = new TextEncoder();

  try {
    // 1️⃣ Check Knowledge Base
    const kbEntries = await KnowledgeBase.find({ userId: tenantId }).lean();

    if (kbEntries?.length > 0) {
      const qWords = question.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);
      let best = null;
      let bestScore = 0;

      for (const entry of kbEntries) {
        const text = ((entry.question || "") + " " + (entry.answer || "")).toLowerCase();
        let score = 0;
        for (const w of qWords) {
          if (text.includes(w)) score++;
        }
        if (score > bestScore) {
          bestScore = score;
          best = entry;
        }
      }

      if (best && bestScore > 0) {
        await writer.write(encoder.encode(`data: ${JSON.stringify({ type: "source", value: "KnowledgeBase" })}\n\n`));
        const words = best.answer.split(" ");
        for (let i = 0; i < words.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 30));
          await writer.write(encoder.encode(`data: ${JSON.stringify({ type: "content", value: words[i] + " " })}\n\n`));
        }
        await writer.write(encoder.encode("data: [DONE]\n\n"));
        await writer.close();
        return;
      }
    }

    // 2️⃣ Fallback to Cohere API
    await writer.write(encoder.encode(`data: ${JSON.stringify({ type: "source", value: "Cohere" })}\n\n`));

    const response = await cohere.chat({
      model: "command-a-03-2025",
      message: question,
    });

    const answer = response.text || "Sorry, I don’t know the answer.";
    const words = answer.split(" ");
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      await writer.write(encoder.encode(`data: ${JSON.stringify({ type: "content", value: words[i] + " " })}\n\n`));
    }
    await writer.write(encoder.encode("data: [DONE]\n\n"));
    await writer.close();
  } catch (error) {
    console.error("Error in processRequest:", error);
    await writer.write(encoder.encode(`data: ${JSON.stringify({ type: "error", value: "Processing error" })}\n\n`));
    await writer.write(encoder.encode("data: [DONE]\n\n"));
    await writer.close();
  }
}
