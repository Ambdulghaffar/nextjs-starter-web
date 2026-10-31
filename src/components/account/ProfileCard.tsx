import Link from "next/link";
import { Camera, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { ROUTES } from "@/utils/routes";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMediaZoom } from "@/lib/media/components/use-media-zoom";
import { getUserAvatarUrl, type User } from "@/lib/users/api/types";
import { MediaZoomModal } from "@/lib/media/components/media-zoom-modal";

function InfoRow({
  icon: Icon,
  label,
  value,
  placeholder,
  iconClassName,
}: {
  icon: typeof Mail;
  label: string;
  value?: string | null;
  placeholder: string;
  iconClassName?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          `bg-brand-2 text-brand-2-foreground grid size-10 shrink-0
          place-items-center rounded-xl`,
          iconClassName,
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs font-medium">{label}</p>
        <p
          className={
            value
              ? "text-foreground text-sm font-medium break-all"
              : "text-muted-foreground text-sm"
          }
        >
          {value || placeholder}
        </p>
      </div>
    </div>
  );
}

type ProfileCardProps = {
  user: Pick<
    User,
    "firstName" | "lastName" | "email" | "phoneNumber" | "images"
  >;
};

export function ProfileCard({ user }: ProfileCardProps) {
  const avatarUrl = getUserAvatarUrl(user);
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    "Nom non renseigné";
  const { previewImage, openZoom, closeZoom } = useMediaZoom();
  return (
    <div
      className="border-border bg-card text-card-foreground flex h-full flex-col
        overflow-hidden rounded-2xl border shadow-sm"
    >
      {/* Bandeau uni avec 8 cercles décoratifs */}
      <div className="bg-primary relative isolate z-1 h-32 overflow-hidden">
        <div
          aria-hidden
          className="bg-primary-foreground/10 absolute -top-16 -right-10 -z-10
            size-48 rounded-full"
        />
        <div
          aria-hidden
          className="border-primary-foreground/20 absolute top-4 right-28 -z-10
            size-24 rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary-foreground/10 absolute top-3 right-1/2 -z-10
            size-8 rounded-full"
        />
        <div
          aria-hidden
          className="border-primary-foreground/15 absolute -bottom-16 -left-12
            -z-10 size-44 rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary-foreground/10 absolute -bottom-6 left-1/4 -z-10
            size-20 rounded-full"
        />
        <div
          aria-hidden
          className="bg-primary-foreground/15 absolute right-10 bottom-4 -z-10
            size-10 rounded-full"
        />
        <div
          aria-hidden
          className="border-primary-foreground/20 absolute top-5 left-16 -z-10
            size-6 rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary-foreground/15 absolute right-1/3 bottom-3 -z-10
            size-4 rounded-full"
        />

        <Link
          href={ROUTES.ACCOUNT_PROFILE}
          aria-label="Modifier mon profil"
          className="bg-primary-foreground/15 text-primary-foreground
            hover:bg-primary-foreground/25
            focus-visible:ring-primary-foreground/50 absolute top-4 right-4
            inline-flex size-10 items-center justify-center rounded-full
            transition-colors focus-visible:ring-[3px]
            focus-visible:outline-none"
        >
          <Pencil className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="z-10 flex flex-1 flex-col px-7 pb-7">
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

        <div className="mt-4 min-w-0">
          <span
            className="bg-primary/10 text-primary ring-muted/20 inline-flex
              items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
              ring-1 ring-inset"
          >
            Mon profil
          </span>
          <h3
            className="font-display mt-2 text-2xl font-bold tracking-tight
              wrap-break-word"
          >
            {fullName}
          </h3>
        </div>

        <div className="border-border mt-6 space-y-4 border-t pt-6">
          <InfoRow
            icon={Mail}
            label="E-mail"
            value={user.email}
            placeholder="E-mail non renseigné"
            iconClassName="bg-brand-1 text-brand-1-foreground"
          />
          <InfoRow
            icon={Phone}
            label="Téléphone"
            value={user.phoneNumber}
            placeholder="Téléphone non renseigné"
            iconClassName="bg-brand-2 text-brand-2-foreground"
          />
          <InfoRow
            icon={MapPin}
            label="Adresse"
            placeholder="Complète tes informations depuis ton profil."
            iconClassName="bg-brand-3 text-brand-3-foreground"
          />
        </div>

        <Link
          href={ROUTES.ACCOUNT}
          className="bg-primary text-primary-foreground hover:bg-primary/90
            focus-visible:ring-ring/50 mt-5 inline-flex h-12 w-full items-center
            justify-center gap-2 rounded-xl px-4 font-semibold shadow-md
            transition-colors focus-visible:ring-[3px]
            focus-visible:outline-none"
        >
          <Camera className="size-4" aria-hidden />
          Compléter mon profil
        </Link>
      </div>
      <MediaZoomModal image={previewImage} onClose={closeZoom} />
    </div>
  );
}
