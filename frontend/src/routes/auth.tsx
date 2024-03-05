import { createFileRoute } from '@tanstack/react-router';
import AuthForm from '../components/AuthForm';
import { hasInitialLinkBeenSent } from '../utils/auth';
import ResendLinkForm from '../components/ResendLinkForm';

export const Route = createFileRoute('/auth')({
  beforeLoad: async () => {
    const initialMagicLinkSent = await hasInitialLinkBeenSent();
    return { initialMagicLinkSent };
  },
  component: ({ initialMagicLinkSent }) =>
    initialMagicLinkSent ? <ResendLinkForm /> : <AuthForm />,
});
