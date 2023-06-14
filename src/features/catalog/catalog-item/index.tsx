'use client';
import { useProduct } from '@/api/products/hooks';
import BasketButton from '@/features/basket/busket-button';
import CatalogItemImages from '@/features/catalog/catalog-item/images';
import Reviews from '@/features/catalog/catalog-item/reviews';
import FavoriteButton from '@/features/favorite/favorite-button';
import numberFormat from '@/shared/utils/number-format';
import { Space, Spin, Tabs, Typography } from 'antd';
import Characteristics from './characteristics';
import ProductRaiting from '@/shared/ui/elements/product-raiting';
import './style.scss';

type Props = { id: number };

const CatalogItem = (props: Props) => {
  const { data: product, isFetching: isProductFetching } = useProduct({
    id: props.id,
  });
  // if (isProductFetching || !product) return <Spin spinning size='large' />;
  if (isProductFetching || !product) return <div></div>;

  return (
    <div className='catalog-item'>
      <Typography.Title className='catalog-item__title' level={2}>
        {product?.title}
      </Typography.Title>
      <div className='catalog-item__preview'>
        <div className='catalog-item__images'>
          <CatalogItemImages productId={product.id} />
        </div>
        <div
          style={{
            boxShadow: '0 8px 24px rgb(0 0 0 / 12%)',
            borderRadius: 8,
            padding: 16,
            alignSelf: 'flex-start',
          }}
        >
          <Typography.Paragraph
            strong
            style={{
              width: 170,
              minWidth: 170,
              marginRight: 'auto',
              fontSize: '1.5rem',
            }}
          >
            {numberFormat(product.price)} P
          </Typography.Paragraph>
          <Space size={8} direction='vertical'>
            <Typography.Paragraph>
              {product.short_description}
            </Typography.Paragraph>
            <ProductRaiting
              style={{ margin: 0 }}
              raiting={product.raiting}
              reviewsCount={product.reviewsCount}
            />
            <Space>
              <FavoriteButton productId={product.id} allProduct={product} />

              <BasketButton productId={props.id} allProduct={product} />
            </Space>
          </Space>
        </div>
      </div>

      <Tabs
        destroyInactiveTabPane={false}
        items={[
          {
            key: '1',
            label: 'Описание',
            children: (
              <>
                <Typography.Paragraph>
                  {product.description}
                </Typography.Paragraph>
              </>
            ),
          },
          {
            key: '2',
            label: 'Характеристики',
            children: <Characteristics productId={props.id} />,
          },
          {
            key: '3',
            label: `Отзывы (${product.reviewsCount})`,
            children: <Reviews productId={props.id} />,
          },
        ]}
      />
    </div>
  );
};

export default CatalogItem;
