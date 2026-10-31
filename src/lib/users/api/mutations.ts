import { mutationOptions } from "@tanstack/react-query";
import { userKeys } from "./queries";
import { getQueryClient } from "@/lib/query-client";
import { UserCreateFormValues, UserUpdateFormValues } from "../schemas/user";
import type { ApiError } from "@/lib/common/api-error";
import type { User } from "./types";
import {
  createUser,
  updateUser,
  hardDeleteUser,
  softDeleteUser,
} from "./services/user.client";

export const createUserMutation = mutationOptions<
  User,
  ApiError,
  UserCreateFormValues,
  unknown
>({
  mutationFn: (payload) => createUser(payload),
  onSuccess: () => {
    void getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});

export const updateUserMutation = mutationOptions<
  User,
  ApiError,
  { id: number; values: UserUpdateFormValues },
  unknown
>({
  mutationFn: ({ id, values }) => updateUser(id, values),
  onSuccess: () => {
    void getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});

export const softDeleteUserMutation = mutationOptions<
  void,
  ApiError,
  number,
  unknown
>({
  mutationFn: (id) => softDeleteUser(id),
  onSuccess: () => {
    void getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});

export const hardDeleteUserMutation = mutationOptions<
  void,
  ApiError,
  number,
  unknown
>({
  mutationFn: (id) => hardDeleteUser(id),
  onSuccess: () => {
    void getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});
