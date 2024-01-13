import Fastify, { FastifyInstance, FastifyLoggerOptions } from 'fastify';

// Plugins
import corsPlugin from '@plugins/cors';
import helmetPlugin from '@plugins/helmet';
import redisPlugin from '@plugins/redis';
import initSuperTokens from '@plugins/auth';

// Swagger Docs
import swaggerDocs from '@plugins/swagger';
// Routes

// Schema

const plugins = [initSuperTokens, corsPlugin, helmetPlugin, redisPlugin];

export const createFastifyInstance = (
  logger: FastifyLoggerOptions
): FastifyInstance => {
  return Fastify({ logger });
};

const registerPlugins = async (
  fastifyInstance: FastifyInstance
): Promise<void> => {
  for (const plugin of plugins) {
    await fastifyInstance.register(plugin);
  }
};

export const buildServer = async (logger: FastifyLoggerOptions) => {
  const app = createFastifyInstance(logger);

  app.get('/healthcheck', {
    handler: async () => {
      return { status: 'OK' };
    },
  });

  // Register Plugins here
  await registerPlugins(app);
  await app.register(swaggerDocs);

  // Register Routes here

  return app;
};
