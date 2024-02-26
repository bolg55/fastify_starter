import { env } from '@config/env';
import { stripe } from '@config/stripeConfig';
import { FastifyReply, FastifyRequest } from 'fastify';

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
      return_url: `${env.WEBSITE_DOMAIN}/secret`,
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
