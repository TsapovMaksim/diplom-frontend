'use client';
import {
  useDeleteProductCategory,
  useProductCategories,
} from '@/api/categories/hooks';
import ModalAddProductCategory from '@/features/categories/ModalAddProductCategory';
import ModalChangeProductCategory from '@/features/categories/ModalChangeProductCategory';
import useModal from '@/shared/hooks/use-modal';
import RelativeLink from '@/shared/ui/elements/relative-link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, List, Space } from 'antd';
import { useState } from 'react';

type Props = {
  params: { category_id: string };
};

const AdminCategoryPage = (props: Props) => {
  const modal = useModal();
  const modalChange = useModal();
  const categoryId = Number(props.params.category_id);
  const [changeId, setChangeId] = useState<number | undefined>(undefined);
  const { data } = useProductCategories({
    categoryId,
  });
  const { mutateAsync } = useDeleteProductCategory();

  return (
    <div>
      <Button type='primary' onClick={modal.open}>
        Добавить категорию продукта
      </Button>
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.id}>
            <Space>
              <RelativeLink href={`/${item.id}`}>{item.title}</RelativeLink>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setChangeId(item.id);
                  modalChange.open();
                }}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  mutateAsync({
                    categoryId,
                    id: item.id,
                  })
                }
              />
            </Space>
          </List.Item>
        )}
      />
      <ModalAddProductCategory
        onOk={modal.close}
        open={modal.visible}
        onCancel={modal.close}
        categoryId={categoryId}
      />
      <ModalChangeProductCategory
        categoryId={categoryId}
        productCategoryId={changeId}
        open={modalChange.visible}
        onCancel={modalChange.close}
        onOk={modalChange.close}
      />
    </div>
  );
};

export default AdminCategoryPage;
