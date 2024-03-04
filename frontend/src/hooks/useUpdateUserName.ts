import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe } from '../utils';
import { toast } from 'sonner';

const useUpdateUserName = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, error, isPending, variables } = useMutation({
    mutationFn: updateMe,
    onSettled: async () => {
      toast.success('User name updated successfully');
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
