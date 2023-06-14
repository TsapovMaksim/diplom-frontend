'use client';

import { Spin, SpinProps } from 'antd';
import React from 'react';

type Props = SpinProps;

const Loader = (props: Props) => {
  return <Spin {...props} />;
};

export default Loader;
