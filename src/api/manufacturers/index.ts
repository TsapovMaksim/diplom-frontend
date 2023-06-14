import { axios } from '@/core/axios';
import { Manufacturer } from '@/shared/types';
import bulidQuery from '@/shared/utils/build-query';

export const manufacturersApi = {
  getManufacturers: async (params: { productCategoryId?: number }) => {
    console.log('params', params);

    return (
      await axios.get<Manufacturer[]>(`/manufacturer${bulidQuery(params)}`)
    ).data;
  },
  getManufacturerById: async ({ id }: { id: number }) => {
    return (await axios.get<Manufacturer>(`/manufacturer/${id}`)).data;
  },
  createManufacturer: async (body: { title: string }) => {
    return (await axios.post<Manufacturer>('/manufacturer', body)).data;
  },
  updateManufacturer: async ({
    id,
    patch,
  }: {
    patch: { title: string };
    id: number;
  }) => {
    return (await axios.patch<Manufacturer>(`/manufacturer/${id}`, patch)).data;
  },
  deleteManufacturer: async ({ id }: { id: number }) => {
    return await axios.delete(`/manufacturer/${id}`);
  },
  addCategoryToManufacturer: async ({
    id,
    body,
  }: {
    id: number;
    body: { productCategoryId: number };
  }) => {
    return await axios.post(`/manufacturer/${id}/category`, body);
  },
  deleteCategoryFromManufacturer: async ({
    id,
    productCategoryId,
  }: {
    id: number;
    productCategoryId: number;
  }) => {
    return await axios.delete(
      `/manufacturer/${id}/category/${productCategoryId}`
    );
  },
};
