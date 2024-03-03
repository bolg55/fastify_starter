import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe } from '../utils';

const useUpdateUserName = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, error, isPending, variables } = useMutation({
    mutationFn: updateMe,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });

  const retry = () => {
    if (variables) {
      mutate(variables);
    }
  };

  return {
    updateUserName: mutate,
    retry,
    isError,
    error,
    isPending,
    pendingUserName: variables?.userName,
  };
};

export default useUpdateUserName;
