import { useCreateProductCategory } from '@/api/categories/hooks';
import { Button, Form, Modal, Space, message } from 'antd';
import { useCallback } from 'react';
import FormProductCategory, {
  FormProductCategoryValue,
} from '../FormProductCategory';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  categoryId?: number;
};

const ModalAddProductCategory = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormProductCategoryValue>();
  const { mutateAsync, isLoading } = useCreateProductCategory();

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormProductCategoryValue) => {
        if (!props.categoryId) return;
        try {
          await mutateAsync({ categoryId: props.categoryId, body: values });
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
      title='Добавление категории продукта'
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
      <FormProductCategory onFinish={callbacks.handleFinish} form={form} />
    </Modal>
  );
};

export default ModalAddProductCategory;
