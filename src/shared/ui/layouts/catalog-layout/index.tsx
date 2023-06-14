'use client';

import React, { useEffect, useState } from 'react';

type Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  productCategoryId: number;
};

import CatalogFilterModal from '@/features/catalog/catalog-filter-modal';
import useModal from '@/shared/hooks/use-modal';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import './style.scss';
import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from 'next/navigation';
import queryString from 'query-string';
import { GetCatalogProductsParams } from '@/api/products';
// import { useRouter } from 'next/router';

const CatalogLayout = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const parsedSearchParams = queryString.parse(searchParams.toString(), {
    arrayFormat: 'comma',
    parseNumbers: true,
  }) as GetCatalogProductsParams;
  const [sortPropery, setSortPropery] = useState(
    parsedSearchParams.sort_property || 'price'
  );
  const [sortDirection, setSortDirection] = useState(
    parsedSearchParams.sort_direction || 'ASC'
  );
  const modal = useModal();

  const handleSelectChange = (value: string) => {
    const [sort_direction, sort_property] = value.split('-');
    console.log('sort_direction', sort_direction);
    console.log('sort_property', sort_property);

    // setSortPropery(sort_property);
    // setSortDirection(sortDirection);
    router.replace(
      `${pathname}?${queryString.stringify(
        {
          ...parsedSearchParams,
          sort_direction,
          sort_property,
        },
        { arrayFormat: 'comma', skipEmptyString: true, skipNull: true }
      )}`
    );
  };

  console.log(
    '`${sortDirection}-${sortPropery}`',
    `${sortDirection}-${sortPropery}`
  );

  useEffect(() => {
    if (!parsedSearchParams.sort_direction || !parsedSearchParams.sort_property)
      return;
    setSortDirection(parsedSearchParams.sort_direction as string);
    setSortPropery(parsedSearchParams.sort_property as string);
  }, [parsedSearchParams.sort_direction, parsedSearchParams.sort_property]);

  return (
    <div className='catalog-layout'>
      <div className='catalog-layout__wrapper'>
        <div className='catalog-layout__left'>{props.left}</div>
        <div className='catalog-layout__right'>
          <div className='catalog-layout__mobile-actions'>
            <Button
              className='catalog-layout__filter-btn'
              onClick={modal.open}
              icon={<FilterOutlined />}
            />
            <Select
              onChange={handleSelectChange}
              value={`${sortDirection}-${sortPropery}`}
              className='catalog-layout__sorting'
              options={[
                { label: 'Сначала недорогие', value: 'ASC-price' },
                { label: 'Сначала дорогие', value: 'DESC-price' },
                { label: 'Сначала с лучшей оценкой', value: 'DESC-raiting' },
                { label: 'Сначала популярные', value: 'DESC-reviewsCount' },
              ]}
            ></Select>
            <CatalogFilterModal
              open={modal.visible}
              onOk={modal.close}
              onCancel={modal.close}
              productCategoryId={props.productCategoryId}
            />
          </div>
          {props.right}
        </div>
      </div>
    </div>
  );
};

export default CatalogLayout;
