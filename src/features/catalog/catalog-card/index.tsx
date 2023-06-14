'use client';
import BasketButton from '@/features/basket/busket-button';
import FavoriteButton from '@/features/favorite/favorite-button';
import ProductRaiting from '@/shared/ui/elements/product-raiting';
import RelativeLink from '@/shared/ui/elements/relative-link';
import getImagePath from '@/shared/utils/get-image-path';
import { Space, theme } from 'antd';
import Image from 'next/image';

import './style.scss';
import { BasketProduct } from '@/store/basket';

type Props = {
  isFavorite?: boolean;
  inComparison?: boolean;
  title?: string;
  shortDescription?: string;
  id: number;
  price?: number;
  preview?: string;
  raiting: number;
  reviewsCount: number;
  allProduct: BasketProduct;
};

const numberFormat = new Intl.NumberFormat('ru').format;

const CatalogCard = (props: Props) => {
  return (
    <div className='catalog-card'>
      <div className='catalog-card__image-wrapper'>
        <div className='catalog-card__image'>
          <Image
            alt={props.title || 'preview'}
            src={getImagePath(props.preview)}
            width={160}
            height={160}
            sizes='(max-width: 600px) 100px'
          />
        </div>
        <RelativeLink
          className='catalog-card__link catalog-card__link_mobile'
          href={`/${props.id}`}
        >
          {props.title}{' '}
          {props.shortDescription ? `[${props.shortDescription}]` : ''}
        </RelativeLink>
      </div>

      <div className='catalog-card__content'>
        <div className='catalog-card__content-wrapper'>
          <RelativeLink className='catalog-card__link' href={`/${props.id}`}>
            {props.title}{' '}
            {props.shortDescription ? `[${props.shortDescription}]` : ''}
          </RelativeLink>
          <span className='catalog-card__price'>
            {numberFormat(props.price as number)} P
          </span>
        </div>
        <Space>
          <FavoriteButton productId={props.id} allProduct={props.allProduct} />
          <BasketButton productId={props.id} allProduct={props.allProduct} />
        </Space>
        <ProductRaiting
          raiting={props.raiting}
          reviewsCount={props.reviewsCount}
        />
      </div>
      <div className='catalog-card__content_mobile'>
        <div className='catalog-card__actions'>
          <Space>
            <FavoriteButton
              productId={props.id}
              allProduct={props.allProduct}
            />
            <BasketButton productId={props.id} allProduct={props.allProduct} />
          </Space>
          <div>
            <ProductRaiting
              raiting={props.raiting}
              reviewsCount={props.reviewsCount}
            />
          </div>
        </div>
        <span className='catalog-card__price'>
          {numberFormat(props.price as number)} P
        </span>
      </div>
    </div>
  );
};

export default CatalogCard;
