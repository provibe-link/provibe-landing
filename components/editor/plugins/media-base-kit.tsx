import { BaseCaptionPlugin } from "@platejs/caption";
import {
  BaseAudioPlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMediaEmbedPlugin,
  BaseVideoPlugin,
} from "@platejs/media";
import { PlaceholderPlugin } from "@platejs/media/react";
import { KEYS } from "platejs";

import { AudioElementStatic } from "@/components/plate-ui/media-audio-node-static";
import { FileElementStatic } from "@/components/plate-ui/media-file-node-static";
import { ImageElementStatic } from "@/components/plate-ui/media-image-node-static";
import { VideoElementStatic } from "@/components/plate-ui/media-video-node-static";

export const BaseMediaKit = [
  BaseImagePlugin.withComponent(ImageElementStatic),
  BaseVideoPlugin.withComponent(VideoElementStatic),
  BaseAudioPlugin.withComponent(AudioElementStatic),
  BaseFilePlugin.withComponent(FileElementStatic),
  BaseCaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.video, KEYS.audio, KEYS.file, KEYS.mediaEmbed],
      },
    },
  }),
  BaseMediaEmbedPlugin,
  PlaceholderPlugin,
];
