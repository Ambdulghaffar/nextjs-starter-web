"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";
import { verifyEmailMutation } from "@/lib/auth/api/mutations";
import { ROUTES } from "@/utils/routes";

const REDIRECT_DELAY = 5;

type Tone = "brand" | "green" | "red";

const TONES: Record<Tone, { circle: string; ring: string }> = {
  brand: {
    circle:
      "from-brand-50 to-brand-100 text-brand-600 ring-brand-200/70 dark:from-brand-500/10 dark:to-brand-500/20 dark:text-brand-400 dark:ring-brand-500/30",
    ring: "bg-brand-500/15",
  },
  green: {
    circle:
      "from-green-50 to-green-100 text-green-600 ring-green-200/70 dark:from-green-500/10 dark:to-green-500/20 dark:text-green-400 dark:ring-green-500/30",
    ring: "bg-green-500/15",
  },
  red: {
    circle:
      "from-destructive/10 to-destructive/20 text-destructive ring-destructive/30",
    ring: "bg-destructive/15",
  },
};

function StatusIcon({
  tone,
  pulse,
  children,
}: {
  tone: Tone;
  pulse?: boolean;
  children: React.ReactNode;
}) {
  const styles = TONES[tone];
  return (
    <div className="flex justify-center sm:justify-start">
      <div className="relative flex size-24 items-center justify-center">
        {pulse && (
          <>
            <span
              className={`animation-duration-[2.5s] absolute inset-0
              animate-ping rounded-full ${styles.ring}`}
              aria-hidden="true"
            />
            <span
              className={`animation-duration-[2.5s] absolute inset-2
              animate-ping rounded-full [animation-delay:0.6s] ${styles.ring}`}
              aria-hidden="true"
            />
          </>
        )}
        <div
          className={`animate-in zoom-in relative flex size-20 items-center
            justify-center rounded-full bg-linear-to-br shadow-sm ring-1
            duration-300 ${styles.circle}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const verify = useMutation(verifyEmailMutation);
  const called = useRef(false);
  const [countdown, setCountdown] = useState(REDIRECT_DELAY);

  useEffect(() => {
    if (token && !called.current) {
      called.current = true;
      verify.mutate({ token });
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // Redirection automatique vers la connexion après succès
  useEffect(() => {
    if (!verify.isSuccess) return;
    if (countdown <= 0) {
      router.replace(ROUTES.SIGN_IN);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [verify.isSuccess, countdown, router]);

  // Lien invalide ou expiré
  if (!token || verify.isError) {
    return (
      <div
        className="animate-in fade-in slide-in-from-bottom-2 space-y-8
          duration-500"
      >
        <StatusIcon tone="red">
          <XCircle className="size-9" aria-hidden="true" />
        </StatusIcon>

        <div className="space-y-3 text-center sm:text-left">
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
            Lien invalide ou expiré
          </h1>
          <p className="text-muted-foreground">
            Ce lien de confirmation n&apos;est plus valable. Connectez-vous avec
            votre email et votre mot de passe : nous vous proposerons d&apos;en
            recevoir un nouveau.
          </p>
        </div>

        <Link
          href={ROUTES.SIGN_IN}
          className="shadow-theme-xs bg-primary text-primary-foreground
            hover:bg-primary/90 flex w-full items-center justify-center gap-2
            rounded-lg px-4 py-3 text-sm font-medium transition"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour à la connexion
        </Link>
      </div>
    );
  }

  // Email confirmé
  if (verify.isSuccess) {
    return (
      <div
        className="animate-in fade-in slide-in-from-bottom-2 space-y-8
          duration-500"
      >
        <StatusIcon tone="green" pulse>
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </StatusIcon>

        <div className="space-y-3 text-center sm:text-left">
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
            Email confirmé !
          </h1>
          <p className="text-muted-foreground">
            Votre compte est actif. Vous allez être redirigé vers la connexion
            dans {countdown}s.
          </p>
        </div>

        <div className="space-y-4">
          <div
            className="bg-muted h-1.5 w-full overflow-hidden rounded-full"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={REDIRECT_DELAY}
            aria-valuenow={REDIRECT_DELAY - countdown}
          >
            <div
              className="h-full rounded-full bg-green-500 transition-all
                duration-1000 ease-linear"
              style={{
                width: `${((REDIRECT_DELAY - countdown) / REDIRECT_DELAY) * 100}%`,
              }}
            />
          </div>

          <Link
            href={ROUTES.SIGN_IN}
            className="shadow-theme-xs group bg-primary text-primary-foreground
              hover:bg-primary/90 flex w-full items-center justify-center gap-2
              rounded-lg px-4 py-3 text-sm font-medium transition"
          >
            Se connecter maintenant
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    );
  }

  // Vérification en cours
  return (
    <div className="animate-in fade-in space-y-8 duration-500">
      <StatusIcon tone="brand" pulse>
        <Loader2 className="size-9 animate-spin" aria-hidden="true" />
      </StatusIcon>

      <div className="space-y-3 text-center sm:text-left">
        <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
          Vérification en cours
        </h1>
        <p className="text-muted-foreground">
          Nous confirmons votre adresse e-mail, cela ne prend qu&apos;un
          instant…
        </p>
      </div>
    </div>
  );
}
