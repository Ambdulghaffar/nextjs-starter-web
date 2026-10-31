import environment from "@config/environment.config";

const { baseUrl, apiBaseUrl, apiProxyBase } = environment;

export const proxyEnvironment = {
  baseUrl,
  apiBaseUrl,
  apiProxyBase,
  api: {
    rest: {
      endpoints: {
        ai: `/ai`,
        addresses: `/addresses`,
        comments: `/comments`,
        posts: `/posts`,
        favorites: `/favorites`,
        likes: `/likes`,
        users: `/users`,
        account: `/account`,
        geocode: `/geocode`,
        auth: {
          register: `/auth/register`,
          login: `/auth/login`,
          logout: `/auth/logout`,
          forgotPassword: `/auth/forgot-password`,
          resetPassword: `/auth/reset-password`,
          verifyEmail: `/auth/verify-email`,
          resendVerification: `/auth/resend-verification`,
        },
        media: `/media`,
      },
    },
  },
};
