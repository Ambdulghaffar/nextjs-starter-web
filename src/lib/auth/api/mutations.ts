"use client";

import { mutationOptions } from "@tanstack/react-query";
import type { ApiError } from "@/lib/common/api-error";
import {
  forgotPassword,
  logout,
  resendVerification,
  resetPassword,
  signIn,
  signUp,
  verifyEmail,
} from "@/lib/auth/api/services/auth.client";
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "@/lib/auth/api/types";

export const signInMutation = mutationOptions<
  void,
  ApiError,
  LoginRequest,
  unknown
>({
  mutationFn: signIn,
});

export const signUpMutation = mutationOptions<
  void,
  ApiError,
  RegisterRequest,
  unknown
>({
  mutationFn: signUp,
});

export const logoutMutation = mutationOptions<void, ApiError, void, unknown>({
  mutationFn: () => logout(),
});

export const forgotPasswordMutation = mutationOptions<
  void,
  ApiError,
  { email: string },
  unknown
>({
  mutationFn: (data) => forgotPassword(data.email),
});

export const resetPasswordMutation = mutationOptions<
  void,
  ApiError,
  ResetPasswordRequest,
  unknown
>({
  mutationFn: (data) => resetPassword(data),
});

export const verifyEmailMutation = mutationOptions<
  void,
  ApiError,
  VerifyEmailRequest,
  unknown
>({
  mutationFn: verifyEmail,
});

export const resendVerificationMutation = mutationOptions<
  void,
  ApiError,
  { email: string },
  unknown
>({
  mutationFn: (data) => resendVerification(data.email),
});
