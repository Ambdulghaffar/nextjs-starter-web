import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInSeconds,
  format,
  isSameYear,
  isValid,
  parseISO,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ROUTES } from "@/utils/routes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string | Date, pattern = "dd MMM yyyy") {
  const date = typeof value === "string" ? parseISO(value) : value;
  return isValid(date) ? format(date, pattern, { locale: fr }) : "—";
}

export function formatRelativeDate(
  value: string | Date,
  now: Date = new Date(),
) {
  const date = typeof value === "string" ? parseISO(value) : value;
  if (!isValid(date)) return "—";

  const seconds = differenceInSeconds(now, date);
  if (seconds < 60) return "à l'instant"; // inclut aussi un léger décalage d'horloge

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days} j`;

  // Au-delà d'une semaine : date courte, avec l'année si ce n'est pas la même
  return format(date, isSameYear(date, now) ? "d MMM" : "d MMM yyyy", {
    locale: fr,
  });
}

export interface ColumnConfig {
  key: string;
  label: string;
  hideOnMobile?: boolean;
}

// Masqué sous md (768px), affiché en cellule de tableau au-dessus
export const MOBILE_HIDDEN = "hidden md:table-cell";

export function hiddenOnMobile(columns: readonly ColumnConfig[], key: string) {
  return columns.find((c) => c.key === key)?.hideOnMobile ? MOBILE_HIDDEN : "";
}

export function uniqueById<T extends { id: number }>(items: T[]): T[] {
  const seen = new Set<number>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getSafeCallbackUrl(
  url: string | null,
  fallback: string = ROUTES.HOME,
) {
  if (!url) return fallback;
  if (!url.startsWith("/") || url.startsWith("//") || url.startsWith("/\\"))
    return fallback;
  if (url.startsWith(ROUTES.SIGN_IN) || url.startsWith(ROUTES.SIGN_UP))
    return fallback;
  return url;
}

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  columns: readonly { key: keyof T; label: string }[],
  filename: string = "export.csv",
) {
  if (data.length === 0) return;

  const csvRows = [
    "sep=;", // Indique les cellules à Excel
    columns.map((col) => col.label).join(";"), // En-têtes (Téléphone, Rôle...)
    ...data.map((row) =>
      columns
        .map((col) => {
          const val = row[col.key] ?? "";
          const escaped = String(val).replace(/"/g, '""');

          if (col.key === "phoneNumber" || col.key === "telephone") {
            return `="${escaped}"`; // Protège le numéro de téléphone
          }

          return escaped.includes(";") || escaped.includes("\n")
            ? `"${escaped}"`
            : escaped;
        })
        .join(";"),
    ),
  ];

  const csvString = csvRows.join("\n");

  // 💡 LA CORRECTION RADICALE POUR EXCEL WINDOWS :
  // Au lieu de forcer l'UTF-8, on convertit la chaîne en codage "Binary/ANSI" (Windows-1252)
  // en s'assurant que les caractères comme é ou ô passent de manière native pour Excel.
  const buffer = new ArrayBuffer(csvString.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < csvString.length; i++) {
    view[i] = csvString.charCodeAt(i) & 0xff;
  }

  // On crée le Blob en mode binaire brut (sans forcer le charset utf-8 qui sème la confusion)
  const blob = new Blob([buffer], { type: "text/csv;charset=ansi;" });

  // Téléchargement
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
