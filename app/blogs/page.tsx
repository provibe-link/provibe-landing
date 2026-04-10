import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { BlogsContent } from "./content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "ProVibe Blog - Tips & Insights for Creators",
  description: "Creator tips, brand partnership guides, and platform updates from the ProVibe team.",
}

export default async function BlogsPage() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany<{ include: { category: true } }>>> = []
  try {
    posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true },
      orderBy: { published_at: "desc" },
    })
  } catch {
    // DB unreachable — render with empty posts
  }

  return <BlogsContent posts={posts} />
}
