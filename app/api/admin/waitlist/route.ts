import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")
  const entries = await prisma.waitlistEntry.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { created_at: "desc" },
  })
  return NextResponse.json(entries)
}
