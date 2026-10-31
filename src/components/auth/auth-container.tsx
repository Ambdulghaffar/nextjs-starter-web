import BackButton from "@/layout/BackButton";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/routes";

type AuthContainerProps = {
  children: React.ReactNode;
  className?: string;
  backLink?: string;
  backText?: string;
};

export default function AuthContainer({
  children,
  className,
  backLink = ROUTES.HOME,
  backText = "Retour à l'accueil",
}: AuthContainerProps) {
  return (
    <div className={cn("m-auto w-full", className)}>
      <BackButton link={backLink} text={backText} />
      {children}
    </div>
  );
}
