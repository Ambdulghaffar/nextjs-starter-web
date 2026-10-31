"use client";

import { AxiosError } from "axios";
import type { ApiError } from "./api-error";

export class UnwrappedApiError extends Error implements ApiError {
  status: number;
  error: string;
  code?: string;
  timestamp?: string;
  path?: string;

  constructor(apiError: ApiError) {
    super(apiError.message);
    this.name = "UnwrappedApiError";
    this.status = apiError.status;
    this.error = apiError.error;
    this.code = apiError.code;
    this.timestamp = apiError.timestamp;
    this.path = apiError.path;
  }
}

export function unwrapApiError(error: unknown): UnwrappedApiError {
  if (error instanceof AxiosError && error.response?.data) {
    return new UnwrappedApiError(error.response.data as ApiError);
  }
  return new UnwrappedApiError({
    status: 0,
    error: "Network Error",
    message: error instanceof Error ? error.message : "Unknown error",
  });
}
