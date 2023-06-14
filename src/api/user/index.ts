import { axios } from '@/core/axios';
import { UserWithToken } from '@/shared/types';

export type CreateUserBody = {
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export type LoginUserBody = {
  email: string;
  password: string;
};

export type LogoutUserBody = {
  userId: number;
};

export type RefreshUserBody = {
  refreshToken: string;
};

export const userApi = {
  createUser: async (body: CreateUserBody) => {
    return (await axios.post<UserWithToken>('/user', body)).data;
  },
  loginUser: async (body: LoginUserBody) => {
    return (await axios.post<UserWithToken>('/user/login', body)).data;
  },
  logoutUser: async (body: LogoutUserBody) => {
    return (await axios.post<UserWithToken>('/user/logout', body)).data;
  },
  refreshUser: async (body: RefreshUserBody) => {
    return (await axios.post<UserWithToken>('/user/refresh', body)).data;
  },
};
