import { AppWindow, Database, Server, ArrowUpRight } from "lucide-react";

import KitLogo from "@/components/common/KitLogo";

const layers = [
  {
    label: "Interface utilisateur",
    name: "Next.js",
    description: "Expérience web moderne",
    Icon: AppWindow,
    color: "bg-primary-foreground/15 text-primary-foreground",
    number: "bg-accent text-accent-foreground",
    card: "border-primary-foreground/20 bg-primary-foreground/10",
  },
  {
    label: "API & logique métier",
    name: "Spring Boot",
    description: "Services et traitement",
    Icon: Server,
    color: "bg-secondary text-secondary-foreground",
    number: "bg-secondary text-secondary-foreground",
    card: "border-secondary/40 bg-secondary/15",
  },
  {
    label: "Stockage des données",
    name: "PostgreSQL",
    description: "Données fiables et structurées",
    Icon: Database,
    color: "bg-chart-2 text-primary-foreground",
    number: "bg-chart-2 text-primary-foreground",
    card: "border-chart-2/40 bg-chart-2/15",
  },
];

export default function AuthBranding() {
  return (
    <aside
      className="border-primary-foreground/10 bg-primary text-primary-foreground
        relative isolate hidden w-1/2 flex-col justify-between overflow-hidden
        border-r p-10 lg:flex xl:p-12"
    >
      {/* Cercles décoratifs de tailles variées */}
      <div
        aria-hidden="true"
        className="border-primary-foreground/15 pointer-events-none absolute
          -top-36 -right-28 -z-10 size-95 rounded-full border"
      />

      <div
        aria-hidden="true"
        className="border-accent/35 pointer-events-none absolute -top-20
          -right-12 -z-10 size-62.5 rounded-full border"
      />

      <div
        aria-hidden="true"
        className="border-secondary/50 pointer-events-none absolute top-28
          right-16 -z-10 size-20 rounded-full border"
      />

      <div
        aria-hidden="true"
        className="bg-accent/60 pointer-events-none absolute top-48 right-8
          -z-10 size-8 rounded-full"
      />

      <div
        aria-hidden="true"
        className="border-primary-foreground/15 pointer-events-none absolute
          -bottom-40 -left-32 -z-10 size-105 rounded-full border"
      />

      <div
        aria-hidden="true"
        className="border-chart-2/40 pointer-events-none absolute bottom-24
          left-20 -z-10 size-24 rounded-full border"
      />

      <div
        aria-hidden="true"
        className="bg-secondary/30 pointer-events-none absolute bottom-32
          left-28 -z-10 size-10 rounded-full blur-xl"
      />

      {/* Motif de points */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(var(--primary-foreground)_1px,transparent_1px)]
          mask-[radial-gradient(ellipse_at_top_right,black,transparent_70%)]
          bg-size-[25px_25px] opacity-15"
      />

      {/* Présentation */}
      <div className="relative z-10 flex flex-col gap-8 xl:gap-10">
        <div className="max-w-lg space-y-5">
          <div
            className="border-primary-foreground/20 bg-primary-foreground/10
              inline-flex items-center gap-2 rounded-full border px-3 py-1.5
              text-xs font-medium tracking-wide"
          >
            <span className="bg-secondary size-2 rounded-full" />
            [ELANRIF] · DEVELOPER STARTER KIT
          </div>

          <h2
            className="font-heading text-4xl leading-[1.1] font-bold
              tracking-tight text-balance xl:text-5xl"
          >
            Votre prochain projet
            <span className="text-primary-foreground/75"> démarre ici.</span>
          </h2>

          <p
            className="text-primary-foreground/75 max-w-md text-sm leading-7
              xl:text-base"
          >
            Une fondation technique prête à l’emploi pour créer des applications
            fullstack modernes, évolutives et maintenables.
          </p>
        </div>

        {/* Architecture technique */}
        <div className="max-w-md space-y-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold">Architecture technique</p>

            <span
              className="border-primary-foreground/15 bg-primary-foreground/10
                text-primary-foreground/80 rounded-full border px-2.5 py-1
                text-xs"
            >
              Fullstack
            </span>
          </div>

          {layers.map(
            (
              { label, name, description, Icon, color, number, card },
              index,
            ) => (
              <div
                key={name}
                className={`group hover:bg-primary-foreground/15 flex
                items-center gap-4 rounded-2xl border p-4 transition-colors
                duration-200 ${card}`}
              >
                <div
                  className={`flex size-11 shrink-0 items-center justify-center
                  rounded-xl ${color}`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-primary-foreground/70 text-xs">{label}</p>

                  <p className="font-heading mt-0.5 text-base font-semibold">
                    {name}
                  </p>

                  <p className="text-primary-foreground/65 mt-0.5 text-xs">
                    {description}
                  </p>
                </div>

                <div
                  className={`flex size-7 shrink-0 items-center justify-center
                  rounded-full text-xs font-semibold ${number}`}
                >
                  {index + 1}
                </div>
              </div>
            ),
          )}
        </div>

        {/* Résumé de l'architecture */}
        <div
          className="border-primary-foreground/15 bg-primary-foreground/6 flex
            max-w-md items-center gap-3 rounded-xl border px-4 py-3"
        >
          <div className="flex -space-x-2">
            <span
              className="border-primary bg-primary-foreground/15
                text-primary-foreground flex size-7 items-center justify-center
                rounded-full border-2"
            >
              <AppWindow className="size-3.5" />
            </span>

            <span
              className="border-primary bg-secondary text-secondary-foreground
                flex size-7 items-center justify-center rounded-full border-2"
            >
              <Server className="size-3.5" />
            </span>

            <span
              className="border-primary bg-chart-2 text-primary-foreground flex
                size-7 items-center justify-center rounded-full border-2"
            >
              <Database className="size-3.5" />
            </span>
          </div>

          <p className="text-primary-foreground/75 flex-1 text-xs leading-5">
            Trois couches, une architecture cohérente.
          </p>

          <ArrowUpRight
            className="text-secondary size-4 shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Pied de panneau */}
      <div
        className="border-primary-foreground/15 relative z-10 flex flex-wrap
          items-center justify-between gap-3 border-t pt-5"
      >
        <p className="text-primary-foreground/70 text-xs">
          Starter kit fullstack
        </p>

        <div
          className="text-primary-foreground/70 flex items-center gap-2 text-xs"
        >
          <span className="bg-secondary size-1.5 rounded-full" />
          Next.js · Spring Boot · PostgreSQL
        </div>
      </div>
    </aside>
  );
}
