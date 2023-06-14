import { Form, FormProps, Input } from 'antd';
import React from 'react';

export type FormManufacturerProps = FormProps<FormManufacturerValue>;

export type FormManufacturerValue = { title: string };

const FormManufacturer = (props: FormManufacturerProps) => {
  return (
    <Form layout='vertical' {...props}>
      <Form.Item label={'Название'} name='title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default React.memo(FormManufacturer);
