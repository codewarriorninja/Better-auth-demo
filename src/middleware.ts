import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
 
type Session = typeof auth.$Infer.Session;
const protectedRoutes = ["/profile", "/admin/dashboard"];

export async function middleware(request: NextRequest) {
    const {nextUrl} = request;
	const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
		},
	});

    const isLoggedIn = !!session;
    const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");
  
    if (isOnProtectedRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  
    if (isOnAuthRoute && isLoggedIn) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
 
	return NextResponse.next();
}
 
export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}