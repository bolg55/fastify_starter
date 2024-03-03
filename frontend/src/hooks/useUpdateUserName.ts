import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe } from '../utils';

const useUpdateUserName = () => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to update username.');
    },
  });
  return { updateUserName: mutate, error };
};

export default useUpdateUserName;
