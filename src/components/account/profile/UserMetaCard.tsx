"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMediaZoom } from "@/lib/media/components/use-media-zoom";
import { getUserAvatarUrl } from "@/lib/users/api/types";
import { MediaZoomModal } from "@/lib/media/components/media-zoom-modal";

export default function UserMetaCard() {
  const { data: session } = useSession();
  const { previewImage, openZoom, closeZoom } = useMediaZoom();
  const user = session?.user;
  const avatarUrl = user ? getUserAvatarUrl(user) : null;

  return (
    <>
      <section
        aria-label="Résumé du profil"
        className="border-border bg-card text-card-foreground overflow-hidden
          rounded-3xl border shadow-sm"
      >
        {/* Bannière unie avec 8 cercles décoratifs */}
        <div
          aria-hidden
          className="bg-primary relative isolate h-28 overflow-hidden"
        >
          <div
            className="bg-primary-foreground/10 absolute -top-20 -right-12 -z-10
              size-56 rounded-full"
          />
          <div
            className="border-primary-foreground/20 absolute top-4 right-40
              -z-10 size-24 rounded-full border-2"
          />
          <div
            className="bg-primary-foreground/10 absolute top-3 right-1/2 -z-10
              size-8 rounded-full"
          />
          <div
            className="border-primary-foreground/15 absolute -bottom-20 -left-14
              -z-10 size-48 rounded-full border-2"
          />
          <div
            className="bg-primary-foreground/10 absolute -bottom-8 left-1/4
              -z-10 size-24 rounded-full"
          />
          <div
            className="bg-primary-foreground/15 absolute right-12 bottom-4 -z-10
              size-10 rounded-full"
          />
          <div
            className="border-primary-foreground/20 absolute top-5 left-20 -z-10
              size-6 rounded-full border-2"
          />
          <div
            className="bg-primary-foreground/15 absolute right-1/3 bottom-3
              -z-10 size-4 rounded-full"
          />
        </div>

        <div className="relative flex flex-wrap items-end gap-6 px-8 pb-8">
          <button
            type="button"
            disabled={!avatarUrl}
            onClick={() => avatarUrl && openZoom(avatarUrl, "Photo de profil")}
            aria-label={
              avatarUrl ? "Afficher la photo de profil en grand" : undefined
            }
            className="bg-muted ring-card focus-visible:ring-ring/50 -mt-14
              size-28 shrink-0 overflow-hidden rounded-full shadow-lg ring-4
              focus-visible:outline-none enabled:cursor-zoom-in
              disabled:cursor-default"
          >
            <Image
              width={112}
              height={112}
              src={avatarUrl || "/images/avatar-placeholder.jpg"}
              className="size-full object-cover"
              alt={`Photo de ${session?.user?.firstName ?? ""} ${session?.user?.lastName ?? ""}`}
            />
          </button>

          <div className="min-w-0 flex-1 pt-4">
            <span
              className="bg-primary/10 text-primary ring-primary/20 inline-flex
                items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                ring-1 ring-inset"
            >
              Mon compte
            </span>
            <h2
              className="font-display mt-2 text-3xl leading-tight font-bold
                tracking-tight sm:text-4xl"
            >
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-muted-foreground mt-1 break-all">
              {user?.email}
            </p>
          </div>
        </div>
      </section>
      <MediaZoomModal image={previewImage} onClose={closeZoom} />
    </>
  );
}
