import { ROUTES } from "@/utils/routes";
import Link from "next/link";

export default function SidebarWidget() {
  return (
    <div
      className={`mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5
        text-center dark:bg-white/3`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Version Pro
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Accédez à des fonctionnalités avancées et à un support prioritaire.
      </p>
      <Link
        href={ROUTES.HOME}
        target="_blank"
        className="flex items-center justify-center rounded-lg bg-blue-500 p-3
          text-sm font-medium text-white hover:bg-blue-600"
      >
        Passer à la version Pro
      </Link>
    </div>
  );
}
