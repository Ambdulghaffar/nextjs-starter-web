import type { CSSProperties } from "react";

function Bone({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800
        ${className}`}
    />
  );
}

const cardClass =
  "rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3";

/** Titre + sous-titre à gauche, menu « ⋮ » à droite */
function CardHeader({ titleWidth = "w-40" }: { titleWidth?: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <Bone className={`h-5 ${titleWidth}`} />
        <Bone className="h-3 w-56 max-w-full" />
      </div>
      <Bone className="h-5 w-1.5" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Statistiques : 3 cartes (utilisateurs, publications, commentaires) */
/* ---------------------------------------------------------------- */

function MetricCardSkeleton() {
  return (
    <div className={`${cardClass} p-5`}>
      <div className="flex items-center justify-between">
        <Bone className="h-10 w-10 rounded-xl" />
        <Bone className="h-5 w-14 rounded-full" />
      </div>
      <Bone className="mt-4 h-3 w-20" />
      <Bone className="mt-2 h-8 w-14" />
      <Bone className="mt-2 h-3 w-28" />
    </div>
  );
}

export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      <MetricCardSkeleton />
      <MetricCardSkeleton />
      <MetricCardSkeleton />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Activité mensuelle : histogramme                                  */
/* ---------------------------------------------------------------- */

const PUBLICATIONS = [15, 30, 20, 35, 30, 42, 38, 28, 45, 52, 40, 55];
const COMMENTS = [30, 45, 38, 58, 52, 70, 62, 50, 78, 88, 74, 98];

export function MonthlySalesChartSkeleton() {
  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      <CardHeader titleWidth="w-44" />

      {/* Légende */}
      <div className="mt-4 flex items-center gap-4">
        <Bone className="h-3 w-20" />
        <Bone className="h-3 w-20" />
      </div>

      {/* Barres */}
      <div className="mt-6 flex h-64 items-end gap-2 sm:gap-3">
        {PUBLICATIONS.map((pub, i) => (
          <div key={i} className="flex h-full flex-1 items-end gap-1">
            <Bone
              className="w-full rounded-t-sm"
              style={{ height: `${pub}%` }}
            />
            <Bone
              className="w-full rounded-t-sm"
              style={{ height: `${COMMENTS[i]}%` }}
            />
          </div>
        ))}
      </div>

      {/* Totaux */}
      <div
        className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4
          dark:border-gray-800"
      >
        {[0, 1].map((i) => (
          <div key={i} className="space-y-2">
            <Bone className="h-3 w-20" />
            <Bone className="h-6 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Activité de la plateforme : jauge                                 */
/* ---------------------------------------------------------------- */

export function MonthlyTargetSkeleton() {
  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      <CardHeader titleWidth="w-48" />

      {/* Jauge en demi-cercle */}
      <div className="mt-10 flex justify-center">
        <div
          aria-hidden="true"
          className="h-36 w-72 max-w-full animate-pulse rounded-t-full border-18
            border-b-0 border-gray-200 dark:border-gray-800"
        />
      </div>

      {/* Badge + texte */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <Bone className="h-5 w-24 rounded-full" />
        <Bone className="h-3 w-4/5" />
        <Bone className="h-3 w-3/5" />
      </div>

      {/* Totaux */}
      <div
        className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4
          dark:border-gray-800"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Bone className="h-3 w-16" />
            <Bone className="h-5 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Répartition des utilisateurs : carte + pays                       */
/* ---------------------------------------------------------------- */

export function DemographicCardSkeleton() {
  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      <CardHeader titleWidth="w-48" />

      {/* Carte du monde */}
      <Bone className="mt-6 h-44 w-full rounded-2xl" />

      {/* Pays */}
      <div className="mt-6 space-y-5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Bone className="h-8 w-8 shrink-0 rounded-full" />
            <div className="min-w-0 space-y-2">
              <Bone className="h-3.5 w-20" />
              <Bone className="h-3 w-24" />
            </div>
            <Bone className="ml-auto h-2 w-24 rounded-full sm:w-40" />
            <Bone className="h-3.5 w-9" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Utilisateurs récents : tableau                                    */
/* ---------------------------------------------------------------- */

const ROW_GRID =
  "grid grid-cols-[2fr_1fr] items-center gap-4 sm:grid-cols-[2fr_2fr_1fr_1fr]";

export function RecentUsersSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      {/* Titre + bouton « Voir tout » */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Bone className="h-5 w-44" />
          <Bone className="h-3 w-52 max-w-full" />
        </div>
        <Bone className="h-9 w-20 rounded-lg" />
      </div>

      {/* En-têtes de colonnes */}
      <div
        className={`${ROW_GRID} mt-6 border-y border-gray-100 py-3
          dark:border-gray-800`}
      >
        <Bone className="h-3 w-16" />
        <Bone className="hidden h-3 w-12 sm:block" />
        <Bone className="hidden h-3 w-8 sm:block" />
        <Bone className="h-3 w-12" />
      </div>

      {/* Lignes */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className={`${ROW_GRID} py-3`}>
            <div className="flex items-center gap-3">
              <Bone className="h-10 w-10 shrink-0 rounded-full" />
              <div className="space-y-2">
                <Bone className="h-3.5 w-24" />
                <Bone className="h-3 w-28" />
              </div>
            </div>
            <Bone className="hidden h-3.5 w-40 sm:block" />
            <Bone className="hidden h-5 w-12 rounded-full sm:block" />
            <Bone className="h-5 w-14 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Page complète : même grille que la page du dashboard              */
/* ---------------------------------------------------------------- */

export function DashboardSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="grid grid-cols-12 gap-4 md:gap-6"
    >
      <span className="sr-only">Chargement du tableau de bord…</span>

      <div className="col-span-12 space-y-6 xl:col-span-7">
        <MetricsSkeleton />
        <MonthlySalesChartSkeleton />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTargetSkeleton />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCardSkeleton />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentUsersSkeleton />
      </div>
    </div>
  );
}
