import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { BlogsContent } from "./content"

export const metadata: Metadata = {
  title: "ProVibe Blog - Tips & Insights for Creators",
  description: "Creator tips, brand partnership guides, and platform updates from the ProVibe team.",
}

export default async function BlogsPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { published_at: "desc" },
  })

  return <BlogsContent posts={posts} />
}
