import { NextRequest, NextResponse } from "next/server";
import { httpGet } from "./services/ServerHttpService";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value || null;

  if (!token) return NextResponse.redirect(new URL("/user/login", req.url));

  const validateTokenResponse = await httpGet(
    "/api/v1/user/validateToken",
    `bearer ${token}`
  );

  if (
    validateTokenResponse.succeeded == false ||
    validateTokenResponse.statusCode != 200
  ) {
    return NextResponse.redirect(
      new URL("/user/login?invalidToken=true", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/profile"],
};
