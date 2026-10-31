import {
  ArrowUpRight,
  Boxes,
  Check,
  Code2,
  Database,
  Layers3,
  LockKeyhole,
  Palette,
  Server,
  Workflow,
} from "lucide-react";

import { SectionHeading } from "./section-heading";

const techGroups = [
  {
    id: "application",
    title: "Application",
    description: "Une base moderne pour construire des interfaces et des API.",
    icon: Code2,
    technologies: [
      { name: "Next.js", detail: "Application web" },
      { name: "React", detail: "Interface utilisateur" },
      { name: "TypeScript", detail: "Typage statique" },
      { name: "Tailwind CSS", detail: "Styles utilitaires" },
      { name: "shadcn/ui", detail: "Composants UI" },
    ],
  },
  {
    id: "authentication",
    title: "Authentification",
    description: "Une gestion structurée des utilisateurs et des accès.",
    icon: LockKeyhole,
    technologies: [
      { name: "Spring Security", detail: "Sécurité backend" },
      { name: "JWT", detail: "Authentification par token" },
      { name: "BCrypt", detail: "Hachage des mots de passe" },
      { name: "Role-based access", detail: "Gestion des permissions" },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description:
      "Des fondations fiables pour déployer et faire évoluer le projet.",
    icon: Server,
    technologies: [
      { name: "PostgreSQL", detail: "Base de données" },
      { name: "Docker", detail: "Conteneurisation" },
      { name: "Git", detail: "Versionnement du code" },
      { name: "CI/CD", detail: "Automatisation du déploiement" },
    ],
  },
] as const;

const STYLES = {
  application: {
    card: "border-brand-1/25 bg-gradient-to-b from-brand-1/[0.07] to-card hover:border-brand-1/50",
    header: "bg-brand-1/[0.08]",
    circleLg: "bg-brand-1/15 group-hover:bg-brand-1/25",
    circleSm: "bg-brand-1/20 group-hover:bg-brand-1/30",
    circleRing: "border-brand-1/20",
    icon: "border-brand-1/30 bg-brand-1 text-brand-1-foreground",
    bar: "bg-gradient-to-r from-brand-1 to-brand-1/30",
    row: "hover:bg-brand-1/[0.07]",
    tile: "border-brand-1/20 bg-brand-1/10 text-brand-1 group-hover/item:bg-brand-1 group-hover/item:text-brand-1-foreground",
    arrow: "group-hover/item:text-brand-1",
    footer: "bg-brand-1/[0.06]",
    badge: "border-brand-1/20 bg-brand-1/10 text-brand-1",
  },
  authentication: {
    card: "border-brand-2/25 bg-gradient-to-b from-brand-2/[0.07] to-card hover:border-brand-2/50",
    header: "bg-brand-2/[0.08]",
    circleLg: "bg-brand-2/15 group-hover:bg-brand-2/25",
    circleSm: "bg-brand-2/20 group-hover:bg-brand-2/30",
    circleRing: "border-brand-2/20",
    icon: "border-brand-2/30 bg-brand-2 text-brand-2-foreground",
    bar: "bg-gradient-to-r from-brand-2 to-brand-2/30",
    row: "hover:bg-brand-2/[0.07]",
    tile: "border-brand-2/20 bg-brand-2/10 text-brand-2 group-hover/item:bg-brand-2 group-hover/item:text-brand-2-foreground",
    arrow: "group-hover/item:text-brand-2",
    footer: "bg-brand-2/[0.06]",
    badge: "border-brand-2/20 bg-brand-2/10 text-brand-2",
  },
  infrastructure: {
    card: "border-brand-3/30 bg-gradient-to-b from-brand-3/[0.10] to-card hover:border-brand-3/60",
    header: "bg-brand-3/[0.10]",
    circleLg: "bg-brand-3/15 group-hover:bg-brand-3/25",
    circleSm: "bg-brand-3/20 group-hover:bg-brand-3/30",
    circleRing: "border-brand-3/25",
    icon: "border-brand-3/40 bg-brand-3 text-brand-3-foreground",
    bar: "bg-gradient-to-r from-brand-3 to-brand-3/30",
    row: "hover:bg-brand-3/[0.10]",
    tile: "border-brand-3/30 bg-brand-3/15 text-foreground group-hover/item:bg-brand-3 group-hover/item:text-brand-3-foreground",
    arrow: "group-hover/item:text-foreground",
    footer: "bg-brand-3/[0.08]",
    badge: "border-brand-3/30 bg-brand-3/15 text-foreground",
  },
} as const;

type TechGroupId = keyof typeof STYLES;

export function TechStack() {
  return (
    <section
      id="technologies"
      className="bg-card relative isolate mt-10 overflow-hidden sm:mt-16"
    >
      {/* Décorations d'arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* <div
          className="absolute inset-0
            bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]
            mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]
            bg-size-[4rem_4rem] opacity-20"
        /> */}

        {/* Tracés futuristes aux coins */}
        <svg
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          className="text-primary absolute inset-0 size-full"
          fill="none"
        >
          <defs>
            <linearGradient
              id="tech-corner-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <g
            stroke="url(#tech-corner-gradient)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M0 150 V32 Q0 0 32 0 H205" />
            <path d="M0 100 H18 V58 H58 V18 H105" />
            <path d="M795 700 H968 Q1000 700 1000 668 V550" />
            <path d="M895 700 V682 H942 V642 H982" />
          </g>

          <g fill="currentColor">
            <circle cx="105" cy="18" r="3" opacity="0.65" />
            <circle cx="895" cy="700" r="3" opacity="0.65" />
          </g>
        </svg>
      </div>

      {/* Contenu */}
      <div
        className="relative container mx-auto px-4 py-5 sm:px-6 lg:px-8
          lg:py-10"
      >
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="TECH STACK"
            title="Des technologies modernes."
            description="Une architecture pensée pour développer des applications robustes, maintenables et évolutives."
          />
        </div>

        {/* Indicateur de disponibilité */}
        <div className="mt-8 flex justify-center">
          <div
            className="border-border bg-muted text-foreground flex w-fit
              shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm
              font-medium"
          >
            <Check className="size-4" />
            Prête à démarrer
          </div>
        </div>

        {/* Cartes des catégories */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group) => {
            const style = STYLES[group.id as TechGroupId];
            const GroupIcon = group.icon;

            return (
              <article
                key={group.id}
                className={`group relative flex h-full flex-col overflow-hidden
                rounded-2xl border transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl ${style.card}`}
              >
                {/* Décoration supérieure */}
                <div
                  aria-hidden="true"
                  className={`border-border/50 relative flex min-h-36
                  items-center justify-between overflow-hidden border-b p-6
                  ${style.header}`}
                >
                  <div className="relative z-10">
                    <div
                      className={`flex size-14 items-center justify-center
                      rounded-2xl border shadow-sm transition-transform
                      duration-300 group-hover:scale-105 ${style.icon}`}
                    >
                      <GroupIcon className="size-7" />
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className="text-muted-foreground text-xs font-semibold
                          tracking-[0.2em] uppercase"
                      >
                        Stack
                      </span>
                      <span className="bg-border h-px w-8" />
                      <span
                        className="text-muted-foreground text-xs font-medium"
                      >
                        {String(group.technologies.length).padStart(2, "0")}{" "}
                        technologies
                      </span>
                    </div>
                  </div>

                  {/* Cercles décoratifs */}
                  <div
                    className="pointer-events-none absolute -top-8 -right-5
                      size-36"
                  >
                    <div
                      className={`absolute inset-0 rounded-full
                      transition-colors duration-300 ${style.circleLg}`}
                    />
                    <div
                      className={`absolute inset-5 rounded-full border
                      ${style.circleRing}`}
                    />
                    <div
                      className={`absolute inset-10 rounded-full
                      transition-colors duration-300 ${style.circleSm}`}
                    />
                  </div>

                  <Layers3
                    aria-hidden="true"
                    className="text-muted-foreground/60 absolute right-5
                      bottom-5 size-5"
                  />
                </div>

                {/* En-tête de la carte */}
                <div className="p-6 pb-4">
                  <h3
                    className="text-card-foreground text-xl font-semibold
                      tracking-tight"
                  >
                    {group.title}
                  </h3>

                  <p
                    className="text-muted-foreground mt-2 min-h-12 text-sm
                      leading-6"
                  >
                    {group.description}
                  </p>

                  <div
                    className="bg-muted mt-5 h-1 overflow-hidden rounded-full"
                  >
                    <div
                      className={`h-full w-2/3 rounded-full transition-all
                      duration-500 group-hover:w-full ${style.bar}`}
                    />
                  </div>
                </div>

                {/* Liste des technologies */}
                <div className="flex-1 px-3 pb-3">
                  <ul className="space-y-1">
                    {group.technologies.map((technology) => (
                      <li key={technology.name}>
                        <div
                          className={`group/item flex items-center gap-3
                          rounded-xl p-3 transition-colors duration-200
                          ${style.row}`}
                        >
                          <div
                            className={`flex size-10 shrink-0 items-center
                            justify-center rounded-xl border transition-all
                            duration-200 ${style.tile}`}
                          >
                            <Boxes className="size-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p
                              className="text-card-foreground truncate text-sm
                                font-semibold"
                            >
                              {technology.name}
                            </p>
                            <p
                              className="text-muted-foreground mt-0.5 truncate
                                text-xs"
                            >
                              {technology.detail}
                            </p>
                          </div>

                          <ArrowUpRight
                            aria-hidden="true"
                            className={`text-muted-foreground/60 size-4 shrink-0
                            transition-all duration-200
                            group-hover/item:translate-x-0.5
                            group-hover/item:-translate-y-0.5 ${style.arrow}`}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pied de carte */}
                <div
                  className={`border-border/50 mt-auto flex items-center
                  justify-between gap-3 border-t px-6 py-4 ${style.footer}`}
                >
                  <span
                    className="text-muted-foreground flex items-center gap-2
                      text-xs font-medium"
                  >
                    <Workflow className="size-4" />
                    Intégration prévue
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs
                    font-semibold ${style.badge}`}
                  >
                    Compatible
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Résumé des catégories */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span
            className="border-brand-1/20 bg-brand-1/10 text-brand-1 flex
              items-center gap-2 rounded-full border px-3 py-2 text-xs
              font-medium"
          >
            <Boxes className="size-4" />
            Frontend
          </span>

          <span
            className="border-brand-2/20 bg-brand-2/10 text-brand-2 flex
              items-center gap-2 rounded-full border px-3 py-2 text-xs
              font-medium"
          >
            <Database className="size-4" />
            Backend &amp; Data
          </span>

          <span
            className="border-brand-3/30 bg-brand-3/15 text-foreground flex
              items-center gap-2 rounded-full border px-3 py-2 text-xs
              font-medium"
          >
            <Server className="size-4" />
            Infrastructure
          </span>

          <span
            className="border-primary/20 bg-primary/10 text-primary flex
              items-center gap-2 rounded-full border px-3 py-2 text-xs
              font-medium"
          >
            <Palette className="size-4" />
            UI &amp; Design
          </span>
        </div>
      </div>
    </section>
  );
}
