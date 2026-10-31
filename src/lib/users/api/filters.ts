import { UserRole, UserStatus, type UserFilters } from "./types";

const isUserRole = (value?: string): value is UserRole =>
  Object.values(UserRole).includes(value as UserRole);

const isUserStatus = (value?: string): value is UserStatus =>
  Object.values(UserStatus).includes(value as UserStatus);

export function buildUserFilters({
  page,
  size,
  search,
  role,
  status,
}: {
  page: number;
  size: number;
  search?: string;
  role?: string;
  status?: string;
}): UserFilters {
  return {
    page,
    size,
    search: search || undefined,
    // Valeur inconnue (ex. "All" ou URL modifiée) : filtre ignoré
    role: isUserRole(role) ? role : undefined,
    status: isUserStatus(status) ? status : undefined,
  };
}
