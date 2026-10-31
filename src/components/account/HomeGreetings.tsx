import { MediaZoomModal } from "@/lib/media/components/media-zoom-modal";
import { useMediaZoom } from "@/lib/media/components/use-media-zoom";
import { getUserAvatarUrl } from "@/lib/users/api/types";
import type { User } from "@/lib/users/api/types";
import Image from "next/image";

type HomeGreetingProps = {
  user: Pick<User, "firstName" | "lastName" | "images">;
};

export function HomeGreeting({ user }: HomeGreetingProps) {
  const avatarUrl = getUserAvatarUrl(user);
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    "Nom non renseigné";
  const { previewImage, openZoom, closeZoom } = useMediaZoom();
  return (
    <section
      className="bg-primary text-primary-foreground relative isolate
        overflow-hidden rounded-3xl px-8 py-12 sm:px-12 sm:py-16"
    >
      {/* Cercles décoratifs (7) */}
      <div
        aria-hidden
        className="bg-primary-foreground/10 absolute -top-24 -right-16 -z-10
          size-80 rounded-full"
      />
      <div
        aria-hidden
        className="border-primary-foreground/20 absolute top-10 right-24 -z-10
          size-48 rounded-full border-2"
      />
      <div
        aria-hidden
        className="bg-primary-foreground/10 absolute top-6 right-1/3 -z-10
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
        className="bg-primary-foreground/15 absolute right-12 bottom-12 -z-10
          size-16 rounded-full"
      />
      <div
        aria-hidden
        className="border-primary-foreground/20 absolute right-1/4 bottom-6
          -z-10 size-6 rounded-full border-2"
      />

      <aside className="flex items-center gap-6 sm:gap-10">
        {/* Avatar qui chevauche le bandeau */}
        <button
          type="button"
          disabled={!avatarUrl}
          onClick={() => avatarUrl && openZoom(avatarUrl, "Photo de profil")}
          aria-label={
            avatarUrl ? "Afficher la photo de profil en grand" : undefined
          }
          className="bg-muted ring-card focus-visible:ring-ring/50 -mt-12
            size-24 shrink-0 overflow-hidden rounded-full shadow-md ring-4
            focus-visible:outline-none enabled:cursor-zoom-in
            disabled:cursor-default"
        >
          <Image
            width={96}
            height={96}
            src={avatarUrl || "/images/avatar-placeholder.jpg"}
            className="size-full object-cover"
            alt={`Photo de ${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
          />
        </button>
        <h1
          className="font-display mt-5 text-4xl leading-tight font-bold
            tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          Bonjour{fullName ? `, ${fullName}` : ""}.
        </h1>
      </aside>
      <p
        className="text-primary-foreground/80 mt-5 max-w-xl text-lg
          leading-relaxed"
      >
        Voici votre profil et les prochaines choses à faire pour le garder à
        jour.
      </p>
      <MediaZoomModal image={previewImage} onClose={closeZoom} />
    </section>
  );
}
