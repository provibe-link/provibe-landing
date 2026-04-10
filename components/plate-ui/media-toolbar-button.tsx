"use client";

import * as React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import {
  CheckCircle2Icon,
  FilmIcon,
  ImageIcon,
  LinkIcon,
  Loader2Icon,
  XCircleIcon,
} from "lucide-react";
import { isUrl, KEYS } from "platejs";
import { useEditorRef } from "platejs/react";
import { toast } from "sonner";
import { useFilePicker } from "use-file-picker";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/plate-ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/plate-ui/dropdown-menu";
import { Input } from "@/components/plate-ui/input";
import { cn } from "@/lib/utils";

import {
  ToolbarSplitButton,
  ToolbarSplitButtonPrimary,
  ToolbarSplitButtonSecondary,
} from "./toolbar";

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[];
    icon: React.ReactNode;
    title: string;
    tooltip: string;
  }
> = {
  [KEYS.img]: {
    accept: ["image/*"],
    icon: <ImageIcon className="size-4" />,
    title: "Insert Image",
    tooltip: "Image",
  },
  [KEYS.video]: {
    accept: ["video/*"],
    icon: <FilmIcon className="size-4" />,
    title: "Insert Video",
    tooltip: "Video",
  },
};

type UploadItem = {
  name: string;
  status: "uploading" | "done" | "error";
  url?: string;
  error?: string;
};

export function MediaToolbarButton({
  nodeType,
  ...props
}: DropdownMenuProps & { nodeType: string }) {
  const currentConfig = MEDIA_CONFIG[nodeType];

  const editor = useEditorRef();
  const [open, setOpen] = React.useState(false);
  const [urlDialogOpen, setUrlDialogOpen] = React.useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
  const [uploads, setUploads] = React.useState<UploadItem[]>([]);

  const uploadFiles = React.useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      const items: UploadItem[] = files.map((f) => ({
        name: f.name,
        status: "uploading" as const,
      }));

      setUploads(items);
      setUploadDialogOpen(true);

      const results = await Promise.allSettled(
        files.map(async (file, index) => {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          if (!res.ok) {
            setUploads((prev) =>
              prev.map((item, i) =>
                i === index
                  ? { ...item, status: "error" as const, error: data.error }
                  : item
              )
            );
            throw new Error(data.error);
          }

          setUploads((prev) =>
            prev.map((item, i) =>
              i === index
                ? { ...item, status: "done" as const, url: data.url }
                : item
            )
          );

          return data.url as string;
        })
      );

      // Insert successful uploads into editor
      for (const result of results) {
        if (result.status === "fulfilled") {
          editor.tf.insertNodes({
            children: [{ text: "" }],
            type: nodeType,
            url: result.value,
          });
        }
      }
    },
    [editor, nodeType]
  );

  const { openFilePicker } = useFilePicker({
    accept: currentConfig.accept,
    multiple: true,
    onFilesSuccessfullySelected: ({
      plainFiles,
    }: {
      plainFiles: File[];
    }) => {
      uploadFiles(plainFiles);
    },
  });

  const allDone = uploads.length > 0 && uploads.every((u) => u.status !== "uploading");

  return (
    <>
      <ToolbarSplitButton
        onClick={() => {
          openFilePicker();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        pressed={open}
      >
        <ToolbarSplitButtonPrimary>
          {currentConfig.icon}
        </ToolbarSplitButtonPrimary>

        <DropdownMenu
          open={open}
          onOpenChange={setOpen}
          modal={false}
          {...props}
        >
          <DropdownMenuTrigger asChild>
            <ToolbarSplitButtonSecondary />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            align="start"
            alignOffset={-32}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => openFilePicker()}>
                {currentConfig.icon}
                Upload from computer
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setUrlDialogOpen(true)}>
                <LinkIcon />
                Insert via URL
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarSplitButton>

      {/* URL Dialog */}
      <AlertDialog open={urlDialogOpen} onOpenChange={setUrlDialogOpen}>
        <AlertDialogContent className="gap-6">
          <MediaUrlDialogContent
            currentConfig={currentConfig}
            nodeType={nodeType}
            setOpen={setUrlDialogOpen}
          />
        </AlertDialogContent>
      </AlertDialog>

      {/* Upload Progress Dialog */}
      <AlertDialog
        open={uploadDialogOpen}
        onOpenChange={(v) => {
          if (allDone) setUploadDialogOpen(v);
        }}
      >
        <AlertDialogContent className="gap-4 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {allDone ? "Upload Complete" : "Uploading..."}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-2">
            {uploads.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5"
              >
                {item.status === "uploading" && (
                  <Loader2Icon className="size-4 shrink-0 animate-spin text-muted-foreground" />
                )}
                {item.status === "done" && (
                  <CheckCircle2Icon className="size-4 shrink-0 text-emerald-500" />
                )}
                {item.status === "error" && (
                  <XCircleIcon className="size-4 shrink-0 text-destructive" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  {item.status === "error" && (
                    <p className="truncate text-xs text-destructive">
                      {item.error}
                    </p>
                  )}
                </div>

                <span
                  className={cn(
                    "shrink-0 text-xs",
                    item.status === "uploading" && "text-muted-foreground",
                    item.status === "done" && "text-emerald-500",
                    item.status === "error" && "text-destructive"
                  )}
                >
                  {item.status === "uploading" && "Uploading"}
                  {item.status === "done" && "Done"}
                  {item.status === "error" && "Failed"}
                </span>
              </div>
            ))}
          </div>

          {allDone && (
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setUploadDialogOpen(false);
                  setUploads([]);
                }}
              >
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  currentConfig: (typeof MEDIA_CONFIG)[string];
  nodeType: string;
  setOpen: (value: boolean) => void;
}) {
  const editor = useEditorRef();
  const [url, setUrl] = React.useState("");

  const embedMedia = React.useCallback(() => {
    if (!isUrl(url)) return toast.error("Invalid URL");

    setOpen(false);
    editor.tf.insertNodes({
      children: [{ text: "" }],
      name: nodeType === KEYS.file ? url.split("/").pop() : undefined,
      type: nodeType,
      url,
    });
  }, [url, editor, nodeType, setOpen]);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{currentConfig.title}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription className="group relative w-full">
        <label
          className="-translate-y-1/2 absolute top-1/2 block cursor-text px-1 text-muted-foreground/70 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-medium group-focus-within:text-foreground group-focus-within:text-xs has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground has-[+input:not(:placeholder-shown)]:text-xs"
          htmlFor="url"
        >
          <span className="inline-flex bg-background px-2">URL</span>
        </label>
        <Input
          id="url"
          className="w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") embedMedia();
          }}
          placeholder=""
          type="url"
          autoFocus
        />
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            embedMedia();
          }}
        >
          Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
