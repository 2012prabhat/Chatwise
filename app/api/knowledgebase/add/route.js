import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import KnowledgeBase from "@/models/KnowledgeBase";
import jwt from "jsonwebtoken";
import { authCheck } from "@/lib/authCheck";

export async function POST(req) {
  try {
    await connectDB();

    const decoded = authCheck(req);
    const { question, answer } = await req.json();

    const doc = new KnowledgeBase({
      userId: decoded.id,
      question,
      answer,
    });

    await doc.save();

    return NextResponse.json({ message: "FAQ added successfully", doc });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
