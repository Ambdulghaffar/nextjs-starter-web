"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues, registerFormSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import PhoneInput from "@/components/form/group-input/PhoneInput";
import { signUpMutation } from "@/lib/auth/api/mutations";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import PasswordStrength from "./ui/password-strength";

const { SIGN_IN, VERIFY_EMAIL_SENT } = ROUTES;

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting: loading },
    control,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const signUpMutationHook = useMutation(signUpMutation);

  const onSubmit = (data: RegisterFormValues) => {
    setSubmitError(null);

    if (!isChecked) {
      toast.error("Veuillez accepter les termes et conditions.");
      return;
    }

    signUpMutationHook.mutate(data, {
      onSuccess: () => {
        toast.success("Compte créé ! Vérifiez votre boîte mail.");
        router.push(
          `${VERIFY_EMAIL_SENT}?email=${encodeURIComponent(data.email)}`,
        );
      },
      onError: (error: any) => {
        setSubmitError(error?.message || "Une erreur inattendue est survenue");
        toast.error("Erreur de création de compte !");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="mb-5 sm:mb-8 lg:mb-10">
        <h1
          className="text-foreground mb-2 text-2xl font-semibold sm:text-3xl
            md:text-4xl lg:text-5xl"
        >
          Création de compte
        </h1>

        <p
          className="text-muted-foreground text-base sm:text-lg md:text-xl
            lg:text-2xl"
        >
          Créez votre compte pour accéder à votre espace personnel.
        </p>
      </div>
      <div className="space-y-6">
        {/* Submit error */}
        {submitError && (
          <p
            className="bg-destructive/10 text-destructive rounded-lg p-3
              text-center text-sm"
          >
            {submitError}
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label required>Nom</Label>

            <Input
              type="text"
              id="lastName"
              {...register("lastName")}
              placeholder="Entrez votre nom"
            />

            {errors.lastName && (
              <p className="text-destructive text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label required>Prénom</Label>

            <Input
              type="text"
              id="firstName"
              {...register("firstName")}
              placeholder="Entrez votre prénom"
            />

            {errors.firstName && (
              <p className="text-destructive text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label required>Email</Label>

            <Input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Entrez votre email"
            />

            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>
              Téléphone{" "}
              <span className="text-muted-foreground text-xs font-normal">
                (facultatif)
              </span>
            </Label>

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  selectPosition="start"
                  countries={countries}
                  placeholder="+212 (600) 000-000"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.phoneNumber && (
              <p className="text-destructive text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label required>Mot de passe</Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Entrez votre mot de passe"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute top-1/2 right-4 z-30 -translate-y-1/2
                cursor-pointer"
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? (
                <EyeIcon className="fill-muted-foreground" />
              ) : (
                <EyeCloseIcon className="fill-muted-foreground" />
              )}
            </button>
          </div>

          <PasswordStrength password={passwordValue} />

          {errors.password && (
            <p className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label required>Confirmer le mot de passe</Label>

          <div className="relative">
            <Input
              type={showconfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirmez votre mot de passe"
            />

            <button
              type="button"
              onClick={() => setShowconfirmPassword((value) => !value)}
              className="absolute top-1/2 right-4 z-30 -translate-y-1/2
                cursor-pointer"
              aria-label={
                showconfirmPassword
                  ? "Masquer la confirmation du mot de passe"
                  : "Afficher la confirmation du mot de passe"
              }
            >
              {showconfirmPassword ? (
                <EyeIcon className="fill-muted-foreground" />
              ) : (
                <EyeCloseIcon className="fill-muted-foreground" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-destructive text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <Checkbox
            className="mt-0.5 h-5 w-5 shrink-0"
            checked={isChecked}
            onChange={setIsChecked}
          />

          <p className="text-muted-foreground text-sm leading-5 font-normal">
            En créant un compte, vous acceptez les{" "}
            <span className="text-foreground">
              Conditions d&apos;utilisation
            </span>{" "}
            et notre{" "}
            <span className="text-foreground">
              Politique de confidentialité
            </span>
            .
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || signUpMutationHook.isPending}
          className="shadow-theme-xs bg-primary text-primary-foreground
            hover:bg-primary/90 flex w-full cursor-pointer items-center
            justify-center rounded-lg px-4 py-3 text-sm font-medium transition
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading || signUpMutationHook.isPending
            ? "Inscription..."
            : "S'inscrire"}
        </button>
      </div>

      {/* Sign in */}
      <div className="mt-6">
        <p
          className="text-muted-foreground text-center text-sm font-normal
            sm:text-start"
        >
          Déjà un compte?{" "}
          <Link
            href={SIGN_IN}
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </form>
  );
}

const countries = [
  { code: "KM", label: "+269" },
  { code: "MA", label: "+212" },
  { code: "FR", label: "+33" },
  { code: "US", label: "+1" },
  { code: "GB", label: "+44" },
  { code: "CA", label: "+1" },
  { code: "AU", label: "+61" },
];
