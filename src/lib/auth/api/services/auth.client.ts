import { proxyEnvironment } from "@config/proxy-api.config";
import { frontendHttp } from "@config/axios/frontend-http.config";
import { unwrapApiError } from "@/lib/common/handle-api-error";
import type {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "../types";

const {
  api: {
    rest: {
      endpoints: {
        auth: {
          register: registerUrl,
          login: loginUrl,
          logout: logoutUrl,
          forgotPassword: forgotPasswordUrl,
          resetPassword: resetPasswordUrl,
          verifyEmail: verifyEmailUrl,
          resendVerification: resendVerificationUrl,
        },
      },
    },
  },
} = proxyEnvironment;

export async function signIn(login: LoginRequest): Promise<void> {
  try {
    await frontendHttp().post(loginUrl, login);
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function signUp(registration: RegisterRequest): Promise<void> {
  try {
    await frontendHttp().post(registerUrl, registration);
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function verifyEmail(data: VerifyEmailRequest): Promise<void> {
  try {
    await frontendHttp().post(verifyEmailUrl, data);
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function resendVerification(email: string): Promise<void> {
  try {
    await frontendHttp().post(resendVerificationUrl, { email });
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await frontendHttp().post(logoutUrl);
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function forgotPassword(email: string): Promise<void> {
  try {
    await frontendHttp().post(forgotPasswordUrl, { email });
  } catch (error) {
    throw unwrapApiError(error);
  }
}

export async function resetPassword(data: ResetPasswordRequest): Promise<void> {
  try {
    await frontendHttp().post(resetPasswordUrl, data);
  } catch (error) {
    throw unwrapApiError(error);
  }
}
