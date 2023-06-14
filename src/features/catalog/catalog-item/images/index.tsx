'use client';
import { useProductImages } from '@/api/products/hooks';
import Carousel from '@/shared/ui/elements/carousel';
import getImagePath from '@/shared/utils/get-image-path';
import { Spin } from 'antd';
import Image from 'next/image';
import React from 'react';

type Props = {
  productId: number;
};

const CatalogItemImages = (props: Props) => {
  const { data: images, isFetching } = useProductImages({
    productId: props.productId,
  });
  return (
    <Spin spinning={isFetching}>
      <div>
        <Carousel
          infinite
          responsive={[
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                centerMode: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                centerPadding: '0px',
                centerMode: false,
              },
            },
          ]}
        >
          {images?.map(item => (
            <div key={item.id}>
              <div>
                <Image
                  style={{ maxWidth: '100%' }}
                  width={470}
                  height={470}
                  src={getImagePath(item.path)}
                  alt={item.name}
                  sizes='(max-width: 600px) 210px'
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </Spin>
  );
};

export default CatalogItemImages;
