import { FastifyInstance } from 'fastify';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';
import getUserMiddleware from 'middlewares/getUserMiddleware';
import { getMeHandler, updateMeHandler } from 'controllers/meControllers';
import { $ref } from 'schemas/meSchemas';

const meRoutes = async (server: FastifyInstance) => {
  server.get('/me', {
    schema: {
      tags: ['Me'],
      response: {
        200: $ref('getMeResponseSchema'),
      },
    },
    preHandler: [verifySession(), getUserMiddleware],
    handler: getMeHandler,
  });

  server.patch('/me', {
    schema: {
      tags: ['Me'],
      body: $ref('updateUserRequestBodySchema'),
      response: {
        200: $ref('getMeResponseSchema'),
      },
    },
    preHandler: [verifySession(), getUserMiddleware],
    handler: updateMeHandler,
  });
};

export default meRoutes;
