'use client';

import { useCategories } from '@/api/categories/hooks';
import PopularCarousel from '@/features/catalog/popular-carousel';
import RaitingCarousel from '@/features/catalog/raiting-carousel';
import { Menu, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data: categories, isFetching: isCategoriesFetching } =
    useCategories();
  const { data } = useSession();
  console.log('data', data);

  return (
    <>
      <Typography.Title level={4}>Категории</Typography.Title>
      <Menu
        style={{ maxWidth: 500 }}
        mode='inline'
        items={categories?.map(
          item =>
            ({
              key: item.id,
              label: item.title,
              children: item.productCategories.map(item => ({
                key: item.id + '1',
                label: item.title,
                onClick: () => router.push(`/category/${item.id}`),
              })),
            } as ItemType<MenuItemType>)
        )}
      />
      <PopularCarousel />
      <RaitingCarousel />
    </>
  );
}
