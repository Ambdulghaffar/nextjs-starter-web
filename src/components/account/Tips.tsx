import Link from "next/link";
import { Moon, KeyRound, RefreshCw } from "lucide-react";
import { ROUTES } from "@/utils/routes";

export function Tips() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div
        className="bg-primary text-primary-foreground relative isolate
          overflow-hidden rounded-2xl p-7 shadow-sm md:col-span-2"
      >
        {/* Cercles décoratifs (5) */}
        <div
          aria-hidden
          className="bg-primary-foreground/10 absolute -top-16 -right-10 -z-10
            size-56 rounded-full"
        />
        <div
          aria-hidden
          className="border-primary-foreground/20 absolute top-8 right-36 -z-10
            size-28 rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary-foreground/10 absolute right-1/2 bottom-6 -z-10
            size-10 rounded-full"
        />
        <div
          aria-hidden
          className="border-primary-foreground/15 absolute -right-8 -bottom-16
            -z-10 size-44 rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary-foreground/15 absolute right-24 bottom-8 -z-10
            size-6 rounded-full"
        />

        <span
          className="bg-primary-foreground/15 flex size-12 items-center
            justify-center rounded-xl"
        >
          <RefreshCw className="size-6" aria-hidden />
        </span>
        <h3 className="font-display mt-5 text-2xl font-bold tracking-tight">
          Garde tes informations à jour
        </h3>
        <p className="text-primary-foreground/80 mt-3 max-w-xl leading-relaxed">
          Ton adresse e-mail et ton numéro servent à te joindre et à retrouver
          ton compte. Un changement de numéro ? Mets-le à jour en quelques
          secondes depuis ton profil.
        </p>
        <Link
          href={ROUTES.ACCOUNT}
          className="bg-primary-foreground text-primary
            hover:bg-primary-foreground/90
            focus-visible:ring-primary-foreground/50 mt-6 inline-flex
            rounded-full px-5 py-2.5 text-sm font-semibold transition-colors
            focus-visible:ring-[3px] focus-visible:outline-none"
        >
          Ouvrir mon profil
        </Link>
      </div>

      <div
        className="border-border bg-card text-card-foreground relative isolate
          overflow-hidden rounded-2xl border p-7 shadow-sm"
      >
        <div
          aria-hidden
          className="bg-primary/10 absolute -top-10 -right-10 -z-10 size-32
            rounded-full"
        />
        <div
          aria-hidden
          className="border-primary/20 absolute top-16 right-12 -z-10 size-12
            rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary/15 absolute -bottom-6 -left-6 -z-10 size-20
            rounded-full"
        />

        <span
          className="bg-primary/10 text-primary ring-primary/20 flex size-12
            items-center justify-center rounded-xl ring-1 ring-inset"
        >
          <Moon className="size-6" aria-hidden />
        </span>
        <h3 className="font-display mt-5 text-xl font-semibold">
          Clair ou sombre
        </h3>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Le bouton en forme de lune, en haut à droite, change l&apos;apparence
          de tout l&apos;espace.
        </p>
      </div>

      <div
        className="border-border bg-card text-card-foreground relative isolate
          overflow-hidden rounded-2xl border p-7 shadow-sm"
      >
        <div
          aria-hidden
          className="bg-primary/10 absolute -top-10 -right-10 -z-10 size-32
            rounded-full"
        />
        <div
          aria-hidden
          className="border-primary/20 absolute top-16 right-12 -z-10 size-12
            rounded-full border-2"
        />
        <div
          aria-hidden
          className="bg-primary/15 absolute -right-4 -bottom-8 -z-10 size-20
            rounded-full"
        />

        <span
          className="bg-primary/10 text-primary ring-primary/20 flex size-12
            items-center justify-center rounded-xl ring-1 ring-inset"
        >
          <KeyRound className="size-6" aria-hidden />
        </span>
        <h3 className="font-display mt-5 text-xl font-semibold">
          Un mot de passe solide
        </h3>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Long, unique, et changé de temps en temps. Tout se passe dans les
          paramètres.
        </p>
        <Link
          href={ROUTES.ACCOUNT_SETTINGS}
          className="text-primary mt-4 inline-block font-semibold
            hover:underline"
        >
          Aller aux paramètres
        </Link>
      </div>
    </div>
  );
}
