import { NextRequest, NextResponse } from "next/server"
import { defaultLocale } from "@/i18n/config"

export function middleware(request: NextRequest) {
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

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
