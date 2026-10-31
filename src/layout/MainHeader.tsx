"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  CircleUserRoundIcon,
  LogOutIcon,
  MenuIcon,
  ShieldUserIcon,
  XIcon,
} from "lucide-react";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import UserDropdown from "@/components/header/UserDropdown";
import environment from "@/config/environment.config";
import { UserRole } from "@/lib/users/api/types";
import { ROUTES } from "@/utils/routes";
import KitLogo from "@/components/common/KitLogo";
import { ThemeSelectButton } from "@/components/themes/ThemeSelectButton";

const { DASHBOARD, SIGN_IN, SIGN_UP, HOME } = ROUTES;

const navItems = [
  { label: "Fonctionnalités", href: `${HOME}#fonctionnalites` },
  { label: "Comment ça fonctionne", href: `${HOME}#comment` },
  { label: "Architecture", href: `${HOME}#architecture` },
  { label: "Contact", href: `${HOME}#contact` },
];

const isKeycloak = environment.auth.provider === "keycloak";

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const signInClass = [
  "inline-flex items-center justify-center rounded-full px-3 py-2",
  "text-sm font-semibold text-foreground/80 transition-colors",
  "hover:text-primary",
  focusClass,
].join(" ");

const signUpClass = [
  "inline-flex items-center justify-center rounded-full px-5 py-2.5",
  "bg-primary text-primary-foreground shadow-md shadow-primary/20",
  "text-sm font-semibold transition-colors hover:bg-primary/90",
  focusClass,
].join(" ");

const mobileSignInClass = [
  "inline-flex items-center justify-center rounded-xl border",
  "border-border bg-background px-4 py-3 text-sm font-semibold",
  "text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
  focusClass,
].join(" ");

const mobileSignUpClass = [
  "inline-flex items-center justify-center rounded-xl px-4 py-3",
  "bg-primary text-sm font-semibold text-primary-foreground",
  "transition-colors hover:bg-primary/90",
  focusClass,
].join(" ");

const navLinkClass = [
  "rounded-full px-4 py-2 text-foreground/75 transition-colors",
  "hover:bg-accent hover:text-accent-foreground",
  focusClass,
].join(" ");

const mobileNavLinkClass = [
  "rounded-xl px-4 py-3 text-sm font-medium text-foreground",
  "transition-colors hover:bg-accent hover:text-accent-foreground",
  focusClass,
].join(" ");

type AuthActionProps = {
  href: string;
  keycloakAction: () => void;
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
};

/** Bouton Keycloak ou lien classique selon le fournisseur d'authentification. */
function AuthAction({
  href,
  keycloakAction,
  className,
  onNavigate,
  children,
}: AuthActionProps) {
  if (isKeycloak) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          onNavigate?.();
          keycloakAction();
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

export default function MainHeader() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const startKeycloakRegistration = () => {
    window.location.assign("/api/auth/keycloak/register");
  };

  const startKeycloakSignIn = () => {
    void signIn("keycloak", { callbackUrl: DASHBOARD });
  };

  const handleSignOut = () => {
    closeMobileMenu();
    void signOut();
  };

  const isAdmin = session?.user?.role === UserRole.ADMIN;

  return (
    <header
      className="border-border/70 bg-background/80 sticky top-0 z-50 border-b
        backdrop-blur-lg"
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-4
          px-4 py-3 sm:px-6 lg:px-10"
      >
        <KitLogo />

        {/* Navigation desktop */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 text-sm font-medium lg:flex"
        >
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions à droite */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeSelectButton />
          <ThemeToggleButton />

          {session?.user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <UserDropdown />
            </div>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <AuthAction
                href={SIGN_IN}
                keycloakAction={startKeycloakSignIn}
                className={signInClass}
              >
                Se connecter
              </AuthAction>

              <AuthAction
                href={SIGN_UP}
                keycloakAction={startKeycloakRegistration}
                className={signUpClass}
              >
                S&apos;inscrire
              </AuthAction>
            </div>
          )}

          {/* Bouton du menu mobile */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className={`border-border bg-card text-foreground hover:bg-accent
              hover:text-accent-foreground inline-flex size-10 items-center
              justify-center rounded-xl border transition-colors lg:hidden
              ${focusClass}`}
          >
            {mobileMenuOpen ? (
              <XIcon size={20} aria-hidden="true" />
            ) : (
              <MenuIcon size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="px-4 pb-4 lg:hidden">
          <div
            className="border-border bg-card shadow-foreground/5 mx-auto
              max-w-7xl rounded-2xl border p-3 shadow-xl"
          >
            <nav aria-label="Navigation mobile" className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClass}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="border-border mt-3 border-t pt-3">
              {session?.user ? (
                <div className="grid gap-2">
                  <Link
                    href={isAdmin ? DASHBOARD : "/account"}
                    onClick={closeMobileMenu}
                    className={`border-border bg-background text-foreground
                      hover:bg-accent hover:text-accent-foreground inline-flex
                      w-full items-center justify-center gap-2 rounded-xl border
                      px-4 py-3 text-sm font-semibold transition-colors
                      ${focusClass}`}
                  >
                    {isAdmin ? (
                      <ShieldUserIcon size={20} aria-hidden="true" />
                    ) : (
                      <CircleUserRoundIcon size={20} aria-hidden="true" />
                    )}

                    <span>
                      {isAdmin ? "Tableau de bord administrateur" : "Compte"}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={`border-destructive/30 bg-destructive/5
                      text-destructive hover:bg-destructive/10 inline-flex
                      w-full items-center justify-center gap-2 rounded-xl border
                      px-4 py-3 text-sm font-semibold transition-colors
                      ${focusClass}`}
                  >
                    <LogOutIcon size={20} aria-hidden="true" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <AuthAction
                    href={SIGN_IN}
                    keycloakAction={startKeycloakSignIn}
                    onNavigate={closeMobileMenu}
                    className={mobileSignInClass}
                  >
                    Se connecter
                  </AuthAction>

                  <AuthAction
                    href={SIGN_UP}
                    keycloakAction={startKeycloakRegistration}
                    onNavigate={closeMobileMenu}
                    className={mobileSignUpClass}
                  >
                    S&apos;inscrire
                  </AuthAction>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
