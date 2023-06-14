import CatalogFilter from '@/features/catalog/catalog-filter';
import CatalogLayout from '@/shared/ui/layouts/catalog-layout';

export default function CatalogCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // return <CatalogLayout left={<CatalogFilter />} right={children} />;
  return children;
}
