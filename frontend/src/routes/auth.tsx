import { createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import AuthForm from '../components/AuthForm';
import ResendLinkForm from '../components/ResendLinkForm';
import {
  handleMagicLinkClicked,
  hasInitialLinkBeenSent,
  isThisSameBrowserAndDevice,
} from '../utils/auth';

export const Route = createFileRoute('/auth')({
  beforeLoad: async ({ context }) => {
    try {
      if (context.auth.isLoggedIn) {
        toast.info('You are already logged in');
        throw redirect({
          to: '/',
        });
      }

      // Check if the user is accessing the route with a magic link
      const isSameBrowserAndDevice = await isThisSameBrowserAndDevice();
      if (isSameBrowserAndDevice) {
        // Consume the magic link
        const magicLinkResult = await handleMagicLinkClicked();
        if (magicLinkResult === 'success') {
          window.location.assign('/');
          // throw redirect({
          //   to: '/',
          // });
          return;
        } else if (magicLinkResult === 'error') {
          // Handle error case if needed
          toast.error('An error occurred. Please try again.');
        }
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
