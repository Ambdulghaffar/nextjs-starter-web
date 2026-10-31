import "server-only";

import apiClient from "@/config/api.config";
import environment from "@/config/environment.config";
import { getLogger } from "@/config/logger.config";

import type {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "@/lib/auth/api/types";
import { ApiError } from "@/lib/common/api-error";
import { signIn, signOut } from "@/../auth";
import { ROUTES } from "@/utils/routes";
import { Result } from "@/lib/common/types";

const { SIGN_IN } = ROUTES;
const logger = getLogger("server");

// Page d'arrivée après connexion Keycloak : adapte à ta route d'accueil.
const AFTER_LOGIN = "/dashboard";

const {
  api: {
    rest: {
      endpoints: {
        auth: {
          register: registerUrl,
          logout: logoutUrl,
          forgotPassword: forgotPasswordUrl,
          resetPassword: resetPasswordUrl,
          verifyEmail: verifyEmailUrl,
          resendVerification: resendVerificationUrl,
        },
      },
    },
  },
} = environment;

const provider = environment.auth.provider;

// Codes de refus propagés depuis auth.ts (LoginRejectedError.code).
const LOGIN_ERRORS: Record<string, ApiError & { code?: string }> = {
  EMAIL_NOT_VERIFIED: {
    status: 403,
    error: "Forbidden",
    code: "EMAIL_NOT_VERIFIED",
    message: "Email non vérifié. Un lien de confirmation vous a été envoyé.",
  },
  ACCOUNT_BLOCKED: {
    status: 403,
    error: "Forbidden",
    code: "ACCOUNT_BLOCKED",
    message: "Votre compte a été bloqué. Veuillez contacter un administrateur.",
  },
  ACCOUNT_DELETED: {
    status: 403,
    error: "Forbidden",
    code: "ACCOUNT_DELETED",
    message: "Ce compte a été supprimé.",
  },
};

/**
 * `signIn` / `signOut` (Auth.js) redirigent en levant une erreur NEXT_REDIRECT.
 * Elle doit être relancée, sinon la redirection est perdue.
 */
function isRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  );
}

function getErrorCode(error: unknown): string | undefined {
  return typeof error === "object" && error !== null && "code" in error
    ? String(error.code)
    : undefined;
}

function isCredentialsSignin(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "CredentialsSignin"
  );
}

export async function login(
  data: LoginRequest,
): Promise<Result<void, ApiError>> {
  try {
    if (provider === "keycloak") {
      // Redirige vers Keycloak (NEXT_REDIRECT relancé dans le catch).
      await signIn("keycloak", { redirectTo: AFTER_LOGIN });
    } else {
      const providerId =
        provider === "jwt" ? "jwt-credentials" : "session-credentials";

      await signIn(providerId, {
        email: data.email,
        password: data.password,
        redirect: false,
      });
    }

    logger.info({ provider }, "User signed in");

    return { ok: true, data: undefined };
  } catch (error) {
    if (isRedirect(error)) throw error;

    // 1) Refus explicites du backend (compte bloqué, supprimé, email non vérifié).
    //    À tester AVANT "CredentialsSignin" : ces erreurs héritent de ce type.
    const code = getErrorCode(error);
    const knownError = code ? LOGIN_ERRORS[code] : undefined;

    if (knownError) {
      return { ok: false, error: knownError };
    }

    // 2) Identifiants incorrects
    if (isCredentialsSignin(error)) {
      return {
        ok: false,
        error: {
          status: 401,
          error: "Unauthorized",
          message: "Email ou mot de passe incorrect.",
        },
      };
    }

    return { ok: false, error: ApiError(error, "signIn") };
  }
}

export async function signUp(
  data: RegisterRequest,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient()).post(registerUrl, data);

    logger.info("User registered");

    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: ApiError(error, "signUp") };
  }
}

export async function verifyEmail(
  data: VerifyEmailRequest,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient()).post(verifyEmailUrl, data);

    logger.info("Email verified");

    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: ApiError(error, "verifyEmail") };
  }
}

export async function resendVerification(
  email: string,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient()).post(resendVerificationUrl, { email });

    logger.info("Verification email resend requested");

    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: ApiError(error, "resendVerification") };
  }
}

export async function logout(): Promise<Result<void, ApiError>> {
  // Un échec côté backend (down, session déjà expirée) ne doit pas
  // empêcher la déconnexion locale : on logge et on continue.
  if (provider === "session") {
    try {
      await (await apiClient()).post(logoutUrl);
    } catch (error) {
      ApiError(error, "logout.backend");
    }
  }

  try {
    await signOut({ redirectTo: SIGN_IN });

    logger.info({ provider }, "User signed out");

    return { ok: true, data: undefined };
  } catch (error) {
    if (isRedirect(error)) throw error;

    return { ok: false, error: ApiError(error, "logout") };
  }
}

export async function forgotPassword(
  email: string,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient()).post(forgotPasswordUrl, { email });

    logger.info("Password reset requested");

    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: ApiError(error, "forgotPassword") };
  }
}

export async function resetPassword(
  data: ResetPasswordRequest,
): Promise<Result<void, ApiError>> {
  try {
    await (await apiClient()).post(resetPasswordUrl, data);

    logger.info("Password reset successfully");

    return { ok: true, data: undefined };
  } catch (error) {
    return { ok: false, error: ApiError(error, "resetPassword") };
  }
}
