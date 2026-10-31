"use client";

import { useSyncExternalStore } from "react";
import { Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  COLOR_THEMES,
  getColorTheme,
  setColorTheme,
  subscribeColorTheme,
} from "./color-theme";

export function ThemeSelectButton() {
  const current = useSyncExternalStore(
    subscribeColorTheme,
    getColorTheme,
    () => "default" as const,
  );
  const active = COLOR_THEMES.find((t) => t.id === current) ?? COLOR_THEMES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Choisir un thème de couleur"
          className="focus-visible:ring-ring relative flex h-11 w-11
            items-center justify-center rounded-full border border-gray-200
            bg-white text-gray-500 transition-colors hover:bg-gray-100
            hover:text-gray-700 focus-visible:ring-1 focus-visible:outline-none
            dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400
            dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <Palette className="size-5" />
          <span
            aria-hidden
            className="absolute right-1.5 bottom-1.5 size-2.5 rounded-full
              ring-1 ring-white dark:ring-gray-900"
            style={{ background: active.swatch }}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-999999 w-56 rounded-xl p-1.5"
      >
        <DropdownMenuLabel
          className="text-muted-foreground px-2 pt-1 pb-2 text-xs font-medium
            tracking-wide uppercase"
        >
          Thème de couleur
        </DropdownMenuLabel>

        {COLOR_THEMES.map((t) => {
          const isActive = current === t.id;
          return (
            <DropdownMenuItem
              key={t.id}
              onSelect={() => setColorTheme(t.id)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2",
                isActive && "bg-muted",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  `ring-offset-popover size-6 shrink-0 rounded-full ring-1
                  ring-offset-2 transition`,
                  isActive ? "ring-foreground/70" : "ring-transparent",
                )}
                style={{ background: t.swatch }}
              />
              <span className="flex-1 text-sm font-medium">{t.label}</span>
              {isActive && <Check className="text-foreground/70 size-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
