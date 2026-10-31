"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { ZoomMedia } from "./use-media-zoom";

type Props = {
  image: ZoomMedia | null;
  onClose: () => void;
};

export function MediaZoomModal({ image, onClose }: Props) {
  return (
    <Modal
      isOpen={image !== null}
      onClose={onClose}
      className="max-h-[calc(100dvh-2rem)] max-w-3xl overflow-hidden bg-black/95
        p-3 sm:max-h-[80dvh] sm:p-4"
    >
      {image && (
        <div
          className="relative mx-auto h-[55vh] max-h-[55vh] w-full sm:h-[60dvh]
            sm:max-h-[60dvh]"
        >
          {image.type === "VIDEO" ? (
            <video
              key={image.src}
              src={image.src}
              controls
              autoPlay
              loop
              playsInline
              aria-label={image.alt}
              className="h-full w-full object-contain"
            />
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) calc(100vw - 3.5rem), 48rem"
              quality={100}
              className="object-contain"
            />
          )}
        </div>
      )}
    </Modal>
  );
}
