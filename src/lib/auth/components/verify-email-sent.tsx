"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Inbox,
  Loader2,
  Mail,
  MailCheck,
  RefreshCw,
} from "lucide-react";
import { resendVerificationMutation } from "@/lib/auth/api/mutations";
import { ROUTES } from "@/utils/routes";

const RESEND_COOLDOWN = 60;

export default function VerifyEmailSent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const autoSend = searchParams.get("autoSend") === "1";
  const autoSent = useRef(false);
  const [cooldown, setCooldown] = useState(0);
  const [justSent, setJustSent] = useState(false);

  const resend = useMutation({
    ...resendVerificationMutation,
    onSuccess: () => {
      toast.success("Email envoyé.");
      setJustSent(true);
      setCooldown(RESEND_COOLDOWN);
    },
    onError: () => toast.error("Impossible d'envoyer l'email."),
  });

  // Envoi automatique quand on arrive depuis la page de connexion
  useEffect(() => {
    if (!autoSend || !email || autoSent.current) return;
    autoSent.current = true;
    resend.mutate({ email });
    // Retire autoSend de l'URL : un rechargement ne renverra pas l'email
    router.replace(
      `${ROUTES.VERIFY_EMAIL_SENT}?email=${encodeURIComponent(email)}`,
    );
  }, [autoSend, email]); // eslint-disable-line react-hooks/exhaustive-deps

  // Compte à rebours avant un nouveau renvoi
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const isDisabled = !email || resend.isPending || cooldown > 0;

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-2 space-y-8
        duration-500"
    >
      {/* Icône animée */}
      <div className="flex justify-center sm:justify-start">
        <div className="relative flex size-24 items-center justify-center">
          <span
            className="animation-duration-[2.5s] bg-brand-500/15 absolute
              inset-0 animate-ping rounded-full"
            aria-hidden="true"
          />
          <span
            className="animation-duration-[2.5s] bg-brand-500/20 absolute
              inset-2 animate-ping rounded-full [animation-delay:0.6s]"
            aria-hidden="true"
          />
          <div
            className="from-brand-50 to-brand-100 text-brand-600
              ring-brand-200/70 dark:from-brand-500/10 dark:to-brand-500/20
              dark:text-brand-400 dark:ring-brand-500/30 relative flex size-20
              items-center justify-center rounded-full bg-linear-to-br shadow-sm
              ring-1"
          >
            {justSent ? (
              <MailCheck
                className="animate-in zoom-in size-9 duration-300"
                aria-hidden="true"
              />
            ) : (
              <Mail className="size-9" aria-hidden="true" />
            )}
          </div>
          {justSent && (
            <span
              className="animate-in zoom-in ring-background absolute right-1
                bottom-1 flex size-7 items-center justify-center rounded-full
                bg-green-500 text-white shadow-md ring-2 duration-300"
            >
              <CheckCircle2 className="size-4" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>

      {/* Titre + texte */}
      <div className="space-y-3 text-center sm:text-left">
        <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
          Vérifiez votre boîte mail
        </h1>
        <p className="text-muted-foreground">
          {resend.isPending
            ? "Envoi du lien de confirmation en cours..."
            : "Nous avons envoyé un lien de confirmation à l'adresse ci-dessous. Cliquez dessus pour activer votre compte."}
        </p>
        {email ? (
          <div
            className="border-border bg-muted text-foreground inline-flex
              max-w-full items-center gap-2 rounded-full border px-4 py-2
              text-sm font-medium"
          >
            <Mail
              className="text-muted-foreground size-4 shrink-0"
              aria-hidden="true"
            />
            <span className="truncate">{email}</span>
          </div>
        ) : (
          <p className="text-destructive text-sm">
            Adresse e-mail introuvable. Retournez à la connexion pour réessayer.
          </p>
        )}
      </div>

      {/* Conseils */}
      <ul className="border-border bg-muted/50 space-y-3 rounded-xl border p-4">
        <li className="text-muted-foreground flex items-center gap-3 text-sm">
          <span
            className="flex size-8 shrink-0 items-center justify-center
              rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10
              dark:text-amber-400"
          >
            <Clock className="size-4" aria-hidden="true" />
          </span>
          Le lien est valable pendant 24 heures.
        </li>
        <li className="text-muted-foreground flex items-center gap-3 text-sm">
          <span
            className="flex size-8 shrink-0 items-center justify-center
              rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/10
              dark:text-purple-400"
          >
            <Inbox className="size-4" aria-hidden="true" />
          </span>
          Pensez à vérifier vos courriers indésirables.
        </li>
      </ul>

      {/* Actions */}
      <div className="space-y-4">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => {
            setJustSent(false);
            resend.mutate({ email });
          }}
          className="shadow-theme-xs bg-primary text-primary-foreground
            hover:bg-primary/90 flex w-full items-center justify-center gap-2
            rounded-lg px-4 py-3 text-sm font-medium transition
            hover:cursor-pointer disabled:cursor-not-allowed
            disabled:opacity-50"
        >
          {resend.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Envoi en cours...
            </>
          ) : cooldown > 0 ? (
            <>
              <Clock className="size-4" aria-hidden="true" />
              Renvoyer dans {cooldown}s
            </>
          ) : (
            <>
              <RefreshCw className="size-4" aria-hidden="true" />
              Renvoyer l&apos;email
            </>
          )}
        </button>

        <div className="text-center sm:text-left">
          <Link
            href={ROUTES.SIGN_IN}
            className="group text-muted-foreground hover:text-brand-600
              dark:hover:text-brand-400 inline-flex items-center gap-2 text-sm
              font-medium transition"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
