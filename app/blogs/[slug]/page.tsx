import { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { BlogPostContent } from "./content"

// Generate static params for all published posts
// Gracefully returns empty array if DB is unreachable (e.g. during Vercel build)
export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    })
    return posts.map((post) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  })
  if (!post) return { title: "Post Not Found" }
  return {
    title: `${post.title} - ProVibe Blog`,
    description: post.excerpt ?? "",
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!post || post.status !== "PUBLISHED") {
    notFound()
  }

  // Fetch related posts (same category, excluding current post)
  const relatedPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      slug: { not: slug },
      ...(post.category_id ? { category_id: post.category_id } : {}),
    },
    include: { category: true },
    orderBy: { published_at: "desc" },
    take: 3,
  })

  // If not enough related posts from same category, fill with recent posts
  let finalRelated = relatedPosts
  if (relatedPosts.length < 3) {
    const extraPosts = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        slug: { notIn: [slug, ...relatedPosts.map((p) => p.slug)] },
      },
      include: { category: true },
      orderBy: { published_at: "desc" },
      take: 3 - relatedPosts.length,
    })
    finalRelated = [...relatedPosts, ...extraPosts]
  }

  return <BlogPostContent post={post} slug={slug} relatedPosts={finalRelated} />
}
