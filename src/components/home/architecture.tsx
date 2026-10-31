import {
  AppWindow,
  ArrowDown,
  ArrowRight,
  Database,
  GitBranch,
  GitMerge,
  Globe,
  Layers,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const flow = [
  {
    label: "01 / ENTRÉE",
    name: "Navigateur",
    technology: "Client",
    Icon: Globe,
    variant: "neutral",
    className: "border-muted-foreground/50 bg-muted/10 text-muted-foreground",
  },
  {
    label: "02 / INTERFACE",
    name: "Next.js",
    technology: "Frontend",
    Icon: AppWindow,
    variant: "highlight",
    className: "border-brand-2/20 bg-brand-2/10 text-brand-2",
  },
  {
    label: "03 / SERVICES",
    name: "API Spring Boot",
    technology: "Backend",
    Icon: Server,
    variant: "primary",
    className: "border-primary bg-primary text-primary-foreground",
  },
  {
    label: "04 / STOCKAGE",
    name: "PostgreSQL",
    technology: "Données",
    Icon: Database,
    variant: "neutral",
    className: "border-accent bg-accent text-accent-foreground",
  },
] as const;

const cards = [
  {
    number: "01",
    title: "Branche staging",
    text: "Validez vos changements dans un environnement de préparation avant de les intégrer à main.",
    detail: "VALIDATION",
    Icon: GitBranch,
    className:
      "border-muted-foreground/20 bg-muted/10 text-muted-foreground hover:border-muted-foreground/40 hover:bg-muted/20 hover:text-muted-foreground",
  },
  {
    number: "02",
    title: "Branche main",
    text: "Conservez une version stable du projet, prête à être déployée.",
    detail: "PRODUCTION",
    Icon: GitMerge,
    className:
      "border-primary/20 bg-primary/10 text-primary-foregroundy hover:border-primary/40 hover:bg-primary/20 hover:text-primary-foreground",
  },
  {
    number: "03",
    title: "Un dépôt par couche",
    text: "Faites évoluer le frontend et le backend indépendamment, avec leurs propres cycles de déploiement.",
    detail: "MODULARITÉ",
    Icon: Layers,
    className:
      "border-brand-1/20 bg-brand-1/10 text-brand-1-foreground hover:border-brand-1/40 hover:bg-brand-1/20 hover:text-brand-1-foreground",
  },
];

export function Architecture() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-title"
      className="bg-muted/40 scroll-mt-16 overflow-hidden"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">
        <SectionHeading
          eyebrow="Architecture · Vue d'ensemble"
          title="Une architecture claire."
          description="Des responsabilités distinctes, un flux maîtrisé et une base conçue pour évoluer."
        />

        {/* Flux applicatif */}
        <div
          className="border-border bg-card relative overflow-hidden rounded-3xl
            border"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-muted-foreground) 0.7px, transparent 0.7px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div
            className="border-border relative flex flex-col gap-3 border-b px-5
              py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          >
            <div className="flex items-center gap-3">
              <div
                className="border-border bg-background flex size-9 items-center
                  justify-center rounded-xl border"
              >
                <Layers className="text-primary size-4" aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-foreground text-sm font-semibold">
                  Flux applicatif
                </h3>
                <p className="text-muted-foreground text-xs">
                  De la requête au stockage
                </p>
              </div>
            </div>

            <div
              className="border-border bg-background flex items-center gap-2
                self-start rounded-full border px-3 py-1.5 sm:self-auto"
            >
              <span
                aria-hidden="true"
                className="bg-primary size-1.5 rounded-full"
              />

              <span
                className="text-muted-foreground font-mono text-[10px]
                  tracking-wider"
              >
                4 COUCHES
              </span>
            </div>
          </div>

          <div
            className="relative grid grid-cols-1 gap-0 p-4 sm:p-6
              lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]
              lg:items-stretch lg:gap-3"
          >
            {flow.map((item, index) => {
              const Icon = item.Icon;
              const isPrimary = item.variant === "primary";
              const isHighlighted = item.variant === "highlight";

              return (
                <div key={item.name} className="contents">
                  <div
                    className={cn(
                      `group flex min-w-0 items-center gap-4 rounded-2xl border
                      p-4 transition-colors duration-200 sm:p-5 lg:flex-col
                      lg:items-start lg:justify-between lg:gap-8`,
                      item.className,
                    )}
                  >
                    <div
                      className="flex min-w-0 flex-1 items-center gap-4
                        lg:w-full lg:flex-col lg:items-start"
                    >
                      <div
                        className={cn(
                          `flex size-11 shrink-0 items-center justify-center
                          rounded-xl border`,
                          item.variant === "neutral" &&
                            "border-border bg-muted/60 text-foreground",
                          isHighlighted &&
                            "border-primary/15 bg-primary/10 text-primary",
                          isPrimary &&
                            `border-primary-foreground/20
                            bg-primary-foreground/10 text-primary-foreground`,
                          item.className,
                        )}
                      >
                        <Icon
                          className="size-5"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0">
                        <p
                          className={cn(
                            `mb-1 font-mono text-[9px] tracking-[0.12em]
                            sm:text-[10px]`,
                            isPrimary
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground",
                          )}
                        >
                          {item.label}
                        </p>

                        <h4
                          className="text-base font-semibold tracking-tight
                            break-words sm:text-lg"
                        >
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    <div
                      className={cn(
                        `hidden w-full border-t pt-3 font-mono text-[10px]
                        lg:block`,
                        isPrimary
                          ? `border-primary-foreground/20
                            text-primary-foreground/70`
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {item.technology}
                    </div>

                    <span
                      className={cn(
                        "shrink-0 font-mono text-[10px] sm:text-xs lg:hidden",
                        isPrimary
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.technology}
                    </span>
                  </div>

                  {index < flow.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="flex h-9 items-center justify-center lg:h-auto"
                    >
                      <ArrowDown
                        className="text-primary size-4 sm:size-5 lg:hidden"
                      />
                      <ArrowRight
                        className="text-primary hidden size-4 lg:block"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="border-border bg-background/70 relative flex flex-col
              gap-2 border-t px-5 py-4 sm:flex-row sm:items-center
              sm:justify-between sm:px-7"
          >
            <p className="text-muted-foreground text-xs leading-5">
              Chaque couche possède une responsabilité distincte.
            </p>

            <span className="text-primary font-mono text-[10px] tracking-wide">
              SEPARATION OF CONCERNS
            </span>
          </div>
        </div>

        {/* Organisation du projet */}
        <div className="flex flex-col gap-6">
          <div
            className="flex flex-col gap-2 sm:flex-row sm:items-end
              sm:justify-between"
          >
            <div>
              <p
                className="text-primary font-mono text-[10px] tracking-[0.18em]"
              >
                WORKFLOW &amp; ORGANISATION
              </p>

              <h3
                className="text-foreground mt-2 text-xl font-semibold
                  tracking-tight sm:text-2xl"
              >
                Une base organisée pour travailler sereinement.
              </h3>
            </div>

            <p className="text-muted-foreground max-w-sm text-sm leading-6">
              Des conventions simples pour maîtriser les changements et les
              déploiements.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.Icon;

              return (
                <article
                  key={card.number}
                  className={cn(
                    `group border-border relative flex min-w-0 flex-col
                    overflow-hidden rounded-2xl border p-5 transition-colors
                    duration-200 sm:p-6`,
                    card.className,
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="text-primary font-mono text-xs tracking-wider"
                    >
                      {card.number}
                    </span>

                    <Icon
                      aria-hidden="true"
                      className="text-muted-foreground group-hover:text-primary
                        size-5 transition-colors"
                      strokeWidth={1.7}
                    />
                  </div>

                  <h4
                    className="text-foreground mt-7 text-lg font-semibold
                      tracking-tight"
                  >
                    {card.title}
                  </h4>

                  <p
                    className="text-muted-foreground mt-2 flex-1 text-sm
                      leading-6"
                  >
                    {card.text}
                  </p>

                  <div
                    className="border-border mt-6 flex items-center
                      justify-between gap-3 border-t pt-4"
                  >
                    <span
                      className="text-muted-foreground font-mono text-[10px]
                        tracking-[0.12em]"
                    >
                      {card.detail}
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className="text-primary size-4 transition-transform
                        group-hover:translate-x-1"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
