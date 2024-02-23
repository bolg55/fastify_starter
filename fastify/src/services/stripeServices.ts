import { stripe } from '@config/stripeConfig';
import { db } from '@db/index';
import { subscriptions } from '@db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

export const createStripeCustomerAndUpdateSubscription = async (
  userId: string,
  email: string
) => {
  try {
    const stripeCustomer = await stripe.customers.create({ email });

    await db
      .update(subscriptions)
      .set({ stripeCustomerId: stripeCustomer.id })
      .where(eq(subscriptions.userId, userId));
  } catch (error) {
    console.error(
      'Error creating Stripe customer or updating subscriptions:',
      error
    );
    if (error instanceof Stripe.errors.StripeError) {
      throw new Error(
        'There was an issue with the provided email. Please try again.'
      );
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};