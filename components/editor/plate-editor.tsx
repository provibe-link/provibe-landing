"use client"

import type { Value } from "platejs"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Plate, usePlateEditor } from "platejs/react"
import { serializeHtml } from "platejs/static"
import { EditorKit } from "./editor-kit"
import { FixedToolbar } from "../plate-ui/fixed-toolbar"
import { FixedToolbarButtons } from "../plate-ui/fixed-toolbar-buttons"
import { EditorContainer } from "../plate-ui/editor"
import { Editor } from "../plate-ui/editor"

export interface EditorFieldProps {
  value?: Value
  onChange?: (value: Value, html: string) => Promise<void>
  placeholder?: string
  className?: string
}

export function EditorField({
  value,
  onChange,
  placeholder = "Type here...",
  className,
  ...props
}: EditorFieldProps) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: value || [{ type: "p", children: [{ text: "" }] }],
  })

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={async ({ value: nextValue }) => {
          let html = ""
          try {
            html = await serializeHtml(editor)
          } catch (e) {
            console.error("serializeHtml failed:", e)
          }
          onChange?.(nextValue, html)
        }}
        {...props}
      >
        <div className="flex h-full flex-col rounded-lg border border-border">
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>
          <EditorContainer className={className}>
            <Editor
              variant="fullWidth"
              placeholder={placeholder}
              className="px-4 py-4 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            />
          </EditorContainer>
        </div>
      </Plate>
    </DndProvider>
  )
}
