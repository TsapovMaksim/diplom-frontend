import { favoriteApi } from '@/api/favorite';
import { useFavoriteStore } from '@/store/favorite';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFavoriteById = ({
  id,
  enabled,
}: {
  id: number;
  enabled?: boolean;
}) => {
  const setFavorite = useFavoriteStore(state => state.setFavorite);
  const res = useQuery({
    queryKey: ['favorite'],
    enabled,
    queryFn: async () => {
      const res = await favoriteApi.getFavoriteById(id);
      setFavorite(res);
      return res;
    },
  });
  return res;
};

export const useCreateFavoriteProduct = () => {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationKey: ['create-favorite-product'],
    mutationFn: favoriteApi.createFavoriteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] });
    },
  });
  return res;
};

export const useDeleteFavoriteProduct = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-favorite-product'],
    mutationFn: favoriteApi.deleteFavoriteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite'] });
    },
  });
  return res;
};
