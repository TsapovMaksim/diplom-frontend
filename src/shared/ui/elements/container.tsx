import React, { PropsWithChildren } from 'react';

const Container: React.FC<
  PropsWithChildren<{ style?: React.CSSProperties }>
> = ({ children, style }) => {
  return (
    <div
      style={{
        maxWidth: 1180,
        width: '100%',
        margin: '0 auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
