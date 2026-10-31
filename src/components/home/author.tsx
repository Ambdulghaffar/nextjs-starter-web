import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";

export function Author() {
  return (
    <section
      id="auteur"
      aria-labelledby="author-title"
      className="bg-background relative scroll-mt-16 overflow-hidden"
    >
      {/* Décoration d'arrière-plan */}
      <div
        aria-hidden="true"
        className="bg-primary/[0.06] pointer-events-none absolute top-0 right-0
          size-[420px] rounded-full blur-3xl"
      />

      <div
        className="relative mx-auto grid max-w-6xl items-center gap-12 px-4
          lg:grid-cols-[0.85fr_1.15fr] lg:gap-24"
      >
        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-[400px]">
          <div
            aria-hidden="true"
            className="border-primary/60 absolute -top-3 -left-3 size-24
              rounded-tl-3xl border-t-2 border-l-2 sm:-top-5 sm:-left-5"
          />

          <div
            aria-hidden="true"
            className="bg-primary/10 absolute -right-4 -bottom-4 h-2/3 w-2/3
              rounded-3xl"
          />

          <div
            className="border-border bg-muted relative aspect-[4/5]
              overflow-hidden rounded-2xl border"
          >
            <Image
              src="/images/author.jpg"
              alt="Portrait de EL-Anrif"
              fill
              priority={false}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 400px"
              className="object-cover transition-transform duration-700 ease-out
                hover:scale-[1.025] motion-reduce:transform-none"
            />

            {/* Identité sur la photo */}
            <div
              className="from-foreground/90 via-foreground/35 absolute inset-x-0
                bottom-0 bg-linear-to-t to-transparent p-5 pt-20 sm:p-6
                sm:pt-24"
            >
              <p
                className="text-background/70 font-mono text-[10px]
                  tracking-[0.2em]"
              >
                SOFTWARE ENGINEERING
              </p>

              <p
                className="text-background mt-1 text-xl font-semibold
                  tracking-tight"
              >
                EL-Anrif
              </p>
            </div>
          </div>

          {/* Étiquette flottante */}
          <div
            className="border-border bg-card/95 absolute top-7 -right-2 flex
              items-center gap-2 rounded-lg border px-3 py-2 shadow-lg
              backdrop-blur sm:-right-6"
          >
            <span
              aria-hidden="true"
              className="bg-primary size-2 rounded-full"
            />

            <span
              className="text-foreground font-mono text-[10px] tracking-wide
                sm:text-xs"
            >
              BUILDER&apos;S NOTE
            </span>
          </div>
        </div>

        {/* Présentation de l'auteur */}
        <div className="flex min-w-0 flex-col items-start">
          <div className="mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="bg-primary h-px w-8" />

            <span className="text-primary font-mono text-xs tracking-[0.18em]">
              LE MOT DE L&apos;AUTEUR
            </span>
          </div>

          <h2
            id="author-title"
            className="text-foreground max-w-2xl text-4xl leading-[1.1]
              font-semibold tracking-[-0.045em] text-balance sm:text-5xl
              lg:text-6xl"
          >
            Salut, moi c&apos;est{" "}
            <span className="text-primary">EL-Anrif.</span>
          </h2>

          {/* Citation */}
          <div
            className="border-primary/30 relative mt-9 w-full border-l-2 pl-5
              sm:pl-7"
          >
            <Quote
              aria-hidden="true"
              className="text-primary mb-5 size-8"
              strokeWidth={1.5}
            />

            <blockquote className="max-w-2xl">
              <p
                className="text-foreground text-xl leading-relaxed
                  tracking-tight sm:text-2xl"
              >
                J&apos;ai créé ce kit parce que je réécrivais la même base à
                chaque projet : authentification, emails, administration.
              </p>

              <p
                className="text-muted-foreground mt-4 text-lg leading-relaxed
                  sm:text-xl"
              >
                Maintenant, je pars d&apos;ici.
              </p>
            </blockquote>
          </div>

          {/* Message et signature */}
          <div className="mt-8 flex max-w-xl flex-col gap-5">
            <p className="text-muted-foreground text-sm leading-7 sm:text-base">
              Si vous avez une idée, une question ou un retour, écrivez-moi. Ce
              kit est une base de départ, et vos retours peuvent contribuer à le
              faire évoluer.
            </p>

            <div
              className="border-border flex flex-wrap items-center
                justify-between gap-4 border-t pt-6"
            >
              <div>
                <p className="text-foreground text-base font-semibold">
                  EL-Anrif
                </p>

                <p className="text-muted-foreground mt-1 text-sm">
                  Ingénieur logiciel
                </p>
              </div>

              <div
                className="border-primary/20 bg-primary/[0.06] text-primary
                  inline-flex items-center gap-2 rounded-full border px-3.5 py-2
                  text-xs font-medium"
              >
                <span
                  aria-hidden="true"
                  className="bg-primary size-1.5 rounded-full"
                />

                <span>Conçu pour construire</span>

                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
