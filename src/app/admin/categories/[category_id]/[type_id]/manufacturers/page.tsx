'use client';
import {
  useDeleteCategoryFromManufacturer,
  useManufacturers,
} from '@/api/manufacturers/hooks';
import ModalAddCategoryManufacturer from '@/features/categories/ModalAddCategoryManufacturer';
import useModal from '@/shared/hooks/use-modal';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, List, Space } from 'antd';

type Props = {
  params: { type_id: string };
};

export const revalidate = 0;

const CategoryManufacturers = (props: Props) => {
  const categoryId = Number(props.params.type_id);
  const { data: manufacturers, isFetching: isManufacturersFetching } =
    useManufacturers({ productCategoryId: categoryId });
  const { mutateAsync: deleteCategoryFromManufacturer } =
    useDeleteCategoryFromManufacturer();

  const modal = useModal();
  return (
    <div>
      <Button onClick={modal.open} type='primary'>
        Добавить производителя
      </Button>
      <List
        loading={isManufacturersFetching}
        dataSource={manufacturers}
        renderItem={item => (
          <List.Item key={item.id}>
            <Space>
              {item.title}
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  deleteCategoryFromManufacturer({
                    productCategoryId: categoryId,
                    id: item.id,
                  })
                }
              />
            </Space>
          </List.Item>
        )}
      />
      <ModalAddCategoryManufacturer
        categoryId={categoryId}
        open={modal.visible}
        onCancel={modal.close}
        onOk={modal.close}
      />
    </div>
  );
};

export default CategoryManufacturers;
