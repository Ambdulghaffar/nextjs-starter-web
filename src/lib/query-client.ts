import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { UnwrappedApiError } from "./common/handle-api-error";

const MAX_RETRIES = 2;

function shouldRetry(failureCount: number, error: unknown) {
  // Côté serveur : pas de retry, le client reprendra la requête
  if (isServer) return false;
  if (!(error instanceof UnwrappedApiError)) return false;

  // Uniquement panne réseau (0) ou erreur serveur (5xx)
  const retryable = error.status === 0 || error.status >= 500;
  return retryable && failureCount < MAX_RETRIES;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: shouldRetry,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
