import CatalogFilter from '@/features/catalog/catalog-filter';
import { Button, Modal } from 'antd';
import React from 'react';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  productCategoryId: number;
};

const CatalogFilterModal = (props: Props) => {
  return (
    <Modal
      open={props.open}
      onCancel={props.onCancel}
      footer={
        <>
          <Button onClick={props.onCancel}>Закрыть</Button>
        </>
      }
    >
      <CatalogFilter productCategoryId={props.productCategoryId} />
    </Modal>
  );
};

export default CatalogFilterModal;
