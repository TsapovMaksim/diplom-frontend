'use client';
import { List } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  params: {
    category_id: string;
    type_id: string;
  };
};

const CategoryTypePage = (props: Props) => {
  const pathname = usePathname();

  return (
    <div>
      <List
        dataSource={[
          { id: 'filters', title: 'Фильтры' },
          { id: 'tovars', title: 'Товары' },
          { id: 'characteristics', title: 'Характеристики' },
          { id: 'manufacturers', title: 'Производители' },
        ]}
        renderItem={item => (
          <List.Item>
            <Link href={pathname + `/${item.id}`}>{item.title}</Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CategoryTypePage;
