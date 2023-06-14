import { useGroupedProductCharacteristics } from '@/api/products/hooks';
import { Space, Spin, Typography } from 'antd';
import React from 'react';

type Props = { productId: number };

const Characteristics = (props: Props) => {
  const { data: characteristics, isFetching } =
    useGroupedProductCharacteristics({
      id: props.productId,
    });
  if (!characteristics || isFetching) return <Spin spinning />;
  return (
    <Space
      direction='vertical'
      size={16}
      style={{ maxWidth: 800, width: '100%' }}
    >
      {characteristics.map(item => {
        return (
          <div key={item.id}>
            <Typography.Title
              style={{ marginBottom: '0.25em', lineHeight: 1 }}
              level={5}
            >
              {item.title}
            </Typography.Title>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: 8,
                rowGap: 4,
              }}
            >
              {item.characteristics.map(val => {
                return (
                  <>
                    <span
                      style={{
                        borderBottom: '1px dotted #ddd',
                      }}
                    >
                      {val.title}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {val.productCharacteristics[0]?.value}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </Space>
  );
};

export default Characteristics;
