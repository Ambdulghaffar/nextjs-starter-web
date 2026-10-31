import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  GitBranch,
  Layers3,
  LockKeyhole,
  Network,
  Server,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const technologies = [
  {
    name: "Next.js",
    detail: "Frontend",
    Icon: Code2,
    card: "border-t-brand-1/60 hover:border-brand-1/40 hover:border-t-brand-1",
    tile: "bg-brand-1/10 text-brand-1 group-hover:bg-brand-1 group-hover:text-brand-1-foreground",
  },
  {
    name: "Spring Boot",
    detail: "Backend API",
    Icon: Server,
    card: "border-t-brand-2/60 hover:border-brand-2/40 hover:border-t-brand-2",
    tile: "bg-brand-2/10 text-brand-2 group-hover:bg-brand-2 group-hover:text-brand-2-foreground",
  },
  {
    name: "PostgreSQL",
    detail: "Database",
    Icon: Database,
    card: "border-t-brand-3/60 hover:border-brand-3/40 hover:border-t-brand-3",
    tile: "bg-brand-3/10 text-brand-3 group-hover:bg-brand-3 group-hover:text-brand-3-foreground",
  },
];

const features = [
  {
    label: "Authentification intégrée",
    tone: "bg-brand-1/80 text-brand-1-foreground",
  },
  {
    label: "Architecture frontend / backend",
    tone: "bg-brand-2/80 text-brand-2-foreground",
  },
  {
    label: "Thèmes clair et sombre",
    tone: "bg-brand-3/80 text-brand-3-foreground",
  },
];

function ArchitectureVisual() {
  return (
    <div className="relative mx-auto w-full max-w-150">
      <div className="relative rounded-3xl p-px shadow-2xl">
        <div className="bg-card relative overflow-hidden rounded-3xl">
          <div
            className="border-border/70 flex items-center justify-between
              border-b px-5 py-4 sm:px-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="bg-primary/10 text-primary flex size-9 items-center
                  justify-center rounded-xl"
              >
                <Network className="size-4" />
              </div>

              <div>
                <p className="text-card-foreground text-sm font-semibold">
                  System architecture
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Elanrif / Fullstack kit
                </p>
              </div>
            </div>

            <div
              className="border-primary/25 bg-primary/10 flex items-center gap-2
                rounded-full border px-3 py-1.5"
            >
              <span className="bg-primary size-1.5 rounded-full" />
              <span className="text-primary text-xs">Connected</span>
            </div>
          </div>

          <div
            className="relative isolate overflow-hidden px-4 py-7 sm:px-7
              sm:py-8"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 500 390"
              fill="none"
              className="text-primary/40 pointer-events-none absolute inset-0
                size-full"
              preserveAspectRatio="none"
            >
              <path
                d="M250 105 V145 H125 V180 M250 145 H375 V180 M125 270 V305 H250 V330 M375 270 V305 H250"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              <circle cx="250" cy="145" r="4" fill="currentColor" />
              <circle cx="125" cy="305" r="3" fill="currentColor" />
              <circle cx="375" cy="305" r="3" fill="currentColor" />
            </svg>

            <div
              className="relative mx-auto flex max-w-[440px] flex-col
                items-center"
            >
              <div
                className="border-primary/30 bg-card relative z-10 flex
                  items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg
                  sm:px-5"
              >
                <div
                  className="bg-primary text-primary-foreground flex size-10
                    items-center justify-center rounded-xl shadow-md"
                >
                  <Layers3 className="size-5" />
                </div>

                <div>
                  <p className="text-foreground text-sm font-semibold">
                    Elanrif Starter
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Unified application core
                  </p>
                </div>

                <Sparkles className="text-primary ml-1 size-4" />
              </div>

              <div className="my-5 flex w-full items-center gap-3">
                <span className="bg-border h-px flex-1" />
                <span
                  className="border-brand-2/25 bg-brand-2/10 text-brand-2
                    rounded-full border px-3 py-1 text-[10px] font-semibold
                    tracking-[0.2em] uppercase"
                >
                  Connected layers
                </span>
                <span className="bg-border h-px flex-1" />
              </div>

              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                {technologies.map(
                  ({ name, detail, Icon, card, tile }, index) => (
                    <div
                      key={name}
                      className={`group border-border/80 bg-card/95 rounded-2xl
                      border border-t-2 p-4 transition-all duration-200
                      hover:-translate-y-1 hover:shadow-lg ${card}`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex size-10 items-center justify-center
                          rounded-xl transition-colors ${tile}`}
                        >
                          <Icon className="size-[18px]" />
                        </div>

                        <span
                          className="text-muted-foreground/70 font-mono
                            text-[10px]"
                        >
                          0{index + 1}
                        </span>
                      </div>

                      <p className="text-foreground mt-4 text-sm font-semibold">
                        {name}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {detail}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <div
                className="border-border/70 bg-muted/50 mt-5 flex w-full
                  items-center justify-between rounded-xl border px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <GitBranch className="text-primary size-4" />
                  <span className="text-foreground text-xs font-medium">
                    Data flow
                  </span>
                </div>

                <div
                  className="text-muted-foreground flex items-center gap-2
                    text-xs"
                >
                  <span className="bg-primary size-1.5 rounded-full" />
                  API ready
                </div>
              </div>
            </div>
          </div>

          <div
            className="border-border/70 flex flex-wrap items-center
              justify-between gap-3 border-t px-5 py-3.5 sm:px-6"
          >
            <div
              className="text-muted-foreground flex items-center gap-2 text-xs"
            >
              <Terminal className="size-3.5" />
              <span>Developer workflow</span>
            </div>

            <span className="text-primary font-mono text-[10px]">
              READY_TO_BUILD
            </span>
          </div>
        </div>
      </div>

      {/* Carte flottante : bordure brand-3 */}
      <div
        className="border-brand-3/50 bg-card absolute -bottom-5 -left-2 flex
          items-center gap-3 rounded-2xl border p-3.5 shadow-xl sm:-left-6
          sm:p-4"
      >
        <div
          className="bg-brand-3/15 text-foreground flex size-10 items-center
            justify-center rounded-xl"
        >
          <Zap className="size-5" />
        </div>

        <div>
          <p className="text-foreground text-sm font-semibold">Start faster</p>
          <p className="text-muted-foreground text-xs">Focus on what matters</p>
        </div>

        <ArrowUpRight className="text-primary ml-1 size-4" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="accueil"
      className="bg-muted-foreground/5 relative isolate m-3 overflow-hidden
        rounded-3xl border sm:m-4"
    >
      {/* Futuristic frame — corners only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden
          rounded-[inherit]"
      >
        {/* Tracé technique des deux coins */}
        <svg
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          fill="none"
          className="text-primary absolute inset-0 size-full"
        >
          <defs>
            <linearGradient id="hero-frame-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity=".95" />
              <stop offset="55%" stopColor="currentColor" stopOpacity=".45" />
              <stop offset="100%" stopColor="currentColor" stopOpacity=".08" />
            </linearGradient>
          </defs>

          {/* Coin supérieur gauche */}
          <path
            d="M 1 150 V 34 Q 1 1 34 1 H 185
         L 205 21 H 258"
            stroke="url(#hero-frame-glow)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M 1 105 V 58 Q 1 35 24 35 H 90"
            stroke="currentColor"
            strokeOpacity=".3"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M 34 1 V 8 M 185 1 L 205 21"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <circle cx="90" cy="35" r="2.5" fill="currentColor" />
          <circle
            cx="258"
            cy="21"
            r="2"
            fill="currentColor"
            fillOpacity=".65"
          />

          {/* Coin inférieur droit */}
          <path
            d="M 999 550 V 666 Q 999 699 966 699 H 815
         L 795 679 H 742"
            stroke="url(#hero-frame-glow)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M 999 595 V 642 Q 999 665 976 665 H 910"
            stroke="currentColor"
            strokeOpacity=".3"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d="M 966 699 V 692 M 815 699 L 795 679"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <circle cx="910" cy="665" r="2.5" fill="currentColor" />
          <circle
            cx="742"
            cy="679"
            r="2"
            fill="currentColor"
            fillOpacity=".65"
          />
        </svg>
      </div>

      {/* Fond : 9 cercles (grands, moyens, petits, pleins et en contour) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Grands cercles flous */}
        <div
          className="bg-primary/20 absolute top-10 left-[4%] size-[28rem]
            rounded-full"
        />
        <div
          className="bg-brand-2/20 absolute top-1/3 right-[3%] size-[24rem]
            rounded-full"
        />

        {/* Grands cercles en contour */}
        <div
          className="border-primary/30 absolute top-16 right-[30%] size-72
            rounded-full border-2"
        />
        <div
          className="border-brand-2/30 absolute bottom-20 left-[8%] size-80
            rounded-full border-2"
        />

        {/* Cercle moyen */}
        <div
          className="bg-brand-1/20 absolute right-[28%] bottom-32 size-40
            rounded-full"
        />

        {/* Petits cercles pleins */}
        <div
          className="bg-primary/40 absolute top-36 left-[44%] size-8
            rounded-full"
        />
        <div
          className="bg-brand-3/60 absolute top-[58%] right-10 size-6
            rounded-full"
        />
        <div
          className="bg-brand-1/40 absolute bottom-44 left-12 size-10
            rounded-full"
        />

        {/* Petit cercle en contour */}
        <div
          className="border-brand-3/40 absolute top-1/2 left-[30%] size-16
            rounded-full border-2"
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 sm:pt-28">
        <div
          className="border-border/70 mb-12 flex flex-wrap items-center
            justify-between gap-4 border-b pb-5"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="bg-brand-3 text-brand-3-foreground flex size-8
                items-center justify-center rounded-lg"
            >
              <Braces className="size-4" />
            </div>

            <span
              className="text-brand-3-foreground text-sm font-semibold
                tracking-tight"
            >
              ELANRIF
              <span className="text-muted-foreground ml-2 font-normal">
                / Developer tools
              </span>
            </span>
          </div>

          <div
            className="text-muted-foreground flex items-center gap-2 text-xs
              sm:text-sm"
          >
            <span className="bg-brand-3 size-1.5 rounded-full" />
            Built for developers
          </div>
        </div>

        <div
          className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-12 xl:gap-16"
        >
          <div className="relative z-10 max-w-2xl">
            <div
              className="border-brand-1/20 bg-brand-1 text-brand-1-foreground
                inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2
                text-xs font-medium sm:text-sm"
            >
              <Sparkles className="size-3.5" />
              <span>Elanrif Developer Starter Kit</span>
              <span className="bg-brand-1/30 h-3.5 w-px" />
              <span>v1.0</span>
            </div>

            <h1
              className="text-foreground mt-8 text-5xl leading-[1.04]
                font-semibold tracking-[-0.055em] text-balance sm:text-6xl
                lg:text-7xl xl:text-[5.4rem]"
            >
              Votre prochain projet.
              <span className="text-primary mt-2 block">
                Déjà en mouvement.
              </span>
            </h1>

            <p
              className="text-muted-foreground mt-7 max-w-xl text-base leading-8
                text-pretty sm:text-lg"
            >
              L’essentiel est déjà en place. Démarrez avec un frontend Next.js,
              une API Spring Boot et une base PostgreSQL, puis consacrez votre
              énergie à ce qui rend votre projet unique.
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground
                  hover:bg-primary/90 h-12 rounded-xl px-6 shadow-lg
                  transition-all hover:-translate-y-0.5"
              >
                <Link href="#contact">
                  Construire mon projet
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border-brand-1/40 text-foreground
                  hover:border-brand-1 hover:bg-accent
                  hover:text-accent-foreground h-12 rounded-xl border px-5"
              >
                <Link href="#architecture">
                  Explorer l’architecture
                  <ArrowDownRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div
              className="border-border/70 mt-9 flex flex-col gap-3 border-t
                pt-6"
            >
              {features.map(({ label, tone }) => (
                <div
                  key={label}
                  className="text-muted-foreground flex items-center gap-3
                    text-sm"
                >
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center
                    rounded-full ${tone}`}
                  >
                    <Check className="size-3" />
                  </span>
                  {label}
                </div>
              ))}
            </div>

            <div
              className="text-muted-foreground mt-9 flex items-center gap-3
                text-xs"
            >
              <LockKeyhole className="text-primary size-4" />
              <span>Une base structurée pour évoluer sereinement.</span>
            </div>
          </div>

          <div
            id="architecture"
            className="relative px-1 pt-2 pb-7 sm:px-4 lg:px-0"
          >
            <ArchitectureVisual />
          </div>
        </div>

        <div
          className="border-border/70 mt-24 flex flex-col gap-4 border-t pt-6
            sm:flex-row sm:items-center sm:justify-between"
        >
          <p
            className="text-muted-foreground text-xs font-medium
              tracking-[0.18em] uppercase"
          >
            The foundation is ready. Make it yours.
          </p>

          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <span className="text-primary font-mono">01</span>
            <span className="bg-primary/40 h-px w-10" />
            <span>Architecture · Code · Possibilities</span>
          </div>
        </div>
      </div>
    </section>
  );
}
