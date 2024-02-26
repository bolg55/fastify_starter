import { env } from '@config/env';
import { stripe } from '@config/stripeConfig';
import { FastifyReply, FastifyRequest } from 'fastify';
export const stripeCustomerPortalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { custId } = request.userData?.userProfile.subscriptions[0];

    console.log('CUST ID:', custId);

    if (!custId) {
      reply.code(404).send({
        status: 'error',
        message: 'Stripe customer ID not found',
      });
      return;
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer: custId,
      return_url: `${env.WEBSITE_DOMAIN}/secret`,
    });

    reply.code(200).send({
      status: 'success',
      message: 'Billing portal session created successfully',
      json: { url },
    });
  } catch (error) {
    if (error instanceof Error) {
      request.log.error(
        `Error creating billing portal session: ${error.message}`
      );
    } else {
      request.log.error('Unknown error occurred');
    }

    reply.code(500).send({
      status: 'error',
      message: 'Failed to create billing portal session',
    });
  }
};
