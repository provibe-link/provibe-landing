"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

export async function createTag(formData: FormData) {
  const name = (formData.get("name") as string)?.trim()
  if (!name) return { error: "Name is required" }

  const slug = slugify(name)

  const existing = await prisma.tag.findUnique({ where: { slug } })
  if (existing) return { error: "A tag with this slug already exists" }

  await prisma.tag.create({ data: { name, slug } })
  revalidatePath("/admin/tags")
  return { success: true }
}

export async function updateTag(id: number, formData: FormData) {
  const name = (formData.get("name") as string)?.trim()
  if (!name) return { error: "Name is required" }

  const slug = slugify(name)

  const existing = await prisma.tag.findFirst({
    where: { slug, NOT: { id } },
  })
  if (existing) return { error: "A tag with this slug already exists" }

  await prisma.tag.update({ where: { id }, data: { name, slug } })
  revalidatePath("/admin/tags")
  return { success: true }
}

export async function deleteTag(id: number) {
  const tag = await prisma.tag.findUnique({ where: { id } })
  if (!tag) return { error: "Tag not found" }

  await prisma.tag.delete({ where: { id } })
  revalidatePath("/admin/tags")
  return { success: true }
}
