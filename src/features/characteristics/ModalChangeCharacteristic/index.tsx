'use client';
import {
  useCharacteristic,
  useUpdateCharacteristic,
} from '@/api/characteristicts/hooks';
import { Button, Form, Modal, Space, Spin, message } from 'antd';
import { useCallback, useEffect } from 'react';
import FormCharacteristic, {
  FormCharacteristicValue,
} from '../FormCharacteristic';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  characteristicId?: number;
};

const ModalChangeCharacteristic = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormCharacteristicValue>();
  const { mutateAsync, isLoading } = useUpdateCharacteristic();
  const { data, isFetching } = useCharacteristic({
    id: props.characteristicId,
    enabled: !!props.characteristicId && !!props.open,
  });

  console.log('data', data);

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormCharacteristicValue) => {
        if (!props.characteristicId) return;
        try {
          await mutateAsync({ id: props.characteristicId, patch: values });
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, props.characteristicId, onOk, form]
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
      title='Изменить характеристику'
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
        <FormCharacteristic
          initialValues={{ title: data?.title }}
          onFinish={callbacks.handleFinish}
          form={form}
        />
      </Spin>
    </Modal>
  );
};

export default ModalChangeCharacteristic;
