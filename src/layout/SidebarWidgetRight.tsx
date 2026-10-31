"use client";

import { toast } from "sonner";
import React from "react";

export default function SidebarWidgetRight() {
  const handleProClick = () => {
    toast.info("Fonctionnalité bientôt disponible", {
      description:
        "La version Pro n'est pas encore disponible. Revenez bientôt !",
    });
  };

  return (
    <div
      className={`mx-auto mb-10 w-full max-w-80 overflow-hidden rounded-2xl
        bg-gray-50 text-center dark:bg-white/3`}
    >
      <div
        className="relative h-64 w-full overflow-hidden bg-blue-950
          dark:bg-white/5"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/social-media.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50
            to-black/20"
        />
      </div>
      <div className="bg-black px-4 py-5">
        <h3 className="mb-2 font-semibold text-white dark:text-white/80">
          Version Pro
        </h3>
        <p className="mb-4 text-sm text-white dark:text-white/80">
          Accédez à des fonctionnalités avancées et à un support prioritaire.
        </p>
        <button
          type="button"
          onClick={handleProClick}
          className="flex w-full items-center justify-center rounded-lg
            bg-blue-500 p-3 text-sm font-medium text-white hover:bg-blue-600"
        >
          Passer à la version Pro
        </button>
      </div>
    </div>
  );
}
