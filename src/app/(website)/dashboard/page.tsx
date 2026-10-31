import type { Metadata } from "next";

import { Suspense } from "react";
import DemographicCard from "@/components/dashboard/DemographicCard";
import QuerySectionBoundary from "@/lib/query-section-boundary";
import RecentUsers from "@/components/dashboard/RecentUsers";
import {
  MetricsSkeleton,
  RecentUsersSkeleton,
} from "@/components/dashboard/DashboardWelcomeSkeleton";
import { AdminMetrics } from "@/components/dashboard/AdminMetrics";
import MonthlyDashboardChart from "@/components/dashboard/MonthlyDashboardChart";
import PlatformActivity from "@/components/dashboard/PaltformActivity";

export const metadata: Metadata = {
  title: "Tableau de bord d'administration",
  description:
    "Tableau de bord d'administration pour suivre et gérer les utilisateurs.",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h1
        className="font-display mb-10 text-[clamp(2.5rem,5vw,4rem)] leading-none
          font-extrabold tracking-tight"
      >
        Tableau de bord
      </h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <QuerySectionBoundary
            title="Statistiques"
            message="Les statistiques sont momentanément indisponibles."
          >
            <Suspense fallback={<MetricsSkeleton />}>
              <AdminMetrics />
            </Suspense>
          </QuerySectionBoundary>

          <MonthlyDashboardChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <PlatformActivity />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <QuerySectionBoundary
            title="Utilisateurs récents"
            message="Les utilisateurs récents sont momentanément indisponibles."
          >
            <Suspense fallback={<RecentUsersSkeleton />}>
              <RecentUsers />
            </Suspense>
          </QuerySectionBoundary>
        </div>
      </div>
    </div>
  );
}
