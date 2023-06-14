'use client';

import { useCategory, useProductCategory } from '@/api/categories/hooks';
import {
  useCharacteristic,
  useCharacteristicGroup,
} from '@/api/characteristicts/hooks';
import { useFilter } from '@/api/filters/hooks';
import { useProduct } from '@/api/products/hooks';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {};

const pathMap: Record<string, string> = {
  filters: 'Фильтры',
  admin: 'Админка',
  characteristics: 'Характеристики',
  manufacturers: 'Производители',
  categories: 'Категории',
  tovars: 'Товары',
};

const AdminBreadcrumb = (props: Props) => {
  const pathname = usePathname();
  const paths = pathname.slice(1).split('/');
  const categoryId = paths.at(2);
  const productCategoryId = paths.at(3);
  const chracateristicGroupId =
    paths.at(5) && paths.at(4) === 'characteristics'
      ? Number(paths.at(5))
      : null;
  const characteristicId =
    paths.at(6) && chracateristicGroupId ? Number(paths.at(6)) : null;
  const tovarId =
    paths.at(4) === 'tovars' && paths.at(5) ? Number(paths.at(5)) : null;
  const filterId =
    paths.at(4) === 'filters' && paths.at(5) ? Number(paths.at(5)) : null;
  const { data: category } = useCategory({
    id: Number(categoryId),
    enabled: !!Number(categoryId),
  });
  const { data: productCategory } = useProductCategory({
    categoryId: Number(categoryId),
    id: Number(productCategoryId),
    enabled: !!Number(categoryId) && !!Number(productCategoryId),
  });
  const { data: characteristicGroup } = useCharacteristicGroup({
    enabled: !!chracateristicGroupId,
    id: chracateristicGroupId as number,
  });
  const { data: characteristic } = useCharacteristic({
    enabled: !!characteristicId,
    id: characteristicId as number,
  });
  const { data: product } = useProduct({
    id: tovarId as number,
    enabled: !!tovarId,
  });
  const { data: filter } = useFilter({
    id: filterId as number,
    enabled: !!filterId,
  });

  return (
    <div style={{ marginBottom: 16 }}>
      <Breadcrumb
        key={paths.at(-1)}
        items={paths.map((path, i) => {
          let prevPath = '/' + paths.slice(0, i + 1).join('/');

          let name = pathMap[path] || path;
          if (i === 2 && category) {
            name = category.title;
          }
          if (i === 3 && productCategory) {
            name = productCategory.title;
          }
          if (
            i === 5 &&
            paths[i - 1] === 'characteristics' &&
            characteristicGroup
          ) {
            name = characteristicGroup?.title;
          }
          if (i === 5 && paths[i - 1] === 'tovars' && product) {
            name = product.title;
          }
          if (i === 5 && paths[i - 1] === 'filters' && filter) {
            name = filter.title;
          }
          if (i === 6 && characteristic) {
            name = characteristic.title;
          }
          return {
            key: path,
            title: <Link href={prevPath}>{name}</Link>,
          };
        })}
      />
    </div>
  );
};

export default AdminBreadcrumb;
