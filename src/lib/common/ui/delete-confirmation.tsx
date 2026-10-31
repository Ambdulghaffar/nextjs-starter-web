"use client";

import { Trash2 } from "lucide-react";
import Alert from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";

type DeleteConfirmationProps = {
  alertTitle: string;
  alertMessage: string;
  alertVariant?: "warning" | "error" | "info";
  confirmLabel?: string;
  loadingLabel?: string;
  isDeleting: boolean;
  disabled?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmation({
  alertTitle,
  alertMessage,
  alertVariant = "error",
  confirmLabel = "Supprimer",
  loadingLabel = "Suppression en cours...",
  isDeleting,
  disabled = false,
  onCancel,
  onConfirm,
}: DeleteConfirmationProps) {
  return (
    <div className="space-y-6">
      <Alert variant={alertVariant} title={alertTitle} message={alertMessage} />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-start">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isDeleting}
          className="sm:min-w-28"
        >
          Annuler
        </Button>

        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={isDeleting || disabled}
          className="sm:min-w-36"
        >
          {isDeleting ? (
            <>
              <span
                className="border-destructive-foreground/30
                  border-t-destructive-foreground mr-2 size-4 animate-spin
                  rounded-full border-2"
                aria-hidden="true"
              />
              {loadingLabel}
            </>
          ) : (
            <>
              <Trash2 className="mr-2 size-4" aria-hidden="true" />
              {confirmLabel}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
