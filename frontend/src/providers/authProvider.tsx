import ThirdPartyPasswordless from 'supertokens-web-js/recipe/thirdpartypasswordless';
import Session from 'supertokens-web-js/recipe/session';

export const SuperTokensConfig = {
  appInfo: {
    appName: 'Fastify Starter',
    apiDomain: import.meta.env.VITE_API_DOMAIN,
    websiteDomain: import.meta.env.VITE_WEBSITE_DOMAIN,
    apiBasePath: '/api/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [ThirdPartyPasswordless.init(), Session.init()],
};
