import { proxyEnvironment } from "@config/proxy-api.config";
import { frontendHttp } from "@config/axios/frontend-http.config";
import { User, UserFilters, UsersResponse } from "@/lib/users/api/types";
import { UserCreateFormValues, UserUpdateFormValues } from "../../schemas/user";
import { unwrapApiError } from "@/lib/common/handle-api-error";

const {
  api: {
    rest: {
      endpoints: { users: usersUrl },
    },
  },
} = proxyEnvironment;

/** confirmPassword sert seulement à la validation du formulaire */
function withoutConfirmPassword<T extends { confirmPassword?: unknown }>(
  payload: T,
): Omit<T, "confirmPassword"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...rest } = payload;
  return rest;
}

// --- Queries ---

export async function fetchUsers(
  filters: UserFilters = {},
): Promise<UsersResponse> {
  try {
    const { data } = await frontendHttp().get<UsersResponse>(usersUrl, {
      params: filters,
    });
    return data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function fetchUserById(id: number): Promise<User> {
  try {
    const { data } = await frontendHttp().get<User>(`${usersUrl}/${id}`);
    return data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}

// --- Mutations ---

export async function createUser(payload: UserCreateFormValues): Promise<User> {
  try {
    const { data } = await frontendHttp().post<User>(
      usersUrl,
      withoutConfirmPassword(payload),
    );
    return data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function updateUser(
  id: number,
  payload: UserUpdateFormValues,
): Promise<User> {
  try {
    const { data } = await frontendHttp().patch<User>(
      `${usersUrl}/${id}`,
      withoutConfirmPassword(payload),
    );
    return data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function softDeleteUser(id: number): Promise<void> {
  try {
    await frontendHttp().delete(`${usersUrl}/${id}`);
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function hardDeleteUser(id: number): Promise<void> {
  try {
    await frontendHttp().delete(`${usersUrl}/${id}/purge`);
  } catch (error) {
    throw unwrapApiError(error);
  }
}
