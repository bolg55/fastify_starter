import { env } from '@config/env';
import { stripe } from '@config/stripeConfig';
import { FastifyReply, FastifyRequest } from 'fastify';
import Stripe from 'stripe';

const baseURL = env.WEBSITE_DOMAIN;

export const stripeCustomerPortalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const custId =
    request.userData?.userProfile.subscriptions[0]?.stripeCustomerId;

  if (!custId) {
    return reply.code(404).send({
      status: 'error',
      message: 'Stripe customer ID not found',
    });
  }

  try {
    const { url } = await stripe.billingPortal.sessions.create({
      customer: custId,
      return_url: `${baseURL}/secret`,
    });

    return reply.code(200).send({
      status: 'success',
      message: 'Billing portal session created successfully',
      url,
    });
  } catch (error) {
    request.log.error(
      `Error creating billing portal session: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
    return reply.code(500).send({
      status: 'error',
      message: 'Failed to create billing portal session',
    });
  }
};

export const stripeCheckoutSessionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { priceId } = request.body as { priceId: string };
  const userId = request.userData?.userProfile.id;

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    line_items: [
      {
        price: priceId,
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

  // Handle errors
  if (!userId) {
    return reply.code(404).send({
      status: 'error',
      message: 'User ID not found',
    });
  }

  // Create a new checkout session

  const checkoutSession = await stripe.checkout.sessions.create(params);
  return reply.code(200).send({
    status: 'success',
    message: 'Checkout session created successfully',
    sessionId: checkoutSession.id,
  });
};
