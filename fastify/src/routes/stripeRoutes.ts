import { stripeCustomerPortalHandler } from 'controllers/stripeControllers';
import { FastifyInstance } from 'fastify';
import getUserMiddleware from 'middlewares/getUserMiddleware';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';

const stripeRoutes = async (server: FastifyInstance) => {
  server.route({
    method: 'GET',
    url: '/customer-portal',
    schema: {
      tags: ['Stripe'],
    },
    preHandler: [verifySession(), getUserMiddleware],
    handler: stripeCustomerPortalHandler,
  });
};

export default stripeRoutes;
