"use client";

import { BaseAlignKit } from "./plugins/align-base-kit";
import { BasicBlocksKit } from "./plugins/basic-blocks-kit";
import { BasicMarksKit } from "./plugins/basic-marks-kit";
import { BaseCalloutKit } from "./plugins/callout-base-kit";
import { BaseCodeBlockKit } from "./plugins/code-block-base-kit";
import { BaseColumnKit } from "./plugins/column-base-kit";
import { BaseDateKit } from "./plugins/date-base-kit";
import { BaseFontKit } from "./plugins/font-base-kit";
import { BaseLineHeightKit } from "./plugins/line-height-base-kit";
import { DndKit } from "./plugins/dnd-kit";
import { LinkKit } from "./plugins/link-kit";
import { ListKit } from "./plugins/list-kit";
import { MarkdownKit } from "./plugins/markdown-kit";
import { MathKit } from "./plugins/math-kit";
import { MediaKit } from "./plugins/media-kit";
import { TableKit } from "./plugins/table-kit";
import { TocKit } from "./plugins/toc-kit";
import { ToggleKit } from "./plugins/toggle-kit";

export const EditorKit = [
  ...BasicBlocksKit,
  ...BasicMarksKit,
  ...BaseCodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
  ...BaseCalloutKit,
  ...BaseColumnKit,
  ...MathKit,
  ...BaseDateKit,
  ...LinkKit,
  ...BaseFontKit,
  ...ListKit,
  ...BaseAlignKit,
  ...BaseLineHeightKit,
  ...MarkdownKit,
  ...DndKit,
];
