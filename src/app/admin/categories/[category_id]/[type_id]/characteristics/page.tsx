'use client';
import {
  useCharacteristicGroups,
  useDeleteCharacteristicGroup,
} from '@/api/characteristicts/hooks';
import ModalAddCharacteristicGroup from '@/features/characteristics/ModalAddCharacteristicGroup';
import ModalChangeCharacteristicGroup from '@/features/characteristics/ModalChangeCharacteristicGroup';
import useModal from '@/shared/hooks/use-modal';
import RelativeLink from '@/shared/ui/elements/relative-link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, List, Space } from 'antd';
import { useState } from 'react';

type Props = { params: { type_id: string } };

export const revalidate = 0;

const AdminCharacteristicsPage = (props: Props) => {
  const categoryId = Number(props.params.type_id);
  const modal = useModal();
  const modalChange = useModal();
  const [changeId, setChangeId] = useState<number | undefined>(undefined);
  const { mutateAsync } = useDeleteCharacteristicGroup();
  const { data, isFetching } = useCharacteristicGroups({ categoryId });

  return (
    <div>
      <Space>
        <Button type='primary' onClick={modal.open}>
          Добавить группу характеристик
        </Button>
      </Space>
      <List
        loading={isFetching}
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.id}>
            <Space>
              <RelativeLink href={`/${item.id}`}>{item.title}</RelativeLink>
              <Button
                onClick={() => {
                  setChangeId(item.id);
                  modalChange.open();
                }}
                icon={<EditOutlined />}
              />
              <Button
                onClick={() => {
                  mutateAsync({ id: item.id });
                }}
                danger
                icon={<DeleteOutlined />}
              />
            </Space>
          </List.Item>
        )}
      />
      <ModalAddCharacteristicGroup
        categoryId={categoryId}
        onCancel={modal.close}
        open={modal.visible}
        onOk={modal.close}
      />
      <ModalChangeCharacteristicGroup
        characteristicGroupId={changeId}
        onCancel={modalChange.close}
        open={modalChange.visible}
        onOk={modalChange.close}
      />
    </div>
  );
};

export default AdminCharacteristicsPage;
