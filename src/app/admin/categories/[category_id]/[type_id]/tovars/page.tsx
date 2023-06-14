'use client';
import { useDeleteProduct, useProducts } from '@/api/products/hooks';
import ModalCreateTovar from '@/features/tovars/ModalCreateTovar';
import useModal from '@/shared/hooks/use-modal';
import RelativeLink from '@/shared/ui/elements/relative-link';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, List, Space, Typography } from 'antd';

type Props = {
  params: { type_id: string };
};

const AdminTovarsPage = (props: Props) => {
  const productCategoryId = Number(props.params.type_id);
  const modal = useModal();
  const { data, isFetching } = useProducts({ category: productCategoryId });
  const { mutateAsync } = useDeleteProduct();

  return (
    <div>
      <Button onClick={modal.open} type='primary'>
        Добавить продукт
      </Button>
      <List
        dataSource={data}
        loading={isFetching}
        renderItem={item => (
          <List.Item>
            <Space>
              <RelativeLink href={`/${item.id}`}>{item.title}</RelativeLink>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  mutateAsync({
                    id: item.id,
                  })
                }
              />
            </Space>
          </List.Item>
        )}
      />
      <ModalCreateTovar
        productCategoryId={productCategoryId}
        open={modal.visible}
        onOk={modal.close}
        onCancel={modal.close}
      />
    </div>
  );
};

export default AdminTovarsPage;
