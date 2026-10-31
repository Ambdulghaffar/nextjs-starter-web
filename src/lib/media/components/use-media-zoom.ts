"use client";

import { useState, useCallback } from "react";
import type { MediaType } from "../api/types";
import { imageZoomUrl, optimizedVideoUrl } from "../utils";

export type ZoomMedia = { src: string; alt: string; type: MediaType };

export function useMediaZoom() {
  const [previewImage, setPreviewImage] = useState<ZoomMedia | null>(null);

  const openZoom = useCallback(
    (src: string, alt: string, type: MediaType = "IMAGE") => {
      setPreviewImage({
        src: type === "VIDEO" ? optimizedVideoUrl(src) : imageZoomUrl(src),
        alt,
        type,
      });
    },
    [],
  );

  const closeZoom = useCallback(() => setPreviewImage(null), []);

  return { previewImage, openZoom, closeZoom };
}
