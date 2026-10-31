import type { User } from "@/lib/users/api/types";

export type KeycloakProfile = {
  sub?: string;
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  realm_access?: { roles?: string[] };
};

export type JwtAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
};

export type VerifyEmailRequest = {
  token: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type AuthUser = User;
