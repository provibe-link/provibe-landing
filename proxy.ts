import { NextRequest, NextResponse } from "next/server"
import { defaultLocale } from "@/i18n/config"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin auth check
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    try {
      const { jwtVerify } = await import("jose")
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      await jwtVerify(token, secret)
    } catch {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      )
      response.cookies.delete("admin_token")
      return response
    }
  }

  // Locale cookie (existing logic)
  const localeCookie = request.cookies.get("NEXT_LOCALE")
  if (!localeCookie) {
    const response = NextResponse.next()
    response.cookies.set("NEXT_LOCALE", defaultLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  return NextResponse.next()
}

export const config = { matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"] }
