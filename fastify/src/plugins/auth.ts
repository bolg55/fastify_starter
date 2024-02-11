import { env } from '@config/env';
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
      connectionURI: env.SUPERTOKENS_CONNECTION_URI,
      apiKey: env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
      appName: 'Fastify Starter',
      apiDomain: env.API_DOMAIN,
      websiteDomain: env.WEBSITE_DOMAIN,
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
