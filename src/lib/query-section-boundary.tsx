"use client";

import type { ComponentType, ReactNode } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import {
  RefreshCwIcon,
  SearchXIcon,
  ServerCrashIcon,
  ShieldAlertIcon,
  TriangleAlertIcon,
  WifiOffIcon,
} from "lucide-react";

type ErrorView = {
  Icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  title: string;
  message: string;
  /** Couleurs de la pastille d'icône */
  tone: string;
};

function getErrorView(error: unknown): ErrorView {
  const status = (error as { status?: number } | null)?.status;

  if (status === 0) {
    return {
      Icon: WifiOffIcon,
      title: "Connexion impossible",
      message: "Impossible de joindre le serveur. Vérifiez votre connexion.",
      tone: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    };
  }
  if (status === 401 || status === 403) {
    return {
      Icon: ShieldAlertIcon,
      title: "Accès refusé",
      message: "Vous n’avez pas l’autorisation de voir ce contenu.",
      tone: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    };
  }
  if (status === 404) {
    return {
      Icon: SearchXIcon,
      title: "Contenu introuvable",
      message: "Ce que vous cherchez n’existe pas ou a été supprimé.",
      tone: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
    };
  }
  if (typeof status === "number" && status >= 500) {
    return {
      Icon: ServerCrashIcon,
      title: "Service indisponible",
      message: "Le service rencontre un problème. Réessayez dans un instant.",
      tone: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400",
    };
  }
  return {
    Icon: TriangleAlertIcon,
    title: "Une erreur est survenue",
    message: "Le chargement a échoué. Réessayez dans un instant.",
    tone: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };
}

function DefaultFallback({
  error,
  resetErrorBoundary,
  title,
  message,
  className = "",
}: FallbackProps & {
  title?: string;
  message?: string;
  className?: string;
}) {
  const view = getErrorView(error);
  const { Icon } = view;

  return (
    <div
      role="alert"
      className={`flex flex-col items-center gap-5 rounded-3xl border
        border-slate-200 bg-white px-6 py-10 text-center shadow-xl
        shadow-blue-900/5 dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full
          ${view.tone}`}
      >
        <Icon size={26} aria-hidden />
      </span>

      <div className="max-w-sm">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          {title ?? view.title}
        </h3>
        <p
          className="mt-1.5 text-sm leading-6 text-slate-600
            dark:text-slate-400"
        >
          {message ?? view.message}
        </p>
      </div>

      <button
        type="button"
        onClick={resetErrorBoundary}
        className="group inline-flex items-center gap-2 rounded-full bg-blue-600
          px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30
          transition-colors hover:bg-blue-700 focus-visible:ring-2
          focus-visible:ring-blue-600 focus-visible:ring-offset-2
          focus-visible:outline-none"
      >
        <RefreshCwIcon
          size={15}
          aria-hidden
          className="transition-transform duration-500 group-hover:rotate-180"
        />
        Réessayer
      </button>
    </div>
  );
}

type QuerySectionBoundaryProps = {
  children: ReactNode;
  title?: string;
  message?: string;
  className?: string;
  fallback?: (props: FallbackProps) => ReactNode;
  onError?: (error: unknown) => void;
};

export default function QuerySectionBoundary({
  children,
  title,
  message,
  className,
  fallback,
  onError,
}: QuerySectionBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          onError={onError}
          fallbackRender={(props) =>
            fallback ? (
              fallback(props)
            ) : (
              <DefaultFallback
                {...props}
                title={title}
                message={message}
                className={className}
              />
            )
          }
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
