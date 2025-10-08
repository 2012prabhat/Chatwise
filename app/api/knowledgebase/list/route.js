import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import KnowledgeBase from "@/models/KnowledgeBase";
import jwt from "jsonwebtoken";
import { authCheck } from "@/lib/authCheck";

export async function GET(req) {
  try {
    await connectDB();
    const decoded = authCheck(req);

    const docs = await KnowledgeBase.find({ userId: decoded.id });

    return NextResponse.json({ faqs: docs });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
