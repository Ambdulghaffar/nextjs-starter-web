"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogInIcon, RefreshCwIcon } from "lucide-react";
import { ROUTES } from "@/utils/routes";
import ErrorScreen, {
  errorPrimaryButtonClass,
  errorSecondaryButtonClass,
} from "@/lib/common/ui/error-screen";

const { SIGN_IN } = ROUTES;

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}) {
  const router = useRouter();
  const isUnauthorized = error.status === 401;

  useEffect(() => {
    console.error("Route error boundary caught:", error);
  }, [error]);

  if (isUnauthorized) {
    return (
      <ErrorScreen
        fullScreen
        variant="unauthorized"
        primaryAction={
          <button
            type="button"
            onClick={() => router.replace(SIGN_IN)}
            className={errorPrimaryButtonClass}
          >
            <LogInIcon size={15} aria-hidden="true" />
            Se reconnecter
          </button>
        }
      />
    );
  }

  return (
    <ErrorScreen
      fullScreen
      variant="error"
      digest={error.digest}
      primaryAction={
        <button
          type="button"
          onClick={() => reset()}
          className={errorPrimaryButtonClass}
        >
          <RefreshCwIcon
            size={15}
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:rotate-180"
          />
          Réessayer
        </button>
      }
      secondaryAction={
        <Link href={ROUTES.HOME} className={errorSecondaryButtonClass}>
          Retour à l&apos;accueil
        </Link>
      }
    />
  );
}
