'use client';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import React from 'react';

type Props = { open?: boolean; onOk?: () => void; onCancel?: () => void };

const ModalAddCategoryFilter = (props: Props) => {
  return (
    <Modal
      open={props.open}
      destroyOnClose
      onCancel={props.onCancel}
      title='Добавление фильтра'
      footer={
        <Space>
          <Button type='primary'>Сохранить</Button>
          <Button onClick={props.onCancel}>Отмена</Button>
        </Space>
      }
    >
      <Form layout='vertical'>
        <Form.Item label='Название' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Характеристика товара' rules={[{ required: true }]}>
          <Select />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddCategoryFilter;
