import fastifyPlugin from 'fastify-plugin';
import supertokens from 'supertokens-node';
import supertokensConfig from './superTokensConfig';

const initSuperTokens = async () => {
  supertokens.init(supertokensConfig);
};

export default fastifyPlugin(initSuperTokens);
