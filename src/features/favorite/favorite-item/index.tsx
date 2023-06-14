'use client';
import { useDeleteFavoriteProduct } from '@/api/favorite/hooks';
import BasketButton from '@/features/basket/busket-button';
import ProductRaiting from '@/shared/ui/elements/product-raiting';
import getImagePath from '@/shared/utils/get-image-path';
import numberFormat from '@/shared/utils/number-format';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import './style.scss';
import { BasketProduct, useBasketStore } from '@/store/basket';
import { useFavoriteStore } from '@/store/favorite';

type Props = {
  title: string;
  price: number;
  preview: string;
  favoriteId?: number;
  favoriteProductId?: number;
  productId: number;
  productLink: string;
  raiting: number;
  reviewsCount: number;
  allProduct: BasketProduct;
};

const FavoriteItem = (props: Props) => {
  const {
    mutateAsync: deleteFavoriteProduct,
    isLoading: isDeleteFavoriteLoading,
  } = useDeleteFavoriteProduct();
  const deleteItem = useFavoriteStore(state => state.removeItem);

  const callbacks = {
    handleDeleteItem: async () => {
      if (!props.favoriteId || !props.favoriteProductId) {
        deleteItem(props.productId);
        return;
      }
      try {
        await deleteFavoriteProduct({
          favoriteId: props.favoriteId,
          favoriteProductId: props.favoriteProductId,
        });
      } catch (error) {
        console.error(error);
      }
    },
  };

  return (
    <div className='favorite-item'>
      <div className='favorite-item__image-wrapper'>
        <div className='favorite-item__image'>
          <Image
            width={120}
            height={120}
            alt={props.title}
            src={getImagePath(props.preview)}
          />
        </div>
        <Link className='favorite-item__link_mobile' href={props.productLink}>
          {props.title}
        </Link>
      </div>
      <div className='favorite-item__content'>
        <Link href={props.productLink}>{props.title}</Link>
        <Space style={{ maxWidth: 358, width: '100%' }}>
          <Button
            loading={isDeleteFavoriteLoading}
            danger
            icon={<DeleteOutlined />}
            onClick={callbacks.handleDeleteItem}
          />
          <BasketButton
            productId={props.productId}
            allProduct={props.allProduct}
          />
        </Space>
        <ProductRaiting
          raiting={props.raiting}
          reviewsCount={props.reviewsCount}
          style={{ marginTop: 0 }}
        />
      </div>
      <div className='favorite-item__content favorite-item__content_mobile'>
        <div>
          <Space>
            <Button
              loading={isDeleteFavoriteLoading}
              danger
              icon={<DeleteOutlined />}
              onClick={callbacks.handleDeleteItem}
            />
            <BasketButton
              productId={props.productId}
              allProduct={props.allProduct}
            />
          </Space>
          <div>
            <ProductRaiting
              raiting={props.raiting}
              reviewsCount={props.reviewsCount}
              style={{ marginTop: 12 }}
            />
          </div>
        </div>
        <Typography.Text
          className='favorite-item__price favorite-item__price_mobile'
          strong
        >
          {numberFormat(props.price)} ₽
        </Typography.Text>
      </div>
      <Typography.Text className='favorite-item__price' strong>
        {numberFormat(props.price)} ₽
      </Typography.Text>
    </div>
  );
};

export default FavoriteItem;
