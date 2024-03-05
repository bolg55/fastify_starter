import { env } from '@config/env';
import Session from 'supertokens-node/recipe/session/index.js';
import Dashboard from 'supertokens-node/recipe/dashboard/index.js';
import UserRoles from 'supertokens-node/recipe/userroles/index.js';
import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';
import authProviders from '@utils/providers';
import thirdPartySignInUpOverride from './overrides/thirdPartySignInUpOverride';
import consumeCodeOverride from './overrides/consumeCodeOverride';
import { TypeFramework } from 'supertokens-node/lib/build/framework/types';

const supertokensConfig = {
  framework: 'fastify' as TypeFramework,
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
      flowType: 'MAGIC_LINK',
      contactMethod: 'EMAIL',
      providers: authProviders,

      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            thirdPartySignInUp: thirdPartySignInUpOverride(
              originalImplementation
            ),

            consumeCode: consumeCodeOverride(originalImplementation),
          };
        },
      },
    }),
    Session.init(),
    Dashboard.init(),
    UserRoles.init(),
  ],
};

export default supertokensConfig;
