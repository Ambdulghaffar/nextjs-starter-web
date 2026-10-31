import { Suspense } from "react";
import type { Metadata } from "next";

import AuthContainer from "@/components/auth/auth-container";
import ResetPasswordForm from "@/lib/auth/components/reset-password-form";
import { ROUTES } from "@/utils/routes";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthContainer
      className="max-w-md"
      backLink={ROUTES.SIGN_IN}
      backText="Retour à la connexion"
    >
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthContainer>
  );
}
