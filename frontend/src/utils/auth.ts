import { NavigateFn } from '@tanstack/react-router';
import { toast } from 'sonner';
import {
  clearPasswordlessLoginAttemptInfo,
  consumePasswordlessCode,
  createPasswordlessCode,
  getPasswordlessLoginAttemptInfo,
  resendPasswordlessCode,
} from 'supertokens-web-js/recipe/thirdpartypasswordless';

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

export const resendMagicLink = async (navigate: NavigateFn) => {
  try {
    const response = await resendPasswordlessCode();

    if (response.status === 'RESTART_FLOW_ERROR') {
      await clearPasswordlessLoginAttemptInfo();
      toast.error('Login failed. Please try again');
      navigate({
        to: '/auth',
      });
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

export const hasInitialLinkBeenSent = async () => {
  return (await getPasswordlessLoginAttemptInfo()) !== undefined;
};

export const isThisSameBrowserAndDevice = async () => {
  return (await getPasswordlessLoginAttemptInfo()) !== undefined;
};

export const handleMagicLinkClicked = async () => {
  try {
    const response = await consumePasswordlessCode();

    if (response.status === 'OK') {
      await clearPasswordlessLoginAttemptInfo();
      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        toast.success('Account created successfully. Welcome!');
      } else {
        toast.success('Login successful. Welcome back!');
      }

      return 'success';
    } else {
      await clearPasswordlessLoginAttemptInfo();
      toast.error('Login failed. Please try again');
      return 'failed';
    }
  } catch (error: unknown) {
    if (isSuperTokensError(error)) {
      toast.error(error.message);
    } else {
      toast.error('Something went wrong');
      return 'error';
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
