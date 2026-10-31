import SignUpForm from "@/lib/auth/components/sign-up-form";
import environment from "@/config/environment.config";
import { redirect } from "next/navigation";
import AuthContainer from "@/components/auth/auth-container";

export const metadata = {
  title: "Inscription",
  description:
    "Créez votre compte pour vous connecter et accéder à votre espace personnel.",
};

const {
  auth: { provider },
} = environment;

export default function SignUpPage() {
  if (provider === "keycloak") {
    redirect("/");
  }

  return (
    <AuthContainer className="max-w-xl">
      <SignUpForm />
    </AuthContainer>
  );
}
