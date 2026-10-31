"use client";

import { MediaContext } from "@/lib/media/api/types";
import { createContext, useContext } from "react";

const MediaUploadContext = createContext<MediaContext>("PRIVATE");

export function MediaUploadProvider({
  context,
  children,
}: {
  context: MediaContext;
  children: React.ReactNode;
}) {
  return (
    <MediaUploadContext.Provider value={context}>
      {children}
    </MediaUploadContext.Provider>
  );
}

export function useMediaUploadContext() {
  return useContext(MediaUploadContext);
}
