'use client';
import {
  useCharacteristics,
  useDeleteCharacteristic,
} from '@/api/characteristicts/hooks';
import ModalAddCharacteristic from '@/features/characteristics/ModalAddCharacteristic';
import ModalChangeCharacteristic from '@/features/characteristics/ModalChangeCharacteristic';
import useModal from '@/shared/hooks/use-modal';
import RelativeLink from '@/shared/ui/elements/relative-link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, List, Space } from 'antd';
import { useState } from 'react';

type Props = { params: { group_id: string } };

export const revalidate = 0;

const CharacteristicsGroupPage = (props: Props) => {
  console.log('props', props);

  const modal = useModal();
  const modalChange = useModal();
  const groupId = Number(props.params.group_id);
  const [changeId, setChangeId] = useState<number | undefined>(undefined);
  const { data, isFetching } = useCharacteristics({ groupId });
  const { mutateAsync } = useDeleteCharacteristic();
  console.log('data CharacteristicsGroupPage', data);

  return (
    <div>
      <Button type='primary' onClick={modal.open}>
        Добавить характеристику
      </Button>
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
      <ModalAddCharacteristic
        groupId={groupId}
        open={modal.visible}
        onCancel={modal.close}
        onOk={modal.close}
      />
      <ModalChangeCharacteristic
        characteristicId={changeId}
        onOk={modalChange.close}
        open={modalChange.visible}
        onCancel={modalChange.close}
      />
    </div>
  );
};

export default CharacteristicsGroupPage;
