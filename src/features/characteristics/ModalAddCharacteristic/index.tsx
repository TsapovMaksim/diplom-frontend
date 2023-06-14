import { useCreateCharacteristic } from '@/api/characteristicts/hooks';
import { Button, Form, Modal, Space, message } from 'antd';
import { useCallback } from 'react';
import FormCharacteristic, {
  FormCharacteristicValue,
} from '../FormCharacteristic';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  groupId?: number;
};

const ModalAddCategory = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormCharacteristicValue>();
  const { mutateAsync, isLoading } = useCreateCharacteristic();

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormCharacteristicValue) => {
        if (!props.groupId) return;
        try {
          await mutateAsync({ typeId: props.groupId, ...values });
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, onOk, form, props.groupId]
    ),
    handleCancel: () => {
      props.onCancel?.();
      form.resetFields();
    },
  };

  return (
    <Modal
      open={props.open}
      title='Добавление характеристики'
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
      <FormCharacteristic onFinish={callbacks.handleFinish} form={form} />
    </Modal>
  );
};

export default ModalAddCategory;
