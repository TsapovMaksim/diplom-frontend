import CatalogItem from '@/features/catalog/catalog-item';

export const revalidate = 0;

const CatalogItemPage = ({ params }: { params: { slug: string } }) => {
  const id = Number(params.slug);
  return (
    <div>
      <CatalogItem id={id} />
    </div>
  );
};

export default CatalogItemPage;
