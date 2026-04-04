import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

async function getUniqueReferralCode(): Promise<string> {
  for (let i = 0; i < 10; i++) {
    const code = generateReferralCode()
    const existing = await prisma.waitlistEntry.findUnique({
      where: { referral_code: code },
    })
    if (!existing) return code
  }
  // Fallback: append timestamp fragment
  return generateReferralCode() + Date.now().toString(36).slice(-2)
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, handle, ref } = await request.json()
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
        {
          error: "Email already on the waitlist",
          referral_code: existing.referral_code,
        },
        { status: 409 }
      )
    }

    const referralCode = await getUniqueReferralCode()

    // Create the entry
    const entry = await prisma.waitlistEntry.create({
      data: {
        name: name || null,
        email,
        handle: handle || null,
        referral_code: referralCode,
        referred_by: ref || null,
      },
    })

    // Increment referrer's count if referred
    if (ref) {
      await prisma.waitlistEntry.updateMany({
        where: { referral_code: ref },
        data: { referral_count: { increment: 1 } },
      })
    }

    return NextResponse.json(
      { success: true, referral_code: entry.referral_code },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
