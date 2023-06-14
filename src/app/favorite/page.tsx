'use client';

import { useFavoriteById } from '@/api/favorite/hooks';
import FavoriteItem from '@/features/favorite/favorite-item';
import { useAuth } from '@/shared/hooks/use-auth';
import { useFavoriteStore } from '@/store/favorite';
import { Empty, Space } from 'antd';

type Props = {};

const FavoritePage = (props: Props) => {
  const { session: data, loading, isAuthenticated } = useAuth();
  const favoriteId = data?.user.user.favorite.id;
  const { data: favorite } = useFavoriteById({
    id: favoriteId as number,
    enabled: !!favoriteId,
  });
  const localItems = useFavoriteStore(state => state.localItems);
  return (
    <div style={{ display: 'flex', columnGap: 16 }}>
      {favorite?.favoriteProducts.length || localItems.length ? (
        <Space style={{ width: '100%' }} size={12} direction='vertical'>
          {isAuthenticated
            ? favorite?.favoriteProducts.map(item => (
                <FavoriteItem
                  preview={item.product.preview?.path || ''}
                  price={item.product.price}
                  title={item.product.title}
                  productId={item.product.id}
                  favoriteId={favoriteId}
                  favoriteProductId={item.id}
                  key={item.id}
                  productLink={`/category/${item.product.category.id}/${item.product.id}`}
                  raiting={item.product.raiting}
                  reviewsCount={item.product.reviewsCount}
                  allProduct={item.product}
                />
              ))
            : undefined}
          {!loading && !isAuthenticated
            ? localItems.map(item => (
                <FavoriteItem
                  preview={item.preview?.path || ''}
                  price={item.price}
                  title={item.title}
                  productId={item.id}
                  favoriteId={undefined}
                  favoriteProductId={undefined}
                  key={item.id}
                  productLink={`/category/${item.category.id}/${item.id}`}
                  raiting={item.raiting}
                  reviewsCount={item.reviewsCount}
                  allProduct={item}
                />
              ))
            : undefined}
        </Space>
      ) : (
        <Empty style={{ width: '100%' }} />
      )}
    </div>
  );
};

export default FavoritePage;
