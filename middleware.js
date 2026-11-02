import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const tokenCookie = req.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

  let isAuthenticated = false;
  let userPayload = null;

  if (tokenCookie) {
    try {
      const { payload } = await jwtVerify(tokenCookie, secret);
      isAuthenticated = true;
      userPayload = payload;
    } catch (err) {
      isAuthenticated = false;
    }
  }

  // 1. If user is logged in and navigates to login or signup pages, redirect to dashboard automatically
  const authPages = ["/login", "/get-started", "/signup"];
  if (authPages.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 2. Protected dashboard routes: if not logged in, redirect to login
  const protectedPages = ["/dashboard", "/knowledgebase", "/integration"];
  const isProtectedPage = protectedPages.some(
    (page) => pathname === page || pathname.startsWith(page + "/")
  );

  if (isProtectedPage) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // 3. Protected API routes
  if (pathname.startsWith("/api/protected")) {
    const authHeader = req.headers.get("authorization")?.split(" ")[1];
    const apiToken = authHeader || tokenCookie;

    if (!apiToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const { payload } = await jwtVerify(apiToken, secret);
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-payload", JSON.stringify(payload));
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/get-started",
    "/signup",
    "/dashboard",
    "/dashboard/:path*",
    "/knowledgebase",
    "/knowledgebase/:path*",
    "/integration",
    "/integration/:path*",
    "/api/protected/:path*",
  ],
};
