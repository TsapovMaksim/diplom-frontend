'use client';
import { Form, FormProps, Input } from 'antd';
import React from 'react';

export type FormCategoryProps = FormProps<FormCategoryValue>;
export type FormCategoryValue = {
  title: string;
};

const FormCategory = (props: FormCategoryProps) => {
  return (
    <Form layout='vertical' {...props}>
      <Form.Item label={'Название'} name='title' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormCategory;
