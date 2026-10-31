import "server-only";

import apiClient from "@config/api.config";
import environment from "@config/environment.config";
import { getLogger } from "@config/logger.config";
import type {
  User,
  UserCreateRequest,
  UserFilters,
  UserUpdateRequest,
  UsersResponse,
} from "@/lib/users/api/types";
import { Result } from "@/lib/common/types";
import { ApiError } from "@/lib/common/api-error";
const {
  api: {
    rest: {
      endpoints: { users: usersUrl },
    },
  },
} = environment;

const logger = getLogger("server");

const userUrl = (id: number) => `${usersUrl}/${id}`;

export async function getUsers(
  filters: UserFilters = {},
): Promise<Result<UsersResponse, ApiError>> {
  try {
    const res = await (
      await apiClient(true)
    ).get<UsersResponse>(usersUrl, {
      params: filters,
    });

    logger.info({ count: res.data?.content?.length || 0 }, "Users fetched");

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "getUsers"),
    };
  }
}

export async function getUserById(id: number): Promise<Result<User, ApiError>> {
  try {
    const response = await (await apiClient(true)).get<User>(userUrl(id));

    logger.info({ id: response.data.id }, "User fetched");

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "getUserById"),
    };
  }
}

export async function createUser(
  data: UserCreateRequest,
): Promise<Result<User, ApiError>> {
  try {
    const res = await (await apiClient(true)).post<User>(usersUrl, data);

    logger.info({ id: res.data.id }, "User created successfully");

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "createUser"),
    };
  }
}

export async function updateUser(
  id: number,
  data: UserUpdateRequest,
): Promise<Result<User, ApiError>> {
  try {
    const response = await (
      await apiClient(true)
    ).patch<User>(userUrl(id), data);

    logger.info({ id, email: response.data.email }, "User updated");

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "updateUser"),
    };
  }
}

export async function softDeleteUser(
  id: number,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient(true)).delete(userUrl(id));
    logger.info({ id }, "User soft deleted");

    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "softDeleteUser"),
    };
  }
}

export async function hardDeleteUser(
  id: number,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient(true)).delete(`${userUrl(id)}/purge`);
    logger.info({ id }, "User permanently deleted");

    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "hardDeleteUser"),
    };
  }
}
