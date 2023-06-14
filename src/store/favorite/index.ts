import { Favorite } from '@/shared/types';
import { BasketProduct } from '@/store/basket';
import { create } from 'zustand';

type FavoriteStore = {
  items: Record<string, { favoriteId: number }>;
  setFavorite: (favorite: Favorite) => void;
  localItems: BasketProduct[];
  addItem: (item: BasketProduct) => void;
  removeItem: (id: number) => void;
};

export const useFavoriteStore = create<FavoriteStore>(set => ({
  items: {},
  localItems: [],
  setFavorite: favorite =>
    set(state => {
      const items = favorite.favoriteProducts.reduce((acc, curr) => {
        if (!acc[curr.product.id]) {
          acc[curr.product.id] = { favoriteId: curr.id };
        }
        return acc;
      }, {} as FavoriteStore['items']);
      return {
        ...state,
        items,
      };
    }),
  addItem: product =>
    set(state => {
      const item = state.localItems.find(item => item.id === product.id);
      if (!item) {
        const newLocalItems = [...state.localItems, product];
        const items = newLocalItems.reduce((acc, curr) => {
          if (!acc[curr.id]) {
            acc[curr.id] = { favoriteId: 0 };
          }
          return acc;
        }, {} as FavoriteStore['items']);
        return {
          ...state,
          localItems: newLocalItems,
          items,
        };
      }

      return state;
    }),
  removeItem: id =>
    set(state => {
      const newLocalItems = state.localItems.flatMap(item => {
        if (item.id !== id) {
          return [item];
        }
        return [];
      });
      const items = newLocalItems.reduce((acc, curr) => {
        if (!acc[curr.id]) {
          acc[curr.id] = { favoriteId: 0 };
        }
        return acc;
      }, {} as FavoriteStore['items']);
      return {
        ...state,
        items,
        localItems: newLocalItems,
      };
    }),
}));
