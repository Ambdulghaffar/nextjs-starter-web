import type { ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  Check,
  CircleHelp,
  LockKeyhole,
  MoreHorizontal,
  ShieldCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

function Window({
  title,
  label,
  className,
  children,
}: {
  title: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "border-border/70 min-w-0 overflow-hidden rounded-2xl border",
        "bg-card text-card-foreground shadow-foreground/5 shadow-2xl",
        className,
      )}
    >
      <div
        className="border-border/70 bg-muted/40 flex items-center gap-2 border-b
          px-4 py-3"
      >
        <span
          aria-hidden="true"
          className="bg-destructive/70 size-2.5 rounded-full"
        />
        <span aria-hidden="true" className="bg-chart-4 size-2.5 rounded-full" />
        <span aria-hidden="true" className="bg-chart-2 size-2.5 rounded-full" />

        <div className="ml-3 flex min-w-0 items-center gap-2">
          <span className="text-muted-foreground truncate text-xs font-medium">
            {title}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="bg-primary size-1.5 rounded-full" />
          <span className="text-muted-foreground text-[10px] font-medium">
            Aperçu
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}

function Field({
  label,
  value,
  icon,
  blur,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  blur?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="text-foreground text-xs font-medium">{label}</div>

      <div
        className="border-border bg-background flex min-w-0 items-center gap-2.5
          rounded-lg border px-3 py-2.5"
      >
        <span className="text-muted-foreground shrink-0">{icon}</span>
        <span
          className={`text-muted-foreground truncate text-xs
            ${blur && "blur-xs"}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

const stats = [
  {
    label: "Utilisateurs",
    value: "1 248",
    change: "+12,8 %",
    width: "w-[78%]",
    icon: Users,
    className: "border-brand-1/25 bg-brand-1/10 text-brand-1",
  },
  {
    label: "Publications",
    value: "342",
    change: "+8,2 %",
    width: "w-[58%]",
    icon: Activity,
    className: "border-brand-2/25 bg-brand-2/10 text-brand-2",
  },
  {
    label: "Commentaires",
    value: "89",
    change: "+4,6 %",
    width: "w-[38%]",
    icon: Check,
    className: "border-brand-3/25 bg-brand-3/10 text-brand-3",
  },
];

const members = [
  {
    initials: "EL",
    name: "Elanrif SB.",
    email: "elanrif@gmail.com",
    role: "Admin",
  },
  {
    initials: "ÂM",
    name: "AM",
    email: "ammarat@gmail.com",
    role: "Membre",
  },
  {
    initials: "EL",
    name: "Elhaffar.",
    email: "elhaffar@gmail.com",
    role: "Membre",
  },
  {
    initials: "DJ",
    name: "Djawad.",
    email: "djawad@gmail.com",
    role: "Membre",
  },
];

function LoginPreview() {
  return (
    <Window
      title="app.example.com / connexion"
      label="Aperçu illustratif d'une page de connexion"
    >
      <div
        className="relative flex min-h-[390px] flex-col justify-center
          overflow-hidden px-6 py-8 sm:px-9"
      >
        <div
          aria-hidden="true"
          className="bg-primary/10 pointer-events-none absolute -top-16
            -right-16 size-48 rounded-full blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-xs">
          <div
            className="bg-primary text-primary-foreground shadow-primary/20 mb-7
              flex size-12 items-center justify-center rounded-2xl shadow-lg"
          >
            <ShieldCheck aria-hidden="true" className="size-6" />
          </div>

          <div className="space-y-2">
            <p
              className="text-primary text-xs font-semibold tracking-[0.2em]
                uppercase"
            >
              Espace sécurisé
            </p>

            <h3
              className="font-display text-2xl font-bold tracking-tight
                sm:text-3xl"
            >
              Bon retour.
            </h3>

            <p className="text-muted-foreground text-sm leading-6">
              Retrouvez votre espace de travail en toute simplicité.
            </p>
          </div>

          <div className="mt-7 space-y-4">
            <Field
              label="Adresse email"
              value="elanrif@gmail.com"
              icon={<Users aria-hidden="true" className="size-4" />}
              blur={true}
            />

            <Field
              label="Mot de passe"
              value="••••••••••••"
              icon={<LockKeyhole aria-hidden="true" className="size-4" />}
            />

            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="border-border size-3.5 rounded border"
                />
                Se souvenir de moi
              </span>

              <span className="text-primary font-medium">
                Mot de passe oublié ?
              </span>
            </div>

            <div
              className="bg-primary text-primary-foreground shadow-primary/15
                flex items-center justify-center gap-2 rounded-lg px-4 py-3
                text-sm font-semibold shadow-md"
            >
              Se connecter
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </div>
          </div>

          <div
            className="text-muted-foreground mt-6 flex items-center
              justify-center gap-1.5 text-xs"
          >
            <ShieldCheck aria-hidden="true" className="text-primary size-3.5" />
            Authentification sécurisée
          </div>
        </div>
      </div>
    </Window>
  );
}

function DashboardPreview() {
  return (
    <Window
      title="app.example.com / dashboard"
      label="Aperçu illustratif d'un tableau de bord de gestion"
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p
              className="text-primary text-[10px] font-semibold
                tracking-[0.18em] uppercase"
            >
              Vue d&apos;ensemble
            </p>

            <h3
              className="font-display mt-1 text-lg font-bold tracking-tight
                sm:text-xl"
            >
              Tableau de bord
            </h3>

            <p className="text-muted-foreground mt-1 text-xs">
              Suivez votre activité en un coup d&apos;œil.
            </p>
          </div>

          <div
            className="border-border bg-background text-muted-foreground flex
              size-9 shrink-0 items-center justify-center rounded-xl border"
          >
            <MoreHorizontal aria-hidden="true" className="size-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map(
            ({ label, value, change, width, icon: Icon, className }, index) => (
              <div
                key={label}
                className={cn(
                  "min-w-0 rounded-xl border p-3 sm:p-3.5",
                  className,
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground truncate text-[11px]">
                    {label}
                  </span>

                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "size-3.5 shrink-0",
                      index === 0
                        ? "text-primary"
                        : index === 1
                          ? "text-chart-2"
                          : "text-chart-3",
                    )}
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-baseline gap-2">
                  <span
                    className="font-display text-xl font-bold tracking-tight"
                  >
                    {value}
                  </span>

                  <span className="text-chart-2 text-[10px] font-medium">
                    {change}
                  </span>
                </div>

                <div className="bg-muted mt-3 h-1 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      index === 0
                        ? "bg-primary"
                        : index === 1
                          ? "bg-chart-2"
                          : "bg-chart-3",
                      width,
                    )}
                  />
                </div>
              </div>
            ),
          )}
        </div>

        <div className="border-border mt-5 overflow-hidden rounded-xl border">
          <div
            className="border-border bg-muted/30 flex items-center
              justify-between gap-3 border-b px-3.5 py-3"
          >
            <div>
              <h4 className="text-xs font-semibold">Utilisateurs récents</h4>
              <p className="text-muted-foreground mt-0.5 text-[10px]">
                Gestion des comptes
              </p>
            </div>

            <div
              className="border-border bg-background text-muted-foreground flex
                items-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px]"
            >
              <Users aria-hidden="true" className="size-3" />
              Membres
            </div>
          </div>

          <div className="px-3.5">
            <div
              className="border-border text-muted-foreground grid
                grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] gap-2 border-b
                py-2.5 text-[9px] font-semibold tracking-wider uppercase
                sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_70px]"
            >
              <span>Utilisateur</span>
              <span>Email</span>
              <span>Rôle</span>
            </div>

            {members.map((member) => (
              <div
                key={member.email}
                className="border-border/70 grid
                  grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] items-center
                  gap-2 border-b py-3 last:border-b-0
                  sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_70px]"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className="bg-brand-1/10 text-brand-1 flex size-7 shrink-0
                      items-center justify-center rounded-lg text-[9px]
                      font-bold"
                  >
                    {member.initials}
                  </div>

                  <span className="truncate text-[10px] font-medium">
                    {member.name}
                  </span>
                </div>

                <span
                  className="text-muted-foreground truncate text-[10px] blur-xs"
                >
                  {member.email}
                </span>

                <span
                  className={cn(
                    `inline-flex items-center justify-center rounded-full px-2
                    py-1 text-[9px] font-semibold`,
                    member.role === "Admin"
                      ? "bg-brand-1 text-brand-1-foreground"
                      : "bg-brand-2 text-brand-2-foreground",
                  )}
                >
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="bg-accent/40 mt-4 flex flex-wrap items-center
            justify-between gap-2 rounded-lg px-3.5 py-3"
        >
          <div className="flex items-center gap-2 text-xs font-medium">
            <span
              className="bg-accent text-accent-foreground flex size-7
                items-center justify-center rounded-lg"
            >
              <ShieldCheck aria-hidden="true" className="size-4" />
            </span>
            Gestion centralisée
          </div>

          <span className="text-muted-foreground text-[10px]">
            Interface illustrative
          </span>
        </div>
      </div>
    </Window>
  );
}

export function Preview() {
  return (
    <section
      id="apercu"
      aria-labelledby="preview-title"
      className="border-border bg-muted/30 relative isolate scroll-mt-16
        overflow-hidden border-y"
    >
      <div
        aria-hidden="true"
        className="bg-primary/10 pointer-events-none absolute top-10 -left-48
          -z-10 size-[420px] rounded-full blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="bg-accent/30 pointer-events-none absolute -right-40 bottom-0
          -z-10 size-[360px] rounded-full blur-[100px]"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:gap-14">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div id="preview-title">
            <SectionHeading
              eyebrow="Aperçu du produit"
              title="Une base solide. Une interface prête à évoluer."
              description="Du parcours de connexion à l'administration des utilisateurs, découvre comment les différentes briques s'articulent dans une même application."
            />
          </div>

          <div
            className="border-border bg-card/80 text-muted-foreground hidden
              items-center gap-2 rounded-full border px-3.5 py-2 text-xs
              font-medium lg:flex"
          >
            <span className="bg-primary size-2 rounded-full" />
            Aperçu de l&apos;interface
          </div>
        </div>

        <div
          className="grid items-start gap-5 lg:grid-cols-[0.82fr_1.4fr]
            lg:gap-6"
        >
          <div className="min-w-0 lg:pt-10">
            <LoginPreview />

            <div className="mt-4 flex items-start gap-3 px-1">
              <div
                className="border-border bg-card text-primary flex size-9
                  shrink-0 items-center justify-center rounded-xl border"
              >
                <LockKeyhole aria-hidden="true" className="size-4" />
              </div>

              <div>
                <h4 className="text-sm font-semibold">
                  Un parcours de connexion clair
                </h4>

                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  Une maquette pour illustrer les écrans d&apos;authentification
                  et leur organisation.
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <DashboardPreview />

            <div className="mt-4 flex items-start gap-3 px-1">
              <div
                className="border-border bg-card text-primary flex size-9
                  shrink-0 items-center justify-center rounded-xl border"
              >
                <Activity aria-hidden="true" className="size-4" />
              </div>

              <div>
                <h4 className="text-sm font-semibold">
                  Un espace de gestion structuré
                </h4>

                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  Des indicateurs, des utilisateurs et des rôles réunis dans une
                  vue d&apos;ensemble.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-border bg-card/80 flex flex-col gap-4 rounded-2xl
            border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-start gap-3">
            <div
              className="bg-primary/10 text-primary flex size-10 shrink-0
                items-center justify-center rounded-xl"
            >
              <CircleHelp aria-hidden="true" className="size-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Une base que tu peux personnaliser
              </h3>

              <p
                className="text-muted-foreground mt-1 max-w-xl text-sm
                  leading-6"
              >
                Adapte les écrans, les fonctionnalités et l&apos;identité
                visuelle à ton prochain projet.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="bg-primary text-primary-foreground hover:bg-primary/90
              focus-visible:ring-ring focus-visible:ring-offset-background
              inline-flex shrink-0 items-center justify-center gap-2 rounded-lg
              px-5 py-3 text-sm font-semibold transition-colors
              focus-visible:ring-2 focus-visible:ring-offset-2
              focus-visible:outline-none"
          >
            Découvrir le starter kit
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
