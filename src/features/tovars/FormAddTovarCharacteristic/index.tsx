import {
  useCharacteristics,
  useProductCharacteristics,
} from '@/api/characteristicts/hooks';
import { useAddCharacteristicToProduct } from '@/api/products/hooks';
import { Button, Form, Select, Spin, message } from 'antd';
import React from 'react';

type Props = {
  characteristicGroupId: number;
  tovarId: number;
};

type FormValue = {
  characteristicId: number;
  productCharacteristicId: number;
};

const FormAddTovarCharacteristic = (props: Props) => {
  const [form] = Form.useForm<FormValue>();
  const characteristicId = Form.useWatch('characteristicId', form);
  const { data: characteristics, isFetching: isCharacteristicsFetching } =
    useCharacteristics({
      groupId: props.characteristicGroupId,
    });
  const {
    data: productCharacteristics,
    isFetching: isProductCharacteristicsFetching,
  } = useProductCharacteristics({
    characteristicId: characteristicId,
    enabled: !!characteristicId,
  });
  const {
    mutateAsync: addCharacteristicToProduct,
    isLoading: isAddToProductLoading,
  } = useAddCharacteristicToProduct({
    revalidateCharacteristics: true,
    groupId: props.characteristicGroupId,
    tovarId: props.tovarId,
  });

  const handleFinish = async (values: FormValue) => {
    try {
      const characteristc = productCharacteristics?.find(
        item => item.id === values.productCharacteristicId
      );
      if (!characteristc) return;
      await addCharacteristicToProduct({
        id: props.tovarId,
        body: [characteristc],
      });
    } catch (error) {
      console.error(error);
      message.error('Ошибка');
    }
  };

  return (
    <Spin spinning={isCharacteristicsFetching}>
      <Form layout='vertical' form={form} onFinish={handleFinish}>
        <Form.Item
          label='Характеристика'
          name='characteristicId'
          rules={[{ required: true }]}
        >
          <Select
            onChange={() => {
              form.setFieldValue('productCharacteristicId', undefined);
            }}
            loading={isCharacteristicsFetching}
            options={characteristics?.map(item => ({
              label: item.title,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label='Значение характеристики'
          name='productCharacteristicId'
          rules={[{ required: true }]}
        >
          <Select
            loading={isProductCharacteristicsFetching}
            options={productCharacteristics?.map(item => ({
              label: item.value,
              value: item.id,
            }))}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            htmlType='submit'
            loading={isAddToProductLoading}
            type='primary'
          >
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default FormAddTovarCharacteristic;
