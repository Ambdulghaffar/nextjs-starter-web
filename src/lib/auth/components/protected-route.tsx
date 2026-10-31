"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { UserRole } from "@/lib/users/api/types";
import { getSafeCallbackUrl } from "@/lib/utils";
import { ROUTES } from "@/utils/routes";

const { DASHBOARD, HOME, SIGN_IN } = ROUTES;

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  guestOnly?: boolean;
  redirectTo?: string;
}

export function getHomeRouteForRole(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return DASHBOARD;
    case UserRole.USER:
      return ROUTES.ACCOUNT;
    default:
      return HOME;
  }
}

export function ProtectedRoute({
  children,
  allowedRoles,
  guestOnly = false,
  redirectTo = SIGN_IN,
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isWrongRole =
    !!session?.user &&
    !!allowedRoles &&
    !allowedRoles.includes(session.user.role);

  useEffect(() => {
    if (status === "loading") return;

    // Page réservée aux visiteurs (connexion, inscription) alors que
    // l'utilisateur est connecté : on le renvoie là où il voulait aller.
    if (guestOnly && session?.user) {
      const callbackUrl = new URLSearchParams(window.location.search).get(
        "callbackUrl",
      );
      router.replace(
        getSafeCallbackUrl(callbackUrl, getHomeRouteForRole(session.user.role)),
      );
      return;
    }

    // Page privée sans session : on garde la page demandée pour y revenir
    // après la connexion.
    if (!guestOnly && status === "unauthenticated") {
      const current = window.location.pathname + window.location.search;
      const separator = redirectTo.includes("?") ? "&" : "?";
      router.replace(
        `${redirectTo}${separator}callbackUrl=${encodeURIComponent(current)}`,
      );
      return;
    }

    if (session?.user && isWrongRole) {
      router.replace(getHomeRouteForRole(session.user.role));
    }
  }, [session, status, router, guestOnly, redirectTo, isWrongRole]);

  // Les pages guestOnly (connexion, inscription) affichent leur contenu dès
  // le chargement, pour que Google le voie dans le HTML du serveur.
  if (status === "loading") return guestOnly ? <>{children}</> : null;

  if (guestOnly && session?.user) return null;

  if (!guestOnly && status === "unauthenticated") return null;

  if (isWrongRole) return null;

  return <>{children}</>;
}
