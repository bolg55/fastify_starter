import { FastifyInstance } from 'fastify';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';
import getUserMiddleware from 'middlewares/getUserMiddleware';
import { getMeHandler } from 'controllers/meControllers';

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
};

export default meRoutes;
