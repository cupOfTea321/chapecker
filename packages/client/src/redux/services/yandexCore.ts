import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const yandexCoreApi = createApi({
  reducerPath: 'yandexCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://chapecker.ya-praktikum.tech/api/v2/',
    prepareHeaders: headers => {
      return headers
    },
    credentials: 'include',
  }),
  refetchOnMountOrArgChange: true,
  // добавляем необходимый поинт
  endpoints: builder => ({
    getUser: builder.query({
      query: () => `auth/user`,
    }),
  }),
})

// экспортируем заданные поинты как хуки
export const { useGetUserQuery } = yandexCoreApi
