'use client';
import { useFilter, useUpdateFilter } from '@/api/filters/hooks';
import { Button, Form, Input, Modal, Space, Spin, message } from 'antd';
import { useCallback, useEffect } from 'react';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  filterId?: number;
};

type FormValue = {
  title: string;
};

const ModalChangeFilter = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormValue>();
  const { mutateAsync, isLoading } = useUpdateFilter();
  const { data, isFetching } = useFilter({
    id: props.filterId,
    enabled: !!props.filterId && !!props.open,
  });

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormValue) => {
        if (!props.filterId) return;
        try {
          await mutateAsync({ id: props.filterId, patch: values });
          form.resetFields();
          onOk?.();
        } catch (error) {
          console.error(error);
          message.error('Ошибка');
        }
      },
      [mutateAsync, props.filterId, onOk, form]
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
      title='Изменить фильтр'
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
        <Form
          form={form}
          initialValues={{ title: data?.title }}
          layout='vertical'
          onFinish={callbacks.handleFinish}
        >
          <Form.Item label='Название' name='title' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalChangeFilter;
