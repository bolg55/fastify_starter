import {
  stripeCheckoutSessionHandler,
  stripeCustomerPortalHandler,
} from 'controllers/stripeControllers';
import { FastifyInstance } from 'fastify';
import getUserMiddleware from 'middlewares/getUserMiddleware';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';

const stripeRoutes = async (server: FastifyInstance) => {
  server.get('/customer-portal', {
    schema: {
      tags: ['Stripe'],
    },
    preHandler: [verifySession(), getUserMiddleware],
    handler: stripeCustomerPortalHandler,
  });

  server.post('/checkout-session', {
    schema: {
      tags: ['Stripe'],
    },
    preHandler: [verifySession(), getUserMiddleware],
    handler: stripeCheckoutSessionHandler,
  });
};

export default stripeRoutes;
