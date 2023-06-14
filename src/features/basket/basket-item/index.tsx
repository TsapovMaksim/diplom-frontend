'use client';
import {
  useAddBasketProduct,
  useDeleteBasketProduct,
  useRemoveBasketProduct,
} from '@/api/basket/hooks';
import getImagePath from '@/shared/utils/get-image-path';
import numberFormat from '@/shared/utils/number-format';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import './style.scss';
import { BasketProduct, useBasketStore } from '@/store/basket';

type Props = {
  title: string;
  price: number;
  count: number;
  preview: string;
  basketId?: number;
  basketProductId?: number;
  productLink: string;
  allProduct?: BasketProduct;
  productId: number;
};

const BasketItem = (props: Props) => {
  const {
    mutateAsync: addBasketProduct,
    isLoading: isAddBasketProductLoading,
  } = useAddBasketProduct();
  const {
    mutateAsync: removeBasketProduct,
    isLoading: isRemoveBasketProductLoading,
  } = useRemoveBasketProduct();
  const {
    mutateAsync: deleteBasketProduct,
    isLoading: isDeleteBasketProductLoading,
  } = useDeleteBasketProduct();
  const { addItem, removeItem, deleteItem } = useBasketStore();

  const callbacks = {
    handleAddItem: async () => {
      if (!props.basketId || !props.basketProductId) {
        if (!props.allProduct) return;
        addItem(props.allProduct);
        return;
      }
      try {
        await addBasketProduct({
          basketId: props.basketId,
          body: { basketProductId: props.basketProductId },
        });
      } catch (error) {
        console.error(error);
      }
    },
    handleRemoveItem: async () => {
      if (!props.basketId || !props.basketProductId) {
        removeItem(props.productId);
        return;
      }
      try {
        await removeBasketProduct({
          basketId: props.basketId,
          body: { basketProductId: props.basketProductId },
        });
      } catch (error) {
        console.error(error);
      }
    },
    handleDeleteItem: async () => {
      if (!props.basketId || !props.basketProductId) {
        deleteItem(props.productId);
        return;
      }
      try {
        await deleteBasketProduct({
          basketId: props.basketId,
          basketProductId: props.basketProductId,
        });
      } catch (error) {
        console.error(error);
      }
    },
  };

  return (
    <div className='basket-item'>
      <div className='basket-item__image-wrapper'>
        <div className='basket-item__image'>
          <Image
            width={120}
            height={120}
            alt={props.title}
            src={getImagePath(props.preview)}
          />
        </div>
        <Link className='basket-item__link_mobile' href={props.productLink}>
          {props.title}
        </Link>
      </div>
      <div className='basket-item__content'>
        <Link href={props.productLink}>{props.title}</Link>
        <Space style={{ maxWidth: 358, width: '100%' }}>
          <Button
            disabled={isAddBasketProductLoading || isRemoveBasketProductLoading}
            loading={isDeleteBasketProductLoading}
            danger
            icon={<DeleteOutlined />}
            onClick={callbacks.handleDeleteItem}
          />
          <Space style={{ border: '1px solid gray', borderRadius: 8 }}>
            <Button
              disabled={
                isAddBasketProductLoading || isDeleteBasketProductLoading
              }
              loading={isRemoveBasketProductLoading}
              type='text'
              icon={<MinusOutlined />}
              onClick={callbacks.handleRemoveItem}
            />
            <Typography.Text>{props.count}</Typography.Text>
            <Button
              disabled={
                isRemoveBasketProductLoading || isDeleteBasketProductLoading
              }
              loading={isAddBasketProductLoading}
              type='text'
              icon={<PlusOutlined />}
              onClick={callbacks.handleAddItem}
            ></Button>
          </Space>
        </Space>
        <Typography.Text italic strong>
          {numberFormat(props.price)} ₽ /шт.
        </Typography.Text>
      </div>
      <div className='basket-item__content basket-item__content_mobile'>
        <Space style={{ maxWidth: 358, width: '100%' }}>
          <Button
            disabled={isAddBasketProductLoading || isRemoveBasketProductLoading}
            loading={isDeleteBasketProductLoading}
            danger
            icon={<DeleteOutlined />}
            onClick={callbacks.handleDeleteItem}
          />
          <Space style={{ border: '1px solid gray', borderRadius: 8 }}>
            <Button
              disabled={
                isAddBasketProductLoading || isDeleteBasketProductLoading
              }
              loading={isRemoveBasketProductLoading}
              type='text'
              icon={<MinusOutlined />}
              onClick={callbacks.handleRemoveItem}
            />
            <Typography.Text>{props.count}</Typography.Text>
            <Button
              disabled={
                isRemoveBasketProductLoading || isDeleteBasketProductLoading
              }
              loading={isAddBasketProductLoading}
              type='text'
              icon={<PlusOutlined />}
              onClick={callbacks.handleAddItem}
            ></Button>
          </Space>
        </Space>
        <Typography.Text
          className='basket-item__price basket-item__price_mobile'
          italic
          strong
        >
          {numberFormat(props.price)} ₽ /шт.
        </Typography.Text>
      </div>
      <Typography.Text className='basket-item__price' strong>
        {numberFormat(props.price * props.count)} ₽
      </Typography.Text>
    </div>
  );
};

export default BasketItem;
