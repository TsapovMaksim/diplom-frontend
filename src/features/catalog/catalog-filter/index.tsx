'use client';

import {
  Button,
  Checkbox,
  Collapse,
  Form,
  Input,
  InputNumber,
  Space,
} from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useFilters } from '@/api/filters/hooks';
import { useManufacturers } from '@/api/manufacturers/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { omit, pick } from 'lodash';
import { GetCatalogProductsParams } from '@/api/products';
import queryString from 'query-string';

type CatalogFilterProps = {
  productCategoryId: number;
};

type FormValues = {
  price_min: number | null | undefined;
  price_max: number | null | undefined;
  manufacturer: undefined | number[];
  title: string | undefined;
} & Record<string, number[]>;

const CatalogFilter = (props: CatalogFilterProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parsedSearchParams = queryString.parse(searchParams.toString(), {
    arrayFormat: 'comma',
    parseNumbers: true,
  });
  const [form] = Form.useForm<FormValues>();
  const { data: filters } = useFilters({
    productCategoryId: props.productCategoryId,
  });
  const { data: manufacturers } = useManufacturers({
    productCategoryId: props.productCategoryId,
  });

  const handleFormFinish = (values: FormValues) => {
    const args: GetCatalogProductsParams = pick(values, [
      'price_min',
      'price_max',
      'manufacturer',
      'title',
    ]);
    Object.values(
      omit(values, ['price_min', 'price_max', 'manufacturer', 'title'])
    ).forEach(item => {
      if (item?.length) {
        if (!args.characteristics) args.characteristics = [];
        args.characteristics = (args.characteristics as number[]).concat(item);
      }
    });
    const query = queryString.stringify(
      { ...parsedSearchParams, ...args, page: 1 },
      { arrayFormat: 'comma' }
    );
    router.replace(`${pathname}?${query}`);
  };

  const handleReset = () => {
    form.resetFields();
    router.replace(
      `${pathname}?${queryString.stringify(
        { ...omit(parsedSearchParams, 'characteristics'), page: 1 },
        { arrayFormat: 'comma' }
      )}`
    );
  };

  return (
    <Form onFinish={handleFormFinish} form={form} layout='vertical'>
      <Form.Item name='title'>
        <Input
          placeholder='Введите название товара'
          prefix={<SearchOutlined />}
          allowClear
        />
      </Form.Item>
      <Space style={{ width: '100%' }} direction='vertical'>
        <Collapse>
          <Collapse.Panel key={'1'} header='Цена'>
            <Space>
              <Form.Item name={'price_min'} noStyle>
                <InputNumber
                  placeholder='От: '
                  min={0}
                  max={1_000_000_000}
                  precision={0}
                />
              </Form.Item>
              <Form.Item name='price_max' noStyle>
                <InputNumber
                  placeholder='До: '
                  min={0}
                  max={1_000_000_000}
                  precision={0}
                />
              </Form.Item>
            </Space>
          </Collapse.Panel>
        </Collapse>
        <Collapse>
          <Collapse.Panel key={'1'} header='Производитель'>
            <Form.Item style={{ marginBottom: 0 }} name='manufacturer'>
              <Checkbox.Group>
                <Space direction='vertical'>
                  {manufacturers?.map(item => {
                    return (
                      <Checkbox key={item.id} value={item.id}>
                        {item.title}
                      </Checkbox>
                    );
                  })}
                </Space>
              </Checkbox.Group>
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
        {filters?.map(item => {
          return (
            <Collapse key={item.id}>
              <Collapse.Panel key={'1'} header={item.title}>
                <Form.Item style={{ marginBottom: 0 }} name={item.id}>
                  <Checkbox.Group>
                    <Space direction='vertical'>
                      {item.filterValues.map(value => (
                        <Checkbox
                          key={value.id}
                          value={value.productCharacteristic.id}
                        >
                          {value.title}
                        </Checkbox>
                      ))}
                    </Space>
                  </Checkbox.Group>
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
          );
        })}
        <Button block htmlType='submit' type='primary'>
          Применить
        </Button>
        <Button onClick={handleReset} block>
          Сбросить
        </Button>
      </Space>
    </Form>
  );
};

export default CatalogFilter;
