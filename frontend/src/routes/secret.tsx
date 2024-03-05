import { createFileRoute, redirect } from '@tanstack/react-router';
import Secret from '../Secret';

export const Route = createFileRoute('/secret')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isLoggedIn) {
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
