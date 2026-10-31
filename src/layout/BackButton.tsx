import Link from "next/link";

import { ChevronLeftIcon } from "@/icons";

export default function BackButton({
  link = "/",
  text = "Retour",
}: {
  link?: string;
  text?: string;
}) {
  return (
    <div className="mb-5 w-full sm:pt-10">
      <Link
        href={link}
        className="inline-flex items-center text-sm text-gray-500
          transition-colors hover:text-gray-700 dark:text-gray-400
          dark:hover:text-gray-300"
      >
        <ChevronLeftIcon />
        {text}
      </Link>
    </div>
  );
}
