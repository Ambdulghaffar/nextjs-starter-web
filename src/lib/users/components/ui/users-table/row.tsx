"use client";

import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/table";
import { CellActions } from "./cell-action";
import { getUserAvatarUrl, type UserSummary } from "@/lib/users/api/types";
import { useMediaZoom } from "@/lib/media/components/use-media-zoom";
import { MediaZoomModal } from "@/lib/media/components/media-zoom-modal";
import { cn, formatRelativeDate } from "@/lib/utils";
import { colClass } from "./columns";
import { UserRole, UserStatus } from "@/lib/users/api/types";
import {
  ShieldCheck,
  UserRound,
  Clock3,
  CheckCircle2,
  Ban,
  Trash2,
} from "lucide-react";

interface UserTableRowProps {
  user: UserSummary;
  onView: (user: UserSummary) => void;
  onEdit: (user: UserSummary) => void;
  onDelete: (user: UserSummary) => void;
}

const CELL = "px-4 py-3 text-center align-middle text-sm text-muted-foreground";

const AVATAR_PLACEHOLDER = "/images/avatar-placeholder.jpg";

function getUserAvatar(avatarUrl?: string | null): string {
  const value = avatarUrl?.trim();

  if (!value) return AVATAR_PLACEHOLDER;

  try {
    const url = new URL(value);

    if (url.protocol === "https:" || url.protocol === "http:") {
      return value;
    }
  } catch {
    // Une URL distante invalide utilise l'avatar de remplacement.
  }

  return AVATAR_PLACEHOLDER;
}

// Pas de tokens success / warning / info : le sens passe par l'icône et le
// libellé, sur une surface neutre. Seules les erreurs utilisent `destructive`.
const ROLE_META = {
  [UserRole.ADMIN]: {
    label: "Administrateur",
    icon: ShieldCheck,
    className: "border-primary/30 bg-primary text-primary-foreground",
  },
  [UserRole.USER]: {
    label: "Utilisateur",
    icon: UserRound,
    className: "border-border bg-brand-3 text-brand-3-foreground",
  },
} satisfies Record<
  UserRole,
  { label: string; icon: typeof ShieldCheck; className: string }
>;

const STATUS_META = {
  [UserStatus.PENDING_VERIFICATION]: {
    label: "En attente",
    icon: Clock3,
    className: "border-border bg-brand-1 text-brand-1-foreground",
  },
  [UserStatus.ACTIVE]: {
    label: "Actif",
    icon: CheckCircle2,
    className: "border-border bg-brand-2 text-brand-2-foreground",
  },
  [UserStatus.BLOCKED]: {
    label: "Bloqué",
    icon: Ban,
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
  [UserStatus.DELETED]: {
    label: "Supprimé",
    icon: Trash2,
    className:
      "border-destructive/30 bg-destructive text-destructive-foreground",
  },
} satisfies Record<
  UserStatus,
  { label: string; icon: typeof ShieldCheck; className: string }
>;

export function Row({ user, onView, onEdit, onDelete }: UserTableRowProps) {
  const { previewImage, openZoom, closeZoom } = useMediaZoom();

  const fullName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const imageUrl = getUserAvatarUrl(user);
  const avatarUrl = getUserAvatar(imageUrl);
  const hasAvatar = Boolean(imageUrl?.trim());
  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}` || "?";

  return (
    <>
      <TableRow className="hover:bg-muted/50 transition-colors">
        {/* ID */}
        <TableCell className={cn(CELL, colClass("id"))}>{user.id}</TableCell>

        {/* Nom + avatar (+ email sur mobile) */}
        <TableCell className={CELL}>
          <div className="flex items-center gap-3 sm:ps-10">
            <button
              type="button"
              disabled={!hasAvatar}
              onClick={() => {
                if (hasAvatar) {
                  openZoom(avatarUrl, fullName);
                }
              }}
              className={cn(
                "flex size-14 shrink-0 items-center justify-center",
                "border-border overflow-hidden rounded-full border",
                "bg-muted text-muted-foreground",
                hasAvatar && "cursor-zoom-in",
                !hasAvatar && "cursor-default",
              )}
              aria-label={
                hasAvatar
                  ? `Afficher la photo de ${fullName} en grand`
                  : undefined
              }
            >
              {hasAvatar ? (
                <Image
                  width={56}
                  height={56}
                  src={avatarUrl}
                  alt={`Photo de ${fullName}`}
                  className="size-full object-cover"
                />
              ) : (
                <span className="text-xs font-medium">{initials}</span>
              )}
            </button>

            <div className="min-w-0 text-left">
              <span
                title={fullName}
                className="text-foreground line-clamp-2 max-w-45 leading-5
                  font-medium wrap-break-word"
              >
                {fullName || "Utilisateur sans nom"}
              </span>

              {/* Visible uniquement sur mobile */}
              <span
                title={user.email}
                className="text-muted-foreground block max-w-45 truncate text-xs
                  md:hidden"
              >
                {user.email}
              </span>
            </div>
          </div>
        </TableCell>

        {/* Email */}
        <TableCell className={cn(CELL, colClass("email"))}>
          <span
            title={user.email}
            className="block max-w-55 min-w-32 text-left leading-5 break-all"
          >
            {user.email}
          </span>
        </TableCell>

        {/* Téléphone */}
        <TableCell className={cn(CELL, colClass("phone"))}>
          {user.phoneNumber || "—"}
        </TableCell>

        {/* Rôle */}
        <TableCell className={cn(CELL, colClass("role"))}>
          {(() => {
            const meta = ROLE_META[user.role];
            const Icon = meta.icon;

            return (
              <div className="flex justify-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border",
                    "px-2.5 py-1 text-xs font-medium",
                    meta.className,
                  )}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {meta.label}
                </span>
              </div>
            );
          })()}
        </TableCell>
        {/* Statut */}
        <TableCell className={cn(CELL, colClass("status"))}>
          {(() => {
            const meta = STATUS_META[user.status];
            const Icon = meta.icon;

            return (
              <div className="flex justify-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border",
                    "px-2.5 py-1 text-xs font-medium",
                    meta.className,
                  )}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {meta.label}
                </span>
              </div>
            );
          })()}
        </TableCell>

        {/* Date de création */}
        <TableCell className={cn(CELL, colClass("createdAt"))}>
          {formatRelativeDate(user.createdAt)}
        </TableCell>

        {/* Actions */}
        <TableCell className={cn(CELL, colClass("actions"))}>
          <CellActions
            user={user}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TableCell>
      </TableRow>

      <MediaZoomModal image={previewImage} onClose={closeZoom} />
    </>
  );
}
