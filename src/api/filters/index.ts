import { axios } from '@/core/axios';
import { Filter, FilterValue } from '@/shared/types';
import bulidQuery from '@/shared/utils/build-query';

export const filtersApi = {
  getFilters: async ({
    characteristicId,
    productCategoryId,
  }: {
    productCategoryId: number;
    characteristicId?: number;
  }) => {
    return (
      await axios.get<Filter[]>(
        `/filter${bulidQuery({ characteristicId, productCategoryId })}`
      )
    ).data;
  },
  getFilterById: async ({ id }: { id: number }) => {
    return (await axios.get<Filter>(`/filter/${id}`)).data;
  },
  createFilter: async (body: {
    characteristicId: number;
    productCategoryId: number;
    title: string;
  }) => {
    return (await axios.post<Filter>('/filter', body)).data;
  },
  updateFilter: async ({
    id,
    patch,
  }: {
    patch: { title: string };
    id: number;
  }) => {
    return (await axios.patch<Filter>(`/filter/${id}`, patch)).data;
  },
  deleteFilter: async ({ id }: { id: number }) => {
    return await axios.delete(`/filter/${id}`);
  },

  // filter-value

  getFilterValues: async ({ filterId }: { filterId: number }) => {
    return (
      await axios.get<FilterValue[]>(`/filter-value${bulidQuery({ filterId })}`)
    ).data;
  },
  getFilterValueById: async ({ id }: { id: number }) => {
    return (await axios.get<FilterValue>(`/filter-value/${id}`)).data;
  },
  createFilterValue: async (body: {
    productCharacteristicId: number;
    title: string;
    filterId: number;
  }) => {
    return (await axios.post<FilterValue>('/filter-value', body)).data;
  },
  updateFilterValue: async ({
    id,
    patch,
  }: {
    patch: { title: string };
    id: number;
  }) => {
    return (await axios.patch<FilterValue>(`/filter-value/${id}`, patch)).data;
  },
  deleteFilterValue: async ({ id }: { id: number }) => {
    return await axios.delete(`/filter-value/${id}`);
  },
};
