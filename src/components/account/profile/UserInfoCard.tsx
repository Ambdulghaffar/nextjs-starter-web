"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Mail,
  Phone,
  User,
  BadgeCheck,
  Pencil,
  Plus,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";
import { getUserAvatarUrl, UserStatus } from "@/lib/users/api/types";
import { useModal } from "@/hooks/useModal";
import EditProfileModal from "./modals/EditProfileModal";

type Accent = "primary" | "brand-1" | "brand-2" | "brand-3";

/* Classes écrites en entier (Tailwind ne génère pas les classes composées dynamiquement).
   Une seule teinte par carte. brand-3 est clair en mode clair : fond léger +
   texte `foreground` (DESIGN.md, règle 3). */
const accents: Record<Accent, { icon: string; hover: string; link: string }> = {
  primary: {
    icon: "bg-primary/10 text-primary ring-primary/20",
    hover: "hover:border-primary/40",
    link: "text-primary",
  },
  "brand-1": {
    icon: "bg-brand-1/10 text-brand-1 ring-brand-1/20",
    hover: "hover:border-brand-1/40",
    link: "text-brand-1",
  },
  "brand-2": {
    icon: "bg-brand-2/10 text-brand-2 ring-brand-2/20",
    hover: "hover:border-brand-2/40",
    link: "text-brand-2",
  },
  "brand-3": {
    icon: "bg-brand-3/15 text-foreground ring-brand-3/30",
    hover: "hover:border-brand-3/50",
    link: "text-foreground",
  },
};

function IconBox({ icon: Icon, accent }: { icon: LucideIcon; accent: Accent }) {
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-xl
        ring-1 ring-inset ${accents[accent].icon}`}
    >
      <Icon className="size-5" aria-hidden />
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-muted-foreground text-xs font-semibold tracking-wider
        uppercase"
    >
      {children}
    </h3>
  );
}

/** Petite carte d'un champ : icône teintée, libellé discret, valeur en avant. */
function Field({
  icon,
  label,
  value,
  accent,
  onAdd,
}: {
  icon: LucideIcon;
  label: string;
  value?: string | null;
  accent: Accent;
  onAdd: () => void;
}) {
  const a = accents[accent];
  const filled = !!value;

  return (
    <div
      className={`border-border flex min-w-0 items-center gap-4 rounded-xl
        border p-4 transition-all ${
          filled
            ? `bg-card text-card-foreground hover:-translate-y-0.5
              hover:shadow-md ${a.hover}`
            : "bg-muted/40 border-dashed"
        }`}
    >
      <IconBox icon={icon} accent={accent} />

      <div className="min-w-0 flex-1">
        <p
          className="text-muted-foreground text-xs font-medium tracking-wide
            uppercase"
        >
          {label}
        </p>
        {filled ? (
          <p className="mt-1 truncate text-base font-semibold" title={value}>
            {value}
          </p>
        ) : (
          <p className="text-muted-foreground mt-1 text-base">Non renseigné</p>
        )}
      </div>

      {!filled && (
        <button
          type="button"
          onClick={onAdd}
          className={`border-border hover:bg-accent focus-visible:ring-ring/50
          inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1
          text-xs font-semibold transition-colors focus-visible:ring-[3px]
          focus-visible:outline-none ${a.link}`}
        >
          <Plus className="size-3.5" aria-hidden />
          Ajouter
        </button>
      )}
    </div>
  );
}

export default function UserInfoCard() {
  const { data: session } = useSession();
  const { isOpen, openModal, closeModal } = useModal();
  const user = session?.user;
  const active = user?.status === UserStatus.ACTIVE;

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();
  const avatarUrl = session?.user ? getUserAvatarUrl(session.user) : null;

  return (
    <>
      <section
        className="border-border bg-card text-card-foreground relative isolate
          overflow-hidden rounded-3xl border p-7 shadow-sm sm:p-8"
      >
        {/* Cercles décoratifs (4), limités à l'en-tête */}
        <div
          aria-hidden
          className="bg-primary/10 absolute -top-16 -right-12 -z-10 size-48
            rounded-full"
        />
        <div
          aria-hidden
          className="border-primary/20 absolute top-6 right-40 -z-10 size-20
            rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary/15 absolute top-3 right-1/2 -z-10 size-6
            rounded-full"
        />
        <div
          aria-hidden
          className="border-primary/15 absolute -top-8 -left-8 -z-10 size-28
            rounded-full border-2"
        />

        {/* En-tête */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div
              className="bg-primary/10 text-primary ring-background relative
                flex size-16 shrink-0 items-center justify-center
                overflow-hidden rounded-full text-xl font-semibold ring-4"
            >
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={fullName || "Avatar"}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : initials ? (
                initials
              ) : (
                <User className="size-7" aria-hidden />
              )}
            </div>

            <div className="min-w-0">
              <span
                className="bg-primary/10 text-primary ring-primary/20
                  inline-flex items-center rounded-full px-2.5 py-0.5 text-xs
                  font-semibold ring-1 ring-inset"
              >
                Mon compte
              </span>
              <h2
                className="font-heading mt-1.5 text-2xl font-bold
                  tracking-tight"
              >
                Informations personnelles
              </h2>
              <p className="text-muted-foreground mt-0.5 text-sm">
                Ce que nous utilisons pour te joindre et te reconnaître.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90
              focus-visible:ring-ring/50 inline-flex items-center gap-2
              rounded-full px-5 py-2.5 text-sm font-semibold shadow-md
              transition-colors focus-visible:ring-[3px]
              focus-visible:outline-none"
          >
            <Pencil className="size-4" aria-hidden />
            Modifier
          </button>
        </div>

        {/* Champs, regroupés par catégorie */}
        <div className="mt-8 space-y-6">
          <div className="space-y-3">
            <SectionTitle>Identité</SectionTitle>
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                icon={User}
                label="Prénom"
                value={user?.firstName}
                accent="primary"
                onAdd={openModal}
              />
              <Field
                icon={User}
                label="Nom"
                value={user?.lastName}
                accent="primary"
                onAdd={openModal}
              />
            </div>
          </div>

          <div className="space-y-3">
            <SectionTitle>Contact</SectionTitle>
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                icon={Mail}
                label="Adresse e-mail"
                value={user?.email}
                accent="brand-1"
                onAdd={openModal}
              />
              <Field
                icon={Phone}
                label="Téléphone"
                value={user?.phoneNumber}
                accent="brand-2"
                onAdd={openModal}
              />
            </div>
          </div>

          <div className="space-y-3">
            <SectionTitle>Compte</SectionTitle>
            <div
              className="border-border bg-card text-card-foreground
                hover:border-brand-3/50 flex flex-wrap items-center gap-4
                rounded-xl border p-4 transition-all hover:-translate-y-0.5
                hover:shadow-md"
            >
              <IconBox icon={BadgeCheck} accent="brand-3" />

              <div className="min-w-0 flex-1">
                <p
                  className="text-muted-foreground text-xs font-medium
                    tracking-wide uppercase"
                >
                  Compte activé
                </p>
                <p className="mt-1 text-base font-semibold">
                  {active
                    ? "Ton compte est actif."
                    : "Ton compte n'est pas encore activé."}
                </p>
              </div>

              {/* L'état passe par l'icône et le libellé, jamais par une couleur de catégorie */}
              <span
                className="bg-muted text-foreground inline-flex items-center
                  gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
              >
                {active ? (
                  <Check className="size-3.5" aria-hidden />
                ) : (
                  <X className="size-3.5" aria-hidden />
                )}
                {active ? "Oui" : "Non"}
              </span>
            </div>
          </div>
        </div>
      </section>
      <EditProfileModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
