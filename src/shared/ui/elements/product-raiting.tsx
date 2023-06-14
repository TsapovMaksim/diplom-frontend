'use client';

import { Rate, Space } from 'antd';
import React, { CSSProperties } from 'react';

type Props = {
  raiting: number;
  reviewsCount: number;
  style?: CSSProperties;
};

const ProductRaiting = (props: Props) => {
  return (
    <Space
      style={{
        border: '1px solid rgb(217, 217, 217)',
        padding: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 12,
        ...props.style,
      }}
    >
      <Rate style={{ fontSize: 14 }} disabled value={props.raiting} />
      {props.reviewsCount}
    </Space>
  );
};

export default ProductRaiting;
