import Link from "next/link";
import { UserRound, Sparkles, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/utils/routes";

const actions = [
  {
    title: "Mon profil",
    description: "Gère tes informations personnelles et ta photo.",
    href: ROUTES.ACCOUNT,
    icon: UserRound,
  },
  {
    title: "Chat IA",
    description: "Pose tes questions et obtiens de l'aide.",
    href: ROUTES.ACCOUNT_CHAT,
    icon: Sparkles,
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.title}
            href={action.href}
            className="group border-border bg-card text-card-foreground
              hover:border-primary/40 focus-visible:ring-ring/50 relative
              isolate flex min-w-0 flex-col overflow-hidden rounded-2xl border
              p-6 shadow-sm transition-colors focus-visible:ring-[3px]
              focus-visible:outline-none"
          >
            {/* Cercles décoratifs (3) */}
            <div
              aria-hidden
              className="bg-primary/10 absolute -top-12 -right-12 -z-10 size-36
                rounded-full transition-transform duration-300
                group-hover:scale-110"
            />
            <div
              aria-hidden
              className="border-primary/20 absolute top-20 right-16 -z-10
                size-14 rounded-full border-2"
            />
            <div
              aria-hidden
              className="bg-primary/15 absolute -right-4 -bottom-8 -z-10 size-20
                rounded-full"
            />

            <div className="flex items-start justify-between gap-3">
              <span
                className="bg-primary/10 text-primary ring-primary/20 flex
                  size-12 shrink-0 items-center justify-center rounded-xl ring-1
                  ring-inset"
              >
                <Icon className="size-6" aria-hidden />
              </span>

              <ArrowUpRight
                className="text-muted-foreground group-hover:text-primary size-5
                  transition-colors"
                aria-hidden
              />
            </div>

            <h3 className="font-display mt-6 text-xl font-semibold">
              {action.title}
            </h3>

            <p className="text-muted-foreground mt-2 flex-1 text-sm leading-6">
              {action.description}
            </p>

            <span className="text-primary mt-5 font-semibold">Accéder</span>
          </Link>
        );
      })}
    </div>
  );
}
