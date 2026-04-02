"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { post_status } from "@prisma/client"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

interface PostData {
  title: string
  slug?: string
  excerpt?: string
  content?: string
  content_json?: object
  cover_image?: string
  category_id?: number | null
  status: post_status
  featured?: boolean
  read_time?: string
  tag_ids?: number[]
}

export async function createPost(data: PostData) {
  try {
    const slug = data.slug?.trim() || slugify(data.title)

    const existing = await prisma.post.findUnique({ where: { slug } })
    if (existing) return { error: "A post with this slug already exists" }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || null,
        content: data.content || null,
        content_json: data.content_json ?? undefined,
        cover_image: data.cover_image || null,
        category_id: data.category_id || null,
        status: data.status,
        featured: data.featured ?? false,
        read_time: data.read_time || null,
        published_at: data.status === "PUBLISHED" ? new Date() : null,
        post_tags:
          data.tag_ids && data.tag_ids.length > 0
            ? { create: data.tag_ids.map((tag_id) => ({ tag_id })) }
            : undefined,
      },
    })

    revalidatePath("/admin/posts")
    revalidatePath("/blogs")
    return { success: true, id: post.id }
  } catch {
    return { error: "Failed to create post" }
  }
}

export async function updatePost(id: number, data: PostData) {
  try {
    const slug = data.slug?.trim() || slugify(data.title)

    const existing = await prisma.post.findFirst({
      where: { slug, NOT: { id } },
    })
    if (existing) return { error: "A post with this slug already exists" }

    const current = await prisma.post.findUnique({ where: { id } })
    if (!current) return { error: "Post not found" }

    // Determine published_at
    let published_at = current.published_at
    if (data.status === "PUBLISHED" && current.status !== "PUBLISHED") {
      published_at = new Date()
    }

    // Delete existing tags and recreate
    await prisma.postTag.deleteMany({ where: { post_id: id } })

    await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt || null,
        content: data.content || null,
        content_json: data.content_json ?? undefined,
        cover_image: data.cover_image || null,
        category_id: data.category_id || null,
        status: data.status,
        featured: data.featured ?? false,
        read_time: data.read_time || null,
        published_at,
        post_tags:
          data.tag_ids && data.tag_ids.length > 0
            ? { create: data.tag_ids.map((tag_id) => ({ tag_id })) }
            : undefined,
      },
    })

    revalidatePath("/admin/posts")
    revalidatePath("/blogs")
    return { success: true }
  } catch {
    return { error: "Failed to update post" }
  }
}

export async function deletePost(id: number) {
  try {
    await prisma.post.delete({ where: { id } })
    revalidatePath("/admin/posts")
    revalidatePath("/blogs")
    return { success: true }
  } catch {
    return { error: "Failed to delete post" }
  }
}

export async function togglePostStatus(id: number, status: post_status) {
  try {
    const current = await prisma.post.findUnique({ where: { id } })
    if (!current) return { error: "Post not found" }

    await prisma.post.update({
      where: { id },
      data: {
        status,
        published_at:
          status === "PUBLISHED" && current.status !== "PUBLISHED"
            ? new Date()
            : current.published_at,
      },
    })

    revalidatePath("/admin/posts")
    revalidatePath("/blogs")
    return { success: true }
  } catch {
    return { error: "Failed to update post status" }
  }
}
