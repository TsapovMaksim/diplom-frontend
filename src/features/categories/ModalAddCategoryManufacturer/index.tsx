'use client';
import {
  useAddCategoryToManufacturer,
  useManufacturers,
} from '@/api/manufacturers/hooks';
import { Button, Form, Input, Modal, Select, Space, message } from 'antd';
import React from 'react';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  categoryId: number;
};

type FormValue = {
  manufacturer: number;
};

const ModalAddCategoryManufacturer = (props: Props) => {
  const [form] = Form.useForm<FormValue>();
  const { data: manufacturers, isFetching: isManufacturersFetching } =
    useManufacturers({});
  const {
    mutateAsync: addCategoryToManufacturer,
    isLoading: isAddCategoryToManufacturerLoading,
  } = useAddCategoryToManufacturer();

  const handleFinish = async (values: FormValue) => {
    try {
      await addCategoryToManufacturer({
        id: values.manufacturer,
        body: { productCategoryId: props.categoryId },
      });
      form.resetFields();
      props.onOk?.();
    } catch (error) {
      console.error(error);
      message.error('Ошибка');
    }
  };
  return (
    <Modal
      open={props.open}
      destroyOnClose
      title='Добавление производителя для категории'
      onCancel={props.onCancel}
      footer={
        <Space>
          <Button
            onClick={form.submit}
            loading={isAddCategoryToManufacturerLoading}
            type='primary'
          >
            Сохранить
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
              props.onCancel?.();
            }}
          >
            Отмена
          </Button>
        </Space>
      }
    >
      <Form onFinish={handleFinish} form={form} layout='vertical'>
        <Form.Item
          label='Производитель'
          name={'manufacturer'}
          rules={[{ required: true }]}
        >
          <Select
            loading={isManufacturersFetching}
            placeholder='Выберите производителя'
            options={manufacturers?.map(item => ({
              value: item.id,
              label: item.title,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCategoryManufacturer;
