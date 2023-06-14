import { GetCatalogProductsParams } from '@/api/products';
import CatalogFilter from '@/features/catalog/catalog-filter';
import CatalogList from '@/features/catalog/catalog-list';
import Loader from '@/shared/ui/elements/loader';
import CatalogLayout from '@/shared/ui/layouts/catalog-layout';
import queryString from 'query-string';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
  searchParams: Record<string, string>;
};

const CatalogPage = (props: Props) => {
  const parsedParams = queryString.parse(
    queryString.stringify(props.searchParams, {
      arrayFormat: 'comma',
      skipEmptyString: true,
      skipNull: true,
    }),
    { arrayFormat: 'comma', parseNumbers: true }
  ) as GetCatalogProductsParams;
  if (!parsedParams.sort_direction) parsedParams.sort_direction = 'ASC';
  if (!parsedParams.sort_property) parsedParams.sort_property = 'price';

  const productCategoryId = Number(props.params.id);
  parsedParams.category = productCategoryId;
  return (
    <CatalogLayout
      productCategoryId={productCategoryId}
      left={<CatalogFilter productCategoryId={productCategoryId} />}
      right={
        <CatalogList
          params={{ ...parsedParams, category: productCategoryId }}
        />
      }
    />
  );
};

export default CatalogPage;
