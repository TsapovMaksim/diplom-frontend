'use client';
import ProductCarousel from '@/features/catalog/product-carousel';
import { Typography } from 'antd';

const PopularCarousel = () => {
  return (
    <div>
      <Typography.Title style={{ marginTop: 12 }} level={4}>
        Популярные
      </Typography.Title>
      <ProductCarousel
        params={{
          sort_property: 'reviewsCount',
          sort_direction: 'DESC',
          page: 1,
          page_size: 10,
        }}
      />
    </div>
  );
};

export default PopularCarousel;
