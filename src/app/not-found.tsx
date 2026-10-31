import { ROUTES } from "@/utils/routes";
import { House, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="from-primary/10 via-background to-background text-foreground
        relative isolate flex min-h-screen flex-col items-center justify-center
        overflow-hidden bg-linear-to-b px-6 py-10"
    >
      {/* Décors : halos de couleur et motif de points */}
      <div
        aria-hidden="true"
        className="bg-primary/20 absolute -top-32 left-1/2 -z-10 size-120
          -translate-x-[75%] rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-primary/10 absolute -bottom-32 left-1/2 -z-10 size-105
          translate-x-[10%] rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="text-primary/30 absolute inset-0 -z-10
          bg-[radial-gradient(currentColor_1px,transparent_1px)]
          [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
          [background-size:24px_24px]"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        {/* Étiquette */}
        <span
          className="bg-card/80 text-primary ring-primary/20 inline-flex
            items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold
            shadow-sm ring-1 backdrop-blur ring-inset"
        >
          <span
            className="bg-destructive size-2 rounded-full"
            aria-hidden="true"
          />
          Erreur de navigation
        </span>

        {/* Illustration */}
        <div
          role="img"
          aria-label="Erreur 404 : page introuvable"
          className="border-border bg-card/80 relative mx-auto mt-10 flex
            aspect-[16/7] w-full max-w-xl items-center justify-center
            rounded-3xl border shadow-2xl backdrop-blur"
        >
          <div
            className="font-display from-primary to-primary/50 bg-linear-to-b
              bg-clip-text text-[clamp(5rem,18vw,10rem)] leading-none font-bold
              tracking-tighter text-transparent"
            aria-hidden="true"
          >
            404
          </div>

          <div
            className="bg-primary text-primary-foreground shadow-primary/25
              absolute right-4 bottom-4 flex size-12 items-center justify-center
              rounded-2xl shadow-lg sm:right-6 sm:bottom-6 sm:size-14"
            aria-hidden="true"
          >
            <SearchX className="size-6 sm:size-7" />
          </div>

          <span
            className="bg-primary/10 text-primary absolute top-4 left-4
              rounded-full px-3 py-1 text-sm font-semibold sm:top-6 sm:left-6"
          >
            Page introuvable
          </span>
        </div>

        {/* Message */}
        <h1
          className="font-display mt-12 text-4xl leading-tight font-bold
            tracking-tight text-balance sm:text-5xl"
        >
          Cette page a pris un autre chemin.
        </h1>

        <p
          className="text-muted-foreground mx-auto mt-5 max-w-lg text-lg
            leading-relaxed text-pretty"
        >
          La page que vous recherchez n’existe pas ou n’est plus disponible.
          Vérifiez l’adresse ou retournez à l’accueil pour continuer votre
          navigation sur Rifline.
        </p>

        {/* Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ROUTES.HOME}
            className="bg-primary text-primary-foreground hover:bg-primary/90
              shadow-primary/25 focus-visible:ring-ring/50 inline-flex min-h-12
              items-center justify-center gap-2 rounded-full px-7 py-3 text-sm
              font-semibold shadow-lg transition-colors focus-visible:ring-[3px]
              focus-visible:outline-none"
          >
            <House size={18} aria-hidden="true" />
            Retour à l’accueil
          </Link>
        </div>
      </div>

      {/* Pied de page */}
      <p
        className="text-muted-foreground absolute bottom-6 left-1/2
          -translate-x-1/2 text-center text-xs"
      >
        © {new Date().getFullYear()} Rifline
      </p>
    </main>
  );
}
