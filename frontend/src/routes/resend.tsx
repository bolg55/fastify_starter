import { createFileRoute, redirect } from '@tanstack/react-router';
import ResendLinkForm from '../components/ResendLinkForm';
import { getPasswordlessLoginAttemptInfo } from 'supertokens-web-js/recipe/thirdpartypasswordless';

export const Route = createFileRoute('/resend')({
  beforeLoad: async () => {
    const loginAttemptInfo = await getPasswordlessLoginAttemptInfo();
    const initialMagicLinkSent = loginAttemptInfo !== undefined;
    if (!initialMagicLinkSent) {
      throw redirect({
        to: '/auth',
      });
    }
  },

  component: ResendLinkForm,
});
