# Post Editor Redesign — Design Spec

## Overview

Redesign the admin post create/edit page from a stacked form layout to a **Medium/Ghost-style distraction-free editor** with a centered writing experience, sticky minimal top bar, and slide-out settings drawer.

## Design Decisions

| Decision | Choice |
|----------|--------|
| Editor style | Medium/Ghost — distraction-free, full-width writing |
| Settings access | Slide-out drawer from the right |
| Title area | Subtle card container (faint border/background) |
| Top action bar | Sticky minimal bar (full-width, border-bottom) |

## Architecture

### Page Structure

The page is a full-height flex column with three zones:

1. **Sticky Top Bar** — fixed at top, never scrolls
2. **Scrollable Content Area** — centered column (max-width 720px)
3. **Settings Drawer** — overlay panel from the right (Sheet component)

### Component Breakdown

#### 1. Post Editor Page (`app/admin/posts/new/page.tsx` + `app/admin/posts/[id]/edit/page.tsx`)

Thin wrapper that renders `<PostEditor />` with optional `initialData` prop. The page itself is full-height and removes the default admin layout padding to allow the editor to own its own spacing.

#### 2. PostEditor Component (`components/admin/post-editor.tsx`)

The main orchestrator. Replaces the current `PostForm`. Manages all state and renders:

- `<TopBar />` — sticky bar with back link, save status, settings button, save/publish actions
- `<TitleCard />` — cover image upload + title input + excerpt
- `<TiptapEditor />` — the existing rich text editor (already built)
- Settings drawer via shadcn `Sheet` component (slides from right)

**State management**: Same `useState` approach as current `PostForm` — no need for a form library. All field state lives in `PostEditor`.

#### 3. TopBar (inline within PostEditor or extracted)

```
[ ← Back to posts ]                    [ ● Saved ] [ ⚙ Settings ] [ Save Draft ] [ Publish ]
```

- **Back link**: navigates to `/admin/posts`
- **Save indicator**: shows "Saved", "Saving...", or "Unsaved changes" with a colored dot (green/yellow/gray)
- **Settings button**: toggles the Sheet open
- **Save Draft**: saves with `status: "DRAFT"`
- **Publish button**: saves with `status: "PUBLISHED"` (primary color `#fa6f62`)

#### 4. Title Card

A subtle container (`bg-card/50` or `bg-muted/20` with `border-border`) wrapping:

- **Cover image zone**: the existing upload component (click-to-upload with preview, hover overlay for replace/remove). When no image, shows a dashed border placeholder with "Add cover image" text.
- **Title input**: borderless, transparent background, `font-display` (Space Grotesk), ~32px font size, bold. Placeholder: "Post title..."
- **Excerpt input**: borderless textarea below title, smaller font (~15px), muted placeholder color. Placeholder: "Write a brief excerpt..."

No labels — the inputs are self-describing via placeholder text and visual hierarchy.

#### 5. Settings Drawer

Uses shadcn `Sheet` component (side="right"). Contains all metadata fields in sections:

**Status** — three toggle buttons in a row (Draft / Published / Archived). Active state uses primary color background. Not a dropdown — direct visual selection.

**Slug** — text input, auto-generated from title (same logic as current). Editable.

**Category** — Select dropdown (existing shadcn Select component).

**Tags** — displayed as pill/badge toggles. Each tag is a rounded pill; clicking toggles selection. Selected tags get primary color treatment. Unselected get subtle border.

**Read Time** — text input, small.

**Featured** — toggle switch (shadcn Switch component) with label.

### Data Flow

No changes to the data model or API. The component calls the same `createPost` / `updatePost` server actions. The form data shape is identical — only the UI presentation changes.

### Files to Create/Modify

| File | Action |
|------|--------|
| `components/admin/post-editor.tsx` | **Create** — new main editor component |
| `app/admin/posts/new/page.tsx` | **Modify** — use PostEditor instead of PostForm |
| `app/admin/posts/[id]/edit/page.tsx` | **Modify** — use PostEditor with initialData |
| `components/admin/post-form.tsx` | **Delete** after migration (or keep if used elsewhere) |
| `components/admin/tiptap-editor.tsx` | **Keep as-is** — already built with dialogs |

### Styling Approach

- All styling via Tailwind classes, using existing CSS variables (`bg-background`, `border-border`, `text-muted-foreground`, etc.)
- Font hierarchy: `font-display` (Space Grotesk) for title, default `font-body` (DM Sans) for everything else
- The editor page overrides the admin layout's default `p-8` padding — it needs full-height control
- Dark mode is the default and primary design target (matches existing admin)

### Animations

- Settings drawer: shadcn Sheet handles slide-in/out animation
- Save status indicator: subtle fade transition between states
- Cover image hover overlay: opacity transition (already implemented)

## Edge Cases

- **Empty state**: New post starts with all fields empty, status defaults to DRAFT
- **Long titles**: Title input should wrap naturally (no fixed height)
- **No categories/tags**: If none exist, those sections in the drawer still show but with "No categories" / "No tags" empty state
- **Unsaved changes**: The save indicator reflects dirty state, but no browser beforeunload warning (keep it simple for now)

## Out of Scope

- Auto-save functionality (future enhancement)
- Keyboard shortcuts for publish/save
- Preview mode
- SEO fields beyond what exists
- Drag-and-drop image reordering
