'use client';
import { useBasketByUserId } from '@/api/basket/hooks';
import { useFavoriteById } from '@/api/favorite/hooks';
import { useAuth } from '@/shared/hooks/use-auth';
import Container from '@/shared/ui/elements/container';
import { useBasketStore } from '@/store/basket';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import {
  BarChartOutlined,
  HeartOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, Layout, Menu, Spin } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import ru from 'antd/locale/ru_RU';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter, useServerInsertedHTML } from 'next/navigation';
import { userAgent } from 'next/server';
import { PropsWithChildren, useEffect, useState } from 'react';

const RootStyleRegistry = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export type MainLayoutProps = PropsWithChildren;

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <RootStyleRegistry>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider locale={ru}>{children}</ConfigProvider>
        </QueryClientProvider>
      </RootStyleRegistry>
    </SessionProvider>
  );
};

const MainLayout = (props: MainLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { session: data, loading } = useAuth();
  const userId = data?.user.user.id;
  const { data: basket } = useBasketByUserId({
    id: userId as number,
    enabled: !!userId,
  });
  const favoriteId = data?.user.user.favorite.id;
  useFavoriteById({ id: favoriteId as number, enabled: !!favoriteId });
  const setBasket = useBasketStore(state => state.setBasket);

  useEffect(() => {
    console.log('process env', process.env);
  }, []);

  useEffect(() => {
    console.log('basket', basket);

    if (!basket) return;
    setBasket(basket);
  }, [basket, setBasket]);

  const items: ItemType<MenuItemType>[] = [
    {
      key: '0',
      label: <Link href={'/'}>Главная</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: '2',
      label: <Link href={'/favorite'}>Избранное</Link>,
      icon: <HeartOutlined />,
    },
    {
      key: '3',
      label: <Link href={'/basket'}>Корзина</Link>,
      icon: <ShoppingCartOutlined />,
    },
    {
      key: '4',
      label: 'Профиль',
      icon: <UserOutlined />,
      children: data?.user
        ? [
            {
              key: '4.1',
              label: 'Выйти',
              onClick: () => {
                signOut();
              },
            },
            {
              key: '4.2',
              label: <Link href={'/profile'}>Профиль</Link>,
            },
          ]
        : [
            {
              key: '4.1',
              label: 'Войти',
              onClick: () => {
                signIn();
              },
            },
            {
              key: '4.2',
              label: (
                <Link href={`/register?callbackUrl=${pathname}`}>
                  Зарегистрироваться
                </Link>
              ),
            },
          ],
    },
  ];

  if (data?.user) {
    items.splice(1, 0, {
      key: '1',
      label: <Link href={'/admin'}>Админка</Link>,
      icon: <BarChartOutlined />,
      onClick: () => router.push('/admin'),
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          padding: '0 15px',
        }}
      >
        <Container
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Menu
            selectedKeys={[]}
            style={{ width: '100%' }}
            items={items}
            mode='horizontal'
            theme='dark'
          />
        </Container>
      </Layout.Header>
      <Layout.Content>
        <Container style={{ padding: '12px 15px', minHeight: '100%' }}>
          {' '}
          {loading ? <Spin /> : props.children}
        </Container>
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;
