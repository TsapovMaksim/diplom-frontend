import { Basket, CatalogProduct } from '@/shared/types';
import { create } from 'zustand';

export type BasketProduct = {
  price: number;
  preview: { path: string } | null;
  title: string;
  id: number;
  category: {
    id: number;
  };
  raiting: number;
  reviewsCount: number;
};

type BasketStore = {
  items: Record<string, boolean>;
  totalPrice: number;
  totalCount: number;
  setBasket: (basket: Basket) => void;
  addItem: (item: BasketProduct) => void;
  removeItem: (id: number) => void;
  deleteItem: (id: number) => void;
  localItems: { id: number; count: number; product: BasketProduct }[];
  clear: () => void;
};

export const useBasketStore = create<BasketStore>(set => ({
  items: {},
  totalPrice: 0,
  totalCount: 0,
  localItems: [],
  setBasket: basket =>
    set(state => {
      let totalPrice = 0;
      let totalCount = 0;
      const items = basket.basketProducts.reduce((acc, curr) => {
        if (!acc[curr.product.id]) {
          acc[curr.product.id] = true;
        }
        totalPrice += curr.product.price * curr.count;
        totalCount += curr.count;
        return acc;
      }, {} as BasketStore['items']);
      console.log('set', items, totalPrice);
      return {
        ...state,
        totalCount,
        items,
        totalPrice,
      };
    }),
  addItem: product =>
    set(state => {
      const totalCount = state.totalCount + 1;
      const isHaveProduct = state.localItems.find(
        item => item.id === product.id
      );
      if (!isHaveProduct) {
        const totalPrice = state.totalPrice + product.price;
        const newLocalItems = [
          ...state.localItems,
          { count: 1, id: product.id, product },
        ];
        const items = newLocalItems.reduce((acc, curr) => {
          if (!acc[curr.product.id]) {
            acc[curr.product.id] = true;
          }
          return acc;
        }, {} as BasketStore['items']);
        return {
          ...state,
          totalCount,
          totalPrice,
          localItems: newLocalItems,
          items,
        };
      }
      const newLocalItems = state.localItems.map(item => {
        if (item.product.id === product.id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      const totalPrice = state.totalPrice + product.price;
      const items = newLocalItems.reduce((acc, curr) => {
        if (!acc[curr.product.id]) {
          acc[curr.product.id] = true;
        }
        return acc;
      }, {} as BasketStore['items']);
      return {
        ...state,
        totalCount,
        items,
        totalPrice,
        localItems: newLocalItems,
      };
    }),
  removeItem: id =>
    set(state => {
      const totalCount = state.totalCount <= 0 ? 0 : state.totalCount - 1;
      let totalPrice = state.totalPrice <= 0 ? 0 : state.totalPrice;
      const newLocalItems = state.localItems.flatMap(item => {
        if (item.product.id !== id) {
          return [item];
        }
        totalPrice = totalPrice - item.product.price;
        if (item.count === 1) return [];
        return { ...item, count: item.count - 1 };
      });
      const items = newLocalItems.reduce((acc, curr) => {
        if (!acc[curr.product.id]) {
          acc[curr.product.id] = true;
        }
        return acc;
      }, {} as BasketStore['items']);
      return {
        ...state,
        totalCount,
        items,
        totalPrice,
        localItems: newLocalItems,
      };
    }),
  deleteItem: id =>
    set(state => {
      let totalCount = state.totalCount <= 0 ? 0 : state.totalCount;
      let totalPrice = state.totalPrice <= 0 ? 0 : state.totalPrice;
      const newLocalItems = state.localItems.flatMap(item => {
        if (item.product.id !== id) {
          return [item];
        }
        totalPrice = totalPrice - item.product.price * item.count;
        totalCount = totalCount - item.count;
        return [];
      });
      const items = newLocalItems.reduce((acc, curr) => {
        if (!acc[curr.product.id]) {
          acc[curr.product.id] = true;
        }
        return acc;
      }, {} as BasketStore['items']);
      return {
        ...state,
        totalCount,
        items,
        totalPrice,
        localItems: newLocalItems,
      };
    }),
  clear: () =>
    set(state => {
      return {
        ...state,
        items: {},
        totalPrice: 0,
        totalCount: 0,
        localItems: [],
      };
    }),
}));
