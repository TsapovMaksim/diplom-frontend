import { axios } from '@/core/axios';
import {
  CatalogProduct,
  CatalogReview,
  GroupedProductCharacteristic,
  Product,
  ProductCharacteristic,
} from '@/shared/types';
import bulidQuery from '@/shared/utils/build-query';
import queryString from 'query-string';

export type GetReviewsParams = Partial<{
  productId: number;
}>;

export type CreateReviewBody = {
  star: number;
  text: string;
  userId: number;
  productId: number;
};

export const reviewsApi = {
  getReviews: async ({ productId }: GetReviewsParams) => {
    return (await axios.get<CatalogReview[]>(`/review?productId=${productId}`))
      .data;
  },

  createReview: async (body: CreateReviewBody) => {
    return (await axios.post<Product>('/review', body)).data;
  },
};
