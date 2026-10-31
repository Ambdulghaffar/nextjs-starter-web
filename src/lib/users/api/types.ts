import type { PageResponse } from "@/lib/common/types";
import type { Media } from "@/lib/media/api/types";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export const editableUserStatuses = [
  UserStatus.ACTIVE,
  UserStatus.BLOCKED,
  UserStatus.PENDING_VERIFICATION,
] as const;

export type EditableUserStatus = (typeof editableUserStatuses)[number];

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  /** Images ordonnées : la première est l'avatar */
  images: Media[];
  numberOfAddresses?: number;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export type UserSummary = Pick<
  User,
  | "id"
  | "firstName"
  | "lastName"
  | "images"
  | "email"
  | "role"
  | "phoneNumber"
  | "status"
  | "createdAt"
  | "updatedAt"
>;

export type UserFilters = {
  page?: number;
  size?: number;
  role?: UserRole | string;
  status?: UserStatus | string;
  search?: string;
  sort?: string;
};

export type UsersResponse = PageResponse<UserSummary>;

export type UserCreateRequest = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  status?: EditableUserStatus;
  password: string;
  imageIds?: number[];
};

export type UserUpdateRequest = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: UserRole;
  status?: EditableUserStatus;
  password?: string;
  imageIds?: number[];
};

export interface UserLogin {
  token: string;
  refreshToken: string;
  user: User;
}

export function getUserAvatarUrl(
  user: Pick<User, "images"> | Pick<UserSummary, "images">,
): string | null {
  return user.images[0]?.url ?? null;
}
