import React from 'react';
import { message, Rate, Modal, Button, Space, Form, Input } from 'antd';
import { useCreateReview } from '@/api/reviews/hooks';
import { useAuth } from '@/shared/hooks/use-auth';

type ModalAddReviewProps = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  productId: number;
};

type FormValue = {
  star: number;
  text: string;
};

const ModalAddReview = (props: ModalAddReviewProps) => {
  const [form] = Form.useForm<FormValue>();
  const { mutateAsync: createReview, isLoading: isCreateReviewLoading } =
    useCreateReview();
  const { session } = useAuth();

  const callbacks = {
    handleFinish: async (values: FormValue) => {
      try {
        const userId = session?.user.user.id;
        if (!userId) return;
        await createReview({ ...values, productId: props.productId, userId });
        props.onOk?.();
        form.resetFields();
      } catch (error) {
        console.error(error);
        message.error('Ошибка');
      }
      console.log('values', values);
    },
    handleCancel: () => {
      props.onCancel?.();
      form.resetFields();
    },
  };

  return (
    <Modal
      open={props.open}
      title='Добавление отзыва'
      onCancel={callbacks.handleCancel}
      footer={
        <Space>
          <Button
            loading={isCreateReviewLoading}
            onClick={form.submit}
            type='primary'
          >
            Сохранить
          </Button>
          <Button onClick={callbacks.handleCancel}>Отмена</Button>
        </Space>
      }
    >
      <Form onFinish={callbacks.handleFinish} form={form} layout='vertical'>
        <Form.Item name='star' label='Оценка'>
          <Rate />
        </Form.Item>
        <Form.Item name='text' label='Содержание'>
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddReview;
