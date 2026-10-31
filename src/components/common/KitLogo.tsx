import Link from "next/link";
import { LeafIcon } from "lucide-react";

import { ROUTES } from "@/utils/routes";

type KitLogoProps = {
  className?: string;
  hidden?: boolean;
  onClick?: () => void;
};

export default function KitLogo({
  className = "",
  hidden = false,
  onClick,
}: KitLogoProps) {
  return (
    <Link
      href={ROUTES.HOME}
      aria-label="Logo, accueil"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2.5 text-lg font-bold
        tracking-tight text-slate-900 dark:text-slate-50 ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center rounded-lg
          bg-blue-600 text-white"
      >
        <LeafIcon size={15} strokeWidth={2.5} />
      </span>
      {!hidden && <span className="hidden sm:inline">[Logo]</span>}
    </Link>
  );
}
