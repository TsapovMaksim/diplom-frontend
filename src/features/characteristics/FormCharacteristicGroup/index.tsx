'use client';
import { Form, FormProps, Input } from 'antd';
import React from 'react';

export type FormCharacteristicGroupProps =
  FormProps<FormCharacteristicGroupValue>;
export type FormCharacteristicGroupValue = {
  title: string;
};

const FormCharacteristicGroup = (props: FormCharacteristicGroupProps) => {
  return (
    <Form layout='vertical' {...props}>
      <Form.Item label={'Название'} name='title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormCharacteristicGroup;
