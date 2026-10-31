"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import PasswordStrength from "./ui/password-strength";
import {
  resetPasswordFormSchema,
  ResetPasswordFormValues,
} from "../schemas/auth";
import { resetPasswordMutation } from "@/lib/auth/api/mutations";
import InvalidResetLink from "./ui/invalid-reset-link";

export default function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const mutation = useMutation(resetPasswordMutation);

  if (!token) {
    return <InvalidResetLink />;
  }

  const onSubmit = (data: ResetPasswordFormValues) => {
    mutation.mutate(
      { token, newPassword: data.password },
      {
        onSuccess: () => {
          toast.success("Mot de passe modifié !");
          router.push("/");
        },
        onError: (error) =>
          toast.error(error.message || "Le lien est invalide ou a expiré."),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <h1 className="text-foreground text-2xl font-semibold">
        Nouveau mot de passe
      </h1>
      {mutation.error && (
        <p
          className="bg-destructive/15 text-destructive rounded p-3 text-center
            text-sm"
        >
          {mutation.error.message}
        </p>
      )}
      <div>
        <Label required>Nouveau mot de passe</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Entrez votre nouveau mot de passe"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
            className="absolute top-1/2 right-4 z-30 -translate-y-1/2
              cursor-pointer"
          >
            {showPassword ? (
              <EyeIcon className="fill-muted-foreground" />
            ) : (
              <EyeCloseIcon className="fill-muted-foreground" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-destructive mt-1 text-sm">
            {errors.password.message}
          </p>
        )}
        <PasswordStrength password={watch("password")} />
      </div>
      <div>
        <Label required>Confirmer le mot de passe</Label>
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirmez votre mot de passe"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={
              showConfirm
                ? "Masquer la confirmation"
                : "Afficher la confirmation"
            }
            className="absolute top-1/2 right-4 z-30 -translate-y-1/2
              cursor-pointer"
          >
            {showConfirm ? (
              <EyeIcon className="fill-muted-foreground" />
            ) : (
              <EyeCloseIcon className="fill-muted-foreground" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-destructive mt-1 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="shadow-theme-xs bg-primary text-primary-foreground
          hover:bg-primary/90 flex w-full items-center justify-center rounded-lg
          px-4 py-3 text-sm font-medium transition disabled:opacity-50"
      >
        {mutation.isPending ? "Modification..." : "Modifier le mot de passe"}
      </button>
    </form>
  );
}
