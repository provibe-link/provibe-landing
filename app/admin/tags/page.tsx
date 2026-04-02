"use client"

import { useCallback, useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Loader2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createTag, updateTag, deleteTag } from "@/lib/actions/tags"

interface Tag {
  id: number
  name: string
  slug: string
  created_at: string
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchTags = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/tags")
      const data = await res.json()
      setTags(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  async function handleCreate() {
    if (!newName.trim()) return
    setCreating(true)
    setError("")
    const fd = new FormData()
    fd.set("name", newName)
    const result = await createTag(fd)
    if (result?.error) {
      setError(result.error)
    } else {
      setNewName("")
    }
    setCreating(false)
    await fetchTags()
  }

  async function handleUpdate(id: number) {
    if (!editingName.trim()) return
    setSaving(true)
    setError("")
    const fd = new FormData()
    fd.set("name", editingName)
    const result = await updateTag(id, fd)
    if (result?.error) {
      setError(result.error)
    } else {
      setEditingId(null)
    }
    setSaving(false)
    await fetchTags()
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this tag?")) return
    setDeletingId(id)
    setError("")
    const result = await deleteTag(id)
    if (result?.error) {
      setError(result.error)
    }
    setDeletingId(null)
    await fetchTags()
  }

  function startEditing(tag: Tag) {
    setEditingId(tag.id)
    setEditingName(tag.name)
    setError("")
  }

  function cancelEditing() {
    setEditingId(null)
    setEditingName("")
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Tags</h1>
      <p className="mt-1 text-muted-foreground">Manage blog post tags.</p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <Input
          placeholder="New tag name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          className="max-w-xs"
        />
        <Button onClick={handleCreate} disabled={creating || !newName.trim()}>
          {creating ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Plus className="mr-2 size-4" />
          )}
          Add
        </Button>
      </div>

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
              <th className="px-4 py-3 text-right text-sm text-muted-foreground font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  <Loader2 className="mx-auto size-5 animate-spin" />
                </td>
              </tr>
            ) : tags.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  No tags yet. Create one above.
                </td>
              </tr>
            ) : (
              tags.map((tag) => (
                <tr key={tag.id} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3">
                    {editingId === tag.id ? (
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdate(tag.id)
                          if (e.key === "Escape") cancelEditing()
                        }}
                        className="h-8 max-w-xs"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium">{tag.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {tag.slug}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {editingId === tag.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => handleUpdate(tag.id)}
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
                          onClick={() => startEditing(tag)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(tag.id)}
                          disabled={deletingId === tag.id}
                        >
                          {deletingId === tag.id ? (
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
    </div>
  )
}
