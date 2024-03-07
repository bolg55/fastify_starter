// utils/checkout.ts
import { NavigateFn } from '@tanstack/react-router';
import getStripe from './getStripe';
import { handleBillingPortal } from './index';
import { toast } from 'sonner';

export const goToCheckout = async (
  planId: string,
  isLoggedIn: boolean,
  isActive: boolean,
  navigate: NavigateFn
) => {
  if (!isLoggedIn) {
    navigate({ to: '/auth' });
    toast.info('You need to be logged in to subscribe.');
    return;
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
