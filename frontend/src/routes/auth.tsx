import { createFileRoute, redirect } from '@tanstack/react-router';
import AuthForm from '../components/AuthForm';
import { hasInitialLinkBeenSent } from '../utils/auth';
import ResendLinkForm from '../components/ResendLinkForm';
import { toast } from 'sonner';

export const Route = createFileRoute('/auth')({
  beforeLoad: async ({ context }) => {
    try {
      if (context.auth.isLoggedIn) {
        toast.info('You are already logged in');
        throw redirect({
          to: '/',
        });
      }

      const initialMagicLinkSent = await hasInitialLinkBeenSent();
      return { initialMagicLinkSent };
    } catch (error) {
      console.error('Error in beforeLoad:', error);
      toast.error('An error occurred while checking authentication.');
    }
  },
  component: ({ initialMagicLinkSent }) =>
    initialMagicLinkSent ? <ResendLinkForm /> : <AuthForm />,
});
