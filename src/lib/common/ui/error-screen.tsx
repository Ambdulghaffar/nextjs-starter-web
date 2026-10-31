import type { ReactNode } from "react";
import {
  ClockIcon,
  HeartIcon,
  LockKeyholeIcon,
  ServerCrashIcon,
  TriangleAlertIcon,
  WifiOffIcon,
} from "lucide-react";

export const errorPrimaryButtonClass = `
  group inline-flex h-12 items-center justify-center gap-2
  rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground
  shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90
  focus-visible:ring-[3px] focus-visible:ring-ring/50
  focus-visible:outline-none
  disabled:pointer-events-none disabled:opacity-50
`;

export const errorSecondaryButtonClass = `
  inline-flex h-12 items-center justify-center gap-2
  rounded-full border border-border bg-card/70 px-7 text-sm
  font-semibold text-foreground transition-colors
  hover:bg-accent hover:text-accent-foreground
  focus-visible:ring-[3px] focus-visible:ring-ring/50
  focus-visible:outline-none
  disabled:pointer-events-none disabled:opacity-50
`;

export type ErrorVariant = "error" | "unauthorized" | "critical";

const VARIANTS = {
  error: {
    badge: "Un souci est survenu sur Rifline",
    titleTop: "Oups, quelque chose",
    titleAccent: "a coincé.",
    description:
      "Oups ! Quelque chose s’est mal passé lors du chargement de cette page. Réessayez dans un instant ou revenez à l’accueil.",
    Icon: ServerCrashIcon,
    NotifIcon: WifiOffIcon,
    notifTitle: "Chargement interrompu",
  },
  unauthorized: {
    badge: "Votre session a pris fin",
    titleTop: "Votre session",
    titleAccent: "a expiré.",
    description:
      "Pour votre sécurité, vous avez été déconnecté. Reconnectez-vous pour continuer à publier et échanger.",
    Icon: LockKeyholeIcon,
    NotifIcon: ClockIcon,
    notifTitle: "Session expirée",
  },
  critical: {
    badge: "Erreur critique",
    titleTop: "L’application",
    titleAccent: "n’a pas pu démarrer.",
    description:
      "Une erreur critique est survenue et l’application n’a pas pu se charger. Veuillez réessayer.",
    Icon: TriangleAlertIcon,
    NotifIcon: WifiOffIcon,
    notifTitle: "Application indisponible",
  },
} as const;

type ErrorScreenProps = {
  variant?: ErrorVariant;
  digest?: string;
  /** Plein écran (error.tsx racine / global-error). */
  fullScreen?: boolean;
  /** Bouton principal (Réessayer, Se reconnecter…). */
  primaryAction: ReactNode;
  /** Lien / bouton secondaire (Retour à l'accueil…). */
  secondaryAction?: ReactNode;
};

export default function ErrorScreen({
  variant = "error",
  digest,
  fullScreen = false,
  primaryAction,
  secondaryAction,
}: ErrorScreenProps) {
  const v = VARIANTS[variant];

  return (
    <section
      className={`from-primary/10 via-background to-background text-foreground
        relative isolate flex flex-col items-center justify-center
        overflow-hidden bg-linear-to-b px-6 py-10
        ${fullScreen ? "min-h-screen" : "min-h-[75vh]"}`}
    >
      {/* Décors : halos de couleur et motif de points */}
      <div
        aria-hidden="true"
        className="bg-primary/20 absolute -top-28 left-1/2 -z-10 size-105
          -translate-x-[75%] rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-primary/10 absolute -bottom-28 left-1/2 -z-10 size-95
          translate-x-[10%] rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="text-primary/30 pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(currentColor_1px,transparent_1px)]
          [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
          [background-size:24px_24px]"
      />

      <div className="relative mx-auto w-full max-w-2xl text-center">
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
          {v.badge}
        </span>

        {/* Illustration façon fenêtre d'application */}
        <div
          role="img"
          aria-label={`${v.notifTitle}. Illustration d'une publication indisponible.`}
          className="bg-card border-border text-card-foreground relative mx-auto
            mt-12 w-full max-w-sm rounded-2xl border text-left shadow-2xl"
        >
          {/* Barre de fenêtre */}
          <div
            className="border-border flex items-center justify-between border-b
              px-4 py-3"
          >
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="bg-muted-foreground/30 size-3 rounded-full" />
              <span className="bg-muted-foreground/30 size-3 rounded-full" />
              <span className="bg-muted-foreground/30 size-3 rounded-full" />
            </div>

            <span className="text-muted-foreground text-sm font-medium">
              Rifline · Statut
            </span>
          </div>

          {/* Carte de publication */}
          <div className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="bg-primary/10 text-primary flex size-12 shrink-0
                  items-center justify-center rounded-xl"
              >
                <v.Icon size={24} aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-semibold">
                  {v.notifTitle}
                </p>
                <p className="text-muted-foreground text-sm">
                  Une interruption a été détectée.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3" aria-hidden="true">
              <div className="bg-muted h-2.5 w-full rounded-full" />
              <div className="bg-muted h-2.5 w-4/5 rounded-full" />
              <div className="bg-muted h-2.5 w-3/5 rounded-full" />
            </div>

            <div
              className="border-border text-muted-foreground mt-6 flex
                items-center justify-between border-t pt-4 text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <HeartIcon size={16} aria-hidden="true" />
                Publication
              </span>
              <span className="text-xs">— / —</span>
            </div>
          </div>

          {/* Notification superposée */}
          <div
            className="border-border bg-card absolute -right-3 -bottom-5 flex
              max-w-[calc(100%-1rem)] items-center gap-3 rounded-2xl border p-3
              shadow-xl sm:-right-6"
          >
            <span
              className="bg-primary text-primary-foreground flex size-10
                shrink-0 items-center justify-center rounded-xl"
            >
              <v.NotifIcon size={18} aria-hidden="true" />
            </span>

            <div>
              <p className="text-foreground text-sm font-semibold">
                {v.notifTitle}
              </p>
              <p className="text-muted-foreground text-xs">À l’instant</p>
            </div>

            {/* Le rouge est réservé à l'état d'erreur */}
            <span
              className="bg-destructive text-destructive-foreground flex size-6
                items-center justify-center rounded-full text-xs font-bold"
              aria-label="Erreur"
            >
              !
            </span>
          </div>
        </div>

        {/* Titre principal */}
        <h1
          className="font-display mt-16 text-3xl leading-tight font-bold
            tracking-tight text-balance sm:text-4xl lg:text-5xl"
        >
          {v.titleTop} {v.titleAccent}
        </h1>

        {/* Description */}
        <p
          className="text-muted-foreground mx-auto mt-5 max-w-lg text-lg
            leading-relaxed text-pretty"
        >
          {v.description}
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {primaryAction}
          {secondaryAction}
        </div>

        {/* Identifiant technique */}
        {digest && variant !== "unauthorized" && (
          <p className="text-muted-foreground mt-8 text-xs">
            Code de l’erreur : <span className="font-mono">{digest}</span>
          </p>
        )}
      </div>

      {/* Pied de page */}
      <p
        className="text-muted-foreground absolute bottom-6 left-1/2
          -translate-x-1/2 text-center text-xs"
      >
        © {new Date().getFullYear()} Rifline
      </p>
    </section>
  );
}
