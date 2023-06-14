'use client';
import { useCreateBasketProduct } from '@/api/basket/hooks';
import {
  useCreateFavoriteProduct,
  useDeleteFavoriteProduct,
} from '@/api/favorite/hooks';
import { useAuth } from '@/shared/hooks/use-auth';
import { BasketProduct, useBasketStore } from '@/store/basket';
import { useFavoriteStore } from '@/store/favorite';
import { HeartFilled } from '@ant-design/icons';
import { Button, theme } from 'antd';
import React from 'react';

type Props = { productId: number; allProduct?: BasketProduct };

const FavoriteButton = (props: Props) => {
  const {
    token: { colorPrimaryActive },
  } = theme.useToken();
  const { session, isAuthenticated } = useAuth();
  const {
    mutateAsync: createFavoriteProduct,
    isLoading: isCreateFavoriteProductLoading,
  } = useCreateFavoriteProduct();
  const {
    mutateAsync: deleteFavoriteProduct,
    isLoading: isDeleteFavoriteProductLoading,
  } = useDeleteFavoriteProduct();
  const itemsInFavorite = useFavoriteStore(state => state.items);
  const { addItem, removeItem } = useFavoriteStore();

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      if (!props.allProduct) return;

      if (itemsInFavorite[props.productId]) {
        removeItem(props.productId);
        return;
      }
      addItem(props.allProduct);
      return;
    }
    if (itemsInFavorite[props.productId] && session?.user) {
      try {
        await deleteFavoriteProduct({
          favoriteId: session.user.user.favorite.id,
          favoriteProductId: itemsInFavorite[props.productId].favoriteId,
        });
      } catch (error) {
        console.error(error);
      }
      return;
    }
    try {
      if (session?.user) {
        createFavoriteProduct({
          favoriteId: session.user.user.favorite.id,
          body: { productId: props.productId },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      loading={isCreateFavoriteProductLoading || isDeleteFavoriteProductLoading}
      onClick={handleFavoriteClick}
      icon={
        <HeartFilled
          style={
            itemsInFavorite[props.productId]
              ? { color: colorPrimaryActive }
              : undefined
          }
        />
      }
    />
  );
};

export default FavoriteButton;
