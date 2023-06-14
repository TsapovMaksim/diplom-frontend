'use client';
import {
  useManufacturer,
  useUpdateManufacturer,
} from '@/api/manufacturers/hooks';
import { Button, Form, Modal, Space, Spin, message } from 'antd';
import { useCallback, useEffect } from 'react';
import FormManufacturer, { FormManufacturerValue } from '../FormManufacturer';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  manufacturerId?: number;
};

const ModalChangeManufacturer = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormManufacturerValue>();
  const { mutateAsync, isLoading } = useUpdateManufacturer();
  const { data, isFetching } = useManufacturer({
    id: props.manufacturerId,
    enabled: !!props.manufacturerId && !!props.open,
  });

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormManufacturerValue) => {
        if (!props.manufacturerId) return;
        try {
          await mutateAsync({ id: props.manufacturerId, patch: values });
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, props.manufacturerId, onOk, form]
    ),
    handleCancel: () => {
      props.onCancel?.();
      form.resetFields();
    },
  };

  useEffect(() => {
    if (isFetching || !data) return;
    form.resetFields();
  }, [isFetching, data, form]);

  return (
    <Modal
      open={props.open}
      title='Изменить производителя'
      onCancel={callbacks.handleCancel}
      footer={
        <Space>
          <Button
            disabled={isFetching}
            loading={isLoading}
            onClick={form.submit}
            type='primary'
          >
            Сохранить
          </Button>
          <Button onClick={callbacks.handleCancel}>Отмена</Button>
        </Space>
      }
    >
      <Spin spinning={isFetching}>
        <FormManufacturer
          initialValues={{ title: data?.title }}
          onFinish={callbacks.handleFinish}
          form={form}
        />
      </Spin>
    </Modal>
  );
};

export default ModalChangeManufacturer;
