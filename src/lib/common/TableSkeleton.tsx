import type { ReactNode } from "react";

export function Bone({
  className = "",
  strong = false,
}: {
  className?: string;
  strong?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md ${
        strong ? "bg-gray-300 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800"
        } ${className}`}
    />
  );
}

export type SkeletonColumn = {
  headerWidth: string;
  cell: ReactNode;
  align?: "start" | "center";
};

export type TableSkeletonProps = {
  title: string;
  subtitle: string;
  addButtonWidth?: string;
  filterWidths: string[];
  gridClass: string;
  columns: SkeletonColumn[];
  rows?: number;
  pages?: number;
  label?: string;
};

function Cell({
  align = "center",
  children,
}: {
  align?: "start" | "center";
  children: ReactNode;
}) {
  return (
    <div
      className={`flex items-center ${
        align === "start" ? "justify-start" : "justify-center"
      }`}
    >
      {children}
    </div>
  );
}

export function TableSkeleton({
  title,
  subtitle,
  addButtonWidth = "sm:w-48",
  filterWidths,
  gridClass,
  columns,
  rows = 5,
  pages = 3,
  label = "Chargement…",
}: TableSkeletonProps) {
  return (
    <div role="status" aria-busy="true" className="space-y-4">
      <span className="sr-only">{label}</span>

      {/* En-tête */}
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center
          sm:justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div
          className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3"
        >
          <Bone className="h-10 w-full rounded-lg sm:w-28" />
          <Bone className={`h-10 w-full rounded-lg ${addButtonWidth}`} />
        </div>
      </div>

      {/* Filtres */}
      <div
        className="flex flex-col gap-3 sm:flex-row sm:items-center
          sm:justify-between"
      >
        <Bone className="h-10 w-full rounded-lg sm:w-96" />
        <div className="flex flex-wrap items-center gap-2">
          {filterWidths.map((width, i) => (
            <Bone key={i} className={`h-10 rounded-lg ${width}`} />
          ))}
        </div>
      </div>

      {/* « Affichage de 1 à 5 sur N… » */}
      <Bone className="h-4 w-56" />

      {/* Tableau */}
      <div
        className="overflow-hidden rounded-xl border border-gray-200 bg-white
          dark:border-white/5 dark:bg-white/3"
      >
        <div className="max-w-full overflow-x-auto">
          {/* En-têtes */}
          <div
            className={`${gridClass} h-12 border-b border-gray-100 bg-gray-100
              dark:border-white/5 dark:bg-white/5`}
          >
            {columns.map((col, i) => (
              <Cell key={i} align={col.align}>
                <Bone strong className={`h-3 ${col.headerWidth}`} />
              </Cell>
            ))}
          </div>

          {/* Lignes */}
          {Array.from({ length: rows }, (_, r) => (
            <div
              key={r}
              className={`${gridClass} py-4 even:bg-gray-50
              dark:even:bg-white/2`}
            >
              {columns.map((col, i) => (
                <Cell key={i} align={col.align}>
                  {col.cell}
                </Cell>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pied : compteur + pagination */}
      <div
        className="flex flex-col gap-3 sm:flex-row sm:items-center
          sm:justify-between"
      >
        <Bone className="h-4 w-52" />
        <div className="flex items-center gap-2">
          <Bone className="h-11 w-28 rounded-lg" />
          {Array.from({ length: pages }, (_, i) => (
            <Bone key={i} className="h-11 w-11 rounded-lg" />
          ))}
          <Bone className="h-11 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
