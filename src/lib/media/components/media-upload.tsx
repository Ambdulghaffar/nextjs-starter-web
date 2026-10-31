"use client";

import { useRef } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash2Icon, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Media, MediaContext, MediaType } from "../api/types";
import { uploadMediaMutation } from "../api/mutations";

export type MediaPreview = { type: MediaType; url: string; id?: number };

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

type Props = {
  value: MediaPreview | null;
  onUploaded: (media: Media) => void;
  onRemove: () => void;
  context?: MediaContext;
  allowVideo?: boolean;
  className?: string;
};

export function MediaUpload({
  value,
  onUploaded,
  onRemove,
  context = "PRIVATE",
  allowVideo = true,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useMutation(uploadMediaMutation);

  const accepted = allowVideo ? [...IMAGE_TYPES, ...VIDEO_TYPES] : IMAGE_TYPES;

  const handleFile = (file?: File) => {
    if (inputRef.current) inputRef.current.value = "";
    if (!file) return;

    if (!accepted.includes(file.type)) {
      toast.error("Format non supporté");
      return;
    }
    const isVideo = file.type.startsWith("video/");
    if (file.size > (isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES)) {
      toast.error(
        isVideo
          ? "Vidéo trop lourde (100 Mo max)"
          : "Image trop lourde (10 Mo max)",
      );
      return;
    }

    upload.mutate(
      { file, context },
      {
        onSuccess: onUploaded,
        onError: (e) => toast.error(e.message),
      },
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accepted.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value && (
        <div className="relative">
          <div
            className="relative h-48 w-full overflow-hidden rounded-xl border
              border-gray-200 bg-black/5 dark:border-gray-800"
          >
            {value.type === "VIDEO" ? (
              <video
                src={value.url}
                controls
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={value.url}
                alt="Aperçu"
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Retirer le média"
            className="absolute -top-2 -left-2 flex h-6 w-6 items-center
              justify-center rounded-full bg-red-500 text-white shadow
              hover:bg-red-600"
          >
            <Trash2Icon size={16} />
          </button>
        </div>
      )}

      <button
        type="button"
        disabled={upload.isPending}
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center rounded-xl
          border-2 border-dashed border-gray-300 bg-gray-50 py-6 text-gray-500
          transition hover:border-gray-400 disabled:opacity-50
          dark:border-gray-700 dark:bg-white/5"
      >
        {upload.isPending ? (
          <Loader2 className="animate-spin" size={24} />
        ) : (
          <Upload size={24} />
        )}
        <span className="mt-2 text-sm">
          {value
            ? "Remplacer le média"
            : allowVideo
              ? "Choisir une image ou une vidéo"
              : "Choisir une image"}
        </span>
        <span className="text-xs text-gray-400">
          {allowVideo ? "JPG, PNG, WebP · MP4, WebM, MOV" : "JPG, PNG, WebP"}
        </span>
      </button>
    </div>
  );
}
