import { setToken } from '@/core/axios';
import usePrev from '@/shared/hooks/use-prev';
import { useSession } from 'next-auth/react';

export const useAuth = () => {
  const { data, status } = useSession();
  const prevStatus = usePrev(status);
  if (status !== 'loading') {
    if (status === 'authenticated' && prevStatus !== 'authenticated') {
      setToken(data.user.accessToken);
    } else if (status === 'unauthenticated') {
      setToken('');
    }
  }

  return {
    session: data,
    loading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
};
