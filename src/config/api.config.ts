import httpClient from "@config/axios.config";
import {
  anonTokenInterceptor,
  ownTokenInterceptor,
  sessionCookieInterceptor,
} from "@config/interceptors/auth.interceptor";
import { getLogger } from "@config/logger.config";
import { auth } from "@auth";

const logger = getLogger("server");

export type Config = {
  access_token?: string;
  headers?: Headers;
};

const apiLogger = (config?: Config) => {
  if (config?.headers) {
    const headers = new Headers(config.headers);
    const reqId = headers.get("X-Request-ID");

    if (reqId) {
      return logger.child({ reqId });
    }
  }

  return logger;
};

export default async function apiClient(own = false, config?: Config) {
  const instance = httpClient({
    logger: apiLogger(config),
  });

  if (!own) {
    instance.interceptors.request.use(anonTokenInterceptor);
    return instance;
  }

  const session = await auth();

  if (
    (session?.provider === "jwt" || session?.provider === "keycloak") &&
    !session.error
  ) {
    instance.interceptors.request.use((request) =>
      ownTokenInterceptor(request, session.access_token),
    );
  } else if (session?.provider === "session") {
    instance.interceptors.request.use(sessionCookieInterceptor);
  } else {
    instance.interceptors.request.use((request) =>
      ownTokenInterceptor(request),
    );
  }

  return instance;
}
