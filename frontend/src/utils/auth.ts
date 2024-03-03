import { QueryClient } from '@tanstack/react-query';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartypasswordless';

export const logout = async (queryClient: QueryClient) => {
  await signOut();
  queryClient.invalidateQueries({ queryKey: ['userProfile'] });
  window.location.href = '/';
};
