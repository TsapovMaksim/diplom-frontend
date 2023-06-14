import { LoginUserBody, userApi } from '@/api/user';
import { setToken } from '@/core/axios';
import { UserWithToken } from '@/shared/types';
import NextAuth from 'next-auth';
import CreadentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CreadentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        try {
          const res = await userApi.loginUser(credentials as LoginUserBody);
          return res;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as UserWithToken;
      setToken(session.user.accessToken);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
