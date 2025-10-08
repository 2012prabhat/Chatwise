import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authCheck(req) {
  const cookie = req.headers.get("cookie"); // get cookies from request
  if (!cookie) {
    throw new Error("Unauthorized");
  }

  const match = cookie.match(/token=([^;]+)/); // extract token from cookie
  const token = match ? match[1] : null;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // returns user info from token
  } catch (err) {
    throw new Error("Unauthorized");
  }
}
