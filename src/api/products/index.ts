import { axios } from '@/core/axios';
import {
  CatalogProduct,
  CharacteristicGroup,
  GroupedProductCharacteristic,
  Image,
  PaginatedResponse,
  Product,
  ProductCharacteristic,
} from '@/shared/types';
import bulidQuery from '@/shared/utils/build-query';
import queryString from 'query-string';

export type GetCatalogProductsParams = Partial<{
  manufacturer: number | number[];
  characteristics: number | number[];
  title: string;
  price_max: number | null;
  price_min: number | null;
  sort_property: string;
  sort_direction: string;
  category: number | number[];
  page_size: number;
  page: number;
}>;

export type GetProductsParams = Pick<GetCatalogProductsParams, 'category'>;

export type ChangeProductPreviewParams = {
  productId: number;
  body: { file: File };
};

export type UploadProductImagesParams = {
  productId: number;
  body: { files: File[] };
};

export const productsApi = {
  getProducts: async ({ category }: GetProductsParams) => {
    return (await axios.get<Product[]>(`/product?category=${category}`)).data;
  },
  getProductById: async ({ id }: { id: number }) => {
    return (await axios.get<Product>(`/product/${id}`)).data;
  },
  createProduct: async (body: { title: string; productCategoryId: number }) => {
    return (await axios.post<Product>('/product', body)).data;
  },
  updateProduct: async ({
    id,
    patch,
  }: {
    patch: Partial<{
      title: string;
      description: string;
      short_description: string;
      price: number;
      manufacturer: number;
    }>;
    id: number;
  }) => {
    return (await axios.patch<Product>(`/product/${id}`, patch)).data;
  },
  deleteProduct: async ({ id }: { id: number }) => {
    return await axios.delete(`/product/${id}`);
  },
  addCharacteristicToProduct: async ({
    id,
    body,
  }: {
    id: number;
    body: ProductCharacteristic[];
  }) => {
    return (await axios.post(`/product/${id}/characteristic`, body)).data;
  },
  getGroupedProductCharacteristics: async ({ id }: { id: number }) => {
    return (
      await axios.get<GroupedProductCharacteristic[]>(
        `/product/${id}/characteristic`
      )
    ).data;
  },
  getGroupedProductCharacteristicsById: async ({
    id,
    groupId,
  }: {
    id: number;
    groupId: number;
  }) => {
    return (
      await axios.get<GroupedProductCharacteristic['characteristics']>(
        `/product/${id}/characteristic/${groupId}`
      )
    ).data;
  },
  getCatalogProducts: async (params: GetCatalogProductsParams) => {
    const page_size = params.page_size || 10;
    const page = params.page || 1;
    return (
      await axios.get<PaginatedResponse<CatalogProduct>>(
        `/product/catalog?${queryString.stringify(
          { ...params, page, page_size },
          {
            arrayFormat: 'comma',
          }
        )}`
      )
    ).data;
  },
  changePreview: async ({ body, productId }: ChangeProductPreviewParams) => {
    const formData = new FormData();
    formData.set('file', body.file);
    return (
      await axios.post<CatalogProduct>(
        `/product/${productId}/preview`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    ).data;
  },
  uploadImages: async ({ body, productId }: UploadProductImagesParams) => {
    const formData = new FormData();
    body.files.forEach(file => {
      formData.append('files', file);
    });
    return (
      await axios.post<CatalogProduct>(
        `/product/${productId}/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
    ).data;
  },
  getProductCharacteristicTypes: async ({
    productId,
  }: {
    productId: number;
  }) => {
    return (
      await axios.get<CharacteristicGroup[]>(
        `/product/${productId}/characteristic-types`
      )
    ).data;
  },
  deleteProductCharacteristicFromProduct: async ({
    productId,
    productCharacteristicId,
  }: {
    productId: number;
    productCharacteristicId: number;
  }) => {
    return (
      await axios.delete<CharacteristicGroup[]>(
        `/product/${productId}/propduct-characteristic/${productCharacteristicId}`
      )
    ).data;
  },
  deleteProductImage: async ({
    productId,
    imageId,
  }: {
    productId: number;
    imageId: number;
  }) => {
    return (
      await axios.delete<CharacteristicGroup[]>(
        `/product/${productId}/image/${imageId}`
      )
    ).data;
  },
  getProductImages: async ({ productId }: { productId: number }) => {
    return (await axios.get<Image[]>(`/product/${productId}/image`)).data;
  },
};
