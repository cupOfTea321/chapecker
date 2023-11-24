import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export interface cred {
  ratingFieldName: string
  cursor: number
  limit: number
}
export const yandexCoreApi = createApi({
  reducerPath: 'yandexCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/',
  }),
  // добавляем необходимый поинт
  endpoints: builder => ({
    getUser: builder.query({
      query: () => `auth/user`,
    }),
    leaders: builder.mutation({
      query: (credentials: cred) => ({
        url: `leaderboard/all`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

// экспортируем заданные поинты как хуки
export const { useGetUserQuery, useLeadersMutation } = yandexCoreApi
