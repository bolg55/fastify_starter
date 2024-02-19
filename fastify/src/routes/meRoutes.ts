import { FastifyInstance } from 'fastify';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';
import getUserMiddleware from 'middlewares/getUserMiddleware';
import { getMeHandler, updateMeHandler } from 'controllers/meControllers';
import { $ref } from 'schemas/meSchemas';

const meRoutes = async (server: FastifyInstance) => {
  server.route({
    method: 'GET',
    url: '/me',
    schema: {
      tags: ['Me'],
    },
    preHandler: [verifySession(), getUserMiddleware],
    handler: getMeHandler,
  });

  server.route({
    method: 'PATCH',
    url: '/me',
    schema: {
      tags: ['Me'],
      response: {
        200: $ref('updateUserSchema'),
      },
    },
    preHandler: [verifySession(), getUserMiddleware],
    handler: updateMeHandler,
  });
};

export default meRoutes;
