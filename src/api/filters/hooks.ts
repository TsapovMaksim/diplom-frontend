import { filtersApi } from '@/api/filters';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFilters = ({
  characteristicId,
  productCategoryId,
}: {
  productCategoryId: number;
  characteristicId?: number;
}) => {
  const res = useQuery({
    queryKey: ['filter'],
    queryFn: () =>
      filtersApi.getFilters({ characteristicId, productCategoryId }),
  });
  return res;
};

export const useFilter = ({
  id,
  enabled,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['filter', id],
    queryFn: () => filtersApi.getFilterById({ id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateFilter = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-filter'],
    mutationFn: filtersApi.createFilter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter'] });
    },
  });
  return res;
};

export const useUpdateFilter = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-filter'],
    mutationFn: filtersApi.updateFilter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter'] });
    },
  });
  return res;
};

export const useDeleteFilter = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-filter'],
    mutationFn: filtersApi.deleteFilter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter'] });
    },
  });
  return res;
};

// filter-value

export const useFilterValues = ({ filterId }: { filterId: number }) => {
  const res = useQuery({
    queryKey: ['filter-value'],
    queryFn: () => filtersApi.getFilterValues({ filterId }),
  });
  return res;
};

export const useFilterValue = ({
  id,
  enabled,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['filter-value', id],
    queryFn: () => filtersApi.getFilterValueById({ id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateFilterValue = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-filter-value'],
    mutationFn: filtersApi.createFilterValue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter-value'] });
    },
  });
  return res;
};

export const useUpdateFilterValue = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-filter-value'],
    mutationFn: filtersApi.updateFilterValue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter-value'] });
    },
  });
  return res;
};

export const useDeleteFilterValue = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-filter-value'],
    mutationFn: filtersApi.deleteFilterValue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter-value'] });
    },
  });
  return res;
};
