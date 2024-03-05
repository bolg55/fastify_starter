import { createPasswordlessCode } from 'supertokens-web-js/recipe/thirdpartypasswordless';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Session from 'supertokens-web-js/recipe/session';

export const logout = async (queryClient: QueryClient) => {
  await Session.signOut();
  queryClient.invalidateQueries({ queryKey: ['userProfile'] });
  window.location.href = '/';
};

export const sendMagicLink = async (email: string) => {
  try {
    const response = await createPasswordlessCode({ email });

    if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
      // TODO: handle this case
    } else {
      toast.success('Please check your email for the magic link');
    }
  } catch (error: unknown) {
    if (isSuperTokensError(error)) {
      toast.error(error.message);
    } else {
      toast.error('Something went wrong');
    }
  }
};

// This function checks if the error is a SuperTokens error due to lack of type information
const isSuperTokensError = (
  error: unknown
): error is { isSuperTokensGeneralError: true; message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isSuperTokensGeneralError' in error &&
    (error as { isSuperTokensGeneralError: unknown })
      .isSuperTokensGeneralError === true &&
    'message' in error
  );
};
