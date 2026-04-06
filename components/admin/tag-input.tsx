"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tag {
  id: number
  name: string
}

interface TagInputProps {
  allTags: Tag[]
  selectedTags: Tag[]
  onChange: (tags: Tag[]) => void
  onCreateTag?: (name: string) => Promise<Tag | null>
  placeholder?: string
}

export function TagInput({
  allTags,
  selectedTags,
  onChange,
  onCreateTag,
  placeholder = "New tag...",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [creating, setCreating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedIds = new Set(selectedTags.map((t) => t.id))

  const suggestions = inputValue.trim()
    ? allTags.filter(
        (t) =>
          !selectedIds.has(t.id) &&
          t.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : []

  const exactMatch = allTags.find(
    (t) => t.name.toLowerCase() === inputValue.trim().toLowerCase()
  )
  const canCreate =
    inputValue.trim().length > 0 &&
    !exactMatch &&
    onCreateTag

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [inputValue])

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setShowSuggestions(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  function addTag(tag: Tag) {
    if (!selectedIds.has(tag.id)) {
      onChange([...selectedTags, tag])
    }
    setInputValue("")
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  function removeTag(tagId: number) {
    onChange(selectedTags.filter((t) => t.id !== tagId))
    inputRef.current?.focus()
  }

  async function handleCreateTag() {
    if (!onCreateTag || !inputValue.trim() || creating) return
    setCreating(true)
    const newTag = await onCreateTag(inputValue.trim())
    if (newTag) {
      addTag(newTag)
    }
    setCreating(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const totalItems = suggestions.length + (canCreate ? 1 : 0)

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setShowSuggestions(true)
      setHighlightedIndex((prev) =>
        prev < totalItems - 1 ? prev + 1 : 0
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : totalItems - 1
      )
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        addTag(suggestions[highlightedIndex])
      } else if (
        highlightedIndex === suggestions.length &&
        canCreate
      ) {
        handleCreateTag()
      } else if (exactMatch && !selectedIds.has(exactMatch.id)) {
        addTag(exactMatch)
      } else if (canCreate) {
        handleCreateTag()
      }
    } else if (
      e.key === "Backspace" &&
      !inputValue &&
      selectedTags.length > 0
    ) {
      removeTag(selectedTags[selectedTags.length - 1].id)
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Chips + Input area */}
      <div
        className={cn(
          "flex min-h-[2.5rem] flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm transition-colors",
          "focus-within:ring-1 focus-within:ring-ring"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/30 transition-colors hover:bg-primary/25"
          >
            {tag.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(tag.id)
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
          onChange={(e) => {
            setInputValue(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => {
            if (inputValue.trim()) setShowSuggestions(true)
          }}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length === 0 ? placeholder : ""}
          className="min-w-[80px] flex-1 bg-transparent text-sm placeholder:text-muted-foreground/50 focus:outline-none"
          disabled={creating}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || canCreate) && (
        <div className="absolute left-0 z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
          <div className="max-h-[200px] overflow-y-auto p-1">
            {suggestions.map((tag, index) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => addTag(tag)}
                className={cn(
                  "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors",
                  highlightedIndex === index
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-accent/50"
                )}
              >
                {tag.name}
              </button>
            ))}
            {canCreate && (
              <button
                type="button"
                onClick={handleCreateTag}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                  highlightedIndex === suggestions.length
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <span className="rounded bg-primary/15 px-1.5 py-0.5 text-xs font-medium text-primary">
                  Create
                </span>
                <span>&quot;{inputValue.trim()}&quot;</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* No tags helper text */}
      {selectedTags.length === 0 && !showSuggestions && (
        <p className="mt-1.5 text-xs text-muted-foreground/60">
          No tags added.
        </p>
      )}
    </div>
  )
}
