"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Loader2,
  ImageIcon,
  X,
  Save,
  Plus,
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
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { TagInput } from "@/components/admin/tag-input"
import { CategoryCreateDialog } from "@/components/admin/category-create-dialog"
import { createPost, updatePost } from "@/lib/actions/posts"
import { createTag } from "@/lib/actions/tags"

interface PostData {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  content_json: object | null
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

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
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.category_id?.toString() || ""
  )
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    initialData?.post_tags?.map((pt) => pt.tag) || []
  )
  const [status, setStatus] = useState<string>(initialData?.status || "DRAFT")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [readTime, setReadTime] = useState(initialData?.read_time || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [contentJson, setContentJson] = useState<object | null>(
    initialData?.content_json || null
  )

  // ── SEO state ──
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [seoKeywords, setSeoKeywords] = useState("")

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
  const [allTags, setAllTags] = useState<Tag[]>([])

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
    fetch("/api/admin/tags")
      .then((res) => res.json())
      .then((data) => setAllTags(data))
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

  function handleEditorChange(html: string, json: object) {
    setContent(html)
    setContentJson(json)
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
      }
    } catch {
      setCoverUploadError("Upload failed. Please try again.")
    } finally {
      setCoverUploading(false)
      if (coverInputRef.current) coverInputRef.current.value = ""
    }
  }

  async function handleCreateTag(name: string): Promise<Tag | null> {
    const fd = new FormData()
    fd.set("name", name)
    const result = await createTag(fd)
    if (result?.error) return null

    // Refresh tags list and find the new one
    const res = await fetch("/api/admin/tags")
    const freshTags = await res.json()
    setAllTags(freshTags)

    const created = freshTags.find(
      (t: Tag) => t.name.toLowerCase() === name.toLowerCase()
    )
    return created || null
  }

  function handleCategoryCreated(category: {
    id: number
    name: string
    slug: string
  }) {
    setCategories((prev) => [...prev, category])
    setCategoryId(category.id.toString())
  }

  async function handleSave(publishStatus?: string) {
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setSaving(true)
    setSaveStatus("saving")
    setError("")

    const finalStatus = publishStatus || status
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
      tag_ids:
        selectedTags.length > 0
          ? selectedTags.map((t) => t.id)
          : undefined,
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
          {/* Save status indicator */}
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

      {/* ── Two Column Layout ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-6 py-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
            {/* ── Left Column ── */}
            <div className="space-y-6">
              {/* Title, Slug, Description Card */}
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

              {/* Banner / Cover Image Card */}
              <div className="rounded-xl border border-border bg-card p-6">
                <Label className="mb-3 block">Banner</Label>
                {coverImage ? (
                  <div className="group relative overflow-hidden rounded-lg">
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="max-h-[280px] w-full object-cover"
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
                      "flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 transition-colors hover:border-primary/40 hover:bg-muted/30",
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
              </div>

              {/* Content Editor Card */}
              <div className="rounded-xl border border-border bg-card p-6">
                <Label className="mb-3 block">Content</Label>
                <TiptapEditor
                  content={content}
                  onChange={handleEditorChange}
                />
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">
              {/* General Card */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-base font-semibold">
                  General
                </h3>

                {/* Category */}
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
                          <SelectItem
                            key={cat.id}
                            value={cat.id.toString()}
                          >
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

                {/* Tags */}
                <div className="mt-5 space-y-2">
                  <Label>Tags</Label>
                  <TagInput
                    allTags={allTags}
                    selectedTags={selectedTags}
                    onChange={setSelectedTags}
                    onCreateTag={handleCreateTag}
                    placeholder="New tag..."
                  />
                </div>
              </div>

              {/* SEO Card */}
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
                    <Label htmlFor="seo-keywords">SEO Keywords</Label>
                    <Input
                      id="seo-keywords"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      placeholder="keyword1, keyword2..."
                    />
                  </div>
                </div>
              </div>

              {/* Settings Card */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-base font-semibold">
                  Settings
                </h3>

                {/* Status */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex gap-1.5">
                    {(["DRAFT", "PUBLISHED", "ARCHIVED"] as const).map(
                      (s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(s)}
                          className={cn(
                            "flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
                            status === s
                              ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                              : "text-muted-foreground ring-1 ring-border hover:text-foreground"
                          )}
                        >
                          {s.charAt(0) + s.slice(1).toLowerCase()}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Read Time */}
                <div className="mt-4 space-y-2">
                  <Label htmlFor="read-time">Read Time</Label>
                  <Input
                    id="read-time"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 min"
                    className="h-9 text-sm"
                  />
                </div>

                {/* Featured */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <Label className="text-sm">Featured post</Label>
                  <Switch checked={featured} onCheckedChange={setFeatured} />
                </div>

                {/* Cover Image URL fallback */}
                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <Label>Cover Image URL</Label>
                  <Input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Create Dialog ── */}
      <CategoryCreateDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onCreated={handleCategoryCreated}
      />
    </div>
  )
}
