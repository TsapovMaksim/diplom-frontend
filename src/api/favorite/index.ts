import { axios } from '@/core/axios';
import { Favorite } from '@/shared/types';

export const favoriteApi = {
  async getFavoriteById(id: number) {
    return (await axios.get<Favorite>(`/favorite/${id}`)).data;
  },
  async createFavoriteProduct(params: {
    favoriteId: number;
    body: { productId: number };
  }) {
    return (
      await axios.post(
        `/favorite/${params.favoriteId}/favorite-product`,
        params.body
      )
    ).data;
  },
  async deleteFavoriteProduct(params: {
    favoriteId: number;
    favoriteProductId: number;
  }) {
    return (
      await axios.delete(
        `/favorite/${params.favoriteId}/favorite-product/${params.favoriteProductId}`
      )
    ).data;
  },
};
