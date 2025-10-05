import ApiKey from "@/models/ApiKey";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { authCheck } from "@/lib/authCheck";

export async function POST(req) {
  await connectDB();

  // Auth check
  let decoded = authCheck(req);

  const tenantId = decoded.id;

  // Generate secure key
  const key = crypto.randomBytes(32).toString("hex");

  const apiKey = new ApiKey({ tenantId, key });
  await apiKey.save();

  return new Response(JSON.stringify({ key }), { status: 201 });
}


export async function GET(req) {
  await connectDB();

 // Auth check
  let decoded = authCheck(req);
  const tenantId = decoded.id;
  const keys = await ApiKey.find({ tenantId }).lean();
  return new Response(JSON.stringify(keys), { status: 200 });
}



export async function DELETE(req) {
  await connectDB();

  let decoded = authCheck(req);

  const tenantId = decoded.id;
  const { keyId } = await req.json();

  const key = await ApiKey.findOne({ _id: keyId, tenantId });
  if (!key) return new Response(JSON.stringify({ error: "Key not found" }), { status: 404 });

  key.active = false;
  await key.save();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
