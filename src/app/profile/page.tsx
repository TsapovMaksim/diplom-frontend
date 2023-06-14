'use client';

import { Spin, Form, Input, Typography } from 'antd';
import { useAuth } from '@/shared/hooks/use-auth';

const ProfilePage = () => {
  const { loading, session } = useAuth();
  return (
    <>
      <Typography.Title level={3}>Профиль пользователя</Typography.Title>
      <Spin spinning={loading}>
        <Form layout='vertical'>
          <Form.Item label='Имя'>
            <Input value={session?.user.user.name} disabled />
          </Form.Item>
          <Form.Item label='Фамилия'>
            <Input value={session?.user.user.surname} disabled />
          </Form.Item>
          <Form.Item label='Email'>
            <Input value={session?.user.user.email} disabled />
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default ProfilePage;
