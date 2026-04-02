import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { post_status } from "@prisma/client"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const status = searchParams.get("status") as post_status | null
  const search = searchParams.get("search")

  const where: Record<string, unknown> = {}

  if (status && Object.values(post_status).includes(status)) {
    where.status = status
  }

  if (search) {
    where.title = { contains: search, mode: "insensitive" }
  }

  const posts = await prisma.post.findMany({
    where,
    include: {
      category: true,
      post_tags: { include: { tag: true } },
    },
    orderBy: { created_at: "desc" },
  })

  return NextResponse.json(posts)
}
