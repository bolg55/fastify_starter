import { createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import { getPasswordlessLoginAttemptInfo } from 'supertokens-web-js/recipe/thirdpartypasswordless';
import AuthForm from '../components/AuthForm';
import { handleMagicLinkClicked } from '../utils/auth';

export const Route = createFileRoute('/auth')({
  beforeLoad: async ({ context }) => {
    const { recheckAuthStatus, isLoggedIn, setIsLoading } = context.auth;

    if (isLoggedIn) {
      toast.info('You are already logged in');
      throw redirect({
        to: '/',
      });
    }

    const loginAttemptInfo = await getPasswordlessLoginAttemptInfo();
    const isSameBrowserAndDevice = loginAttemptInfo !== undefined;

    if (isSameBrowserAndDevice) {
      const magicLinkResult = await handleMagicLinkClicked();
      setIsLoading(true);
      if (magicLinkResult === 'success') {
        await recheckAuthStatus();
        setIsLoading(false);
        throw redirect({
          to: '/',
        });
      } else if (magicLinkResult === 'error') {
        toast.error('An error occurred. Please try again.');
      }
    }
  },
  component: AuthForm,
});
