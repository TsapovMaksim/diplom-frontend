'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export type RelativeLnkProps = Parameters<typeof Link>[0];

const RelativeLink = (props: RelativeLnkProps) => {
  const pathname = usePathname();
  return <Link {...props} href={pathname + props.href} />;
};

export default React.memo(RelativeLink);
