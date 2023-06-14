'use client';
import { Button, Form, Input, Typography, message } from 'antd';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

type FormValue = {
  email: string;
  password: string;
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const SignInPage = (props: Props) => {
  const params = useSearchParams();

  const router = useRouter();
  const handleFinish = async (values: FormValue) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (res?.error) {
      message.error('Неверное имя пользователя или пароль');
      return;
    }
    try {
      const url = new URL(params.get('callbackUrl') as string);

      router.replace(url.pathname);
    } catch (error) {
      console.error(error);
      router.replace('');
    }
    return;
  };

  return (
    <div>
      <Typography.Title level={3}>Войти в аккаунт</Typography.Title>
      <Form style={{ maxWidth: 500 }} onFinish={handleFinish} layout='vertical'>
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
        <Button htmlType='submit' type='primary'>
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default SignInPage;
