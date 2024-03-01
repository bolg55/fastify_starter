import { env } from '@config/env';
import { stripe } from '@config/stripeConfig';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  cancelStripeSubscription,
  updateStripeSubscription,
} from 'services/stripeServices';
import Stripe from 'stripe';

const baseURL = env.WEBSITE_DOMAIN;

export const stripeCustomerPortalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const custId =
    request.userData?.userProfile?.subscriptions[0]?.stripeCustomerId;

  if (!custId) {
    return reply.code(404).send({
      status: 'error',
      message: 'Stripe customer ID not found',
    });
  }

  const { url } = await stripe.billingPortal.sessions.create({
    customer: custId,
    return_url: `${baseURL}/secret`,
  });

  return reply.code(200).send({
    status: 'success',
    message: 'Billing portal session created successfully',
    url,
  });
};

export const stripeCheckoutSessionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { planId } = request.body as { planId: string };
  const userId = request.userData?.userProfile?.id;
  const stripeCustomerId =
    request.userData?.userProfile?.subscriptions[0].stripeCustomerId;

  // Handle errors
  if (!userId) {
    return reply.code(404).send({
      status: 'error',
      message: 'User ID not found',
    });
  }

  // Create a new checkout session
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    line_items: [
      {
        price: planId,
        quantity: 1,
      },
    ],
    success_url: `${baseURL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseURL}/cancel`,
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
      metadata: {
        payingUserId: userId as string,
      },
    },
  };

  const checkoutSession = await stripe.checkout.sessions.create(params);
  return reply.code(200).send({
    status: 'success',
    message: 'Checkout session created successfully',
    sessionId: checkoutSession.id,
  });
};

export const stripeWebhookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const sig = request.headers['stripe-signature'] as string;
  const endpointSecret = env.STRIPE_WEBHOOK_SECRET;
  const rawBody = request.rawBody;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody as Buffer,
      sig,
      endpointSecret
    );
  } catch (err) {
    if (err instanceof Error) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return reply.code(400).send(`Webhook signature verification failed.`);
    }
    return reply.code(400).send(`Webhook signature verification failed.`);
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata.payingUserId;
      if (userId) {
        await updateStripeSubscription(
          subscription,
          request.server.redis,
          userId
        );
      }

      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata.payingUserId;
      if (userId) {
        await cancelStripeSubscription(
          subscription,
          request.server.redis,
          userId
        );
      }
      break;
    }
    case 'payment_intent.succeeded':
      // const paymentIntent = event.data.object
      console.log('PaymentIntent was successful!');
      break;
    default:
      console.error('Event type not supported');
      return;
  }

  reply.code(200).send({ received: true });
  return;
};
