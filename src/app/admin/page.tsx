'use client';
import RelativeLink from '@/shared/ui/elements/relative-link';
import { List } from 'antd';

const AdminPage = () => {
  return (
    <div>
      <List
        dataSource={[
          { title: 'Категории', id: 'categories' },
          { title: 'Производители', id: 'manufacturers' },
        ]}
        renderItem={item => (
          <List.Item>
            <RelativeLink key={item.id} href={`/${item.id}`}>
              {item.title}
            </RelativeLink>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AdminPage;
