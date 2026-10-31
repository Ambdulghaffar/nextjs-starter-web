"use client";

import { mutationOptions } from "@tanstack/react-query";

import { uploadMedia } from "./services/media.client";

import type { Media, MediaContext } from "./types";

export const uploadMediaMutation = mutationOptions<
  Media,
  Error,
  { file: File; context?: MediaContext },
  unknown
>({
  mutationFn: ({ file, context }) => uploadMedia(file, context),
});
