"use client"

import { useState, useRef, useCallback, useEffect } from "react"
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
  FileText,
  FileUp,
  AlertTriangle,
  Code,
  Eye,
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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { marked } from "marked"

// Configure marked for synchronous parsing (default, but explicit)
marked.use({ async: false })
import TurndownService from "turndown"

// ── Turndown instance (HTML → Markdown) ─────────────────────────────────────

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
  strongDelimiter: "**",
  linkStyle: "inlined",
})

// ── Types ───────────────────────────────────────────────────────────────────

type EditorMode = "richtext" | "markdown" | "html"

interface TiptapEditorProps {
  content?: string
  onChange?: (html: string, json: object) => void
}

// ── Toolbar Components ──────────────────────────────────────────────────────

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

// ── Link Dialog ─────────────────────────────────────────────────────────────

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

// ── Image Dialog ────────────────────────────────────────────────────────────

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

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
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
          <DialogDescription>Upload an image or paste a URL.</DialogDescription>
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

// ── Markdown Import Dialog ──────────────────────────────────────────────────

function MarkdownImportDialog({
  open,
  onOpenChange,
  onImport,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (html: string) => void
}) {
  const [markdown, setMarkdown] = useState("")
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  function reset() {
    setMarkdown("")
    setError("")
    setImporting(false)
  }

  function handleOpenChange(value: boolean) {
    if (!value) reset()
    onOpenChange(value)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (
      !file.name.endsWith(".md") &&
      !file.name.endsWith(".mdx") &&
      !file.name.endsWith(".markdown") &&
      file.type !== "text/markdown" &&
      file.type !== "text/plain"
    ) {
      setError("Please select a Markdown file (.md, .mdx, or .markdown)")
      return
    }

    setError("")
    try {
      const text = await file.text()
      setMarkdown(text)
    } catch {
      setError("Failed to read file. Please try again.")
    }

    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleImport() {
    if (!markdown.trim()) return

    setImporting(true)
    setError("")

    try {
      const html = await marked.parse(markdown.trim())
      onImport(html)
      handleOpenChange(false)
    } catch {
      setError(
        "Failed to parse Markdown. Please check the content and try again."
      )
    } finally {
      setImporting(false)
    }
  }

  const lineCount = markdown.split("\n").length
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Markdown</DialogTitle>
          <DialogDescription>
            Paste Markdown content or upload a .md file. The content will
            replace the current editor content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div
            className="flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/20 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-muted/30"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="size-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Upload Markdown file
              </p>
              <p className="text-xs text-muted-foreground">
                .md, .mdx, or .markdown files
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.mdx,.markdown,text/markdown,text/plain"
            className="hidden"
            onChange={handleFileUpload}
          />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              or paste below
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Textarea
            value={markdown}
            onChange={(e) => {
              setMarkdown(e.target.value)
              setError("")
            }}
            placeholder={
              "# Your Markdown Title\n\nPaste your markdown content here...\n\n## Section\n\nContent with **bold**, *italic*, and [links](https://example.com)."
            }
            rows={12}
            className="font-mono text-sm"
          />

          {markdown.trim() && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{lineCount} lines</span>
              <span>&middot;</span>
              <span>{wordCount} words</span>
            </div>
          )}

          {markdown.trim() && (
            <div className="flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2.5 text-sm text-yellow-600 dark:text-yellow-400">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>Importing will replace all current editor content.</span>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleImport}
            disabled={!markdown.trim() || importing}
          >
            {importing ? (
              <Loader2 className="mr-1.5 size-3.5 animate-spin" />
            ) : (
              <FileText className="mr-1.5 size-3.5" />
            )}
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Main Editor ─────────────────────────────────────────────────────────────

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [markdownDialogOpen, setMarkdownDialogOpen] = useState(false)
  const [mode, setMode] = useState<EditorMode>("richtext")
  const [rawContent, setRawContent] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  // Ref to access editor inside handlePaste (which runs before editor is returned)
  const editorRef = useRef<ReturnType<typeof useEditor>>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: {
          HTMLAttributes: {
            class: "rounded-lg bg-muted/50 p-4 font-mono text-sm",
          },
        },
      }),
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
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.getHTML(), ed.getJSON())
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-[300px]",
      },
      // Handle pasting markdown content - convert to HTML for TipTap
      handlePaste: (_view, event) => {
        // Only intercept plain text pastes (not HTML from other rich editors)
        const pastedHtml = event.clipboardData?.getData("text/html")
        if (pastedHtml) return false // Let TipTap handle rich pastes natively

        const text = event.clipboardData?.getData("text/plain") || ""
        if (!looksLikeMarkdown(text)) return false

        const currentEditor = editorRef.current
        if (!currentEditor) return false

        event.preventDefault()
        const parsed = marked.parse(text) as string
        currentEditor.commands.insertContent(parsed, {
          parseOptions: { preserveWhitespace: false },
        })
        return true
      },
    },
  })

  // Keep ref in sync
  editorRef.current = editor

  // ── Mode switching logic ──
  function switchToMode(newMode: EditorMode) {
    if (!editor || newMode === mode) return

    if (mode === "richtext" && newMode === "markdown") {
      // Rich text → Markdown: convert HTML to markdown
      const html = editor.getHTML()
      const md = turndown.turndown(html)
      setRawContent(md)
    } else if (mode === "richtext" && newMode === "html") {
      // Rich text → HTML: get raw HTML
      setRawContent(editor.getHTML())
    } else if (mode === "markdown" && newMode === "richtext") {
      // Markdown → Rich text: convert markdown to HTML and set editor
      const html = marked.parse(rawContent) as string
      editor.commands.setContent(html)
      onChange?.(editor.getHTML(), editor.getJSON())
    } else if (mode === "markdown" && newMode === "html") {
      // Markdown → HTML: convert markdown to HTML for raw editing
      const html = marked.parse(rawContent) as string
      setRawContent(html)
    } else if (mode === "html" && newMode === "richtext") {
      // HTML → Rich text: set HTML directly
      editor.commands.setContent(rawContent)
      onChange?.(editor.getHTML(), editor.getJSON())
    } else if (mode === "html" && newMode === "markdown") {
      // HTML → Markdown: convert HTML to markdown
      const md = turndown.turndown(rawContent)
      setRawContent(md)
    }

    setMode(newMode)
  }

  // When raw content changes in markdown/html mode, propagate to parent
  function handleRawContentChange(value: string) {
    setRawContent(value)
  }

  // Sync raw changes back when switching to richtext (handled in switchToMode)
  // Also sync on blur from raw editor
  function handleRawBlur() {
    if (!editor) return
    if (mode === "markdown") {
      const html = marked.parse(rawContent) as string
      editor.commands.setContent(html)
      onChange?.(editor.getHTML(), editor.getJSON())
    } else if (mode === "html") {
      editor.commands.setContent(rawContent)
      onChange?.(editor.getHTML(), editor.getJSON())
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current && mode !== "richtext") {
      const el = textareaRef.current
      el.style.height = "auto"
      el.style.height = Math.max(300, el.scrollHeight) + "px"
    }
  }, [rawContent, mode])

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

  const handleMarkdownImport = useCallback(
    (html: string) => {
      if (!editor) return
      editor.commands.setContent(html)
      onChange?.(editor.getHTML(), editor.getJSON())
    },
    [editor, onChange]
  )

  if (!editor) return null

  const currentLinkUrl = editor.getAttributes("link").href || ""

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 p-1.5">
          <div className="flex flex-wrap gap-0.5">
            {mode === "richtext" && (
              <>
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
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  active={editor.isActive("bulletList")}
                  title="Bullet List"
                >
                  <List className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  active={editor.isActive("orderedList")}
                  title="Ordered List"
                >
                  <ListOrdered className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  active={editor.isActive("blockquote")}
                  title="Blockquote"
                >
                  <Quote className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                  }
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
                  onClick={() => setMarkdownDialogOpen(true)}
                  title="Import Markdown"
                >
                  <FileText className="size-4" />
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
              </>
            )}

            {mode !== "richtext" && (
              <span className="flex items-center px-2 text-xs text-muted-foreground">
                {mode === "markdown" ? "Editing Markdown" : "Editing HTML"} —
                switch back to Rich Text to use the visual toolbar
              </span>
            )}
          </div>

          {/* Mode switcher */}
          <div className="flex items-center gap-0.5 rounded-md border border-border bg-background p-0.5">
            <button
              type="button"
              onClick={() => switchToMode("richtext")}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                mode === "richtext"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Rich Text Editor"
            >
              <Eye className="mr-1 inline-block size-3" />
              Rich Text
            </button>
            <button
              type="button"
              onClick={() => switchToMode("markdown")}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                mode === "markdown"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Markdown Editor"
            >
              <FileText className="mr-1 inline-block size-3" />
              Markdown
            </button>
            <button
              type="button"
              onClick={() => switchToMode("html")}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                mode === "html"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="HTML Source Editor"
            >
              <Code className="mr-1 inline-block size-3" />
              HTML
            </button>
          </div>
        </div>

        {/* Editor content area */}
        {mode === "richtext" ? (
          <EditorContent
            editor={editor}
            className="prose prose-sm dark:prose-invert max-w-none px-4 py-3 [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]"
          />
        ) : (
          <div className="px-4 py-3">
            <textarea
              ref={textareaRef}
              value={rawContent}
              onChange={(e) => handleRawContentChange(e.target.value)}
              onBlur={handleRawBlur}
              className="min-h-[300px] w-full resize-none bg-transparent font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
              placeholder={
                mode === "markdown"
                  ? "# Write your markdown here...\n\nUse **bold**, *italic*, [links](url), and more."
                  : "<h1>Write HTML here...</h1>\n<p>Your content</p>"
              }
              spellCheck={mode === "markdown"}
            />
          </div>
        )}
      </div>

      {/* Dialogs */}
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

      <MarkdownImportDialog
        open={markdownDialogOpen}
        onOpenChange={setMarkdownDialogOpen}
        onImport={handleMarkdownImport}
      />
    </>
  )
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Heuristic to detect if pasted text looks like markdown rather than plain text.
 * Checks for common markdown patterns.
 */
function looksLikeMarkdown(text: string): boolean {
  if (!text || text.length < 3) return false

  const lines = text.split("\n")
  let mdSignals = 0

  for (const line of lines) {
    const trimmed = line.trim()
    // Headings: # Title
    if (/^#{1,6}\s+\S/.test(trimmed)) mdSignals += 2
    // Bullet lists: - item, * item, + item
    else if (/^[-*+]\s+\S/.test(trimmed)) mdSignals++
    // Ordered lists: 1. item
    else if (/^\d+\.\s+\S/.test(trimmed)) mdSignals++
    // Links: [text](url)
    else if (/\[.+?\]\(.+?\)/.test(trimmed)) mdSignals += 2
    // Images: ![alt](url)
    else if (/!\[.*?\]\(.+?\)/.test(trimmed)) mdSignals += 2
    // Bold/italic: **text**, *text*, __text__, _text_
    else if (/(\*{1,2}|_{1,2}).+?\1/.test(trimmed)) mdSignals++
    // Code blocks: ```
    else if (/^```/.test(trimmed)) mdSignals += 2
    // Blockquotes: > text
    else if (/^>\s+/.test(trimmed)) mdSignals++
    // Horizontal rules: --- or ***
    else if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) mdSignals++
  }

  // Need at least 2 signals to consider it markdown
  return mdSignals >= 2
}
