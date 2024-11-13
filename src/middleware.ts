import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_cookie");
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const res = await fetch("http://localhost:3000/api/auth/check", {
      headers: {
        token: token.value,
      },
    });
  } catch (error) {}
}
