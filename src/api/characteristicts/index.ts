import { axios } from '@/core/axios';
import {
  Characteristic,
  CharacteristicGroup,
  Manufacturer,
  ProductCharacteristic,
} from '@/shared/types';

export const characteristicsApi = {
  getCharacteristicGroups: async ({ categoryId }: { categoryId: number }) => {
    return (
      await axios.get<CharacteristicGroup[]>(
        `/characteristic-types?categoryId=${categoryId}`
      )
    ).data;
  },
  getCharacteristicGroupById: async ({ id }: { id: number }) => {
    return (await axios.get<CharacteristicGroup>(`/characteristic-types/${id}`))
      .data;
  },
  createCharacteristicGroup: async (body: {
    title: string;
    categoryId: number;
  }) => {
    return (
      await axios.post<CharacteristicGroup>('/characteristic-types', body)
    ).data;
  },
  updateCharacteristicGroups: async ({
    id,
    patch,
  }: {
    patch: { title: string };
    id: number;
  }) => {
    return (
      await axios.patch<CharacteristicGroup>(
        `/characteristic-types/${id}`,
        patch
      )
    ).data;
  },
  deleteCharacteristicGroups: async ({ id }: { id: number }) => {
    return await axios.delete(`/characteristic-types/${id}`);
  },

  getCharacteristics: async ({ groupId }: { groupId: number }) => {
    return (
      await axios.get<Characteristic[]>(`/characteristic?typeId=${groupId}`)
    ).data;
  },
  getCharacteristicById: async ({ id }: { id: number }) => {
    return (await axios.get<Characteristic>(`/characteristic/${id}`)).data;
  },
  createCharacteristic: async (body: { title: string; typeId: number }) => {
    return (await axios.post<Characteristic>('/characteristic', body)).data;
  },
  updateCharacteristic: async ({
    id,
    patch,
  }: {
    patch: { title: string };
    id: number;
  }) => {
    return (await axios.patch<Characteristic>(`/characteristic/${id}`, patch))
      .data;
  },
  deleteCharacteristic: async ({ id }: { id: number }) => {
    return await axios.delete(`/characteristic/${id}`);
  },

  getProductCharacteristics: async ({
    characteristicId,
  }: {
    characteristicId: number;
  }) => {
    return (
      await axios.get<ProductCharacteristic[]>(
        `/product-characteristic?characteristicId=${characteristicId}`
      )
    ).data;
  },
  getProductCharacteristicById: async ({ id }: { id: number }) => {
    return (
      await axios.get<ProductCharacteristic>(`/product-characteristic/${id}`)
    ).data;
  },
  createProductCharacteristic: async (body: {
    value: string;
    characteristicId: number;
  }) => {
    return (
      await axios.post<ProductCharacteristic>('/product-characteristic', body)
    ).data;
  },
  updateProductCharacteristic: async ({
    id,
    patch,
  }: {
    patch: { value: string };
    id: number;
  }) => {
    return (
      await axios.patch<ProductCharacteristic>(
        `/product-characteristic/${id}`,
        patch
      )
    ).data;
  },
  deleteProductCharacteristic: async ({ id }: { id: number }) => {
    return await axios.delete(`/product-characteristic/${id}`);
  },
};
