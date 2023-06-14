import { axios } from '@/core/axios';
import { Category, ProductCategory } from '@/shared/types';

export const categoriesApi = {
  getCategories: async () => {
    return (await axios.get<Category[]>('/categories')).data;
  },
  getCategoryById: async ({ id }: { id: number }) => {
    return (await axios.get<Category>(`/categories/${id}`)).data;
  },
  createCategory: async (body: { title: string }) => {
    return (await axios.post<Category>('/categories', body)).data;
  },
  updateCategory: async ({
    id,
    patch,
  }: {
    patch: { title: string };
    id: number;
  }) => {
    return (await axios.patch<Category>(`/categories/${id}`, patch)).data;
  },
  deleteCategory: async ({ id }: { id: number }) => {
    return await axios.delete(`/categories/${id}`);
  },
  getProductCategories: async ({ categoryId }: { categoryId: number }) => {
    return (
      await axios.get<ProductCategory[]>(
        `/categories/${categoryId}/product-categories`
      )
    ).data;
  },
  getProductCategoryById: async ({
    categoryId,
    id,
  }: {
    categoryId: number;
    id: number;
  }) => {
    return (
      await axios.get<ProductCategory>(
        `/categories/${categoryId}/product-categories/${id}`
      )
    ).data;
  },
  createProductCategory: async ({
    categoryId,
    body,
  }: {
    categoryId: number;
    body: { title: string };
  }) => {
    return (
      await axios.post<ProductCategory>(
        `/categories/${categoryId}/product-categories`,
        body
      )
    ).data;
  },
  updateProductCategory: async ({
    categoryId,
    patch,
    id,
  }: {
    categoryId: number;
    patch: { title: string };
    id: number;
  }) => {
    return (
      await axios.patch<ProductCategory>(
        `/categories/${categoryId}/product-categories/${id}`,
        patch
      )
    ).data;
  },
  deleteProductCategory: async ({
    categoryId,
    id,
  }: {
    categoryId: number;
    id: number;
  }) => {
    return await axios.delete(
      `/categories/${categoryId}/product-categories/${id}`
    );
  },
};
