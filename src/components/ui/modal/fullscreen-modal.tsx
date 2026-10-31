"use client";
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

type ContentWidth = "md" | "lg" | "xl";

const widths: Record<ContentWidth, string> = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
};

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: React.ReactNode;
  /** Petit badge au-dessus du titre (ex. « Mon compte ») */
  badge?: string;
  badgeIcon?: LucideIcon;
  /** Largeur du contenu sous le bandeau */
  width?: ContentWidth;
  /** false = pas de carte, tu poses ce que tu veux sous le bandeau */
  card?: boolean;
  children: React.ReactNode;
}

/* Cercles discrets sur le fond de page (2) */
function PageCircles() {
  return (
    <>
      <div
        aria-hidden
        className="bg-primary/10 absolute top-1/2 -left-16 -z-10 size-56
          rounded-full"
      />
      <div
        aria-hidden
        className="border-primary/15 absolute -right-20 -bottom-20 -z-10 size-72
          rounded-full border-2"
      />
    </>
  );
}

/* Cercles du bandeau (7) */
function HeaderCircles() {
  return (
    <>
      <div
        aria-hidden
        className="bg-primary-foreground/10 absolute -top-24 -right-16 -z-10
          size-80 rounded-full"
      />
      <div
        aria-hidden
        className="border-primary-foreground/20 absolute top-10 right-48 -z-10
          size-44 rounded-full border-2"
      />
      <div
        aria-hidden
        className="bg-primary-foreground/10 absolute top-8 right-1/2 -z-10
          size-10 rounded-full"
      />
      <div
        aria-hidden
        className="border-primary-foreground/15 absolute -bottom-28 -left-20
          -z-10 size-72 rounded-full border-2"
      />
      <div
        aria-hidden
        className="bg-primary-foreground/10 absolute -bottom-10 left-1/4 -z-10
          size-28 rounded-full"
      />
      <div
        aria-hidden
        className="bg-primary-foreground/15 absolute right-24 bottom-10 -z-10
          size-14 rounded-full"
      />
      <div
        aria-hidden
        className="border-primary-foreground/20 absolute bottom-8 left-1/2 -z-10
          size-6 rounded-full border-2"
      />
    </>
  );
}

/* Cercles dans le coin de la carte (2) */
function CardCircles() {
  return (
    <>
      <div
        aria-hidden
        className="bg-primary/10 absolute -top-14 -right-14 -z-10 size-40
          rounded-full"
      />
      <div
        aria-hidden
        className="border-primary/20 absolute top-8 right-20 -z-10 size-12
          rounded-full border-2"
      />
    </>
  );
}

export function FullscreenModal({
  isOpen,
  onClose,
  title,
  description,
  badge,
  badgeIcon: BadgeIcon,
  width = "lg",
  card = true,
  children,
}: FullscreenModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen>
      <div
        className="no-scrollbar bg-background text-foreground fixed inset-0
          isolate overflow-y-auto"
      >
        <PageCircles />

        <header
          className="bg-primary text-primary-foreground relative isolate
            overflow-hidden pt-16 pb-28 lg:pt-20 lg:pb-32"
        >
          <HeaderCircles />

          <div className="mx-auto w-full max-w-3xl px-6">
            <div className="pr-14">
              {badge && (
                <span
                  className="bg-primary-foreground/10 ring-primary-foreground/20
                    inline-flex items-center gap-2 rounded-full py-1 pr-3.5
                    pl-1.5 text-sm font-semibold ring-1 ring-inset"
                >
                  {BadgeIcon && (
                    <span
                      className="bg-primary-foreground/15 grid size-6
                        place-items-center rounded-full"
                    >
                      <BadgeIcon className="size-3.5" aria-hidden />
                    </span>
                  )}
                  {badge}
                </span>
              )}
              <h2
                className="font-display mt-5 text-3xl leading-tight font-bold
                  tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                {title}
              </h2>
              {description && (
                <p
                  className="text-primary-foreground/80 mt-4 max-w-xl text-lg
                    leading-relaxed"
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </header>

        <div className={cn("mx-auto -mt-16 w-full px-6 pb-16", widths[width])}>
          {card ? (
            <div
              className="border-border bg-card text-card-foreground relative
                isolate flex flex-col overflow-hidden rounded-3xl border p-6
                shadow-xl lg:p-10"
            >
              <CardCircles />
              {children}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </Modal>
  );
}
