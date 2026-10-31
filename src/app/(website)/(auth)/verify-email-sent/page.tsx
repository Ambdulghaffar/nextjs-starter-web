import { Suspense } from "react";
import type { Metadata } from "next";

import AuthContainer from "@/components/auth/auth-container";
import VerifyEmailSent from "@/lib/auth/components/verify-email-sent";
import { ROUTES } from "@/utils/routes";

export const metadata: Metadata = {
  title: "E-mail de vérification envoyé",
  robots: { index: false, follow: false },
};

export default function VerifyEmailSentPage() {
  return (
    <AuthContainer
      className="max-w-md"
      backLink={ROUTES.SIGN_IN}
      backText="Retour à la connexion"
    >
      <Suspense fallback={null}>
        <VerifyEmailSent />
      </Suspense>
    </AuthContainer>
  );
}
