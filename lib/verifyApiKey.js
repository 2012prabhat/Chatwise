// lib/verifyApiKey.js
import connectDB from "@/lib/db";
import ApiKey from "@/models/ApiKey";

export async function verifyApiKey(req) {
  await connectDB();

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) return { error: "Missing API key", status: 401 };

  const keyDoc = await ApiKey.findOne({ key: apiKey, active: true });
  if (!keyDoc) return { error: "Invalid or revoked API key", status: 403 };

  return { tenantId: keyDoc.tenantId };
}
