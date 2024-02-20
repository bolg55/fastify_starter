import ThirdPartyPasswordless from 'supertokens-auth-react/recipe/thirdpartypasswordless';
import Session from 'supertokens-auth-react/recipe/session';

export const SuperTokensConfig = {
  appInfo: {
    appName: 'Fastify Starter',
    apiDomain: 'https://fastifystarter-production.up.railway.app',
    websiteDomain: 'http://localhost:5173',
    apiBasePath: '/api/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    ThirdPartyPasswordless.init({
      contactMethod: 'EMAIL',
      signInUpFeature: {
        providers: [
          ThirdPartyPasswordless.Github.init(),
          ThirdPartyPasswordless.Google.init(),
          ThirdPartyPasswordless.Facebook.init(),
          ThirdPartyPasswordless.Apple.init(),
        ],
      },
    }),
    Session.init(),
  ],
};
