import { stripe } from '@config/stripeConfig';
import { db } from '@db/index';
import { subscriptions } from '@db/schema';
import { timestampToDate } from '@utils/timestampToDate';
import { eq } from 'drizzle-orm';
import { Redis } from 'ioredis';
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
        'There was an issue with the provided email. Please try again.'
      );
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

export const getStripeSubTier = async (subscription: Stripe.Subscription) => {
  const productId = subscription.items.data[0].price.product;

  if (typeof productId !== 'string') {
    throw new Error('Invalid product ID');
  }

  const product = await stripe.products.retrieve(productId);

  return product.name || 'default'; // Return the name, or a default
};

export const updateStripeSubscription = async (
  subscription: Stripe.Subscription,
  redis: Redis,
  userId: string
) => {
  const subTier = await getStripeSubTier(subscription);

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(subscriptions)
        .set({
          isActive: true,
          subStatus: subscription.status,
          stripeSubscriptionId: subscription.id,
          subTier,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          canceledAtDate: timestampToDate(subscription.canceled_at as number),
        })
        .where(
          eq(subscriptions.stripeCustomerId, subscription.customer as string)
        );
    });
    // Invalidate the user's profile cache
    await redis.del(`user:${userId}:profile`);
  } catch (err) {
    console.error('Error updating Stripe subscription:', err);
    // Handle the error appropriately
  }
};

export const cancelStripeSubscription = async (
  subscription: Stripe.Subscription,
  redis: Redis,
  userId: string
) => {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(subscriptions)
        .set({
          isActive: false,
          subStatus: subscription.status,
          stripeSubscriptionId: '',
          subTier: '',
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          canceledAtDate: timestampToDate(subscription.canceled_at as number),
        })
        .where(
          eq(subscriptions.stripeCustomerId, subscription.customer as string)
        );
    });
    // Invalidate the user's profile cache
    await redis.del(`user:${userId}:profile`);
  } catch (err) {
    console.error('Error canceling Stripe subscription:', err);
    // Handle the error appropriately
  }
};
