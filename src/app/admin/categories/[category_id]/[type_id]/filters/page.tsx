'use client';
import { useDeleteFilter, useFilters } from '@/api/filters/hooks';
import ModalAddFilter from '@/features/filters/ModalAddFilter';
import ModalChangeFilter from '@/features/filters/ModalChangeFilter';
import useModal from '@/shared/hooks/use-modal';
import RelativeLink from '@/shared/ui/elements/relative-link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, List, Space } from 'antd';
import { useState } from 'react';

type Props = {
  params: {
    type_id: string;
  };
};

const FiltersPage = (props: Props) => {
  const productCategoryId = Number(props.params.type_id);
  const modal = useModal();
  const modalChange = useModal();
  const [changeId, setChangeId] = useState<number | undefined>(undefined);
  const { data, isFetching } = useFilters({
    productCategoryId,
  });
  const { mutateAsync } = useDeleteFilter();
  return (
    <div>
      <Button type='primary' onClick={modal.open}>
        Добавить фильтр
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
      <ModalAddFilter
        productCategoryId={productCategoryId}
        open={modal.visible}
        onCancel={modal.close}
        onOk={modal.close}
      />
      <ModalChangeFilter
        filterId={changeId}
        onOk={modalChange.close}
        onCancel={modalChange.close}
        open={modalChange.visible}
      />
    </div>
  );
};

export default FiltersPage;
