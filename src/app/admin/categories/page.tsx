'use client';
import { useCategories, useDeleteCategory } from '@/api/categories/hooks';
import ModalAddCategory from '@/features/categories/ModalAddCategory';
import ModalChangeCategory from '@/features/categories/ModalChangeCategory';
import useModal from '@/shared/hooks/use-modal';
import RelativeLink from '@/shared/ui/elements/relative-link';
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, List, Space, Typography } from 'antd';
import { useState } from 'react';

export const revalidate = 0;

const AdminCategoriesPage = () => {
  const modal = useModal();
  const modalChange = useModal();
  const { data, isFetching } = useCategories();
  const [changeId, setChangeId] = useState<number | undefined>(undefined);
  const { mutateAsync } = useDeleteCategory();

  return (
    <div>
      <Typography.Title level={4}>Категории</Typography.Title>
      <Button type='primary' onClick={modal.open} icon={<PlusCircleOutlined />}>
        Добавить категорию
      </Button>
      <List
        dataSource={data}
        loading={isFetching}
        renderItem={item => (
          <List.Item>
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
                onClick={() => mutateAsync({ id: item.id })}
              />
            </Space>
          </List.Item>
        )}
      />
      <ModalAddCategory
        onOk={modal.close}
        open={modal.visible}
        onCancel={modal.close}
      />
      <ModalChangeCategory
        categoryId={changeId}
        onOk={modalChange.close}
        open={modalChange.visible}
        onCancel={modalChange.close}
      />
    </div>
  );
};

export default AdminCategoriesPage;
