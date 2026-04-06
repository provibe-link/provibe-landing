"use client"

import { useCallback, useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Loader2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  updateCategory,
  deleteCategory,
} from "@/lib/actions/categories"
import { CategoryCreateDialog } from "@/components/admin/category-create-dialog"

interface Category {
  id: number
  name: string
  slug: string
  created_at: string
  _count: { posts: number }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories")
      const data = await res.json()
      setCategories(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  async function handleUpdate(id: number) {
    if (!editingName.trim()) return
    setSaving(true)
    setError("")
    const fd = new FormData()
    fd.set("name", editingName)
    const result = await updateCategory(id, fd)
    if (result?.error) {
      setError(result.error)
    } else {
      setEditingId(null)
    }
    setSaving(false)
    await fetchCategories()
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this category?")) return
    setDeletingId(id)
    setError("")
    const result = await deleteCategory(id)
    if (result?.error) {
      setError(result.error)
    }
    setDeletingId(null)
    await fetchCategories()
  }

  function startEditing(category: Category) {
    setEditingId(category.id)
    setEditingName(category.name)
    setError("")
  }

  function cancelEditing() {
    setEditingId(null)
    setEditingName("")
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Categories</h1>
          <p className="mt-1 text-muted-foreground">
            Manage blog post categories.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Category
        </Button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-sm text-muted-foreground font-medium">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm text-muted-foreground font-medium">
                Slug
              </th>
              <th className="px-4 py-3 text-left text-sm text-muted-foreground font-medium">
                Posts
              </th>
              <th className="px-4 py-3 text-right text-sm text-muted-foreground font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  <Loader2 className="mx-auto size-5 animate-spin" />
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No categories yet. Create one above.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3">
                    {editingId === cat.id ? (
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdate(cat.id)
                          if (e.key === "Escape") cancelEditing()
                        }}
                        className="h-8 max-w-xs"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {cat.slug}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {cat._count.posts}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {editingId === cat.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => handleUpdate(cat.id)}
                          disabled={saving}
                        >
                          {saving ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Check className="size-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={cancelEditing}
                          disabled={saving}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => startEditing(cat)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(cat.id)}
                          disabled={deletingId === cat.id}
                        >
                          {deletingId === cat.id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Category Create Dialog */}
      <CategoryCreateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={() => fetchCategories()}
      />
    </div>
  )
}
