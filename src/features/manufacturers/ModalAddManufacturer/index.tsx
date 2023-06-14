'use client';
import { useCreateManufacturer } from '@/api/manufacturers/hooks';
import FormManufacturer, { FormManufacturerValue } from '../FormManufacturer';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import React, { useCallback } from 'react';

type Props = { open?: boolean; onOk?: () => void; onCancel?: () => void };

const ModalAddManufacturer = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormManufacturerValue>();
  const { mutateAsync, isLoading } = useCreateManufacturer();

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormManufacturerValue) => {
        try {
          await mutateAsync(values);
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, onOk, form]
    ),
    handleCancel: () => {
      props.onCancel?.();
      form.resetFields();
    },
  };

  return (
    <Modal
      open={props.open}
      title='Добавление производителя'
      onCancel={callbacks.handleCancel}
      footer={
        <Space>
          <Button loading={isLoading} onClick={form.submit} type='primary'>
            Сохранить
          </Button>
          <Button onClick={callbacks.handleCancel}>Отмена</Button>
        </Space>
      }
    >
      <FormManufacturer onFinish={callbacks.handleFinish} form={form} />
    </Modal>
  );
};

export default ModalAddManufacturer;
