import { useDeleteProductImage, useProductImages } from '@/api/products/hooks';
import Carousel from '@/shared/ui/elements/carousel';
import getImagePath from '@/shared/utils/get-image-path';
import { Button, Spin, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';

type Props = {
  productId: number;
};

const TovarImages = (props: Props) => {
  const { data: productImages, isFetching } = useProductImages({
    productId: props.productId,
  });

  const {
    mutateAsync: deleteProductImage,
    isLoading: isDeleteProductImageLoading,
  } = useDeleteProductImage();

  const handleDelete = async (imageId: number) => {
    try {
      await deleteProductImage({ productId: props.productId, imageId });
    } catch (error) {
      console.error(error);
      message.error('Ошибка');
    }
  };

  return (
    <Spin spinning={isFetching}>
      <Carousel slidesToShow={3} infinite={false}>
        {productImages?.map(item => (
          <div key={item.id}>
            <div style={{ minHeight: 200, padding: '0 10px' }}>
              <Button
                style={{ position: 'absolute', content: '', zIndex: 1 }}
                danger
                loading={isDeleteProductImageLoading}
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(item.id)}
              />
              <Image
                style={{ maxWidth: '100%' }}
                width={370}
                height={370}
                alt={item.name}
                src={getImagePath(item.path)}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </Spin>
  );
};

export default TovarImages;
