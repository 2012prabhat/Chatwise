// app/api/logout/route.js
export async function POST() {
  try {
    // Clear the JWT cookie by overwriting it
    const cookieOptions = [
      `token=`, // empty token
      `HttpOnly`,
      `Path=/`,
      `Max-Age=0`, // instantly expires
      `SameSite=Strict`,
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");

    return new Response(
      JSON.stringify({ message: "Logout successful" }),
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
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
