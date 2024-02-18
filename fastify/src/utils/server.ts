import Fastify, { FastifyInstance, FastifyLoggerOptions } from 'fastify';
import { plugin, errorHandler } from 'supertokens-node/framework/fastify';

// Plugins
import corsPlugin from '@plugins/cors';
import helmetPlugin from '@plugins/helmet';
import redisPlugin from '@plugins/redis';
import initSuperTokens from '@plugins/auth/auth';
import formDataPlugin from '@fastify/formbody';

// Swagger Docs
import swaggerDocs from '@plugins/swagger';
import { userSchemas } from 'schemas/userSchemas';
// Routes

// Schema

const plugins = [
  plugin,
  initSuperTokens,
  corsPlugin,
  helmetPlugin,
  redisPlugin,
  formDataPlugin,
];

const schemas = [...userSchemas];

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

const registerSchemas = async (
  fastifyInstance: FastifyInstance
): Promise<void> => {
  for (const schema of schemas) {
    await fastifyInstance.addSchema(schema);
  }
};

export const buildServer = async (logger: FastifyLoggerOptions) => {
  const app = createFastifyInstance(logger);
  app.setErrorHandler(errorHandler());

  app.get('/healthcheck', {
    handler: async () => {
      return { status: 'OK' };
    },
  });

  // Register Schemas here
  await registerSchemas(app);

  // Register Plugins here
  await registerPlugins(app);
  await app.register(swaggerDocs);

  // Register Routes here

  return app;
};
