'use client';
import numberFormat from '@/shared/utils/number-format';
import { useBasketStore } from '@/store/basket';
import { message, Button, Typography } from 'antd';
import React from 'react';
import './style.scss';
import { useAuth } from '@/shared/hooks/use-auth';
import { useClearBasket } from '@/api/basket/hooks';

type Props = {};

const BasketTotal = (props: Props) => {
  const { isAuthenticated, session } = useAuth();
  const totalPrice = useBasketStore(state => state.totalPrice);
  const totalCount = useBasketStore(state => state.totalCount);
  const clear = useBasketStore(state => state.clear);
  const { mutateAsync: clearBasket, isLoading } = useClearBasket();
  return (
    <div className='basket-total'>
      <Typography.Text italic>Всего: </Typography.Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Typography.Text style={{ fontSize: 16 }} strong>
          {totalCount} товара
        </Typography.Text>
        <Typography.Text style={{ fontSize: 16 }} strong>
          {numberFormat(totalPrice)} ₽
        </Typography.Text>
      </div>
      <Button
        onClick={() => {
          if (!totalCount) return;
          const basketId = session?.user.user.basket.id;
          if (!basketId) {
            clear();
            message.success('Заказ оформлен');
            return;
          }
          clearBasket({ basketId });
          message.success('Заказ оформлен');
        }}
        block
        type='primary'
        loading={isLoading}
      >
        Оформить
      </Button>
    </div>
  );
};

export default BasketTotal;
