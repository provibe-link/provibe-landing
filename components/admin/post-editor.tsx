"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { Value } from "platejs"
import {
  Loader2,
  ImageIcon,
  X,
  Save,
  Plus,
  Link as LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { EditorField } from "@/components/editor/plate-editor"
import { CategoryCreateDialog } from "@/components/admin/category-create-dialog"
import { createPost, updatePost } from "@/lib/actions/posts"
import { createTag } from "@/lib/actions/tags"

/* ── Types ── */

interface PostData {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  content_json: Value | null
  cover_image: string | null
  category_id: number | null
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured: boolean
  read_time: string | null
  category: { id: number; name: string } | null
  post_tags: { tag: { id: number; name: string } }[]
}

interface Category {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
}

interface PostEditorProps {
  initialData?: PostData
}

/* ── Helpers ── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

/* ── Chip Input (reusable for tags & keywords) ── */

function ChipInput({
  chips,
  onChange,
  placeholder = "Type and press Enter...",
}: {
  chips: string[]
  onChange: (chips: string[]) => void
  placeholder?: string
}) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function addChip() {
    const value = inputValue.trim()
    if (value && !chips.includes(value)) {
      onChange([...chips, value])
    }
    setInputValue("")
  }

  function removeChip(index: number) {
    onChange(chips.filter((_, i) => i !== index))
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addChip()
    } else if (e.key === "Backspace" && !inputValue && chips.length > 0) {
      removeChip(chips.length - 1)
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-[2.5rem] flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm transition-colors",
        "focus-within:ring-1 focus-within:ring-ring"
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {chips.map((chip, i) => (
        <span
          key={`${chip}-${i}`}
          className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/30 transition-colors hover:bg-primary/25"
        >
          {chip}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeChip(i)
            }}
            className="rounded-sm p-0.5 transition-colors hover:bg-primary/20"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (inputValue.trim()) addChip()
        }}
        placeholder={chips.length === 0 ? placeholder : ""}
        className="min-w-[80px] flex-1 bg-transparent text-sm placeholder:text-muted-foreground/50 focus:outline-none"
      />
    </div>
  )
}

/* ── Post Editor ── */

export function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter()

  // ── Field state ──
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(
    !!initialData?.slug
  )
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "")
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.category_id?.toString() || ""
  )
  const [tagNames, setTagNames] = useState<string[]>(
    initialData?.post_tags?.map((pt) => pt.tag.name) || []
  )
  const status = initialData?.status || "DRAFT"
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [readTime, setReadTime] = useState(initialData?.read_time || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [contentJson, setContentJson] = useState<Value | null>(
    (initialData?.content_json as Value) || null
  )

  // ── SEO state ──
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [seoKeywords, setSeoKeywords] = useState<string[]>([])

  // ── UI state ──
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle")
  const [error, setError] = useState("")
  const [coverUploading, setCoverUploading] = useState(false)
  const [coverUploadError, setCoverUploadError] = useState("")
  const coverInputRef = useRef<HTMLInputElement>(null)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)

  // ── Metadata ──
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])

  // ── Handlers ──
  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugManuallyEdited) setSlug(slugify(value))
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true)
    setSlug(value)
  }

  async function handleEditorChange(value: Value, html: string) {
    setContent(html)
    setContentJson(value)
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverUploadError("")
    setCoverUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setCoverUploadError(data.error || "Upload failed")
      } else {
        setCoverImage(data.url)
        setCoverImageUrl("")
      }
    } catch {
      setCoverUploadError("Upload failed. Please try again.")
    } finally {
      setCoverUploading(false)
      if (coverInputRef.current) coverInputRef.current.value = ""
    }
  }

  function handleApplyUrl() {
    const url = coverImageUrl.trim()
    if (url) {
      setCoverImage(url)
      setCoverImageUrl("")
    }
  }

  function handleCategoryCreated(category: {
    id: number
    name: string
    slug: string
  }) {
    setCategories((prev) => [...prev, category])
    setCategoryId(category.id.toString())
  }

  const resolveTagIds = useCallback(
    async (names: string[]): Promise<number[]> => {
      const res = await fetch("/api/admin/tags")
      const allTags: Tag[] = await res.json()
      const ids: number[] = []

      for (const name of names) {
        const existing = allTags.find(
          (t) => t.name.toLowerCase() === name.toLowerCase()
        )
        if (existing) {
          ids.push(existing.id)
        } else {
          const fd = new FormData()
          fd.set("name", name)
          const result = await createTag(fd)
          if (!result?.error) {
            const freshRes = await fetch("/api/admin/tags")
            const freshTags: Tag[] = await freshRes.json()
            const created = freshTags.find(
              (t) => t.name.toLowerCase() === name.toLowerCase()
            )
            if (created) ids.push(created.id)
          }
        }
      }

      return ids
    },
    []
  )

  async function handleSave(publishStatus?: string) {
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setSaving(true)
    setSaveStatus("saving")
    setError("")

    const finalStatus = publishStatus || status

    // Resolve tag names to IDs (create if needed)
    let tagIds: number[] = []
    if (tagNames.length > 0) {
      tagIds = await resolveTagIds(tagNames)
    }

    const data = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim() || undefined,
      content: content || undefined,
      content_json: contentJson || undefined,
      cover_image: coverImage.trim() || undefined,
      category_id: categoryId ? parseInt(categoryId, 10) : null,
      status: finalStatus as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      featured,
      read_time: readTime.trim() || undefined,
      tag_ids: tagIds.length > 0 ? tagIds : undefined,
    }

    const result = initialData
      ? await updatePost(initialData.id, data)
      : await createPost(data)

    if (result?.error) {
      setError(result.error)
      setSaveStatus("error")
      setSaving(false)
    } else {
      setSaveStatus("saved")
      setSaving(false)
      if (publishStatus === "PUBLISHED" || !initialData) {
        router.push("/admin/posts")
      }
    }
  }

  // ── Render ──
  return (
    <div className="-m-8 flex min-h-screen flex-col bg-background">
      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-30 flex shrink-0 items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
        <div>
          <h1 className="font-display text-2xl font-bold">
            {initialData ? "Edit Article" : "Create New Article"}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {initialData
              ? "Update your article details."
              : "Fill in details to create an article."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveStatus !== "idle" && (
            <div className="flex items-center gap-1.5 px-3">
              <div
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  saveStatus === "saved" && "bg-emerald-500",
                  saveStatus === "saving" && "bg-yellow-500",
                  saveStatus === "error" && "bg-destructive"
                )}
              />
              <span className="text-xs text-muted-foreground">
                {saveStatus === "saved" && "Saved"}
                {saveStatus === "saving" && "Saving..."}
                {saveStatus === "error" && "Error"}
              </span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/posts")}
          >
            Cancel
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={saving}
            onClick={() => handleSave("DRAFT")}
          >
            {saving && status === "DRAFT" && (
              <Loader2 className="mr-1.5 size-3.5 animate-spin" />
            )}
            <Save className="mr-1.5 size-3.5" />
            Save Draft
          </Button>

          <Button
            size="sm"
            disabled={saving}
            onClick={() => handleSave("PUBLISHED")}
          >
            {saving && status === "PUBLISHED" && (
              <Loader2 className="mr-1.5 size-3.5 animate-spin" />
            )}
            Publish
          </Button>
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="mx-auto w-full max-w-7xl px-6 pt-4">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        </div>
      )}

      {/* ── Main Layout ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-6 py-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
            {/* ── Left Column ── */}
            <div className="space-y-6">
              {/* Title, Slug, Description */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input
                      id="post-title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Article title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-slug">Slug</Label>
                    <Input
                      id="post-slug"
                      value={slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="auto-generated or custom"
                    />
                    <p className="text-xs text-muted-foreground">
                      URL-friendly article identifier.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="post-description">Description</Label>
                  <Textarea
                    id="post-description"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of your article..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Banner Card (upload + URL) */}
              <div className="rounded-xl border border-border bg-card p-6">
                <Label className="mb-3 block">Banner</Label>

                {coverImage ? (
                  <div className="group relative overflow-hidden rounded-lg">
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="max-h-[360px] w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => coverInputRef.current?.click()}
                      >
                        Replace
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setCoverImage("")}
                      >
                        <X className="mr-1 size-3.5" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex min-h-[360px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 transition-colors hover:border-primary/40 hover:bg-muted/30",
                      coverUploading && "pointer-events-none opacity-60"
                    )}
                    onClick={() => coverInputRef.current?.click()}
                  >
                    {coverUploading ? (
                      <Loader2 className="mb-2 size-8 animate-spin text-muted-foreground" />
                    ) : (
                      <ImageIcon className="mb-2 size-8 text-muted-foreground/40" />
                    )}
                    <p className="text-sm text-muted-foreground/60">
                      {coverUploading
                        ? "Uploading..."
                        : "Drag & drop or click to upload"}
                    </p>
                  </div>
                )}

                {coverUploadError && (
                  <p className="mt-3 text-sm text-destructive">
                    {coverUploadError}
                  </p>
                )}

                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={handleCoverUpload}
                />

                {/* OR divider + URL input */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-medium text-muted-foreground">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
                    <Input
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleApplyUrl()
                        }
                      }}
                      placeholder="Paste image URL..."
                      className="h-9 pl-9 text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleApplyUrl}
                    disabled={!coverImageUrl.trim()}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">
              {/* General & Settings */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-base font-semibold">
                  General & Settings
                </h3>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <div className="flex items-center gap-2">
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger className="h-9 w-full text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No category</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-9 shrink-0"
                      onClick={() => setCategoryDialogOpen(true)}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="read-time">Read Time</Label>
                  <Input
                    id="read-time"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 min"
                    className="h-9 text-sm"
                  />
                </div>

                <div className="mt-5 space-y-2">
                  <Label>Tags</Label>
                  <ChipInput
                    chips={tagNames}
                    onChange={setTagNames}
                    placeholder="Add tag..."
                  />
                  <p className="text-xs text-muted-foreground/60">
                    Press Enter or comma to add. Tags are created on save.
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <Label className="text-sm">Featured post</Label>
                  <Switch checked={featured} onCheckedChange={setFeatured} />
                </div>
              </div>

              {/* SEO */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-base font-semibold">
                  SEO
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">SEO Title</Label>
                    <Input
                      id="seo-title"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder={title || "SEO title..."}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo-description">SEO Description</Label>
                    <Textarea
                      id="seo-description"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder={excerpt || "SEO description..."}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SEO Keywords</Label>
                    <ChipInput
                      chips={seoKeywords}
                      onChange={setSeoKeywords}
                      placeholder="Add keyword..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              {/* Content Editor */}
              <div className="flex min-h-[600px] flex-col rounded-xl border border-border bg-card p-6">
                <Label className="mb-3 block">Content</Label>
                <div className="flex-1">
                  <EditorField
                    value={contentJson ?? undefined}
                    onChange={handleEditorChange}
                    placeholder="Write your content..."
                    className="h-full min-h-[500px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategoryCreateDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onCreated={handleCategoryCreated}
      />
    </div>
  )
}
