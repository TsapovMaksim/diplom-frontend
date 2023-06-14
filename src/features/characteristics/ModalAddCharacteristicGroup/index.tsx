import { useCreateCharacteristicGroup } from '@/api/characteristicts/hooks';
import { Button, Form, Modal, Space, message } from 'antd';
import { useCallback } from 'react';
import FormCharacteristicGroup, {
  FormCharacteristicGroupValue,
} from '../FormCharacteristicGroup';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  categoryId?: number;
};

const ModalAddCategory = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormCharacteristicGroupValue>();
  const { mutateAsync, isLoading } = useCreateCharacteristicGroup();

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormCharacteristicGroupValue) => {
        if (!props.categoryId) return;
        try {
          await mutateAsync({ categoryId: props.categoryId, ...values });
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, onOk, form, props.categoryId]
    ),
    handleCancel: () => {
      props.onCancel?.();
      form.resetFields();
    },
  };

  return (
    <Modal
      open={props.open}
      title='Добавление группы характеристик'
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
      <FormCharacteristicGroup onFinish={callbacks.handleFinish} form={form} />
    </Modal>
  );
};

export default ModalAddCategory;
