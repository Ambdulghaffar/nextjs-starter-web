import { proxyEnvironment } from "@config/proxy-api.config";
import { frontendHttp } from "@config/axios/frontend-http.config";
import { User } from "@/lib/users/api/types";
import type {
  ChangePasswordRequest,
  DeleteAccountRequest,
  ProfileUpdateRequest,
} from "@/lib/account/api/types";
import { unwrapApiError } from "@/lib/common/handle-api-error";

const {
  api: {
    rest: {
      endpoints: { account: accountUrl },
    },
  },
} = proxyEnvironment;

// --- Queries ---

export async function getMyProfile(): Promise<User> {
  try {
    const res = await frontendHttp().get<User>(`${accountUrl}/me`);
    return res.data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}

// --- Mutations ---
export async function updateMyProfile(
  payload: ProfileUpdateRequest,
): Promise<User> {
  try {
    const res = await frontendHttp().patch<User>(accountUrl, payload);
    return res.data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function changeMyPassword(
  payload: ChangePasswordRequest,
): Promise<void> {
  try {
    await frontendHttp().post(`${accountUrl}/change-password`, payload);
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function deleteMyAccount(
  payload: DeleteAccountRequest,
): Promise<void> {
  try {
    await frontendHttp().delete(accountUrl, { data: payload });
  } catch (error) {
    throw unwrapApiError(error);
  }
}
