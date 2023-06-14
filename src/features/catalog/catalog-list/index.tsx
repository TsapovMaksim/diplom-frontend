'use client';
import { GetCatalogProductsParams, productsApi } from '@/api/products';
import { useCatalogProducts } from '@/api/products/hooks';
import CatalogCard from '@/features/catalog/catalog-card';
import { Spin, Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

type Props = { params: GetCatalogProductsParams };

const CatalogList = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const page = props.params.page || 1;
  const pageSize = props.params.page_size || 10;
  const { data, isFetching } = useCatalogProducts({
    ...props.params,
    page,
    page_size: pageSize,
  });

  return (
    <>
      {data?.total ? (
        <Pagination
          onChange={page => {
            router.replace(
              `${pathname}?${queryString.stringify({
                ...props.params,
                page,
                page_size: pageSize,
              })}`
            );
          }}
          current={page}
          pageSize={pageSize}
          total={data?.total}
        />
      ) : undefined}
      <Spin spinning={isFetching}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
          {data?.content.map(item => (
            <CatalogCard
              price={item.price}
              shortDescription={item.short_description}
              id={item.id}
              key={item.id}
              title={item.title}
              preview={item.preview?.path}
              raiting={item.raiting}
              reviewsCount={item.reviewsCount}
              allProduct={item}
            />
          ))}
        </div>
      </Spin>
      {data?.total && data.total > pageSize ? (
        <Pagination
          onChange={page => {
            router.replace(
              `${pathname}?${queryString.stringify({
                ...props.params,
                page,
                page_size: pageSize,
              })}`
            );
          }}
          current={page}
          pageSize={pageSize}
          total={data?.total}
        />
      ) : undefined}
    </>
  );
};

export default CatalogList;
