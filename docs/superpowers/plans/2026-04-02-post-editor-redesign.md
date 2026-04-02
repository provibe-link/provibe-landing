# Post Editor Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stacked form post editor with a Medium/Ghost-style distraction-free writing experience featuring a sticky top bar, centered content, and slide-out settings drawer.

**Architecture:** Single new `PostEditor` component replaces `PostForm`. The page structure is a full-height flex column: sticky top bar, scrollable centered content (720px max), and a shadcn Sheet for settings. All existing server actions (`createPost`/`updatePost`) and the `TiptapEditor` component are reused unchanged.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui (Sheet, Select, Switch, Button, Input), Tiptap editor, Lucide icons.

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `components/admin/post-editor.tsx` | **Create** | Main editor component — top bar, title card, editor, settings drawer, all state |
| `app/admin/posts/new/page.tsx` | **Modify** | Swap `PostForm` for `PostEditor`, remove wrapper div/heading |
| `app/admin/posts/[id]/edit/page.tsx` | **Modify** | Swap `PostForm` for `PostEditor`, remove wrapper div/heading |
| `app/admin/layout.tsx` | **Modify** | Pass children without forced `p-8` wrapper when on editor pages (or let editor negate it) |
| `components/admin/post-form.tsx` | **Delete** | Replaced by `post-editor.tsx` |

---

### Task 1: Create PostEditor component — shell and top bar

**Files:**
- Create: `components/admin/post-editor.tsx`

- [ ] **Step 1: Create the PostEditor component file with all state, types, and the top bar UI**

```tsx
// components/admin/post-editor.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Settings,
  Loader2,
  ImageIcon,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { createPost, updatePost } from "@/lib/actions/posts"

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
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug)
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "")
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.category_id?.toString() || ""
  )
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    initialData?.post_tags?.map((pt) => pt.tag.id) || []
  )
  const [status, setStatus] = useState<string>(initialData?.status || "DRAFT")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [readTime, setReadTime] = useState(initialData?.read_time || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [contentJson, setContentJson] = useState<object | null>(
    initialData?.content_json || null
  )

  // ── UI state ──
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [error, setError] = useState("")
  const [coverUploading, setCoverUploading] = useState(false)
  const [coverUploadError, setCoverUploadError] = useState("")
  const coverInputRef = useRef<HTMLInputElement>(null)

  // ── Metadata ──
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
    fetch("/api/admin/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
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

  function handleTagToggle(tagId: number) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
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
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
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
      tag_ids: selectedTagIds.length > 0 ? selectedTagIds : undefined,
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
    <div className="-m-8 flex h-screen flex-col bg-background">
      {/* ── Top Bar ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to posts
        </button>

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
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="mr-1.5 size-3.5" />
            Settings
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
            Save Draft
          </Button>

          <Button
            size="sm"
            disabled={saving}
            onClick={() => handleSave("PUBLISHED")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
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
        <div className="mx-auto w-full max-w-[720px] px-6 pt-4">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        </div>
      )}

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[720px] px-6 py-10">
          {/* Title Card */}
          <div className="mb-8 rounded-xl border border-border bg-card/50 p-6">
            {/* Cover Image */}
            {coverImage ? (
              <div className="group relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full max-h-[240px] object-cover"
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
                  "mb-6 flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 transition-colors hover:border-primary/40 hover:bg-muted/30",
                  coverUploading && "pointer-events-none opacity-60"
                )}
                onClick={() => coverInputRef.current?.click()}
              >
                {coverUploading ? (
                  <Loader2 className="mb-1.5 size-6 animate-spin text-muted-foreground" />
                ) : (
                  <ImageIcon className="mb-1.5 size-6 text-muted-foreground/60" />
                )}
                <p className="text-sm text-muted-foreground/60">
                  {coverUploading ? "Uploading..." : "Add cover image"}
                </p>
              </div>
            )}
            {coverUploadError && (
              <p className="mb-4 text-sm text-destructive">{coverUploadError}</p>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
              className="hidden"
              onChange={handleCoverUpload}
            />

            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title..."
              className="w-full border-0 bg-transparent font-display text-3xl font-bold text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
            />

            {/* Excerpt Input */}
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a brief excerpt..."
              rows={2}
              className="mt-3 w-full resize-none border-0 bg-transparent text-[15px] leading-relaxed text-muted-foreground placeholder:text-muted-foreground/30 focus:outline-none"
            />
          </div>

          {/* Editor */}
          <TiptapEditor content={content} onChange={handleEditorChange} />
        </div>
      </div>

      {/* ── Settings Drawer ── */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-display">Post Settings</SheetTitle>
            <SheetDescription>
              Configure metadata, category, tags, and publishing options.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 px-4 pb-8">
            {/* Status */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Status
              </Label>
              <div className="flex gap-1.5">
                {(["DRAFT", "PUBLISHED", "ARCHIVED"] as const).map((s) => (
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
                ))}
              </div>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Slug
              </Label>
              <Input
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="post-slug"
                className="h-9 text-sm"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Category
              </Label>
              {categories.length > 0 ? (
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
              ) : (
                <p className="text-xs text-muted-foreground/60">No categories</p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Tags
              </Label>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => handleTagToggle(tag.id)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                        selectedTagIds.includes(tag.id)
                          ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                          : "text-muted-foreground ring-1 ring-border hover:text-foreground"
                      )}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground/60">No tags</p>
              )}
            </div>

            {/* Read Time */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Read Time
              </Label>
              <Input
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min"
                className="h-9 text-sm"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <Label className="text-sm text-foreground">Featured post</Label>
              <Switch
                checked={featured}
                onCheckedChange={setFeatured}
              />
            </div>

            {/* Cover Image URL fallback */}
            <div className="space-y-2 border-t border-border pt-4">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Cover Image URL
              </Label>
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="h-9 text-sm"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors related to `post-editor.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/admin/post-editor.tsx
git commit -m "feat: add PostEditor component with distraction-free layout"
```

---

### Task 2: Update new post page to use PostEditor

**Files:**
- Modify: `app/admin/posts/new/page.tsx`

- [ ] **Step 1: Replace the page content**

Replace the entire file content with:

```tsx
import { PostEditor } from "@/components/admin/post-editor"

export default function NewPostPage() {
  return <PostEditor />
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/posts/new/page.tsx
git commit -m "feat: use PostEditor on new post page"
```

---

### Task 3: Update edit post page to use PostEditor

**Files:**
- Modify: `app/admin/posts/[id]/edit/page.tsx`

- [ ] **Step 1: Replace the page content**

Replace the entire file content with:

```tsx
"use client"

import { use, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { PostEditor } from "@/components/admin/post-editor"

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/admin/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found")
        return res.json()
      })
      .then((data) => setPost(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      </div>
    )
  }

  return post ? <PostEditor initialData={post} /> : null
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add app/admin/posts/[id]/edit/page.tsx
git commit -m "feat: use PostEditor on edit post page"
```

---

### Task 4: Delete old PostForm component

**Files:**
- Delete: `components/admin/post-form.tsx`

- [ ] **Step 1: Check that no other files import PostForm**

Run: `grep -r "post-form" --include="*.tsx" --include="*.ts" -l`
Expected: Only `components/admin/post-form.tsx` itself (no other imports remain)

- [ ] **Step 2: Delete the file**

```bash
rm components/admin/post-form.tsx
```

- [ ] **Step 3: Verify full build**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove old PostForm, replaced by PostEditor"
```

---

### Task 5: Manual testing and polish

- [ ] **Step 1: Start the dev server and test the new post page**

Run: `pnpm dev`

Open `http://localhost:3000/admin/posts/new` and verify:
- Sticky top bar with back link, settings, save draft, publish buttons
- Centered content area with title card (cover upload zone, title input, excerpt)
- Tiptap editor below the title card
- Settings drawer opens when clicking "Settings" button
- All fields in the drawer: status toggles, slug, category, tags, read time, featured switch, cover URL

- [ ] **Step 2: Test creating a post**

1. Type a title — verify slug auto-generates
2. Upload a cover image — verify preview appears
3. Write content in the editor
4. Open settings, select a category, toggle some tags
5. Click "Save Draft" — verify it saves and shows "Saved" indicator
6. Click "Publish" — verify it redirects to posts list

- [ ] **Step 3: Test editing a post**

Navigate to an existing post's edit page. Verify all fields are pre-populated and the editor loads existing content.

- [ ] **Step 4: Fix any visual issues found during testing**

Adjust spacing, colors, or transitions as needed based on what you see.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "polish: post editor visual adjustments"
```
