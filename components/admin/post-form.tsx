"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

interface PostFormProps {
  initialData?: PostData
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter()

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
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    initialData?.post_tags?.map((pt) => pt.tag.id) || []
  )
  const [status, setStatus] = useState<string>(
    initialData?.status || "DRAFT"
  )
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [readTime, setReadTime] = useState(initialData?.read_time || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [contentJson, setContentJson] = useState<object | null>(
    initialData?.content_json || null
  )

  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
    fetch("/api/admin/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
  }, [])

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugManuallyEdited) {
      setSlug(slugify(value))
    }
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true)
    setSlug(value)
  }

  function handleTagToggle(tagId: number) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    )
  }

  function handleEditorChange(html: string, json: object) {
    setContent(html)
    setContentJson(json)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setSaving(true)
    setError("")

    const data = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim() || undefined,
      content: content || undefined,
      content_json: contentJson || undefined,
      cover_image: coverImage.trim() || undefined,
      category_id: categoryId ? parseInt(categoryId, 10) : null,
      status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      featured,
      read_time: readTime.trim() || undefined,
      tag_ids: selectedTagIds.length > 0 ? selectedTagIds : undefined,
    }

    const result = initialData
      ? await updatePost(initialData.id, data)
      : await createPost(data)

    if (result?.error) {
      setError(result.error)
      setSaving(false)
    } else {
      router.push("/admin/posts")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="post-slug"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary of the post..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover_image">Cover Image URL</Label>
        <Input
          id="cover_image"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full">
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
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="read_time">Read Time</Label>
          <Input
            id="read_time"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            placeholder="5 min"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="featured"
          checked={featured}
          onCheckedChange={(checked) => setFeatured(checked === true)}
        />
        <Label htmlFor="featured">Featured post</Label>
      </div>

      {tags.length > 0 && (
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-2">
                <Checkbox
                  id={`tag-${tag.id}`}
                  checked={selectedTagIds.includes(tag.id)}
                  onCheckedChange={() => handleTagToggle(tag.id)}
                />
                <Label htmlFor={`tag-${tag.id}`} className="font-normal">
                  {tag.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Content</Label>
        <TiptapEditor content={content} onChange={handleEditorChange} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
          {initialData ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/posts")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
