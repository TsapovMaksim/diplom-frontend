'use client';
import {
  useCharacteristic,
  useProductCharacteristics,
} from '@/api/characteristicts/hooks';
import {
  useCreateFilterValue,
  useDeleteFilterValue,
  useFilter,
  useFilterValues,
} from '@/api/filters/hooks';
import RelativeLink from '@/shared/ui/elements/relative-link';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  List,
  Select,
  Space,
  Typography,
  message,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React from 'react';

type Props = {
  params: { id: string };
};

type FormValue = {
  productCharacteristicId: number;
  title: string;
};

const FilterPage = (props: Props) => {
  const [form] = Form.useForm<FormValue>();
  const filterId = Number(props.params.id);
  const { data: filter } = useFilter({ id: filterId });
  const { mutateAsync: createFilterValue, isLoading: isCreateLoading } =
    useCreateFilterValue();
  const { data, isFetching } = useFilterValues({ filterId });
  const { mutateAsync: deleteFilterValue } = useDeleteFilterValue();
  const { data: characteristic, isFetching: isFetchingCharacteristic } =
    useCharacteristic({
      id: filter?.characteristic.id,
      enabled: !!filter?.characteristic.id,
    });

  const handleFinish = async (values: FormValue) => {
    try {
      await createFilterValue({ filterId, ...values });
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Ошибка');
    }
  };

  return (
    <div>
      <Typography.Title level={5}>Добавление значения фильтра</Typography.Title>
      <Form onFinish={handleFinish} form={form} layout='vertical'>
        <Form.Item
          name='productCharacteristicId'
          label='Значение характеристики'
          rules={[{ required: true }]}
        >
          <Select
            onChange={(item, option) => {
              form.setFieldsValue({
                title: (option as DefaultOptionType).label as string,
              });
            }}
            loading={isFetchingCharacteristic}
            options={characteristic?.productCharacteristics.map(item => ({
              value: item.id,
              label: item.value,
            }))}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name='title'
          label='Название в фильтре'
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button loading={isCreateLoading} htmlType='submit' type='primary'>
            Добавить
          </Button>
        </Form.Item>
      </Form>
      <Typography.Title level={5}>Значения</Typography.Title>
      <List
        dataSource={data}
        loading={isFetching}
        renderItem={item => (
          <List.Item>
            <Space>
              {item.title}
              {/* <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setChangeId(item.id);
                  modalChange.open();
                }}
              /> */}
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  deleteFilterValue({
                    id: item.id,
                  })
                }
              />
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FilterPage;
