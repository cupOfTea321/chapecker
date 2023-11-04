import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const yandexCoreApi = createApi({
  reducerPath: 'yandexCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/',
    // prepareHeaders: (headers) => {
    //   // headers.set('X-RapidAPI-Key', '')
    //   return headers;
    // },
  }),
  // добавляем необходимый поинт
  endpoints: builder => ({
    getUser: builder.query({
      query: () => `auth/user`,
    }),
  }),
})

// экспортируем заданные поинты как хуки
export const { useGetUserQuery } = yandexCoreApi
