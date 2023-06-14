import { basketApi } from '@/api/basket';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useBasketByUserId = ({
  id,
  enabled,
}: {
  id: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['basket'],
    enabled,
    queryFn: () => basketApi.getBasketByUserId(id),
  });
  return res;
};

export const useCreateBasketProduct = () => {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationKey: ['create-basket-product'],
    mutationFn: basketApi.createBasketProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
    },
  });
  return res;
};

export const useClearBasket = () => {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationKey: ['clear-basket'],
    mutationFn: basketApi.clearBasket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
    },
  });
  return res;
};

export const useAddBasketProduct = () => {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationKey: ['add-basket-product'],
    mutationFn: basketApi.addBasketProduct,
    onSuccess: () => {
      console.log('there');

      queryClient.invalidateQueries({ queryKey: ['basket'] });
    },
  });
  return res;
};

export const useRemoveBasketProduct = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['remove-basket-product'],
    mutationFn: basketApi.removeBasketProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
    },
  });
  return res;
};
export const useDeleteBasketProduct = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-basket-product'],
    mutationFn: basketApi.deleteBasketProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basket'] });
    },
  });
  return res;
};
