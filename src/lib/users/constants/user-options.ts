export const userOptions = [
  {
    value: "ADMIN",
    label: "Administrator",
  },
  {
    value: "USER",
    label: "User",
  },
];

import { editableUserStatuses, UserStatus } from "../api/types";

export const userStatusMeta = {
  [UserStatus.ACTIVE]: {
    label: "Actif",
    badge: "success",
    textClass: "text-green-600 dark:text-green-400",
    description: "L'utilisateur peut se connecter et utiliser son compte.",
  },
  [UserStatus.BLOCKED]: {
    label: "Bloqué",
    badge: "error",
    textClass: "text-red-600 dark:text-red-400",
    description: "L'utilisateur ne peut pas se connecter à son compte.",
  },
  [UserStatus.PENDING_VERIFICATION]: {
    label: "En attente de vérification",
    badge: "warning",
    textClass: "text-amber-600 dark:text-amber-400",
    description:
      "L'utilisateur doit confirmer son e-mail avant de pouvoir se connecter.",
  },
  [UserStatus.DELETED]: {
    label: "Supprimé",
    badge: "error",
    textClass: "text-red-600 dark:text-red-400",
    description: "Ce compte a été supprimé.",
  },
} as const satisfies Record<
  UserStatus,
  {
    label: string;
    badge: "success" | "warning" | "error";
    textClass: string;
    description: string;
  }
>;

export const userStatusOptions = editableUserStatuses.map((value) => ({
  value,
  label: userStatusMeta[value].label,
}));
