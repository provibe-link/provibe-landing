import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { name, email, handle } = await request.json()
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      )
    }
    const existing = await prisma.waitlistEntry.findUnique({
      where: { email },
    })
    if (existing) {
      return NextResponse.json(
        { error: "Email already on the waitlist" },
        { status: 409 }
      )
    }
    await prisma.waitlistEntry.create({
      data: { name: name || null, email, handle: handle || null },
    })
    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
