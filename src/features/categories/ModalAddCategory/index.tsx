import { useCreateCategory } from '@/api/categories/hooks';
import { Button, Form, Modal, Space, message } from 'antd';
import { useCallback } from 'react';
import FormCategory, { FormCategoryValue } from '../FormCategory';

type Props = { open?: boolean; onOk?: () => void; onCancel?: () => void };

const ModalAddCategory = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormCategoryValue>();
  const { mutateAsync, isLoading } = useCreateCategory();

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormCategoryValue) => {
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
      title='Добавление категории'
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
      <FormCategory onFinish={callbacks.handleFinish} form={form} />
    </Modal>
  );
};

export default ModalAddCategory;
