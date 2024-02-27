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

    await db.transaction(async (tx) => {
      await tx
        .update(subscriptions)
        .set({ stripeCustomerId: stripeCustomer.id })
        .where(eq(subscriptions.userId, userId));
    });
  } catch (error) {
    console.error(`Error for user ${userId} (${email}):`, error);
    if (error instanceof Stripe.errors.StripeError) {
      throw new Error(
        'There was an issue with the provided email. Please try again.',
        error
      );
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

export const getStripeSubTier = async (subscription: Stripe.Subscription) => {
  // Assuming your plan names are stored in the product metadata
  const productId = subscription.items.data[0].plan.product;

  if (typeof productId !== 'string') {
    throw new Error('Invalid product ID');
  }

  const product = await stripe.products.retrieve(productId);

  return product.name || 'default'; // Return the name, or a default
};
