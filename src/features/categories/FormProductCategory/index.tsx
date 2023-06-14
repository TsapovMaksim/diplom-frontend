'use client';
import { Form, FormProps, Input } from 'antd';
import React from 'react';

export type FormProductCategoryProps = FormProps<FormProductCategoryValue>;
export type FormProductCategoryValue = {
  title: string;
};

const FormCategory = (props: FormProductCategoryProps) => {
  return (
    <Form layout='vertical' {...props}>
      <Form.Item label={'Название'} name='title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormCategory;
