import { ROUTES } from "@/utils/routes";
import Link from "next/link";

export default function InvalidResetLink() {
  return (
    <div className="mx-auto w-full max-w-md text-center">
      <div
        className="bg-destructive/10 mx-auto mb-6 flex h-16 w-16 items-center
          justify-center rounded-full"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-destructive"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
      </div>

      <h1 className="text-foreground mb-2 text-2xl font-semibold">
        Lien invalide ou expiré
      </h1>
      <p className="text-muted-foreground mb-8">
        Ce lien de réinitialisation n&apos;est plus valable. Il a peut-être
        expiré (30 minutes) ou a déjà été utilisé. Demandez-en un nouveau pour
        choisir votre mot de passe.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/forgot-password"
          className="shadow-theme-xs bg-primary text-primary-foreground
            hover:bg-primary/90 flex w-full items-center justify-center
            rounded-lg px-4 py-3 text-sm font-medium transition"
        >
          Demander un nouveau lien
        </Link>
        <Link
          href={ROUTES.SIGN_IN}
          className="bg-secondary text-secondary-foreground
            hover:bg-muted-foreground/15 flex w-full items-center justify-center
            rounded-lg px-4 py-3 text-sm font-medium transition"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
