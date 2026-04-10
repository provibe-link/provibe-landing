"use client";

import { CaptionPlugin } from "@platejs/caption/react";
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  VideoPlugin,
} from "@platejs/media/react";
import { PlaceholderPlugin } from "@platejs/media/react";
import { KEYS } from "platejs";

import { ImageElement } from "@/components/plate-ui/media-image-node";
import { VideoElement } from "@/components/plate-ui/media-video-node";
import { AudioElement } from "@/components/plate-ui/media-audio-node";
import { FileElement } from "@/components/plate-ui/media-file-node";

export const MediaKit = [
  ImagePlugin.withComponent(ImageElement),
  VideoPlugin.withComponent(VideoElement),
  AudioPlugin.withComponent(AudioElement),
  FilePlugin.withComponent(FileElement),
  CaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img, KEYS.video, KEYS.audio, KEYS.file, KEYS.mediaEmbed],
      },
    },
  }),
  MediaEmbedPlugin,
  PlaceholderPlugin,
];
