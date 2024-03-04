// utils/checkout.ts
import getStripe from './getStripe';
import { handleBillingPortal } from './index';

export const goToCheckout = async (
  planId: string,
  data: boolean,
  isActive: boolean
) => {
  if (!data) {
    window.location.assign('/auth');
  }

  if (isActive) handleBillingPortal();

  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/stripe/checkout-session`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId }),
    }
  );
  const session = await response.json();

  const stripe = await getStripe();
  stripe?.redirectToCheckout({
    sessionId: session.sessionId,
  });
};
