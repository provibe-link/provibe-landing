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

export async function createCategory(formData: FormData) {
  const name = (formData.get("name") as string)?.trim()
  if (!name) return { error: "Name is required" }

  const slug = slugify(name)

  const existing = await prisma.category.findUnique({ where: { slug } })
  if (existing) return { error: "A category with this slug already exists" }

  await prisma.category.create({ data: { name, slug } })
  revalidatePath("/admin/categories")
  return { success: true }
}

export async function updateCategory(id: number, formData: FormData) {
  const name = (formData.get("name") as string)?.trim()
  if (!name) return { error: "Name is required" }

  const slug = slugify(name)

  const existing = await prisma.category.findFirst({
    where: { slug, NOT: { id } },
  })
  if (existing) return { error: "A category with this slug already exists" }

  await prisma.category.update({ where: { id }, data: { name, slug } })
  revalidatePath("/admin/categories")
  return { success: true }
}

export async function deleteCategory(id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { posts: true } } },
  })

  if (!category) return { error: "Category not found" }
  if (category._count.posts > 0) {
    return { error: "Cannot delete a category that has posts assigned to it" }
  }

  await prisma.category.delete({ where: { id } })
  revalidatePath("/admin/categories")
  return { success: true }
}
