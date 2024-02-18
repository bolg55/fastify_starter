import { FastifyInstance } from 'fastify';
import { plugin } from 'supertokens-node/framework/fastify';

// Plugins
import corsPlugin from '@plugins/cors';
import helmetPlugin from '@plugins/helmet';
import redisPlugin from '@plugins/redis';
import initSuperTokens from '@plugins/auth/auth';
import formDataPlugin from '@fastify/formbody';

const plugins = [
  plugin,
  initSuperTokens,
  corsPlugin,
  helmetPlugin,
  redisPlugin,
  formDataPlugin,
];

export const registerPlugins = async (
  fastifyInstance: FastifyInstance
): Promise<void> => {
  for (const plugin of plugins) {
    await fastifyInstance.register(plugin);
  }
};
