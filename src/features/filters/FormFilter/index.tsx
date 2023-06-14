'use client';
import {
  useCharacteristicGroups,
  useCharacteristics,
} from '@/api/characteristicts/hooks';
import { Form, FormProps, Input, Select } from 'antd';
import React from 'react';

export type FormFilterProps = FormProps<FormFilterValue> & {
  categoryId: number;
};

export type FormFilterValue = {
  characteristicId: number;
  title: string;
  characteristicGroupId: number;
};

const FormFilter = (props: FormFilterProps) => {
  const [form] = Form.useForm(props.form);
  const characteristicGroupId = Form.useWatch('characteristicGroupId', form);
  const { data: characteristicGroups, isFetching: isGroupFetching } =
    useCharacteristicGroups({
      categoryId: props.categoryId,
    });
  const { data: characteristics, isFetching } = useCharacteristics({
    groupId: characteristicGroupId,
    enabled: !!characteristicGroupId,
  });
  return (
    <Form layout='vertical' {...props} form={form}>
      <Form.Item name='title' label='Название' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='characteristicGroupId'
        label='Группа характеристик'
        rules={[{ required: true }]}
      >
        <Select
          loading={isGroupFetching}
          options={characteristicGroups?.map(item => ({
            label: item.title,
            value: item.id,
          }))}
        />
      </Form.Item>
      <Form.Item
        name='characteristicId'
        label='Характеристика товара'
        rules={[{ required: true }]}
      >
        <Select
          loading={isFetching}
          options={characteristics?.map(item => ({
            label: item.title,
            value: item.id,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default FormFilter;
