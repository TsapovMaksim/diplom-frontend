'use client';
import {
  useCharacteristicGroup,
  useUpdateCharacteristicGroup,
} from '@/api/characteristicts/hooks';
import { Button, Form, Modal, Space, Spin, message } from 'antd';
import { useCallback, useEffect } from 'react';
import FormCharacteristicGroup, {
  FormCharacteristicGroupValue,
} from '../FormCharacteristicGroup';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  characteristicGroupId?: number;
};

const ModalChangeCharacteristicGroup = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormCharacteristicGroupValue>();
  const { mutateAsync, isLoading } = useUpdateCharacteristicGroup();
  const { data, isFetching } = useCharacteristicGroup({
    id: props.characteristicGroupId,
    enabled: !!props.characteristicGroupId && !!props.open,
  });

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormCharacteristicGroupValue) => {
        if (!props.characteristicGroupId) return;
        try {
          await mutateAsync({ id: props.characteristicGroupId, patch: values });
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, props.characteristicGroupId, onOk, form]
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
      title='Изменить группу характеристик'
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
        <FormCharacteristicGroup
          initialValues={{ title: data?.title }}
          onFinish={callbacks.handleFinish}
          form={form}
        />
      </Spin>
    </Modal>
  );
};

export default ModalChangeCharacteristicGroup;
