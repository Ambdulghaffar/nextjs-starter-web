import {
  ArrowDown,
  ArrowRight,
  Code2,
  Database,
  Rocket,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    number: "01",
    title: "Cloner les deux dépôts",
    text: "Récupérez le frontend et le backend du kit, chacun dans son dépôt.",
    command: "git clone",
    icon: Code2,
    className: "border-primary/25 bg-primary/10 text-primary",
  },
  {
    number: "02",
    title: "Configurer l'environnement",
    text: "Renseignez vos variables d'environnement et configurez la connexion à votre base de données.",
    command: ".env",
    icon: Database,
    className: "border-brand-1 bg-brand-1/10 text-brand-1",
  },
  {
    number: "03",
    title: "Lancer en local",
    text: "Démarrez l'API puis l'interface. Votre base applicative et son authentification sont prêtes à être testées.",
    command: "localhost",
    icon: Workflow,
    className: "border-brand-2 bg-brand-2/10 text-brand-2",
  },
  {
    number: "04",
    title: "Construire votre produit",
    text: "Développez vos écrans et vos endpoints sur une architecture déjà structurée.",
    command: "Your product starts here",
    icon: Rocket,
    className: "border-brand-3 bg-brand-3/10 text-brand-3",
  },
];

export function HowItWorks() {
  return (
    <section
      id="comment"
      aria-labelledby="how-it-works-title"
      className="bg-background scroll-mt-16 overflow-hidden"
    >
      <div
        className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:gap-14
          lg:gap-16 lg:px-8"
      >
        <SectionHeading
          eyebrow="Mise en route · Developer journey"
          title="De votre environnement à votre produit."
          description="Quatre étapes pour passer d'un starter kit à une application prête à évoluer."
        />

        <ol
          className="grid gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10
            lg:grid-cols-4 lg:gap-0"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <li
                key={step.number}
                className="group relative flex min-w-0 flex-col"
              >
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="bg-border absolute top-[58px] bottom-0
                      left-[25px] w-px sm:hidden"
                  />
                )}

                <div className="relative flex items-center gap-4 pb-6 lg:pb-8">
                  <div
                    className={cn(
                      `border-border bg-card text-muted-foreground relative z-10
                      flex size-[52px] shrink-0 items-center justify-center
                      rounded-2xl border transition-colors duration-200`,
                      `group-hover:border-primary/40 group-hover:bg-primary/10
                      group-hover:text-primary`,
                      step.className,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span
                      className={cn(
                        `text-primary font-mono text-sm font-semibold
                        tracking-wider`,
                        step.className,
                      )}
                    >
                      {step.number}
                    </span>

                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="bg-border hidden h-px flex-1 lg:block"
                      />
                    )}
                  </div>

                  {!isLast && (
                    <ArrowDown
                      aria-hidden="true"
                      className="text-muted-foreground absolute top-[68px]
                        left-[19px] z-10 size-3.5 sm:hidden"
                    />
                  )}

                  {!isLast && (
                    <ArrowRight
                      aria-hidden="true"
                      className="text-muted-foreground/50 absolute top-[18px]
                        right-4 hidden size-4 lg:block"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col pl-[68px] sm:pl-0">
                  <h3
                    className="text-foreground group-hover:text-primary text-lg
                      font-semibold tracking-tight transition-colors sm:min-h-14
                      lg:pr-5"
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-muted-foreground mt-3 text-sm leading-6
                      sm:min-h-24 lg:pr-6"
                  >
                    {step.text}
                  </p>

                  <div
                    className="border-border bg-muted/50 text-muted-foreground
                      mt-5 flex max-w-full items-center gap-2 self-start
                      rounded-md border px-2.5 py-1.5 font-mono text-xs"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-primary size-1.5 shrink-0 rounded-full"
                    />
                    <span className={`break-all ${step.className}`}>
                      {step.command}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div
          className="border-border flex flex-col gap-4 border-t pt-7 sm:flex-row
            sm:items-center sm:justify-between"
        >
          <p className="text-muted-foreground max-w-xl text-sm leading-6">
            Moins de temps consacré au démarrage, plus de temps pour développer
            ce qui rend votre produit unique.
          </p>

          <a
            href="#contact"
            className="text-primary hover:text-primary/80
              focus-visible:ring-ring focus-visible:ring-offset-background
              inline-flex items-center gap-2 self-start text-sm font-medium
              transition-colors focus-visible:ring-2 focus-visible:ring-offset-4
              focus-visible:outline-none sm:self-auto"
          >
            <span>Prêt à commencer ?</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
