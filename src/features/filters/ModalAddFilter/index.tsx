import { useCreateFilter } from '@/api/filters/hooks';
import { Button, Form, Modal, Space, message } from 'antd';
import { useCallback } from 'react';
import FormFilter, { FormFilterValue } from '../FormFilter';

type Props = {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  productCategoryId: number;
};

const ModalAddFilter = ({ onOk, ...props }: Props) => {
  const [form] = Form.useForm<FormFilterValue>();
  const { mutateAsync, isLoading } = useCreateFilter();

  const callbacks = {
    handleFinish: useCallback(
      async (values: FormFilterValue) => {
        try {
          await mutateAsync({
            productCategoryId: props.productCategoryId,
            ...values,
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
      title='Добавление фильтра'
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
      <FormFilter
        categoryId={props.productCategoryId}
        onFinish={callbacks.handleFinish}
        form={form}
      />
    </Modal>
  );
};

export default ModalAddFilter;
