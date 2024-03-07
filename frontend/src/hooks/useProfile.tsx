import { useQuery } from '@tanstack/react-query';
import { getMe } from '../utils';
import { useAuth } from './useAuth';

const useProfile = () => {
  const { isLoggedIn } = useAuth();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getMe,
    enabled: !!isLoggedIn,
  });

  return { data, error, isError, isLoading };
};

export default useProfile;
