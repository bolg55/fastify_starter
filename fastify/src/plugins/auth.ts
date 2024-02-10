import fastifyPlugin from 'fastify-plugin';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session/index.js';
import Dashboard from 'supertokens-node/recipe/dashboard/index.js';
import UserRoles from 'supertokens-node/recipe/userroles/index.js';
import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';
import authProviders from '@utils/providers';

const initSuperTokens = async () => {
  supertokens.init({
    framework: 'fastify',
    supertokens: {
      connectionURI:
        process.env.SUPERTOKENS_CONNECTION_URI || 'https://try.supertokens.io',
      apiKey: process.env.SUPERTOKENS_API_KEY || 'tryout-supertokens-api-key',
    },
    appInfo: {
      appName: 'Fastify Starter',
      apiDomain: process.env.API_DOMAIN || 'http://localhost:8080',
      websiteDomain: process.env.WEBSITE_DOMAIN || 'http://localhost:3000',
      apiBasePath: '/api/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      ThirdPartyPasswordless.init({
        flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
        contactMethod: 'EMAIL',
        providers: authProviders,
      }),
      Session.init(),
      Dashboard.init(),
      UserRoles.init(),
    ],
  });
};

export default fastifyPlugin(initSuperTokens);
