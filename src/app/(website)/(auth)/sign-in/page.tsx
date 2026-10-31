import SignInForm from "@/lib/auth/components/sign-in-form";
import environment from "@/config/environment.config";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import AuthContainer from "@/components/auth/auth-container";

export const metadata: Metadata = {
  title: { absolute: `Connexion` },
  description: "Connectez-vous pour accéder à votre espace.",
};

const {
  auth: { provider },
} = environment;

export default function SignInPage() {
  if (provider === "keycloak") {
    redirect("/");
  }
  return (
    <AuthContainer className="max-w-md">
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </AuthContainer>
  );
}
