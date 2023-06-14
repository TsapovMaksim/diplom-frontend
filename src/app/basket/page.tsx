'use client';

import { useBasketByUserId } from '@/api/basket/hooks';
import BasketItem from '@/features/basket/basket-item';
import BasketTotal from '@/features/basket/basket-total';
import { useAuth } from '@/shared/hooks/use-auth';
import { Empty, Space } from 'antd';

type Props = {};
import './style.scss';
import { useBasketStore } from '@/store/basket';

const BaksetPage = (props: Props) => {
  const { session: data, loading } = useAuth();
  const userId = data?.user.user.id;
  const basketId = data?.user.user.basket.id;
  const { data: basket } = useBasketByUserId({
    id: userId as number,
    enabled: !!userId,
  });
  const localItems = useBasketStore(state => state.localItems);
  console.log('localItems', localItems);
  console.log('loading', loading);
  console.log('userId', userId);

  return (
    <div className='basket'>
      {basket?.basketProducts.length || localItems.length ? (
        <Space size={12} direction='vertical'>
          {userId
            ? basket?.basketProducts.map(item => (
                <BasketItem
                  count={item.count}
                  preview={item.product.preview?.path || ''}
                  price={item.product.price}
                  title={item.product.title}
                  key={item.id}
                  basketId={basketId}
                  basketProductId={item.id}
                  productLink={`/category/${item.product.category.id}/${item.product.id}`}
                  productId={item.product.id}
                />
              ))
            : undefined}
          {!loading && !userId
            ? localItems.map(item => (
                <BasketItem
                  count={item.count}
                  preview={item.product.preview?.path || ''}
                  price={item.product.price}
                  title={item.product.title}
                  key={item.id}
                  basketId={undefined}
                  basketProductId={undefined}
                  productLink={`/category/${item.product.category.id}/${item.product.id}`}
                  productId={item.product.id}
                  allProduct={item.product}
                />
              ))
            : undefined}
        </Space>
      ) : (
        <Empty style={{ width: '100%' }} />
      )}

      <BasketTotal />
    </div>
  );
};

export default BaksetPage;
