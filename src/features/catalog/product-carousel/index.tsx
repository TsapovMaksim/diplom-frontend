'use client';
import { GetCatalogProductsParams } from '@/api/products';
import { useCatalogProducts } from '@/api/products/hooks';
import Carousel from '@/shared/ui/elements/carousel';
import getImagePath from '@/shared/utils/get-image-path';
import Image from 'next/image';
import React from 'react';
import { Typography, Space } from 'antd';

import './style.scss';
import Link from 'next/link';
import FavoriteButton from '@/features/favorite/favorite-button';
import BasketButton from '@/features/basket/busket-button';
import ProductRaiting from '@/shared/ui/elements/product-raiting';
import numberFormat from '@/shared/utils/number-format';

type Props = { params: GetCatalogProductsParams };

const ProductCarousel = (props: Props) => {
  const { data } = useCatalogProducts(props.params);
  if (!data) return <></>;
  return (
    <div className='product-carousel'>
      <Carousel
        responsive={[
          { breakpoint: 1180, settings: { slidesToShow: 3 } },
          { breakpoint: 900, settings: { slidesToShow: 2 } },
          { breakpoint: 550, settings: { slidesToShow: 1 } },
        ]}
        infinite={false}
        slidesToShow={4}
      >
        {data.content.map(item => (
          <div key={item.id}>
            <div className='product-carousel__item'>
              <div className='product-carousel__item-wrapper'>
                <div className='product-carousel__image'>
                  <Image
                    width={160}
                    height={160}
                    alt={item.title}
                    src={getImagePath(item.preview?.path)}
                  />
                </div>
                <Link
                  className='product-carousel__item-title'
                  href={`/category/${item.category.id}/${item.id}`}
                >
                  {item.title}
                </Link>
                <div className='product-carousel__item-content'>
                  <div>
                    <Space style={{ width: '100%' }}>
                      <FavoriteButton productId={item.id} allProduct={item} />
                      <BasketButton productId={item.id} allProduct={item} />
                    </Space>
                    <ProductRaiting
                      raiting={item.raiting}
                      reviewsCount={item.reviewsCount}
                    />
                  </div>
                  <Typography.Text
                    className='product-carousel__item-price'
                    strong
                  >
                    {numberFormat(item.price)} Р
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
