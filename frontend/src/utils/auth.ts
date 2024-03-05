import { QueryClient } from '@tanstack/react-query';
import Session from 'supertokens-web-js/recipe/session';

export const logout = async (queryClient: QueryClient) => {
  await Session.signOut();
  queryClient.invalidateQueries({ queryKey: ['userProfile'] });
  window.location.href = '/';
};
