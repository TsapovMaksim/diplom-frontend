'use client';
import { useCategory, useUpdateCategory } from '@/api/categories/hooks';
import { Button, Form, Modal, Space, Spin, message } from 'antd';
import { useCallback, useEffect } from 'react';
import FormCategory, { FormCategoryValue } from '../FormCategory';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  categoryId?: number;
};

const ModalChangeCategory = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormCategoryValue>();
  const { mutateAsync, isLoading } = useUpdateCategory();
  const { data, isFetching } = useCategory({
    id: props.categoryId,
    enabled: !!props.categoryId && !!props.open,
  });

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormCategoryValue) => {
        if (!props.categoryId) return;
        try {
          await mutateAsync({ id: props.categoryId, patch: values });
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, props.categoryId, onOk, form]
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
      title='Изменить категорию'
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
        <FormCategory
          initialValues={{ title: data?.title }}
          onFinish={callbacks.handleFinish}
          form={form}
        />
      </Spin>
    </Modal>
  );
};

export default ModalChangeCategory;
