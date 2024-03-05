import { createFileRoute, redirect } from '@tanstack/react-router';
import AuthForm from '../components/AuthForm';
import { hasInitialLinkBeenSent } from '../utils/auth';
import ResendLinkForm from '../components/ResendLinkForm';
import { toast } from 'sonner';

export const Route = createFileRoute('/auth')({
  beforeLoad: async ({ context }) => {
    if (context.auth.isLoggedIn) {
      toast.info('You are already logged in');
      throw redirect({
        to: '/',
      });
    }

    const initialMagicLinkSent = await hasInitialLinkBeenSent();
    return { initialMagicLinkSent };
  },
  component: ({ initialMagicLinkSent }) =>
    initialMagicLinkSent ? <ResendLinkForm /> : <AuthForm />,
});
