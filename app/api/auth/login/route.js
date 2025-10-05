import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // ✅ JWT Payload includes company
    const token = jwt.sign(
      { id: user._id, email: user.email, company: user.company },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie options
    const cookieOptions = [
      `token=${token}`,
      `HttpOnly`,
      `Path=/`,
      `Max-Age=${60 * 60 * 24}`, // 1 day
      `SameSite=Strict`,
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ].filter(Boolean).join("; ");

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          company: user.company,
        },
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookieOptions,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
