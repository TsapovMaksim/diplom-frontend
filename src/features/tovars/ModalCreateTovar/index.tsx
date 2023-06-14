import { useCreateProduct } from '@/api/products/hooks';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import { useCallback } from 'react';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  productCategoryId: number;
};

type FormValue = {
  title: string;
};

const ModalCreateTovar = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormValue>();
  const { mutateAsync, isLoading } = useCreateProduct();

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormValue) => {
        try {
          await mutateAsync({
            ...values,
            productCategoryId: props.productCategoryId,
          });
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, onOk, form, props.productCategoryId]
    ),
    handleCancel: () => {
      props.onCancel?.();
      form.resetFields();
    },
  };

  return (
    <Modal
      open={props.open}
      title='Добавление товара'
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
      <Form form={form} onFinish={callbacks.handleFinish} layout='vertical'>
        <Form.Item rules={[{ required: true }]} label='Название' name='title'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateTovar;
