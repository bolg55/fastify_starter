import { createFileRoute, redirect } from '@tanstack/react-router';
import Secret from '../Secret';
import { toast } from 'sonner';

export const Route = createFileRoute('/secret')({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isLoggedIn) {
      toast.error('You are not logged in');
      throw redirect({
        to: '/auth',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Secret,
});
