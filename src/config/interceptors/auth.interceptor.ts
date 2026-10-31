import environment from "@config/environment.config";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getLogger } from "@config/logger.config";
import { cookies } from "next/headers";

const SPRING_SESSION_COOKIE = "SESSION";

const {
  api: {
    rest: {
      endpoints: {
        auth: { register, login },
      },
    },
  },
} = environment;
const logger = getLogger();
const SAFE_URLS = [register, login];

const isSafeUrl = (candidate: string): boolean => {
  return SAFE_URLS.some((url: string) => candidate.startsWith(url));
};

export const sessionCookieInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get(SPRING_SESSION_COOKIE);

  if (sessionCookie) {
    config.headers.Cookie = `${SPRING_SESSION_COOKIE}=${sessionCookie.value}`;
  }

  return config;
};

export const expiredSessionInterceptor = async (error: AxiosError) => {
  const status = error.response?.status;

  if (status === 401) {
    logger.error("Session expired or unauthorized access");
  }

  return Promise.reject(error);
};

export const anonTokenInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  const { url } = config;
  if (url && isSafeUrl(url)) {
    logger.info(`Request to safe URL ${url}, skipping token interceptor`);
  }
  return config;
};

export const ownTokenInterceptor = async (
  config: InternalAxiosRequestConfig,
  access_token?: string,
) => {
  if (!access_token) {
    const error = new AxiosError(
      "Not Authenticated",
      "ERR_UNAUTHORIZED",
      config,
    );

    error.response = {
      data: {
        status: 401,
        error: "Unauthorized",
        message: "Not Authenticated",
      },
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config,
    };

    throw error;
  }

  config.headers.Authorization = `Bearer ${access_token}`;

  return config;
};
