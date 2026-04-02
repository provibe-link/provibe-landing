"use client"

import { useCallback, useEffect, useState } from "react"
import NextLink from "next/link"
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  Archive,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { deletePost, togglePostStatus } from "@/lib/actions/posts"

interface Post {
  id: number
  title: string
  slug: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured: boolean
  created_at: string
  category: { id: number; name: string } | null
  post_tags: { tag: { id: number; name: string } }[]
}

const STATUS_OPTIONS = ["ALL", "DRAFT", "PUBLISHED", "ARCHIVED"] as const

function StatusBadge({ status }: { status: Post["status"] }) {
  const styles = {
    DRAFT: "bg-yellow-500/10 text-yellow-500",
    PUBLISHED: "bg-green-500/10 text-green-500",
    ARCHIVED: "bg-gray-500/10 text-gray-500",
  }

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  )
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [error, setError] = useState("")

  const fetchPosts = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "ALL") params.set("status", statusFilter)
      if (search.trim()) params.set("search", search.trim())
      const res = await fetch(`/api/admin/posts?${params.toString()}`)
      const data = await res.json()
      setPosts(data)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      fetchPosts()
    }, 300)
    return () => clearTimeout(timeout)
  }, [fetchPosts])

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this post?")) return
    setActionLoading(id)
    setError("")
    const result = await deletePost(id)
    if (result?.error) setError(result.error)
    setActionLoading(null)
    await fetchPosts()
  }

  async function handleToggleStatus(
    id: number,
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  ) {
    setActionLoading(id)
    setError("")
    const result = await togglePostStatus(id, status)
    if (result?.error) setError(result.error)
    setActionLoading(null)
    await fetchPosts()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Posts</h1>
          <p className="mt-1 text-muted-foreground">
            Manage blog posts and articles.
          </p>
        </div>
        <Button asChild>
          <NextLink href="/admin/posts/new">
            <Plus className="mr-2 size-4" />
            New Post
          </NextLink>
        </Button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1">
          {STATUS_OPTIONS.map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Date
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  <Loader2 className="mx-auto size-5 animate-spin" />
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{post.title}</span>
                      {post.featured && (
                        <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {post.category?.name || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {actionLoading === post.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <>
                          {post.status === "PUBLISHED" ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() =>
                                handleToggleStatus(post.id, "DRAFT")
                              }
                              title="Unpublish"
                            >
                              <EyeOff className="size-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() =>
                                handleToggleStatus(post.id, "PUBLISHED")
                              }
                              title="Publish"
                            >
                              <Eye className="size-4" />
                            </Button>
                          )}
                          {post.status !== "ARCHIVED" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() =>
                                handleToggleStatus(post.id, "ARCHIVED")
                              }
                              title="Archive"
                            >
                              <Archive className="size-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            asChild
                          >
                            <NextLink href={`/admin/posts/${post.id}/edit`}>
                              <Pencil className="size-4" />
                            </NextLink>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </>
                      )}
                    </div>
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
