"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { LockKeyhole, LoaderIcon } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { onSessionExpired } from "@/lib/auth/session-expired-emitter";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/utils/routes";

const { SIGN_IN } = ROUTES;
export function SessionExpiredModal() {
  const { isOpen, openModal } = useModal();
  const { data: session } = useSession();
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    return onSessionExpired(() => openModal());
  }, [openModal]);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      openModal();
    }
  }, [session?.error, openModal]);

  const handleConfirm = () => {
    setIsReconnecting(true);
    signOut({ redirect: true, callbackUrl: SIGN_IN });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      showCloseButton={false}
      className="max-w-sm p-6"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full
            bg-red-50 dark:bg-red-500/10"
        >
          <LockKeyhole className="h-6 w-6 text-red-600 dark:text-red-500" />
        </div>

        <h2
          className="mt-4 text-lg font-semibold text-red-600 dark:text-red-500"
        >
          Session expirée
        </h2>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          Votre session a expiré. Veuillez vous reconnecter pour continuer.
        </p>

        <Button
          variant="brand"
          size="form-md"
          type="button"
          onClick={handleConfirm}
          disabled={isReconnecting}
          className="mt-6 flex w-full items-center justify-center gap-2
            rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white
            transition-colors hover:bg-blue-900/90 disabled:cursor-not-allowed
            disabled:opacity-70"
        >
          {isReconnecting ? (
            <>
              Reconnexion...
              <LoaderIcon className="h-4 w-4 animate-spin" />
            </>
          ) : (
            "Se reconnecter"
          )}
        </Button>
      </div>
    </Modal>
  );
}
