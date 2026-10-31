import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { Check } from "lucide-react";

type Step = { title: string; text: string; href: string; done?: boolean };

export function GettingStarted({
  profileDone,
  photoDone,
}: {
  profileDone: boolean;
  photoDone: boolean;
}) {
  const steps: Step[] = [
    {
      title: "Complète ton profil",
      text: "Vérifie ton nom, ton e-mail et ajoute ton numéro de téléphone.",
      href: ROUTES.ACCOUNT_PROFILE,
      done: profileDone,
    },
    {
      title: "Ajoute ta photo",
      text: "Une photo, et ton espace te ressemble tout de suite.",
      href: ROUTES.ACCOUNT_PROFILE,
      done: photoDone,
    },
    {
      title: "Essaie le Chat IA",
      text: "Pose ta première question et vois ce qu'il sait faire.",
      href: ROUTES.ACCOUNT_CHAT,
    },
    {
      title: "Fais le tour du kit",
      text: "Parcours les fonctionnalités et repère celles qui t'intéressent.",
      href: ROUTES.ACCOUNT,
    },
  ];

  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="min-w-0">
          <Link
            href={s.href}
            className="group border-border bg-card text-card-foreground
              hover:border-primary/40 focus-visible:ring-ring/50 relative
              isolate flex h-full flex-col overflow-hidden rounded-2xl border
              p-6 shadow-sm transition-colors focus-visible:ring-[3px]
              focus-visible:outline-none"
          >
            {/* Cercles décoratifs (3) */}
            <div
              aria-hidden
              className="bg-primary/10 absolute -top-10 -right-10 -z-10 size-28
                rounded-full transition-transform duration-300
                group-hover:scale-110"
            />
            <div
              aria-hidden
              className="border-primary/20 absolute top-14 right-10 -z-10
                size-10 rounded-full border-2"
            />
            <div
              aria-hidden
              className="bg-primary/15 absolute -right-3 -bottom-6 -z-10 size-16
                rounded-full"
            />

            <span
              className="bg-primary text-primary-foreground font-display flex
                size-10 items-center justify-center rounded-full text-base
                font-bold"
            >
              {i + 1}
            </span>
            <h3 className="font-display mt-5 text-lg font-semibold">
              {s.title}
            </h3>
            <p
              className="text-muted-foreground mt-2 flex-1 text-sm
                leading-relaxed"
            >
              {s.text}
            </p>
            {s.done !== undefined && (
              <span
                className={`mt-5 inline-flex w-fit items-center gap-1.5
                rounded-full px-3 py-1 text-sm font-medium ${
                  s.done
                    ? "bg-muted text-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s.done && <Check className="size-3.5" aria-hidden />}
                {s.done ? "Fait" : "À faire"}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ol>
  );
}
