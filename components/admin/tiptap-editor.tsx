"use client"

import { useState, useRef, useCallback } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Link as LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Upload,
  Loader2,
  Unlink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface TiptapEditorProps {
  content?: string
  onChange?: (html: string, json: object) => void
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  title: string
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", active && "bg-muted text-foreground")}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </Button>
  )
}

function ToolbarSeparator() {
  return <div className="mx-1 h-5 w-px bg-border" />
}

// ── Link Dialog ──────────────────────────────────────────────────────────────

function LinkDialog({
  open,
  onOpenChange,
  initialUrl,
  onSubmit,
  onRemove,
  hasLink,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialUrl: string
  onSubmit: (url: string) => void
  onRemove: () => void
  hasLink: boolean
}) {
  const [url, setUrl] = useState(initialUrl)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
          <DialogDescription>
            Enter the URL you want to link to.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            {hasLink && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  onRemove()
                  onOpenChange(false)
                }}
              >
                <Unlink className="mr-1.5 size-3.5" />
                Remove Link
              </Button>
            )}
            <Button type="submit" size="sm" disabled={!url.trim()}>
              {hasLink ? "Update Link" : "Insert Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ── Image Dialog ─────────────────────────────────────────────────────────────

function ImageDialog({
  open,
  onOpenChange,
  onInsert,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInsert: (url: string, alt: string) => void
}) {
  const [tab, setTab] = useState<string>("upload")
  const [url, setUrl] = useState("")
  const [alt, setAlt] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [preview, setPreview] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  function reset() {
    setUrl("")
    setAlt("")
    setUploading(false)
    setUploadError("")
    setPreview("")
    setTab("upload")
  }

  function handleOpenChange(value: boolean) {
    if (!value) reset()
    onOpenChange(value)
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError("")

    // Preview
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) {
        setUploadError(data.error || "Upload failed")
        setPreview("")
      } else {
        setUrl(data.url)
      }
    } catch {
      setUploadError("Upload failed. Please try again.")
      setPreview("")
    } finally {
      setUploading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (url.trim()) {
      onInsert(url.trim(), alt.trim())
      handleOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
          <DialogDescription>
            Upload an image or paste a URL.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full">
              <TabsTrigger value="upload" className="flex-1">
                <Upload className="mr-1.5 size-3.5" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="url" className="flex-1">
                <LinkIcon className="mr-1.5 size-3.5" />
                URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-3 pt-3">
              <div
                className={cn(
                  "relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50",
                  uploading && "pointer-events-none opacity-60"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-[200px] rounded-md object-contain"
                  />
                ) : (
                  <>
                    {uploading ? (
                      <Loader2 className="mb-2 size-8 animate-spin text-muted-foreground" />
                    ) : (
                      <Upload className="mb-2 size-8 text-muted-foreground" />
                    )}
                    <p className="text-sm text-muted-foreground">
                      {uploading ? "Uploading..." : "Click to select an image"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      JPEG, PNG, GIF, WebP, SVG up to 5MB
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              {uploadError && (
                <p className="text-sm text-destructive">{uploadError}</p>
              )}
            </TabsContent>

            <TabsContent value="url" className="space-y-3 pt-3">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                    setPreview(e.target.value)
                  }}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {url && tab === "url" && (
                <div className="flex justify-center rounded-lg border border-border bg-muted/30 p-3">
                  <img
                    src={url}
                    alt="Preview"
                    className="max-h-[160px] rounded-md object-contain"
                    onError={() => setPreview("")}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-3 space-y-2">
            <Label htmlFor="image-alt">Alt Text</Label>
            <Input
              id="image-alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe the image..."
            />
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!url.trim() || uploading}
            >
              Insert Image
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ── Main Editor ──────────────────────────────────────────────────────────────

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2 cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full mx-auto",
        },
      }),
      Placeholder.configure({ placeholder: "Start writing..." }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML(), editor.getJSON())
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-[300px]",
      },
    },
  })

  const handleLinkOpen = useCallback(() => {
    setLinkDialogOpen(true)
  }, [])

  const handleLinkSubmit = useCallback(
    (url: string) => {
      if (!editor) return
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run()
    },
    [editor]
  )

  const handleLinkRemove = useCallback(() => {
    if (!editor) return
    editor.chain().focus().unsetLink().run()
  }, [editor])

  const handleImageInsert = useCallback(
    (url: string, alt: string) => {
      if (!editor) return
      editor.chain().focus().setImage({ src: url, alt }).run()
    },
    [editor]
  )

  if (!editor) return null

  const currentLinkUrl = editor.getAttributes("link").href || ""

  return (
    <>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Toolbar — not editable */}
        <div className="flex flex-wrap gap-0.5 border-b border-border bg-muted/30 p-1.5">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <Bold className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <Italic className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough className="size-4" />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="size-4" />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <ListOrdered className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <Code2 className="size-4" />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            onClick={handleLinkOpen}
            active={editor.isActive("link")}
            title="Link"
          >
            <LinkIcon className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setImageDialogOpen(true)}
            title="Image"
          >
            <ImageIcon className="size-4" />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="size-4" />
          </ToolbarButton>
        </div>

        {/* Editor content area — only this is editable */}
        <EditorContent
          editor={editor}
          className="prose prose-sm dark:prose-invert max-w-none px-4 py-3 [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
        />
      </div>

      {/* Dialogs rendered outside the editor container */}
      <LinkDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        initialUrl={currentLinkUrl}
        onSubmit={handleLinkSubmit}
        onRemove={handleLinkRemove}
        hasLink={editor.isActive("link")}
      />

      <ImageDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        onInsert={handleImageInsert}
      />
    </>
  )
}
