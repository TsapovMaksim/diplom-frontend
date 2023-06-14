'use client';
import {
  useCreateProductCharacteristic,
  useDeleteProductCharacteristic,
  useProductCharacteristics,
} from '@/api/characteristicts/hooks';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, List, Space, Typography, message } from 'antd';

type Props = {
  params: { id: string };
};

const CharacteristicPage = (props: Props) => {
  const characteristicId = Number(props.params.id);
  const { data, isFetching } = useProductCharacteristics({
    characteristicId,
  });
  const { mutateAsync } = useDeleteProductCharacteristic();
  const {
    mutateAsync: createProductCharacteristic,
    isLoading: isCreateLoading,
  } = useCreateProductCharacteristic();

  const callbacks = {
    handleFihish: async (values: { value: string }) => {
      if (!values.value.trim()) return;
      try {
        await createProductCharacteristic({
          characteristicId,
          value: values.value,
        });
      } catch (error) {
        console.error(error);
        message.error('Ошибка');
      }
    },
  };

  return (
    <div>
      <Form layout='vertical' onFinish={callbacks.handleFihish}>
        <Form.Item
          name='value'
          label='Новое значение'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button loading={isCreateLoading} htmlType='submit' type='primary'>
            Добавить
          </Button>
        </Form.Item>
      </Form>
      <Typography.Title level={5}>Значения:</Typography.Title>
      <List
        loading={isFetching}
        dataSource={data}
        renderItem={item => (
          <List.Item key={item.id}>
            <Space>
              {item.value}
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
    </div>
  );
};

export default CharacteristicPage;
