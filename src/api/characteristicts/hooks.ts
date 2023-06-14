import { characteristicsApi } from '@/api/characteristicts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCharacteristicGroups = ({
  categoryId,
}: {
  categoryId: number;
}) => {
  const res = useQuery({
    queryKey: ['characteristic-groups', { categoryId }],
    queryFn: () => characteristicsApi.getCharacteristicGroups({ categoryId }),
  });
  return res;
};

export const useCharacteristicGroup = ({
  id,
  enabled,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['characteristic-groups', id],
    queryFn: () =>
      characteristicsApi.getCharacteristicGroupById({ id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateCharacteristicGroup = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-characteristic-groups'],
    mutationFn: characteristicsApi.createCharacteristicGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characteristic-groups'] });
    },
  });
  return res;
};

export const useUpdateCharacteristicGroup = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-characteristic-groups'],
    mutationFn: characteristicsApi.updateCharacteristicGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characteristic-groups'] });
    },
  });
  return res;
};

export const useDeleteCharacteristicGroup = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-characteristic-groups'],
    mutationFn: characteristicsApi.deleteCharacteristicGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characteristic-groups'] });
    },
  });
  return res;
};

export const useCharacteristics = ({
  groupId,
  enabled,
}: {
  groupId: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['characteristic', { groupId }],
    queryFn: () => characteristicsApi.getCharacteristics({ groupId }),
    enabled,
  });
  return res;
};

export const useCharacteristic = ({
  id,
  enabled,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['characteristic', id],
    queryFn: () =>
      characteristicsApi.getCharacteristicById({ id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateCharacteristic = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-characteristic'],
    mutationFn: characteristicsApi.createCharacteristic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characteristic'] });
    },
  });
  return res;
};

export const useUpdateCharacteristic = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-characteristic'],
    mutationFn: characteristicsApi.updateCharacteristic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characteristic'] });
    },
  });
  return res;
};

export const useDeleteCharacteristic = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-characteristic'],
    mutationFn: characteristicsApi.deleteCharacteristic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characteristic'] });
    },
  });
  return res;
};

// product-characteristic

export const useProductCharacteristics = ({
  characteristicId,
  enabled,
}: {
  characteristicId: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['product-characteristic', characteristicId],
    queryFn: () =>
      characteristicsApi.getProductCharacteristics({ characteristicId }),
    enabled,
  });
  return res;
};

export const useProductCharacteristic = ({
  id,
  enabled,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['product-characteristic', id],
    queryFn: () =>
      characteristicsApi.getProductCharacteristicById({ id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateProductCharacteristic = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-product-characteristic'],
    mutationFn: characteristicsApi.createProductCharacteristic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-characteristic'] });
    },
  });
  return res;
};

export const useUpdateProductCharacteristic = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-product-characteristic'],
    mutationFn: characteristicsApi.updateProductCharacteristic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-characteristic'] });
    },
  });
  return res;
};

export const useDeleteProductCharacteristic = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-product-characteristic'],
    mutationFn: characteristicsApi.deleteProductCharacteristic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-characteristic'] });
    },
  });
  return res;
};
