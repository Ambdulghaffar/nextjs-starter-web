import Link from "next/link";
import { Check, Circle, ArrowRight, Sparkles } from "lucide-react";
import { ROUTES } from "@/utils/routes";

type ProfileCompletionItem = {
  label: string;
  done: boolean;
  href: string;
};

type ProfileCompletionProps = {
  items: ProfileCompletionItem[];
};

export function ProfileCompletion({ items }: ProfileCompletionProps) {
  const completed = items.filter((item) => item.done).length;
  const percentage =
    items.length > 0 ? Math.round((completed / items.length) * 100) : 0;

  return (
    <div
      className="border-border bg-card text-card-foreground relative isolate
        h-full overflow-hidden rounded-2xl border p-7 shadow-sm"
    >
      {/* Cercles décoratifs (5) */}
      <div
        aria-hidden
        className="bg-primary/10 absolute -top-14 -right-10 -z-10 size-40
          rounded-full"
      />
      <div
        aria-hidden
        className="border-primary/20 absolute top-4 right-24 -z-10 size-16
          rounded-full border-2"
      />
      <div
        aria-hidden
        className="bg-primary/10 absolute top-1/2 -right-10 -z-10 size-28
          rounded-full"
      />
      <div
        aria-hidden
        className="border-primary/15 absolute -bottom-10 -left-10 -z-10 size-32
          rounded-full border-2"
      />
      <div
        aria-hidden
        className="bg-primary/15 absolute top-24 right-1/2 -z-10 size-5
          rounded-full"
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            Ton espace
          </p>
          <h3 className="font-display mt-0.5 text-2xl font-bold tracking-tight">
            Complète ton profil
          </h3>
        </div>

        <span
          className="bg-primary/10 text-primary ring-primary/20 flex size-12
            shrink-0 items-center justify-center rounded-xl ring-1 ring-inset"
        >
          <Sparkles className="size-6" aria-hidden />
        </span>
      </div>

      <div className="mt-7">
        <div className="flex items-end justify-between gap-3">
          <span className="text-muted-foreground text-sm">Progression</span>
          <span className="font-display text-3xl font-bold tabular-nums">
            {percentage}%
          </span>
        </div>

        <div
          role="progressbar"
          aria-label="Complétion du profil"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          className="bg-primary/15 mt-3 h-2.5 overflow-hidden rounded-full"
        >
          <div
            className="bg-primary h-full rounded-full transition-[width]
              duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-muted-foreground mt-2 text-sm">
          {completed} sur {items.length} informations renseignées
        </p>
      </div>

      <div className="mt-6 space-y-1">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="hover:bg-accent hover:text-accent-foreground
              focus-visible:ring-ring/50 flex items-center gap-3 rounded-xl px-2
              py-2.5 transition-colors focus-visible:ring-[3px]
              focus-visible:outline-none"
          >
            {item.done ? (
              <span
                className="bg-primary text-primary-foreground flex size-7
                  shrink-0 items-center justify-center rounded-full"
              >
                <Check className="size-4" aria-hidden />
              </span>
            ) : (
              <Circle
                className="text-muted-foreground ml-1 size-5 shrink-0"
                aria-hidden
              />
            )}

            <span
              className={`min-w-0 flex-1 text-sm ${
                item.done ? "text-muted-foreground" : "font-semibold"
              }`}
            >
              {item.label}
            </span>

            {!item.done && (
              <ArrowRight
                className="text-primary size-4 shrink-0"
                aria-hidden
              />
            )}
          </Link>
        ))}
      </div>

      {percentage < 100 ? (
        <Link
          href={ROUTES.ACCOUNT_PROFILE}
          className="bg-primary text-primary-foreground hover:bg-primary/90
            focus-visible:ring-ring/50 mt-5 inline-flex h-12 w-full items-center
            justify-center gap-2 rounded-xl px-4 font-semibold shadow-md
            transition-colors focus-visible:ring-[3px]
            focus-visible:outline-none"
        >
          Terminer mon profil
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      ) : (
        <div
          className="bg-primary/10 text-primary ring-primary/20 mt-5 flex
            items-center gap-2 rounded-xl p-3 text-sm font-semibold ring-1
            ring-inset"
        >
          <Check className="size-5 shrink-0" aria-hidden />
          Ton profil est complet !
        </div>
      )}
    </div>
  );
}
