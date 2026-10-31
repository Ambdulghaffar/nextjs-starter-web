"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import {
  changePasswordSchema,
  ChangePwdFormValues,
} from "@/lib/account/schemas/account";
import { updateMyPasswordMutation } from "@/lib/account/api/mutations";
import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { AlertCircle, KeyRound, LoaderIcon, PenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePwdFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const updatePwdMutation = useMutation(updateMyPasswordMutation);
  const pending = isSubmitting || updatePwdMutation.isPending;

  const onSubmitPassword = (values: ChangePwdFormValues) => {
    setSubmitError(null);
    updatePwdMutation.mutate(values, {
      onSuccess: async () => {
        toast.success("Mot de passe modifié avec succès");
        onClose();
        reset();
      },
      onError: (error) => {
        if (error.status === 401) {
          toast.error("Votre session a expiré, veuillez vous reconnecter.");
          return;
        }
        setSubmitError(error.message);
        toast.error(error.message);
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
      title="Changer le mot de passe"
      description="Mettez à jour votre mot de passe pour sécuriser votre compte."
      icon={KeyRound}
    >
      <form onSubmit={handleSubmit(onSubmitPassword)}>
        {submitError && (
          <div
            role="alert"
            className="bg-destructive/10 border-destructive/30 mb-6 flex
              items-start gap-3 rounded-xl border p-4"
          >
            <AlertCircle
              className="text-destructive mt-0.5 size-5 shrink-0"
              aria-hidden
            />
            <div className="min-w-0">
              <h4 className="text-destructive font-semibold">
                Échec du changement de mot de passe
              </h4>
              <p className="text-destructive mt-1 text-sm wrap-break-word">
                {submitError}
              </p>
            </div>
          </div>
        )}

        <div className="mx-auto grid max-w-md grid-cols-1 gap-x-6 gap-y-5">
          <div>
            <Label required>Mot de passe actuel</Label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                {...register("currentPassword")}
                placeholder="Saisissez votre mot de passe actuel"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                aria-label={
                  showCurrentPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                className="focus-visible:ring-ring/50 absolute top-1/2 right-2
                  z-30 grid size-10 -translate-y-1/2 cursor-pointer
                  place-items-center rounded-full focus-visible:ring-[3px]
                  focus-visible:outline-none"
              >
                {showCurrentPassword ? <EyeIcon /> : <EyeCloseIcon />}
              </button>
            </div>
            {errors.currentPassword && (
              <p role="alert" className="text-destructive mt-1 text-sm">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label required>Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                placeholder="Saisissez votre nouveau mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={
                  showNewPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                className="focus-visible:ring-ring/50 absolute top-1/2 right-2
                  z-30 grid size-10 -translate-y-1/2 cursor-pointer
                  place-items-center rounded-full focus-visible:ring-[3px]
                  focus-visible:outline-none"
              >
                {showNewPassword ? <EyeIcon /> : <EyeCloseIcon />}
              </button>
            </div>
            {errors.newPassword && (
              <p role="alert" className="text-destructive mt-1 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

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
            size="form-sm"
            startIcon={<PenIcon size={16} />}
            disabled={pending}
            className="w-full sm:w-auto sm:min-w-32"
          >
            {pending ? "En cours..." : "Modifier"}
            {pending && <LoaderIcon className="ml-2 animate-spin" />}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
