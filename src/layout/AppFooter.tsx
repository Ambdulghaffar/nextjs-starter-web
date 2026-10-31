import Link from "next/link";

import { ROUTES } from "@/utils/routes";
import KitLogo from "@/components/common/KitLogo";

const { HOME, SIGN_IN, SIGN_UP, RESET_PASSWORD } = ROUTES;

const footerSections = [
  {
    title: "Le kit",
    links: [
      { label: "Fonctionnalités", href: `${HOME}#fonctionnalites` },
      { label: "Aperçu", href: `${HOME}#apercu` },
      { label: "Comment ça fonctionne", href: `${HOME}#comment` },
      { label: "Architecture", href: `${HOME}#architecture` },
    ],
  },
  {
    title: "Compte",
    links: [
      { label: "Se connecter", href: SIGN_IN },
      { label: "Créer un compte", href: SIGN_UP },
      { label: "Mot de passe oublié", href: RESET_PASSWORD },
    ],
  },
  {
    title: "Ressources",
    links: [
      {
        label: "Dépôt frontend (Next.js)",
        href: "https://github.com/Elanrif/nextjs-starter-web",
      },
      {
        label: "Dépôt backend (Spring Boot)",
        href: "https://github.com/Elanrif/[VOTRE-DEPOT-API]",
      },
      { label: "Nous contacter", href: `${HOME}#contact` },
    ],
  },
];

const linkClass = [
  "inline-flex rounded-sm text-sm text-secondary",
  "transition-colors hover:text-primary",
  "focus-visible:outline-2 focus-visible:outline-offset-4",
  "focus-visible:outline-ring",
].join(" ");

export default function AppFooter() {
  return (
    <footer className="border-border bg-foreground text-muted border-t">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2.5fr]">
          {/* Présentation du kit */}
          <div className="max-w-sm">
            <div className="text-foreground">
              <KitLogo />
            </div>

            <p className="mt-4 text-sm leading-6">
              Starter kit fullstack : un frontend Next.js et un backend Spring
              Boot déjà reliés, avec authentification et base PostgreSQL.
            </p>

            <Link
              href={`${HOME}#contact`}
              className="bg-primary text-primary-foreground shadow-primary/20
                hover:bg-primary/90 focus-visible:outline-ring mt-6 inline-flex
                items-center justify-center rounded-full px-5 py-2.5 text-sm
                font-semibold shadow-lg transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Nous contacter
            </Link>
          </div>

          {/* Navigation du footer */}
          <div className="grid gap-8 sm:grid-cols-3">
            {footerSections.map((section) => (
              <nav key={section.title} aria-label={section.title}>
                <h2 className="text-muted text-sm font-semibold">
                  {section.title}
                </h2>

                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("https://") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-border mt-12 flex flex-col gap-3 border-t pt-6
            text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            &copy; {new Date().getFullYear()} El-Anrif. Tous droits réservés.
          </p>

          <p>Next.js + Spring Boot. Démarrez vite.</p>
        </div>
      </div>
    </footer>
  );
}
