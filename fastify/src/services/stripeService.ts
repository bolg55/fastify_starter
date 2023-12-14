import { stripe } from '@config/stripeConfig';

const createPaymentIntent = async (amount: number, currency: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  return paymentIntent;
};

const createSubscription = async (customerId: string, priceId: string) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
  });
  return subscription;
};

export { createPaymentIntent, createSubscription };
