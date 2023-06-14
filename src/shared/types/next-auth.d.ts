import { UserWithToken } from '@/shared/types';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: UserWithToken;
  }
}
