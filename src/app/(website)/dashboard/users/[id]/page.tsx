import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { userByIdQueryOptions } from "@/lib/users/api/queries/queries.server";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import QuerySectionBoundary from "@/lib/query-section-boundary";
import { searchParamsCache } from "@/lib/searchparams";
import { parseId } from "@/lib/common/http";
import { prefetchOrNotFound } from "@/lib/common/prefetch";
import { DetailSkeleton } from "@/lib/common/ui/detail-skeleton";
import UserDetails from "@/lib/users/components/user-details";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Utilisateur",
};

export default async function UserPage({
  searchParams,
  params,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await searchParamsCache.parse(searchParams);

  const userId = parseId(id, "user");
  if (!userId.ok) notFound();

  const queryClient = getQueryClient();
  await prefetchOrNotFound(queryClient, userByIdQueryOptions(userId.data));

  return (
    <div>
      <PageBreadcrumb pageTitle="Utilisateur" />
      <div className="space-y-6">
        <ComponentCard>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <QuerySectionBoundary
              title="Utilisateur"
              message="Cet utilisateur est momentanément indisponible."
            >
              <Suspense fallback={<DetailSkeleton />}>
                <UserDetails userId={userId.data} />
              </Suspense>
            </QuerySectionBoundary>
          </HydrationBoundary>
        </ComponentCard>
      </div>
    </div>
  );
}
