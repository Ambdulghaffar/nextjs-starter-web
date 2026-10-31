"use client";

import { useState } from "react";
import {
  User as UserIcon,
  MapPin,
  Mail,
  Phone,
  CalendarDays,
  CalendarClock,
  Hash,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userByIdQueryOptions } from "../api/queries/queries.client";
import { useMediaZoom } from "@/lib/media/components/use-media-zoom";
import { MediaZoomModal } from "@/lib/media/components/media-zoom-modal";
import Button from "@/components/ui/button/Button";
import { getUserAvatarUrl, UserRole } from "../api/types";
import { userStatusMeta } from "../constants/user-options";

type TabId = "info" | "addresses";

const tabs = [
  { id: "info", label: "Informations", icon: UserIcon },
  { id: "addresses", label: "Localisations", icon: MapPin },
] as const;

const formatDate = (date?: string) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function UserDetails({
  userId,
  onClose,
}: {
  userId: number;
  onClose?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("info");
  const { data: user } = useSuspenseQuery(userByIdQueryOptions(userId));
  const avatarUrl = getUserAvatarUrl(user);
  const { previewImage, openZoom, closeZoom } = useMediaZoom();

  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  const roleLabel =
    user.role === UserRole.ADMIN ? "Administrateur" : "Utilisateur";
  const statusLabel = userStatusMeta[user.status]?.label;

  const fields = [
    { label: "Prénom", value: user.firstName, icon: UserIcon },
    { label: "Nom", value: user.lastName, icon: UserIcon },
    { label: "Adresse email", value: user.email, icon: Mail },
    { label: "Téléphone", value: user.phoneNumber, icon: Phone },
    {
      label: "Date de création",
      value: formatDate(user.createdAt),
      icon: CalendarDays,
    },
    {
      label: "Dernière modification",
      value: formatDate(user.updatedAt),
      icon: CalendarClock,
    },
  ];

  return (
    <div className="no-scrollbar bg-background flex flex-col overflow-y-auto">
      {/* ========================================================= */}
      {/* BANNIÈRE + IDENTITÉ                                       */}
      {/* ========================================================= */}

      <header>
        <div
          aria-hidden
          className="from-primary/15 via-primary/5 h-24 bg-linear-to-r
            to-transparent"
        />

        <div
          className="-mt-10 flex flex-col gap-4 px-6 sm:flex-row sm:items-end
            sm:gap-5 lg:px-10"
        >
          {/* Avatar */}
          <button
            type="button"
            disabled={!avatarUrl}
            onClick={() => avatarUrl && openZoom(avatarUrl, fullName)}
            aria-label={
              avatarUrl
                ? `Afficher la photo de ${fullName} en grand`
                : undefined
            }
            className="bg-muted ring-background focus-visible:ring-ring/50
              relative size-24 shrink-0 overflow-hidden rounded-full ring-4
              outline-none focus-visible:ring-[3px] enabled:cursor-zoom-in
              disabled:cursor-default"
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={fullName}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <span
                className="bg-primary/10 text-primary flex h-full w-full
                  items-center justify-center text-3xl font-semibold"
              >
                {initials || <UserIcon className="size-9" />}
              </span>
            )}
          </button>

          {/* Identité */}
          <div className="min-w-0 flex-1 pb-1">
            <h1
              className="font-heading text-foreground truncate text-2xl
                font-bold tracking-tight"
            >
              {fullName || "Utilisateur"}
            </h1>

            <div
              className="text-muted-foreground mt-1 flex flex-wrap items-center
                gap-x-4 gap-y-1 text-sm"
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <Mail className="size-3.5 shrink-0" />
                <span className="truncate">{user.email}</span>
              </span>

              <span className="flex items-center gap-1.5">
                <Hash className="size-3.5" />
                {user.id}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className="bg-secondary text-secondary-foreground rounded-full
                  px-2.5 py-1 text-xs font-medium"
              >
                {roleLabel}
              </span>

              {statusLabel && (
                <span
                  className="border-border text-muted-foreground rounded-full
                    border px-2.5 py-1 text-xs font-medium"
                >
                  {statusLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* ONGLETS (sticky)                                          */}
      {/* ========================================================= */}

      <nav
        className="border-border bg-background/95 sticky top-0 z-20 mt-6
          border-b px-6 backdrop-blur-sm lg:px-10"
      >
        <div role="tablist" aria-label="Sections" className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`focus-visible:ring-ring/50 relative flex
                items-center gap-2 rounded-md py-3 text-sm font-medium
                transition-colors outline-none focus-visible:ring-[3px] ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>

                {isActive && (
                  <span
                    className="bg-primary absolute inset-x-0 bottom-0 h-0.5
                      rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ========================================================= */}
      {/* CONTENU                                                   */}
      {/* ========================================================= */}

      <main className="px-6 py-6 lg:px-10">
        {activeTab === "info" && (
          <div
            id="panel-info"
            role="tabpanel"
            aria-labelledby="tab-info"
            className="mx-auto max-w-3xl space-y-8"
          >
            {/* Photos */}
            {user.images.length > 0 && (
              <section>
                <div className="mb-3 flex items-baseline justify-between">
                  <h2 className="text-foreground text-lg font-semibold">
                    Photos
                  </h2>
                  <span className="text-muted-foreground text-sm">
                    {user.images.length}
                  </span>
                </div>

                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {user.images.map((media, index) => (
                    <li key={media.id}>
                      <button
                        type="button"
                        onClick={() =>
                          openZoom(media.url, fullName, media.type)
                        }
                        aria-label={`Afficher la photo ${index + 1} en grand`}
                        className="group border-border
                          focus-visible:ring-ring/50 relative block w-full
                          overflow-hidden rounded-xl border outline-none
                          focus-visible:ring-[3px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.url}
                          alt={`Photo ${index + 1} de ${fullName}`}
                          className="aspect-4/3 w-full object-cover
                            transition-transform duration-300
                            group-hover:scale-105"
                        />

                        {index === 0 && (
                          <span
                            className="bg-primary text-primary-foreground
                              absolute top-2 left-2 rounded-md px-2 py-0.5
                              text-xs font-medium"
                          >
                            Avatar
                          </span>
                        )}

                        <span
                          className="bg-background/80 text-foreground absolute
                            right-2 bottom-2 rounded-full p-1.5 opacity-0
                            transition-opacity group-hover:opacity-100
                            group-focus-visible:opacity-100"
                        >
                          <ZoomIn className="size-4" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Informations personnelles */}
            <section>
              <div className="mb-3">
                <h2 className="text-foreground text-lg font-semibold">
                  Informations personnelles
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Informations principales de l&apos;utilisateur.
                </p>
              </div>

              <dl
                className="bg-border border-border grid gap-px overflow-hidden
                  rounded-xl border sm:grid-cols-2"
              >
                {fields.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="bg-card flex items-center gap-3 px-5 py-4"
                  >
                    <span
                      className="bg-primary/10 text-primary flex size-9 shrink-0
                        items-center justify-center rounded-lg"
                    >
                      <Icon className="size-4" />
                    </span>

                    <div className="min-w-0">
                      <dt
                        className="text-muted-foreground text-xs font-medium
                          tracking-wide uppercase"
                      >
                        {label}
                      </dt>
                      <dd
                        className="text-card-foreground mt-0.5 text-sm
                          font-medium break-words"
                      >
                        {value || "—"}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        )}

        {activeTab === "addresses" && (
          <div
            id="panel-addresses"
            role="tabpanel"
            aria-labelledby="tab-addresses"
            className="mx-auto max-w-3xl"
          >
            <div
              className="border-border bg-card flex flex-col items-center
                rounded-xl border border-dashed px-6 py-12 text-center"
            >
              <span
                className="bg-primary/10 text-primary mb-4 flex size-12
                  items-center justify-center rounded-full"
              >
                <MapPin className="size-5" />
              </span>

              <p className="text-card-foreground text-sm font-medium">
                Aucune localisation
              </p>
              <p className="text-muted-foreground mt-1 max-w-xs text-sm">
                Les localisations enregistrées par cet utilisateur apparaîtront
                ici.
              </p>
            </div>
          </div>
        )}
      </main>

      {onClose && (
        <footer
          className="border-border bg-background sticky bottom-0 mt-auto flex
            justify-center border-t px-6 py-4 lg:px-10"
        >
          <Button onClick={onClose} className="mx-auto w-full max-w-md">
            Fermer
          </Button>
        </footer>
      )}

      <MediaZoomModal image={previewImage} onClose={closeZoom} />
    </div>
  );
}
