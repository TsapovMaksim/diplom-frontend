import { userApi } from '@/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// export const useCategory = ({
//   id,
//   enabled,
// }: {
//   id?: number;
//   enabled?: boolean;
// }) => {
//   const res = useQuery({
//     queryKey: ['categories', id],
//     queryFn: () => categoriesApi.getCategoryById({ id: id as number }),
//     enabled,
//   });
//   return res;
// };

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-user'],
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  return res;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['login-user'],
    mutationFn: userApi.loginUser,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  return res;
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['logout-user'],
    mutationFn: userApi.logoutUser,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  return res;
};

export const useRefreshUser = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['refresh-user'],
    mutationFn: userApi.refreshUser,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  return res;
};
