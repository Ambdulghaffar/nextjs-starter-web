"use client";
import React, { useEffect, useId, useRef } from "react";
import { X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
  /** Si présent : mode « carte » avec bandeau, cercles et en-tête */
  title?: string;
  description?: React.ReactNode;
  icon?: LucideIcon;
  /** Remplace le style par défaut du carré de l'icône (ex. destructive) */
  iconClassName?: string;
  /** Largeur du mode carte : sm = 28rem, md = 43.75rem, lg = 48rem */
  size?: ModalSize;
}

const sizes: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-175",
  lg: "max-w-3xl",
};

/* Cercles du bandeau (5). Le conteneur est en `relative isolate overflow-hidden`. */
function BannerCircles() {
  return (
    <>
      <div
        className="bg-primary-foreground/10 absolute -top-12 -right-8 -z-10
          size-32 rounded-full"
      />
      <div
        className="border-primary-foreground/20 absolute -top-6 right-24 -z-10
          size-20 rounded-full border-2 sm:right-32"
      />
      <div
        className="bg-primary-foreground/15 absolute top-2 right-1/2 -z-10
          size-5 rounded-full"
      />
      <div
        className="border-primary-foreground/15 absolute -bottom-10 left-8 -z-10
          size-24 rounded-full border-2 sm:left-16"
      />
      <div
        className="bg-primary-foreground/10 absolute -top-8 -left-8 -z-10
          size-28 rounded-full"
      />
    </>
  );
}

/* Cercles du bas de la carte (2) */
function FooterCircles() {
  return (
    <>
      <div
        aria-hidden
        className="bg-primary/10 absolute -right-12 -bottom-12 -z-10 size-40
          rounded-full"
      />
      <div
        aria-hidden
        className="border-primary/15 absolute -bottom-6 left-1/3 -z-10 size-20
          rounded-full border-2"
      />
    </>
  );
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscreen = false,
  title,
  description,
  icon: Icon,
  iconClassName,
  size = "md",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const isCard = !!title && !isFullscreen;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "relative h-full w-full bg-background text-foreground"
    : isCard
      ? cn(
          "border-border bg-card text-card-foreground relative isolate flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-3xl border shadow-2xl",
          sizes[size],
        )
      : "relative w-full rounded-3xl bg-card text-card-foreground";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={isCard ? titleId : undefined}
      className={cn(
        `modal fixed inset-0 z-99999 flex items-center justify-center
        overflow-y-auto`,
        !isFullscreen && "px-4 py-4 sm:px-6",
      )}
    >
      {!isFullscreen && (
        <div
          className="bg-foreground/30 fixed inset-0 h-full w-full
            backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        ref={modalRef}
        className={cn(contentClasses, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className={cn(
              `focus-visible:ring-ring/50 absolute z-50 flex size-8 items-center
              justify-center rounded-full transition-colors
              focus-visible:ring-[3px] focus-visible:outline-none`,
              isCard
                ? `bg-primary-foreground/15 text-primary-foreground
                  hover:bg-primary-foreground/25 top-4 right-4`
                : `bg-muted text-muted-foreground hover:bg-accent
                  hover:text-accent-foreground top-3 right-3`,
            )}
          >
            <X className="size-4" aria-hidden />
          </button>
        )}

        {isCard ? (
          <>
            {/* Bandeau fixe */}
            <div
              aria-hidden
              className="bg-primary relative isolate h-16 shrink-0
                overflow-hidden"
            >
              <BannerCircles />
            </div>

            {/* Cercles du bas : fixes aussi, rattachés à la carte */}
            <FooterCircles />

            {/* Seul ce bloc défile */}
            <div
              className="no-scrollbar min-h-0 flex-1 overflow-x-hidden
                overflow-y-auto"
            >
              <div className="p-5 sm:p-6 lg:p-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {Icon && (
                    <span
                      className={cn(
                        `flex size-12 shrink-0 items-center justify-center
                          rounded-xl ring-1 ring-inset`,
                        iconClassName ??
                          "bg-primary/10 text-primary ring-primary/20",
                      )}
                    >
                      <Icon className="size-6" aria-hidden />
                    </span>
                  )}
                  <div className="min-w-0">
                    <h2
                      id={titleId}
                      className="font-display text-xl font-bold tracking-tight
                        text-balance sm:text-2xl lg:text-3xl"
                    >
                      {title}
                    </h2>
                    {description && (
                      <div
                        className="text-muted-foreground mt-2 text-base
                          sm:text-lg"
                      >
                        {description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 sm:mt-8">{children}</div>
              </div>
            </div>
          </>
        ) : (
          <div className={isFullscreen ? "h-full" : undefined}>{children}</div>
        )}
      </div>
    </div>
  );
};
