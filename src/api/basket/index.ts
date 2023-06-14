import { axios } from '@/core/axios';
import { Basket } from '@/shared/types';

export const basketApi = {
  async getBasketByUserId(id: number) {
    return (await axios.get<Basket>(`/basket/user/${id}`)).data;
  },
  async createBasketProduct(params: {
    basketId: number;
    body: { productId: number };
  }) {
    return (await axios.post(`/basket/${params.basketId}/product`, params.body))
      .data;
  },
  async addBasketProduct(params: {
    basketId: number;
    body: { basketProductId: number };
  }) {
    return (
      await axios.post(`/basket/${params.basketId}/product/add`, params.body)
    ).data;
  },
  async removeBasketProduct(params: {
    basketId: number;
    body: { basketProductId: number };
  }) {
    return (
      await axios.post(`/basket/${params.basketId}/product/remove`, params.body)
    ).data;
  },
  async clearBasket(params: { basketId: number }) {
    return (await axios.post(`/basket/${params.basketId}/clear`)).data;
  },
  async deleteBasketProduct(params: {
    basketId: number;
    basketProductId: number;
  }) {
    return (
      await axios.delete(
        `/basket/${params.basketId}/product/${params.basketProductId}`
      )
    ).data;
  },
};
