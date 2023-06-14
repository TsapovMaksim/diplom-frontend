import {
  GetCatalogProductsParams,
  GetProductsParams,
  productsApi,
} from '@/api/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProducts = (params: GetProductsParams) => {
  const res = useQuery({
    queryKey: ['product', params],
    queryFn: () => productsApi.getProducts(params),
  });
  return res;
};

export const useProduct = ({
  id,
  enabled,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  const res = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProductById({ id: id as number }),
    enabled,
  });
  return res;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-product'],
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
  return res;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['update-product'],
    mutationFn: productsApi.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
  return res;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['delete-product'],
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
  return res;
};

export const useAddCharacteristicToProduct = ({
  revalidateCharacteristics = false,
  revalidateGroups = false,
  groupId,
  tovarId,
}: Partial<{
  revalidateGroups: boolean;
  revalidateCharacteristics: boolean;
  tovarId: number;
  groupId: number;
}> = {}) => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['add-characteristic-product'],
    mutationFn: productsApi.addCharacteristicToProduct,
    onSuccess: () => {
      if (revalidateGroups) {
        queryClient.invalidateQueries({
          queryKey: ['product-characteristic-types'],
        });
        queryClient.invalidateQueries({
          queryKey: ['grouped-characteristic-product'],
        });
      }
      if (!revalidateGroups && revalidateCharacteristics) {
        queryClient.invalidateQueries({
          queryKey: [
            'grouped-characteristic-product',
            { id: tovarId, groupId },
          ],
        });
      }
      // queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
  return res;
};

export const useGroupedProductCharacteristics = ({ id }: { id: number }) => {
  const res = useQuery({
    queryKey: ['grouped-characteristic-product'],
    queryFn: () => productsApi.getGroupedProductCharacteristics({ id }),
  });
  return res;
};
export const useGroupedProductCharacteristicsById = ({
  id,
  groupId,
}: {
  id: number;
  groupId: number;
}) => {
  const res = useQuery({
    queryKey: ['grouped-characteristic-product', { id, groupId }],
    queryFn: () =>
      productsApi.getGroupedProductCharacteristicsById({ id, groupId }),
  });
  return res;
};

export const useCatalogProducts = (params: GetCatalogProductsParams) => {
  const res = useQuery({
    queryKey: ['catalog-product', params],
    queryFn: () => productsApi.getCatalogProducts(params),
  });
  return res;
};

export const useChangeProductPreview = () => {
  const res = useMutation({
    mutationKey: ['change-product-preview'],
    mutationFn: productsApi.changePreview,
  });
  return res;
};

export const useUploadProductImages = () => {
  const client = useQueryClient();
  const res = useMutation({
    mutationKey: ['upload-product-images'],
    mutationFn: productsApi.uploadImages,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['product-images'] });
    },
  });
  return res;
};

export const useProductCharacteristicTypes = ({ id }: { id: number }) => {
  const res = useQuery({
    queryKey: ['product-characteristic-types', id],
    queryFn: () => productsApi.getProductCharacteristicTypes({ productId: id }),
  });
  return res;
};

export const useDeleteProductCharacteristicFromProduct = ({
  id,
  groupId,
}: {
  id?: number;
  groupId?: number;
}) => {
  const client = useQueryClient();
  const res = useMutation({
    mutationKey: ['delete-product-characteristic-product', groupId],
    mutationFn: productsApi.deleteProductCharacteristicFromProduct,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['product-characteristic-types'] });
      client.invalidateQueries({
        queryKey: ['grouped-characteristic-product', { id, groupId }],
      });
    },
  });
  return res;
};

export const useDeleteProductImage = () => {
  const client = useQueryClient();
  const res = useMutation({
    mutationFn: productsApi.deleteProductImage,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['product-images'] });
    },
  });
  return res;
};

export const useProductImages = ({ productId }: { productId: number }) => {
  const res = useQuery({
    queryKey: ['product-images', productId],
    queryFn: () => productsApi.getProductImages({ productId }),
  });
  return res;
};
