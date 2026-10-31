"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, Volume2, VolumeX } from "lucide-react";
import { optimizedVideoUrl, videoPoster } from "../utils";

type Props = {
  src: string;
  postId: number;
  active: boolean;
  onVisibilityChange: (postId: number, ratio: number) => void;
  onExpand?: () => void;
  className?: string;
};

const THRESHOLDS = [0, 0.25, 0.5, 0.6, 0.75, 1];

export function PostVideo({
  src,
  postId,
  active,
  onVisibilityChange,
  onExpand,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Signale au parent quelle part de la vidéo est visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => onVisibilityChange(postId, entry.intersectionRatio),
      { threshold: THRESHOLDS },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      onVisibilityChange(postId, 0);
    };
  }, [postId, onVisibilityChange]);

  // Lecture / pause selon la vidéo active
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-xl bg-black
        ${className ?? ""}`}
    >
      <video
        ref={videoRef}
        onClick={onExpand}
        className={`h-full w-full object-contain
          ${onExpand ? "cursor-zoom-in" : ""}`}
        src={optimizedVideoUrl(src)}
        poster={videoPoster(src)}
        muted={muted}
        loop
        playsInline
        preload="none"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setMuted((m) => !m);
        }}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        className="absolute right-3 bottom-3 flex h-8 w-8 items-center
          justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {onExpand && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          aria-label="Afficher la vidéo en grand"
          className="absolute right-14 bottom-3 flex h-8 w-8 items-center
            justify-center rounded-full bg-black/60 text-white
            hover:bg-black/80"
        >
          <Maximize2 size={16} />
        </button>
      )}
    </div>
  );
}
