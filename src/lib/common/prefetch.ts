import "server-only";

import type {
  FetchQueryOptions,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

/**
 * Précharge une requête côté serveur. Si le backend répond 404, affiche la
 * page not-found. Les autres erreurs sont ignorées ici : le client reprendra
 * la requête et l'erreur sera gérée par le `QuerySectionBoundary`.
 */
export async function prefetchOrNotFound<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey,
>(
  queryClient: QueryClient,
  options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) {
  try {
    await queryClient.fetchQuery(options);
  } catch (error) {
    if ((error as { status?: number } | null)?.status === 404) notFound();
  }
}
