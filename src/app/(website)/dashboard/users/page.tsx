import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import environment from "@/config/environment.config";
import { getQueryClient } from "@/lib/query-client";
import QuerySectionBoundary from "@/lib/query-section-boundary";
import { buildUserFilters } from "@/lib/users/api/filters";
import { usersQueryOptions } from "@/lib/users/api/queries/queries.server";
import { Users } from "@/lib/users/components/users";
import { UsersTableSkeleton } from "@/lib/users/components/users-skeleton";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Utilisateurs",
};

const {
  pagination: { page, size },
} = environment;

export default async function UsersPage() {
  const initialFilters = buildUserFilters({
    page,
    size,
  });

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(usersQueryOptions(initialFilters));

  return (
    <div>
      <PageBreadcrumb pageTitle="Utilisateurs" />
      <div className="space-y-6">
        <ComponentCard>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <QuerySectionBoundary
              title="Utilisateurs récents"
              message="Les utilisateurs récents sont momentanément indisponibles."
            >
              <Suspense fallback={<UsersTableSkeleton />}>
                <Users />
              </Suspense>
            </QuerySectionBoundary>
          </HydrationBoundary>
        </ComponentCard>
      </div>
    </div>
  );
}
