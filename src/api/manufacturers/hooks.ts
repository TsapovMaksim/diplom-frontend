import { manufacturersApi } from '@/api/manufacturers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useManufacturers = ({
  productCategoryId,
}: {
  productCategoryId?: number;
}) => {
  console.log('productCategoryId', productCategoryId);

  const res = useQuery({
    queryKey: ['manufacturers', productCategoryId],
    queryFn: () => manufacturersApi.getManufacturers({ productCategoryId }),
  });
  return res;
};

export const useManufacturer = ({
  id,
  enabled,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['manufacturers', id],
    queryFn: () => manufacturersApi.getManufacturerById({ id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateManufacturer = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-manufacturer'],
    mutationFn: manufacturersApi.createManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },
  });
  return res;
};

export const useUpdateManufacturer = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-manufacturer'],
    mutationFn: manufacturersApi.updateManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },
  });
  return res;
};

export const useDeleteManufacturer = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-manufacturer'],
    mutationFn: manufacturersApi.deleteManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },
  });
  return res;
};

export const useAddCategoryToManufacturer = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['add-category-manufacturer'],
    mutationFn: manufacturersApi.addCategoryToManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },
  });
  return res;
};

export const useDeleteCategoryFromManufacturer = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-category-manufacturer'],
    mutationFn: manufacturersApi.deleteCategoryFromManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },
  });
  return res;
};
