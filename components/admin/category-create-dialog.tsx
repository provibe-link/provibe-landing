"use client"

import { useState } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { createCategory } from "@/lib/actions/categories"

interface CategoryCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: (category: { id: number; name: string; slug: string }) => void
}

export function CategoryCreateDialog({
  open,
  onOpenChange,
  onCreated,
}: CategoryCreateDialogProps) {
  const [name, setName] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")

  async function handleCreate() {
    if (!name.trim()) return
    setCreating(true)
    setError("")

    const fd = new FormData()
    fd.set("name", name.trim())
    const result = await createCategory(fd)

    if (result?.error) {
      setError(result.error)
      setCreating(false)
      return
    }

    // Fetch the newly created category to get its id
    try {
      const res = await fetch("/api/admin/categories")
      const categories = await res.json()
      const created = categories.find(
        (c: { name: string }) =>
          c.name.toLowerCase() === name.trim().toLowerCase()
      )
      if (created && onCreated) {
        onCreated({ id: created.id, name: created.name, slug: created.slug })
      }
    } catch {
      // Category was created but we couldn't fetch it - still close
    }

    setName("")
    setCreating(false)
    onOpenChange(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleCreate()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Add a new category for your posts. The slug will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="space-y-2">
            <Label htmlFor="category-name">Name</Label>
            <Input
              id="category-name"
              placeholder="e.g. Technology, Lifestyle..."
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setName("")
              setError("")
              onOpenChange(false)
            }}
            disabled={creating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={creating || !name.trim()}
          >
            {creating ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Plus className="mr-2 size-4" />
            )}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
