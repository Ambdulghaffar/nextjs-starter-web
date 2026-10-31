import "server-only";

import apiClient from "@config/api.config";
import environment from "@config/environment.config";
import { getLogger } from "@/config/logger.config";
import type {
  ChangePasswordRequest,
  DeleteAccountRequest,
  ProfileResponse,
  ProfileUpdateRequest,
} from "@/lib/account/api/types";
import { Result } from "@/lib/common/types";
import { ApiError } from "@/lib/common/api-error";

const {
  api: {
    rest: {
      endpoints: { account: accountUrl },
    },
  },
} = environment;

const logger = getLogger("server");

export async function getMyProfile(): Promise<
  Result<ProfileResponse, ApiError>
> {
  try {
    const response = await (
      await apiClient(true)
    ).get<ProfileResponse>(`${accountUrl}/me`);

    logger.info(
      {
        id: response.data.id,
        email: response.data.email,
      },
      "Profile fetched successfully",
    );

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "getMyProfile"),
    };
  }
}

export async function updateMyProfile(
  data: ProfileUpdateRequest,
): Promise<Result<ProfileResponse, ApiError>> {
  try {
    const response = await (
      await apiClient(true)
    ).patch<ProfileResponse>(accountUrl, data);

    logger.info(
      {
        id: response.data.id,
        email: response.data.email,
      },
      "Profile updated successfully",
    );

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "updateMyProfile"),
    };
  }
}

export async function changeMyPassword(
  data: ChangePasswordRequest,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient(true)).post(`${accountUrl}/change-password`, data);

    logger.info(
      {
        email: "current user",
      },
      "Password updated successfully",
    );

    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "updateMyPassword"),
    };
  }
}

export async function deleteMyAccount(
  data: DeleteAccountRequest,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient(true)).delete(accountUrl, { data });

    logger.info(
      {
        message: data.message,
      },
      "Account deleted successfully",
    );

    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "deleteMyAccount"),
    };
  }
}
