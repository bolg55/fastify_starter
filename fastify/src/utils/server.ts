import Fastify, { FastifyInstance, FastifyLoggerOptions } from 'fastify';
import { errorHandler } from 'supertokens-node/framework/fastify';

// Registration
import { registerPlugins } from 'registration/registerPlugins';
import { registerSchemas } from 'registration/registerSchemas';
import { registerRoutes } from 'registration/registerRoutes';

// Swagger Docs
import swaggerDocs from '@plugins/swagger';

export const createFastifyInstance = (
  logger: FastifyLoggerOptions
): FastifyInstance => {
  return Fastify({ logger });
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
  await registerRoutes(app);

  return app;
};
