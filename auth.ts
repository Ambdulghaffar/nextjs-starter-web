import Keycloak from "next-auth/providers/keycloak";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import type { JWT } from "next-auth/jwt";
import environment from "@/config/environment.config";
import { AuthUser, JwtAuthResponse } from "@/lib/auth/api/types";
import NextAuth, { type DefaultSession, CredentialsSignin } from "next-auth";

// ---------------------------------------------------------------------------
// Codes de refus renvoyés par Spring au login (403 + message)
// ---------------------------------------------------------------------------

const LOGIN_ERROR_CODES = [
  "EMAIL_NOT_VERIFIED",
  "ACCOUNT_BLOCKED",
  "ACCOUNT_DELETED",
] as const;

type LoginErrorCode = (typeof LOGIN_ERROR_CODES)[number];

class LoginRejectedError extends CredentialsSignin {
  constructor(code: LoginErrorCode) {
    super();
    this.code = code;
  }
}

const {
  api: { backendUrl },
  auth: {
    trustHost,
    tokenRefreshBuffer,
    refreshResultTtl,
    keycloak: { clientId, clientSecret, issuer },
  },
} = environment;

// ---------------------------------------------------------------------------
// Type utilisé par Auth.js
// Le backend utilise un id numérique.
// Auth.js utilise un id string.
// ---------------------------------------------------------------------------

type AuthSessionUser = Omit<AuthUser, "id"> & {
  id: string;
};

// ---------------------------------------------------------------------------
// Helpers JWT
// ---------------------------------------------------------------------------

function decodeJwtPayload<T>(jwtToken: string): T | undefined {
  try {
    const payload = jwtToken.split(".")[1];

    return JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as T;
  } catch {
    return undefined;
  }
}

function extractExpiresAt(accessToken?: string): number | undefined {
  if (!accessToken) {
    return undefined;
  }

  const decoded = decodeJwtPayload<{ exp?: number }>(accessToken);

  return decoded?.exp;
}

// ---------------------------------------------------------------------------
// Récupération du profil utilisateur
// ---------------------------------------------------------------------------

async function getMyProfile(
  authHeaders: Record<string, string>,
): Promise<AuthUser> {
  const response = await fetch(`${backendUrl}/api/v1/account/me`, {
    headers: authHeaders,
  });

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer le profil utilisateur (status ${response.status})`,
    );
  }

  return (await response.json()) as AuthUser;
}

// ---------------------------------------------------------------------------
// Login Spring
// ---------------------------------------------------------------------------

async function springLogin(
  email: string,
  password: string,
): Promise<{
  data: JwtAuthResponse | undefined;
  setCookie: string[];
  errorCode: LoginErrorCode | undefined;
}> {
  const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => undefined)) as
      | { message?: string }
      | undefined;

    // Seuls les codes connus sont propagés ; tout le reste reste un échec
    // d'identifiants générique.
    const errorCode =
      response.status === 403
        ? LOGIN_ERROR_CODES.find((code) => code === body?.message)
        : undefined;

    return { data: undefined, setCookie: [], errorCode };
  }

  const setCookie = response.headers.getSetCookie?.() ?? [];
  const data = (await response.json().catch(() => undefined)) as
    | JwtAuthResponse
    | undefined;

  return { data, setCookie, errorCode: undefined };
}

// ---------------------------------------------------------------------------
// Conversion Set-Cookie → Cookie
// ---------------------------------------------------------------------------

function setCookieToCookieHeader(setCookie: string[]): string {
  return setCookie
    .map((raw) => raw.split(";")[0])
    .filter(Boolean)
    .join("; ");
}

// ---------------------------------------------------------------------------
// Refresh Keycloak
// ---------------------------------------------------------------------------

async function refreshKeycloakToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${issuer}/protocol/openid-connect/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token ?? "",
      }),
    });

    const refreshed = (await response.json()) as {
      access_token?: string;
      expires_in?: number;
      refresh_token?: string;
    };

    if (!response.ok || !refreshed.access_token) {
      throw new Error("Unable to refresh the Keycloak access token");
    }

    return {
      ...token,
      access_token: refreshed.access_token,
      expires_at: Math.floor(Date.now() / 1000) + (refreshed.expires_in ?? 0),
      refresh_token: refreshed.refresh_token ?? token.refresh_token,
      error: undefined,
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// ---------------------------------------------------------------------------
// Suit la chaîne R1 → R2 → R3 jusqu'au refresh token le plus récent connu.
// Un cookie en retard (ou écrasé par une réponse lente) retombe ainsi sur le
// bon token sans rappeler Spring.
// ---------------------------------------------------------------------------

async function applyKnownSuccessor(token: JWT): Promise<JWT> {
  let current = token;

  for (let i = 0; i < 10; i++) {
    const pending = current.refresh_token
      ? refreshCache.get(current.refresh_token)
      : undefined;

    if (!pending) break;

    const result = await pending;

    if (result.error) break;

    const sameToken = result.refresh_token === current.refresh_token;

    current = { ...current, ...result };

    // Évite de tourner en boucle si Spring ne renvoie pas de nouveau refresh token.
    if (sameToken) break;
  }

  return current;
}

// ---------------------------------------------------------------------------
// Refresh Spring JWT
// ---------------------------------------------------------------------------

type RefreshResult = Pick<
  JWT,
  "access_token" | "refresh_token" | "expires_at" | "error"
>;

// globalThis : partagé entre proxy.ts, Server Components et route handlers
// (bundles séparés, mais même processus Node).
type RefreshCache = Map<string, Promise<RefreshResult>>;

const globalForRefresh = globalThis as unknown as {
  springRefreshCache?: RefreshCache;
};

const refreshCache: RefreshCache = (globalForRefresh.springRefreshCache ??=
  new Map<string, Promise<RefreshResult>>());
async function refreshSpringToken(token: JWT): Promise<JWT> {
  const key = token.refresh_token;

  if (!key) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  let pending = refreshCache.get(key);

  if (!pending) {
    pending = (async (): Promise<RefreshResult> => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: key }),
        });

        if (!response.ok) {
          throw new Error("Unable to refresh the Spring access token");
        }

        const refreshed = (await response.json()) as JwtAuthResponse;

        return {
          access_token: refreshed.accessToken,
          refresh_token: refreshed.refreshToken ?? key,
          expires_at: extractExpiresAt(refreshed.accessToken),
          error: undefined,
        };
      } catch {
        return { error: "RefreshAccessTokenError" };
      }
    })();

    refreshCache.set(key, pending);

    // Succès : on garde le résultat 20 s pour les requêtes qui portent encore
    // l'ancien cookie. Échec : on libère tout de suite pour permettre un retry.
    void pending.then((result) => {
      setTimeout(
        () => refreshCache.delete(key),
        result.error ? 0 : refreshResultTtl,
      );
    });
  }

  const result = await pending;

  if (result.error) {
    return { ...token, error: result.error };
  }

  return { ...token, ...result };
}

// ---------------------------------------------------------------------------
// Providers
// ---------------------------------------------------------------------------

function buildProviders() {
  switch (environment.auth.provider) {
    // -----------------------------------------------------------------------
    // Keycloak
    // -----------------------------------------------------------------------

    case "keycloak":
      return [
        Keycloak({
          clientId,
          clientSecret,
          issuer,
        }),

        Keycloak({
          id: "keycloak-register",
          name: "Keycloak (register)",
          clientId,
          clientSecret,
          issuer,
          authorization: {
            url: `${issuer.replace(
              /\/$/,
              "",
            )}/protocol/openid-connect/registrations`,
          },
        }),
      ];

    // -----------------------------------------------------------------------
    // Spring JWT
    // -----------------------------------------------------------------------

    case "jwt":
      return [
        Credentials({
          id: "jwt-credentials",
          name: "JWT",

          credentials: {
            email: {
              label: "Email",
              type: "email",
            },
            password: {
              label: "Password",
              type: "password",
            },
          },

          authorize: async (credentials) => {
            const email = credentials?.email as string | undefined;

            const password = credentials?.password as string | undefined;

            if (!email || !password) {
              return null;
            }

            const { data, errorCode } = await springLogin(email, password);

            if (errorCode) {
              throw new LoginRejectedError(errorCode);
            }

            if (!data) {
              return null;
            }

            return {
              id: "pending",
              access_token: data.accessToken,
              refresh_token: data.refreshToken,
            };
          },
        }),
      ];

    // -----------------------------------------------------------------------
    // Spring Session
    // -----------------------------------------------------------------------

    case "session":
    default:
      return [
        Credentials({
          id: "session-credentials",
          name: "Session",

          credentials: {
            email: {
              label: "Email",
              type: "email",
            },
            password: {
              label: "Password",
              type: "password",
            },
          },

          authorize: async (credentials) => {
            const email = credentials?.email as string | undefined;

            const password = credentials?.password as string | undefined;

            if (!email || !password) {
              return null;
            }

            const { setCookie, errorCode } = await springLogin(email, password);

            if (errorCode) {
              throw new LoginRejectedError(errorCode);
            }

            if (setCookie.length === 0) {
              return null;
            }

            // ---------------------------------------------------------------
            // Dépose le cookie Spring Session
            // ---------------------------------------------------------------

            const cookieStore = await cookies();

            for (const rawCookie of setCookie) {
              const [nameValue] = rawCookie.split(";");

              const [name, value] = nameValue.split("=");

              cookieStore.set(name.trim(), value, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
              });
            }

            // ---------------------------------------------------------------
            // Récupère le profil complet
            // ---------------------------------------------------------------

            let user: AuthUser;

            try {
              user = await getMyProfile({
                Cookie: setCookieToCookieHeader(setCookie),
              });
            } catch {
              return null;
            }

            // Auth.js attend id: string.
            return {
              id: String(user.id),
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              images: user.images,
              role: user.role,
              status: user.status,
              numberOfAddresses: user.numberOfAddresses,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            };
          },
        }),
      ];
  }
}

// ---------------------------------------------------------------------------
// NextAuth
// ---------------------------------------------------------------------------

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: buildProviders(),

  trustHost,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // -----------------------------------------------------------------------
    // JWT callback
    // -----------------------------------------------------------------------

    async jwt({ token, account, user, trigger, session }) {
      // ---------------------------------------------------------------------
      // Mise à jour du profil dans la session
      // ---------------------------------------------------------------------

      if (trigger === "update" && session?.user) {
        token.user = {
          ...token.user,
          ...session.user,
          id: Number(session.user.id),
        };

        return token;
      }

      // ---------------------------------------------------------------------
      // Keycloak
      // ---------------------------------------------------------------------

      if (account?.provider === "keycloak") {
        let currentUser: AuthUser | undefined;

        try {
          currentUser = await getMyProfile({
            Authorization: `Bearer ${account.access_token}`,
          });
        } catch {
          // Le provisioning JIT peut nécessiter
          // un délai lors du premier login.
        }

        return {
          ...token,

          provider: "keycloak",

          access_token: account.access_token,

          refresh_token: account.refresh_token,

          expires_at:
            account.expires_at ??
            Math.floor(Date.now() / 1000) + (account.expires_in ?? 0),

          user: currentUser,
        };
      }

      // ---------------------------------------------------------------------
      // Spring JWT
      // ---------------------------------------------------------------------

      if (account?.provider === "jwt-credentials" && user) {
        const credentialsUser = user as {
          access_token: string;
          refresh_token: string;
        };

        let currentUser: AuthUser | undefined;

        try {
          currentUser = await getMyProfile({
            Authorization: `Bearer ${credentialsUser.access_token}`,
          });
        } catch {
          // Latence éventuelle côté Spring.
        }

        return {
          ...token,

          provider: "jwt",

          access_token: credentialsUser.access_token,

          refresh_token: credentialsUser.refresh_token,

          expires_at: extractExpiresAt(credentialsUser.access_token),

          user: currentUser,
        };
      }

      // ---------------------------------------------------------------------
      // Spring Session
      // ---------------------------------------------------------------------

      if (account?.provider === "session-credentials" && user) {
        const authUser = user as AuthSessionUser;

        return {
          ...token,
          provider: "session",
          user: {
            ...authUser,
            id: Number(authUser.id),
          },

          // Aucun access_token.
          // Spring Session gère l'authentification.
        };
      }

      // ---------------------------------------------------------------------
      // Spring Session :
      // aucun refresh de token nécessaire
      // ---------------------------------------------------------------------

      if (token.provider === "session") {
        return token;
      }

      // ---------------------------------------------------------------------
      // Cookie en retard : on repart du token le plus récent connu
      // ---------------------------------------------------------------------

      const current = await applyKnownSuccessor(token);

      // ---------------------------------------------------------------------------
      // Access token encore valide
      // ---------------------------------------------------------------------------

      if (
        current.expires_at &&
        Date.now() < current.expires_at * 1000 - tokenRefreshBuffer
      ) {
        return current;
      }

      // ---------------------------------------------------------------------
      // Refresh
      // ---------------------------------------------------------------------

      return token.provider === "keycloak"
        ? refreshKeycloakToken(current)
        : refreshSpringToken(current);
    },

    // -----------------------------------------------------------------------
    // Session callback
    // -----------------------------------------------------------------------

    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
          id: String(token.user.id),
        };
      }

      session.provider = token.provider;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.expires_at = token.expires_at;
      session.error = token.error;
      return session;
    },
  },
});

// ---------------------------------------------------------------------------
// NextAuth Session types
// ---------------------------------------------------------------------------

declare module "next-auth" {
  interface Session {
    provider?: "keycloak" | "jwt" | "session";

    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    error?: string;
    user: AuthSessionUser & DefaultSession["user"];
  }
}

// ---------------------------------------------------------------------------
// NextAuth JWT types
// ---------------------------------------------------------------------------

declare module "next-auth/jwt" {
  interface JWT {
    provider?: "keycloak" | "jwt" | "session";

    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    error?: string;
    /**
     * Profil complet provenant de
     * GET /api/v1/account/me
     */
    user?: AuthUser;
  }
}
