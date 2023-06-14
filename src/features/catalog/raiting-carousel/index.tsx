'use client';
import ProductCarousel from '@/features/catalog/product-carousel';
import { Typography } from 'antd';

const RaitingCarousel = () => {
  return (
    <div>
      <Typography.Title style={{ marginTop: 12 }} level={4}>
        Самый высокий рейтинг
      </Typography.Title>
      <ProductCarousel
        params={{
          sort_property: 'raiting',
          sort_direction: 'DESC',
          page: 1,
          page_size: 10,
        }}
      />
    </div>
  );
};

export default RaitingCarousel;
