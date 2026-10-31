"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "../schemas/auth";
import { forgotPasswordMutation } from "@/lib/auth/api/mutations";
import { ROUTES } from "@/utils/routes";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation(forgotPasswordMutation);

  const onSubmit = (data: ForgotPasswordFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => setSent(true), // même réponse que le compte existe ou non
      onError: (error: any) =>
        toast.error(error?.message || "Oups! Une erreur est survenue."),
    });
  };

  if (sent) {
    return (
      <div className="space-y-5">
        <h1 className="text-foreground text-2xl font-semibold">
          Vérifiez votre boîte mail
        </h1>
        <p className="text-muted-foreground">
          Si un compte existe avec cet email, vous allez recevoir un lien de
          réinitialisation valable 30 minutes.
        </p>
        <Link
          href={ROUTES.SIGN_IN}
          className="text-brand-600 hover:text-brand-700 dark:text-brand-400
            dark:hover:text-brand-300 mt-5 inline-block"
        >
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <h1 className="text-foreground text-2xl font-semibold">
        Mot de passe oublié ?
      </h1>
      <p className="text-muted-foreground">
        Saisissez votre email, nous vous enverrons un lien pour en choisir un
        nouveau.
      </p>
      <div>
        <Label required>Email</Label>
        <Input
          type="email"
          placeholder="Entrez votre email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-destructive mt-1 text-sm">
            {errors.email.message}
          </p>
        )}
        <Link
          href={ROUTES.SIGN_IN}
          className="text-brand-600 hover:text-brand-700 dark:text-brand-400
            dark:hover:text-brand-300 inline-block text-sm"
        >
          Retour à la connexion?
        </Link>
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="shadow-theme-xs bg-primary text-primary-foreground
          hover:bg-primary/90 flex w-full items-center justify-center rounded-lg
          px-4 py-3 text-sm font-medium transition disabled:opacity-50"
      >
        {mutation.isPending ? "Envoi en cours..." : "Envoyer le lien"}
      </button>
    </form>
  );
}
