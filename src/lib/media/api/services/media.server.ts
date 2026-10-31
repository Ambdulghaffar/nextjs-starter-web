import "server-only";

import apiClient from "@config/api.config";
import environment from "@config/environment.config";
import { Result } from "@/lib/common/types";
import { ApiError } from "@/lib/common/api-error";
import type {
  Media,
  MediaContext,
  MediaRegisterRequest,
  UploadSignature,
} from "@/lib/media/api/types";

const {
  api: {
    rest: {
      endpoints: { media: mediaUrl },
    },
  },
} = environment;

export async function getUploadSignature(
  context?: MediaContext,
): Promise<Result<UploadSignature, ApiError>> {
  try {
    const res = await (
      await apiClient(true)
    ).get<UploadSignature>(`${mediaUrl}/signature`, {
      params: { context },
    });
    return { ok: true, data: res.data };
  } catch (error) {
    return { ok: false, error: ApiError(error, "getUploadSignature") };
  }
}

export async function registerMedia(
  payload: MediaRegisterRequest,
): Promise<Result<Media, ApiError>> {
  try {
    const res = await (await apiClient(true)).post<Media>(mediaUrl, payload);
    return { ok: true, data: res.data };
  } catch (error) {
    return { ok: false, error: ApiError(error, "registerMedia") };
  }
}
