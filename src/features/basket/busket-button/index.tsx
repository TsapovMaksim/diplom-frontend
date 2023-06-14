'use client';
import { useCreateBasketProduct } from '@/api/basket/hooks';
import { useAuth } from '@/shared/hooks/use-auth';
import { BasketProduct, useBasketStore } from '@/store/basket';
import { Button } from 'antd';
import React from 'react';

type Props = { productId: number; allProduct?: BasketProduct };

const BasketButton = (props: Props) => {
  const { session } = useAuth();
  const {
    mutateAsync: createBasketProduct,
    isLoading: isCreateBasketProductLoading,
  } = useCreateBasketProduct();
  const itemsInBasket = useBasketStore(state => state.items);
  const addProduct = useBasketStore(state => state.addItem);

  const handleBuyClick = async () => {
    try {
      if (!session?.user) {
        if (!props.allProduct) return;
        addProduct(props.allProduct);
        return;
      }
      if (session?.user) {
        createBasketProduct({
          basketId: session.user.user.basket.id,
          body: { productId: props.productId },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (itemsInBasket[props.productId]) {
    return <Button>В корзине</Button>;
  }
  return (
    <Button loading={isCreateBasketProductLoading} onClick={handleBuyClick}>
      Купить
    </Button>
  );
};

export default BasketButton;
