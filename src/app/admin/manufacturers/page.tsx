'use client';
import {
  useDeleteManufacturer,
  useManufacturers,
} from '@/api/manufacturers/hooks';
import ModalAddManufacturer from '@/features/manufacturers/ModalAddManufacturer';
import ModalChangeManufacturer from '@/features/manufacturers/ModalChangeManufacturer';
import useModal from '@/shared/hooks/use-modal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, List, Space, Spin } from 'antd';
import { useState } from 'react';

type Props = {};

export const revalidate = 0;

const ManufacturersPage = (props: Props) => {
  const modal = useModal();
  const modalChange = useModal();
  const { data, isFetching } = useManufacturers({});
  const [changeId, setChangeId] = useState<number | undefined>(undefined);
  const { mutateAsync } = useDeleteManufacturer();
  return (
    <div>
      <Button onClick={modal.open} type='primary'>
        Добавить производителя
      </Button>
      <Spin spinning={isFetching}>
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <Space>
                {item.title}
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
      </Spin>
      <ModalAddManufacturer
        onOk={modal.close}
        open={modal.visible}
        onCancel={modal.close}
      />
      <ModalChangeManufacturer
        manufacturerId={changeId}
        onOk={modalChange.close}
        open={modalChange.visible}
        onCancel={modalChange.close}
      />
    </div>
  );
};

export default ManufacturersPage;
