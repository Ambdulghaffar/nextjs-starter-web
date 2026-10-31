import type { Metadata } from "next";

import AuthContainer from "@/components/auth/auth-container";
import ForgotPasswordForm from "@/lib/auth/components/forgot-password-form";
import { ROUTES } from "@/utils/routes";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthContainer
      className="max-w-md"
      backLink={ROUTES.SIGN_IN}
      backText="Retour à la connexion"
    >
      <ForgotPasswordForm />
    </AuthContainer>
  );
}
