"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderIcon, TrashIcon, TriangleAlert } from "lucide-react";
import {
  deleteFormSchema,
  DeleteFormValues,
  MESSAGE_DELETE_ACCOUNT,
} from "@/lib/account/schemas/account";
import { deleteMyAccountMutation } from "@/lib/account/api/mutations";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/form/input/InputField";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<DeleteFormValues>({
    resolver: zodResolver(deleteFormSchema),
    defaultValues: {
      message: "",
    },
  });
  const messageValue = watch("message");

  const deleteAccountMutation = useMutation(deleteMyAccountMutation);
  const isConfirmationValid =
    messageValue?.trim().toUpperCase() === MESSAGE_DELETE_ACCOUNT.toUpperCase();
  const pending = deleteAccountMutation.isPending;

  const onSubmitDelete = (values: DeleteFormValues) => {
    setSubmitError(null);
    deleteAccountMutation.mutate(values, {
      onSuccess: async () => {
        toast.success("Votre compte a été supprimé avec succès.");
        signOut();
        onClose();
        reset();
      },
      onError: (error) => {
        const message =
          error.message ||
          "Une erreur est survenue lors de la suppression du compte.";
        setSubmitError(message);
        toast.error(message);
      },
    });
  };

  const handleClose = () => {
    setSubmitError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Supprimer mon compte"
      icon={TriangleAlert}
      iconClassName="bg-destructive/10 text-destructive ring-destructive/20"
      description={
        <>
          Confirmez la suppression de votre compte en saisissant le message
          suivant :
          <strong className="text-destructive ml-1 font-semibold uppercase">
            {MESSAGE_DELETE_ACCOUNT}
          </strong>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmitDelete)}>
        {submitError && (
          <div
            role="alert"
            className="bg-destructive/10 border-destructive/30 mb-6 flex
              items-start gap-3 rounded-xl border p-4"
          >
            <TriangleAlert
              className="text-destructive mt-0.5 size-5 shrink-0"
              aria-hidden
            />
            <div className="min-w-0">
              <h4 className="text-destructive font-semibold">
                Échec de la suppression du compte
              </h4>
              <p className="text-destructive mt-1 text-sm wrap-break-word">
                Une erreur est survenue lors de la suppression du compte.
              </p>
            </div>
          </div>
        )}

        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              {...field}
              placeholder="Saisissez le message pour confirmer la suppression"
            />
          )}
        />
        {errors.message && (
          <p role="alert" className="text-destructive mt-1 text-sm">
            {errors.message.message}
          </p>
        )}

        {/* Mobile : boutons empilés pleine largeur, action principale en haut */}
        <div
          className="border-border mt-6 flex flex-col-reverse gap-3 border-t
            pt-6 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center
            sm:justify-start"
        >
          <Button
            type="button"
            size="form-sm"
            variant="secondary"
            onClick={onClose}
            className="w-full sm:w-auto sm:min-w-32"
          >
            Fermer
          </Button>
          <Button
            type="submit"
            variant="destructive"
            size="form-sm"
            startIcon={<TrashIcon size={16} />}
            disabled={pending || !isConfirmationValid}
            className="w-full sm:w-auto sm:min-w-32"
          >
            {pending ? "En cours..." : "Supprimer mon compte"}
            {pending && <LoaderIcon className="ml-2 animate-spin" />}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
