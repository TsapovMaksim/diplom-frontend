'use client';
import AdminBreadcrumb from '@/shared/ui/elements/admin-breadcrumb';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const AdminLayout = (props: Props) => {
  return (
    <div>
      <AdminBreadcrumb />
      {props.children}
    </div>
  );
};

export default AdminLayout;
