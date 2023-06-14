'use client';
import { Button, Form, Input, Typography, message } from 'antd';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useCreateUser } from '@/api/user/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

type FormValue = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const RegisterPage = (props: Props) => {
  const searchParams = useSearchParams();
  const { mutateAsync: createUser, isLoading: isCreateUserLoading } =
    useCreateUser();
  const router = useRouter();
  const handleFinish = async (values: FormValue) => {
    try {
      await createUser(values);
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res?.error) {
        console.error(res);
        message.error('Ошибка регистрации');
        return;
      }
      router.replace(searchParams.get('callbackUrl') || '');
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  return (
    <div>
      <Typography.Title level={3}>Регистрация пользователя</Typography.Title>
      <Form style={{ maxWidth: 500 }} onFinish={handleFinish} layout='vertical'>
        <Form.Item label='Имя' rules={[{ required: true }]} name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Фамилия' rules={[{ required: true }]} name='surname'>
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          rules={[{ required: true }, { type: 'email' }]}
          name='email'
        >
          <Input />
        </Form.Item>
        <Form.Item label='Пароль' rules={[{ required: true }]} name='password'>
          <Input.Password minLength={6} />
        </Form.Item>
        <Button loading={isCreateUserLoading} htmlType='submit' type='primary'>
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
