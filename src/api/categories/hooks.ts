import { categoriesApi } from '@/api/categories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCategories = () => {
  const res = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getCategories,
  });
  return res;
};

export const useCategory = ({
  id,
  enabled,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoriesApi.getCategoryById({ id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-category'],
    mutationFn: categoriesApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  return res;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-category'],
    mutationFn: categoriesApi.updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  return res;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-category'],
    mutationFn: categoriesApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  return res;
};

export const useProductCategories = ({
  categoryId,
}: {
  categoryId: number;
}) => {
  const res = useQuery({
    queryKey: ['product-categories'],
    queryFn: () => categoriesApi.getProductCategories({ categoryId }),
  });
  return res;
};

export const useProductCategory = ({
  id,
  enabled,
  categoryId,
}: {
  categoryId: number;
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['product-categories', id],
    queryFn: () =>
      categoriesApi.getProductCategoryById({ categoryId, id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateProductCategory = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-prodct-category'],
    mutationFn: categoriesApi.createProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
    },
  });
  return res;
};

export const useUpdateProductCategory = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-product-category'],
    mutationFn: categoriesApi.updateProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
    },
  });
  return res;
};

export const useDeleteProductCategory = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-product-category'],
    mutationFn: categoriesApi.deleteProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] });
    },
  });
  return res;
};
