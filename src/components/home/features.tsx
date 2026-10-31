import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Cloud,
  Database,
  FileText,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Mail,
  Moon,
  Package,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type Feature = {
  number: string;
  title: string;
  text: string;
  Icon: LucideIcon;
  className?: string;
  visual: ReactNode;
  label: string;
};

function FeatureVisual({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `border-border/70 bg-background/80 mt-auto overflow-hidden rounded-2xl
        border`,
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatusDot() {
  return (
    <span
      aria-hidden="true"
      className="bg-brand-1 size-1.5 shrink-0 rounded-full"
    />
  );
}

const features: Feature[] = [
  {
    number: "01",
    title: "Authentification maîtrisée",
    text: "Une base pour gérer les connexions, les sessions, les rôles et les accès à vos applications.",
    Icon: ShieldCheck,
    className: "md:col-span-2",
    label: "SÉCURITÉ & ACCÈS",
    visual: (
      <FeatureVisual className="border-primary/20">
        <div
          className="border-border/70 flex flex-wrap items-center
            justify-between gap-3 border-b px-4 py-3"
        >
          <div
            className="text-foreground flex items-center gap-2 text-xs
              font-medium"
          >
            <Fingerprint className="text-primary size-4" />
            Authentification
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <StatusDot />
            Flux configurable
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div
            className="border-brand-1/30 bg-brand-1 text-brand-1-foreground
              rounded-xl border p-3"
          >
            <div className="flex items-center gap-2">
              <div
                className="bg-brand-1-foreground text-brand-1 flex size-8
                  items-center justify-center rounded-lg"
              >
                <KeyRound className="size-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">Gestion des accès</p>
                <p className="mt-0.5 text-[11px]">Rôles et permissions</p>
              </div>
            </div>
          </div>

          <div
            className="border-brand-2/30 bg-brand-2 text-brand-2-foreground
              rounded-xl border p-3"
          >
            <div className="flex items-center gap-2">
              <div
                className="bg-brand-2-foreground text-brand-2 flex size-8
                  items-center justify-center rounded-lg"
              >
                <LockKeyhole className="size-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">Sessions</p>
                <p className="mt-0.5 text-[11px]">Contrôle des connexions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {[
            {
              label: "JWT",
              className: "border-primary/20 bg-primary/10 text-primary",
            },
            {
              label: "Sessions",
              className: "border-brand-1/20 bg-brand-1/10 text-brand-1",
            },
            {
              label: "Keycloak",
              className: "border-brand-2/20 bg-brand-2/10 text-brand-2",
            },
            {
              label: "Rôles",
              className: "border-brand-3/30 bg-brand-3/15 text-foreground",
            },
          ].map((item) => (
            <span
              key={item.label}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium
              ${item.className}`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </FeatureVisual>
    ),
  },
  {
    number: "02",
    title: "Comptes et emails",
    text: "Les parcours essentiels pour accompagner les utilisateurs de leur inscription à la récupération de compte.",
    Icon: Mail,
    label: "EXPÉRIENCE UTILISATEUR",
    visual: (
      <FeatureVisual className="border-brand-1/20">
        <div className="space-y-3 p-4">
          {[
            { title: "Confirmation d'email", state: "Inscription" },
            { title: "Mot de passe oublié", state: "Récupération" },
            { title: "État du compte", state: "Gestion" },
          ].map((item, index) => (
            <div key={item.title} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl",
                  index === 0
                    ? "bg-brand-1/10 text-brand-1"
                    : index === 1
                      ? "bg-brand-2/10 text-brand-2"
                      : "bg-brand-3/15 text-foreground",
                )}
              >
                {index === 0 ? (
                  <Mail className="size-4" />
                ) : index === 1 ? (
                  <KeyRound className="size-4" />
                ) : (
                  <Users className="size-4" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground text-xs font-medium">
                  {item.title}
                </p>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  {item.state}
                </p>
              </div>

              <Check className="text-primary size-4" />
            </div>
          ))}
        </div>
      </FeatureVisual>
    ),
  },
  {
    number: "03",
    title: "Administration des utilisateurs",
    text: "Organisez les comptes avec des rôles, des filtres et une interface d'administration structurée.",
    Icon: Users,
    label: "GESTION",
    visual: (
      <FeatureVisual
        className="bg-brand-1/10 hover:bg-brand-1/5 transition-colors"
      >
        <div
          className="border-brand-1/70 flex items-center justify-between
            border-b px-4 py-3"
        >
          <span className="text-brand-1 text-xs font-semibold">
            Utilisateurs
          </span>
          <span
            className="bg-brand-2/15 text-brand-2 rounded-md px-2 py-1
              text-[10px] font-medium"
          >
            Admin
          </span>
        </div>

        <div className="space-y-3 p-4">
          {[
            { initials: "EL", name: "El-Anrif SB.", role: "Administrateur" },
            { initials: "ÂM", name: "Âmmââr___âât.", role: "Membre" },
            { initials: "EL", name: "Elhaffar E.", role: "Membre" },
            { initials: "DJ", name: "Djawad D.", role: "Membre" },
          ].map((user, index) => (
            <div
              key={`${user.initials}-${user.name}`}
              className="flex items-center gap-3"
            >
              <div
                className={cn(
                  `flex size-8 items-center justify-center rounded-full
                  text-[10px] font-semibold`,
                  index === 0
                    ? "bg-brand-1/10 text-brand-1"
                    : index === 1
                      ? "bg-brand-2/10 text-brand-2"
                      : "bg-brand-3/15 text-foreground",
                )}
              >
                {user.initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground text-xs font-medium">
                  {user.name}
                </p>
                <p className="text-muted-foreground text-[11px]">{user.role}</p>
              </div>

              {index === 0 && (
                <span className="bg-brand-1 size-1.5 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </FeatureVisual>
    ),
  },
  {
    number: "04",
    title: "Base de données versionnée",
    text: "Structurez les évolutions de votre schéma grâce aux migrations Flyway.",
    Icon: Database,
    label: "PERSISTANCE",
    visual: (
      <FeatureVisual className="border-brand-2/20">
        <div
          className="border-border/70 flex items-center gap-2 border-b px-4
            py-3"
        >
          <Database className="text-brand-2 size-4" />
          <span className="text-foreground text-xs font-medium">
            db/migration
          </span>
        </div>

        <div className="space-y-3 p-4 font-mono text-[11px] sm:text-xs">
          <div className="flex items-center gap-3">
            <Check className="text-brand-1 size-3.5" />
            <span className="text-muted-foreground">V1__init_schema.sql</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="text-brand-1 size-3.5" />
            <span className="text-muted-foreground">V2__medias.sql</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-brand-2 size-3.5">→</span>
            <span className="text-foreground">V3__your_feature.sql</span>
          </div>
        </div>
      </FeatureVisual>
    ),
  },
  {
    number: "05",
    title: "Gestion des médias",
    text: "Prévoyez un parcours structuré pour l'envoi et la gestion des fichiers multimédias.",
    Icon: Cloud,
    label: "FICHIERS & MÉDIAS",
    visual: (
      <FeatureVisual className="border-brand-1/20">
        <div className="grid grid-cols-2 gap-3 p-4">
          <div
            className="border-brand-3/30 bg-brand-3/5 rounded-xl border
              border-dashed p-4 text-center"
          >
            <div
              className="bg-brand-3/10 text-brand-1 mx-auto flex size-10
                items-center justify-center rounded-xl"
            >
              <Cloud className="size-5" />
            </div>
            <p className="text-foreground mt-3 text-xs font-medium">Images</p>
            <p className="text-muted-foreground mt-1 text-[11px]">Upload</p>
          </div>

          <div
            className="border-brand-2/20 bg-brand-2/5 rounded-xl border p-4
              text-center"
          >
            <div
              className="bg-brand-2/10 text-brand-2 mx-auto flex size-10
                items-center justify-center rounded-xl"
            >
              <FileText className="size-5" />
            </div>
            <p className="text-foreground mt-3 text-xs font-medium">Vidéos</p>
            <p className="text-muted-foreground mt-1 text-[11px]">Gestion</p>
          </div>
        </div>
      </FeatureVisual>
    ),
  },
  {
    number: "06",
    title: "API documentée",
    text: "Explorez et testez vos endpoints avec une documentation OpenAPI / Swagger lorsqu'elle est configurée.",
    Icon: FileText,
    label: "DÉVELOPPEMENT",
    visual: (
      <FeatureVisual className="border-brand-2/20">
        <div
          className="border-border/70 flex items-center justify-between border-b
            px-4 py-3"
        >
          <div
            className="text-foreground flex items-center gap-2 text-xs
              font-medium"
          >
            <FileText className="text-brand-2 size-4" />
            API Explorer
          </div>
          <span className="text-muted-foreground font-mono text-[10px]">
            REST
          </span>
        </div>

        <div className="space-y-2 p-4 font-mono text-[11px] sm:text-xs">
          <div className="bg-muted/70 flex items-center gap-3 rounded-lg p-3">
            <span
              className="bg-brand-1/10 text-brand-1 rounded-md px-2 py-1
                font-bold"
            >
              GET
            </span>
            <span className="text-foreground">/api/users</span>
          </div>

          <div className="bg-muted/70 flex items-center gap-3 rounded-lg p-3">
            <span
              className="bg-brand-2/10 text-brand-2 rounded-md px-2 py-1
                font-bold"
            >
              POST
            </span>
            <span className="text-foreground">/api/users</span>
          </div>
        </div>
      </FeatureVisual>
    ),
  },
  {
    number: "07",
    title: "Thème clair et sombre",
    text: "Des composants cohérents qui s'adaptent au thème actif de l'application.",
    Icon: Moon,
    label: "DESIGN SYSTEM",
    visual: (
      <FeatureVisual className="border-brand-3/25">
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="border-border rounded-xl border p-3">
            <div className="mb-4 flex items-center gap-2">
              <span
                className="ring-foreground bg-background size-2 rounded-full
                  ring-1"
              />
              <span className="text-foreground text-[11px] font-medium">
                Clair
              </span>
            </div>
            <div className="bg-muted-foreground space-y-2 rounded-lg p-3">
              <div className="bg-background h-2 w-3/4 rounded-full" />
              <div className="bg-background h-2 w-1/2 rounded-full" />
              <div className="bg-background mt-3 h-6 rounded-md" />
            </div>
          </div>

          <div className="border-border bg-card rounded-xl border p-3">
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-foreground size-2 rounded-full" />
              <span className="text-foreground text-[11px] font-medium">
                Sombre
              </span>
            </div>
            <div className="bg-foreground space-y-2 rounded-lg p-3">
              <div className="bg-background/45 h-2 w-3/4 rounded-full" />
              <div className="bg-background/30 h-2 w-1/2 rounded-full" />
              <div className="bg-background/25 mt-3 h-6 rounded-md" />
            </div>
          </div>
        </div>
      </FeatureVisual>
    ),
  },
  {
    number: "08",
    title: "Déploiement",
    text: "Préparez votre frontend et votre backend pour un déploiement adapté à votre infrastructure.",
    Icon: Package,
    label: "MISE EN PRODUCTION",
    visual: (
      <FeatureVisual className="border-brand-1/20">
        <div className="space-y-3 p-4">
          <div
            className="border-border/70 flex items-center gap-3 rounded-xl
              border p-3"
          >
            <div
              className="bg-brand-1/10 text-brand-1 flex size-9 items-center
                justify-center rounded-lg"
            >
              <Package className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-xs font-semibold">Frontend</p>
              <p className="text-muted-foreground mt-1 text-[11px]">
                Next.js · Vercel
              </p>
            </div>
            <StatusDot />
          </div>

          <div
            className="border-border/70 flex items-center gap-3 rounded-xl
              border p-3"
          >
            <div
              className="bg-brand-2/10 text-brand-2 flex size-9 items-center
                justify-center rounded-lg"
            >
              <Cloud className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-xs font-semibold">Backend</p>
              <p className="text-muted-foreground mt-1 text-[11px]">
                Spring Boot · Docker
              </p>
            </div>
            <StatusDot />
          </div>
        </div>
      </FeatureVisual>
    ),
  },
];

export function Features() {
  return (
    <section
      id="fonctionnalites"
      className="bg-background relative isolate scroll-mt-16 overflow-hidden"
    >
      <div
        className="mx-auto flex max-w-7xl flex-col gap-12 px-5 sm:gap-16
          sm:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Fonctionnalités"
              title="Les fondations sont déjà là."
              description="Les fonctionnalités essentielles qu'on reconstruit projet après projet, réunies dans une base conçue pour vous faire gagner du temps."
            />
          </div>

          <div
            className="border-brand-1 flex items-center gap-3 border-l-2 pl-5"
          >
            <span
              className="text-brand-1 font-mono text-4xl font-semibold
                tracking-tight"
            >
              08
            </span>
            <div>
              <p className="text-foreground text-sm font-semibold">
                Modules clés
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Pensés pour évoluer
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.Icon;

            return (
              <article
                key={feature.number}
                className={cn(
                  `group border-border/80 bg-card hover:border-primary/40
                  relative flex min-w-0 flex-col gap-5 overflow-hidden
                  rounded-2xl border p-5 transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl sm:p-6`,
                  feature.className,
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="border-primary/20 bg-primary/5 text-primary
                      group-hover:bg-primary group-hover:text-primary-foreground
                      flex size-11 items-center justify-center rounded-xl border
                      transition-colors"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <span
                    className="text-muted-foreground/70 font-mono text-xs
                      tracking-wider"
                  >
                    {feature.number}
                  </span>
                </div>

                <div>
                  <p
                    className="text-primary mb-2 text-[10px] font-semibold
                      tracking-[0.18em] uppercase"
                  >
                    {feature.label}
                  </p>

                  <h3
                    className="text-card-foreground text-lg font-semibold
                      tracking-tight sm:text-xl"
                  >
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {feature.text}
                  </p>
                </div>

                {feature.visual}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-5 right-5
                    opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <ArrowUpRight className="text-primary size-4" />
                </div>
              </article>
            );
          })}
        </div>

        <div
          className="border-brand-3/80 bg-muted/30 flex flex-col gap-4
            rounded-2xl border p-5 sm:flex-row sm:items-center
            sm:justify-between sm:p-7"
        >
          <div className="flex items-start gap-4">
            <div
              className="bg-brand-3/90 text-brand-3-foreground flex size-10
                shrink-0 items-center justify-center rounded-xl"
            >
              <Check className="size-5" />
            </div>

            <div>
              <h3 className="text-foreground font-semibold">
                Moins de tâches répétitives. Plus de valeur.
              </h3>
              <p
                className="text-muted-foreground mt-1 max-w-2xl text-sm
                  leading-6"
              >
                Partez d&apos;une base structurée et concentrez-vous sur les
                fonctionnalités qui rendent votre application unique.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="bg-brand-3 text-brand-3-foreground hover:bg-brand-3/80
              inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-4
              py-2.5 text-sm font-semibold transition-colors sm:self-center"
          >
            Parlons du projet
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
