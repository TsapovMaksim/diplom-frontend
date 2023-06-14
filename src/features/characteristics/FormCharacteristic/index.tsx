'use client';
import { Form, FormProps, Input } from 'antd';
import React from 'react';

export type FormCharacteristicProps = FormProps<FormCharacteristicValue>;
export type FormCharacteristicValue = {
  title: string;
};

const FormCharacteristic = (props: FormCharacteristicProps) => {
  return (
    <Form layout='vertical' {...props}>
      <Form.Item label={'Название'} name='title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormCharacteristic;
