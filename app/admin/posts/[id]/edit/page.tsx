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
