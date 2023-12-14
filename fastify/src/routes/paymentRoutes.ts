import { FastifyInstance } from 'fastify';
import {
  createPaymentIntent,
  createSubscription,
} from '@services/stripeService';

const paymentRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/payment-intent', async (request, reply) => {
    const { amount, currency } = request.body;
    const paymentIntent = await createPaymentIntent(amount, currency);
    reply.send(paymentIntent);
  });

  fastify.post('/subscription', async (request, reply) => {
    const { customerId, priceId } = request.body;
    const subscription = await createSubscription(customerId, priceId);
    reply.send(subscription);
  });
};
